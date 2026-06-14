# HomeStart Agent Steering

## Operating Rule

Use subagents for non-trivial product/UI work. The main agent owns orchestration, integration, testing, and final judgment. Subagents should do scoped investigation or implementation slices so the main agent is never blocked waiting on only one thread of work.

## Default Workflow

1. Clarify the active user goal and translate it into a spec.
2. Inspect the repo structure and current app state.
3. Create a plan with parallelizable workstreams.
4. Spawn subagents with narrow, non-overlapping scopes.
5. Continue useful main-thread work while subagents run.
6. Review every subagent output before integrating.
7. Patch only after confirming how the change maps to the user story.
8. Run syntax checks, diff checks, and breakpoint visual QA.
9. Write/update documentation for future agents.
10. Summarize exactly what changed, what was tested, and where to inspect it.

## Recommended Subagent Roles

### UX Auditor

- Inspect each breakpoint for user-story fit, visual hierarchy, copy density, and interaction clarity.
- Call out where a component technically exists but does not make sense for the user.
- Produce screenshot-specific findings, not vague preferences.

### Code Architecture Auditor

- Map state flow, render flow, event handlers, and persistence.
- Identify brittle DOM coupling, duplicated logic, hidden assumptions, and risky CSS cascade areas.
- Avoid broad rewrites unless the user explicitly asks for them.

### Visual QA Agent

- Walk all high-value states at desktop, tablet, and mobile.
- Check selected states, empty states, saved states, reset, drawer/dock behavior, overflow, and sticky controls.
- Report exact component/state/breakpoint failures.

### Documentation Agent

- Update `documentation.md` and relevant rationale docs after system-level changes.
- Record decisions, not just implementation details.
- Keep future-agent instructions executable and specific.

## Subagent Prompt Template

Use prompts like this:

```text
You are the [role] for the HomeStart cooking app. Scope: [specific files/screens/breakpoints]. Do not edit outside [scope] unless required. Report findings with exact component names, user-story impact, and suggested fix priority. If editing, keep changes minimal and explain every changed file.
```

## Coordination Rules

- Do not give two agents ownership of the same file unless one is read-only.
- If multiple agents touch CSS, assign breakpoint ownership: desktop, tablet, or mobile.
- If one agent owns JS state/rendering, another can audit visuals but should not edit the same functions.
- The main agent must inspect all edits, run checks, and make final integration decisions.
- If a subagent fails or times out, continue with another workstream and record the gap.

## Testing Rules

- Do not use Playwright for this prototype unless the user explicitly allows it.
- Prefer the internal browser or a no-Playwright Chrome/CDP harness for visual confirmation.
- Always test three unique layouts when responsive behavior changes:
  - Desktop: `1440x1024`
  - Tablet: `1024x768`
  - Mobile: `390x844`
- Capture and inspect screenshots, not only DOM assertions.
- Include reset testing so onboarding can be replayed.

## Product Principles To Preserve

- Low-commitment onboarding beats exhaustive profiling.
- Group related low-stakes questions instead of forcing one question per screen.
- Use one clear progress pattern at a time.
- Keep selected states consistent.
- Keep dashboard helper copy light; let filters, cards, and saved state do the explaining.
- Simple presets come before advanced filters.
- Advanced filters should release users from onboarding lock-in.
- Mobile uses hamburger plus dashboard/saved tabs after onboarding.
- Desktop can use a persistent left nav and saved dock.
- Tablet should use a compact navigation pattern without losing labels or reset access.

## Documentation Rules

- Update `documentation.md` when changing:
  - onboarding structure,
  - dashboard filter model,
  - saved recipe behavior,
  - reset behavior,
  - breakpoint ownership,
  - E2E/QA process,
  - component contracts.
- Update `docs/onboarding-rationale.md` when changing product reasoning, UX principles, or intended outcomes.
- Do not update rationale docs for tiny cosmetic fixes unless they change the design system or user story.

## Final Handoff Rules

- Report modified files.
- Report validation commands and outcomes.
- Mention screenshot/report paths for visual QA.
- Call out any known risks separately from completed work.
- Do not claim deployment unless deployment was actually run and verified.
