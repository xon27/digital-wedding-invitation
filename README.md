# Wedding Invitation (React)

React wedding invitation with RSVP and guest list. Same stack as the birthday app: Vite, React Router (hash), PHP + JSON on Hostinger.

**Open in another Cursor window:** **File → Open Folder…** (or **File → Open…** on Mac), then choose the `wd-invi` folder. You can have `bd-invi` in one window and `wd-invi` in another.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

For a **laptop and mobile mockup** preview, open http://localhost:5173/mockup.html (or `/mockup.html` after build).

## Build for production

```bash
npm run build
```

Upload the full `dist/` to your Hostinger document root (PHP required for `api/joiners.php`).

## Routes

- `yoursite.com/#/` – Wedding invitation
- `yoursite.com/#/joiners` – Guest list (search, remove)
- `yoursite.com/#/wedding/listid?key=eventhandler` – Event handler list (auth required)

## Data

Guest list uses the **static data folder** (like the birthday invitation): name and lastname only.

- **Read**: `public/data/joiners.json` is served at `/data/joiners.json`. The app loads this list and merges with any new guests stored in the browser (localStorage).
- **Add** (RSVP or “Generate test guests”): New guests are appended in localStorage so they appear in the list immediately.
- **Remove**: Removed guests are hidden (or removed from localStorage if they were added in this browser). The static file is not modified from the app.

To set an initial guest list, edit `public/data/joiners.json` (array of `{ "name": "...", "lastname": "..." }`). Optional: use `api/joiners.php` on Hostinger to persist RSVPs to `data/joiners.json`; set `VITE_JOINERS_API_URL=/api/joiners.php` in `.env` if you use that backend.
