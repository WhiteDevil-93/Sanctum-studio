# Handbook expansion record

Date: 2026-10-08.

## Outcome and scope

Expand the former Sanctum-only design process into a portable handbook for existing and future products, with platform profiles, task-based interface subtypes, selection circumstances, library options, theming/scaling guidance, validation and templates.

Documentation only. No app implementation, dependency installation, service operation, branch cleanup, commit or push is part of this change.

Baseline inspected with WSL Git: cd178f91b0ee591cd126f10507c7c5768907c04b. Initial status showed an untracked desktop/.kotlin/ directory. Subsequent status also showed concurrent changes to canvas-src/ and hub/domain_tasks.py; these are outside this task and were not edited here. Another session appended its Qwen Lab record to DESIGN_PROCESS.md during this change. Its content is preserved as a clearly scoped product-specific addendum; those implementation/test claims were not independently reverified here.

## Working rationale

This cause-and-effect map describes risks to a useful general guide, not proven software root causes.

```text
Users: novice/expert differences ------\
       access and input needs ---------\
Methods: prototype workarounds ----------\
         framework-first decisions ------> Reusable, trustworthy design guidance
Sources: changing support status --------/
         exaggerated guarantees --------/
Evidence: mock QA versus real targets --/
          unclear not-run checks ------/
```

| Factor | Evidence/status | Impact | Check / response |
| --- | --- | --- | --- |
| Prototype-specific process | Original guide described one Artifact prototype | High: accidental universalisation | Preserve history; move general guidance to entry point |
| Multiple tasks/platforms | Owner requests future/general products | High: narrow recipes miss workflows | Platform and subtype selection matrix, extension procedure |
| Library/status claims | Official source review, with recorded retrieval gaps | High: unsuitable migration or guarantee | Primary links, scope/status caveats and adoption gate |
| Scaling/accessibility | Existing guide made absolute unit/layout claims | High: adaptation can break | Platform units and measurable validation rules |
| Shared checkout changes | Git status changed while writing | High: risk of overwriting another agent | Restrict edits to handbook Markdown; no blanket cleanup |

## Plan, alternatives and recovery

1. Preserve the original process as SANCTUM_CASE_STUDY.md.
2. Replace DESIGN_PROCESS.md with a reusable entry point and explicit corrections.
3. Add platform, subtype, library, token, validation, template and source guides.
4. Check local links, Markdown structure, example JSON and preservation.
5. Review the scoped diff and report limits.

If an upstream page is unavailable, retain its reference with a retrieval caveat or use the official project entry point; do not promote unsupported details. If a local validation fails, fix the relevant document and rerun the same check.

Recovery: the original content is retained as the case-study file. Restore only task-owned edits if requested; do not reset this shared checkout. No paid resources or application services are used.

## Acceptance and verification

The final check results are recorded below after execution. Scope is document integrity/content, not target application behaviour.

| Gate | Expected evidence |
| --- | --- |
| Portable structure | Entry point links to each general guide and the preserved case study |
| Breadth | Platform profiles plus task-based subtypes and a procedure for new types |
| Actionable selection | Library circumstances, limitations, adoption gates and primary references |
| Historical preservation | Case study matches the original text after line-ending/terminal-newline normalisation |
| Document integrity | Local links resolve, fences balanced, JSON parses, no broken citation markers in new guidance |
| Scoped change | Task edits limited to handbook Markdown; concurrent app/prototype work not touched |

## Executed document checks

PowerShell readback and document-structure check, followed by WSL Git scoped diff checking:

- 10 Markdown files inspected.
- 32 local Markdown links resolved; 0 missing links.
- 64 unique external reference URLs inventoried. This count is not a claim that every external link was independently reachable or fully readable.
- 1 JSON example parsed successfully; no DTCG schema validator was run.
- 0 issues in the local-link, fence-balance, table-column, unresolved-marker and new-guidance whitespace checks.
- 23 interface subtype rows counted in the selection matrix.
- Preserved case-study content matched the original after CRLF and terminal-newline normalisation.
- All handbook files matched their authored readback; the main entry point additionally retains the concurrent product-specific addendum.
- Scoped command: `git diff --check -- docs/design/sanctum-ux/DESIGN_PROCESS.md` in WSL returned exit 0 after correcting the concurrent addendum's trailing whitespace.
- Scoped status showed the modified entry point and nine new handbook Markdown files; no commit or push was made.

These checks establish the written deliverable and local document integrity, not application usability or external-library capability.

## Limits

No rendered Markdown/PDF review, application build, target-device usability test, screen-reader audit, library compatibility trial or performance benchmark was run for this documentation request. Some official pages exposed limited text and the source log identifies that limitation.

The handbook specifies future verification; it does not resolve the historical Sanctum QA gaps or certify current implementations. No guide can cover every specialist domain without further research and qualified review.
