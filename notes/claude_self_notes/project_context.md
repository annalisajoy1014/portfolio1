# Project Context for Continuing Claude Instances

## Who this is for
Another Claude instance picking up this portfolio project mid-stream. Read this before touching anything.

---

## The Project

**What it is:** Annalisa Ard's personal narrative designer portfolio website.
**Stack:** Astro 5 + React + Framer Motion, static output, TypeScript.
**Local path:** `/home/annalisa/portfolio/`
**GitHub repo:** https://github.com/annalisajoy1014/portfolio1
**Live URL:** https://portfolio-rho-jade-5v6wxyi0t5.vercel.app (Vercel production alias — this stays stable)
**Vercel project name:** `portfolio` under org `annalisajoy1014s-projects`

---

## Environment Quirks

**Node is installed via nvm, not on the default PATH.** Any shell session started by Claude Code won't have `npm`, `node`, or `vercel` available until you source nvm. Always prefix commands like this:

```bash
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && <your command>
```

Or for a one-liner test:
```bash
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && vercel --version
```

**WSL2 on Windows.** The user is on Windows with WSL2 (Ubuntu). Zone.Identifier files exist everywhere — they're already in `.gitignore` as `*:Zone.Identifier`. Don't commit them.

**VS Code:** Installed on Windows, accessible in WSL via `code` after sourcing nvm. The VS Code bin path is in `~/.bashrc`.

**Git identity** is set globally:
- `user.email = annalisa.joy1014@gmail.com`
- `user.name = annalisajoy1014`

---

## How to Build

```bash
# Dev server (live preview at localhost:4321)
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && npm run dev

# Production build (output to dist/)
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && npm run build
```

---

## How to Deploy

We use the Vercel CLI directly (not GitHub Actions — the GitHub repo link to Vercel failed during setup, so deploys are manual via CLI).

```bash
# Deploy to production
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && vercel --prod
```

The `.vercel/` directory is present and linked — don't delete it. It's in `.gitignore`.

Vercel is authenticated. Don't run `vercel login` unless something breaks.

**Typical deploy output to watch for:**
- `Aliased: https://portfolio-rho-jade-5v6wxyi0t5.vercel.app` = success, live on the stable URL
- `readyState: "READY"` = good
- Any `ERROR` state = check build logs with `vercel logs <deployment-url>`

---

## Commit & Push Workflow

Standard git flow. The repo has no pre-commit hooks so commits go through cleanly.

```bash
git add <specific files>   # never git add -A blindly — .claude/ should stay untracked
git commit -m "message"
git push
# then deploy with vercel --prod
```

**Do not commit:**
- `.claude/` — Claude's own memory/config, stays local
- `node_modules/`
- `dist/`
- `.astro/`
- `.vercel/`
- `*:Zone.Identifier` files

---

## Project Structure

```
portfolio/
├── src/
│   ├── pages/           # One .astro file per route
│   │   ├── index.astro                        # Homepage
│   │   ├── about.astro                        # About + resume + tools
│   │   ├── examples.astro                     # Featured case studies (Androlynne, Umbral Plume, Lilithyne)
│   │   ├── atlas-of-worlds.astro              # World/location gallery
│   │   ├── web-of-choices.astro               # Branching flowchart gallery
│   │   ├── narrative-systems--implementation.astro  # Process + systems page
│   │   ├── writing-samples.astro              # Androlynne process docs + story buttons
│   │   └── stories/
│   │       ├── index.astro                    # Story listing
│   │       └── [slug].astro                   # Dynamic story page
│   ├── content/
│   │   └── stories/
│   │       ├── sail-to-xhorhas-part-1.md
│   │       └── sail-to-xhorhas-part-2.md
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── ProjectGrid.jsx
│   │   └── StoryEmbed.jsx
│   ├── layouts/
│   │   └── Layout.astro    # Global layout — contains the site footer
│   └── styles/
│       └── global.css
├── public/
│   ├── images/             # All site images
│   ├── files/              # PDFs (resume, Androlynne write-up)
│   └── stories/            # Twine HTML files (sail-to-xhorhas-part-1.html, part-2.html)
└── notes/
    ├── claude_self_notes/  # You are here
    └── Copied_OuterHTML/   # Reference HTML from early design work
```

---

## Key Design Decisions Made

- **Footer** lives in `src/layouts/Layout.astro` — it appears on every page. Contains "Connect with me" + email only (phone, location, and name were removed by user request).
- **Contact section on homepage** (`index.astro`) is email-only — the form and phone were removed. The email is a `mailto:` link.
- **Twine stories** are served as raw HTML from `public/stories/`. They embed via `StoryEmbed.jsx` on story pages, and link directly with `?fullscreen=1` from the writing samples and homepage.
- **The `.vercel/project.json`** links to Vercel project ID `prj_xkI6RqyVnCrvfVmW9dimn6ROYXhp`, org `team_epzMfdRVJI0szrsudcDmET7o`.

---

## What's Been Done (as of 2026-05-15)

- Full site built and live on Vercel
- GitHub repo created and connected
- Sail to Xhorhas Part 1 & 2 added as playable Twine stories
- Homepage: positioning statement + "Play My Work" section added
- About page: "Tools I Work In" section (Twine, Ink/Inkle, Figma)
- Writing Samples: process context paragraphs + captions added
- Web of Choices: explanatory paragraph added describing the flowcharts
- Narrative Systems: column label corrected ("Tools & Pipelines" → "Narrative Trigger")
- Contact: form removed, phone removed, location removed — email only everywhere
- `.gitignore` updated for Zone.Identifier and install-gh.sh

---

## What's Still To Do (priority order)

1. **Custom domain** — `portfolio-rho-jade-5v6wxyi0t5.vercel.app` is not professional. User needs to buy a domain (e.g. annalisaard.com, ~$12/yr) and connect it via Vercel dashboard → Project Settings → Domains.
2. **External quote** — One testimonial from a player, collaborator, or playtest participant. User needs to provide the text and who said it.
3. **Metrics on Featured Examples** — Add scope numbers (branch count, word count, NPC states) to the Androlynne, Umbral Plume, and Lilithyne case studies in `examples.astro`.
4. **LinkedIn or social link** — Currently no social links visible anywhere on the site.

---

## User Preferences Noted

- Annalisa is not highly technical — explain things plainly.
- She approves deploys readily; just confirm before pushing to production.
- She does not want her phone number or location anywhere on the site.
- The only contact method she wants visible is her email: `annalisa.j.ard@gmail.com`
- She uses VS Code, WSL2, and works from `/home/annalisa/portfolio/`.
