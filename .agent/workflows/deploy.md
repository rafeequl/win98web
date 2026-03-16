---
description: How to deploy the Windows 98 Web application
---

Deploying this application is straightforward since it is a static Vite/React site.

### 1. Build the project
Before deploying, you must create a production build.
```bash
npm run build
```
This will create a `dist/` folder containing the optimized static files.

### 2. Choose a platform

#### Option A: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Follow the prompts. Vercel will automatically detect Vite and handle the build.

#### Option B: Netlify
1. Drag and drop the `dist/` folder onto the Netlify dashboard.
2. OR connect your GitHub repository and set the build command to `npm run build` and the publish directory to `dist`.

#### Option C: GitHub Pages
1. Install the gh-pages package: `npm install gh-pages --save-dev`
2. Add these scripts to `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Run `npm run deploy`.

#### Option D: Manual Server (NGINX/Apache)
Simply upload the contents of the `dist/` folder to your server's web root.
