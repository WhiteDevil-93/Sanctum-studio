# Library catalogue and selection rules

[Handbook](DESIGN_PROCESS.md) · [Platform profiles](PLATFORM_GUIDES.md) · [Interface subtypes](INTERFACE_PATTERNS.md).

This is a shortlist of options, not an exhaustive inventory or a package installation plan. Sources were checked on 2026-10-08 for the stated role/status; exact latest releases and compatibility with a specific project were not audited. Recheck before adoption. No library guarantees application accessibility, performance or regulatory compliance.

## 1. Choose the kind of foundation first

| Circumstance | Default approach | Reason / tradeoff |
| --- | --- | --- |
| Existing stack already meets the need | Extend its controls/tokens | Lowest migration cost; verify gaps rather than replace on fashion |
| Small content/site surface | Semantic HTML/CSS and a small existing stack | A heavyweight component suite may add more cost than benefit |
| Deep integration with one OS | Evaluate native framework and system controls | Platform interaction/accessibility support; platform-specific code |
| Enterprise product needing many standard controls | Evaluate a compatible styled design system | Faster breadth; opinionated appearance and upgrade constraints |
| Distinct brand requiring complex web controls | Evaluate headless primitives | Own styling; still own composition, semantics and testing |
| Shared native UI is a real requirement | Evaluate a cross-platform renderer | Shared code; adapters and per-target validation remain |
| Special editor/map/chart/canvas | Evaluate a specialist engine separately | General component kits supply the shell, not the specialised interaction |

Use one primary component family per surface. Integrate another only for a missing capability with an adapter and recorded testing. Do not mix Fluent, Material and Carbon visuals randomly.

## 2. Native and cross-platform frameworks

| Candidate / primary reference | Use when | Limitations / adoption checks |
| --- | --- | --- |
| [WinUI 3 / Windows App SDK](https://learn.microsoft.com/en-us/windows/apps/windows-app-sdk/) + [WinUI Gallery](https://github.com/microsoft/WinUI-Gallery) | New Windows-focused app requiring modern Windows controls | Confirm deployment, packaging, OS support and required controls; not a web/mobile implementation |
| [Jetpack Compose](https://developer.android.com/develop/ui/compose) / Material 3 | Android declarative UI | Adaptive layout, state/lifecycle and semantics need application work |
| [SwiftUI](https://developer.apple.com/documentation/swiftui), [UIKit](https://developer.apple.com/documentation/uikit), [AppKit](https://developer.apple.com/documentation/appkit) | Apple-native product | Deployment/toolchain constraints; evaluate available APIs on supported OS versions |
| [Qt](https://www.qt.io/development/qt-framework) / PySide where appropriate | Cross-platform desktop, engineering and creative tools | Check licensing, bindings, deployment, accessibility and platform conventions |
| [Compose Multiplatform](https://www.jetbrains.com/compose-multiplatform/) | Existing Kotlin investment or shared UI requirement | Verify selected-version target support and platform/accessibility integration; not automatically WinUI |
| [Flutter Material / Cupertino](https://docs.flutter.dev/ui/widgets) | Shared UI with supported Flutter targets | Native-looking widgets are not identical to system controls; test OS integration and accessibility |
| [React Native](https://reactnative.dev/docs/accessibility) | React-skilled mobile team with compatible native modules | Desktop/web targets require their own supported implementations; native accessibility differs from ARIA |
| [Tamagui](https://tamagui.dev/docs/intro/introduction) | React Native/web team needing shared tokens/components and optimisation | Additional compiler/tooling complexity; benchmark the actual build; no zero-runtime/FPS guarantee |
| [Avalonia](https://www.avaloniaui.net/) | .NET cross-platform desktop UI | Verify exact targets, native integration, deployment and accessibility |
| [.NET MAUI](https://learn.microsoft.com/en-us/dotnet/maui/what-is-maui) | .NET app across its supported mobile/desktop targets | Verify official target list; do not assume Linux is an official equivalent target |
| [GTK/GNOME](https://developer.gnome.org/hig/) or [Qt/KDE](https://develop.kde.org/hig/) | Linux-native integration | Choose desktop expectations and test the actual accessibility/input stack |

WPF, Android Views, UIKit and other existing frameworks are not automatically obsolete because a newer alternative exists. Modernise for a measured need and a migration plan.

## 3. Web systems and behavioural primitives

| Candidate / source | Good circumstances | Important distinction |
| --- | --- | --- |
| [Fluent UI React](https://github.com/microsoft/fluentui) | Microsoft-aligned enterprise web tools | React components are not WinUI controls; distinguish version families |
| [React Aria](https://react-aria.adobe.com/) | Custom-styled React with complex accessible interactions | Behaviour primitives; still test labels, composition and assistive combinations |
| [React Spectrum](https://react-spectrum.adobe.com/react-spectrum/) | Adobe-style enterprise React interface | Styled system, unlike unstyled React Aria |
| [React Stately](https://react-spectrum.adobe.com/react-stately/) | Shared state logic behind compatible controls | State hooks, not a complete rendered component library |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/accessibility) | Custom-styled React overlays and common controls | Keyboard/focus patterns supplied for supported components; app conformance not inherited |
| [shadcn/ui](https://ui.shadcn.com/docs) | Teams wanting editable component source and compatible styling | Code ownership also means owning updates; inspect the chosen component's underlying primitives |
| [IBM Carbon](https://github.com/carbon-design-system/carbon) | Dense enterprise/data-oriented web products | Opinionated system; verify maintained implementation for the actual framework |
| [Polaris web components](https://shopify.dev/docs/api/app-home/latest/web-components) | Shopify App Home and merchant workflows | Platform-specific guidance; not a generic universal native UI kit |
| [Salesforce SLDS](https://www.lightningdesignsystem.com/) | Salesforce-aligned enterprise experiences | Confirm SLDS version, implementation and ecosystem constraints |
| [Angular Material / CDK](https://material.angular.dev/) | Existing Angular product | CDK behaviour and Material styling are distinct; do not introduce Angular solely for a control |
| [PrimeVue](https://primevue.dev/) | Vue product needing broad component coverage | Verify component/theme support, licensing of extras and accessible behaviour |
| [Bits UI](https://bits-ui.com/docs/introduction) | Svelte custom-styled primitives | Framework-specific; verify supported component behaviours |
| Native HTML controls + CSS | Small sites, forms, progressive enhancement | Custom appearance still needs keyboard/focus/contrast review |

Angular, Vue, React and Svelte are application-framework choices, not visual design systems. Tailwind/CSS utilities style elements but do not by themselves implement dialog focus management or accessible combobox behaviour.

## 4. Maintenance-sensitive and community options

| Option / reference | Current use guidance |
| --- | --- |
| [Material Components Android Views](https://github.com/material-components/material-components-android) | Repository identifies maintenance mode; support existing Views products, evaluate Compose for new Android work |
| [Material Web](https://github.com/material-components/material-web) | Repository identifies maintenance pending new maintainers; review lifecycle risk before new adoption |
| [Polaris React migration](https://shopify.dev/docs/apps/build/app-home/migrate-from-polaris-react) | Consult current web-component migration guidance instead of assuming React is the preferred new integration |
| [Fluent UI Apple](https://github.com/microsoft/fluentui-apple) | Candidate for Microsoft-aligned native Apple experiences; verify OS/toolchain/control requirements |
| [Fluent UI Android](https://github.com/microsoft/fluentui-android) | Candidate for Microsoft-aligned Android UI; verify implementation and coverage for chosen release |
| [Fluent UI web components](https://github.com/microsoft/fluentui) | Candidate for custom-element-based Fluent web work; verify current package/support and form behaviour |
| [fluent_ui for Flutter](https://github.com/bdlukaa/fluent_ui) | Community Windows-like Flutter styling, not Microsoft's WinUI runtime |
| [PyQt-Fluent-Widgets](https://github.com/zhiyiYo/PyQt-Fluent-Widgets) | Community Qt Fluent-style controls; inspect licence, bindings, deployment and support before commercial adoption |
| [Shopify Restyle](https://shopify.github.io/restyle/) | Typed theming for React Native; not automatic Polaris feature parity |

Being a community project is not a rejection. It changes the maintenance, licensing and fallback investigation. Likewise, an official library can have unsuitable scope or be in maintenance mode.

## 5. Token and design resources

- [DTCG format 2025.10](https://www.designtokens.org/tr/2025.10/format/): vendor-neutral token interchange community specification, not a W3C Recommendation.
- [Style Dictionary formats](https://styledictionary.com/reference/hooks/formats/): token transformations/output generation; configure adapters and validate generated resources.
- [Fluent 2](https://fluent2.microsoft.design/), [Material 3](https://m3.material.io/) and [Apple design resources](https://developer.apple.com/design/resources/): design references; confirm licensing and supported versions.
- Design tools such as Figma/Sketch or token plugins are optional authoring adapters. A plugin export does not establish correct aliases, contrast or runtime mappings.

See [tokens and theming](TOKENS_AND_THEMING.md). Token generation is not a completed feature in this repository merely because its architecture is documented.

## 6. Adoption gate: every selected library

Record the following before committing a product to it:

1. Target OS/browser/runtime and framework versions.
2. Required controls and missing components; behaviour and semantic access.
3. Official maintenance policy, current release checked, security and migration path.
4. Licence, attribution, distribution and commercial restrictions.
5. Styling/token integration; theme and large-text behaviour.
6. RTL/localisation, keyboard/touch/pointer and assistive-technology evidence.
7. Build/SSR/hydration or native packaging compatibility where relevant.
8. Bundle/startup/rendering cost measured on representative hardware.
9. Tests for representative risk cases: dialog focus, complex form, dense data or large list.
10. Owner, update policy, rejected alternative and replacement/rollback strategy.

Choose with requirements, not star counts. Run a small evaluation on the actual stack before a wholesale migration. No library in this catalogue was installed or benchmarked as part of writing the handbook.

## 7. Discovery directories

[Awesome Design Systems](https://github.com/alexpate/awesome-design-systems) and [Awesome UI Component Libraries](https://github.com/anubhavsrivastava/awesome-ui-component-library) are discovery indexes only. Follow through to the maintainer's documentation, licence and release policy. Research/UX-law collections may suggest questions; they are not conformance standards or proof of a library's quality.

For maps, charting, calendars, code editors, rich text, CAD, media timelines and game engines, add a scoped catalogue entry after researching the specific capability. General component-library selection does not substitute for that evaluation.
