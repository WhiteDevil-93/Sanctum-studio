/**
 * Sanctum Studio - DTCG 2025.10 Token Manager & Theming Engine
 * Reference: docs/design/sanctum-ux/TOKENS_AND_THEMING.md
 */

import { getContrastRatio, evaluateWcagCompliance } from './contrast.js';

export class TokenManager {
  constructor(tokensConfig) {
    this.foundation = tokensConfig?.foundation || {};
    this.semantic = tokensConfig?.semantic || {};
    this.themes = tokensConfig?.themes || {
      dark: {},
      light: {},
      highContrast: {}
    };
  }

  /**
   * Resolves token aliases like "{color.violet}" to the real value "#9A8CFF"
   */
  resolveValue(valueRef, context = {}) {
    if (typeof valueRef !== 'string') return valueRef;
    if (!valueRef.startsWith('{') || !valueRef.endsWith('}')) return valueRef;

    const path = valueRef.slice(1, -1).split('.');
    let current = { ...this.foundation, ...context };

    for (const key of path) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return valueRef; // unresolved
      }
    }
    return current;
  }

  /**
   * Returns a flattened map of semantic tokens for a given theme
   */
  getResolvedThemeTokens(themeName = 'dark') {
    const themeOverrides = this.themes[themeName] || {};
    const resolved = {};

    for (const [key, rawVal] of Object.entries(this.semantic)) {
      const val = themeOverrides[key] !== undefined ? themeOverrides[key] : rawVal;
      resolved[key] = this.resolveValue(val, themeOverrides);
    }
    return resolved;
  }

  /**
   * Calculates contrast ratios between text/action tokens and surface tokens for a theme
   */
  evaluateThemeContrast(themeName = 'dark') {
    const tokens = this.getResolvedThemeTokens(themeName);
    const surfaces = [
      { name: 'surfaceCanvas', color: tokens.surfaceCanvas || '#0B0C10' },
      { name: 'surfaceCard', color: tokens.surfaceCard || '#1A1D26' }
    ];

    const foregrounds = [
      { name: 'textPrimary', color: tokens.textPrimary || '#ECEEF5', isLarge: false, isControl: false },
      { name: 'textSecondary', color: tokens.textSecondary || '#959CB1', isLarge: false, isControl: false },
      { name: 'actionPrimary', color: tokens.actionPrimary || '#9A8CFF', isLarge: false, isControl: true },
      { name: 'actionDanger', color: tokens.actionDanger || '#F47B74', isLarge: false, isControl: true }
    ];

    const results = [];
    for (const surface of surfaces) {
      for (const fg of foregrounds) {
        if (!surface.color.startsWith('#') || !fg.color.startsWith('#')) continue;
        const ratio = getContrastRatio(fg.color, surface.color);
        const evalResult = evaluateWcagCompliance(ratio, fg.isLarge, fg.isControl);
        results.push({
          theme: themeName,
          surface: surface.name,
          foreground: fg.name,
          surfaceHex: surface.color,
          foregroundHex: fg.color,
          ratio,
          pass: evalResult.pass,
          level: evalResult.level
        });
      }
    }
    return results;
  }

  /**
   * Converts tokens to W3C DTCG 2025.10 JSON format
   */
  toDTCG() {
    const dtcg = {
      $schema: 'https://design-tokens.github.io/community-group/format/2025.10/',
      color: {},
      space: {},
      typography: {}
    };

    if (this.foundation.color) {
      for (const [key, hex] of Object.entries(this.foundation.color)) {
        dtcg.color[key] = {
          $type: 'color',
          $value: hex
        };
      }
    }

    if (this.foundation.space) {
      for (const [key, val] of Object.entries(this.foundation.space)) {
        dtcg.space[key] = {
          $type: 'dimension',
          $value: val
        };
      }
    }

    if (this.foundation.typography) {
      for (const [key, val] of Object.entries(this.foundation.typography)) {
        dtcg.typography[key] = {
          $type: 'fontFamily',
          $value: val
        };
      }
    }

    return dtcg;
  }

  /**
   * Generates CSS Custom Properties stylesheet
   */
  toCSS() {
    let css = `/* Sanctum Studio - Generated Token Variables */\n:root {\n`;
    if (this.foundation.space) {
      for (const [k, v] of Object.entries(this.foundation.space)) {
        css += `  --space-${k}: ${v};\n`;
      }
    }
    if (this.foundation.typography) {
      css += `  --font-sans: "${this.foundation.typography.fontSans || 'IBM Plex Sans'}", sans-serif;\n`;
      css += `  --font-mono: "${this.foundation.typography.fontMono || 'IBM Plex Mono'}", monospace;\n`;
    }
    css += `}\n\n`;

    // Themes
    for (const [theme, overrides] of Object.entries(this.themes)) {
      const resolved = this.getResolvedThemeTokens(theme);
      const selector = theme === 'dark' ? `.s-app[data-mode="dark"], :root` : `.s-app[data-mode="${theme}"]`;
      css += `${selector} {\n`;
      for (const [k, v] of Object.entries(resolved)) {
        const cssVar = k.replace(/([A-Z])/g, '-$1').toLowerCase();
        css += `  --${cssVar}: ${v};\n`;
      }
      css += `}\n\n`;
    }

    return css;
  }
}
