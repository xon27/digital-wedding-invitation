# Hostinger deployment – RSVP saving to data folder

## Why the form didn’t update the data folder

The app is a **static site**. The RSVP form only saved to the **visitor’s browser** (localStorage). Browsers cannot write to files on your server, so `public/data/joiners.json` on Hostinger was never updated.

## What was added

1. **`public/save-rsvp.php`** – A small PHP script that receives RSVP submissions and appends them to `data/joiners.json`.
2. **App change** – When a guest submits the RSVP form, the app now:
   - Saves to localStorage (so the guest sees success), and
   - Sends the same data to `save-rsvp.php` so it’s written on the server.

## What you need to do on Hostinger

1. **Upload everything from `dist/`** (after `npm run build`) to your Hostinger `public_html` (or the folder your domain points to).  
   That includes:
   - `index.html`
   - `save-rsvp.php` (must be in the **same folder** as `index.html`)
   - `data/` folder (with `joiners.json` inside)
   - `assets/` folder

2. **Make `data/` writable**  
   So PHP can write to `data/joiners.json`:
   - In Hostinger File Manager (or FTP), right‑click the `data` folder → Permissions.
   - Set to **755** (or **775** if 755 doesn’t work).  
   If `joiners.json` already exists, set its permissions to **644** (or **664**).

3. **Rebuild and re-upload after code changes**  
   Run `npm run build` and upload the new `dist/` contents so `save-rsvp.php` and the latest app are on the server.

## Checking that it works

1. Open your live invitation URL and submit the RSVP form with a test name.
2. In Hostinger File Manager, open `data/joiners.json`. You should see the new entry.
3. The Joiners page (`/#/joiners`) will show guests from both the JSON file and localStorage.

## If RSVPs still don’t appear in `data/joiners.json`

- Confirm **PHP** is enabled for your hosting (Hostinger usually has it on).
- Confirm **`save-rsvp.php`** is in the same directory as `index.html` (e.g. both in `public_html`).
- Confirm **`data`** (and `data/joiners.json`) exists and has writable permissions (755 for folder, 644 for file).
- Check Hostinger error logs for PHP errors (e.g. permission denied writing to `joiners.json`).
