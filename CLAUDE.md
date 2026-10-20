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

The day number (Day 001 = 2026-10-20, `START` in `src/lib/site.ts`) is computed from `date`. Never hard-code it.

## Voice and design rules

- Write as Harish, in plain first person. No hype, no "AI era" buzzwords, no emoji. Short sentences.
- Don't invent facts about Harish (employer, location, history). Ask.
- Only the masthead is in Kannada (ಹರೀಶ್). Everything else is English.
- Design is deliberately quiet: one reading column with a left rail for metadata, Newsreader + Geist Mono, one green accent. No cards, gradients, hero sections or scroll animations.
- Keep pages free of client-side JS beyond the small day-counter script in `Base.astro`.
