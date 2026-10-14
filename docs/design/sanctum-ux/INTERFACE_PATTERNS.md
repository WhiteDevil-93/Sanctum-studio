# Interface subtypes and circumstances

[Handbook](DESIGN_PROCESS.md) · Pair a subtype with a [platform profile](PLATFORM_GUIDES.md), then consult [libraries](LIBRARY_CATALOG.md).

Subtypes describe jobs, not industries or mandatory visual styles. Combine them when necessary. Select one dominant task model per screen rather than giving every feature equal visual weight.

## 1. Selection matrix

The library families here are candidates defined in the catalogue, not instructions to install every listed package.

| Subtype | Use when | Starting composition / visual treatment | Library family candidates | Characteristic risk |
| --- | --- | --- | --- | --- |
| Marketing / landing | Explain a proposition and invite a next step | Editorial hierarchy, clear value, purposeful imagery, short action path | Semantic HTML, existing site framework | Decorative animation, vague CTA, inaccessible imagery |
| Content / publishing / documentation | Reading, learning and retrieval dominate | Readable column, topic navigation, search, related content | HTML/SSR, framework-compatible primitives | Unreadable line length, broken anchors, search-only navigation |
| Consumer utility | One or a few repeat tasks | Focused main task, direct feedback, restrained shell | Native controls, Flutter/RN where appropriate | Excess setup or dashboard before doing the task |
| Onboarding / account / settings | Establish prerequisites and preferences | Task-oriented steps or grouped sections; summary before risky changes | Native forms, React Aria/Radix, styled forms | Credential overload, lost input, fake connection health |
| Transaction / booking / commerce | Select, review and commit | Clear price/availability, progressive steps, final review | Existing commerce stack, Polaris for Shopify context | Hidden charges, duplicate submission, unclear receipt |
| Record administration / CRUD | Search, inspect and edit many records | Table/list-detail, stable filters, bulk-action review | Carbon, Fluent UI, Angular Material/CDK, PrimeVue | Wrong record, stale data, destructive bulk action |
| Analytics / dashboard | Compare and investigate quantitative data | Units/time scope first; meaningful charts plus tables | Enterprise systems plus independently evaluated charting | Misleading axes, colour-only encoding, stale aggregates |
| Operations / monitoring | Track work and act on exceptions | Status-first queue/list, freshness, drill-down, explicit controls | Fluent/Carbon/native lists | Healthy-looking stale data, request accepted shown as done |
| Project / planning / collaboration | Coordinate people, work and ownership | Board/list/timeline according to job; visible assignee/state | Existing stack with accessible drag alternatives | Drag-only tasks, hidden conflicts, lost updates |
| Search / command / launcher | Retrieve items or initiate known commands | Query, scoped results, preview and keyboard navigation | Native search; React Aria/CDK primitives | Ambiguous scope, commands executed without review |
| Messaging / community | Ongoing human conversation | Chronological thread, compose, unread state, moderation tools | Native lists, web primitives | Forced scrolling, context loss, unsafe notification disclosure |
| AI assistant / delegation | Ask an entity to reason or act | Entity identity, conversation, work state, scope and approval | Existing agent client plus native/headless controls | Mixed identities, concealed tools, fabricated success |
| Testing / coding / sandbox | Experiment safely with inputs and tools | Workspace, run controls, logs, comparison, isolation labels | Existing IDE/editor integration plus shell controls | Production data or paid services used accidentally |
| Media library / asset management | Find, select and reuse visual/audio content | Grid for recognition, list for metadata, preview/detail | Native collection controls or tested web grid | Hidden pagination, wrong source/version, absent provenance |
| Creative / document editor | Manipulate an artefact directly | Dominant canvas/document with contextual tools and inspector | Existing specialised editor; Qt/Compose/web shell | Lost work, oversized shell, inaccessible canvas |
| Export / render / background jobs | Submit and follow long work | Scope review, queue/status, result verification | Native/web queue controls | Unclear cost, no cancel, result not saved |
| Maps / geospatial | Understand and act on location | Map plus searchable list/detail and textual alternatives | Independently evaluated mapping engine | Map-only information, location privacy, unreliable coordinates |
| Scientific / engineering | Inspect specialised high-density information | Units, provenance, reproducible views, aligned data | Qt/native or enterprise components plus specialist widgets | Precision loss, unsafe units, misleading confidence |
| Education / guided learning | Acquire a skill or understanding | Clear progression, practice, feedback, resume | Existing learning stack / semantic content | Reward animation replacing meaningful feedback |
| Health / finance / regulated | Consequential records and decisions | Clear identity, units, review, audit and uncertainty | Validated existing stack; domain-reviewed controls | Mistaken identity, irreversible action, unqualified compliance claim |
| Public service / accessibility-first | Complete essential tasks across broad populations | Plain language, robust forms, familiar patterns, low bandwidth | Semantic HTML or native controls; applicable public design system | Exclusion by literacy, disability, device or connectivity |
| Game / immersive | Play or explore with specialised controls | Focus on play; accessible HUD/menu and configurable inputs | Existing engine UI plus platform adapters | Flashing/motion, remapping gaps, unreadable HUD |
| Kiosk / TV / wearable / XR | Device constraints dominate interaction | Device-specific profile, not a resized desktop dashboard | Device runtime and platform profile | Physical/input constraints or public-session privacy |

## 2. Recipes for recurring complex flows

### Content and marketing

Use editorial sections, not a dashboard grid. Match reading hierarchy to purpose: proposition, evidence, detail, next step. Provide meaningful heading structure and alternatives for media. Animation should not delay navigation or essential content.

Check: keyboard path; mobile reading; largest text; slow connection; clear action; disclosure of commercial terms. Do not make animation or autoplay a prerequisite.

### Forms, onboarding and settings

Group by user goal. Use persistent labels, sensible defaults and input examples; do not use placeholders as the only labels. Validate without discarding data; identify errors beside fields and provide a navigable summary when needed.

Separate required setup from optional integrations. Explain sensitive permissions and credentials. Provide test results with timestamps, not a permanently green configured label. Preview preference changes and provide reset.

Check: keyboard/autofill/paste; error correction; revisit; session expiry; large text; optional step skipping; saved versus unsaved state.

### Transactions and commerce

Show currency, quantities, recurring obligations, delivery/availability and total cost before commitment. Let users inspect and change the selection. Prevent unintended repeat submission and explain pending outcomes after network loss.

Distinguish payment authorised, payment captured, order confirmed and fulfilment where the service does. Do not infer these from a successful HTTP response.

Check: invalid inputs, price changes, duplicate clicks, response loss, cancellation/refund paths, receipt and authentication re-entry. Use domain/legal review where applicable.

### Administration, analytics and monitoring

Use tables when comparison across repeated fields matters; cards when recognising independent objects matters. On small screens offer a useful summary/list-detail, column selection or an explicit local scrolling table, rather than clipping the entire page.

Label units, time windows, missing data and refresh timestamps. Separate no data, no matching results and load failure. Preserve filters and selections when drilling down. Provide textual/table alternatives for essential chart information.

Check: large datasets, empty/error/stale states, bulk-action scope, sort announcements, selected counts, horizontal-content exceptions and query changes. Charts require separate visualisation/accessibility evaluation.

### Conversation and AI delegation

Show which person/agent owns the conversation, available capabilities, target workspace and current permissions. Separate message generation from external work. Expose relevant tool activity, approval, stop/cancel and errors without dumping every raw log by default.

Persist conversation/run state according to an explicit policy. Navigation must not silently cancel work. Preserve the reader's position; show a Jump to latest action. Offer explicit Copy, Expand and Retry when valid. Avoid live-region announcements for every streamed token.

For delegation, show source agent, destination entity, task scope and result provenance. Relevant cross-domain media access is a scoped transfer/reference, not merged identities or shared unrestricted conversation history.

Check: attachment-only messages if supported; tool failure; repeated commands; pending approval; cancel acknowledgement; restart; offline state; model versus verified claims. [Responsible agent design reference](https://microsoft.design/articles/principles-for-responsible-agent-design/).

### Testing, coding and sandboxes

Label the environment and account prominently. Separate test inputs, harness configuration, run status, logs and result comparison. Do not automatically connect a sandbox to production credentials or enable expensive execution.

Before consequential execution show the target, filesystem/network scope, resource limits and changes. Provide stop, reset and export of non-secret evidence. Editor shortcuts must not trap the user or conflict silently with shell navigation.

Check: safe defaults, permission denial, secret redaction, hung run, cleanup, deterministic fixtures where needed, return to production without leaking test state. Select code-editor engines separately from the app component library.

### Media libraries, editors and exports

Use thumbnails for visual recognition with names, metadata and provenance in detail. Expose pagination and selection scope. Show media suitability, permissions and missing/corrupt-file states. Support a metadata list alternative.

For editing, preserve the dominant canvas and contextual controls; do not surround it with equal-weight cards. Specify undo/redo, save/recovery, keyboard equivalents and accessible alternatives for important canvas operations.

Before export/render show source, settings, output destination, expected workload and cost where applicable. Queue/running/completed/verified-saved are distinct facts when the backend distinguishes them.

Check: unknown formats, failed preview, large libraries, unsaved changes, navigation/restart, interrupted export, cancel, output verification and safe retry without duplicate paid jobs.

### Collaborative planning

Use boards for moving work through stages, lists for scanning details and timelines for dependencies/time. Explain who can change what. Provide keyboard/button alternatives to dragging.

Expose concurrent changes and conflicts. Undo must have defined scope when another person edits the same object. Never equate a local optimistic update with accepted server state.

Check: two users editing, offline queue, access revocation, conflict resolution, timezone differences and history.

### Specialist and immersive products

Add domain experts and representative users early. Define units, accuracy, hazard severity, physical conditions and accessible alternatives. A generic component kit does not solve a map, CAD canvas, clinical display or XR interaction.

Do not claim conformity to specialist standards from this guide. Record the separate standard, qualified reviewer and acceptance evidence.

## 3. Visual treatment by circumstance

| Circumstance | Suitable starting treatment | Avoid |
| --- | --- | --- |
| Frequent expert work | Restrained, readable, configurable density | Huge touch-style controls everywhere; tiny labels to fake density |
| Novice / occasional use | Clear hierarchy, visible explanation, familiar controls | Infrastructure names and concealed gestures |
| Reading / education | Typographic/editorial layout with generous reading space | Every paragraph inside a card |
| Recognition of assets | Image-led grid with metadata and selection clarity | Unlabelled thumbnails as the only representation |
| Direct manipulation | Neutral tool shell around the artefact | Decorative panels competing with the canvas |
| Brand-led storytelling | Deliberate imagery and typography, optional restrained motion | Motion-first layout with missing semantic content |
| Urgent / consequential work | Stable placement, explicit status, low ambiguity | Translucency, animation or colour as the sole warning |
| Public / constrained devices | Simple paths, strong readability, robust recovery | Desktop-density transplanted unchanged |

Use the same semantic states and component vocabulary throughout a product, but not necessarily the same arrangement. A family resemblance is compatible with different layouts.

## 4. Common extensions

Add subtype profiles for scheduling/calendar, social feeds, identity/security administration, remote support, audio production, accessibility tools, field service or offline data collection as needed. Use [the subtype template](TEMPLATES.md); do not force a new task into the nearest table row when its risk/input model differs.
