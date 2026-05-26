# worada.dev — Portfolio

Personal portfolio for Worada Rangsriseaneepitak (Ada).
Built with Jekyll, deployed on GitHub Pages.

---

## Local development

```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve --livereload

# Visit http://localhost:4000
```

---

## File structure

```
.
├── _config.yml               # Site config, author details
├── _layouts/
│   ├── default.html          # HTML shell, nav, footer
│   └── case-study.html       # Case study template
├── _projects/                # One .md file per project
│   ├── bird-sound-detection.md
│   ├── fraud-detection.md
│   ├── bus-accessibility.md
│   └── meeker.md
├── assets/
│   ├── css/main.css          # Full design system
│   ├── js/main.js            # Filter, fade-in, load more
│   ├── images/
│   │   └── thumbs/           # Project thumbnails (160x100px)
│   ├── diagrams/             # Architecture SVGs
│   └── resume.pdf            # CV
├── index.html                # Home page
├── work/index.html           # Work index with filter
└── about/index.html          # About page
```

---

## Adding a new project

1. Create `_projects/your-project-name.md`
2. Copy front matter from an existing project
3. Set `featured: true` and `order: N` to add to home page (max 4)
4. Add thumbnail to `assets/images/thumbs/your-project-name.png`
5. Fill in content sections

### Front matter reference

```yaml
---
layout: case-study
title: Project Title
slug: project-slug               # URL: /work/project-slug/
summary: One line description.
tldr: 2-3 sentence summary.
year: 2025
order: 5                         # Sort order on /work
featured: false                  # true = appears on home page
tags: [Data, ML]                 # data | ml | cloud | full-stack | business-intel
stack: [Python, PostgreSQL]
role: Solo
timeline: 6 weeks
context: Monash MDS
github: https://github.com/...
thumbnail: /assets/images/thumbs/project-slug.png
hero_image: /assets/images/project-slug-hero.png    # optional
hero_caption: "FIG 01 · ..."                        # optional
description: SEO description.
---
```

---

## Thumbnail spec

- Size: 800 × 500 px (16:10)
- Format: PNG or WebP preferred
- Background: transparent or `#F1EFE8`
- Save to: `assets/images/thumbs/`

---

## Deployment

Push to `main` branch. GitHub Pages builds automatically.
No Actions workflow needed — Jekyll is supported natively.

```bash
git add .
git commit -m "add project: bird-sound-detection"
git push origin main
```
