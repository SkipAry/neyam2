/**
 * ─────────────────────────────────────────────────────────────
 *  NEYAM — SITE CONFIGURATION
 *  Every editable word, price, link and menu item lives in this
 *  one file. Change it here and the whole site follows.
 * ─────────────────────────────────────────────────────────────
 *
 *  SOURCING NOTE — read before editing:
 *  Address, hours and the Google rating below were taken from the
 *  verified Google Business listing on 30 July 2026. Nothing here is
 *  invented. If you change the rating or review count, use the real
 *  current figure from Google — never an estimate.
 */

export const site = {
  name: "Neyam",
  /** ney = ghee. The name is the ingredient. */
  nameMeaning: "ney — ghee",
  tagline: "A slower corner of South India, brought to Pune",
  cuisine: "Authentic Bangalore-style South Indian breakfast",

  /**
   * No production domain is currently owned by the cafe.
   * Set only after ownership is confirmed; metadata stays noindex until then.
   */
  url: "",

  address: {
    line1: "Pride Portal, Gokhale Road",
    line2: "Model Colony, Shivajinagar",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411016",
    landmark: "Near JW Marriott",
  },

  /** Google-verified: 8 am – 10 pm, all seven days. */
  hours: "8:00 AM – 10:00 PM",
  openDays: "Every day",

  /**
   * Phone — NOT yet on the Google listing either. Fill this in and the
   * call button appears automatically everywhere it is needed.
   */
  phone: "",
  phoneDisplay: "",

  instagram: "https://www.instagram.com/neyamofficial/",
  instagramHandle: "@neyamofficial",
  googleListing: "https://share.google/JiP7hxIOy696TR17s",

  /** Real figures from the Google Business listing, 1 August 2026. */
  googleRating: 5.0 as number | null,
  googleReviewCount: 46 as number | null,

  /** Google's own "price per person" band for the listing. */
  priceRange: "₹200–400",

  /** Painted on the counter wall inside the restaurant. */
  wallText: [
    "Taste the heritage",
    "Feel the soul in every bite",
    "Remember the love… Remember Neyam",
  ],
};

export const fullAddress =
  `${site.address.line1}, ${site.address.line2}, ${site.address.city} ${site.address.pincode}`;

/** Exact verified Google Business listing supplied by the restaurant. */
export const mapsLink = site.googleListing;

export const telLink = site.phone ? `tel:${site.phone}` : "";

/* ── BRAND STATEMENTS ────────────────────────────────────────
   Taken verbatim from the brand's own statements.txt. These are
   the heart of the site — treat the wording as fixed copy. */

export const statements = [
  {
    heading: "We believe every meal should feel thoughtfully made",
    lines: [
      "Not because it's complicated.",
      "Because someone cared enough to make it well.",
    ],
  },
  {
    heading: "We believe mornings shouldn't be rushed",
    lines: ["A warm breakfast.", "A cup of filter coffee.", "A slower start to the day."],
  },
  {
    heading: "We believe simplicity takes more skill than excess",
    lines: ["Not more ingredients.", "Not more toppings.", "Just more care."],
  },
  {
    heading: "We don't believe good food needs to be loud",
    lines: ["Sometimes, the simplest meals leave the longest memories."],
  },
  {
    heading: "We believe meals are meant to be shared",
    lines: [
      "That's why you'll find one long community table at the heart of Neyam.",
      "Because some conversations deserve to happen over good food.",
    ],
  },
];

/* ── MENU ────────────────────────────────────────────────────
   Transcribed exactly from the Neyam menu card.

   PRICES: the menu card carries no prices, so none are shown. This is
   deliberate — inventing them would misinform customers. Add a `price`
   to any item and it will render automatically; leave it off and the
   item shows as name only. Google lists ₹200–400 per person, which is
   surfaced separately via site.priceRange. */

export type MenuItem = {
  name: string;
  note?: string;
  price?: number;
};

export type MenuSection = {
  id: string;
  title: string;
  /** Short line of context — ours, not from the card. */
  blurb: string;
  items: MenuItem[];
};

export const menu: MenuSection[] = [
  {
    id: "benne-dose",
    title: "Bangalore Benne Dose",
    blurb:
      "The butter dosa Bengaluru is known for — crisped on the griddle in generous ghee.",
    items: [{ name: "Plain Dose" }, { name: "Podi Masala Dose" }],
  },
  {
    id: "davangere-dose",
    title: "Davangere Dose",
    blurb:
      "From the town of Davangere — thicker, softer, and eaten with a fierce chutney.",
    items: [{ name: "Open Dose" }, { name: "Masala Dose" }],
  },
  {
    id: "baath",
    title: "Baath",
    blurb: "Karnataka's one-pot rice dishes. Comfort measured in spoonfuls.",
    items: [{ name: "Bisibele Baath" }, { name: "Puliyogare Baath" }],
  },
  {
    id: "idli-wada",
    title: "Idli / Wada",
    blurb: "Steamed and fried, the way a morning is meant to begin.",
    items: [{ name: "Thatte Idli" }, { name: "Medu Wada" }, { name: "Dal Wada" }],
  },
  {
    id: "filter-kaapi",
    title: "Filter Kaapi",
    blurb: "Decoction brewed slowly, poured between tumbler and davara.",
    items: [{ name: "Hot Filter Kaapi" }, { name: "Cold Filter Kaapi" }],
  },
  {
    id: "beverages",
    title: "Beverages",
    blurb: "Cooling, traditional, and made in-house.",
    items: [{ name: "Panakam" }, { name: "Lemongrass Lemonade" }],
  },
  {
    id: "dessert",
    title: "Dessert",
    blurb: "One sweet, done properly.",
    items: [{ name: "Pineapple Sheera" }],
  },
];

/* ── SIGNATURE DISHES (the floating cutouts) ─────────────────
   These three use the background-removed photography. */
export const signatures = [
  {
    name: "Ghee Pudi Masala Dose",
    image: "/food/dish-ghee-pudi-masala-dose.webp",
    alt: "Ghee podi masala dose served with chutney",
    line: "Podi, ghee and potato masala folded into a crisp dose.",
  },
  {
    name: "Ghee Pudi Idli",
    image: "/food/dish-ghee-pudi-idli.webp",
    alt: "Thatte idli dusted with podi, served with two chutneys",
    line: "A wide thatte idli, dusted with podi and slicked with ghee.",
  },
  {
    name: "Ghee Masala Dose",
    image: "/food/dish-ghee-masala-dose.webp",
    alt: "Ghee masala dose with chutney and sambar",
    line: "The everyday classic, made with more butter than restraint.",
  },
];

/* ── REELS ───────────────────────────────────────────────────
   reel-1  : the restaurant itself, audio stripped, loops silently.
   reel-testimonial : a guest speaking (Marathi). Keeps its audio and
                      starts muted behind an unmute control, because a
                      silent talking-head is pointless.

   The original reel2 ("Heritage Benne Dosas are arriving soon") is a
   pre-launch teaser and is deliberately left out — Neyam is open now,
   so it would read as stale. */
export const reels = [
  {
    id: "reel-1",
    src: "/reels/reel-1.mp4",
    poster: "/reels/reel-1-poster.jpg",
    label: "The corner itself",
    hasAudio: false,
  },
  {
    id: "reel-testimonial",
    src: "/reels/reel-testimonial.mp4",
    poster: "/reels/reel-testimonial-poster.jpg",
    label: "What Punekars are saying",
    hasAudio: true,
  },
];

/* ── PHOTOGRAPHS ─────────────────────────────────────────────
   Stills lifted from Neyam's own footage, cropped clear of the reel
   border and logo watermark.

   These replaced the Instagram post artwork inside the stamp frames:
   that artwork already carries its own scalloped frame and its own
   headline, so putting it in a stamp produced a frame inside a frame
   and repeated the copy. The artwork itself is still in
   /public/brand/ if it's ever wanted elsewhere. */

export const photos = {
  shrine: {
    src: "/photos/p-shrine.webp",
    alt: "The Namaskara shrine at Neyam — a Ganesha idol with marigolds, brass lamps and ferns beneath a tiled canopy",
  },
  gheePour: {
    src: "/photos/p-ghee-pour.webp",
    alt: "Ghee being poured over a podi-dusted idli on a palm-leaf plate",
  },
  arriving: {
    src: "/photos/p-arriving.webp",
    alt: "Guests arriving at Neyam's open-air seating, framed by potted plants and brass lamps",
  },
  guests: {
    src: "/photos/p-guests.webp",
    alt: "Guests talking and laughing in the dining room at Neyam",
  },
  doseLeaf: {
    src: "/photos/p-dose-leaf.webp",
    alt: "A podi masala dose served on a banana leaf",
  },
  podiDust: {
    src: "/photos/p-podi-dust.webp",
    alt: "Podi being dusted over a dose on the griddle",
  },
  kaapi: {
    src: "/photos/p-kaapi.webp",
    alt: "Filter kaapi frothed in a brass tumbler and davara, beside a measure of coffee grounds",
  },
};

/** The sheet of stamps near the foot of the page. */
export const gallery = [
  photos.arriving,
  photos.doseLeaf,
  photos.guests,
  photos.podiDust,
];

/* ── FAQs (visible, and used for FAQPage schema) ─────────────
   Answers must stay factually true. Do not add an FAQ you cannot
   answer honestly — e.g. don't claim delivery until it exists. */
export const faqs = [
  {
    question: "Where is Neyam?",
    answer:
      `${site.address.line1}, ${site.address.line2}, ${site.address.city} ${site.address.pincode} — ${site.address.landmark.toLowerCase()}.`,
  },
  {
    question: "What are the timings?",
    answer: `We are open ${site.hours.toLowerCase()}, every day of the week.`,
  },
  {
    question: "What kind of food does Neyam serve?",
    answer:
      "Authentic Bangalore-style South Indian breakfast — Benne Dose from Bengaluru, Davangere Dose, thatte idli, medu and dal wada, Bisibele Baath, Puliyogare Baath, and filter kaapi brewed on the premises.",
  },
  {
    question: "Is the food vegetarian?",
    answer:
      "Yes. Everything on the Neyam menu is vegetarian.",
  },
  {
    question: "What does 'Neyam' mean?",
    answer:
      "It comes from ney — ghee. It is the ingredient the kitchen is built around, from the Benne Dose to the Ghee Pudi Idli.",
  },
  {
    question: "Do you take bookings?",
    answer:
      "Walk in and take a seat — there is one long community table at the heart of the room, plus regular tables. For a large group, message us on Instagram and we will help.",
  },
];
