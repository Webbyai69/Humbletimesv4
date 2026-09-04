// ===== EDIT THIS FILE, THEN RUN `node build.js` =====
// Everything the site knows about Humble Times lives here.

const CDN = 'https://humbletimesapparel.com/cdn/shop/files/'; // ← change to your R2 / /images/ path before closing Shopify

module.exports = {
  site: {
    name: 'Humble Times Apparel',
    short: 'Humble Times',
    url: 'https://humbletimesclothing.com',
    tagline: 'Irish streetwear from the South East',
    description: 'Humble Times Apparel is an Irish streetwear brand from Co. Wexford. Premium heavyweight hoodies, The Jersey, The Windbreaker and everyday essentials. Free delivery in Ireland over €60.',
    email: 'hello@humbletimesapparel.com',      // PLACEHOLDER — put your real address here
    phone: '',                                   // optional, shown in schema if set
    locality: 'Wexford', region: 'Co. Wexford', country: 'IE',
    founded: '2024',                             // PLACEHOLDER — update
    instagram: 'https://www.instagram.com/humbletimesapparel',
    tiktok: 'https://www.tiktok.com/@humbletimesapparel',
    freeShip: 60, shipIE: 5, shipEU: 9.95,
    announce: ['FREE IRISH DELIVERY €60+','EASY 30-DAY RETURNS','SECURE PAYMENTS','SHIPS FROM WEXFORD'],
    cutoffHour: 14, // orders before this (Dublin time) ship same working day
    nextDrop: '',
    welcomeCode: 'WELCOME10', // create this 10% promo code in Stripe → Product catalog → Coupons → Promotion codes
    season: 'AW26',   // ISO date e.g. '2026-10-03T18:00:00+01:00' to show a countdown on the home page; blank = hidden
    cdn: CDN,
  },

  // Irish-market keyword targets, used in titles/meta/headings. Keep natural.
  keywords: ['Irish streetwear', 'streetwear Ireland', 'Irish clothing brand', 'hoodies Ireland', 'Wexford clothing brand', 'Irish hoodie', 'Irish jersey'],

  products: [
    { id: 'ht-jersey', stock: {XS:6,S:14,M:18,L:12,XL:7,'2XL':3}, fit: 'Model is 183 cm / 6ft and wears M', pairs: ['joggers-black','windbreaker'], name: 'The Jersey', price: 35, sizes: ['XS','S','M','L','XL','2XL'], tags: ['top-picks','tops'], badge: 'New', new: true,
      seoTitle: 'The Jersey – Burgundy Stripe Irish Jersey | Humble Times',
      seoDesc: 'The Jersey by Humble Times: burgundy stripes, ecru rugby collar, shamrock front and "éire" back print. 180 GSM soft-touch jersey, XS–2XL. €35, free Irish delivery over €60.',
      images: ['Square_Design_Layout.png?v=1780417394','D8F69DF4-20B3-4D27-BE77-08269915C944.jpg?v=1779779807','Square_Design_Layout_-_2.png?v=1780414780','Square_Design_Layout_-_4.png?v=1780414758','8F5EA7FC-05E5-440F-9146-466D22BEF069.jpg?v=1779779808','73410BFB-61F7-44D1-8FBC-EC0E7C260DCB.jpg?v=1779779808'],
      blurb: 'A modern take on a timeless classic — vintage inspiration, streetwear styling, Irish heritage.',
      desc: ['The Jersey blends vintage inspiration with contemporary streetwear styling. Crafted from a soft-touch 180 GSM cotton-polyester jersey, it delivers lightweight comfort, everyday versatility and effortless wearability.',
             'A rich burgundy stripe design, contrast ecru rugby collar and signature Humble Times branding — every detail honours Irish heritage while keeping a clean, elevated look. The front carries the shamrock and Humble Times graphics in ecru screen print; the back is finished with three stars and "éire" beneath the neckline.'],
      details: ['60% cotton / 40% polyester','180 GSM lightweight jersey','Soft-touch finish, relaxed fit','Contrast ecru rugby collar with V-insert','Ecru screen-printed graphics','Ribbed sleeve cuffs, straight hem'],
      colour: 'Burgundy stripes with ecru print', care: 'Machine wash cold, inside out. Do not bleach. Cool iron if required.',
      story: [ // scroll-story panels on the home page
        { h: 'Vintage cut, modern weight', p: '180 GSM soft-touch jersey. Light enough for a summer evening in Wexford, heavy enough to hold its shape.', img: 1 },
        { h: 'The collar', p: 'Contrast ecru rugby collar with a V-insert — the detail that makes it feel like a proper jersey, not a printed tee.', img: 2 },
        { h: 'Éire on the back', p: 'Three stars and "éire" beneath the neckline. Shamrock on the chest. Heritage without the costume.', img: 3 },
      ],
      faq: [
        { q: 'What fabric is The Jersey made from?', a: 'A 60% cotton / 40% polyester blend at 180 GSM with a soft-touch finish — lightweight, breathable and holds its shape after washing.' },
        { q: 'How does The Jersey fit?', a: 'Relaxed fit. Take your normal size for an easy, vintage-jersey look, or size down for a closer fit. Sizes XS to 2XL.' },
        { q: 'How long does delivery take in Ireland?', a: 'Orders ship from Co. Wexford within 1–2 working days and usually arrive 2–3 working days later with An Post. Free on orders over €60.' },
      ] },
    { id: 'windbreaker', stock: {S:5,M:9,L:8,XL:4,'2XL':2}, fit: 'Model is 183 cm / 6ft and wears M over a hoodie', pairs: ['ht-jersey','navy-white-hoodie'], name: 'The Windbreaker', price: 50, sizes: ['S','M','L','XL','2XL'], tags: ['top-picks','outerwear'],
      seoTitle: 'The Windbreaker – Lightweight Rain & Wind Jacket | Humble Times',
      seoDesc: 'The Windbreaker by Humble Times Ireland: dual-layer, wind and rain resistant, sweat and odour resistant lining. Built for Irish weather. S–2XL, €50.',
      images: ['Square_Design_Layout_-_6.png?v=1780417178','3040D89E-64F3-4E75-8EB1-8DBB831276B1.jpg?v=1778500174','4FA224C0-C65B-46E8-90BE-53A071974FF0.jpg?v=1778500175','E2DDED91-6EF6-4A3F-86D8-DCF63CEC6ED5.png?v=1778500176'],
      blurb: 'Built for movement. Designed for every season — and every Irish forecast.',
      desc: ['The Windbreaker is your go-anywhere layer, built to keep up with daily life, travel and everything in between. Lightweight, versatile and easy to wear — the perfect airport jacket and an essential companion for morning walks, weekend adventures and unpredictable weather.',
             'Dual-layer construction: the interior shell is sweat- and odour-resistant so you stay comfortable all day, while the exterior shell shields you from wind, light rain and changing conditions.'],
      details: ['Lightweight all-season construction','Sweat- and odour-resistant interior shell','Wind- and rain-resistant exterior shell','Breathable design','Functional pockets for essentials','Relaxed fit for layering'],
      colour: 'Black', care: 'Machine wash cold. Hang dry.',
      faq: [
        { q: 'Is The Windbreaker waterproof?', a: 'It is wind and light-rain resistant, not fully waterproof. It is designed as an everyday layer for changeable Irish weather rather than heavy downpours.' },
        { q: 'Can I wear a hoodie underneath?', a: 'Yes — the fit is relaxed specifically so it layers over a hoodie or jersey.' },
      ] },
    { id: 'navy-white-hoodie', stock: {S:4,M:11,L:9,XL:5,'2XL':0}, fit: 'Model is 180 cm and wears L for an oversized look', pairs: ['joggers-black','windbreaker'], name: 'Navy and White Hoodie', price: 50, sizes: ['S','M','L','XL','2XL'], tags: ['top-picks','hoodies'],
      seoTitle: 'Navy and White Hoodie – Heavyweight Oversized Irish Hoodie | Humble Times',
      seoDesc: 'Premium oversized navy hoodie with white Humble Times print. Heavyweight brushed fleece, made for Irish weather. S–2XL, €50, free delivery in Ireland over €60.',
      images: ['3F374010-40F2-40DF-B8D3-3F68F92C61D8.jpg?v=1778453876','AB1C7865-5716-4871-B28A-5C7581A50F52.jpg?v=1778453874'],
      blurb: 'Premium oversized hoodie in navy with a clean white print.',
      desc: ['Our premium oversized hoodie in navy and white. Heavyweight brushed fleece, a roomy dropped-shoulder fit and Humble Times branding front and back.','PLACEHOLDER — paste your full Shopify description here.'],
      details: ['Heavyweight brushed fleece','Oversized, dropped-shoulder fit','Double-lined hood','Ribbed cuffs and hem'], colour: 'Navy / white', care: 'Machine wash cold, inside out. Tumble dry low.', faq: [] },
    { id: 'burgundy-pink-hoodie', stock: {S:6,M:8,L:7,XL:3,'2XL':2}, fit: 'Model is 180 cm and wears L for an oversized look', pairs: ['joggers-black'], name: 'Burgundy and Baby Pink Hoodie', price: 50, sizes: ['S','M','L','XL','2XL'], tags: ['hoodies'],
      seoTitle: 'Burgundy and Baby Pink Hoodie – Oversized Irish Hoodie | Humble Times',
      seoDesc: 'Premium oversized burgundy hoodie with baby pink Humble Times print. Heavyweight brushed fleece, S–2XL, €50. Irish streetwear from Wexford.',
      images: ['163BC494-6427-4BA7-B0DB-F12629EC02F1.jpg?v=1778500352','A12C91E1-BD67-4523-BE15-A34B01C092A6.jpg?v=1778500353'],
      blurb: 'Premium oversized hoodie in burgundy with baby pink print.',
      desc: ['Our premium oversized hoodie in burgundy with a baby pink print. Same heavyweight fleece and relaxed fit as the navy edition.','PLACEHOLDER — paste your full Shopify description here.'],
      details: ['Heavyweight brushed fleece','Oversized, dropped-shoulder fit','Double-lined hood','Ribbed cuffs and hem'], colour: 'Burgundy / baby pink', care: 'Machine wash cold, inside out. Tumble dry low.', faq: [] },
    { id: 'zip-hoodie-black', stock: {S:0,M:2,L:3,XL:1,'2XL':0}, fit: 'Model is 183 cm and wears M', pairs: ['joggers-black'], name: 'Heavyweight Zip Up Hoodie | Black', price: 25.5, was: 45, sizes: ['S','M','L','XL','2XL'], tags: ['hoodies','outerwear','clearance'],
      seoTitle: 'Heavyweight Black Zip Up Hoodie – Clearance | Humble Times',
      seoDesc: 'Heavyweight black zip-up hoodie from Irish brand Humble Times. Now €25.50 (was €45). Last sizes.',
      images: ['783A8C04-5BB0-4B60-85BB-1E6D817A2ABA.jpg?v=1778500812','954E860F-08CA-4D36-A086-FB9ADBB54D00.jpg?v=1778500814'],
      blurb: 'Heavyweight black zip-up. Last sizes.',
      desc: ['A heavyweight black zip-up hoodie built for layering. Clearance pricing while stock lasts.','PLACEHOLDER — paste your full Shopify description here.'],
      details: ['Heavyweight fleece','Full-length zip','Kangaroo pockets','Ribbed cuffs and hem'], colour: 'Black', care: 'Machine wash cold, inside out.', faq: [] },
    { id: 'joggers-black', stock: {S:3,M:5,L:2,XL:0,'2XL':1}, fit: 'Model is 183 cm and wears M', pairs: ['navy-white-hoodie','ht-jersey'], name: 'Straight Leg Heavyweight Joggers | Black', price: 25.5, was: 30, sizes: ['S','M','L','XL','2XL'], tags: ['pants','clearance'],
      seoTitle: 'Straight Leg Heavyweight Joggers Black – Clearance | Humble Times',
      seoDesc: 'Straight-leg heavyweight joggers in black from Irish streetwear brand Humble Times. Now €25.50 (was €30).',
      images: ['C5F398C9-85C1-44D3-8E0E-B71B7FD4ADF1.png?v=1778500546','DC626089-9191-4D4B-A4BA-6483D3B0F3AC.jpg?v=1778500547'],
      blurb: 'Straight-leg heavyweight joggers. Clearance.',
      desc: ['Straight-leg heavyweight joggers in black. Clearance pricing while stock lasts.','PLACEHOLDER — paste your full Shopify description here.'],
      details: ['Heavyweight fleece','Straight leg','Elasticated waist with drawcord','Side pockets'], colour: 'Black', care: 'Machine wash cold.', faq: [] },
  ],

  collections: {
    'top-picks': { name: 'Top picks', h1: 'Top picks', blurb: 'The pieces people keep coming back for.', seoTitle: 'Top Picks – Best-Selling Irish Streetwear | Humble Times', img: 'Square_Design_Layout.png?v=1780417394' },
    hoodies:     { name: 'Hoodies', h1: 'Hoodies, made for Irish weather', blurb: 'Heavyweight brushed fleece and oversized fits. Warm enough for a February sideline, clean enough for town.', seoTitle: 'Hoodies Ireland – Heavyweight Oversized Hoodies | Humble Times', img: '3F374010-40F2-40DF-B8D3-3F68F92C61D8.jpg?v=1778453876' },
    outerwear:   { name: 'Outerwear', h1: 'Outerwear', blurb: 'Layers for wind, rain and everything in between.', seoTitle: 'Outerwear – Windbreakers & Jackets Ireland | Humble Times', img: '3040D89E-64F3-4E75-8EB1-8DBB831276B1.jpg?v=1778500174' },
    pants:       { name: 'Pants', h1: 'Pants', blurb: 'Heavyweight joggers built to last.', seoTitle: 'Joggers & Pants Ireland | Humble Times', img: 'DC626089-9191-4D4B-A4BA-6483D3B0F3AC.jpg?v=1778500547' },
    clearance:   { name: 'Clearance', h1: 'Clearance', blurb: 'Last sizes at last prices. When they\'re gone, they\'re gone.', seoTitle: 'Clearance – Irish Streetwear Sale | Humble Times', img: '783A8C04-5BB0-4B60-85BB-1E6D817A2ABA.jpg?v=1778500812' },
  },

  lookbook: ['IMG_6547.jpg?v=1779638920','IMG_8583.jpg?v=1779638915','IMG_8601.jpg?v=1779638916','IMG_8599.jpg?v=1779638917','DSC04440.jpg?v=1779780141','4324eb92-7e04-4e43-bded-bd4deb969c77.jpg?v=1779638919','IMG_9072.jpg?v=1779638919','IMG_5200.jpg?v=1779638919','IMG_5258.jpg?v=1779638922','D8F69DF4-20B3-4D27-BE77-08269915C944.jpg?v=1779779807'],
  hero: 'umble_time.png?v=1779629785',
  storyImg: 'DSC04440.jpg?v=1779780141',

  // Answer-engine content. Written as direct answers so ChatGPT/Perplexity/Google AI can lift them.
  faq: [
    { q: 'Is Humble Times an Irish brand?', a: 'Yes. Humble Times Apparel is an independent Irish streetwear brand based in Co. Wexford in the South East of Ireland. Every order is packed and shipped from Wexford.' },
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
    { slug: 'how-to-style-the-jersey', title: 'How to style The Jersey', date: '2026-09-01', img: 'D8F69DF4-20B3-4D27-BE77-08269915C944.jpg?v=1779779807',
      excerpt: 'Three ways to wear a burgundy stripe jersey in Ireland — from match day to a night out in town.',
      body: ['The Jersey sits in an odd, brilliant gap: it looks like something you\'d find in a vintage shop in Dublin, but it\'s cut and weighted like a modern streetwear tee. That makes it easier to wear than a real rugby jersey and more interesting than a plain one.',
             '**1. The everyday.** Straight-leg joggers or loose denim, clean white trainers, nothing else. Let the collar and the stripes do the work. This is the version most people end up living in.',
             '**2. Layered for the sideline.** Throw The Windbreaker over it, collar out. The ecru rugby collar against black nylon is the whole point. Works in February, works in a wet June.',
             '**3. Town.** Tuck the front into wide black trousers, add a chain or a cap, keep the shoes dark. The burgundy reads dressier than it has any right to.',
             'Sizing: it\'s a relaxed fit. Your normal size gives you the vintage jersey drop; go one down if you want it sitting closer to the body. Full measurements are on the size guide.'] },
    { slug: 'hoodie-sizing-guide-ireland', title: 'How should an oversized hoodie fit?', date: '2026-08-25', img: '3F374010-40F2-40DF-B8D3-3F68F92C61D8.jpg?v=1778453876',
      excerpt: 'Oversized doesn\'t mean shapeless. A plain-English guide to hoodie fit, dropped shoulders and when to size down.',
      body: ['"Oversized" is the most misused word in menswear. A good oversized hoodie is cut wider through the body and shoulder on purpose, with the sleeve seam sitting a few centimetres down the arm — that\'s the dropped shoulder. It should still end around the hip, not the thigh.',
             '**The three checks.** Shoulder seam sits 3–6 cm below your actual shoulder. Hem finishes at the hip bone or just below. Cuffs sit at the wrist without stacking. If all three are true, the size is right.',
             '**Take your usual size** for the fit our hoodies are designed around. **Size down** if you\'re between sizes or want it closer to a regular fit. **Don\'t size up** — the shoulder drop gets exaggerated and it starts to look borrowed.',
             '**Weight matters.** Our fleece is heavyweight, which is why the hoodie holds its shape instead of collapsing after a few washes. Wash cold, inside out, and skip the tumble dryer where you can.',
             'Still unsure? Every product page has model height and the size they\'re wearing, and our size guide lists flat-lay measurements for every size.'] },
  ],

  about: {
    h1: 'Irish streetwear, made humbly',
    lede: 'Humble Times Apparel is a streetwear brand from the South East of Ireland, built on three things: quality, comfort and timeless design.',
    body: ['We believe great clothing should feel simple, clean and meaningful. Inspired by culture, creativity and self-expression, we make pieces designed for everyday wear and lasting style — premium hoodies, jerseys, windbreakers and essentials that elevate the everyday.',
           'Everything is designed in Wexford and shipped from Wexford. Small runs, heavyweight fabrics, and details that nod to where we\'re from — a shamrock on the chest, "éire" on the back — without turning heritage into a costume.',
           'The name says it: humble times. Good things made without noise.'],
  },
};
