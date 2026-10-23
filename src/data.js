// ===== EDIT THIS FILE, THEN RUN `node build.js` =====
// Everything the site knows about Humble Times lives here.
// Stock: the per-size `stock` numbers below are the fallback. humble-times-inventory.csv (repo root) overrides them
// at build time, so update the CSV for day-to-day stock changes and keep these roughly in step.

const CDN = '/images/'; // product photos are downloaded into dist/images/ at build time (see IMAGE_SOURCES + fetch-images.js)
// Originals of every site photo (Humble Times product shots). To change a photo, point its file name at a new URL here.
const IMAGE_SOURCES = {
  "ht-jersey-1.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/5365b8d1-764f-4625-afb9-29d515e765f6.png",
  "ht-jersey-2.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/97fe3e70-657c-43ef-85bc-ef142aa64988.png",
  "ht-jersey-3.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/586f3d8d-3e10-4ef4-8e53-842b34bbc666.png",
  "windbreaker-1.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/4b95d8fe-fc0a-4be4-81e0-8f24ddc05c12.png",
  "windbreaker-2.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/27d103f4-3bd3-4ddc-95d7-5af924f74d70.png",
  "windbreaker-3.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/e100d6f3-adf7-4b62-8bbe-bce51a9560ce.png",
  "navy-white-hoodie-1.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/4afa81b9-bd07-44c7-b15d-93b492c943b5.png",
  "navy-white-hoodie-2.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/6809b710-c34f-4994-97e2-67a0f5db95e7.png",
  "navy-white-hoodie-3.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/185afa59-1ae7-4cf7-80e4-ad88441d10b8.png",
  "burgundy-pink-hoodie-1.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/97eaf199-51f4-47c6-aed4-f9607649e6f5.png",
  "burgundy-pink-hoodie-2.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/7bb6d198-e92f-4d90-a7c2-3632da792663.png",
  "burgundy-pink-hoodie-3.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/ae56d750-1628-4b57-b5d1-a344fdcb3034.png",
  "zip-hoodie-black-1.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/6f490c63-7c2c-447c-9e0f-8250ce41c3de.png",
  "zip-hoodie-black-2.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/06fc045b-ba65-49df-9940-2cc8a9dc7546.png",
  "zip-hoodie-black-3.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/942b04aa-0765-4ef0-acfb-4c42fee73d3a.png",
  "joggers-black-1.png": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/ea44a1d4-0a3c-47fd-9ba1-1bae418d617a.png",
  "campaign-strip.jpg": "https://d2ol7oe51mr4n9.cloudfront.net/user_3EqgCquvgJpZQEKkIEwOo0X2gui/b418d7c4-65fd-49c9-9ddd-e58389ca3294.jpg"
};

module.exports = {
  imageSources: IMAGE_SOURCES,
  site: {
    name: 'Humble Times Apparel',
    short: 'Humble Times',
    url: 'https://humbletimesclothing.com',
    tagline: 'Irish streetwear from Co. Cork',
    description: 'Humble Times Apparel is an Irish streetwear brand from Co. Cork. Premium heavyweight hoodies, The Jersey, The Windbreaker and everyday essentials. Free delivery in Ireland over €60.',
    email: 'hello@humbletimesapparel.com',      // PLACEHOLDER — put your real address here
    phone: '',                                   // optional, shown in schema if set
    locality: 'Cork', region: 'Co. Cork', country: 'IE',
    founded: '2024',                             // PLACEHOLDER — update
    instagram: 'https://www.instagram.com/humbletimesapparel',
    tiktok: 'https://www.tiktok.com/@humbletimesapparel',
    freeShip: 60, shipIE: 5, shipEU: 9.95,
    announce: ['FREE IRISH DELIVERY €60+','EASY 30-DAY RETURNS','SECURE PAYMENTS','SHIPS FROM CORK'],
    cutoffHour: 14, // orders before this (Dublin time) ship same working day
    nextDrop: '',
    welcomeCode: 'WELCOME10', // create this 10% promo code in Stripe → Product catalog → Coupons → Promotion codes
    season: 'AW26',   // ISO date e.g. '2026-10-03T18:00:00+01:00' to show a countdown on the home page; blank = hidden
    cdn: CDN,
  },

  // Irish-market keyword targets, used in titles/meta/headings. Keep natural.
  keywords: ['Irish streetwear', 'streetwear Ireland', 'Irish clothing brand', 'hoodies Ireland', 'Cork clothing brand', 'Irish hoodie', 'Irish jersey'],

  products: [
    { id: 'ht-jersey', stock: {XS:1,S:4,M:0,L:4,XL:1,'2XL':1}, fit: 'Model is 183 cm / 6ft and wears M', pairs: ['joggers-black','windbreaker'], name: 'The Jersey', price: 35, sizes: ['XS','S','M','L','XL','2XL'], tags: ['top-picks','tops'], badge: 'New', new: true,
      seoTitle: 'The Jersey – Burgundy Stripe Irish Jersey | Humble Times',
      seoDesc: 'The Jersey by Humble Times: burgundy stripes, ecru rugby collar, shamrock front and "éire" back print. 180 GSM soft-touch jersey, XS–2XL. €35, free Irish delivery over €60.',
      images: ['ht-jersey-1.png', 'ht-jersey-2.png', 'ht-jersey-3.png'],
      blurb: 'A modern take on a timeless classic — vintage inspiration, streetwear styling, Irish heritage.',
      desc: ['The Jersey blends vintage inspiration with contemporary streetwear styling. Crafted from a soft-touch 180 GSM cotton-polyester jersey, it delivers lightweight comfort, everyday versatility and effortless wearability.',
             'A rich burgundy stripe design, contrast ecru rugby collar and signature Humble Times branding — every detail honours Irish heritage while keeping a clean, elevated look. The front carries the shamrock and Humble Times graphics in ecru screen print; the back is finished with three stars and "éire" beneath the neckline.'],
      details: ['60% cotton / 40% polyester','180 GSM lightweight jersey','Soft-touch finish, relaxed fit','Contrast ecru rugby collar with V-insert','Ecru screen-printed graphics','Ribbed sleeve cuffs, straight hem'],
      colour: 'Burgundy stripes with ecru print', care: 'Machine wash cold, inside out. Do not bleach. Cool iron if required.',
      story: [ // scroll-story panels on the home page
        { h: 'Vintage cut, modern weight', p: '180 GSM soft-touch jersey. Light enough for a summer evening in Cork, heavy enough to hold its shape.', img: 1 },
        { h: 'The collar', p: 'Contrast ecru rugby collar with a V-insert — the detail that makes it feel like a proper jersey, not a printed tee.', img: 2 },
        { h: 'Éire on the back', p: 'Three stars and "éire" beneath the neckline. Shamrock on the chest. Heritage without the costume.', img: 3 },
      ],
      faq: [
        { q: 'What fabric is The Jersey made from?', a: 'A 60% cotton / 40% polyester blend at 180 GSM with a soft-touch finish — lightweight, breathable and holds its shape after washing.' },
        { q: 'How does The Jersey fit?', a: 'Relaxed fit. Take your normal size for an easy, vintage-jersey look, or size down for a closer fit. Sizes XS to 2XL.' },
        { q: 'How long does delivery take in Ireland?', a: 'Orders ship from Co. Cork within 1–2 working days and usually arrive 2–3 working days later with An Post. Free on orders over €60.' },
      ] },
    { id: 'windbreaker', stock: {S:2,M:4,L:2,XL:2,'2XL':3}, fit: 'Model is 183 cm / 6ft and wears M over a hoodie', pairs: ['ht-jersey','navy-white-hoodie'], name: 'The Windbreaker', price: 50, sizes: ['S','M','L','XL','2XL'], tags: ['top-picks','outerwear'],
      seoTitle: 'The Windbreaker – Lightweight Rain & Wind Jacket | Humble Times',
      seoDesc: 'The Windbreaker by Humble Times Ireland: dual-layer, wind and rain resistant, sweat and odour resistant lining. Built for Irish weather. S–2XL, €50.',
      images: ['windbreaker-1.png', 'windbreaker-2.png', 'windbreaker-3.png'],
      blurb: 'Built for movement. Designed for every season — and every Irish forecast.',
      desc: ['The Windbreaker is your go-anywhere layer, built to keep up with daily life, travel and everything in between. Lightweight, versatile and easy to wear — the perfect airport jacket and an essential companion for morning walks, weekend adventures and unpredictable weather.',
             'Dual-layer construction: the interior shell is sweat- and odour-resistant so you stay comfortable all day, while the exterior shell shields you from wind, light rain and changing conditions.'],
      details: ['Lightweight all-season construction','Sweat- and odour-resistant interior shell','Wind- and rain-resistant exterior shell','Breathable design','Functional pockets for essentials','Relaxed fit for layering'],
      colour: 'Black', care: 'Machine wash cold. Hang dry.',
      faq: [
        { q: 'Is The Windbreaker waterproof?', a: 'It is wind and light-rain resistant, not fully waterproof. It is designed as an everyday layer for changeable Irish weather rather than heavy downpours.' },
        { q: 'Can I wear a hoodie underneath?', a: 'Yes — the fit is relaxed specifically so it layers over a hoodie or jersey.' },
      ] },
    { id: 'navy-white-hoodie', stock: {S:1,M:1,L:1,XL:0,'2XL':3}, fit: 'Model is 180 cm and wears L for an oversized look', pairs: ['joggers-black','windbreaker'], name: 'Navy and White Hoodie', price: 50, sizes: ['S','M','L','XL','2XL'], tags: ['top-picks','hoodies'],
      seoTitle: 'Navy and White Hoodie – Heavyweight Oversized Irish Hoodie | Humble Times',
      seoDesc: 'Premium oversized navy hoodie with white Humble Times print. Heavyweight brushed fleece, made for Irish weather. S–2XL, €50, free delivery in Ireland over €60.',
      images: ['navy-white-hoodie-1.png', 'navy-white-hoodie-2.png', 'navy-white-hoodie-3.png'],
      blurb: 'Premium oversized hoodie in navy with a clean white print.',
      desc: ['Our premium oversized hoodie in navy and white. Heavyweight brushed fleece, a roomy dropped-shoulder fit and Humble Times branding front and back.','PLACEHOLDER — paste your full Shopify description here.'],
      details: ['Heavyweight brushed fleece','Oversized, dropped-shoulder fit','Double-lined hood','Ribbed cuffs and hem'], colour: 'Navy / white', care: 'Machine wash cold, inside out. Tumble dry low.', faq: [] },
    { id: 'burgundy-pink-hoodie', stock: {S:1,M:1,L:1,XL:2,'2XL':1}, fit: 'Model is 180 cm and wears L for an oversized look', pairs: ['joggers-black'], name: 'Burgundy and Baby Pink Hoodie', price: 50, sizes: ['S','M','L','XL','2XL'], tags: ['hoodies'],
      seoTitle: 'Burgundy and Baby Pink Hoodie – Oversized Irish Hoodie | Humble Times',
      seoDesc: 'Premium oversized burgundy hoodie with baby pink Humble Times print. Heavyweight brushed fleece, S–2XL, €50. Irish streetwear from Cork.',
      images: ['burgundy-pink-hoodie-1.png', 'burgundy-pink-hoodie-2.png', 'burgundy-pink-hoodie-3.png'],
      blurb: 'Premium oversized hoodie in burgundy with baby pink print.',
      desc: ['Our premium oversized hoodie in burgundy with a baby pink print. Same heavyweight fleece and relaxed fit as the navy edition.','PLACEHOLDER — paste your full Shopify description here.'],
      details: ['Heavyweight brushed fleece','Oversized, dropped-shoulder fit','Double-lined hood','Ribbed cuffs and hem'], colour: 'Burgundy / baby pink', care: 'Machine wash cold, inside out. Tumble dry low.', faq: [] },
    { id: 'zip-hoodie-black', stock: {S:0,M:0,L:0,XL:1,'2XL':0}, fit: 'Model is 183 cm and wears M', pairs: ['joggers-black'], name: 'Heavyweight Zip Up Hoodie | Black', price: 25.5, was: 45, sizes: ['S','M','L','XL','2XL'], tags: ['hoodies','outerwear','clearance'],
      seoTitle: 'Heavyweight Black Zip Up Hoodie – Clearance | Humble Times',
      seoDesc: 'Heavyweight black zip-up hoodie from Irish brand Humble Times. Now €25.50 (was €45). Last sizes.',
      images: ['zip-hoodie-black-1.png', 'zip-hoodie-black-2.png', 'zip-hoodie-black-3.png'],
      blurb: 'Heavyweight black zip-up. Last sizes.',
      desc: ['A heavyweight black zip-up hoodie built for layering. Clearance pricing while stock lasts.','PLACEHOLDER — paste your full Shopify description here.'],
      details: ['Heavyweight fleece','Full-length zip','Kangaroo pockets','Ribbed cuffs and hem'], colour: 'Black', care: 'Machine wash cold, inside out.', faq: [] },
    { id: 'joggers-black', stock: {S:2,M:0,L:0,XL:1,'2XL':0}, fit: 'Model is 183 cm and wears M', pairs: ['navy-white-hoodie','ht-jersey'], name: 'Straight Leg Heavyweight Joggers | Black', price: 25.5, was: 30, sizes: ['S','M','L','XL','2XL'], tags: ['pants','clearance'],
      seoTitle: 'Straight Leg Heavyweight Joggers Black – Clearance | Humble Times',
      seoDesc: 'Straight-leg heavyweight joggers in black from Irish streetwear brand Humble Times. Now €25.50 (was €30).',
      images: ['joggers-black-1.png', 'zip-hoodie-black-2.png'],
      blurb: 'Straight-leg heavyweight joggers. Clearance.',
      desc: ['Straight-leg heavyweight joggers in black. Clearance pricing while stock lasts.','PLACEHOLDER — paste your full Shopify description here.'],
      details: ['Heavyweight fleece','Straight leg','Elasticated waist with drawcord','Side pockets'], colour: 'Black', care: 'Machine wash cold.', faq: [] },
  ],

  collections: {
    'top-picks': { name: 'Top picks', h1: 'Top picks', blurb: 'The pieces people keep coming back for.', seoTitle: 'Top Picks – Best-Selling Irish Streetwear | Humble Times', img: 'ht-jersey-1.png' },
    hoodies:     { name: 'Hoodies', h1: 'Hoodies, made for Irish weather', blurb: 'Heavyweight brushed fleece and oversized fits. Warm enough for a February sideline, clean enough for town.', seoTitle: 'Hoodies Ireland – Heavyweight Oversized Hoodies | Humble Times', img: 'burgundy-pink-hoodie-3.png' },
    outerwear:   { name: 'Outerwear', h1: 'Outerwear', blurb: 'Layers for wind, rain and everything in between.', seoTitle: 'Outerwear – Windbreakers & Jackets Ireland | Humble Times', img: 'windbreaker-1.png' },
    pants:       { name: 'Pants', h1: 'Pants', blurb: 'Heavyweight joggers built to last.', seoTitle: 'Joggers & Pants Ireland | Humble Times', img: 'joggers-black-1.png' },
    clearance:   { name: 'Clearance', h1: 'Clearance', blurb: 'Last sizes at last prices. When they\'re gone, they\'re gone.', seoTitle: 'Clearance – Irish Streetwear Sale | Humble Times', img: 'zip-hoodie-black-1.png' },
  },

  lookbook: ['ht-jersey-2.png', 'zip-hoodie-black-3.png', 'burgundy-pink-hoodie-2.png', 'navy-white-hoodie-3.png', 'windbreaker-2.png', 'ht-jersey-3.png'],
  hero: 'campaign-strip.jpg',
  storyImg: 'zip-hoodie-black-3.png',

  // Answer-engine content. Written as direct answers so ChatGPT/Perplexity/Google AI can lift them.
  faq: [
    { q: 'Is Humble Times an Irish brand?', a: 'Yes. Humble Times Apparel is an independent Irish streetwear brand based in Co. Cork in the South of Ireland. Every order is packed and shipped from Cork.' },
    { q: 'How much is delivery in Ireland?', a: 'Standard delivery in Ireland is €5 and free on orders over €60. Orders ship within 1–2 working days and usually arrive 2–3 working days later via An Post.' },
    { q: 'Do you ship to the UK and Europe?', a: 'Yes. Tracked delivery to the UK and EU starts at €9.95 and typically takes 4–7 working days. UK orders may attract customs charges on arrival.' },
    { q: 'What is your returns policy?', a: 'Unworn items with tags attached can be returned within 30 days of delivery for a refund or exchange. Email us with your order number to start a return.' },
    { q: 'How do Humble Times hoodies fit?', a: 'Our hoodies are oversized with a dropped shoulder. Take your usual size for the intended relaxed fit, or size down for something closer to regular.' },
    { q: 'What sizes do you stock?', a: 'Most pieces run S to 2XL. The Jersey runs XS to 2XL. Full garment measurements are on our size guide.' },
    { q: 'How can I pay?', a: 'Visa, Mastercard, Apple Pay, Google Pay and Revolut Pay, all through secure checkout. Prices are in euro and include VAT.' },
  ],

  // Real customer reviews ONLY. Leave empty until you have them — fake reviews are illegal in the EU and Google penalises them.
  reviews: [
    // { name: 'Aoife', where: 'Cork', stars: 5, text: 'Fits perfectly, colour is unreal.', product: 'ht-jersey', date: '2026-08-20' },
  ],

  // Journal: long-form content that ranks for Irish search terms and gives answer engines something to cite.
  journal: [
    { slug: 'how-to-style-the-jersey', title: 'How to style The Jersey', date: '2026-09-01', img: 'ht-jersey-2.png',
      excerpt: 'Three ways to wear a burgundy stripe jersey in Ireland — from match day to a night out in town.',
      body: ['The Jersey sits in an odd, brilliant gap: it looks like something you\'d find in a vintage shop in Dublin, but it\'s cut and weighted like a modern streetwear tee. That makes it easier to wear than a real rugby jersey and more interesting than a plain one.',
             '**1. The everyday.** Straight-leg joggers or loose denim, clean white trainers, nothing else. Let the collar and the stripes do the work. This is the version most people end up living in.',
             '**2. Layered for the sideline.** Throw The Windbreaker over it, collar out. The ecru rugby collar against black nylon is the whole point. Works in February, works in a wet June.',
             '**3. Town.** Tuck the front into wide black trousers, add a chain or a cap, keep the shoes dark. The burgundy reads dressier than it has any right to.',
             'Sizing: it\'s a relaxed fit. Your normal size gives you the vintage jersey drop; go one down if you want it sitting closer to the body. Full measurements are on the size guide.'] },
    { slug: 'hoodie-sizing-guide-ireland', title: 'How should an oversized hoodie fit?', date: '2026-08-25', img: 'navy-white-hoodie-2.png',
      excerpt: 'Oversized doesn\'t mean shapeless. A plain-English guide to hoodie fit, dropped shoulders and when to size down.',
      body: ['"Oversized" is the most misused word in menswear. A good oversized hoodie is cut wider through the body and shoulder on purpose, with the sleeve seam sitting a few centimetres down the arm — that\'s the dropped shoulder. It should still end around the hip, not the thigh.',
             '**The three checks.** Shoulder seam sits 3–6 cm below your actual shoulder. Hem finishes at the hip bone or just below. Cuffs sit at the wrist without stacking. If all three are true, the size is right.',
             '**Take your usual size** for the fit our hoodies are designed around. **Size down** if you\'re between sizes or want it closer to a regular fit. **Don\'t size up** — the shoulder drop gets exaggerated and it starts to look borrowed.',
             '**Weight matters.** Our fleece is heavyweight, which is why the hoodie holds its shape instead of collapsing after a few washes. Wash cold, inside out, and skip the tumble dryer where you can.',
             'Still unsure? Every product page has model height and the size they\'re wearing, and our size guide lists flat-lay measurements for every size.'] },
  ],

  // Homepage 'About us' section
  aboutUs: {
    text: 'Life moves fast, and sometimes we forget to appreciate the moments that matter most. Humble Times was created to remind you to live in the moment, and not take things for granted. To cherish the people around you, and enjoy the little things and wearing our pieces is a reminder of that.',
    tagline: 'Humble Times. Appreciate the little things',
  },

  about: {
    h1: 'Irish streetwear, made humbly',
    lede: 'Humble Times Apparel is a streetwear brand from Co. Cork in the South of Ireland, built on three things: quality, comfort and timeless design.',
    body: ['We believe great clothing should feel simple, clean and meaningful. Inspired by culture, creativity and self-expression, we make pieces designed for everyday wear and lasting style — premium hoodies, jerseys, windbreakers and essentials that elevate the everyday.',
           'Everything is designed and shipped from Cork. Small runs, heavyweight fabrics, and details that nod to where we\'re from — a shamrock on the chest, "éire" on the back — without turning heritage into a costume.',
           'The name says it: humble times. Good things made without noise.'],
  },
};
