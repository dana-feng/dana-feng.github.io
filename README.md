# Personal Website - React App

A personal website for dana feng built with React, Vite, and React Router.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

3. **Build for production:**
   ```bash
   npm run build
   ```

   This creates an optimized production build in the `dist` folder.

4. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
.
├── public/              # Static assets (images go here)
│   ├── profile.png
│   ├── research.png
│   └── art.png
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navigation.jsx
│   │   └── Signature.jsx
│   ├── pages/          # Page components
│   │   ├── About.jsx
│   │   ├── Publications.jsx
│   │   └── Art.jsx
│   ├── App.jsx         # Main app component with routing
│   ├── main.jsx        # Entry point
│   └── styles.css      # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── README.md          # This file
```

## Adding Your Images

Place your images in the `public` folder:
- `public/profile.png` - Profile picture for the about page
- `public/research.png` - Research diagrams for publications page
- `public/art.png` - Art portfolio image

## Deployment

### GitHub Pages

1. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Update vite.config.js:**
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/', // Replace with your GitHub repo name
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

### Other Hosting Options

- **Netlify:** Connect your GitHub repo and set build command to `npm run build` and publish directory to `dist`
- **Vercel:** Connect your GitHub repo and it will auto-detect Vite settings
- **Any static host:** Upload the contents of the `dist` folder after running `npm run build`

## Technologies Used

- **React** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **CSS** - Styling

## Development

The app uses React Router for navigation between pages:
- `/` - About page
- `/publications` - Publications page
- `/art` - Art page

All styling is in `src/styles.css` and uses the same design as the original static site.
