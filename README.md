# Digital wedding invitation

## GitHub Pages (why the site looked blank)

The repository root `index.html` is for **local dev** (it loads `/src/main.jsx`). GitHub Pages must serve the **built** app from `dist/`, not the repo root.

This repo uses Actions to build with Vite and push **`dist/`** to the **`gh-pages`** branch.

### One-time setup

1. **Actions permissions:** Repo → **Settings** → **Actions** → **General** → *Workflow permissions* → select **Read and write** → Save.  
   (Needed so the workflow can push to `gh-pages`.)

2. **Pages source:** Repo → **Settings** → **Pages** → *Build and deployment*  
   - **Source:** **Deploy from a branch**  
   - **Branch:** `gh-pages`  
   - **Folder:** `/ (root)`  
   - Save  

3. Push to `main` or `master`, or run the workflow manually (**Actions** → **Deploy to GitHub Pages** → **Run workflow**).

### Open the site

Use your real GitHub username and repo name:

`https://YOUR_USER.github.io/YOUR_REPO_NAME/#/`

(Hash `#/` is correct for this app’s router.)
