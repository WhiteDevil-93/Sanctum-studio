# Sources, evidence scope and freshness

[Handbook](DESIGN_PROCESS.md).

Reference review date: 2026-10-08. Links below support platform principles, library roles or the specifically noted maintenance status. This is not a verified latest-version inventory, a compatibility audit, or benchmark evidence. No dependencies were installed during this documentation change.

Selection recommendations are editorial guidance derived from task/maintenance tradeoffs, not endorsements or performance guarantees by the linked organisations.

## 1. Primary platform references

| References | Supports | Version/status and retrieval limits |
| --- | --- | --- |
| [Fluent 2](https://fluent2.microsoft.design/), [Windows design](https://learn.microsoft.com/en-us/windows/apps/design/), [Windows text scaling](https://learn.microsoft.com/en-us/windows/apps/develop/input/text-scaling) | Windows conventions and scaling investigation | Current reference pages accessed; validate toolkit/runtime behaviour separately |
| [Windows App SDK](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/), [WinUI Gallery](https://github.com/microsoft/WinUI-Gallery) | Windows framework and control examples | Exact latest stable SDK/Gallery release not established |
| [Android adaptive apps](https://developer.android.com/develop/ui/compose/layouts/adaptive/get-started-with-adaptive-apps), [Compose](https://developer.android.com/develop/ui/compose), [Compose accessibility](https://developer.android.com/develop/ui/compose/accessibility/api-defaults) | Available-space layout and 48dp target guidance | Installed Compose versions and project support not checked |
| [Material 3](https://m3.material.io/), [Material 3 Expressive announcement](https://blog.google/products-and-platforms/platforms/android/material-3-expressive-android-wearos-launch/) | Optional newer visual/motion direction | Announcement is not proof a project's dependencies expose a particular API |
| [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/), [resources](https://developer.apple.com/design/resources/), [buttons](https://developer.apple.com/design/human-interface-guidelines/buttons), [materials](https://developer.apple.com/design/human-interface-guidelines/materials) | Apple conventions, resources, button hit regions and materials | Some Apple pages returned JavaScript-only content in text retrieval; detailed material/API claims require interactive/vendor documentation review before adoption |
| [SwiftUI](https://developer.apple.com/documentation/swiftui), [UIKit](https://developer.apple.com/documentation/uikit), [AppKit](https://developer.apple.com/documentation/appkit) | Native Apple framework references | Deployment/API availability not audited; text retrieval limited on some pages |
| [GNOME HIG](https://developer.gnome.org/hig/), [KDE HIG](https://develop.kde.org/hig/) | Linux desktop conventions | Selected desktop/toolkit versions not audited |

## 2. Accessibility standards and supporting guidance

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): adopted web baseline; apply relevant criteria, not only a shorthand checklist.
- [Contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html): distinct contrast conditions and exceptions.
- [Resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html): different adaptation checks; do not substitute a prototype scaling slider.
- [Target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): web CSS-pixel requirements and exceptions, not native dp/point guidance.
- [Dragging movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html): alternative input requirements and exceptions.
- [ARIA APG read-me-first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/): semantic roles require matching behaviour.
- [WCAG 3 introduction](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/): monitor evolving work; do not silently replace adopted WCAG 2.2 acceptance with a draft.

Native accessibility and legal obligations require project-specific mapping. Vendor component accessibility claims are not complete-product conformance evidence.

## 3. Tokens and compilation

| Reference | Supports | Caveat |
| --- | --- | --- |
| [DTCG format 2025.10](https://www.designtokens.org/tr/2025.10/format/) | Typed tokens/aliases and interoperable source format | Community-group specification, not W3C Recommendation |
| [Style Dictionary formats](https://styledictionary.com/reference/hooks/formats/) | Configured output/transformation pipeline | Custom target resources may require adapters; no pipeline installed here |
| [Griffel build optimisation](https://griffel.js.org/react/build-optimization/introduction/) | Optional ahead-of-time optimisation | Do not claim Fluent styling is inherently free of runtime cost |

## 4. Library and runtime references

Checked for identification and documented role, not every control, licence term or latest release:

- Microsoft: [Fluent UI](https://github.com/microsoft/fluentui), [Fluent UI Apple](https://github.com/microsoft/fluentui-apple), [Fluent UI Android](https://github.com/microsoft/fluentui-android).
- Adobe: [React Aria](https://react-aria.adobe.com/), [React Spectrum](https://react-spectrum.adobe.com/). Older React Stately documentation entry currently redirects to React Aria; investigate the exact package/hooks/version before adoption.
- [Radix accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility), [shadcn/ui introduction](https://ui.shadcn.com/docs), [Carbon repository](https://github.com/carbon-design-system/carbon).
- [Shopify Polaris web components](https://shopify.dev/docs/api/app-home/latest/web-components), [Polaris React migration](https://shopify.dev/docs/apps/build/app-home/migrate-from-polaris-react), [Restyle](https://shopify.github.io/restyle/).
- [SLDS](https://www.lightningdesignsystem.com/), [Angular Material](https://material.angular.dev/), [Angular](https://angular.dev/overview), [PrimeVue](https://primevue.dev/), [Bits UI](https://bits-ui.com/docs/introduction).
- [Qt](https://www.qt.io/development/qt-framework), [Compose Multiplatform](https://www.jetbrains.com/compose-multiplatform/), [Flutter widgets](https://docs.flutter.dev/ui/widgets), [React Native accessibility](https://reactnative.dev/docs/accessibility), [Tamagui](https://tamagui.dev/docs/intro/introduction), [Avalonia](https://www.avaloniaui.net/), [MAUI](https://learn.microsoft.com/en-us/dotnet/maui/what-is-maui).
- Community adaptations: [Flutter fluent_ui](https://github.com/bdlukaa/fluent_ui), [PyQt-Fluent-Widgets](https://github.com/zhiyiYo/PyQt-Fluent-Widgets). Inspect actual licences before use.
- Discovery only: [Awesome Design Systems](https://github.com/alexpate/awesome-design-systems), [Awesome UI Component Libraries](https://github.com/anubhavsrivastava/awesome-ui-component-library).

A direct Fluent web-components package-tree fetch failed during this review; the catalogue uses the official Fluent repository as the entry point rather than treating that failed path as verified package documentation. Several interactive sites returned limited text. Library adoption requires their detailed component and release documents, not just the landing page.

## 5. Status-sensitive findings

- [Material Android Views](https://github.com/material-components/material-components-android): repository identifies maintenance mode.
- [Material Web](https://github.com/material-components/material-web): repository identifies maintenance pending new maintainers.
- [Polaris migration guidance](https://shopify.dev/docs/apps/build/app-home/migrate-from-polaris-react): current official path includes web components; do not describe Polaris React as the universal preferred new implementation.
- [Responsible agent design](https://microsoft.design/articles/principles-for-responsible-agent-design/): useful newer guidance for agency, control and consequential actions; not a certification scheme.

Recheck these at selection time. A maintenance label may change, and existing applications need a supported migration decision rather than automatic replacement.

## 6. How to refresh this guide

Before selecting/upgrading a library, record its actual installed and candidate versions, upstream release/support status, target compatibility, licence and the decision affected. Recheck an emerging pattern before making it a requirement.

Source failure fallback: label the affected claim Unknown/Not verified, retain established guidance and continue independent work. Never invent a version or treat a search summary as package behaviour.

This guide deliberately does not claim that UX-law collections establish hard menu limits, loading-time thresholds or mandatory hit areas. If a quantitative psychological claim drives a design decision, obtain the original research and evaluate its applicability; otherwise treat it as a testable heuristic.
