# Troubleshooting: Green Screen Issue

If you're seeing only a green screen, try these steps:

## 1. Check Browser Console
- Press F12 or right-click → Inspect
- Go to the "Console" tab
- Look for any red error messages
- Share any errors you see

## 2. Restart Dev Server
Stop the current server (Ctrl+C) and restart:
```bash
npm run dev
```

## 3. Clear Browser Cache
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Or clear browser cache completely

## 4. Verify Files
Make sure these files exist:
- `src/main.jsx`
- `src/App.jsx`
- `src/styles.css`
- `index.html` (in root, not in src)

## 5. Check Network Tab
- Open DevTools → Network tab
- Refresh the page
- Check if `main.jsx` and other files are loading (status 200)
- If any files show 404, that's the problem

## 6. Verify React is Loading
Open browser console and type:
```javascript
document.getElementById('root')
```
Should return the root div element.

## Common Issues:
- **Module not found**: Run `npm install` again
- **Port already in use**: Change port in vite.config.js or kill the process using port 5173
- **Old HTML files interfering**: Make sure you're accessing `http://localhost:5173` not opening the HTML files directly

