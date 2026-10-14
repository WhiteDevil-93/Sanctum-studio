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
