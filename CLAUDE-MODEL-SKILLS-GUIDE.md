# Claude Model and Agentic Skills in GitHub Copilot

This guide documents the setup completed on this Windows PC for using the
installed agentic skills from GitHub Copilot and selecting a Claude model when
the account exposes one.

## What was configured

The skills were installed in two locations:

- `C:\Users\FMVPP\.agents\skills` — the global skills directory used by the
  Claude-style tooling.
- `C:\Users\FMVPP\.copilot\skills` — the directory scanned by the Copilot app.

Copilot could previously see only a small subset of the installed skills. The
missing skill folders are now exposed in `C:\Users\FMVPP\.copilot\skills` as
Windows directory junctions pointing to their original folders. This keeps one
source of truth: editing or updating a skill in `.agents\skills` updates what
Copilot sees as well.

The previously disabled `brand-guidelines` skill was also enabled in:

`C:\Users\FMVPP\.copilot\settings.json`

A backup was created before that settings change:

`C:\Users\FMVPP\.copilot\settings.json.backup-20261031`

## Skills now available

The Copilot-visible skill set includes:

- `academy-guide`
- `algorithmic-art`
- `brand-guidelines`
- `canvas-design`
- `claude-api`
- `cline-sdk`
- `discernment-nudge`
- `doc-coauthoring`
- `docx`
- `find-skills`
- `frontend-design`
- `grilling`
- `internal-comms`
- `mcp-builder`
- `pdf`
- `pptx`
- `skill-creator`
- `slack-gif-creator`
- `template-skill`
- `theme-factory`
- `visual-design-studio`
- `web-artifacts-builder`
- `web-design-guidelines`
- `webapp-testing`
- `xlsx`

Some skills are supplied by installed Copilot plugins instead of the global
directory. Those remain managed by the app under:

`C:\Users\FMVPP\.copilot\installed-plugins`

## Restart or reload after the setup

The Copilot app may cache skill discovery. After changing skills:

1. Finish or stop any active chat.
2. Close and reopen GitHub Copilot.
3. Start a new chat.
4. Test with a task that clearly matches a skill.

Examples:

```text
Create an original generative particle artwork in p5.js.
```

```text
Review this UI for accessibility and Web Interface Guidelines compliance.
```

```text
Create a polished PDF report from these notes.
```

```text
Help me build an MCP server for this API.
```

The app should automatically invoke a matching skill when the skill
description applies. If a skill is intentionally marked as manual-only, invoke
it explicitly using the app's skill command or the skill name shown by the
app.

## Selecting a Claude model

Skills are model-independent instructions. The model is selected separately in
the Copilot composer, so installing a skill does not automatically change the
model.

To select Claude in the Copilot app:

1. Open a new chat.
2. In the composer footer, open **Model and reasoning**. In the current app it
   is shown as **Copilot Fusion · Standard**.
3. Turn off **Copilot Fusion** if the menu is using a routing tier instead of a
   fixed model.
4. Choose the available model whose name begins with **Claude** (for example,
   Claude Sonnet or Claude Opus, if offered by the account).
5. Confirm that the composer footer shows the selected Claude model before
   sending the task.

The model menu is account- and plan-dependent. Do not select `Auto` or a GPT
model if the requirement is specifically to use Claude.

### If Claude is not shown

The local Copilot configuration currently has one connected provider:
**GitHub Copilot**. The app also has a **Model providers** settings page where
additional providers can be configured.

If no Claude model is listed:

1. Open **Settings**.
2. Open **Model providers**.
3. Use **Add provider**.
4. Configure Anthropic only if you have an authorized Anthropic API key and
   your organization permits using it.
5. Reopen the chat and select the Claude model from the composer.

Never paste an API key into chat, a skill file, source code, or this guide.
Use the provider's secure credential field only. If your organization manages
providers centrally, ask the administrator to enable an Anthropic/Claude model
instead of adding a personal key.

## How to use skills effectively

### Install or bridge one skill

From the Skill Atlas repository folder, run:

```powershell
.\install-skill.ps1 -SkillName frontend-design
```

Replace `frontend-design` with the skill folder name. The script validates that
the source contains `SKILL.md`, creates a Windows directory junction under
`C:\Users\<you>\.copilot\skills`, and refuses to overwrite a real directory.
After installing, restart Copilot and start a new chat.

### Slash commands

Use a skill explicitly in the Copilot composer by typing its slash command:

```text
/frontend-design
/web-design-guidelines
/mcp-builder
```

The command is the skill folder name prefixed with `/`. If a skill is not
manual-only, Copilot may also discover it automatically from the task.

### 1. State the outcome

Give the app the result you want, not only the tool or skill name:

```text
Build a responsive dashboard from this existing React project. Keep the
existing routing and add keyboard-accessible loading and error states.
```

### 2. Include scope and constraints

Mention the files, framework, output format, quality bar, and anything that
must not change:

```text
Use the frontend-design skill. Update only src/components and src/styles.
Do not change the API contract. Run the existing tests after the change.
```

### 3. Ask for the skill explicitly when discovery is uncertain

```text
Use the web-design-guidelines skill to audit this page for accessibility,
navigation, focus behavior, and responsive layout issues.
```

```text
Use the pdf skill to extract the tables from the attached PDF and preserve
the original column order.
```

### 4. Separate planning from execution when the change is large

For a multi-file refactor:

```text
First map the relevant files and propose a safe implementation plan. Do not
edit files until the plan is complete.
```

Then follow with:

```text
Implement the approved plan, run the smallest relevant test command, and
report any remaining failures precisely.
```

### 5. Ask for verification

Use explicit validation requirements:

```text
Implement the change, run the targeted tests and type-check, and verify that
the original failing case now passes.
```

## Useful skill examples

| Skill | Example request |
|---|---|
| `algorithmic-art` | “Create original seeded flow-field art in p5.js with interactive controls.” |
| `canvas-design` | “Design an original poster and export it as a PNG and PDF.” |
| `claude-api` | “Show how to stream Claude responses from this TypeScript service.” |
| `docx` | “Create a professionally formatted Word report with headings and a table of contents.” |
| `frontend-design` | “Redesign this landing page with a distinctive visual direction and polished responsive behavior.” |
| `mcp-builder` | “Build an MCP server exposing these read-only API operations with clear tool schemas.” |
| `pdf` | “Extract and normalize the tables from these PDFs into a clean dataset.” |
| `pptx` | “Create a presentation from this outline with speaker notes and consistent layouts.” |
| `skill-creator` | “Create a reusable skill for this repeated repository workflow.” |
| `visual-design-studio` | “Give this dashboard a premium visual system, intentional motion, and accessible states.” |
| `web-app-testing` | “Use Playwright to test the login flow and capture the failing console error.” |
| `xlsx` | “Clean this spreadsheet, preserve formulas, and add a summary chart.” |

## Troubleshooting

### A skill still does not activate

Check that:

1. The skill folder contains `SKILL.md`.
2. The skill name is not listed in `disabledSkills` in
   `C:\Users\FMVPP\.copilot\settings.json`.
3. GitHub Copilot was restarted after the skill was added.
4. The request actually matches the skill description.
5. The skill is not manual-only (`disable-model-invocation: true`).

### The app shows an old skill version

The Copilot skill directory uses junctions for the global skills. Update the
source folder under `C:\Users\FMVPP\.agents\skills`, restart Copilot, and start
a new chat. Do not replace the junction with a second copied version unless
you intentionally want the two locations to diverge.

### You need to undo this integration

The junctions can be removed individually from:

`C:\Users\FMVPP\.copilot\skills`

Removing a junction does not delete the original skill under
`C:\Users\FMVPP\.agents\skills`. To restore the previous disabled-skill setting,
restore the backed-up settings file after closing Copilot:

`C:\Users\FMVPP\.copilot\settings.json.backup-20261031`

Do not delete the original `.agents\skills` directory as part of rollback.

## Security notes

- Treat downloaded skills as executable instructions and review their
  provenance before installing them.
- Do not place secrets in `SKILL.md`, prompts, logs, or Markdown guides.
- Keep provider API keys in the Copilot provider settings or a supported secure
  secret store.
- Use read-only tools for investigation unless a task explicitly requires
  changes.
- Confirm the selected model before sending sensitive or production-related
  work.

## Quick checklist

- [x] Global skills exposed to Copilot through junctions.
- [x] `brand-guidelines` enabled.
- [x] Original skill files left unchanged.
- [x] Settings backup created.
- [ ] Restart Copilot.
- [ ] Start a new chat.
- [ ] Select a Claude model in the composer.
- [ ] Run one small skill-matching test.
