# FIX LOG: 404 Issue

## Date: 2026-02-10

### Changes:
1.  **Removed Route**: Deleted incorrect `<Route path="/llms.txt" ...` in `src/App.jsx`.
2.  **Updated Vite Config**: Added `.txt`, `.md`, `.xml` to `globPatterns` and `navigateFallbackDeny` in `vite.config.js`.

### Result:
Static files (`llms.txt`, `AI_CONTEXT.md`) are now served directly by the server/PWA and not intercepted by React Router.
