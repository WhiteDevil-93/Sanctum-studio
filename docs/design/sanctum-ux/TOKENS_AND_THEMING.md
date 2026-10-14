# Tokens, theming, typography and adaptable layout

[Handbook](DESIGN_PROCESS.md) · [Platform profiles](PLATFORM_GUIDES.md).

## 1. Share meaning before sharing pixels

Use three token layers:

| Layer | Example role | Purpose |
| --- | --- | --- |
| Foundation | Palette, type families, spacing steps, radii | Raw reusable values |
| Semantic | Surface, primary text, focus, danger, selected | Meaning independent of a theme |
| Component | Button padding, field border, panel header | Component-specific mapping where needed |

Map semantic roles to each platform's resources. Platform fonts, navigation and control metrics may differ while preserving hierarchy and identity. Do not flatten every system colour into one brand accent.

Separate domain/category identity from outcome state: a domain hue must not ambiguously mean Failed or Completed. Add icons/text for status, never colour alone.

## 2. Token-to-code architecture

Recommended when multiple surfaces need coordinated changes:

Design decisions → versioned token source → validated aliases/types/themes → platform transforms → generated resources → component adapters → target-specific tests.

A [DTCG 2025.10](https://www.designtokens.org/tr/2025.10/format/) source is an option for interoperable tooling. It is a community specification, not a W3C Recommendation. A small single-platform product may use a simpler versioned semantic-token source instead.

Illustrative DTCG token data, not a configured repository pipeline:

```json
{
  "space": {
    "small": {
      "$type": "dimension",
      "$value": { "value": 8, "unit": "px" }
    }
  },
  "color": {
    "accent": {
      "$type": "color",
      "$value": {
        "colorSpace": "srgb",
        "components": [0.25, 0.3, 0.8],
        "alpha": 1
      }
    },
    "action": {
      "$type": "color",
      "$value": "{color.accent}"
    }
  }
}
```

This demonstrates types and an alias, not a complete accessible theme. Pixel token units do not justify copying the same numbers unchanged into dp or points; the mapping is a documented platform design decision.

[Style Dictionary](https://styledictionary.com/reference/hooks/formats/) can transform token sources. Configure and test the selected formats; Compose, Swift, XAML and bespoke runtime models may need custom generators or adapters.

Required pipeline checks if adopted:

- Parse the chosen schema/version; reject unresolved aliases and cycles.
- Validate required semantic roles for every theme and output target.
- Confirm colour-space conversion, units, typography and composite types.
- Generate reproducibly; keep generated outputs read-only with source provenance.
- Compile/load the generated target resources.
- Run contrast and component state checks after overrides.
- Record tool/version and check generated changes in review.

Do not hard-code duplicate token values independently in several clients and call them synchronised.

## 3. Typography and adjustable size

Default: honour system/browser text settings. An in-app text preference supplements them; define their interaction to avoid accidental double scaling.

Web: use relative text units where appropriate, allow wrapping and content-driven control height. Fixed media dimensions, hairlines and artwork can legitimately use other units. Do not disable zoom or set a scaling ceiling that prevents required access.

Android: use platform text scaling through sp and appropriate dp layout. Apple: use text styles/Dynamic Type where appropriate. Windows: distinguish system text scaling from display scaling and app density. Confirm the toolkit's actual support; native-looking components may not inherit it.

Rules:

- Never shrink text automatically to preserve a screenshot layout.
- Use minimum sizes rather than clipping fixed-height label containers.
- Wrap or restructure actions with long labels; prioritise rather than cram.
- Keep icon optical size and spacing coherent with its label; the hit area can exceed the visible icon.
- Separate compact/comfortable density from text size.
- Declare text truncation only where appropriate, with an accessible route to full essential content.
- Test long translations, RTL, numbers, unbroken strings and fallback fonts.
- Verify font licence, glyph coverage, loading/fallback and offline behaviour.

A 200% prototype scale is not proof of platform system-text support or web reflow.

## 4. Layout and scaling

Use available content space as the constraint. Let side panels become sheets or separate pages when the task remains understandable; never hide essential capability without another route.

Choose breakpoints from observed content failure and platform guidance, not fashionable device labels. Web container queries suit reusable components; media queries still suit viewport/capabilities and preferences. Native apps use their platform layout/window APIs.

Preserve meaningful reading order when visual placement changes. Ensure flex/grid children can shrink when appropriate; avoid a root overflow rule that masks clipped content. Distinguish page scrolling from intentional local table/canvas scrolling.

Mobile bars, keyboard, safe areas and very short windows need explicit testing. Do not prescribe 100vh or a fixed screenshot frame as a production layout rule.

## 5. Customisable colours and backgrounds

Provide curated presets first, then controlled customisation if the product benefits.

- Backgrounds are optional decoration, not information.
- Keep task text on reliably readable surfaces or enforce tested scrims/contrast.
- Limit image intensity/opacity; provide a plain background and reduced-transparency fallback.
- Bound allowed foreground/background pairings or validate them with understandable feedback.
- Keep focus, error, success, disabled and selection states legible after overrides.
- Never recolour every status with the user's accent.
- Include light/dark and system-following choices when supported by the product brief.
- Provide live preview, Apply/Cancel if appropriate, Reset and a reliable return to defaults.
- Store a versioned preference; recover gracefully from invalid/missing values.
- Define per-device versus synced preferences and any image privacy/storage policy.
- Respect reduced motion, forced colours/high contrast and platform settings.

A token contrast calculation is useful but does not prove contrast over translucent/image/gradient content. Inspect the composed result.

## 6. Component contract

For each shared component record variants, states, anatomy, text wrapping, hit area, focus/keyboard semantics, assistive name/role/value, motion, theme mappings and platform exceptions.

Start with high-use controls: button, field, link, selector, menu, dialog/sheet, navigation item, status, list/table row and progress indicator. Add complex widgets only when the workflow needs them.

A shared visual specification should not replace platform behaviour. A system alert and web dialog can share urgency/copy while retaining different native interaction implementations.
