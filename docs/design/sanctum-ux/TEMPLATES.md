# Reusable design templates

[Handbook](DESIGN_PROCESS.md). These are forms to complete in a project's design area, not claims of existing implementation.

## 1. Product brief

| Field | Required entry |
| --- | --- |
| Product and owner | Name, decision-maker and maintainers |
| Users | Roles, access needs, novice/expert and representative research |
| Outcomes | Observable tasks and definition of success |
| Surfaces | OS/device/browser and input methods |
| Subtypes | Selected interface profiles and why |
| Existing baseline | Repository commit, dirty snapshot, implemented versus proposed |
| Constraints | Cost, time, licensing, connectivity, privacy and domain standards |
| Brand | Desired character, shared rules and allowed platform variation |
| Risks | Consequential actions, interruptions and uncertain capability |
| Gates | Required checks, expected outcomes and evidence owner |
| Exclusions | Not included, simulated or future-target scope |

## 2. Design rule

| Field | Required entry |
| --- | --- |
| ID | Stable project-scoped identifier |
| Level | Requirement / Default / Option |
| Scope | Platforms, components and relevant exceptions |
| Requirement | Unambiguous observable behaviour |
| Reason and source | Product decision or linked authoritative guidance |
| Implementation | Platform-specific mapping; avoid unverified API claims |
| Check | Procedure, environment and inputs |
| Pass condition | Observable expected result |
| Evidence | Result and artefact path |
| Owner | Responsible implementer/reviewer |
| Exception | Rationale, authority and review date |

## 3. Subtype extension

Record: users; dominant task; entry/exit; information volume; visual composition; input/access needs; component families; state/persistence; characteristic failures; consequential-action policy; acceptance checks; sources; known uncertainty.

Examples of genuinely new constraints: field service without connectivity, audio editing requiring precise timing, clinical records requiring identity/units review. Do not reuse the generic subtype without adding these constraints.

## 4. Flow and state contract

| State / event | User sees | Allowed actions | Data/work owner | Transition evidence | Failure / recovery |
| --- | --- | --- | --- | --- | --- |
| Ready | Current inputs and scope | Submit/edit | Defined client/service | Preconditions checked | Explain unmet prerequisites |
| Submission pending | Sending, not completed | Cancel if possible | Defined request owner | Service acknowledgement | Preserve inputs; explain retry safety |
| Accepted | Actual service state/job ID | View/stop if supported | Durable service | Status from service | Freshness/error indication |
| Terminal outcome | Actual success/failure/cancellation | Open/retry/recover | Defined result store | Verified terminal response/result | Explain partial work and next action |

Adapt states to the real service. Do not invent unsupported cancellation, progress or save guarantees.

## 5. Library decision record

Record requirements; existing stack; evaluated options; source/version/access date; supported targets; licence; component coverage; accessibility tests; theming/scaling; integration/build; measured performance; migration effort; chosen option; rejected alternative; owner/update policy; rollback; unknowns.

## 6. Interaction-to-implementation table

| Screen / control | Entry / input | Action | Proposed or existing handler | Authority / scope | Pending / failure | Success evidence | Return / persistence |
| --- | --- | --- | --- | --- | --- | --- | --- |

Every visible production action needs an actual mapping. Prototype-only controls must be labelled simulated. A control absent from implementation cannot be marked done because the mock has it.

## 7. QA record

| ID | Requirement | Configuration / data | Procedure | Expected | Observed | Result | Evidence | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Allowed results: Pass, Fail, Not run, Not applicable with rationale. Record visual review, test adequacy, runtime/integration and accessibility separately. Include errors verbatim when relevant; redact secrets and private content.

## 8. Source and freshness log

| Source | Access date | Version / status checked | Supports | Limitations | Refresh trigger |
| --- | --- | --- | --- | --- | --- |

Distinguish reference URL retrieval from reading a detailed specification, and documentation from a tested package. A published release date is not a compatibility result.

## 9. Platform exception

Record: shared rule; platform-specific difference; reason; affected users; accessible alternative; acceptance check; evidence; owner/review date. Examples: native menu/shortcut behaviour, system font and hit-target units, tablet pane arrangement.

## 10. Handoff checklist

- Brief and platform/subtype selection approved.
- Flows include failure, cancellation and return visits.
- Tokens/components/states defined with platform mappings.
- Every control mapped; unavailable features explained.
- Persistence, cost, permissions and sensitive data specified.
- Scaling/input/accessibility matrix completed to agreed scope.
- QA distinguishes passed, failed and untested.
- Source/export inventories complete; open issues preserved.
- Existing/proposed/simulated states clearly separated.
- Implementation and release gates have owners.
