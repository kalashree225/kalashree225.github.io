# Skill Atlas

An editorial, local-first gallery for the agentic skills available in the
GitHub Copilot workspace. The live site is designed to explain what each skill
does, when to use it, and how to write a useful first prompt.

## Run locally

This is a dependency-free static site. From the project folder:

```powershell
python -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Install a skill and invoke it

Run the included PowerShell bridge script from this folder:

```powershell
.\install-skill.ps1 -SkillName frontend-design
```

Then restart Copilot and start a new chat. To invoke a skill explicitly, type
its slash command in the composer, such as `/frontend-design` or
`/webapp-testing`. The gallery's **Install bridge** and **Use /skill-name**
buttons copy these commands for you.

## Generated catalogue and local bridge

The static page reads `data/catalogue.json`, generated from real `SKILL.md`
files under the configured roots. The catalogue is never hand-edited; curated
metadata belongs in `data/overrides.json`.

```powershell
npm run sync
npm run doctor
npm run stack:plan -- frontend-strong
```

An optional read-only localhost bridge exposes health, catalogue, source, and
dry-run install-plan endpoints. It binds to `127.0.0.1` and requires the
printed token for rescan requests:

```powershell
npm run bridge
Invoke-RestMethod http://127.0.0.1:4174/health
Invoke-RestMethod -Method Post http://127.0.0.1:4174/install `
  -ContentType 'application/json' `
  -Body '{"stackId":"frontend-light","agent":"claude-code","mode":"dry-run"}'
```

The bridge never executes files from a skill folder and never applies an
install directly; use the existing `install-skill.ps1` bridge after reviewing
the dry-run plan.

## Publish

The gallery is published at
[`https://kalashree225.github.io/`](https://kalashree225.github.io/) from the
[`kalashree225.github.io`](https://github.com/kalashree225/kalashree225.github.io)
repository. The included workflow is also available for project-site
deployments when GitHub Actions Pages is enabled.
