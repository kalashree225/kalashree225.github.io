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

## Publish

The gallery is published at
[`https://kalashree225.github.io/`](https://kalashree225.github.io/) from the
[`kalashree225.github.io`](https://github.com/kalashree225/kalashree225.github.io)
repository. The included workflow is also available for project-site
deployments when GitHub Actions Pages is enabled.
