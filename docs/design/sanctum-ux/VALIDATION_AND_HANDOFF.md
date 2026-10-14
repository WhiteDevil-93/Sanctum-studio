# Validation, accessibility and design handoff

[Handbook](DESIGN_PROCESS.md) · [Templates](TEMPLATES.md) · [Sources](SOURCES.md).

These are acceptance procedures for future products, not claims that current Sanctum screens passed them.

## 1. Evidence levels

| Claim | Needed evidence |
| --- | --- |
| Design intent specified | Written rule/flow with scope and measurable acceptance |
| Prototype interaction exercised | Scenario, environment, click/keyboard path and observed result |
| Source supports behaviour | File/commit and inspected calling/state path |
| Real integration works | Representative real calling path and relevant failure case |
| Accessibility checked | Named criteria, environment, assistive tools and actual outcomes |
| Release ready | Packaged target artefact exercised against required gates |

Record Pass, Fail, Not run, or Not applicable with justification. Do not collapse untested work into a green total. Prototype QA is not production QA.

## 2. Accessibility baseline

For web, default to applicable WCAG 2.2 AA criteria; assess the full applicable criteria, not just this shortlist. For native apps use platform accessibility guidance and relevant applicable requirements. Do not label a native product or a component library compliant solely from a WCAG-inspired checklist.

| Area | Check | Acceptance / source |
| --- | --- | --- |
| Text contrast | Rendered themes and all relevant states | At least 4.5:1 normal text; 3:1 qualifying large text, subject to criterion exceptions: [Contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) |
| Non-text contrast | Necessary control boundaries/state indicators and graphics | Applicable 3:1 requirements and exceptions: [Non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) |
| Text resize | Increase text without disabling zoom | 200% without loss, with criterion exceptions: [Resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) |
| Reflow | Constrain width / relevant zoom conditions | 320 CSS px equivalent width for vertical content; legitimate two-dimensional exceptions documented: [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) |
| Text spacing | Apply user spacing overrides | No loss of content/function under specified overrides: [Text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) |
| Pointer targets | Measure interactive region and neighbouring spacing | Web AA 24 by 24 CSS px or applicable exception; not a universal 48px rule: [Target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) |
| Android targets | Inspect size and overlap | Material guidance 48dp: [Compose accessibility](https://developer.android.com/develop/ui/compose/accessibility/api-defaults) |
| Apple targets | Inspect hit region | General button guidance 44 by 44 points; device-specific differences: [Apple buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) |
| Drag alternatives | Complete drag operations without dragging | Applicable alternatives/exceptions: [Dragging movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) |

Also check keyboard access/no traps, focus visibility and obscuration, reading order, labels/instructions, names/roles/values, error recovery, authentication, status announcements, media alternatives and motion/flashing as applicable. [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

Prefer native semantics before ARIA; roles promise behaviours that must actually be implemented. [ARIA APG](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/).

Automated accessibility tools catch a subset. Combine them with keyboard, screen-reader and visual/user checks. Do not claim AAA because Dynamic Type exists, or AA because a library says its components are accessible.

## 3. Representative test matrix

Declare supported devices/OS/browsers rather than testing an arbitrary universal set.

| Dimension | Representative cases |
| --- | --- |
| Window/content space | Smallest supported width and height; typical; large; resize during task |
| Text / display | Default, intermediate and maximum supported text; relevant independent display scales |
| Web | 200% text, 320 CSS px equivalent reflow, supported desktop/mobile browsers |
| Input | Keyboard, pointer, touch; pen/remote/controller where supported |
| Accessibility | Actual named screen-reader combinations, reduced motion, contrast/forced colours |
| Content | Empty, typical, long labels, long unbroken strings, many rows, unknown/missing media |
| Language | Long translation, RTL, locale number/date formats, timezone when relevant |
| Connectivity | Offline, slow, timeout, stale response, reconnect, duplicate or late response |
| Lifecycle | Navigation away/back, suspension, restart/reload, process recreation where applicable |
| Authority | Permission denied/revoked, expired session, wrong target, test versus production |
| Preferences | Light/dark, custom accent/background, invalid saved preference, reset |

Example sizes such as 390px phone or 1280px desktop may be useful scenarios, not universal supported-device definitions. Record actual viewport/content dimensions; resizing a host window does not always resize an embedded prototype.

## 4. Workflow proving checks

For each critical journey test its entry, meaningful result and recovery:

- First-run setup: prerequisites, test connection, first useful task, optional integrations.
- Forms: invalid inputs, correction, preserved values, submit pending and confirmation.
- Navigation: destination correct, Back/deep link correct, draft/work survives.
- Background work: submitted/queued/running/failed/cancelled states match service evidence.
- Stop: request versus acknowledged cancellation; clarify whether external work continues.
- Retry: does not duplicate payment, job or destructive action unexpectedly.
- Storage: saved locally, server accepted and synced are distinguished; failure visible.
- Selection: action scope and counts accurate; filters do not silently expand destructive scope.
- Stale responses: obsolete results cannot replace the selected context unnoticed.
- Accessibility: primary task can be completed, not merely the screen read aloud.

A status label needs a source and freshness policy. Do not display invented user tiers, version numbers or unconditional health.

## 5. Performance and resilience

Set budgets from target hardware, task importance and user research. Measure input responsiveness, startup, scrolling, large-data behaviour and relevant network work. Do not promise 60–120 FPS or zero overhead from a framework/compiler choice.

Give feedback promptly without gratuitous flicker. Use progress when it is meaningful; indeterminate status when the total is unknown. Skeletons suit predictable content, not every action. No universal 300ms/2s loading rule applies to all products.

Keep cancellation, recovery and current status discoverable during long work. Actionable notifications must remain available long enough to use, or have a durable alternative. Streaming updates should not overwhelm assistive announcements.

## 6. Design-to-code handoff

Deliver:

1. Brief and supported platform/stack scope.
2. Navigation map and task flows, with state ownership.
3. Component/token contract and platform exceptions.
4. All critical states: empty, error, offline, pending, success and permissions.
5. Interaction-to-screen/API table with real/proposed/simulated status.
6. Persistence, privacy, cost and authority boundaries.
7. Responsive/scaling rules and accessible interaction specification.
8. Source commit, dirty-state snapshot and source-check date.
9. QA evidence, failures, not-run items and acceptance owner.
10. Export inventory, licensing and asset provenance.

Ensure exported PDFs include every section and do not silently clip tables or omit open issues. Compare export page/content coverage with the source. A share link is not enough if reviewers cannot access it.

## 7. Release decision

A design is ready for implementation when contracts and important design risks are resolved to the agreed scope. A product is ready for release only when its required implementation/integration/platform gates pass.

If a gate fails, record the failure and remediation. If unavailable, record Not run and the missing environment. Never present source presence, old reports, another agent's summary or green mock tests as proof of target-device behaviour.

Maintain an exception register with scope, impact, owner and review date. Acceptance exceptions require the appropriate decision-maker; do not invent them to achieve a green report.
