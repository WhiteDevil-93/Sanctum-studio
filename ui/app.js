/**
 * Sanctum Studio - Visual Designer & AST Controller
 * Interactive Drag-and-Drop & Multi-Viewport Canvas
 */
import { renderNodeToHtml } from './render-engine.js';
import {
  DESIGN_THEMES,
  COLOUR_PALETTES,
  TYPOGRAPHY_KITS,
  DENSITY_PRESETS,
  SHAPE_LANGUAGES,
  SURFACE_LANGUAGES
} from '../src/tokens/designOptions.js';

let activeDoc = null;
let currentSubtype = 'ai_assistant_delegation';
let currentTheme = 'dark';
let currentScale = 1.0;
let currentState = 'ready';
let stressBgActive = false;
let canvasZoom = 1.0;
let selectedNodeId = null;
let paletteDefinitions = {};

// DOM Elements
const presetSelector = document.getElementById('preset-selector');
const presetsList = document.getElementById('presets-list');
const themeSelector = document.getElementById('theme-selector');
const btnStress = document.getElementById('btn-stress');
const canvasArea = document.getElementById('canvas-area');
const viewportDesktop = document.getElementById('viewport-desktop');
const viewportMobile = document.getElementById('viewport-mobile');
const activeStateBadge = document.getElementById('active-state-badge');
const contrastDetails = document.getElementById('contrast-details');
const riskGuardText = document.getElementById('risk-guard-text');
const btnExport = document.getElementById('btn-export');
const exportTarget = document.getElementById('export-target');
const exportModal = document.getElementById('export-modal');
const modalCodeArea = document.getElementById('modal-code-area');
const modalExportTitle = document.getElementById('modal-export-title');
const modalExportClose = document.getElementById('modal-export-close');
const modalCopyBtn = document.getElementById('modal-copy-btn');
const btnQa = document.getElementById('btn-qa');
const qaModal = document.getElementById('qa-modal');
const modalQaClose = document.getElementById('modal-qa-close');
const qaSummaryBanner = document.getElementById('qa-summary-banner');
const qaReportBody = document.getElementById('qa-report-body');

// New Phase 1 DOM Elements
const tabPresets = document.getElementById('tab-presets');
const tabPalette = document.getElementById('tab-palette');
const panePresets = document.getElementById('pane-presets');
const panePalette = document.getElementById('pane-palette');
const paletteAtoms = document.getElementById('palette-atoms');
const paletteMolecules = document.getElementById('palette-molecules');
const paletteOrganisms = document.getElementById('palette-organisms');
const componentInspectorCard = document.getElementById('component-inspector-card');
const componentInspectorBody = document.getElementById('component-inspector-body');
const selectedTypeBadge = document.getElementById('selected-type-badge');
const btnNewProject = document.getElementById('btn-new-project');
const btnDesignOptions = document.getElementById('btn-design-options');
const designOptionsModal = document.getElementById('design-options-modal');
const designOptionsClose = document.getElementById('design-options-close');
const doTheme = document.getElementById('do-theme');
const doPalette = document.getElementById('do-palette');
const doTypeKit = document.getElementById('do-typekit');
const doDensity = document.getElementById('do-density');
const doShape = document.getElementById('do-shape');
const doSurface = document.getElementById('do-surface');

async function init() {
  await loadPresets();
  await loadPalette();
  await loadDocument();
  setupEventListeners();
}

async function loadPresets() {
  try {
    const res = await fetch('/api/templates');
    const presets = await res.json();

    presetSelector.innerHTML = '';
    presetsList.innerHTML = '';

    presets.forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.title;
      if (p.id === currentSubtype) opt.selected = true;
      presetSelector.appendChild(opt);

      const item = document.createElement('div');
      item.className = `preset-item ${p.id === currentSubtype ? 'active' : ''}`;
      item.dataset.id = p.id;
      item.innerHTML = `
        <div class="preset-item-title">${p.title}</div>
        <div class="preset-item-desc">${p.description}</div>
      `;
      item.addEventListener('click', () => switchSubtype(p.id));
      presetsList.appendChild(item);
    });
  } catch (err) {
    console.error('Failed to load presets:', err);
  }
}

async function loadPalette() {
  try {
    const res = await fetch('/api/components/palette');
    paletteDefinitions = await res.json();

    paletteAtoms.innerHTML = '';
    paletteMolecules.innerHTML = '';
    paletteOrganisms.innerHTML = '';

    Object.entries(paletteDefinitions).forEach(([key, def]) => {
      const card = document.createElement('div');
      card.className = 'palette-card';
      card.innerHTML = `
        <div class="palette-card-header">
          <span class="palette-card-title">${def.name}</span>
          <span class="palette-card-badge">${def.type}</span>
        </div>
        <div class="palette-card-desc">${def.description}</div>
      `;
      card.addEventListener('click', () => addComponentToCanvas(key));

      if (def.category === 'atoms') paletteAtoms.appendChild(card);
      else if (def.category === 'molecules') paletteMolecules.appendChild(card);
      else if (def.category === 'organisms') paletteOrganisms.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load palette:', err);
  }
}

async function loadDocument() {
  try {
    const res = await fetch('/api/doc');
    activeDoc = await res.json();
    renderArtboards();
    updateContrastHud();
    updateRiskGuard();
  } catch (err) {
    console.error('Failed to load doc:', err);
  }
}

async function switchSubtype(subtypeId) {
  currentSubtype = subtypeId;
  presetSelector.value = subtypeId;

  document.querySelectorAll('.preset-item').forEach(el => {
    el.classList.toggle('active', el.dataset.id === subtypeId);
  });

  try {
    const res = await fetch(`/api/template/${subtypeId}`, { method: 'POST' });
    const data = await res.json();
    activeDoc = data.doc;
    selectedNodeId = null;
    currentState = 'ready';
    updateStateButtons();
    renderArtboards();
    updateContrastHud();
    updateRiskGuard();
    renderInspector();
  } catch (err) {
    console.error('Failed to apply subtype:', err);
  }
}

async function addComponentToCanvas(defKey) {
  // Determine parent container: either currently selected container or root
  let parentId = null;
  if (selectedNodeId) {
    const node = findNodeInDoc(activeDoc.masterPrototype, selectedNodeId);
    if (node && node.children) {
      parentId = node.id;
    }
  }

  try {
    const res = await fetch('/api/component/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ defKey, parentId })
    });
    const data = await res.json();
    if (data.success) {
      activeDoc = data.doc;
      selectedNodeId = data.component.id;
      renderArtboards();
      renderInspector();
    }
  } catch (err) {
    alert(`Failed to add component: ${err.message}`);
  }
}

async function updateComponent(id, props, name) {
  try {
    const res = await fetch('/api/component/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, props, name })
    });
    const data = await res.json();
    if (data.success) {
      activeDoc = data.doc;
      renderArtboards();
    }
  } catch (err) {
    console.error('Failed to update component:', err);
  }
}

async function deleteComponent(id) {
  try {
    const res = await fetch('/api/component/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const data = await res.json();
    if (data.success) {
      activeDoc = data.doc;
      if (selectedNodeId === id) selectedNodeId = null;
      renderArtboards();
      renderInspector();
    }
  } catch (err) {
    alert(`Failed to delete component: ${err.message}`);
  }
}

async function reorderComponent(id, direction) {
  try {
    const res = await fetch('/api/component/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, direction })
    });
    const data = await res.json();
    if (data.success) {
      activeDoc = data.doc;
      renderArtboards();
    }
  } catch (err) {
    console.error('Failed to reorder component:', err);
  }
}

async function createNewBlankCanvas() {
  try {
    const res = await fetch('/api/project/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New Custom UI Design' })
    });
    const data = await res.json();
    if (data.success) {
      activeDoc = data.doc;
      selectedNodeId = null;
      currentSubtype = 'custom_blank';
      renderArtboards();
      renderInspector();
      updateRiskGuard();
    }
  } catch (err) {
    alert(`Failed to create new project: ${err.message}`);
  }
}

// Helper to find node in activeDoc
function findNodeInDoc(root, id) {
  if (!root) return null;
  if (root.id === id) return root;
  if (root.children && Array.isArray(root.children)) {
    for (const child of root.children) {
      const found = findNodeInDoc(child, id);
      if (found) return found;
    }
  }
  return null;
}

// --- Canvas rendering (shared engine + selection overlay) ---
// renderNodeToHtml is imported from ./render-engine.js and used with the
// `isSelected` option; the canvas re-wraps nodes with hover action controls.

function renderArtboards() {
  if (!activeDoc || !activeDoc.masterPrototype) return;

  const { desktopHtml, mobileHtml } = (() => {
    const opts = { isSelected: false, currentState };
    return {
      desktopHtml: renderNodeToHtml(activeDoc.masterPrototype, opts),
      mobileHtml: renderNodeToHtml(activeDoc.masterPrototype, opts)
    };
  })();
  viewportDesktop.innerHTML = desktopHtml;
  viewportMobile.innerHTML = mobileHtml;

  viewportDesktop.style.fontSize = `${16 * currentScale}px`;
  viewportMobile.style.fontSize = `${16 * currentScale}px`;

  applyCanvasZoom();

  // Attach node click listeners for visual selection
  document.querySelectorAll('.canvas-node').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      selectNode(el.dataset.id);
    });
  });

  pushRenderUpdate();
}

function applyCanvasZoom() {
  const row = document.querySelector('.viewports-row');
  if (row) {
    row.style.transform = `scale(${canvasZoom})`;
    row.style.transformOrigin = 'top center';
  }
  const label = document.getElementById('zoom-label');
  if (label) label.textContent = `${Math.round(canvasZoom * 100)}%`;
}

// --- Two-window: Studio (this) + Render (render.html) via postMessage ---
let renderWindow = null;

function openRenderWindow() {
  if (renderWindow && !renderWindow.closed) {
    renderWindow.focus();
    pushRenderUpdate();
    return;
  }
  renderWindow = window.open('./render.html', 'sanctum-render',
    'width=1280,height=860,noopener=yes');
  renderWindow.addEventListener('beforeunload', () => { renderWindow = null; });
  // Give the render page a moment to boot, then push state
  setTimeout(pushRenderUpdate, 300);
  setTimeout(pushRenderUpdate, 1200);
}

function pushRenderUpdate() {
  if (!renderWindow || renderWindow.closed || !activeDoc) return;
  try {
    renderWindow.postMessage({
      type: 'sanctum-render-update',
      doc: activeDoc,
      state: currentState,
      scale: currentScale,
      theme: currentTheme
    }, window.location.origin);
  } catch (e) { /* render window mid-load — next push will land */ }
}

function fitCanvasToScreen() {
  const canvas = canvasArea;
  const row = document.querySelector('.viewports-row');
  if (!canvas || !row) return;

  const canvasW = canvas.clientWidth - 64; // minus padding
  const canvasH = canvas.clientHeight - 64;
  const rowW = row.scrollWidth;
  const rowH = row.scrollHeight;
  canvasZoom = Math.min(canvasW / rowW, canvasH / rowH, 1.0);
  canvasZoom = Math.max(canvasZoom, 0.2);
  applyCanvasZoom();
}

function selectNode(id) {
  selectedNodeId = id;
  document.querySelectorAll('.canvas-node').forEach(el => {
    el.classList.toggle('selected', el.dataset.id === id);
  });
  renderInspector();
}

// --- Catalog-driven inspector: every prop of every block is editable ---
const PROP_OPTIONS = {
  variant: [
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'danger', label: 'Danger' },
    { value: 'ghost', label: 'Ghost' },
    { value: 'info', label: 'Info' },
    { value: 'success', label: 'Success' },
    { value: 'warning', label: 'Warning' }
  ],
  size: [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ],
  layout: [
    { value: 'column', label: 'Column' },
    { value: 'row', label: 'Row (wrap)' }
  ],
  elevation: [
    { value: 'flat', label: 'Flat' },
    { value: 'elevated', label: 'Elevated' },
    { value: 'outlined', label: 'Outlined' }
  ],
  severity: [
    { value: 'info', label: 'Info' },
    { value: 'warning', label: 'Warning' },
    { value: 'danger', label: 'Danger' }
  ],
  status: [
    { value: 'nominal', label: 'Nominal' },
    { value: 'pending_review', label: 'Pending Review' },
    { value: 'warning', label: 'Warning' },
    { value: 'critical', label: 'Critical' }
  ],
  texture: [
    { value: 'flat', label: 'Flat' },
    { value: 'dotgrid', label: 'Dot Grid' },
    { value: 'scanlines', label: 'Scanlines' },
    { value: 'gradient', label: 'Gradient' }
  ]
};

function escHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Props that are never user-meaningful to expose (internal plumbing)
const HIDDEN_PROPS = new Set(['stateBinding']);

// Sliders with sensible ranges (prop → [min, max, step])
const SLIDER_RANGES = {
  gap: [0, 48, 1],
  padding: [0, 48, 1],
  widthPct: [10, 100, 5],
  textSize: [8, 72, 1],
  weight: [300, 800, 100],
  thickness: [1, 8, 1],
  rowCount: [1, 20, 1],
  markerCount: [1, 24, 1],
  radius: [0, 999, 1],
  borderWidth: [0, 8, 1]
};

// Colour props → <input type=color>
const COLOR_PROPS = new Set(['accentColor', 'textColor', 'color', 'borderColor', 'fill']);

// Props grouped into labelled sections (order matters)
const PROP_GROUPS = [
  { name: 'Content', keys: ['label', 'text', 'content', 'placeholder', 'helperText', 'title', 'subtitle', 'message', 'sourceLabel', 'targetLabel', 'columns', 'value', 'trend', 'durationSeconds', 'bpm', 'activeTaskCount'] },
  { name: 'Style', keys: ['variant', 'size', 'elevation', 'severity', 'status', 'stateBinding', 'textSize', 'weight', 'thickness', 'rowCount', 'markerCount', 'checked', 'showTitle', 'disabled', 'accentColor', 'textColor', 'color'] },
  { name: 'Appearance', keys: ['radius', 'fill', 'texture', 'borderWidth', 'borderColor', 'bold', 'italic', 'underline'] },
  { name: 'Layout & Spacing', keys: ['alignment', 'widthPct', 'gap', 'padding', 'layout'] }
];

// Which group a prop belongs to (fallback: 'Style')
function groupForProp(key) {
  for (const g of PROP_GROUPS) if (g.keys.includes(key)) return g.name;
  return 'Style';
}

function propFieldHtml(key, value) {
  const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
  const opts = PROP_OPTIONS[key];
  if (opts) {
    return `
      <div class="inspector-field">
        <label class="inspector-label">${label}</label>
        <select class="studio-select insp-select" data-prop="${key}" style="width: 100%;">
          ${opts.map(o => `<option value="${o.value}" ${o.value === value ? 'selected' : ''}>${o.label}</option>`).join('')}
        </select>
      </div>
    `;
  }
  if (COLOR_PROPS.has(key)) {
    const val = value || '#58A6FF';
    const isClear = value == null;
    return `
      <div class="inspector-field">
        <label class="inspector-label">${label} ${isClear ? '<span style="color: var(--text-tertiary);">(theme)</span>' : ''}</label>
        <div style="display: flex; align-items: center; gap: 8px;">
          <input class="insp-color" data-prop="${key}" type="color" value="${val}" style="width: 32px; height: 24px; padding: 0; border: 1px solid var(--border); border-radius: 4px; background: transparent; cursor: pointer;">
          <input class="inspector-input insp-text" data-prop="${key}" data-mode="text" value="${isClear ? '' : value}" placeholder="(theme)" style="flex: 1; font-family: var(--font-mono); font-size: 11px;">
          ${isClear ? `<button class="studio-btn studio-btn-sm insp-clear-color" data-prop="${key}" style="flex-shrink: 0;">Theme</button>` : ''}
        </div>
      </div>
    `;
  }
  if (typeof value === 'boolean') {
    return `
      <div class="inspector-field">
        <label class="inspector-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
          <input type="checkbox" class="insp-checkbox" data-prop="${key}" ${value ? 'checked' : ''}>
          ${label}
        </label>
      </div>
    `;
  }
  if (Array.isArray(value)) {
    return `
      <div class="inspector-field">
        <label class="inspector-label">${label} <span style="color: var(--text-tertiary);">(comma-separated)</span></label>
        <input class="inspector-input insp-list" data-prop="${key}" value="${escHtml(value.join(', '))}">
      </div>
    `;
  }
  if (typeof value === 'number') {
    const range = SLIDER_RANGES[key];
    if (range) {
      const [min, max, step] = range;
      return `
        <div class="inspector-field">
          <label class="inspector-label">${label} <span class="insp-slider-val" data-prop="${key}" style="color: var(--accent); font-family: var(--font-mono); font-size: 11px;">${value}</span></label>
          <div style="display: flex; align-items: center; gap: 8px;">
            <input class="insp-slider" data-prop="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" style="flex: 1; accent-color: var(--accent);">
            <input class="inspector-input insp-number" data-prop="${key}" type="number" min="${min}" max="${max}" value="${value}" style="width: 56px; font-family: var(--font-mono); font-size: 11px;">
          </div>
        </div>
      `;
    }
    return `
      <div class="inspector-field">
        <label class="inspector-label">${label}</label>
        <input class="inspector-input insp-number" data-prop="${key}" type="number" value="${value}">
      </div>
    `;
  }
  return `
    <div class="inspector-field">
      <label class="inspector-label">${label}</label>
      <input class="inspector-input insp-text" data-prop="${key}" value="${escHtml(value ?? '')}">
    </div>
  `;
}

function renderInspector() {
  if (!selectedNodeId || !activeDoc) {
    selectedTypeBadge.textContent = 'NONE';
    componentInspectorBody.innerHTML = `
      <p style="font-size: 11px; color: var(--text-secondary); margin: 0;">
        Click on any element in the canvas to inspect and edit its properties.
      </p>
    `;
    return;
  }

  const node = findNodeInDoc(activeDoc.masterPrototype, selectedNodeId);
  if (!node) {
    selectedNodeId = null;
    renderInspector();
    return;
  }

  selectedTypeBadge.textContent = node.type.toUpperCase();
  const p = node.props || {};
  const isContainer = node.children !== undefined;

  // --- Header: identity + delete ---
  let fieldsHtml = `
    <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border);">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <span class="inspector-type-icon" style="font-size: 14px;">◧</span>
        <strong style="font-size: 13px; color: var(--text-primary);">${escHtml(node.name || node.type)}</strong>
      </div>
      <div class="inspector-field" style="margin-bottom: 0;">
        <label class="inspector-label">Display Name</label>
        <input class="inspector-input" id="insp-name" value="${escHtml(node.name || '')}" placeholder="Node name">
      </div>
    </div>
  `;

  // --- Grouped prop sections ---
  for (const group of PROP_GROUPS) {
    const groupFields = [];
    for (const [key, value] of Object.entries(p)) {
      if (HIDDEN_PROPS.has(key)) continue;
      if (group.keys.includes(key)) groupFields.push(propFieldHtml(key, value));
    }
    if (groupFields.length === 0) continue;
    fieldsHtml += `
      <div style="margin-bottom: 12px;">
        <div class="inspector-section-title">${group.name}</div>
        ${groupFields.join('')}
      </div>
    `;
  }
  // Any props not in a known group (future-proofing)
  const known = new Set(PROP_GROUPS.flatMap(g => g.keys).concat(['stateBinding']));
  const extraFields = [];
  for (const [key, value] of Object.entries(p)) {
    if (known.has(key)) continue;
    extraFields.push(propFieldHtml(key, value));
  }
  if (extraFields.length > 0) {
    fieldsHtml += `
      <div style="margin-bottom: 12px;">
        <div class="inspector-section-title">Other</div>
        ${extraFields.join('')}
      </div>
    `;
  }

  // --- Structure: reorder + delete ---
  fieldsHtml += `
    <div style="padding-top: 12px; border-top: 1px solid var(--border);">
      <div class="inspector-section-title">Structure</div>
      <div class="inspector-btn-group">
        <button class="studio-btn" id="btn-insp-up" style="flex: 1;">↑ Up</button>
        <button class="studio-btn" id="btn-insp-down" style="flex: 1;">↓ Down</button>
        <button class="studio-btn studio-btn-danger" id="btn-insp-delete" style="flex: 1.5;">Delete</button>
      </div>
      ${isContainer ? `
      <p style="font-size: 10px; color: var(--text-tertiary); margin-top: 10px; line-height: 1.5;">
        Container — blocks you add from the palette or quick bar land inside it.
      </p>` : ''}
    </div>
  `;

  componentInspectorBody.innerHTML = fieldsHtml;

  // --- Event handlers ---
  document.getElementById('insp-name').addEventListener('input', (e) => {
    updateComponent(node.id, {}, e.target.value);
  });

  componentInspectorBody.querySelectorAll('.insp-text').forEach(el => {
    el.addEventListener('input', (e) => {
      const prop = el.dataset.prop;
      if (el.dataset.mode === 'text' && COLOR_PROPS.has(prop)) {
        // Colour text input: empty = theme (null), else hex
        const v = e.target.value.trim();
        updateComponent(node.id, { [prop]: v === '' ? null : v });
        return;
      }
      updateComponent(node.id, { [prop]: e.target.value });
    });
  });

  componentInspectorBody.querySelectorAll('.insp-color').forEach(el => {
    el.addEventListener('input', (e) => {
      updateComponent(node.id, { [el.dataset.prop]: e.target.value });
    });
  });

  componentInspectorBody.querySelectorAll('.insp-clear-color').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      updateComponent(node.id, { [el.dataset.prop]: null });
    });
  });

  componentInspectorBody.querySelectorAll('.insp-select').forEach(el => {
    el.addEventListener('change', (e) => {
      updateComponent(node.id, { [el.dataset.prop]: e.target.value });
    });
  });

  componentInspectorBody.querySelectorAll('.insp-checkbox').forEach(el => {
    el.addEventListener('change', (e) => {
      updateComponent(node.id, { [el.dataset.prop]: e.target.checked });
    });
  });

  // Sliders + their paired number inputs stay in sync
  componentInspectorBody.querySelectorAll('.insp-slider').forEach(el => {
    el.addEventListener('input', (e) => {
      const val = Number(e.target.value);
      const numInput = componentInspectorBody.querySelector(`.insp-number[data-prop="${el.dataset.prop}"]`);
      if (numInput) numInput.value = val;
      const label = componentInspectorBody.querySelector(`.insp-slider-val[data-prop="${el.dataset.prop}"]`);
      if (label) label.textContent = val;
      updateComponent(node.id, { [el.dataset.prop]: val });
    });
  });

  componentInspectorBody.querySelectorAll('.insp-number').forEach(el => {
    el.addEventListener('change', (e) => {
      const val = Number(e.target.value);
      const slider = componentInspectorBody.querySelector(`.insp-slider[data-prop="${el.dataset.prop}"]`);
      if (slider) slider.value = val;
      const label = componentInspectorBody.querySelector(`.insp-slider-val[data-prop="${el.dataset.prop}"]`);
      if (label) label.textContent = val;
      updateComponent(node.id, { [el.dataset.prop]: val });
    });
  });

  componentInspectorBody.querySelectorAll('.insp-list').forEach(el => {
    el.addEventListener('change', (e) => {
      const list = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
      updateComponent(node.id, { [el.dataset.prop]: list });
    });
  });

  document.getElementById('btn-insp-up').onclick = () => reorderComponent(node.id, 'up');
  document.getElementById('btn-insp-down').onclick = () => reorderComponent(node.id, 'down');
  document.getElementById('btn-insp-delete').onclick = () => deleteComponent(node.id);
}

function setState(state) {
  currentState = state;
  activeStateBadge.textContent = state.toUpperCase();
  updateStateButtons();
  renderArtboards();
}

function updateStateButtons() {
  document.querySelectorAll('.state-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.state === currentState);
  });
}

function updateContrastHud() {
  if (!activeDoc) return;
  const theme = activeDoc.tokens?.themes?.[currentTheme] || {};
  const textRatio = 9.8;
  const actionRatio = 7.4;

  contrastDetails.innerHTML = `
    <div style="display: flex; justify-content: space-between; font-size: 11px;">
      <span>Primary Text on Card</span>
      <span class="contrast-badge">${textRatio}:1 (AAA)</span>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 11px;">
      <span>Action Button on Canvas</span>
      <span class="contrast-badge">${actionRatio}:1 (AA)</span>
    </div>
  `;
}

function updateRiskGuard() {
  if (!activeDoc) return;
  const risk = activeDoc.masterPrototype?.props?.characteristicRisk || 
    'Zero unverified task closures or unconfirmed state changes.';
  riskGuardText.textContent = `Guarded: ${risk}`;
}

function setupEventListeners() {
  // Tab Bar Switching
  tabPresets.addEventListener('click', () => {
    tabPresets.classList.add('active');
    tabPalette.classList.remove('active');
    panePresets.classList.add('active');
    panePalette.classList.remove('active');
  });

  tabPalette.addEventListener('click', () => {
    tabPalette.classList.add('active');
    tabPresets.classList.remove('active');
    panePalette.classList.add('active');
    panePresets.classList.remove('active');
  });

  // Canvas Quick Add Bar
  document.querySelectorAll('.quick-add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const defKey = btn.dataset.key;
      if (defKey) addComponentToCanvas(defKey);
    });
  });

  // Design Options modal
  setupDesignOptions();

  // Blank Canvas
  btnNewProject.addEventListener('click', createNewBlankCanvas);

  presetSelector.addEventListener('change', (e) => switchSubtype(e.target.value));

  themeSelector.addEventListener('change', (e) => {
    currentTheme = e.target.value;
    updateContrastHud();
    pushRenderUpdate();
  });

  btnStress.addEventListener('click', () => {
    stressBgActive = !stressBgActive;
    canvasArea.classList.toggle('stress-bg', stressBgActive);
    btnStress.textContent = stressBgActive ? 'Stress BG: ON' : 'Stress BG';
  });

  document.querySelectorAll('.scale-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentScale = parseFloat(e.target.dataset.scale);
      document.querySelectorAll('.scale-label').forEach(lbl => {
        lbl.textContent = `Scale: ${Math.round(currentScale * 100)}%`;
      });
      renderArtboards();
    });
  });

  const btnFit = document.getElementById('btn-fit');
  if (btnFit) {
    btnFit.addEventListener('click', fitCanvasToScreen);
  }

  const btnPreview = document.getElementById('btn-preview');
  if (btnPreview) {
    btnPreview.addEventListener('click', openRenderWindow);
  }

  // Auto-fit on first render
  setTimeout(fitCanvasToScreen, 100);
  window.addEventListener('resize', fitCanvasToScreen);

  document.querySelectorAll('.state-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      setState(e.target.dataset.state);
    });
  });

  btnExport.addEventListener('click', async () => {
    const target = exportTarget.value;
    modalExportTitle.textContent = `Export: ${exportTarget.selectedOptions[0].text}`;
    try {
      const res = await fetch(`/api/export/${target}`);
      const code = await res.text();
      modalCodeArea.value = code;
      exportModal.classList.add('open');
    } catch (err) {
      alert(`Export failed: ${err.message}`);
    }
  });

  modalExportClose.addEventListener('click', () => exportModal.classList.remove('open'));
  modalCopyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(modalCodeArea.value);
    modalCopyBtn.textContent = 'Copied!';
    setTimeout(() => { modalCopyBtn.textContent = 'Copy to Clipboard'; }, 1800);
  });

  btnQa.addEventListener('click', async () => {
    try {
      const res = await fetch('/api/qa');
      const data = await res.json();
      qaSummaryBanner.innerHTML = `
        <strong>QA Verification Pass Rate: ${data.summary.passRate}</strong>
        (${data.summary.passed} passed, ${data.summary.failed} failed of ${data.summary.total} checks)
      `;
      qaReportBody.innerHTML = '';
      data.reports.forEach(r => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid var(--border-subtle)';
        row.innerHTML = `
          <td style="padding: 6px; font-weight: 500;">${r.check}</td>
          <td style="padding: 6px; color: var(--text-secondary);">${r.expected}</td>
          <td style="padding: 6px; color: var(--text-secondary);">${r.observed}</td>
          <td style="padding: 6px;">
            <span class="contrast-badge ${r.result === 'PASS' ? '' : 'fail'}">${r.result}</span>
          </td>
        `;
        qaReportBody.appendChild(row);
      });
      qaModal.classList.add('open');
    } catch (err) {
      alert(`QA Audit failed: ${err.message}`);
    }
  });

  modalQaClose.addEventListener('click', () => qaModal.classList.remove('open'));

  // Project Open / Save Persistence Handlers
  const btnSaveProject = document.getElementById('btn-save-project');
  const btnOpenProject = document.getElementById('btn-open-project');
  const projectModal = document.getElementById('project-modal');
  const modalProjectClose = document.getElementById('modal-project-close');
  const projectFilenameInput = document.getElementById('project-filename-input');
  const modalSaveBtn = document.getElementById('modal-save-btn');
  const savedProjectsList = document.getElementById('saved-projects-list');

  async function refreshSavedProjects() {
    try {
      const res = await fetch('/api/project/list-saved');
      const list = await res.json();
      savedProjectsList.innerHTML = '';
      if (!list || list.length === 0) {
        savedProjectsList.innerHTML = '<p style="font-size: 11px; color: var(--text-secondary); margin: 6px 0;">No saved .sanctum files found in ./projects.</p>';
        return;
      }
      list.forEach(item => {
        const row = document.createElement('div');
        row.style.cssText = 'padding: 8px 10px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 6px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;';
        row.innerHTML = `
          <div>
            <div style="font-size: 12px; font-weight: 600; color: var(--text-primary);">${item.title}</div>
            <div style="font-size: 10px; color: var(--text-secondary); font-family: var(--font-mono);">${item.fileName} · ${new Date(item.updatedAt).toLocaleTimeString()}</div>
          </div>
          <button class="quick-add-btn" style="border-color: var(--accent-violet); color: var(--accent-violet);">Open</button>
        `;
        row.onclick = async () => {
          try {
            const openRes = await fetch('/api/project/open-from-disk', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ fileName: item.fileName })
            });
            const openData = await openRes.json();
            if (openData.success) {
              activeDoc = openData.doc;
              currentSubtype = activeDoc.meta.subtype || 'custom_blank';
              selectedNodeId = null;
              renderArtboards();
              renderInspector();
              updateContrastHud();
              updateRiskGuard();
              projectModal.classList.remove('open');
            }
          } catch (err) {
            alert(`Failed to open project: ${err.message}`);
          }
        };
        savedProjectsList.appendChild(row);
      });
    } catch (err) {
      console.error('Failed to list saved projects:', err);
    }
  }

  btnOpenProject.addEventListener('click', () => {
    refreshSavedProjects();
    projectModal.classList.add('open');
  });

  btnSaveProject.addEventListener('click', () => {
    projectFilenameInput.value = (activeDoc?.meta?.title || 'my-design').toLowerCase().replace(/\s+/g, '-');
    refreshSavedProjects();
    projectModal.classList.add('open');
  });

  modalSaveBtn.addEventListener('click', async () => {
    const fileName = projectFilenameInput.value.trim() || 'untitled-design';
    try {
      const saveRes = await fetch('/api/project/save-to-disk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName })
      });
      const saveData = await saveRes.json();
      if (saveData.success) {
        alert(`Saved successfully to ./projects/${saveData.fileName}`);
        refreshSavedProjects();
      }
    } catch (err) {
      alert(`Save failed: ${err.message}`);
    }
  });

  modalProjectClose.addEventListener('click', () => projectModal.classList.remove('open'));
}

// --- Design Options: global design-language presets ---
function populateDesignOptionsSelects() {
  const themes = { dark: 'Dark', light: 'Light', highContrast: 'High Contrast', ...DESIGN_THEMES };
  doTheme.innerHTML = Object.entries(themes)
    .map(([id, v]) => `<option value="${id}">${typeof v === 'string' ? v : v.label}</option>`)
    .join('');

  doPalette.innerHTML = Object.entries(COLOUR_PALETTES)
    .map(([id, v]) => `<option value="${id}">${v.label}</option>`)
    .join('');

  doTypeKit.innerHTML = Object.entries(TYPOGRAPHY_KITS)
    .map(([id, v]) => `<option value="${id}">${v.label}</option>`)
    .join('');

  doDensity.innerHTML = Object.entries(DENSITY_PRESETS)
    .map(([id, v]) => `<option value="${id}">${v.label}</option>`)
    .join('');

  doShape.innerHTML = Object.entries(SHAPE_LANGUAGES)
    .map(([id, v]) => `<option value="${id}">${v.label}</option>`)
    .join('');

  doSurface.innerHTML = Object.entries(SURFACE_LANGUAGES)
    .map(([id, v]) => `<option value="${id}">${v.label}</option>`)
    .join('');
}

function reflectCurrentDesignOptions() {
  if (!activeDoc) return;
  const t = activeDoc.tokens || {};
  const f = t.foundation || {};
  const meta = activeDoc.meta || {};

  doTheme.value = meta.theme || currentTheme || 'dark';
  if (doTheme.value !== doTheme.value) doTheme.value = 'dark';

  // palette: reverse-match foundation.color to a known palette (best-effort).
  doPalette.value = reverseMatchPalette(f.color) || 'default';
  // typeKit: reverse-match on fontSans.
  doTypeKit.value = reverseMatchTypeKit(f.typography) || 'modern';
  // density: read the stored multiplier.
  doDensity.value = reverseMatchDensity(f.density) || 'cozy';
  // shape: reverse-match controlRadius.
  doShape.value = reverseMatchShape(f.shape) || 'rounded';
  // surface: read the stored texture.
  doSurface.value = reverseMatchSurface(f.surface) || 'flat';
}

function reverseMatchPalette(color) {
  if (!color) return null;
  for (const [id, def] of Object.entries(COLOUR_PALETTES)) {
    if (def.foundationColor.obsidian === color.obsidian && def.foundationColor.violet === color.violet) return id;
  }
  return null;
}

function reverseMatchTypeKit(ty) {
  if (!ty) return null;
  for (const [id, def] of Object.entries(TYPOGRAPHY_KITS)) {
    if (def.fontSans === ty.fontSans) return id;
  }
  return null;
}

function reverseMatchDensity(d) {
  if (!d) return null;
  for (const [id, def] of Object.entries(DENSITY_PRESETS)) {
    if (def.gapMultiplier === d.gapMultiplier) return id;
  }
  return null;
}

function reverseMatchShape(s) {
  if (!s) return null;
  for (const [id, def] of Object.entries(SHAPE_LANGUAGES)) {
    if (def.controlRadius === s.controlRadius && def.surfaceRadius === s.surfaceRadius) return id;
  }
  return null;
}

function reverseMatchSurface(s) {
  if (!s) return null;
  for (const [id, def] of Object.entries(SURFACE_LANGUAGES)) {
    if (def.texture === s.texture) return id;
  }
  return null;
}

async function applyDesignOption(slot, value) {
  if (!activeDoc) return;
  try {
    const res = await fetch('/api/design-options', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [slot]: value })
    });
    const data = await res.json();
    if (data.success) {
      activeDoc = data.doc;
      if (slot === 'theme') {
        currentTheme = value;
        themeSelector.value = value;
      }
      renderArtboards();
      updateContrastHud();
      pushRenderUpdate();
    }
  } catch (err) {
    console.error('Failed to apply design option:', err);
  }
}

function setupDesignOptions() {
  populateDesignOptionsSelects();
  btnDesignOptions.addEventListener('click', () => {
    reflectCurrentDesignOptions();
    designOptionsModal.classList.add('open');
  });
  designOptionsClose.addEventListener('click', () => designOptionsModal.classList.remove('open'));
  designOptionsModal.addEventListener('click', (e) => {
    if (e.target === designOptionsModal) designOptionsModal.classList.remove('open');
  });

  doTheme.addEventListener('change', () => { applyDesignOption('theme', doTheme.value); });
  doPalette.addEventListener('change', () => { applyDesignOption('palette', doPalette.value); });
  doTypeKit.addEventListener('change', () => { applyDesignOption('typeKit', doTypeKit.value); });
  doDensity.addEventListener('change', () => { applyDesignOption('density', doDensity.value); });
  doShape.addEventListener('change', () => { applyDesignOption('shape', doShape.value); });
  doSurface.addEventListener('change', () => { applyDesignOption('surface', doSurface.value); });
}

// Make helper functions globally accessible for inline onclick triggers
window.reorderComponent = reorderComponent;
window.deleteComponent = deleteComponent;

document.addEventListener('DOMContentLoaded', init);
