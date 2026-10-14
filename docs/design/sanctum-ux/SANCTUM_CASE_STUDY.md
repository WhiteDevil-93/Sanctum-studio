# How the Sanctum UX design was made (and how to repeat or update it)

Written 2026-10-08. Live canvas: https://claude.ai/artifact/XSp2gyteGMpXB1sd9Mz7bw (private; share from its Share menu).
Sources are in `canvas-src/` (36 files, exactly as published). `bg-stress.svg` is the high-contrast test background.

This is a record of what was actually done and what went wrong, so the same method can be reused for updates or another project. It is not a promise the result is verified beyond what `canvas-src/QA.dc.html` says.

## 0. What the deliverable is

One Design canvas (the Claude "Design" Artifact type) holding:

| Page | Files | Purpose |
|---|---|---|
| Prototype | `Main.dc.html` | One clickable app. **Single source of truth** for components, states and CSS. |
| Navigation & flows | `NavMap.dc.html`, `Flows.dc.html` | Documentation boards (static). |
| Screens | `S-*.dc.html` (29 files) | Thin wrappers that import `Main` in a fixed scenario, size and theme. |
| Design system | `System.dc.html` | Tokens, type, spacing, components, theme rules. |
| Handoff & QA | `Handoff.dc.html`, `QA.dc.html` | Interaction→code map; checked / fixed / open. |

`canvas.json` is the index (board positions, pages, notes, order). Board files are named `S-…` (no folders; a slash in a name is legal but flat names were used).

## 1. Process, in order

1. **Read the brief for hard constraints and turn each into a check.** Sanctum's were: three peer domains, no nested tabs, 100–200% text on desktop and phone, themes with backgrounds, eight flows, every control live, no "Done" for submitted work. Each became a line in the QA report.
2. **Ground in the repo before designing.** Read, in this order: `README.md`, `docs/*PLAN*`/`*STATUS*`/`*MIGRATION*`, the desktop `Main.kt`/`ForgeShell.kt`/`Theme.kt`/`UiScale.kt`, Android `WdBottomBar.kt`/`OnboardingScreen.kt`, `hub/static/ui/tokens.css`, `hub/domain_tasks.py`, `hub/hypno.py`, `hub/venice.py` (tool allow-lists), `hub/screens.json`. Record what exists (e.g. `UiScale` already goes 0.8–2.0; `VALID_STATES` has 7 states) so the design extends it rather than inventing.
3. **Read the backend contract for states and boundaries.** The seven task states, `agent_id` allow-lists, `/api/media/ref`, `/import-media` came from code, not guesswork. Every copy string about state ("Queued — not started") is derived from them.
4. **Decide the visual system from the repo.** Kept the near-black ground, violet accent and IBM Plex Mono already in `tokens.css`/`Theme.kt`; added IBM Plex Sans, two fixed domain hues (HypnoForge pink, ForgeHub orange), status colours with icon + label, and a light set. User accent choices only recolour Control Center, buttons and focus rings.
5. **Build one prototype first** (`Main.dc.html`), not many static screens. Flows, states and sizes are then *scenarios* of the same code. Design system board and flow boards are written after, from what the prototype really does.
6. **Test in a real browser before producing derivatives** (step 8). Defects found at this stage cost one fix; found after 30 artboards they cost 30.
7. **Generate screen artboards as thin wrappers** (see §3), publish, inspect on the canvas.
8. **Write documentation boards** from verified behaviour. The handoff table cites file and route names that were grepped, not remembered. Re-read the backend just before writing it (another session was editing `hub/` during this work and changed what was true).
9. **Write the QA board last, listing what was *not* checked.**
10. **Clean up** test state (reset localStorage via the prototype's "Start over"), close browser tabs.

## 2. How `Main.dc.html` is built

- **One CSS file inside `<helmet><style>`**, scoped under `.s-app`. All tokens are CSS variables on `.s-app`, switched by attributes: `data-mode` (dark/light), `data-acc`, `data-bg`, and per-domain classes `.s-dom-cc/hf/fh` that set `--dom`.
- **Everything is em.** Root `font-size = 16px × scale` on `.s-app`; padding, icons, radii, hit targets (`min-height:2.75em`) and even breakpoints scale together. Never use `height` on a control; use `min-height`.
- **Layout switches use container queries in em** (`@container app (min-width:48em)` sidebar↔bottom bar; `76em` side panel↔sheet). Because em grows with text size, a window falls back to the narrow layout before anything clips. Don't use media queries here: artboards import the app inside a frame, so viewport width is the wrong measure.
- **State** lives in one `Component` class: `prefs` (+ `draft` while previewing), `route {d,p,id,from}`, per-agent conversations, `tasks[]`, `net`, dialogs. `renderVals()` turns state into plain objects for the template (templates may only look up names, never compute).
- **Fake backend:** `SCRIPTS` defines each task (owner, steps, optional approval step, failure step, result, error text, link). `tick()` advances tasks every 2.6 s. `Prototype controls` can force offline, failing next task, checksum mismatch. This is simulation; every place it stands in for a real call is labelled `PROTOTYPE · real: <endpoint>`.
- **Scenarios:** the `scenario` prop (`cc-assign-running`, `hf-picker`, `task-failed`, …) calls `applyScenario()` to seed a frozen state. `scale`, `mode`, `accent`, `bg` props override the saved preferences. Scenarios never read or write localStorage; the live prototype (no scenario) does.
- **Persistence:** `sanctum.prefs.v1` and `sanctum.setup.v1` in localStorage, always in try/catch (it can be blocked). Tasks and chats are memory only and reset on reload (stated in QA).
- **Accessibility built in:** real `<button>`/`<label>`; `aria-current`, `aria-pressed`, `role=status/alert/dialog`; hidden text for badge counts; 3 px focus ring in every theme; reduced-motion stops animation; text never sits on the user's background (panels are solid).

## 3. Screen artboard recipe (`S-*.dc.html`)

```html
<div style="width:100vw;height:100vh;overflow:hidden;position:relative">
  <dc-import name="Main" scenario="cc-assign-running" scale="1.5" mode="light" hint-size="1280px,800px"></dc-import>
</div>
```
plus `body{margin:0;overflow:hidden}` and a `$preview` of the frame size. Frame sizes (set in `canvas.json`): 1280×800 desktop, 390×844 phone, 820×1180 tablet, 640×800 narrow.
**Use `100vw/100vh`, not fixed px**: the first version used fixed px and every board showed scrollbars and a clipped bottom bar.
To add a screen: write the wrapper, add a `boards` entry and an `order` entry in `canvas.json`, publish both.

## 4. Updating the design

| Change | Edit |
|---|---|
| New or changed colour, spacing, component | `Main.dc.html` CSS; mirror in `System.dc.html` table |
| New destination/page | `DOM` map + a `pg.<name>` block in `Main`; add to `NavMap.dc.html` and `Handoff.dc.html` |
| New flow or state | a `SCRIPTS` entry and/or `applyScenario` case; a step list in `Flows.dc.html`; a wrapper board |
| Backend changes | re-grep `hub/` and update the "Fix first" and interaction rows in `Handoff.dc.html`; re-run QA |
| New text size or device | add a wrapper with the `scale`/frame size; inspect it |

After any `Main` change every wrapper updates automatically, but **re-inspect the 100/150/200 phone and desktop boards**; most layout regressions show at 150–200% on 390 px.

## 5. Publishing mechanics (Artifact tool)

- Create once from the Design type (quickstart with `intent: "design"`; no design system was available, so none was used). Work on that URL afterward.
- Write files under a local folder `…/sanctum/project/…`. Publish with `url`, `root` = the folder above `project/`, `file_path` = one file, `files` = a map of the rest (`"project/X.dc.html": "project/X.dc.html"`). **Send `canvas.json` first** with every board already listed; it can be re-sent only when boards, pages or notes change.
- A removed board is `"project/<name>": null`. The auto-created blank board was removed this way.
- Upload images via `asset: true`; reference the returned `/_blob/<id>` verbatim. The stress background id is `c1cb027619eaecff2af586aed662fdb3` (tied to that artifact).
- Reloading the canvas after a publish is needed to see changes; the first load shows "Loading…" for several seconds.
- Artifact is private; nothing is shared unless the owner shares it.

## 6. Defects found, so they aren't repeated

1. **`<form onSubmit>` never fires** in the canvas frame (sandbox blocks form submission). Use `type="button"` + `onClick`, and handle Enter via `onKeyDown`. Cost: the whole first-launch flow looked dead.
2. **Specificity beats container queries.** `.s-bottom{display:none}` inside `@container` lost to `.s-btn{display:inline-flex}`. Prefix hide rules with `.s-app` or lower the base rule's specificity.
3. **Global resets override component classes.** `.s-app button{font:inherit;color:inherit}` turned primary buttons the wrong colour. Put resets in `:where(.s-app) :where(...)` (zero specificity).
4. **Flex children don't shrink** (`min-width:auto`): a textarea kept the chat column wider than a 390 px frame at 150–200%, clipping text. Add `min-width:0` along the whole chain.
5. **Scroll-to-latest:** lifecycle hooks were unreliable here. Use a `flex-direction:column-reverse` scroller with an inner content wrapper; it stays pinned to the bottom without script. Give it `min-height`, or it collapses to 0 in short windows at 200%.
6. **Phone top bar stacked to four rows at large text.** On narrow screens show only the current breadcrumb and hide the green "Connected" pill; bad states still show as a banner.
7. **Actionable toasts must not auto-dismiss** (a "View task" button disappeared before it could be clicked).
8. **Clicking in a screenshot frame ≠ element coordinates:** after resizing text, re-take a screenshot before clicking; layouts move.
9. **Browser window resizing didn't change the page's viewport** in this session; phone widths were verified only via the 390 px artboards. Don't claim live phone testing without a viewport you can confirm.

## 7. Verification rules used (carry these forward)

- A claim in the QA board needs evidence from this run: a click path, a screenshot, a grep. Items not exercised are listed as **Not checked**, not omitted.
- "Tests pass" and "looks right" are separate lines; contrast ratios on the system board are *computed from tokens*, not measured in the rendered page, and the board says so.
- Never show **Completed** for a submitted/queued thing; the prototype only shows it after a simulated step list finishes, and the copy says what was checked ("nobody has watched it yet").
- Before writing handoff claims about code, re-read the file; another session may have changed it.
- Do not edit or restart the owner's services, HypnoForge, or Colab polling; the design work never touched them.

## 8. Replicating for another project

1. State the constraints and the flows as a checklist (this document §0 / §1.1).
2. Read the repo's UI code, docs and API contract; list what exists.
3. Reuse the project's tokens and fonts; add only what the brief demands (states, domain colours, light theme).
4. Copy `Main.dc.html` as a skeleton: keep the CSS architecture (em, `:where` resets, container queries, `data-*` themes), `Component` shape (`boot`/`applyScenario`/`renderVals`), the `SCRIPTS` simulation pattern and the Prototype-controls dialog; replace `DOM`, `AG`, `SCRIPTS`, copy and routes.
5. Test the prototype in a browser first (§1.6), then generate wrappers, boards and QA.

## 9. Known gaps in this design

Listed with detail in `canvas-src/QA.dc.html` and `canvas-src/Handoff.dc.html`: short windows at 175–200%, no screen-reader or automated accessibility audit, 125%/175% not inspected, Stop / direct HypnoForge and ForgeHub chats / cancelling a running task / live light mode / image upload not clicked, and the real backend problems under "Fix first".
