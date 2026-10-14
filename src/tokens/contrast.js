/**
 * WCAG 2.2 Relative Luminance and Contrast Ratio Calculator
 * Reference: docs/design/sanctum-ux/VALIDATION_AND_HANDOFF.md & TOKENS_AND_THEMING.md
 */

export function parseHexColor(hex) {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  if (clean.length !== 6 && clean.length !== 8) {
    return { r: 0, g: 0, b: 0, a: 1 };
  }
  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;
  const a = clean.length === 8 ? parseInt(clean.substring(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

export function channelToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function getRelativeLuminance(hex) {
  const { r, g, b } = parseHexColor(hex);
  const rLinear = channelToLinear(r);
  const gLinear = channelToLinear(g);
  const bLinear = channelToLinear(b);
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

export function getContrastRatio(hex1, hex2) {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

export function evaluateWcagCompliance(ratio, isLargeText = false, isControl = false) {
  const minRequired = isControl || isLargeText ? 3.0 : 4.5;
  const pass = ratio >= minRequired;
  return {
    ratio,
    minRequired,
    pass,
    status: pass ? 'PASS' : 'FAIL',
    level: ratio >= 7.0 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3.0 ? (isControl || isLargeText ? 'AA-Large' : 'FAIL') : 'FAIL'
  };
}
