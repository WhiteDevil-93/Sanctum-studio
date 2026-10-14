/**
 * Sanctum Studio - Design Options (global design-language presets)
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { createEmptyDocument } from '../src/ast/schema.js';
import {
  applyDesignOptions,
  DESIGN_THEMES,
  COLOUR_PALETTES,
  TYPOGRAPHY_KITS,
  DENSITY_PRESETS,
  SHAPE_LANGUAGES,
  SURFACE_LANGUAGES,
  getShapeRadius,
  getSurfaceTexture,
  getDensityTokens,
  getTypographyTokens
} from '../src/tokens/designOptions.js';
import { renderArtboardContent } from '../ui/render-engine.js';

test('D1. applyDesignOptions — theme seeds tokens.themes + meta.theme', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  applyDesignOptions(doc, { theme: 'brutalist' });
  assert.ok(doc.tokens.themes.brutalist, 'theme seeded');
  assert.equal(doc.tokens.themes.brutalist.textPrimary, '#FFFFFF');
  assert.equal(doc.meta.theme, 'brutalist');
});

test('D2. applyDesignOptions — palette merges foundation.color + semantic', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  applyDesignOptions(doc, { palette: 'ocean' });
  assert.equal(doc.tokens.foundation.color.obsidian, COLOUR_PALETTES.ocean.foundationColor.obsidian);
  assert.equal(doc.tokens.semantic.surfaceCanvas, COLOUR_PALETTES.ocean.semantic.surfaceCanvas);
});

test('D3. applyDesignOptions — type kit sets typography', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  applyDesignOptions(doc, { typeKit: 'editorial' });
  assert.equal(doc.tokens.foundation.typography.fontSans, TYPOGRAPHY_KITS.editorial.fontSans);
  assert.equal(doc.tokens.foundation.typography.baseSizePx, 17);
});

test('D4. applyDesignOptions — density multipliers', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  applyDesignOptions(doc, { density: 'compact' });
  assert.equal(doc.tokens.foundation.density.gapMultiplier, 0.7);
  assert.equal(doc.tokens.foundation.density.padMultiplier, 0.7);
});

test('D5. applyDesignOptions — shape + surface', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  applyDesignOptions(doc, { shape: 'sharp', surface: 'scanlines' });
  assert.equal(doc.tokens.foundation.shape.controlRadius, SHAPE_LANGUAGES.sharp.controlRadius);
  assert.equal(doc.tokens.foundation.shape.surfaceRadius, SHAPE_LANGUAGES.sharp.surfaceRadius);
  assert.deepEqual(doc.tokens.foundation.surface, { texture: 'scanlines' });
});

test('D6. applyDesignOptions — idempotent (same options twice = identical tokens)', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  const opts = { theme: 'glass', palette: 'forest', typeKit: 'technical', density: 'cozy', shape: 'rounded', surface: 'dotgrid' };
  applyDesignOptions(doc, opts);
  const snapshot = JSON.stringify(doc.tokens);
  applyDesignOptions(doc, opts);
  assert.equal(JSON.stringify(doc.tokens), snapshot);
});

test('D7. applyDesignOptions — unknown keys ignored, known still applied', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  applyDesignOptions(doc, { theme: 'corporate', notARealSlot: 'x' });
  assert.ok(doc.tokens.themes.corporate, 'theme still applied');
  assert.ok(!('notARealSlot' in doc.tokens.foundation), 'unknown not stored');
});

test('D8. token readers — shape radius control vs surface', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  applyDesignOptions(doc, { shape: 'pills' });
  assert.equal(getShapeRadius(doc, 'Button'), 999, 'control radius');
  assert.equal(getShapeRadius(doc, 'CardWidget'), 24, 'surface radius');
});

test('D9. token readers — surface / density / typography defaults', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  // no design options applied → safe defaults
  assert.equal(getSurfaceTexture(doc), 'flat');
  assert.equal(getDensityTokens(doc).gapMultiplier, 1);
  assert.equal(getTypographyTokens(doc).baseSizePx, 16);
});

test('D10. render engine — shape language + per-block override', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  // build a tiny prototype
  doc.masterPrototype = {
    id: 'root', type: 'AppShell', props: {},
    children: [
      { id: 'c1', type: 'CardWidget', props: { title: 'C' }, children: [] },
      { id: 'b1', type: 'Button', props: { label: 'Go' }, children: [] },
      { id: 'b2', type: 'Button', props: { label: 'Pill', radius: 999 }, children: [] }
    ]
  };
  applyDesignOptions(doc, { shape: 'sharp' });
  const html = renderArtboardContent(doc, 'ready').desktopHtml;
  assert.match(html, /border-radius: 0px/, 'sharp → 0px radius applied');
  assert.match(html, /border-radius: 999px/, 'explicit pill radius preserved');
});

test('D11. render engine — density scales gaps', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  doc.masterPrototype = {
    id: 'root', type: 'AppShell', props: {},
    children: [ { id: 's1', type: 'Section', props: { title: 'S' }, children: [] } ]
  };
  applyDesignOptions(doc, { density: 'compact' }); // ×0.7 → 12*0.7 = 8
  const html = renderArtboardContent(doc, 'ready').desktopHtml;
  assert.match(html, /gap: 8px/, 'compact density scales gap 12→8');
});

test('D12. render engine — typography tokens wrap the artboard', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  doc.masterPrototype = { id: 'root', type: 'AppShell', props: {}, children: [] };
  applyDesignOptions(doc, { typeKit: 'editorial' });
  const html = renderArtboardContent(doc, 'ready').desktopHtml;
  assert.match(html, /--font-sans: Georgia/, 'editorial font family injected');
  assert.match(html, /font-size: 17px/, 'editorial base size injected');
});

test('D13. render engine — global surface texture applied to flat blocks', () => {
  const doc = createEmptyDocument('T', 'ai_assistant_delegation');
  doc.masterPrototype = {
    id: 'root', type: 'AppShell', props: {},
    children: [ { id: 'c1', type: 'CardWidget', props: { title: 'C' }, children: [] } ]
  };
  applyDesignOptions(doc, { surface: 'scanlines' });
  const html = renderArtboardContent(doc, 'ready').desktopHtml;
  assert.match(html, /repeating-linear-gradient/, 'scanlines global texture applied');
});
