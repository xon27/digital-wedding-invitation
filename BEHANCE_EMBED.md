# Displaying this project on Behance

## 1. Deploy the site

Behance needs a **live URL**. Deploy your `dist` folder to one of these (free):

- **GitHub Pages** – push the repo, enable Pages, set source to branch `gh-pages` or `main` and folder `/dist` (or use a GitHub Action to build and deploy).
- **Netlify** – drag the `dist` folder to [app.netlify.com/drop](https://app.netlify.com/drop), or connect the repo and set build command `npm run build`, publish directory `dist`.
- **Vercel** – connect the repo; use build command `npm run build` and output directory `dist`.

Your live URL might look like:
- `https://yourusername.github.io/wd-invi/`
- `https://your-project.netlify.app/`
- `https://your-project.vercel.app/`

## 2. Update meta tags (optional but recommended)

In `index.html`, replace the placeholders with your real URL:

- `og:url` → your full live URL (e.g. `https://your-project.netlify.app/`)
- `og:image` → full URL to a preview image (e.g. `https://your-project.netlify.app/og-image.png`)

Add a 1200×630px image as `public/og-image.png` (or the path you use) so Behance and social sites show a nice preview. Rebuild after adding it: `npm run build`.

## 3. Add the project on Behance

1. Go to [behance.net](https://www.behance.net) and create a **New project**.
2. Add a **cover image** and a short **project description** (e.g. “Interactive wedding invitation — React, RSVP, gallery, map”).
3. Add an **Embed** or **Link** block:
   - Click **Add content** → **Embed** (or **Link**).
   - Paste your **live site URL** (the one from step 1).
4. Behance will show a preview; save and publish the project.

## 4. Embed URL to use

Use your **live site URL** as the link, for example:

```
https://your-project.netlify.app/
```

or, if you use hash routing and want to open the invitation directly:

```
https://your-project.netlify.app/#/
```

Use this exact URL in Behance’s Embed/Link block. No special “embed code” is required—Behance will fetch the page and show a clickable preview. If you want the project to open in a new tab when someone clicks, use a **Link** block with this URL.

## 5. Optional: iframe embed elsewhere

If you need an iframe to embed this invitation on another website (not Behance), use:

```html
<iframe
  src="https://YOUR-LIVE-URL.com/#/"
  title="Wedding Invitation"
  width="100%"
  height="800"
  style="border: none; max-width: 420px; margin: 0 auto; display: block;"
></iframe>
```

Replace `YOUR-LIVE-URL.com` with your real URL. Adjust `height` and `max-width` as needed.
