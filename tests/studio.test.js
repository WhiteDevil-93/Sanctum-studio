/**
 * Sanctum Studio - Comprehensive Unit & Verification Test Suite
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { createEmptyDocument, INTERFACE_SUBTYPES } from '../src/ast/schema.js';
import { getRelativeLuminance, getContrastRatio, evaluateWcagCompliance } from '../src/tokens/contrast.js';
import { TokenManager } from '../src/tokens/tokenManager.js';
import { listAllTemplates, createTemplateBySubtype } from '../src/templates/index.js';
import { PRESETS_CATALOG } from '../src/templates/presetsCatalog.js';
import { exportToCompose } from '../src/exporters/composeExporter.js';
import { exportToPyQt } from '../src/exporters/pyqtExporter.js';
import { exportToReact } from '../src/exporters/reactExporter.js';
import { exportToDtcgTokens } from '../src/exporters/dtcgExporter.js';
import { exportToDesignCanvas } from '../src/exporters/canvasExporter.js';
import { runFullQaAudit } from '../src/validation/a11yAuditor.js';
import { handleToolCall } from '../src/mcp/mcpServer.js';
import {
  COMPONENT_DEFINITIONS,
  createComponentInstance,
  findNodeById,
  findParentNode,
  removeNodeById
} from '../src/ast/components.js';

test('1. AST Document Schema & Initialization', () => {
  const doc = createEmptyDocument('Test Hub', 'ai_assistant_delegation');
  assert.equal(doc.meta.title, 'Test Hub');
  assert.equal(doc.meta.subtype, 'ai_assistant_delegation');
  assert.ok(doc.tokens.foundation.color.violet);
  assert.ok(doc.stateModel.states.includes('ready'));
  assert.ok(doc.stateModel.states.includes('running'));
});

test('2. Interface Subtypes & 23 Preset Templates', async () => {
  assert.equal(INTERFACE_SUBTYPES.length, 23);
  assert.equal(PRESETS_CATALOG.length, 23);

  const { SPECIALIZED_FACTORIES } = await import('../src/templates/index.js');
  assert.equal(Object.keys(SPECIALIZED_FACTORIES).length, 23, 'All 23 presets must have specialized factories');

  const templates = listAllTemplates();
  assert.equal(templates.length, 23);

  // Instantiate each of the 23 presets to ensure clean execution and custom AST nodes
  for (const preset of PRESETS_CATALOG) {
    const doc = createTemplateBySubtype(preset.id);
    assert.equal(doc.meta.subtype, preset.id);
    assert.ok(doc.masterPrototype.id);
    assert.ok(doc.masterPrototype.children.length > 0, `Preset ${preset.id} must have non-empty children`);
  }
});

test('3. WCAG 2.2 Relative Luminance & Contrast Calculation', () => {
  // Pure Black & Pure White
  const lumBlack = getRelativeLuminance('#000000');
  const lumWhite = getRelativeLuminance('#FFFFFF');
  assert.equal(lumBlack, 0);
  assert.equal(lumWhite, 1);

  const maxContrast = getContrastRatio('#FFFFFF', '#000000');
  assert.equal(maxContrast, 21);

  // Violet (#9A8CFF) on Obsidian (#0B0C10)
  const violetContrast = getContrastRatio('#9A8CFF', '#0B0C10');
  assert.ok(violetContrast >= 7.0, `Contrast ${violetContrast} should be >= 7.0 (AAA)`);

  const evalResult = evaluateWcagCompliance(violetContrast);
  assert.equal(evalResult.pass, true);
  assert.equal(evalResult.level, 'AAA');
});

test('4. Token Manager, DTCG 2025.10 & CSS Generation', () => {
  const doc = createEmptyDocument('Token Test', 'consumer_utility');
  const manager = new TokenManager(doc.tokens);

  const resolvedDark = manager.getResolvedThemeTokens('dark');
  assert.ok(resolvedDark.surfaceCanvas);
  assert.ok(resolvedDark.textPrimary);

  // DTCG 2025.10 JSON format verification
  const dtcg = manager.toDTCG();
  assert.ok(dtcg.color.violet);
  assert.equal(dtcg.color.violet.$type, 'color');
  assert.equal(dtcg.color.violet.$value, '#9A8CFF');

  // CSS variables verification
  const css = manager.toCSS();
  assert.ok(css.includes('--space-md: 1.0em'));
  assert.ok(css.includes('--surface-canvas: #0B0C10'));
});

test('5. Multi-Target Code Exporters', () => {
  const doc = createTemplateBySubtype('ai_assistant_delegation');

  // A. Compose Multiplatform
  const composeCode = exportToCompose(doc);
  assert.ok(composeCode.includes('@Composable'));
  assert.ok(composeCode.includes('sealed interface SanctumAgentHubUiState'));
  assert.ok(composeCode.includes('Card('));

  // B. PyQt6 / CardWidget
  const pyqtCode = exportToPyQt(doc);
  assert.ok(pyqtCode.includes('class CardWidget(QFrame):'));
  assert.ok(pyqtCode.includes('class SanctumAgentHubPage(QWidget):'));
  assert.ok(pyqtCode.includes('.setMinimumHeight(44)'));

  // C. React / Web
  const reactCode = exportToReact(doc);
  assert.ok(reactCode.includes('export function SanctumAgentHub'));
  assert.ok(reactCode.includes('@container'));
  assert.ok(reactCode.includes('min-h-[2.75em]'));

  // D. DTCG Tokens
  const dtcgExport = exportToDtcgTokens(doc);
  assert.ok(dtcgExport.tokensJson.includes('https://design-tokens.github.io'));
  assert.ok(dtcgExport.tokensCss.includes('--font-sans'));

  // E. Design Canvas Format
  const canvasFiles = exportToDesignCanvas(doc);
  assert.ok(canvasFiles['Main.dc.html']);
  assert.ok(canvasFiles['canvas.json']);
  const parsedCanvas = JSON.parse(canvasFiles['canvas.json']);
  assert.equal(parsedCanvas.v, 3);
  assert.ok(parsedCanvas.boards['Main.dc.html']);
});

test('6. Automated QA & A11y Auditor', () => {
  const doc = createTemplateBySubtype('ai_assistant_delegation');
  const audit = runFullQaAudit(doc);

  assert.ok(audit.summary.total > 0);
  assert.ok(audit.summary.passed > 0);
  assert.equal(audit.summary.failed, 0); // All default tokens pass WCAG AA
  assert.equal(audit.summary.passRate, '100%');
});

test('7. Model Context Protocol (MCP) Server Tool Calls', () => {
  // Tools listing
  const listRes = handleToolCall('design_list_templates', {});
  const templates = JSON.parse(listRes.content[0].text);
  assert.equal(templates.length, 23);

  // Apply template tool
  const applyRes = handleToolCall('design_apply_template', { subtypeId: 'creative_document_editor' });
  assert.ok(applyRes.content[0].text.includes('creative_document_editor'));

  // Inspect active doc tool
  const docRes = handleToolCall('design_get_active_doc', {});
  const doc = JSON.parse(docRes.content[0].text);
  assert.equal(doc.meta.subtype, 'creative_document_editor');

  // Validate QA tool
  const qaRes = handleToolCall('design_validate_qa', {});
  const qa = JSON.parse(qaRes.content[0].text);
  assert.equal(qa.summary.passRate, '100%');

  // Insert component tool
  const insertRes = handleToolCall('design_insert_component', { defKey: 'button', customProps: { label: 'MCP Deployed Button' } });
  assert.ok(insertRes.content[0].text.includes('Successfully inserted component'));

  // Save project tool
  const saveRes = handleToolCall('design_save_project', { fileName: 'mcp-test-save' });
  assert.ok(saveRes.content[0].text.includes('Successfully saved design'));

  // Load project tool
  const loadRes = handleToolCall('design_load_project', { fileName: 'mcp-test-save.sanctum' });
  assert.ok(loadRes.content[0].text.includes('Successfully loaded project'));

  // Export code tool
  const exportRes = handleToolCall('design_export_code', { target: 'compose' });
  assert.ok(exportRes.content[0].text.includes('@Composable'));
});

test('8. Component Library & Instance Generation', () => {
  assert.ok(COMPONENT_DEFINITIONS.button);
  assert.ok(COMPONENT_DEFINITIONS.card_widget);
  assert.ok(COMPONENT_DEFINITIONS.task_rack);
  assert.ok(COMPONENT_DEFINITIONS.risk_guard);

  const btn = createComponentInstance('button', { label: 'Deploy Model' });
  assert.equal(btn.type, 'Button');
  assert.equal(btn.props.label, 'Deploy Model');
  assert.equal(btn.props.variant, 'primary');

  const card = createComponentInstance('card_widget', { title: 'Pipeline Status' });
  assert.equal(card.type, 'CardWidget');
  assert.ok(Array.isArray(card.children));
});

test('9. Component Tree Operations & Build Your Own Mutations', () => {
  const doc = createEmptyDocument('Custom UI', 'custom_blank');

  const card = createComponentInstance('card_widget', { title: 'Main Panel' });
  const btn = createComponentInstance('button', { label: 'Submit Task' });
  const input = createComponentInstance('input', { label: 'Task Name' });

  card.children.push(input);
  card.children.push(btn);
  doc.masterPrototype.children.push(card);

  // Find node
  const foundBtn = findNodeById(doc.masterPrototype, btn.id);
  assert.ok(foundBtn);
  assert.equal(foundBtn.props.label, 'Submit Task');

  // Find parent
  const parent = findParentNode(doc.masterPrototype, btn.id);
  assert.ok(parent);
  assert.equal(parent.id, card.id);

  // Remove node
  const removed = removeNodeById(doc.masterPrototype, input.id);
  assert.equal(removed, true);
  assert.equal(card.children.length, 1);
  assert.equal(card.children[0].id, btn.id);
});

test('10. Local Project Storage & .sanctum File Persistence', async () => {
  const { saveProjectToDisk, loadProjectFromDisk, listSavedProjects, PROJECTS_DIR } = await import('../src/server/projectStorage.js');
  const doc = createEmptyDocument('Test Persistent Project', 'testing_coding_sandbox');

  const saveRes = saveProjectToDisk('test-sandbox-persist', doc);
  assert.equal(saveRes.success, true);
  assert.ok(saveRes.filePath.endsWith('test-sandbox-persist.sanctum'));

  const list = listSavedProjects();
  assert.ok(list.length > 0);
  const foundInList = list.find(p => p.fileName === 'test-sandbox-persist.sanctum');
  assert.ok(foundInList);
  assert.equal(foundInList.title, 'Test Persistent Project');

  const loadRes = loadProjectFromDisk('test-sandbox-persist.sanctum');
  assert.equal(loadRes.success, true);
  assert.equal(loadRes.doc.meta.title, 'Test Persistent Project');
  assert.equal(loadRes.doc.meta.subtype, 'testing_coding_sandbox');
});

test('11. End-to-End Workflow Certification (Build -> Persist -> Reload -> Export)', async () => {
  const { saveProjectToDisk, loadProjectFromDisk } = await import('../src/server/projectStorage.js');
  
  // 1. Start with new blank custom project
  const doc = createEmptyDocument('E2E Production Station', 'custom_blank');
  assert.equal(doc.meta.title, 'E2E Production Station');
  assert.equal(doc.masterPrototype.children.length, 0);

  // 2. Build custom UI hierarchy via component definitions
  const card = createComponentInstance('card_widget', { title: 'System Operations Control' });
  const riskGuard = createComponentInstance('risk_guard', { 
    severity: 'critical', 
    message: 'High-risk automated execution detected. Human approval required.' 
  });
  const taskRack = createComponentInstance('task_rack', { title: 'Pending Pipeline Jobs' });
  const deployBtn = createComponentInstance('button', { label: 'Execute Pipeline', variant: 'primary' });
  const cancelBtn = createComponentInstance('button', { label: 'Abort Operation', variant: 'secondary' });

  card.children.push(riskGuard);
  card.children.push(taskRack);
  card.children.push(deployBtn);
  card.children.push(cancelBtn);
  doc.masterPrototype.children.push(card);

  // 3. Verify tree structure
  assert.equal(doc.masterPrototype.children.length, 1);
  assert.equal(doc.masterPrototype.children[0].children.length, 4);

  // 4. Run automated QA & A11y audit
  const qa = runFullQaAudit(doc);
  assert.equal(qa.summary.failed, 0);
  assert.equal(qa.summary.passRate, '100%');

  // 5. Save project to disk
  const saveRes = saveProjectToDisk('e2e-certified-build', doc);
  assert.equal(saveRes.success, true);

  // 6. Reload project from disk
  const loadRes = loadProjectFromDisk('e2e-certified-build.sanctum');
  assert.equal(loadRes.success, true);
  const loadedDoc = loadRes.doc;
  assert.equal(loadedDoc.meta.title, 'E2E Production Station');
  assert.equal(loadedDoc.masterPrototype.children.length, 1);
  assert.equal(loadedDoc.masterPrototype.children[0].props.title, 'System Operations Control');

  // 7. Verify multi-target exports from loaded document
  const composeOutput = exportToCompose(loadedDoc);
  assert.ok(composeOutput.includes('@Composable'));
  assert.ok(composeOutput.includes('System Operations Control'));
  assert.ok(composeOutput.includes('Execute Pipeline'));

  const pyqtOutput = exportToPyQt(loadedDoc);
  assert.ok(pyqtOutput.includes('class CardWidget(QFrame):'));
  assert.ok(pyqtOutput.includes('System Operations Control'));
  assert.ok(pyqtOutput.includes('Execute Pipeline'));
  assert.ok(pyqtOutput.includes('.setMinimumHeight(44)'));

  const reactOutput = exportToReact(loadedDoc);
  assert.ok(reactOutput.includes('export function E2EProductionStation'));
  assert.ok(reactOutput.includes('System Operations Control'));
  assert.ok(reactOutput.includes('Execute Pipeline'));
  assert.ok(reactOutput.includes('@container'));

  const dtcgOutput = exportToDtcgTokens(loadedDoc);
  assert.ok(dtcgOutput.tokensJson.includes('https://design-tokens.github.io'));

  const canvasOutput = exportToDesignCanvas(loadedDoc);
  assert.ok(canvasOutput['Main.dc.html']);
  assert.ok(canvasOutput['canvas.json']);
});

test('12. Exhaustive 23-Subtype Multi-Exporter Matrix Compilation (115 pathways)', () => {
  for (const preset of PRESETS_CATALOG) {
    const doc = createTemplateBySubtype(preset.id);

    // 1. Compose Multiplatform
    const compose = exportToCompose(doc);
    assert.ok(compose.length > 100, `Compose export for ${preset.id} must be non-empty`);
    assert.ok(compose.includes('@Composable'), `Compose export for ${preset.id} missing @Composable`);

    // 2. PyQt6 / CardWidget
    const pyqt = exportToPyQt(doc);
    assert.ok(pyqt.length > 100, `PyQt export for ${preset.id} must be non-empty`);
    assert.ok(pyqt.includes('CardWidget'), `PyQt export for ${preset.id} missing CardWidget`);
    assert.ok(pyqt.includes('.setMinimumHeight(44)'), `PyQt export for ${preset.id} missing minimum height`);

    // 3. React / Web
    const react = exportToReact(doc);
    assert.ok(react.length > 100, `React export for ${preset.id} must be non-empty`);
    assert.ok(react.includes('export function'), `React export for ${preset.id} missing component function`);
    assert.ok(react.includes('min-h-[2.75em]'), `React export for ${preset.id} missing min-h-[2.75em]`);

    // 4. DTCG Tokens
    const dtcg = exportToDtcgTokens(doc);
    assert.ok(dtcg.tokensJson.length > 50, `DTCG tokens for ${preset.id} must be non-empty`);
    assert.ok(dtcg.tokensCss.length > 50, `DTCG CSS for ${preset.id} must be non-empty`);

    // 5. Design Canvas
    const canvas = exportToDesignCanvas(doc);
    assert.ok(canvas['Main.dc.html'], `Canvas html for ${preset.id} must exist`);
    assert.ok(canvas['canvas.json'], `Canvas json for ${preset.id} must exist`);
  }
});

test('13. Deep Tree Manipulation & Edge Case Traversal', () => {
  const doc = createEmptyDocument('Nesting Test', 'custom_blank');

  // Build depth-4 nested structure
  const outerCard = createComponentInstance('card_widget', { title: 'Level 1' });
  const midCard = createComponentInstance('card_widget', { title: 'Level 2' });
  const innerCard = createComponentInstance('card_widget', { title: 'Level 3' });
  const deepestButton = createComponentInstance('button', { label: 'Deep Action' });

  innerCard.children.push(deepestButton);
  midCard.children.push(innerCard);
  outerCard.children.push(midCard);
  doc.masterPrototype.children.push(outerCard);

  // Verify deep search
  const foundDeep = findNodeById(doc.masterPrototype, deepestButton.id);
  assert.ok(foundDeep);
  assert.equal(foundDeep.props.label, 'Deep Action');

  // Verify parent resolution
  const parentOfDeep = findParentNode(doc.masterPrototype, deepestButton.id);
  assert.ok(parentOfDeep);
  assert.equal(parentOfDeep.id, innerCard.id);

  const parentOfInner = findParentNode(doc.masterPrototype, innerCard.id);
  assert.ok(parentOfInner);
  assert.equal(parentOfInner.id, midCard.id);

  // Non-existent ID handling
  const nonExistent = findNodeById(doc.masterPrototype, 'non-existent-id-999');
  assert.equal(nonExistent, null);

  const nonExistentParent = findParentNode(doc.masterPrototype, 'non-existent-id-999');
  assert.equal(nonExistentParent, null);

  const removeNonExistent = removeNodeById(doc.masterPrototype, 'non-existent-id-999');
  assert.equal(removeNonExistent, false);

  // Clean removal of deeply nested item
  const removedDeep = removeNodeById(doc.masterPrototype, deepestButton.id);
  assert.equal(removedDeep, true);
  assert.equal(innerCard.children.length, 0);
  assert.equal(findNodeById(doc.masterPrototype, deepestButton.id), null);
});

test('14. WCAG 2.2 Contrast & Theme Stress Suite', () => {
  const doc = createEmptyDocument('Contrast Stress', 'consumer_utility');
  const manager = new TokenManager(doc.tokens);

  // Dark theme verification
  const darkTheme = manager.getResolvedThemeTokens('dark');
  const darkContrast = getContrastRatio(darkTheme.textPrimary, darkTheme.surfaceCanvas);
  assert.ok(darkContrast >= 7.0, `Dark primary text contrast ${darkContrast} must be >= 7.0 (AAA)`);

  const darkSecondaryContrast = getContrastRatio(darkTheme.textSecondary, darkTheme.surfaceCanvas);
  assert.ok(darkSecondaryContrast >= 4.5, `Dark secondary text contrast ${darkSecondaryContrast} must be >= 4.5 (AA)`);

  // Light theme verification
  const lightTheme = manager.getResolvedThemeTokens('light');
  const lightContrast = getContrastRatio(lightTheme.textPrimary, lightTheme.surfaceCanvas);
  assert.ok(lightContrast >= 7.0, `Light primary text contrast ${lightContrast} must be >= 7.0 (AAA)`);

  // Brand violet accent against dark background
  const violetContrast = getContrastRatio(doc.tokens.foundation.color.violet, darkTheme.surfaceCanvas);
  assert.ok(violetContrast >= 4.5, `Violet contrast ${violetContrast} must be >= 4.5`);

  // Luminance boundary assertions
  assert.equal(getRelativeLuminance('#000000'), 0);
  assert.equal(getRelativeLuminance('#ffffff'), 1);
  assert.ok(getRelativeLuminance('#9A8CFF') > 0 && getRelativeLuminance('#9A8CFF') < 1);
});

test('15. REST Server Full HTTP Integration Suite', async () => {
  const { createStudioServer } = await import('../src/server/appServer.js');
  const server = createStudioServer();
  const TEST_PORT = 4189;

  await new Promise((resolve) => server.listen(TEST_PORT, '127.0.0.1', resolve));

  try {
    const baseUrl = `http://127.0.0.1:${TEST_PORT}`;

    // 1. GET /api/templates
    const tplRes = await fetch(`${baseUrl}/api/templates`);
    assert.equal(tplRes.status, 200);
    const templates = await tplRes.json();
    assert.equal(templates.length, 23);

    // 2. GET /api/components/palette
    const palRes = await fetch(`${baseUrl}/api/components/palette`);
    assert.equal(palRes.status, 200);
    const palette = await palRes.json();
    assert.ok(palette.button && palette.card_widget && palette.task_rack);
    assert.equal(palette.button.category, 'atoms');
    assert.equal(palette.card_widget.category, 'molecules');
    assert.equal(palette.task_rack.category, 'organisms');

    // 3. POST /api/project/new
    const newRes = await fetch(`${baseUrl}/api/project/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Integration Test Canvas' })
    });
    assert.equal(newRes.status, 200);
    const newResData = await newRes.json();
    assert.equal(newResData.success, true);
    assert.equal(newResData.doc.meta.title, 'Integration Test Canvas');

    // 4. POST /api/component/add
    const addRes = await fetch(`${baseUrl}/api/component/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ defKey: 'button', customProps: { label: 'HTTP Tested Button' } })
    });
    assert.equal(addRes.status, 200);
    const addResult = await addRes.json();
    assert.equal(addResult.success, true);
    assert.equal(addResult.component.props.label, 'HTTP Tested Button');
    assert.ok(addResult.doc.masterPrototype.children.some(c => c.props?.label === 'HTTP Tested Button'));

    // 5. GET /api/export/:target (compose, pyqt6, react)
    const expCompose = await fetch(`${baseUrl}/api/export/compose`);
    assert.equal(expCompose.status, 200);
    const composeCode = await expCompose.text();
    assert.ok(composeCode.includes('@Composable'));

    const expPyqt = await fetch(`${baseUrl}/api/export/pyqt6`);
    assert.equal(expPyqt.status, 200);
    const pyqtCode = await expPyqt.text();
    assert.ok(pyqtCode.includes('CardWidget'));

    const expReact = await fetch(`${baseUrl}/api/export/react`);
    assert.equal(expReact.status, 200);
    const reactCode = await expReact.text();
    assert.ok(reactCode.includes('export function'));

    // 6. GET /api/qa
    const qaRes = await fetch(`${baseUrl}/api/qa`);
    assert.equal(qaRes.status, 200);
    const qaData = await qaRes.json();
    assert.equal(qaData.summary.failed, 0);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

