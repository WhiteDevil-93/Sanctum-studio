/**
 * Sanctum Studio - Presets Catalog & Interface Subtype Metadata
 * Reference: docs/design/sanctum-ux/INTERFACE_PATTERNS.md
 */

export const PRESETS_CATALOG = [
  {
    id: 'ai_assistant_delegation',
    title: 'AI Assistant & Delegation Center',
    category: 'Autonomous Agents',
    description: 'Entity identity, scoped task delegation cards, approval gates, tool provenance, and streaming runs.',
    characteristicRisk: 'Mixed agent identities, concealed tools, and unverified success claims.',
    composition: 'Split-column shell with active agent conversation, tool activity timeline, and right-hand task monitoring rack.',
    defaultStates: ['ready', 'submission_pending', 'accepted', 'running', 'completed', 'failed', 'cancelled']
  },
  {
    id: 'testing_coding_sandbox',
    title: 'Testing, Coding & Sandbox',
    category: 'Developer Tools',
    description: 'Isolated harness controls, test input fixtures, split diff viewer, terminal emulator, and live logs.',
    characteristicRisk: 'Accidental execution with production credentials or unbudgeted cloud resources.',
    composition: 'Three-pane IDE layout: navigation/file tree, central code/diff editor, bottom terminal/log panel.',
    defaultStates: ['ready', 'running', 'completed', 'failed']
  },
  {
    id: 'operations_monitoring_queue',
    title: 'Operations & Queue Monitor',
    category: 'Operations',
    description: 'Status-first job queue, worker telemetry, freshness clock, and explicit emergency pause/stop controls.',
    characteristicRisk: 'Stale metrics looking healthy, and request accepted being reported as done.',
    composition: 'Top summary metrics banner, main sortable queue table with real-time status pills, and right-hand worker inspector.',
    defaultStates: ['ready', 'running', 'completed', 'failed', 'cancelled']
  },
  {
    id: 'creative_document_editor',
    title: 'Creative & Document Editor',
    category: 'Creative Tools',
    description: 'Dominant canvas stage, floating contextual tool shelves, inspector card, and persistent undo/redo history.',
    characteristicRisk: 'Over-crowded viewport leaving insufficient canvas area, and lost uncommitted work.',
    composition: 'Minimal outer chrome, full-bleed interactive canvas/viewport, floating contextual toolbar, right-hand properties inspector.',
    defaultStates: ['ready', 'running', 'completed']
  },
  {
    id: 'media_library_asset_management',
    title: 'Media Library & Asset Manager',
    category: 'Creative Tools',
    description: 'Aspect-ratio locked visual grid, detailed metadata list inspector, filter shelf, and batch operations.',
    characteristicRisk: 'Hidden pagination, wrong source version, and missing asset provenance.',
    composition: 'Top filter & search bar, responsive media card grid with thumbnail caching indicators, right-hand asset detail panel.',
    defaultStates: ['ready', 'running', 'completed', 'failed']
  },
  {
    id: 'export_render_background_jobs',
    title: 'Export & Render Farm Monitor',
    category: 'Operations',
    description: 'Render job queue, cost calculation review gate, sync-to-local verification check, and instance lifecycle controls.',
    characteristicRisk: 'Unverified cloud output claims, unmonitored idle GPU spend, and duplicate costly jobs.',
    composition: 'Job configuration card, target destination & byte verification status, live progress bars, verified file shelf.',
    defaultStates: ['ready', 'submission_pending', 'accepted', 'running', 'completed', 'failed', 'cancelled']
  },
  {
    id: 'record_administration_crud',
    title: 'Record Administration / CRUD',
    category: 'Enterprise',
    description: 'Sortable, filterable data table, column chooser, batch selection drawer, and confirmation modal for destructive edits.',
    characteristicRisk: 'Editing wrong record, stale data overrides, and unintended bulk deletion.',
    composition: 'Header with batch actions, filter chip row, full-width high-density table, and sliding drawer for record editing.',
    defaultStates: ['ready', 'running', 'completed', 'failed']
  },
  {
    id: 'analytics_dashboard',
    title: 'Analytics & Metric Dashboard',
    category: 'Enterprise',
    description: 'Time window scope selector, quantitative KPI cards with delta indicators, and accessible chart + table toggles.',
    characteristicRisk: 'Misleading chart axes, color-only state encoding, and unstated unit scales.',
    composition: 'Time-range picker, 4-card KPI metric row, two comparison charts with alternative accessible data tables.',
    defaultStates: ['ready', 'running', 'completed']
  },
  {
    id: 'search_command_launcher',
    title: 'Search & Command Launcher',
    category: 'Navigation',
    description: 'Global modal command palette, fuzzy category grouping, keyboard preview column, and verified action trigger.',
    characteristicRisk: 'Ambiguous execution scope and executing consequential commands without review.',
    composition: 'Centered modal with prominent input, category list, keyboard arrow selection, and preview drawer.',
    defaultStates: ['ready', 'completed']
  },
  {
    id: 'transaction_booking_commerce',
    title: 'Transaction & Commerce Flow',
    category: 'Transactions',
    description: 'Step-by-step checkout wizard, transparent itemized pricing, delivery options, and idempotency protection.',
    characteristicRisk: 'Hidden fee disclosure, duplicate submissions on slow connections, and ambiguous payment receipts.',
    composition: 'Two-column layout: progressive form steps on the left, sticky order summary and final verification button on the right.',
    defaultStates: ['ready', 'submission_pending', 'accepted', 'completed', 'failed']
  },
  {
    id: 'onboarding_account_settings',
    title: 'Onboarding & Settings Center',
    category: 'Account',
    description: 'Grouped configuration sections, credential isolation, live connection test button with timestamped response.',
    characteristicRisk: 'Credential exposure, lost inputs on tab switch, and fake connection status.',
    composition: 'Categorized vertical navigation tab list, card-based form rows with inline helper text, test connection action.',
    defaultStates: ['ready', 'submission_pending', 'completed', 'failed']
  },
  {
    id: 'content_publishing_docs',
    title: 'Content, Publishing & Docs',
    category: 'Publishing',
    description: 'Readable 65-character prose column, hierarchical table-of-contents rail, quick copy widgets, and anchor links.',
    characteristicRisk: 'Unreadable line length, broken jump anchors, and missing text search.',
    composition: 'Left sidebar navigation, central reading column with prominent typography hierarchy, right-hand on-this-page outline.',
    defaultStates: ['ready']
  },
  {
    id: 'consumer_utility',
    title: 'Consumer Utility Tool',
    category: 'Utility',
    description: 'Ultra-focused single primary action, zero unnecessary dashboard clutter, and direct tangible feedback.',
    characteristicRisk: 'Excessive setup steps obscuring the immediate task.',
    composition: 'Minimalist card shell centered on screen, prominent primary input, instant result display.',
    defaultStates: ['ready', 'running', 'completed', 'failed']
  },
  {
    id: 'messaging_community',
    title: 'Messaging & Community Hub',
    category: 'Communication',
    description: 'Reverse-scrolling chronological thread, jump to latest pill, draft persistence, and moderation affordances.',
    characteristicRisk: 'Forced auto-scrolling disrupting reading, and lost draft messages on room switch.',
    composition: 'Channel/conversation list, message feed with unread dividers, sticky bottom composer with attachment tray.',
    defaultStates: ['ready', 'submission_pending', 'completed', 'failed']
  },
  {
    id: 'project_planning_collaboration',
    title: 'Project & Planning Board',
    category: 'Collaboration',
    description: 'Multi-lane Kanban board with accessible button/keyboard move alternatives, assignee badges, and conflict warnings.',
    characteristicRisk: 'Drag-and-drop only interactions excluding keyboard/screen readers, and lost concurrent updates.',
    composition: 'Top filter & member bar, horizontal scrolling lanes with elevated task cards, and detail modal.',
    defaultStates: ['ready', 'completed']
  },
  {
    id: 'scientific_engineering',
    title: 'Scientific & Engineering Workspace',
    category: 'Specialist',
    description: 'High-density numeric telemetry, explicit SI units, precision clamp controls, and reproducible seed provenance.',
    characteristicRisk: 'Precision loss, missing units, and false confidence in uncalibrated readings.',
    composition: 'Multi-tab parameter matrix, aligned high-precision data columns, seed/run generator, and export shelf.',
    defaultStates: ['ready', 'running', 'completed', 'failed']
  },
  {
    id: 'education_guided_learning',
    title: 'Education & Guided Learning',
    category: 'Education',
    description: 'Structured progression path, interactive exercise module, instant remedial feedback, and session save.',
    characteristicRisk: 'Decorative gamification masking real comprehension gaps.',
    composition: 'Left syllabus outline, central interactive learning scenario, bottom feedback and next-step actions.',
    defaultStates: ['ready', 'submission_pending', 'completed']
  },
  {
    id: 'health_finance_regulated',
    title: 'Regulated Health & Finance Flow',
    category: 'Regulated',
    description: 'Strict patient/account identity header, multi-signature confirmation gate, audit trail log, and uncertainty flags.',
    characteristicRisk: 'Mistaken record identity, irreversible actions, and unqualified regulatory claims.',
    composition: 'Pinned verified patient/account banner, read-only review grid, dual-authorization modal, timestamped audit log.',
    defaultStates: ['ready', 'submission_pending', 'accepted', 'completed', 'cancelled']
  },
  {
    id: 'public_service_accessibility_first',
    title: 'Public Service (A11y-First)',
    category: 'Public Service',
    description: 'High-contrast semantic form controls, plain-language error instructions, 200% zoom reflow without loss.',
    characteristicRisk: 'Exclusion of users by literacy level, disability, old hardware, or low bandwidth.',
    composition: 'Linear single-column form with clear labels, persistent help hints, error summary box at top of page.',
    defaultStates: ['ready', 'submission_pending', 'completed', 'failed']
  },
  {
    id: 'maps_geospatial',
    title: 'Maps & Geospatial Workspace',
    category: 'Specialist',
    description: 'Interactive map canvas accompanied by textual tabular alternative, coordinate precision, location privacy toggle.',
    characteristicRisk: 'Map-only information rendering the tool inaccessible to screen-reader users.',
    composition: 'Split layout: interactive map on the left, synchronized textual data table on the right with search.',
    defaultStates: ['ready', 'running', 'completed']
  },
  {
    id: 'marketing_landing',
    title: 'Marketing & Landing Page',
    category: 'Marketing',
    description: 'Editorial value proposition hierarchy, clear calls to action, high-contrast typography, interactive product preview.',
    characteristicRisk: 'Gratuitous animation delaying interaction and inaccessible non-text hero banners.',
    composition: 'Header with simple navigation, hero proposition section, feature comparison grid, bottom action prompt.',
    defaultStates: ['ready']
  },
  {
    id: 'game_immersive',
    title: 'Game & Immersive HUD',
    category: 'Immersive',
    description: 'Low-distraction HUD overlay, key-remapping configuration drawer, subtitle contrast plate, and pause screen.',
    characteristicRisk: 'Flashing light triggers, non-rebindable keys, and unreadable status readouts.',
    composition: 'Full-bleed stage, top-corner resource counters, bottom action bar, and modal settings dialog.',
    defaultStates: ['ready', 'running', 'completed']
  },
  {
    id: 'kiosk_tv_wearable_xr',
    title: 'Kiosk, TV & Wearable Interface',
    category: 'Device-Specific',
    description: 'Large interactive targets (minimum 48-64dp), D-pad directional focus navigation, and automatic session timeout privacy wipe.',
    characteristicRisk: 'Small touch targets impossible to hit on public kiosks, and residual private data left for the next user.',
    composition: 'High-contrast large tile grid, prominent touch buttons, session countdown timer in the header.',
    defaultStates: ['ready', 'running', 'completed', 'cancelled']
  }
];
