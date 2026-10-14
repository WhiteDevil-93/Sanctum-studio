/**
 * Sanctum Studio — "Design Options" presets.
 *
 * Six curated, customer-facing design-language slots. Each is a partial
 * token override + label so the Studio UI is data-driven. Applying one
 * re-binds the doc's token layer globally; the per-block inspector
 * (radius/fill/texture/border/text-deco) still overrides any single block.
 *
 * All apply functions are pure + idempotent: applying the same option twice
 * yields an identical tokens subtree, so the UI can re-apply on every open.
 */

// ---------------------------------------------------------------------------
// Themes — full tokens.themes.<id> objects. dark/light/highContrast already
// exist in every doc; these are the *added* curated looks.
// ---------------------------------------------------------------------------
export const DESIGN_THEMES = {
  corporate: {
    label: 'Corporate',
    theme: {
      surfaceCanvas: '#0E1116',
      surfaceCard: '#161B22',
      surfaceBorder: '#2D333B',
      textPrimary: '#E6EDF3',
      textSecondary: '#8B949E',
      actionPrimary: '#2F81F7',
      actionDanger: '#F85149'
    }
  },
  playful: {
    label: 'Playful',
    theme: {
      surfaceCanvas: '#1A1024',
      surfaceCard: '#241633',
      surfaceBorder: '#3A2A4D',
      textPrimary: '#F3E8FF',
      textSecondary: '#B79BD9',
      actionPrimary: '#FF6B9D',
      actionDanger: '#FF8A65'
    }
  },
  brutalist: {
    label: 'Brutalist',
    theme: {
      surfaceCanvas: '#0A0A0A',
      surfaceCard: '#111111',
      surfaceBorder: '#FFFFFF',
      textPrimary: '#FFFFFF',
      textSecondary: '#BFBFBF',
      actionPrimary: '#FFD400',
      actionDanger: '#FF0000'
    }
  },
  glass: {
    label: 'Glass',
    theme: {
      surfaceCanvas: '#0F172A',
      surfaceCard: 'rgba(255,255,255,0.06)',
      surfaceBorder: 'rgba(255,255,255,0.14)',
      textPrimary: '#F1F5F9',
      textSecondary: '#94A3B8',
      actionPrimary: '#38BDF8',
      actionDanger: '#FB7185'
    }
  },
  terminal: {
    label: 'Terminal',
    theme: {
      surfaceCanvas: '#000000',
      surfaceCard: '#0D1117',
      surfaceBorder: '#1F6F43',
      textPrimary: '#39FF85',
      textSecondary: '#1F8A4C',
      actionPrimary: '#39FF85',
      actionDanger: '#FF5F56'
    }
  }
};

// ---------------------------------------------------------------------------
// Colour palettes — foundation.color overrides + semantic re-resolution.
// WCAG-safe text/surface pairs.
// ---------------------------------------------------------------------------
export const COLOUR_PALETTES = {
  ocean: {
    label: 'Ocean',
    foundationColor: {
      obsidian: '#0A1420', slate: '#12202E', border: '#1E3A52',
      violet: '#2DD4BF', pink: '#38BDF8', orange: '#FBBF24',
      danger: '#F87171', success: '#34D399',
      textMuted: '#7C93A8', textLight: '#E6F1FA'
    },
    semantic: {
      surfaceCanvas: '{color.obsidian}', surfaceCard: '{color.slate}',
      surfaceBorder: '{color.border}', actionPrimary: '{color.violet}',
      actionDanger: '{color.danger}', textPrimary: '{color.textLight}',
      textSecondary: '{color.textMuted}', statusRunning: '{color.pink}'
    }
  },
  forest: {
    label: 'Forest',
    foundationColor: {
      obsidian: '#0C1410', slate: '#152218', border: '#27402F',
      violet: '#84CC16', pink: '#A3E635', orange: '#FACC15',
      danger: '#F87171', success: '#4ADE80',
      textMuted: '#7E9C88', textLight: '#EAF6EE'
    },
    semantic: {
      surfaceCanvas: '{color.obsidian}', surfaceCard: '{color.slate}',
      surfaceBorder: '{color.border}', actionPrimary: '{color.violet}',
      actionDanger: '{color.danger}', textPrimary: '{color.textLight}',
      textSecondary: '{color.textMuted}', statusRunning: '{color.pink}'
    }
  },
  sunset: {
    label: 'Sunset',
    foundationColor: {
      obsidian: '#1A0F14', slate: '#241419', border: '#3D2229',
      violet: '#FB7185', pink: '#F472B6', orange: '#FB923C',
      danger: '#EF4444', success: '#4ADE80',
      textMuted: '#A87C88', textLight: '#FAEEE9'
    },
    semantic: {
      surfaceCanvas: '{color.obsidian}', surfaceCard: '{color.slate}',
      surfaceBorder: '{color.border}', actionPrimary: '{color.orange}',
      actionDanger: '{color.danger}', textPrimary: '{color.textLight}',
      textSecondary: '{color.textMuted}', statusRunning: '{color.violet}'
    }
  },
  monochrome: {
    label: 'Monochrome',
    foundationColor: {
      obsidian: '#0A0A0A', slate: '#161616', border: '#2E2E2E',
      violet: '#E5E5E5', pink: '#A3A3A3', orange: '#737373',
      danger: '#EF4444', success: '#4ADE80',
      textMuted: '#8A8A8A', textLight: '#F5F5F5'
    },
    semantic: {
      surfaceCanvas: '{color.obsidian}', surfaceCard: '{color.slate}',
      surfaceBorder: '{color.border}', actionPrimary: '{color.violet}',
      actionDanger: '{color.danger}', textPrimary: '{color.textLight}',
      textSecondary: '{color.textMuted}', statusRunning: '{color.violet}'
    }
  },
  pastel: {
    label: 'Pastel',
    foundationColor: {
      obsidian: '#1E1B2E', slate: '#2A2540', border: '#3D3760',
      violet: '#C4B5FD', pink: '#F9A8D4', orange: '#FCD34D',
      danger: '#FCA5A5', success: '#86EFAC',
      textMuted: '#A79FC4', textLight: '#F5F3FF'
    },
    semantic: {
      surfaceCanvas: '{color.obsidian}', surfaceCard: '{color.slate}',
      surfaceBorder: '{color.border}', actionPrimary: '{color.violet}',
      actionDanger: '{color.danger}', textPrimary: '{color.textLight}',
      textSecondary: '{color.textMuted}', statusRunning: '{color.pink}'
    }
  },
  ember: {
    label: 'Ember',
    foundationColor: {
      obsidian: '#140C08', slate: '#1F130C', border: '#3A2417',
      violet: '#FB923C', pink: '#F87171', orange: '#F59E0B',
      danger: '#EF4444', success: '#4ADE80',
      textMuted: '#A8886E', textLight: '#FAF0E6'
    },
    semantic: {
      surfaceCanvas: '{color.obsidian}', surfaceCard: '{color.slate}',
      surfaceBorder: '{color.border}', actionPrimary: '{color.violet}',
      actionDanger: '{color.danger}', textPrimary: '{color.textLight}',
      textSecondary: '{color.textMuted}', statusRunning: '{color.orange}'
    }
  }
};

// ---------------------------------------------------------------------------
// Typography kits — paired font families + base size per mood.
// ---------------------------------------------------------------------------
export const TYPOGRAPHY_KITS = {
  modern: { label: 'Modern', fontSans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', fontMono: 'JetBrains Mono, "IBM Plex Mono", monospace', baseSizePx: 16 },
  editorial: { label: 'Editorial', fontSans: 'Georgia, "Times New Roman", serif', fontMono: 'IBM Plex Mono, monospace', baseSizePx: 17 },
  technical: { label: 'Technical', fontSans: '"IBM Plex Mono", "JetBrains Mono", monospace', fontMono: '"IBM Plex Mono", monospace', baseSizePx: 15 },
  friendly: { label: 'Friendly', fontSans: 'Nunito, "Trebuchet MS", "Segoe UI", sans-serif', fontMono: 'IBM Plex Mono, monospace', baseSizePx: 16 }
};

// ---------------------------------------------------------------------------
// Density / spacing — scales all gaps/padding (the negative-space lever).
// space values are the *base* multipliers applied on top of existing spacing.
// ---------------------------------------------------------------------------
export const DENSITY_PRESETS = {
  comfortable: { label: 'Comfortable', gapMultiplier: 1.2, padMultiplier: 1.2 },
  cozy: { label: 'Cozy', gapMultiplier: 1.0, padMultiplier: 1.0 },
  compact: { label: 'Compact', gapMultiplier: 0.7, padMultiplier: 0.7 }
};

// ---------------------------------------------------------------------------
// Shape language — global radius bias. controlRadius applies to buttons/
// chips/badges; surfaceRadius applies to cards/sections/tables. A block with
// an explicit radius prop always wins over this default.
// ---------------------------------------------------------------------------
export const SHAPE_LANGUAGES = {
  pills: { label: 'Pills', controlRadius: 999, surfaceRadius: 24 },
  rounded: { label: 'Rounded', controlRadius: 12, surfaceRadius: 16 },
  sharp: { label: 'Sharp', controlRadius: 0, surfaceRadius: 0 }
};

// ---------------------------------------------------------------------------
// Surface texture — global default. A block with an explicit non-flat
// texture prop wins; flat falls through to this.
// ---------------------------------------------------------------------------
export const SURFACE_LANGUAGES = {
  flat: { label: 'Flat', texture: 'flat' },
  dotgrid: { label: 'Dot Grid', texture: 'dotgrid' },
  scanlines: { label: 'Scanlines', texture: 'scanlines' },
  gradient: { label: 'Gradient', texture: 'gradient' }
};

// Which node types count as "controls" for the shape-language radius.
const CONTROL_TYPES = new Set([
  'Button', 'Badge', 'MetricChip', 'Toggle', 'Chip', 'PillButton'
]);

// ---------------------------------------------------------------------------
// applyDesignOptions — mutates doc.tokens in place for whichever slots are
// passed. Missing keys are left untouched. Pure + idempotent.
// ---------------------------------------------------------------------------
export function applyDesignOptions(doc, options) {
  if (!doc || !doc.tokens || !options) return doc;
  const t = doc.tokens;
  if (!t.foundation) t.foundation = {};

  // theme
  if (options.theme) {
    const def = DESIGN_THEMES[options.theme];
    if (def) {
      if (!t.themes) t.themes = {};
      t.themes[options.theme] = { ...def.theme };
      if (doc.meta) doc.meta.theme = options.theme;
    }
  }

  // palette
  if (options.palette) {
    const def = COLOUR_PALETTES[options.palette];
    if (def) {
      t.foundation.color = { ...(t.foundation.color || {}), ...def.foundationColor };
      t.semantic = { ...(t.semantic || {}), ...def.semantic };
    }
  }

  // type kit
  if (options.typeKit) {
    const def = TYPOGRAPHY_KITS[options.typeKit];
    if (def) {
      t.foundation.typography = {
        ...(t.foundation.typography || {}),
        fontSans: def.fontSans,
        fontMono: def.fontMono,
        baseSizePx: def.baseSizePx
      };
    }
  }

  // density
  if (options.density) {
    const def = DENSITY_PRESETS[options.density];
    if (def) {
      t.foundation.density = {
        gapMultiplier: def.gapMultiplier,
        padMultiplier: def.padMultiplier
      };
    }
  }

  // shape
  if (options.shape) {
    const def = SHAPE_LANGUAGES[options.shape];
    if (def) {
      t.foundation.shape = {
        controlRadius: def.controlRadius,
        surfaceRadius: def.surfaceRadius
      };
    }
  }

  // surface
  if (options.surface) {
    const def = SURFACE_LANGUAGES[options.surface];
    if (def) {
      t.foundation.surface = { texture: def.texture };
    }
  }

  return doc;
}

// ---------------------------------------------------------------------------
// Token readers used by the render engine. Each returns a safe default so
// the renderer never has to null-check the doc shape.
// ---------------------------------------------------------------------------
export function getTypographyTokens(doc) {
  const ty = doc?.tokens?.foundation?.typography;
  return {
    fontSans: ty?.fontSans || 'IBM Plex Sans, -apple-system, sans-serif',
    fontMono: ty?.fontMono || 'IBM Plex Mono, monospace',
    baseSizePx: ty?.baseSizePx || 16
  };
}

export function getDensityTokens(doc) {
  const d = doc?.tokens?.foundation?.density;
  return {
    gapMultiplier: d?.gapMultiplier ?? 1,
    padMultiplier: d?.padMultiplier ?? 1
  };
}

export function getShapeRadius(doc, nodeType) {
  const s = doc?.tokens?.foundation?.shape;
  if (!s) return null;
  return CONTROL_TYPES.has(nodeType) ? s.controlRadius : s.surfaceRadius;
}

export function getSurfaceTexture(doc) {
  return doc?.tokens?.foundation?.surface?.texture || 'flat';
}
