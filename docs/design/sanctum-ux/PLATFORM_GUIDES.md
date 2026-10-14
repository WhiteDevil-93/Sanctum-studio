# Platform profiles

[Handbook](DESIGN_PROCESS.md) · Read with [library selection](LIBRARY_CATALOG.md) and [validation](VALIDATION_AND_HANDOFF.md).

These are implementation profiles, not competing brand identities. Keep shared meaning and family resemblance; respect each platform's controls, input models and accessibility APIs.

## Selection overview

| Target | Starting design reference | Suitable implementation candidates | Use when |
| --- | --- | --- | --- |
| Windows native | Microsoft Windows design guidance / Fluent | WinUI 3; existing WPF, Qt, Compose Desktop or Avalonia where suitable | Desktop integration, keyboard work, resizable tools |
| Android native | Material 3 and Android adaptive guidance | Jetpack Compose Material 3 | Android-specific input, lifecycle and integration |
| iOS / iPadOS | Apple HIG and design resources | SwiftUI, UIKit | Apple mobile behaviour, Dynamic Type and system integration |
| macOS | Apple HIG | SwiftUI, AppKit | Desktop menus, documents, windows and Mac conventions |
| Browser | WCAG 2.2, semantic HTML, relevant web design system | HTML/CSS; framework-compatible primitives or styled library | Reach, links, browser navigation and responsive content |
| Linux desktop | Target desktop's HIG | GTK/libadwaita, Qt/KDE or existing cross-platform stack | Linux integration; choose GNOME/KDE expectations explicitly |
| Multiple native platforms | Each target's guidance | Flutter, Compose Multiplatform, Qt, React Native, Avalonia, MAUI, depending on targets | Shared implementation benefits outweigh adaptation cost |
| Kiosk / TV / wearable / spatial | Device-specific vendor guidance | Device-supported runtime | Distance, limited input, public access or constrained attention |

The stack candidates are not interchangeable and have different supported targets. Confirm the selected version's support rather than assuming every option covers every row.

## Windows desktop

Reference: [Windows app design](https://learn.microsoft.com/en-us/windows/apps/design/) and [text scaling](https://learn.microsoft.com/en-us/windows/apps/develop/input/text-scaling).

Default composition: resizable workspace with navigation rail/sidebar, explicit commands, optional list-detail panes and status area. Use menus and shortcuts for expert tools; do not hide the only route to an action in a context menu.

Provide keyboard traversal, visible focus, accessible names, sensible Enter/Escape behaviour, proper window chrome and resizing. Honour text and display scaling independently; test minimum usable window height, mixed-DPI monitors and maximise/restore. Persist work independently of disposable views.

Use native file pickers, clipboard and notifications when appropriate. Mica/Acrylic can be optional surface treatments with solid fallbacks; they must not carry essential hierarchy or make text unreadable. A Qt or Compose app cannot be assumed to inherit WinUI's accessibility or scaling behaviour.

Acceptance: primary tasks on actual Windows; Narrator/UI Automation checks; keyboard-only use; supported maximum text setting; high contrast; at least two relevant display scales; smallest declared window; packaged build checks when claiming release readiness.

## Android phones, tablets and foldables

Reference: [adaptive apps](https://developer.android.com/develop/ui/compose/layouts/adaptive/get-started-with-adaptive-apps), [Compose accessibility](https://developer.android.com/develop/ui/compose/accessibility/api-defaults) and [Material 3](https://m3.material.io/).

Use window space, not just a phone/tablet label. Start with compact single-pane flows and adapt to rail/list-detail layouts when room permits. Preserve state when windows change, the keyboard opens or the activity is recreated.

Use sp for scalable text and dp for layout; do not apply a linear multiplier to all geometry as a substitute for system font scaling. Material touch-target guidance uses 48dp minimum interactive areas. Prevent enlarged invisible hit regions overlapping adjacent controls.

Respect system Back, navigation/IME insets, permissions, safe sharing and lifecycle interruptions. Keep primary actions reachable, but never let pinned bars cover content or focused fields.

Material 3 Expressive is an optional evolution, not a reason to add motion everywhere or assume all expressive APIs exist in the project's installed dependencies. [Google announcement](https://blog.google/products-and-platforms/platforms/android/material-3-expressive-android-wearos-launch/).

Acceptance: TalkBack, largest supported system font, rotation/resizing, split-screen where supported, IME-visible flow, Back behaviour, offline recovery and process recreation for work that must survive.

## iOS and iPadOS

Reference: [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) and [Apple design resources](https://developer.apple.com/design/resources/).

Use native navigation, sheets, alerts and share/file behaviours. Support Dynamic Type, VoiceOver, Reduce Motion and relevant contrast/transparency preferences. Apple generally recommends 44 by 44 point hit regions for buttons; this is not 44 CSS pixels or Android dp. [Button guidance](https://developer.apple.com/design/human-interface-guidelines/buttons).

On iPad, adapt to available window size, keyboard/pointer and multitasking. A stretched phone screen is not a tablet workflow. Provide alternatives to gesture-only actions and preserve document/selection context across navigation.

Use system materials, including newer materials where deployment targets support them, only with legibility and fallback review. Glass is not a cross-platform mandate. [Materials reference](https://developer.apple.com/design/human-interface-guidelines/materials).

Acceptance: actual supported OS/device or explicitly limited simulator evidence, VoiceOver, accessibility text sizes, keyboard where supported, safe areas, interactive dismissal, interruptions and constrained windows. Apple-native builds require the appropriate Apple toolchain; WSL does not substitute for it.

## macOS

Reference: [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/).

Design for resizable windows, menu bar commands, Command-key shortcuts, pointer interaction and document workflows. Prefer native open/save affordances and explicit unsaved-change handling. Model application, window and document state separately.

Share brand tokens with mobile without forcing phone-style full-screen sheets or bottom navigation into expert desktop workflows. Native typography and system colours can map to semantic brand roles instead of identical font files.

Acceptance: VoiceOver and keyboard; minimum windows; multiple documents/windows where relevant; supported text adaptations; light/dark and contrast settings; menu commands and focus restoration.

## Web and progressive web apps

Reference: [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [ARIA APG](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/).

Start with semantic HTML, real links for navigation and real buttons for actions. Preserve forms, browser Back, deep links, autofill and platform input behaviour. Use ARIA only to supply semantics native HTML lacks, with the required behaviour implemented.

Use fluid layouts; container queries for local available space; media queries for viewport/capabilities/preferences. Account for mobile browser bars, viewport changes and keyboard obstruction. Browser-specific APIs need a support/fallback decision.

Acceptance: declared browser/assistive-technology matrix; keyboard; 200% text resizing; reflow at 320 CSS px equivalent width with documented legitimate two-dimensional-content exceptions; text-spacing overrides; pointer/touch; no hover-only essential action. Web AA target-size rules have exceptions and use CSS pixels; see validation guide.

PWA scope must distinguish cached content, offline mutations, synchronisation, installation and push support per browser. A service-worker cache is not a guarantee that every task works offline.

## Linux desktop

References: [GNOME HIG](https://developer.gnome.org/hig/) and [KDE HIG](https://develop.kde.org/hig/).

Choose which desktop conventions the product follows, or document a neutral cross-platform shell. GTK/libadwaita suits GNOME-oriented integration; Qt suits KDE and many cross-platform tools. Do not mix both sets of visual conventions without a rationale.

Test accessible semantics on the intended desktop/assistive stack, keyboard traversal, display scaling, file dialogs, themes and window-manager behaviours. A Windows screenshot is not Linux verification.

## Shared-code / hybrid applications

Candidates and limitations are in [the library catalogue](LIBRARY_CATALOG.md).

Decide which layer is shared: business logic only, tokens, components or the full shell. Record any platform-specific adapter. Distinguish a browser-in-a-window from native controls and a custom-rendered toolkit from system widgets.

Acceptance belongs to every claimed target: input, accessibility bridges, fonts, scaling, OS integration, lifecycle and measured performance. Do not promise native feel, zero overhead or a frame rate from the framework name.

## Specialist surfaces

| Surface | Design adaptation | Mandatory project investigation |
| --- | --- | --- |
| TV / remote | Distance-readable type, directional focus, short paths, no hover dependency | Focus order, overscan/safe area, remote Back, viewing distance |
| Watch / wearable | Glanceable tasks, short interactions, sparse controls | Device targets, haptics, assistive access, accidental actions |
| Kiosk / public terminal | Explicit start/reset, privacy, reach, unattended recovery | Physical access, timeout warning, clear session teardown, offline help |
| Vehicle / industrial | Prioritised critical information, minimal distraction | Qualified safety review and device/domain standards |
| Spatial / XR | Comfortable placement, alternative input, depth restraint | Comfort, fatigue, motion/accessibility and vendor-specific requirements |
| Voice / multimodal | Concise turn-taking, visible/transcript alternatives, repair | Misrecognition, privacy, interruption, confirmation of consequential actions |

These are starting profiles, not sufficient specialist standards. Add a dedicated profile and expert review before deploying a consequential system.

## Development environment is not the UX target

| Host | Supported working approach |
| --- | --- |
| Windows without WSL | PowerShell, Windows Git, native Node/JDK/.NET/Android tools as required by the project |
| Windows with WSL | Optional Linux tooling; keep Windows-native validation on Windows |
| macOS | Native shell and target toolchains; Apple-specific build/validation where applicable |
| Linux | Native shell/toolchains; Linux/web/Android checks as appropriate |

Use the repository's documented commands, not commands invented from this table. Gradle wrapper invocation is typically gradlew.bat on Windows and ./gradlew on Unix; task names remain project-specific. Record path conventions and the actual process environment. Never repair/prune a Windows worktree merely because WSL Git cannot interpret its path.
