# 808chat

All things Hawaii. Area code 808. Wordmark **808chat**. Tagline: *All things Hawaii.*

This is a **static** dress rehearsal of the SubX chrome (three-column X-like shell: left nav, center feed, right rail, hash routes, sign-in modal that closes, mobile hamburger). It is **not** the FastAPI / Next `subx` stack. No React, no Next, no FastAPI, no Firebase, no model calls.

Wonderful, not tacky. Not X.com. No AskAI.

## GitHub Pages + custom domain

These files are meant to drop into an empty public repo and be served from GitHub Pages at **808chat.com**.

1. Push this folder’s contents to branch `main` (site root, not `/docs`).
2. Repo **Settings → Pages**: Deploy from branch `main` / `/` (root).
3. Custom domain: `808chat.com`. The `CNAME` file in this repo already contains exactly that.

**DNS at GoDaddy still needs to point at GitHub Pages.** Do not change DNS from this repo. Typical GitHub Pages records:

- Apex `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- or a `CNAME` for `www` to `<your-user>.github.io`

Until DNS is pointed, Pages will serve on the github.io URL only if the repo is project-pages configured; for the custom domain, use a user/org Pages root as above.

## What this is / is not

- Feed-first **dummy** posts about Hawaii (trade winds, plate lunch, North Shore winter swell, Kona coffee, Waimea Canyon, Paliku, poke, hula, volcano sunrise, Molokini, shave ice, aloha Friday, Lanikai, Hana highway, Waipio). Fake handles only.
- Ranking chrome (For You / Following / Hot / New) slices the social feed. Packages stay easy to find via `#packages`, the home strip, and the right rail.
- **Dummy packages. Hotels and airfare not bookable yet.** Suggested itineraries for 3, 5, 7, 10, and 14 days. This is a catalog, **not a booking engine**. Dummy fares. Dummy hotel class descriptions (no live inventory, no real hotel brand names).
- Sign-in modal closes (X, Escape, overlay click); auth is stubbed locally. No Firebase project keys.
- No AskAI. No live booking. No cross-post to X or Reddit. We are not X.com.
