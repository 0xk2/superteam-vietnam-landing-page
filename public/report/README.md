# Reports

Each report is a self-contained static site served at `vn.superteam.fun/report/<slug>/`.
Vite copies everything in `public/` verbatim, so nothing here goes through the bundler.

To add a report:

1. Put its files in `public/report/<slug>/` with an `index.html` at the root.
   Use relative paths inside the report (`css/...`, `assets/...`), not `/assets/...`,
   so it does not collide with Vite's own `/assets/` output.
2. Add a card for it at the top of the list in `public/report/index.html`.
3. If it has hashed assets, add a cache header block for `/report/<slug>/assets/*`
   in `netlify.toml`, like the one for `rtc`.

Current reports:

- `rtc` — Road to Colosseum, Vietnam Side Track Hackathon (Sep–Oct 2026)
