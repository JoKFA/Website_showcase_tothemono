# Tothemono Website Showcase

Luxury, monochrome single-page showcase built with React (Vite), Tailwind via the JIT import, and Lucide icons. This README is a quick guide to run locally and deploy to Vercel.

## Prerequisites
- Node.js 18+ and npm
- Vercel account (for hosting)

## Local Development
```bash
npm install
npm run dev
```
App runs at the printed localhost URL (default: http://localhost:5173).

## Production Build
```bash
npm run build
npm run preview   # optional: serve the build locally
```

## Deploy to Vercel
1) Install Vercel CLI (optional but handy):
```bash
npm install -g vercel
```
2) From the project root, run:
```bash
vercel
```
Follow the prompts (project name, scope, and “dist” as the output directory).

3) For repeat deploys (CI or manual):
```bash
vercel deploy --prod
```

Key settings for Vercel:
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build locally

## Notes
- All assets are hardcoded in `src/App.jsx` for easy swaps.
- Tailwind utilities are available via the `@import "tailwindcss";` in `src/index.css`.
