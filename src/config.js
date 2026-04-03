/** Wedding date for countdown (local time). */
export const WEDDING_DATE = new Date('2026-06-15T16:00:00');

/** Display text for date and time (e.g. "Saturday, June 15, 2026" and "4:00 PM – 10:00 PM"). */
export const WEDDING_DATE_LABEL = 'Saturday, June 15, 2026';
export const WEDDING_TIME_LABEL = '4:00 PM – 10:00 PM';

/** Couple names — shown in the hero with elegant script font (wife first, then husband). */
export const WIFE_NAME = 'Jane';
export const HUSBAND_NAME = 'John';

/** Optional: use your own images in public/w/ (e.g. hero.jpg, story1.jpg) and set USE_LOCAL_IMAGES = true. */
export const USE_LOCAL_IMAGES = true;

/** Base URL for the app (respects Vite base: './' so images work in dev and when deployed in a subfolder). */
const BASE = import.meta.env.BASE_URL;
const W = `${BASE}w`;

/** Builds a URL for a file in public/w/. Encodes filenames with spaces or & so they load correctly. */
function w(filename) {
  return `${W}/${encodeURIComponent(filename)}`;
}

const U = 'https://images.unsplash.com/photo-';

/** Your images in public/w/ — hero uses wedding ring; story uses couple1–4; gallery shows all. */
export const IMAGES = {
  hero: USE_LOCAL_IMAGES ? w('wedding ring.jpg') : `${U}1519741497674-611481863552?w=1200&q=80`,
  bride: w('bride.jpg'),
  story1: USE_LOCAL_IMAGES ? w('couple1.png') : `${U}1591604466107-236fdc82e5e0?w=800&q=80`,
  story2: USE_LOCAL_IMAGES ? w('couple2.png') : `${U}1525268323442-4433b042a314?w=800&q=80`,
  story3: USE_LOCAL_IMAGES ? w('couple3.png') : `${U}1511285560929-80b456fea0d9?w=800&q=80`,
  story4: USE_LOCAL_IMAGES ? w('couple4.png') : `${U}1465495976277-0387e2586fe4?w=800&q=80`,
  flowers: w('flowers.jpg'),
  whitebackground: w('whitebackground.jpg'),
  /** Card content background (main cream area). Use background2.jpg or background2.png in public/w/. */
  background2: w('background2.png'),
  groomBride: w('grom&bride.jpg'),
  groomBride2: w('grom&bride2.jpg'),
  shoesFlower: w('shoes&flower.jpg'),
  weddingRing: w('wedding ring.jpg'),
  couple5: w('couple5.png'),
  couple6: w('couple6.png'),
  /** Venue image for Where section (place weddingplace1.jpg or weddingplace1.png in public/w/). */
  weddingplace1: w('weddingplace1.jpg'),
  /** Jane & John featured image — put jane-and-john.png (or jane&john.png) in public/w/. */
  j1: w('jane-and-john.png'),
  janeJohn: w('jane-and-john.png'),
  /** Dress code section image — put codedress.png or codedress.jpg in public/w/. */
  codedress: w('codedress.png'),
};

/** Our Moments gallery — couple photos only (no bride). jane&john has its own section. */
export const GALLERY_IMAGES = [
  IMAGES.story1,
  IMAGES.story2,
  IMAGES.groomBride,
  IMAGES.story3,
  IMAGES.story4,
  IMAGES.couple5,
  IMAGES.couple6,
  IMAGES.groomBride2,
];

/** Video & music: videos from public/video/; music from public/music/ folder. */
/** Put your audio file in public/music/ and set MUSIC_FILE to its name — Music button plays/pauses. */
export const MUSIC_FILE = 'Shane Filan - Beautiful In White (Official Video) - ShaneFilanVEVO.mp3';
const MUSIC_PATH = `music/${encodeURIComponent(MUSIC_FILE)}`;
export const MEDIA = {
  music: BASE === './' ? `/${MUSIC_PATH}` : `${BASE}${MUSIC_PATH}`,
};

/** All videos from public/video/ — list your filenames here. */
export const VIDEO_FILES = [
  '182809-869773946_medium.mp4',
  '204803-925552205_medium.mp4',
  '220580_medium.mp4',
  '419-136150040_medium.mp4',
  '421-136181633_medium.mp4',
  '537-137078188_medium.mp4',
];
const VIDEO_FOLDER = `${BASE}video/`;
export const VIDEO_SOURCES = VIDEO_FILES.map((f) => VIDEO_FOLDER + encodeURIComponent(f));

/** Important invite list — names shown with elegant wedding styling. */
export const IMPORTANT_INVITE_LIST = [
  'Mr. & Mrs. John Smith',
  'The Rodriguez Family',
  'Ms. Maria Santos',
  'Dr. James & Anna Lee',
  'The Thompson Family',
];

/** Google Maps: query for "Get directions" link and for the embedded map. Use + for spaces (e.g. 123+Main+St,+City,+State). */
export const MAPS_QUERY = '123+Wedding+Venue+Street,+City,+State+12345';

/** Venue name and address (shown in the Where section). */
export const VENUE_NAME = 'The Garden Estate';
export const VENUE_ADDRESS = '123 Wedding Venue Street, City, State 12345';

/** RSVP deadline — e.g. "June 1, 2026" or "Please respond by June 1, 2026". */
export const RSVP_DEADLINE = 'June 1, 2026';

/** Optional: ceremony and reception times if different (e.g. "Ceremony 4:00 PM · Reception 5:30 PM"). Leave empty to use a single time. */
export const CEREMONY_TIME = '';
export const RECEPTION_TIME = '';

/** Optional: one line each for parking, accommodations, or special notes. Empty string = not shown. */
export const PARKING_INFO = '';
export const ACCOMMODATIONS = '';
export const SPECIAL_NOTES = '';

/** Dress code shown in the details section (e.g. "Formal", "Smart casual", "Black tie optional"). */
export const DRESS_CODE = 'Formal';

/** Wedding colors / palette shown in the details section (e.g. "Navy blue & gold", "Blush, sage & ivory"). */
export const WEDDING_COLORS = 'Navy blue & gold';

/** Hex codes for the color palette swatches (show actual colors). Add as many as you like. */
export const WEDDING_COLOR_PALETTE = ['#1e3a5f', '#c9a227', '#f5f0e6'];

/** Text above the RSVP button (e.g. "Please respond by your fullname"). */
export const RSVP_PROMPT = 'Please respond by your fullname';

/** FAQ — frequently asked questions. Add/remove items; empty array = section hidden. */
export const FAQ = [
  { q: 'What time should I arrive?', a: 'Please arrive by 3:45 PM so we can begin the ceremony at 4:00 PM.' },
  { q: 'Is there parking at the venue?', a: 'Yes, complimentary parking is available at the venue.' },
  { q: 'Can I bring a plus one?', a: 'Your invitation will specify the number of guests. Please RSVP with the names of all attendees.' },
  { q: 'Will the ceremony be indoors or outdoors?', a: 'The ceremony will be held outdoors, with a covered reception to follow.' },
];

/** Short story chapters for "Our Story" (customize names and text). Uses your images from public/w/. */
export const OUR_STORY = [
  {
    title: 'How We Met',
    image: IMAGES.story1,
    text: 'We met on a rainy Tuesday at a small café. What started as a shared umbrella turned into shared dreams. We talked for hours and knew something special had begun.',
  },
  {
    title: 'The First Date',
    image: IMAGES.story2,
    text: 'Our first official date was a sunset by the water. We laughed, we danced, and we promised to keep choosing each other every single day.',
  },
  {
    title: 'The Proposal',
    image: IMAGES.story3,
    text: 'Under the stars, surrounded by the people we love most, one question changed everything. We said yes to forever—and we\'ve never looked back.',
  },
  {
    title: 'Our Next Chapter',
    image: IMAGES.story4,
    text: 'Now we\'re ready to celebrate our love with you. Thank you for being part of our story. We can\'t wait to write the next chapter together.',
  },
];
