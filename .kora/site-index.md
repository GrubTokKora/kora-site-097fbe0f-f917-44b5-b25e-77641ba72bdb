# Site index · format 2
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

## index.html → /
title: Hybrid Media: Marketing & Public Relations Agency in Connecticut
purpose: Welcome page for Hybrid Media, a marketing and public relations agency in Connecticut.
sections:
- navigation menu: Welcome, About, Contact, Social, Awareness, Careers, Press Room
- hero banner: Discover Our Story
- quote slider
- services grid: Marketing, Public Relations

## about.html → /about
title: About — Hybrid Media
purpose: Provide information about the company's background, founder, team, and communications approach.
sections:
- "About" — Company story and approach details: Sarah I. Bamford, Our Approach
also: The page title and description appear in the <head> meta tags and the WebPage structured-data block.

## awareness.html → /awareness
title: Awareness — Hybrid Media
purpose: Showcase community involvement initiatives and provide an inquiry form for charity partnerships and volunteering.
sections:
- "Give back to the community." — Community involvement overview and contact form

## careers.html → /careers
title: Careers — Hybrid Media
purpose: A careers page inviting job seekers, interns, and communications professionals to submit their resumes to Hybrid Media.
sections:
- "Start your career in communications." — Career overview and job seeker invitation
- "Submit Your Resume" — Job application form

## contact.html → /contact
title: Contact — Hybrid Media
purpose: Contact page allowing visitors to submit an inquiry form to Hybrid Media.
sections:
- contact form

## press-room.html → /press-room
title: Press Room — Hybrid Media
purpose: Display press releases, media coverage, and news clips for Hybrid Media and its clients
sections:
- introductory press copy
- "I Love Greenwich" — press clips: Greenwich Time, WAG MAGAZINE
- "Shiki Hibachi & Sushi" — press clips: Patch
- "La Tazza D'Oro NYC" — press clips: La Voce di New York, Modern Luxury
- "MOLI" — press clips: Greenwich Free Press, Greenwich Time, Moffly Media
- "Hinoki" — press clips: Greenwich Sentinel
- "Miku Sushi" — press clips: Greenwich Time
- "Meli-Melo" — press clips: CT Post, Greenwich Sentinel
- "Bistro V" — press clips: Patch
- "Wishing Well Pictures" — press clips: CT Insider
- "Pro Eyecare" — press clips: Moffly Media, Westfair
- "PilatesPrive" — press clips: Moffly Media
- "La Bocca White Plains NY" — press clips: Westfair
- "Pologeorgis" — press clips: Moffly Media
- "Pet Pantry Warehouse" — press clips: Greenwich Free Press, Patch
- "Heather Gaudio Fine Art" — press clips: City Lifestyle, Heather Gaudio Fine Art
- "The Longest Table Stamford" — press clips: CTbites, Patch
- "Sarah Bamford" — press clips: 203 Local

## social.html → /social
title: Social — Hybrid Media
purpose: Show the company's social media channels and community links
sections:
- "Join the conversation" — social media channel links: Facebook, Twitter, Instagram, YouTube

## support files
Files that are not pages. A line marked [content] holds words or data a visitor reads, so a
change to the site's content can land there; the rest only make the site work or look right.
- `llms.txt` — Business details, services, social links, and site structure for Hybrid Media: Hybrid Media, Sarah I. Bamford, Marketing, Public Relations, Hybrid Media Plan  [content]
- `robots.txt` — 26 bytes — too small to hold content
- `sitemap.xml` — 110 bytes — too small to hold content
- `assets/css/style.css` — site stylesheet for styling, colors, and layout
- `assets/js/main.js` — Mobile menu toggle, quote carousel, press tabs, lightbox, and form handling behavior

## shared (every page)
The header, navigation, mobile menu and footer are propagated from index.html to every other page by
`shell_propagation`. A change to any of them is made on index.html alone and copied automatically.
