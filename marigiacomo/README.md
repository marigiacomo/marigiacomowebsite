# marigiacomo.com

Your personal site. Built with [Astro](https://astro.build). No database, no admin panel —
posts are plain text files.

---

## Part 1 — Get it online (about 30 minutes, once)

### 1. Put the code on GitHub

1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Click **New repository**. Name it `marigiacomo`. Keep it **Public** (Cloudflare's free
   tier works with private repos too, but public is simpler). Don't tick any of the
   "initialize with" boxes.
3. On the next screen, click **uploading an existing file**.
4. Drag in everything from this folder **except** the `node_modules` and `dist` folders.
   If they're not there, good — they're generated, not source.
5. Scroll down, click **Commit changes**.

### 2. Connect Cloudflare Pages

1. Create a free account at [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorise GitHub, pick the `marigiacomo` repository.
4. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click **Save and Deploy**. Two minutes later you'll have a live URL ending in
   `.pages.dev`. Check it works.

### 3. Point marigiacomo.com at it

1. In Cloudflare Pages, open your project → **Custom domains** → **Set up a domain** →
   enter `marigiacomo.com`.
2. Cloudflare will tell you to change your nameservers. Log in to **Namecheap** →
   Domain List → Manage → **Nameservers** → choose **Custom DNS** → paste the two
   Cloudflare nameservers.
3. Wait. Usually under an hour, occasionally up to 24. HTTPS is automatic.

> Note: moving nameservers to Cloudflare moves *all* DNS for the domain, including your
> email records. Before you switch, copy your existing MX and TXT records from Namecheap
> and re-create them in Cloudflare, or `inbox@marigiacomo.com` will stop receiving mail.
> This is the one step worth doing carefully.

---

## Part 2 — Writing a post

1. On GitHub, open `src/content/writing/`.
2. Click **Add file** → **Create new file**.
3. Name it something like `chip-war.md` — lowercase, hyphens, no spaces. This becomes the URL.
4. Paste this at the top, then write below it:

```markdown
---
title: "Your title here"
date: 2026-08-15
kind: essay
summary: "One sentence that appears in the list."
draft: false
---

Your first paragraph.

## A heading

More writing. Leave a blank line between paragraphs.
```

5. Click **Commit changes**. Cloudflare rebuilds automatically — live in about a minute.

**`kind`** must be one of `essay`, `books`, or `notes`. It shows as a small label in the list.

**`draft: true`** hides a post from the site. Two skeleton posts are already in there set to
`draft: true` — they're prompts for you, not published content.

### Markdown, the whole thing

```markdown
## Heading            *italic*        **bold**
[link text](https://example.com)
- bullet point
> quoted line
```

That's genuinely most of it.

---

## Part 3 — Two things to set up

### Contact form

1. Go to [web3forms.com](https://web3forms.com), enter `inbox@marigiacomo.com`, get a free
   access key by email.
2. Open `src/site.ts` on GitHub, click the pencil icon.
3. Replace `PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your key. Commit.

### Newsletter

1. Sign up at [mailerlite.com](https://mailerlite.com) (free to 1,000 subscribers).
2. Create an embedded form, copy its form action URL.
3. Open `src/pages/writing/index.astro`, replace `MAILERLITE_FORM_ACTION_URL`. Commit.

If you'd rather not run a newsletter yet, delete the whole `<form>` block on that page —
the RSS link below it still works.

---

## Part 4 — Photos and CV

### Slideshows

The projects page has five slideshows: one per store, plus one for the journey. They live at
the top of `src/pages/projects.astro` as simple lists. To add a photo, add a line:

```js
{ src: '/images/mantova-5.webp', alt: 'What is in the photo', caption: 'The line under it.' },
```

`alt` describes the image for screen readers and for anyone whose connection drops it —
say what is actually in the picture. `caption` is the visible text.

To remove a photo, delete its line. To reorder, move lines around. The counter and arrows
adjust themselves.

Drop new image files into `public/images/`. Resize to about 1400px on the long edge first —
phone photos are 5MB each and will make the page crawl.

### Journey photos awaiting permission

Every photo you sent is in `public/images/`, but only the ones without recognisable faces are
switched on. The rest are listed as commented-out lines in `projects.astro` — the ones starting
with `//`. Once the people in them have said yes, delete the `//` from that line and write a
real `alt` and `caption`.

### CV PDF

Put your PDF in `public/` named `giacomo-mari-cv.pdf`. The CV page links to it.
**Remove your phone number and date of birth from the public version** — the site gets
scraped, and the contact form is the better route in.

---

## Running it on your own computer (optional)

You don't need this. Everything above works through the GitHub website. But if you want a
live preview while writing:

```bash
npm install
npm run dev
```

Then open `http://localhost:4321`.

---

## Where everything lives

```
src/site.ts                  name, email, links, form keys
src/styles/global.css        all styling — colours at the very top
src/layouts/Base.astro       header, footer, nav
src/pages/index.astro        homepage text
src/pages/cv.astro           CV content
src/pages/projects.astro     projects content
src/pages/contact.astro      contact form
src/content/writing/         your posts, one file each
public/                      images, PDF, favicon
```
