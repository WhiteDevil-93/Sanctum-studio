# Sanctum Studio — Visual Design Spec

Redo of the app's own visual layer. Follows the 7-step process from the UX Design Institute: this is **Step 4 (Visual Design)**, done properly, with type hierarchy, spacing rhythm, colour semantics, and negative space.

## Design Goals

1. **Scannable** — a user should understand the layout in 2 seconds: what's on the left, what's in the centre, what's on the right, what the primary action is.
2. **Low cognitive load** — one focal task at a time. Secondary controls recede. No visual competition.
3. **Colour as meaning** — every colour encodes information. No decorative accents.
4. **Breathing room** — negative space is a design element, not leftover.

## Type Scale

| Role | Size | Weight | Use |
|------|------|--------|-----|
| Display | 24px | 700 | Brand name, modal titles |
| Heading | 16px | 600 | Panel titles, section headers |
| Body | 14px | 400 | Default text, labels, descriptions |
| Body Semi | 14px | 500 | Active items, selected states |
| Caption | 12px | 400 | Badges, timestamps, secondary info |
| Caption Semi | 12px | 600 | Tab labels, filter chips |
| Mono | 13px | 400 | Code, file paths, technical values |
| Mono Semi | 13px | 600 | State badges, contrast ratios |

**Rules:**
- Never use 11px for anything a user needs to read. 12px is the floor.
- Adjacent elements must differ by at least one step in the scale.
- Line height: 1.5 for body, 1.3 for headings, 1.6 for captions in dense lists.

## Spacing Scale

| Token | Value | Use |
|-------|-------|-----|
| --space-1 | 4px | Icon-to-label, tight inline |
| --space-2 | 8px | Between related elements |
| --space-3 | 12px | Between form fields, list item padding |
| --space-4 | 16px | Panel padding, between card sections |
| --space-5 | 24px | Between major sections, canvas padding |
| --space-6 | 32px | Between artboards, modal padding |
| --space-7 | 48px | Canvas outer margin |

**Rules:**
- All spacing must come from the scale. No ad-hoc values.
- Panel padding: --space-4 (16px) minimum.
- Between major layout regions (header/sidebar/canvas/inspector): --space-5 to --space-6.
- Canvas content padding: --space-6 (32px) minimum.

## Colour System

### Dark Theme (default)

| Role | Token | Value | Purpose |
|------|-------|-------|---------|
| App background | --bg-app | #0D1117 | Deepest surface, canvas |
| Surface | --bg-surface | #161B22 | Panels, header, sidebar |
| Card | --bg-card | #1C2128 | Cards, inputs, interactive elements |
| Card hover | --bg-card-hover | #252B36 | Hover state for cards |
| Border | --border | #30363D | Subtle dividers |
| Border strong | --border-strong | #484F58 | Active/focused borders |
| Text primary | --text-primary | #E6EDF3 | Default text |
| Text secondary | --text-secondary | #8B949E | Labels, descriptions, inactive |
| Text tertiary | --text-tertiary | #6E7681 | Captions, timestamps, placeholders |
| Accent (action) | --accent | #58A6FF | Primary buttons, links, focus rings |
| Accent hover | --accent-hover | #79B8FF | Primary button hover |
| Accent subtle | --accent-subtle | rgba(88,166,255,0.15) | Active tab bg, selection highlight |
| Success | --success | #3FB950 | Pass states, completed |
| Success subtle | --success-subtle | rgba(63,185,80,0.15) | Pass badges |
| Warning | --warning | #D29922 | Pending, caution |
| Warning subtle | --warning-subtle | rgba(210,153,34,0.15) | Warning badges |
| Danger | --danger | #F85149 | Fail, error, destructive |
| Danger subtle | --danger-subtle | rgba(248,81,73,0.15) | Error badges |
| Info | --info | #58A6FF | Informational (same as accent) |
| Selection | --selection | rgba(88,166,255,0.2) | Canvas node selection |

**Colour rules:**
- ONE accent colour for all primary actions. No violet + teal + pink.
- State colours (success/warning/danger) are only for status. Never for decoration.
- Text on accent: white (#FFFFFF) for --accent, dark (#0D1117) for light-theme accent.
- Never use colour as the only indicator. Pair with text or icon.
- The canvas dot grid: rgba(255,255,255,0.04) — barely visible, not a pattern.

### Light Theme

| Role | Token | Value |
|------|-------|-------|
| --bg-app | #FFFFFF |
| --bg-surface | #F6F8FA |
| --bg-card | #FFFFFF |
| --bg-card-hover | #F0F2F5 |
| --border | #D0D7DE |
| --border-strong | #8C959F |
| --text-primary | #1F2328 |
| --text-secondary | #57606A |
| --text-tertiary | #6E7681 |
| --accent | #0969DA |
| --accent-hover | #0550AE |
| --accent-subtle | rgba(9,105,218,0.1) |
| --success | #1A7F37 |
| --danger | #CF222E |
| --warning | #9A6700 |

### High Contrast Theme

- --bg-app: #000000
- --bg-surface: #0D0D0D
- --bg-card: #1A1A1A
- --text-primary: #FFFFFF
- --text-secondary: #E0E0E0
- --accent: #79C0FF
- --border: #505050
- All state colours bumped to max brightness.

## Layout Hierarchy

### Header (54px)

```
[Brand 24px/700]  [Badge 12px]  |  [Primary: +New, Save, Open]  |  [Secondary: Preset, Theme, Scale, QA, Export]
```

- Brand: 24px display, accent colour. The one thing that's "big."
- Primary actions (+New, Save, Open): 14px/500, solid border, --bg-card. These are the things you do every session.
- Secondary actions (Preset, Theme, Scale, QA, Export): 13px/400, no border or subtle border, --text-secondary. These recede.
- Export (the main output action): 14px/600, --accent background, white text. The one filled button in the header.
- Separators: 1px vertical dividers (--border) between groups, with --space-3 padding on each side.

### Sidebar (280px)

- Tab bar: 12px/600, uppercase, --space-3 padding. Active tab: --accent text + 2px bottom border.
- Preset list items: 14px/400 title + 12px/400 description. Active: --accent-subtle bg + 3px left border (--accent).
- Palette cards: 14px/600 title + 12px/400 description. Hover: --bg-card-hover + border-strong.

### Canvas

- Background: --bg-app with dot grid (rgba(255,255,255,0.04), 24px spacing, 1px dots).
- Quick bar: 12px/500 buttons, --bg-card, --space-2 padding. Hover: --accent text + --accent border.
- Artboard frame: --bg-surface, 1px --border, 12px radius, --space-4 padding.
- Artboard header: 12px/400 mono, --text-secondary.
- Artboard content: --space-4 padding, --space-3 gap between elements.

### Inspector (320px)

- Panel cards: --space-4 padding, 1px --border bottom divider.
- Panel titles: 14px/600, --text-primary. NOT 13px. NOT all the same size.
- Form labels: 12px/500, --text-secondary.
- Form inputs: 13px/400, --bg-app bg, 1px --border, --space-2 padding.
- State buttons: 12px/500 mono, --space-2 padding. Active: --accent bg + --bg-app text.
- Contrast badges: 12px/600 mono, rounded, subtle bg.

## Visual Hierarchy Rules

1. **One focal point per view.** The canvas is the focal point. The header and inspector support it.
2. **Primary actions are the only filled buttons.** Everything else is outlined or text-only.
3. **Size = importance.** The brand name is the largest text. Panel titles are the next largest. Body text is the baseline. Captions are the smallest.
4. **Space = separation.** Major regions are separated by space, not just borders. If two things are at the same --space level, they're related.
5. **Colour = state.** If something isn't a state (pass/fail/pending) or an action (primary/secondary), it's neutral grey.
6. **No decorative gradients, glows, or shadows** except: artboard drop shadow (to lift it from canvas) and modal overlay shadow.

## What Changes from Current CSS

| Current | New | Why |
|---------|-----|-----|
| 3 accent colours (violet, teal, pink) | 1 accent (blue) + state colours | Colour as meaning, not decoration |
| All text 11-13px | 12-24px scale | Type hierarchy |
| No spacing scale | 4-48px scale | Rhythm and breathing room |
| --bg-app: #0B0C10 | #0D1117 (GitHub dark) | Slightly warmer, less pure-black |
| Dot grid: rgba(255,255,255,0.06) | rgba(255,255,255,0.04) | Quieter |
| Header: all buttons same size | Primary vs secondary tiers | Cognitive load |
| Inspector titles: 13px/600 | 14px/600 | Readable, hierarchical |
| Sidebar items: 13px/11px | 14px/12px | Readable |
| No colour tokens for states | --success/--warning/--danger | Semantic |

---

## Research Synthesis — Full Design Directives

### Source Links

- **UX Design Institute — Guide to the UI Design Process**: https://www.uxdesigninstitute.com/blog/guide-to-the-ui-design-process/
- **Figma Design Basics Resource Library**: https://www.figma.com/resource-library/design-basics/
- **Laws of UX**: https://lawsofux.com/
- **Optimal Workshop — IA vs Navigation**: https://www.optimalworkshop.com/blog/information-architecture-vs-navigation-creating-a-seamless-user-experience
- **WCAG 2.2 Accessibility Guidelines**: https://www.w3.org/WAI/WCAG22/quickref/
- **Udemy Free UI/UX Courses**: https://www.udemy.com/courses/search/?q=ui+ux+design&src=sac&kw=Ui&price=price-free

### UX — Structure & Experience

#### User Needs & Research

The core loop: **content audit → card sorting → tree testing → user flow diagram → prototype → test**. Card sorting reveals how users naturally categorize content (informed IA); tree testing measures findability using a stripped text-only sitemap; user flow diagrams visualize the paths between entry points and goals.

Key insight: **test early and test often**. What you find "obvious" won't be obvious to a first-time user. You have under **2 seconds** to communicate what a product does on first impression; **87% of users** who find the right path after the first click will complete their task.

**7-Step Process (UX Design Institute):**
1. **User Research** — understand who, what problem, where friction occurs
2. **Define Objectives** — measurable success criteria
3. **Wireframing** — low-fi structure before pixels
4. **Visual Design** — type, colour, spacing (this spec)
5. **Prototyping** — interactive, clickable
6. **Usability Testing** — real users, catch structural flaws before polish locks them in
7. **Launch & Iterate** — monitor, measure, refine

Sanctum was doing 4/5/7 but skipping 1/2/3/6.

#### Information Architecture

Three components that work together:
1. **Organizational structure** — categories, subcategories, relationships
2. **Content structure** — hierarchy and types of content
3. **Navigation structure** — menus, links, search

**Dan Brown's 8 IA Principles:**
- **Objects** — treat content as living things with lifecycles
- **Choices** — less is more
- **Disclosure** — show previews of hidden content
- **Examples** — show examples when describing categories
- **Front Doors** — assume 50%+ use non-homepage entry points
- **Multiple Classifications** — offer several browse schemes
- **Focused Navigation** — keep it simple, never mix things
- **Growth** — design for content that will grow

#### User Flows & Navigation

Effective navigation rests on three pillars: **clear labeling, logical grouping, consistency**. Keep navigation links minimal; group related content; use descriptive labels that reflect what's behind them.

**Progressive disclosure** (show 5 options → 6 sub-options) beats flat breadth because Hick's Law makes sequential small decisions faster than one large simultaneous decision.

#### Mental Models

**Jakob's Law**: users spend most of their time on *other* products, so they expect yours to work the same way. Standard icon meanings, familiar placement (logo top-left, contact top-right, search top), predictable link behavior. Breaking these expectations forces learning and creates friction.

#### Cognitive Load — The Three Quantitative Laws

| Law | Formula / Rule | Design Implication |
|-----|---------------|-------------------|
| **Hick's Law** | T = a + b·log₂(n+1) | Decision time grows logarithmically with choice count. Fewer options = faster decisions. Use progressive disclosure. |
| **Fitts's Law** | T = a + b·log₂(2D/W) | Target acquisition time depends on distance (D) and width (W). Bigger, closer targets are faster to hit. |
| **Miller's Law** | 7±2 items in working memory | Don't exceed ~7 chunks per screen/menu. Group related items. |

Fitts's and Hick's fire in sequence on every interaction: Fitts governs the *move* to a target, Hick governs the *decision* of which target to move to. A 2024 Nielsen Norman Group study found interfaces optimized with Fitts's + Hick's reduced task completion time by **30%**.

**Additional cognitive principles (Laws of UX):**
- **Doherty Threshold** — keep response time < 400ms or users lose the thread
- **Chunking** — break info into meaningful groups
- **Aesthetic-Usability Effect** — attractive interfaces are *perceived* as more usable
- **Goal-Gradient Effect** — motivation increases as users approach completion (progress bars, "2 steps left")
- **Peak-End Rule** — users judge experience by peak moment and ending, not average
- **Zeigarnik Effect** — uncompleted tasks stick in memory (progress indicators leverage this)
- **Von Restorff Effect** — the one different item in a group is most memorable (use for CTAs)
- **Tesler's Law** — total complexity in a system is conserved; you can move it between expert vs. user, but not eliminate it
- **Serial Position Effect** — first and last items in a list are best remembered

#### Usability Testing

Low-fi first: paper prototypes → wireframes → clickable prototypes → real product. Test at each stage. Card sorting for IA, tree testing for findability, first-click testing for homepage, task-based usability tests for flows. The goal is catching structural flaws before pixel-level polish locks them in.

### UI — Look & Feel

#### Visual Hierarchy

Use **size, color, weight, spacing** to direct the eye. Primary actions get the largest type and the most contrast. Secondary content is smaller, lighter, or lower in the visual stack. The hierarchy should make the "what to do next" obvious without reading.

#### Consistency

Reusable components, established design systems, predictable patterns. Build for consistency across teams: shared component libraries, design tokens (layered and scoped for scale), and governance.

#### Accessibility (WCAG 2.2)

WCAG 2.2 (October 2023) added **9 new success criteria** over 2.1:

| Criterion | Level | Requirement |
|-----------|-------|-------------|
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 for normal text, 3:1 for large text (≥18pt/24px) |
| 1.4.6 Contrast (Enhanced) | AAA | 7:1 for normal text, 4.5:1 for large text |
| 2.4.7 Focus Visible | AA | Keyboard focus indicator must be visible |
| 2.4.11 Focus Not Obscured (Min) | AA | Focused element not fully hidden by sticky headers/footers |
| 2.4.12 Focus Not Obscured (Enhanced) | AAA | Focused element not obscured at all |
| 2.4.13 Focus Appearance | AAA | Sufficient area and contrast for the focus indicator |
| 2.5.7 Dragging Movements | AA | Alternatives to drag-only interactions |
| **2.5.8 Target Size (Minimum)** | **AA** | **Interactive targets ≥ 24×24 CSS px** (or sufficient spacing) |
| 3.2.6 Consistent Help | AA | Help contact, search, feedback in consistent location |
| 3.3.7 Redundant Entry | A | Don't re-ask for data the user already provided |
| 3.3.8 Accessible Authentication (Min) | AA | No cognitive function tests (e.g., "type the characters in this image") |

**Target size detail:** 24×24px is the AA floor. For AAA, targets should be 44×44px. On mobile, thumb reach means bottom-third placement is king.

#### Affordances & Signifiers

Make interactive elements *obvious*: button press states (scale down, darken), active tab highlights, hover effects (cursor change + color/size shift), focus rings. If a user can't tell what's clickable without trying, the affordance is missing.

#### Mobile Responsiveness

- Flexible layouts (container queries, CSS Grid)
- Touch targets ≥ 44×44px on mobile (Apple HIG) / ≥ 24×24px (WCAG 2.2 AA floor)
- Spacing between targets ≥ 8px to prevent mis-taps
- Text scales: test at 100%, 150%, 200% (Sanctum already has this as a canvas scenario)
- Thumb-first layout: primary actions in the bottom third

### The 30 Laws of UX (complete reference)

1. Aesthetic-Usability Effect
2. Choice Overload (Paradox of Choice)
3. Chunking
4. Cognitive Bias
5. Cognitive Load
6. Doherty Threshold (<400ms)
7. Fitts's Law
8. Flow
9. Goal-Gradient Effect
10. Hick's Law
11. Jakob's Law
12. Law of Common Region
13. Law of Proximity
14. Law of Prägnanz (simplicity)
15. Law of Similarity
16. Law of Uniform Connectedness
17. Mental Model
18. Miller's Law (7±2)
19. Occam's Razor
20. Paradox of the Active User
21. Pareto Principle (80/20)
22. Parkinson's Law
23. Peak-End Rule
24. Postel's Law (liberal in input, conservative in output)
25. Selective Attention
26. Serial Position Effect (primacy + recency)
27. Tesler's Law (conservation of complexity)
28. Von Restorff Effect (isolation)
29. Working Memory
30. Zeigarnik Effect (uncompleted tasks)

### Design Application Platforms & Frameworks (researched for customer-facing design options)

| Platform | What It Offers | Customer-Facing Design Idea | Applicability to Sanctum |
|----------|---------------|----------------------------|--------------------------|
| **FlutterFlow** | Visual drag-and-drop, compiles to native Flutter, 2D rendering engine, pixel-level canvas control, multi-platform gesture handling | "Pick a block, drop it, it works on web/iOS/Android" — live device-frame preview (phone/tablet/desktop side-by-side) | Not an addition — a rewrite (Dart/native). Sanctum's value is the AST-to-code pipeline. |
| **Toolcraft** | Framework for generating creative apps: built-in interactive canvas, colour pickers, keyframe timelines, layers, performance testing | **Template-to-product**: pick a genre (dashboard, store, editor), canvas populates with a working layout the user then customizes | Real addition candidate — "Start from" menu that seeds the AST from a scenario, user restyles. Worth a spike. |
| **Bolt.new / Lovable** | AI-native full-stack builders, prompt-to-app, React/Vue + Fabric.js/PixiJS canvas libraries | **AI prompt-to-layout box**: free text in ("a SaaS dashboard with metrics row and task table, dark mode"), AST out | Alternative builders, not additions. Sanctum already has MCP server + agentic hub — addable is the UI affordance (text box on canvas). |
| **Bubble** | No-code SaaS platform, hosted backend, visual workflow logic | **Logic without code**: "when button clicked → show this panel" — visual state machine wiring | Not applicable — Sanctum is desktop-first, no hosted backend. FSM already covers state logic. |
| **Fabric.js / PixiJS** | Canvas libraries for interactive shape creators, vector editing, GPU-accelerated rendering | True vector/2D canvas surface instead of DOM-based artboard | Addable if moving from DOM to canvas rendering — would enable infinite canvas, vector tools, drag-and-drop layers. |

### Wallpaper Theme Extraction (feature spec)

**Concept:** User picks any wallpaper image (or the current OS desktop background). Sanctum extracts its dominant colours and generates a full matching theme set so the UI harmonises with the user's chosen background. No two users get the same look — the UI adapts to *their* environment.

**Pipeline:**
1. **Input** — user selects an image file, or Sanctum reads the current Windows desktop wallpaper (`%USERPROFILE%\AppData\Roaming\Microsoft\Windows\Themes\TranscodedWallpaper.jpg`)
2. **Downsample** — resize to 64×64 (or 100×100) for fast colour analysis
3. **Extract palette** — k-means clustering (k=5) over pixel colours to find 5 dominant colours. Sort by frequency/coverage.
4. **Map to roles** — assign extracted colours to theme tokens by luminance + saturation logic:
   - **Darkest** → `surfaceCanvas` (app background)
   - **2nd darkest** → `surfaceCard` (panels)
   - **Mid-tone, low saturation** → `surfaceBorder` (dividers)
   - **Brightest, high saturation** → `actionPrimary` (accent)
   - **Lightest** → `textPrimary` (body text)
   - Derive `textSecondary` at 60% opacity of textPrimary
   - Derive `actionDanger` as complementary hue, same saturation
5. **Validate contrast** — run WCAG 2.2 check: textPrimary on surfaceCanvas ≥ 4.5:1. If it fails, lighten text or darken surface until it passes. Same for accent on card.
6. **Apply** — write the generated palette to `tokens.themes.wallpaper` (new theme slot). User can toggle it on/off from the Theme dropdown. The existing dark/light/highContrast themes remain untouched.

**Technical approach:**
- Pure Node.js, no dependencies: `sharp` (image decode + resize) + manual k-means (or `quantize` algorithm) over the raw pixel buffer
- Alternative: Canvas-based extraction in the browser (draw to `<canvas>`, read `getImageData`, cluster) — keeps it client-side, no server round-trip
- The extraction is a one-shot operation (pick wallpaper → get theme), not continuous

**UI affordance:**
- In the Design Options modal: a 7th slot "Wallpaper" with an image picker + "Extract Theme" button
- Preview: show the 5 extracted swatches + the generated theme before applying
- "Use Desktop Wallpaper" button (reads the current OS background)
- Generated theme appears in the Theme dropdown as "Wallpaper: [filename]"

**Constraints:**
- The extracted theme must still respect the type scale and spacing scale (only colours change, not layout)
- Contrast validation is mandatory — an unreadable theme is a bug, not a feature
- User can override any individual colour after extraction (per-token override, like the existing inspector)
- Cache: same wallpaper file → same theme (hash the file, skip re-extraction)

### Sanctum Studio Design Requirements (from user direction)

**The core principle: coherent composition system, not cosmetic dials.**
- Blocks snap to a real layout grid with spacing/hierarchy/colour logic baked in
- The default layout is already good; customization happens *within* the system
- People don't want cookie-cutter designs — they want basic building blocks that put together seamlessly
- Shape, textures, everything must be customisable per-block
- Workflow-first: think through how a user would design an app 1st/2nd/3rd/4th, then assemble

**11 concrete requirements (all must be met):**
1. Blocks composed on a grid, not dumped/magnified
2. Zoom + pan (not just zoom in/out)
3. Font hierarchy (headings bigger, body smaller, labels smallest)
4. Negative space, cognitive offload, colour theory applied
5. Scrollbars: thin, subtle (not "prison bars")
6. Render window: full artboard visible, not cut off
7. Two windows (Studio + live Render) that work together independently
8. Buttons: clear primary/secondary distinction, affordance states (hover/active/disabled)
9. Workflow-first ordering in the UI
10. Seamless composition (not cookie-cutter)
11. Per-block customisation: shape, texture, colour, spacing — everything custom

**The "seamless building blocks" implementation (done):**
- **Section** block: container with title bar + auto-gap children (column or row layout) — the composition workhorse
- **Divider** block: horizontal rule for visual separation
- **Shared rhythm**: every container supplies spacing through a single gap value from the spacing scale; no per-block margins (removed double-gap bug)
- **One type scale**: section headers = caption/uppercase/tracked/muted; metric values = one size; nothing hand-sized
- **One colour system**: one accent blue for actions, state colours only for status, surfaces in 3 flat steps
- **Atoms/Molecules/Organisms**: button, input, badge, toggle, text (atoms) → card, banner, metric (molecules) → task rack, table (organisms) → Section (container)
