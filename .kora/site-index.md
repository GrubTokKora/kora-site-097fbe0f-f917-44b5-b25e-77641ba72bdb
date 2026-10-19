# Site index · format 2
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

## index.html → /
title: Hybrid Media Press Room | Marketing & PR Agency in Connecticut
purpose: Single-page site. The Hybrid Media Press Room is the homepage: press coverage earned for the agency's clients, grouped by client.
sections:
- hero banner: Hybrid Media Press Room, Browse the coverage, Follow on X
- "Coverage by client" — sticky client filter bar and press clips: I Love Greenwich, Shiki Hibachi & Sushi, La Tazza D'Oro NYC, MOLI, Hinoki, Miku Sushi, Meli-Melo, Bistro V, Wishing Well Pictures, Pro Eyecare, PilatesPrive, La Bocca White Plains NY, Pologeorgis, Pet Pantry Warehouse, Heather Gaudio Fine Art, The Longest Table Stamford, Sarah Bamford
- "Where marketing meets public relations" — about Hybrid Media: Public Relations, Marketing
- "Follow Hybrid Media" — social links: Facebook, Instagram, X

## support files
Files that are not pages. A line marked [content] holds words or data a visitor reads, so a
change to the site's content can land there; the rest only make the site work or look right.
- `llms.txt` — Business details, social links, press room summary and clients for Hybrid Media  [content]
- `robots.txt` — crawl rules and sitemap location
- `sitemap.xml` — single homepage URL
- `_redirects` — 301s from the removed pages (about, contact, social, awareness, careers, press-room) to /
- `assets/styles.css` — compiled stylesheet (built from src/input.css at deploy; do not edit by hand)
- `assets/js/main.js` — quote carousel, press tabs, lightbox, and form handling behavior (most unused on the single page)
- `src/input.css` — the site's whole stylesheet: Tailwind entry, brand @theme tokens, and all site styles in @layer components

## shared (every page)
The header (logo + Facebook, Instagram, X links, no navigation tabs) and footer live on index.html, the only page.
