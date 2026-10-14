/**
 * Shared render engine for Studio canvas AND Render window.
 * Pure functions: doc + state → HTML string. No DOM dependencies.
 *
 * Design-language tokens (typography, density, shape, surface) are read from
 * doc.tokens.foundation via the get* helpers in src/tokens/designOptions.js.
 * Per-block props always win: an explicit radius/texture/gap/padding on a
 * block overrides the global design-language default.
 */
import {
  getTypographyTokens,
  getDensityTokens,
  getShapeRadius,
  getSurfaceTexture
} from '../src/tokens/designOptions.js';

// Apply the common per-asset props (alignment, width, gap, padding, accent)
// to the wrapper style. Every block respects these so customisation is
// consistent across atoms/molecules/organisms.
function commonStyle(p) {
  const parts = [];
  if (p.alignment === 'center') parts.push('text-align: center; display: flex; flex-direction: column; align-items: center;');
  else if (p.alignment === 'right') parts.push('text-align: right; display: flex; flex-direction: column; align-items: flex-end;');
  if (p.widthPct != null && p.widthPct < 100) parts.push(`width: ${p.widthPct}%;`);
  else if (p.widthPct == 100) parts.push('width: 100%;');
  if (p.gap != null) parts.push(`row-gap: ${p.gap}px;`);
  if (p.padding != null) parts.push(`padding: ${p.padding}px;`);
  if (p.accentColor) parts.push(`--accent: ${p.accentColor};`);
  return parts.join('');
}

// Density-scaled gap. A block's explicit gap wins; otherwise the default is
// multiplied by the global density.gapMultiplier.
function scaledGap(p, doc, d = 12) {
  const m = getDensityTokens(doc).gapMultiplier;
  const v = (p.gap != null ? p.gap : d);
  return Math.round(v * m);
}

// Density-scaled padding. A block's explicit padding wins; otherwise the
// default is multiplied by the global density.padMultiplier.
function scaledPad(p, doc, d = 16) {
  const m = getDensityTokens(doc).padMultiplier;
  const v = (p.padding != null ? p.padding : d);
  return Math.round(v * m);
}

function alignStyle(p) {
  if (p.alignment === 'center') return 'margin-left: auto; margin-right: auto;';
  if (p.alignment === 'right') return 'margin-left: auto;';
  return '';
}

// Build the "box" CSS for a block: corner radius, fill, texture, border.
// Returns { css, dataTexture } — dataTexture marks the element so a
// <style> injection can add ::before texture overlays if needed.
function boxStyle(p, doc, nodeType) {
  const parts = [];
  // Radius: explicit block prop wins; else the shape-language token; else 8.
  let r = p.radius != null ? p.radius : 8;
  if (p.radius == null && doc) {
    const tokenR = getShapeRadius(doc, nodeType);
    if (tokenR != null) r = tokenR;
  }
  parts.push(`border-radius: ${r}px;`);
  if (p.fill) parts.push(`background-color: ${p.fill};`);
  const bw = (p.borderWidth != null ? p.borderWidth : 1);
  if (bw > 0) {
    parts.push(`border: ${bw}px solid ${p.borderColor || 'var(--border)'};`);
  }
  // Texture: explicit non-flat block prop wins; else the global surface token.
  let texture = p.texture || 'flat';
  if (texture === 'flat' && doc) {
    const tokenTex = getSurfaceTexture(doc);
    if (tokenTex && tokenTex !== 'flat') texture = tokenTex;
  }
  if (texture !== 'flat') {
    parts.push(`background-image: ${textureImage(texture, p.fill)};`);
  }
  return { css: parts.join(' '), dataTexture: texture !== 'flat' ? texture : '' };
}

function textureImage(texture, baseFill) {
  switch (texture) {
    case 'dotgrid':
      return 'radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px) 0 0 / 12px 12px';
    case 'scanlines':
      return 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px)';
    case 'gradient':
      return 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%)';
    default:
      return 'none';
  }
}

// Text-decoration CSS from the block's bold/italic/underline props.
function textDeco(p) {
  const parts = [];
  if (p.bold) parts.push('font-weight: 700;');
  if (p.italic) parts.push('font-style: italic;');
  if (p.underline) parts.push('text-decoration: underline;');
  return parts.join(' ');
}

export function renderNodeToHtml(node, opts) {
  const { isSelected = false, currentState = 'ready', doc = null } = opts;
  if (!node) return '';

  const p = node.props || {};
  const nt = node.type;
  let innerContent = '';
  let childrenHtml = '';
  if (node.children && Array.isArray(node.children)) {
    childrenHtml = node.children.map(c => renderNodeToHtml(c, opts)).join('');
  }

  switch (nt) {
    case 'AppShell':
      return `<div class="canvas-node app-shell ${isSelected ? 'selected' : ''}" data-id="${node.id}">${childrenHtml}</div>`;

    case 'CardWidget': {
      const elevClass = p.elevation === 'flat' ? 'mock-card--flat' : p.elevation === 'outlined' ? 'mock-card--outlined' : '';
      const box = boxStyle(p, doc, nt);
      const deco = textDeco(p);
      innerContent = `
        <div class="mock-card ${elevClass}" style="gap: ${scaledGap(p, doc)}px; padding: ${scaledPad(p, doc)}px; ${box.css}" data-texture="${box.dataTexture}">
          <div class="mock-header">
            <div>
              <h3 style="margin: 0; font-size: 1.15em; ${deco}">${p.title || node.name || 'Card Widget'}</h3>
              ${p.subtitle ? `<span style="font-size: 0.8em; color: var(--text-secondary);">${p.subtitle}</span>` : ''}
            </div>
            <span class="mock-pill ${currentState}">${currentState.toUpperCase()}</span>
          </div>
          <div class="card-children-area" style="display: flex; flex-direction: column; gap: ${scaledGap(p, doc)}px; align-items: ${p.alignment === 'center' ? 'center' : p.alignment === 'right' ? 'flex-end' : 'stretch'}; width: ${p.widthPct ?? 100}%;">
            ${childrenHtml || '<p style="font-size: 11px; color: var(--text-tertiary); font-style: italic; margin: 0;">(Empty container)</p>'}
          </div>
        </div>
      `;
      break;
    }

    case 'Button': {
      const v = p.variant || 'primary';
      const cls = v === 'primary' ? 'studio-btn-primary' : v === 'danger' ? 'studio-btn-danger' : v === 'ghost' ? 'studio-btn-ghost' : 'studio-btn-secondary';
      const size = p.size === 'small' ? 'studio-btn-sm' : p.size === 'large' ? 'studio-btn-lg' : '';
      const box = boxStyle(p, doc, nt);
      const deco = textDeco(p);
      innerContent = `
        <button class="studio-btn ${cls} ${size}" ${p.disabled ? 'disabled' : ''} style="width: fit-content; ${p.accentColor ? `--accent: ${p.accentColor};` : ''} ${box.css} ${deco}" data-texture="${box.dataTexture}">
          ${p.label || 'Action Button'}
        </button>
      `;
      break;
    }

    case 'Input':
      innerContent = `
        <div style="display: flex; flex-direction: column; gap: 4px; width: ${p.widthPct ?? 100}%; ${alignStyle(p)}">
          <label style="font-size: 11px; color: var(--text-secondary);">${p.label || 'Field Label'}</label>
          <input class="inspector-input" type="text" placeholder="${p.placeholder || ''}" value="" readonly ${p.disabled ? 'disabled' : ''} style="cursor: default;">
          ${p.helperText ? `<span style="font-size: 10px; color: var(--text-tertiary);">${p.helperText}</span>` : ''}
        </div>
      `;
      break;

    case 'Toggle':
      innerContent = `
        <div style="display: flex; align-items: center; justify-content: ${p.alignment === 'center' ? 'center' : 'space-between'}; gap: 12px; padding: 4px 0; width: ${p.widthPct ?? 100}%; ${alignStyle(p)}">
          <span style="font-size: 12px; color: var(--text-primary);">${p.label || 'Setting Toggle'}</span>
          <span class="mock-pill ${p.checked ? 'completed' : ''}">${p.checked ? 'ENABLED' : 'DISABLED'}</span>
        </div>
      `;
      break;

    case 'Badge': {
      const box = boxStyle(p, doc, nt);
      const deco = textDeco(p);
      innerContent = `
        <span class="mock-pill ${p.variant || 'ready'}" style="width: fit-content; ${p.accentColor ? `background: ${p.accentColor};` : ''} ${box.css} ${deco}" data-texture="${box.dataTexture}">${p.text || 'STATUS'}</span>
      `;
      break;
    }

    case 'Text': {
      const defaultFs = p.variant === 'h1' ? '1.4em' : p.variant === 'h2' ? '1.2em' : p.variant === 'h3' ? '1.05em' : p.variant === 'caption' ? '0.75em' : '0.95em';
      const fs = p.textSize ? `${p.textSize}px` : defaultFs;
      const color = p.textColor || 'var(--text-primary)';
      const weight = p.weight || 400;
      const align = p.alignment === 'center' ? 'center' : p.alignment === 'right' ? 'right' : 'left';
      const box = boxStyle(p, doc, nt);
      const deco = textDeco(p);
      innerContent = `
        <div style="font-size: ${fs}; line-height: 1.45; color: ${color}; font-weight: ${weight}; text-align: ${align}; width: ${p.widthPct ?? 100}%; margin: 0; padding: ${scaledPad(p, doc, 0)}px; ${box.css} ${deco}" data-texture="${box.dataTexture}">
          ${p.content || 'Typography block'}
        </div>
      `;
      break;
    }

    case 'Divider':
      innerContent = `<hr class="mock-divider" style="border: none; border-top: ${(p.thickness || 1)}px solid ${p.color || 'var(--border)'};">`;
      break;

    case 'Section': {
      const isRow = p.layout === 'row';
      const gap = scaledGap(p, doc);
      const pad = scaledPad(p, doc);
      const layoutClass = isRow ? 'mock-section--row' : '';
      const box = boxStyle(p, doc, nt);
      const deco = textDeco(p);
      innerContent = `
        <div class="mock-section ${layoutClass}" style="padding: ${pad}px; ${p.accentColor ? `--accent: ${p.accentColor};` : ''} ${box.css}" data-texture="${box.dataTexture}">
          ${p.showTitle === false ? '' : `
          <div class="mock-section-header" style="margin-bottom: ${gap}px;">
            <span class="mock-section-title" style="${deco}">${p.title || 'Section'}</span>
          </div>`}
          <div class="mock-section-body" style="display: flex; flex-direction: ${isRow ? 'row' : 'column'}; flex-wrap: ${isRow ? 'wrap' : 'nowrap'}; gap: ${gap}px; align-items: ${isRow ? 'flex-start' : p.alignment === 'center' ? 'center' : p.alignment === 'right' ? 'flex-end' : 'stretch'};">
            ${childrenHtml || '<p style="font-size: 12px; color: var(--text-tertiary); font-style: italic; margin: 0;">(Empty section)</p>'}
          </div>
        </div>
      `;
      break;
    }

    case 'RiskGuardBanner': {
      const sevColor = p.severity === 'danger' ? 'var(--danger)' : p.severity === 'info' ? 'var(--accent)' : 'var(--warning, #D29922)';
      const box = boxStyle(p, doc, nt);
      const deco = textDeco(p);
      innerContent = `
        <div class="mock-guard" style="border-left: 3px solid ${sevColor}; ${box.css} ${deco}" data-texture="${box.dataTexture}">
          <strong style="font-size: 12px; color: ${sevColor};">⚠ ${p.title || 'Risk Guard Active'}</strong>
          <span style="font-size: 11px; color: var(--text-secondary);">${p.message || 'Verification required'}</span>
        </div>
      `;
      break;
    }

    case 'MetricChip': {
      const statusColor = p.status === 'critical' ? 'var(--danger)' : p.status === 'warning' ? 'var(--warning, #D29922)' : p.status === 'pending_review' ? 'var(--accent)' : 'var(--success)';
      const box = boxStyle(p, doc, nt);
      const deco = textDeco(p);
      innerContent = `
        <div class="mock-metric" style="${box.css} ${deco}" data-texture="${box.dataTexture}">
          <span style="font-size: 11px; color: var(--text-secondary);">${p.label || 'Metric'}</span>
          <div style="display: flex; align-items: baseline; gap: 8px;">
            <strong style="font-size: 18px; color: ${p.accentColor || 'var(--accent)'};">${p.value || '100%'}</strong>
            <span style="font-size: 11px; color: ${statusColor};">${p.trend || 'nominal'}</span>
          </div>
        </div>
      `;
      break;
    }

    case 'TaskRack': {
      const cols = p.columns || ['Queued', 'In Flight', 'Gate', 'Done'];
      innerContent = `
        <div class="mock-rack" style="grid-template-columns: repeat(${Math.max(cols.length, 1)}, 1fr); gap: ${p.gap ?? 8}px;">
          ${cols.map(c => `
            <div class="mock-rack-col">
              <div style="font-weight: 600; margin-bottom: 6px; font-size: 10px; color: var(--accent); text-transform: uppercase;">${c}</div>
              <div style="background: rgba(255,255,255,0.04); border-radius: 4px; padding: 6px; font-size: 10px;">
                Task #482 · Verified
              </div>
            </div>
          `).join('')}
        </div>
      `;
      break;
    }

    case 'DataTable': {
      const columns = p.columns || ['ID', 'Name', 'State', 'Action'];
      const rows = Math.max(1, Math.min(20, p.rowCount || 2));
      const rowsHtml = Array.from({ length: rows }, (_, i) => `
        <tr>
          <td>#1${String(i).padStart(2, '0')}</td>
          <td>Task ${i + 1}</td>
          <td><span class="mock-pill ${i % 2 === 0 ? 'completed' : 'running'}">${i % 2 === 0 ? 'DONE' : 'RUNNING'}</span></td>
          <td><button class="quick-add-btn" style="pointer-events: none;">View</button></td>
        </tr>
      `).join('');
      innerContent = `
        <table class="mock-table">
          <thead>
            <tr>${columns.map(col => `<th>${col}</th>`).join('')}</tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      `;
      break;
    }

    case 'TimelineTrack': {
      const markers = Math.max(1, Math.min(24, p.markerCount || 4));
      innerContent = `
        <div style="background: rgba(255,255,255,0.04); border-radius: 4px; padding: 8px 12px; display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 10px; color: var(--text-secondary);">
          <span>00:00</span>
          <div style="flex: 1; height: 10px; background: rgba(255,255,255,0.06); border-radius: 2px; position: relative; overflow: hidden;">
            ${Array.from({ length: markers }, (_, i) => `<span style="position: absolute; left: ${Math.round(i * 100 / markers)}%; top: 0; width: 2px; height: 100%; background: var(--accent);"></span>`).join('')}
            <span style="position: absolute; left: 30%; top: -2px; width: 2px; height: 14px; background: var(--danger);"></span>
          </div>
          <span>${Math.floor((p.durationSeconds || 60) / 60)}:${String((p.durationSeconds || 60) % 60).padStart(2, '0')}</span>
        </div>
      `;
      break;
    }

    default:
      innerContent = `
        <div class="mock-card">
          <div class="mock-header">
            <strong>${node.name || node.type}</strong>
          </div>
          <div>${childrenHtml}</div>
        </div>
      `;
  }

  // Common wrapper: width/alignment for leaf blocks. Containers (Section,
  // CardWidget) handle their own inner layout; we still apply width+alignment
  // to the wrapper so the block itself can be narrowed or centred.
  const wrapperStyle = `width: ${p.widthPct ?? 100}%; ${alignStyle(p)}`;

  const wrapper = `
    <div class="canvas-node ${isSelected ? 'selected' : ''}" data-id="${node.id}" style="${wrapperStyle}">
      ${innerContent}
    </div>
  `;
  return wrapper;
}

/**
 * Render full artboard content (both viewports) for a given doc + state.
 * Returns { desktopHtml, mobileHtml }.
 */
export function renderArtboardContent(doc, state) {
  if (!doc || !doc.masterPrototype) return { desktopHtml: '', mobileHtml: '' };
  const opts = { isSelected: false, currentState: state, doc };
  const html = renderNodeToHtml(doc.masterPrototype, opts);
  // Typography tokens: wrap the artboard so the doc's font families + base
  // size override the stylesheet defaults for this render.
  const ty = getTypographyTokens(doc);
  const wrapStyle = `--font-sans: ${ty.fontSans}; --font-mono: ${ty.fontMono}; font-size: ${ty.baseSizePx}px;`;
  return {
    desktopHtml: `<div style="${wrapStyle}">${html}</div>`,
    mobileHtml: `<div style="${wrapStyle}">${html}</div>`
  };
}
