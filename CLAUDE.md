# hkulur.com

Harish Kulur's personal site: a running log of what he ships, plus writing on anything (code, building, health, nutrition, history, investing, sports, cinema, trips). Astro static site, deployed to Cloudflare Workers static assets.

## Commands

Use Node 24 (`nvm use`; Astro needs >= 22.22).

- `npm run dev`: local dev server
- `npm run build`: build to `dist/`
- `npm run deploy`: build and deploy with Wrangler

## Adding an entry

One Markdown file per entry in `src/content/log/`. The filename is the URL slug (`/log/<slug>/`).

```md
---
title: Short, plain title
date: 2026-10-20
kind: writing        # writing | project | travel | note
label: Essay         # optional; shown instead of the kind, e.g. Essay, Builder, Tech
summary: One sentence. Shown in the log and as the post's subtitle.
draft: false         # optional
---
```

The nav is index, writing, projects, about. The writing page shows `writing`, `note` and `travel` entries; the projects page shows `project` entries (`SECTIONS` in `src/lib/site.ts`).

Entries are numbered No. 001, No. 002, … in date order across the whole log (`getEntries` in `src/lib/site.ts`). The number is computed, so never hard-code it. Backdating an entry renumbers the ones after it. The site promises regular shipping, not daily, so don't write "every day" or "daily".

## Voice and design rules

- Write as Harish, in plain first person. No hype, no "AI era" buzzwords, no emoji. Short sentences.
- Don't invent facts about Harish (employer, location, history). Ask.
- Only the masthead is in Kannada (ಹರೀಶ್). Everything else is English.
- Design is deliberately quiet: one reading column with a left rail for metadata, Newsreader + Geist Mono, one green accent. No cards, gradients, hero sections or scroll animations.
- Keep pages free of client-side JS.
