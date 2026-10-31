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

The site is intended for GitHub Pages. Push the repository to GitHub, then
enable Pages from **Settings → Pages → GitHub Actions**. The included workflow
publishes the root static files on every push to `main`.
