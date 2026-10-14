# Cross-platform product design handbook

Version 1.0 · Updated 2026-10-08 · General guidance, not certification of an application.

This handbook is for new products and existing repositories: desktop tools, mobile apps, websites, enterprise systems, creative software, AI interfaces and specialised devices. Sanctum is one case study, not the template every product must resemble. No finite handbook covers every possible product: use the extension procedure below for unfamiliar or safety-critical domains.

## Start here

1. Identify the users, their tasks, devices, input methods and risks.
2. Select the relevant platform profile and interface subtype.
3. Describe the workflow and its failure states before choosing a visual style.
4. Retain a suitable existing stack; choose libraries only after requirements.
5. Define shared tokens and platform-specific adaptations.
6. Build representative flows; test real interactions and accessibility.
7. Deliver the implementation contract, evidence and explicit limitations.

| Document | Use it for |
| --- | --- |
| [Platform profiles](PLATFORM_GUIDES.md) | Windows, Android, iOS/iPadOS, macOS, web, Linux, cross-platform and specialist-device decisions |
| [Interface subtypes](INTERFACE_PATTERNS.md) | Selecting layouts, interaction patterns and visual treatment by task |
| [Library selection](LIBRARY_CATALOG.md) | Framework/library candidates, circumstances, limitations and adoption gates |
| [Tokens and theming](TOKENS_AND_THEMING.md) | Shared design identity, scaling, backgrounds and token-to-code architecture |
| [Validation and handoff](VALIDATION_AND_HANDOFF.md) | Acceptance checks, accessibility, workflow testing and evidence |
| [Reusable templates](TEMPLATES.md) | Brief, rule, state model, decision record, QA and handoff formats |
| [Sources and freshness](SOURCES.md) | Official references, checked scope and emerging concepts |
| [Sanctum case study](SANCTUM_CASE_STUDY.md) | Preserved original prototype process; historical observations, not universal rules |
| [Handbook change record](GUIDE_UPDATE_RECORD.md) | Scope, preservation, verification and remaining limitations of this expansion |

This folder is portable. Copy the handbook and its linked files to another project; do not copy private prototype links, product names or source routes as requirements.

## 1. What is a rule, and what is a choice?

- **Requirement:** an applicable standard, platform contract, product requirement or explicitly adopted handbook rule. Name its scope and measurable acceptance condition.
- **Default:** a recommended starting point. Document an exception when it does not fit.
- **Option:** a candidate needing evaluation; its presence here is not an adoption instruction.
- **Historical observation:** something reported for a particular prototype/environment. Reproduce before relying on it.
- **Unknown:** not checked. Never convert it into a passed requirement.

All selection matrices are editorial recommendations, not official vendor rankings. Sources support the underlying features and platform guidance. Legal, medical, financial, aviation and industrial products require relevant domain specialists and applicable standards beyond this handbook; attractive screens do not establish compliance.

## 2. Define the problem before the appearance

The brief must identify: users and access needs; primary outcomes; frequent and critical tasks; novice/expert differences; content/data volume; supported devices; languages; connectivity; privacy; consequences of error; existing code; budget and maintenance ownership.

For existing repositories, record the commit and dirty state. Read UI entry points, state ownership, API contracts, persistence and permission boundaries. Distinguish implemented, proposed and simulated behaviour. For a new product, record these as explicit proposed contracts.

Create a journey from entry to verified outcome, including cancellation, recovery and return visits. Every visible action must either work within the declared prototype scope or clearly explain its unavailable state. A prototype can simulate a backend; a production release must not disguise simulations as functioning integrations.

Prioritise risky workflows over decorative screens: authentication, purchases, destructive actions, permissions, offline work, file saves and long-running tasks.

## 3. Choose a composition, not a pile of components

Choose from [interface subtypes](INTERFACE_PATTERNS.md). A product can combine subtypes: a creative editor may contain a media library, settings and an export monitor. Use a shared visual system but change information density and composition to match each job.

- Establish one focal task and a clear heading hierarchy.
- Use spacing, alignment and type to group information before adding cards.
- Reserve cards for genuinely independent objects; use rows, sections or dividers for continuous content.
- Use readable text measures for prose and aligned columns for comparison.
- Give controls content-driven dimensions: consistent padding, icon/label relationships and minimum hit areas, without fixed heights that clip larger labels.
- Do not shrink type to force a dense screen into a smaller viewport. Adapt the layout or move secondary work into an explicitly labelled destination.
- Use illustrations, photography, colour and motion only when they support comprehension or appropriate product character.
- Visual polish does not excuse poor feedback, ambiguous labels or hidden actions.

Dark, light, editorial, playful, restrained enterprise and immersive treatments are valid choices. No universal rule requires glass, gradients, dashboards, monochrome, rounded cards or a particular font.

## 4. Navigation and information architecture

Use one primary navigation model per surface. Distinguish global destinations, local page sections, filters, document tabs and transient tools.

Defaults:

- Stable destinations with visible current location.
- Task-oriented names understood without knowing internal architecture.
- List-detail for collections; breadcrumbs for meaningful hierarchies; search for large inventories.
- Tabs for peer views of one context, not unrelated destinations or a repeating hierarchy.
- On narrower layouts, transform navigation rather than stacking tab bars.
- Preserve drafts, selections, scroll position and ongoing work across navigation where users expect continuity.
- Support Back, deep links and recovery to a known location according to the platform.

There is no universal five-to-seven-item navigation limit. Group and prioritise based on task frequency, testing and available space. Nested document tabs may be justified in expert tools; a nested-tabs prohibition is a product constraint, not a law of UX.

## 5. Workflow and interaction contracts

For every flow specify:

1. Entry conditions and permissions.
2. Inputs, validation and the primary action.
3. Pending, successful, failed, cancelled, offline and empty states where applicable.
4. Where work lives and what survives navigation, suspension and restart.
5. What the user can undo, retry or recover.
6. Exact success evidence and the destination of the result.
7. Keyboard, touch, pointer and assistive-technology behaviour.

Do not label an accepted request as completed. Distinguish configured from reachable, saved locally from synchronised, and model-generated from verified. Match UI state names to actual backend behaviour rather than imposing the same seven states on every system.

Destructive, costly or privacy-sensitive actions require proportionate review of scope and consequences. Routine reversible actions usually need direct feedback and undo, not a confirmation dialog every time.

Use clear verbs and specific errors: what happened, what remains safe, and what can be done next. Never expose raw infrastructure vocabulary in onboarding unless the intended user needs it.

## 6. Platform and architecture selection

Read [platform profiles](PLATFORM_GUIDES.md) before selecting a library. Share semantic tokens, terminology, data contracts and appropriate behaviour; do not force identical rendering or gestures across devices.

Keep three decisions separate:

- Product design language: identity and interaction rules.
- Component implementation: native controls, styled components or headless primitives.
- Distribution/runtime: native app, browser, hybrid wrapper or cross-platform renderer.

A token pipeline does not force a framework migration. Headless web components do not supply native accessibility bridges. Shared UI code does not prove platform fidelity or performance.

Windows, macOS and Linux development can be native. WSL is optional tooling, never an end-user requirement for a product unless the brief explicitly requires it.

## 7. Build and validate

Use a reusable component/state model, then derive screen scenarios from it. Avoid independently drawing dozens of contradictory screens. A shared source reduces maintenance duplication, but every affected scenario still needs regression review.

Review these separately:

- Visual composition and readability.
- Workflow correctness and state survival.
- Accessibility and internationalisation.
- Device/browser performance and resilience.
- Integration, permissions and provenance.

Use [validation and handoff](VALIDATION_AND_HANDOFF.md). Screenshots prove appearance in their recorded conditions; source inspection proves only what it inspected; browser tests do not prove native behaviour.

## 8. Heuristics without folklore

Fitts, Hick, Gestalt and related ideas can frame questions about acquisition, choice and grouping. They do not establish one mandatory target size, menu limit, loading delay or layout for all products.

Use practical hypotheses: can people find the next action; are related items visually grouped; can they recover without memorising prior values; is feedback timely and non-disruptive? Confirm with representative users and task outcomes. Do not turn Miller's memory research into a hard navigation cap or infer guaranteed usability from an attractive theme.

## 9. Extending the handbook for a new domain

When a product does not fit an existing subtype:

1. Complete the brief and identify specialist needs.
2. Add a named subtype with users, task model, composition, failure cases, input/access needs and acceptance checks.
3. Add a platform profile only if the device changes interaction or validation.
4. Research official guidance and applicable standards; record source date and uncertainty.
5. Evaluate libraries against the adoption gate, including an alternative.
6. Prototype the highest-risk interaction and test it on a representative device.
7. Record the result; do not silently lower acceptance requirements.

Refresh sources before adoption, major upgrades or changes affecting accessibility/security. New trends belong in an evaluation section until they are supported on the intended stack and devices.

## 10. Corrections to the preserved Sanctum process

[SANCTUM_CASE_STUDY.md](SANCTUM_CASE_STUDY.md) is retained as a historical record, not rewritten to pretend these checks happened.

| Historical statement | General guidance that takes precedence |
| --- | --- |
| Everything is em | Use appropriate web/native units, content sizing and actual system scaling; see tokens guide |
| Never use media queries | Use container queries for component space and media queries for viewport/user capabilities where appropriate |
| Use 100vw/100vh everywhere | Frame-specific workaround; production must handle viewport bars, keyboard, insets and intrinsic content |
| Replace forms with buttons | Artifact sandbox workaround only; preserve semantic forms and submit behaviour in ordinary web applications |
| Reverse scrolling is the solution | Preserve DOM/reading order and the reader's position; offer Jump to latest |
| Accessibility built in | Some semantics were supplied; conformance requires implementation-specific checks |
| Late defect costs thirty fixes | Shared wrappers inherit the fix; late defects can still require many inspections |
| Three peer domains | Historical brief, not the current product definition; current Sanctum decisions remain in project contracts |

Do not treat the case-study private canvas or its old QA board as current release evidence.

## 11. Sanctum-specific addendum: Qwen Lab as a fourth workspace

Added concurrently on 2026-10-08 by another session and retained here. This section records product/prototype-specific work, not requirements for other products. Its implementation and test claims were not independently reverified during the handbook expansion; consult the actual project contracts and current QA evidence. The general guidance above takes precedence over sandbox-specific workarounds.

What changed: Qwen Lab joined as a peer workspace (Playground, Experiments, Evaluations, Runs, Sandbox, Gateway); Settings gained Agents & permissions; Gallery import gained transfers and provenance; restart recovery was added. Boards Q01-Q33 are thin wrappers over `Main.dc.html` (page "Qwen Lab and recovery").

Method additions:
- Re-read the repo before documenting. Other sessions changed `hub/`, `shared/`, desktop and Android navigation while this was written, and earlier handoff claims went stale. Date every handoff claim and say what was read.
- Qwen today is a provider client (QwenClient.kt), a health probe and VM power control (hub/qwen.py, QwenScreen.kt). Experiments, evaluation, compare, run history and sandboxed coding do not exist; every such screen is marked Proposed. The prototype has a "Show design status" switch that prints Exists / Partly exists / Proposed on each screen (STATUS map in Main.dc.html).
- New logic goes in `renderQw(b)` which mutates and extends what `renderBase()` returns. Scenarios for new states are added to `applyScenario`.
- Test the prototype headless before publishing: extract the `<script type="text/x-dc">` body, stub `DCLogic` (setState synchronous), `window.localStorage`, `document`, then (1) `node --check`, (2) instantiate `Component` for every scenario and call `renderVals()`, (3) drive actions (run, stop, apply, transfer, restart) and assert state. This caught nothing visual but removed all runtime errors before the browser.
- In the browser, play a board and press ArrowRight to step to the next board; use the zoom action to read small text.

New pitfalls:
- PowerShell treats curly quotes as quote characters, even inside double-quoted strings. A replace script containing a curly quote silently produced broken JavaScript (a `SyntaxError` shown as a red error chip in the board). Use the Edit tool for any text with curly quotes or apostrophes, or keep such text out of scripts.
- The file had CRLF line endings; multi-line replacements need the same endings.
- Cards with `width:100%` and a left margin overflow sideways. Give them `width:auto`.
- A phone is not only 390 px: at 200% text a 390 px window is about 12em wide. A `@container (max-width: 30em)` rule (no avatar, no indents, smaller padding) gives the text its width.
- Unbreakable strings (paths, URLs) in a `fit-content` label widen the page; add `overflow-wrap:anywhere`.
- Diffs should scroll sideways, not wrap, so indentation survives at large text.
- The canvas editor re-saves `canvas.json` (and re-serialises files). Always read the live copy first, merge your change onto it, then publish.
