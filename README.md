# Humble Times v4 — catalogue-first redesign (Cloudflare Pages)

Complete visual redesign in the Scuffers direction: white, product-dense, small uppercase type, size
selectors on the cards, trust ticker, Fit Quiz, 10%-off welcome capture. Same engine as v3 underneath
(live stock, Stripe Checkout, webhook → stock decrement → confirmation email, analytics events, full SEO/GEO).

## Files
| Path | What |
|---|---|
| `src/data.js` | **Edit this.** Products, prices, per-size stock, fit notes, pairs, FAQs, Journal, reviews, ticker messages, `welcomeCode`, `season`. |
| `src/site.css` / `src/site.js` | Design + behaviour. |
| `build.js` | `node build.js` → `dist/` + `functions/_catalog.js`. |
| `dist/` | **Upload this.** Already built. `preview-*.html` are app-preview copies only. |
| `functions/` | Pages Functions: checkout, stock, webhook, session, notify, subscribe, contact. |

## Deploy
GitHub → Cloudflare Pages → build `node build.js`, output `dist`. Env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`,
optional `RESEND_API_KEY` / `MAIL_FROM` / `MAIL_NOTIFY`, `STRIPE_TAX=true`. KV bindings: `STOCK`, `ORDERS`, `NOTIFY`, `NEWSLETTER`, `CONTACT`.
Create a promotion code matching `welcomeCode` (default `WELCOME10`, 10% off, first order only) in Stripe.

## What's new in v4
- **Design**: split hero (Jersey | Hoodies), "New arrivals 3 / Best sellers / Shop all 6" catalogue sections with counts, 2px-gap grid, hover size row on every card (click a size = added to bag), "+" sheet on mobile, category index list with hover previews, full-bleed campaign band, Instagram 6-up, Journal 2-up, trust ticker, category chip bar on mobile, sticky filter bar on collection pages, two-column gallery + sticky buy panel on product pages, Instrument Sans throughout, burgundy kept as the single accent.
- **Fit Quiz** (usual size → do you size up/down → build + height → fit preference) with a recommended size that's remembered and dotted on every product's size buttons.
- **Welcome popup**: 10% off first order, shown once per browser after 9s or on exit intent, email → newsletter KV, shows the code on success.
- **Search** overlay with popular searches + live results.
- Everything from v3 retained: live stock + "x left", back-in-stock capture, delivery promise in Dublin time, complete-the-look, cart cross-sell, recently viewed, discount codes at checkout, order pipeline, dataLayer events, ProductGroup/FAQ/Article schema, llms.txt, image sitemap, redirects from old Shopify paths.

## Before going live
1. Move images off Shopify's CDN → `dist/images/` or R2; update `cdn` in data.js.
2. Search `PLACEHOLDER`: email, founding year, hoodie/jogger copy, policies, size chart, **stock numbers**.
3. Old Shopify product handles → `_redirects` if they differ.
4. Search Console + Bing Webmaster → `/sitemap.xml`. Google Business Profile for Wexford.
5. Test an order end to end with `sk_test_` keys before switching to live.
