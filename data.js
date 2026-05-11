// Card data, game constants, and shared utilities.
// Add new Move Cards and Case Cards here.

import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const CARD_W = Math.min(width * 0.88, 360);
export const DEBATE_SECS = 5 * 60;

export const formatTime = s =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export const timerColor = s => (s > 120 ? '#2ECFB0' : s > 60 ? '#F5C842' : '#C0392B');

export const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const NAV_TABS = [
  { id: 'home',    icon: '🏠', label: 'Home' },
  { id: 'game',    icon: '⚔️', label: 'New Case' },
  { id: 'dojo',    icon: '🦊', label: 'Dojo' },
  { id: 'account', icon: '👤', label: 'Account' },
  { id: 'help',    icon: '❓', label: 'Help' },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MOVE CARDS — copy an existing entry to add more
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const MOVE_CARDS = [
  // ── BRONZE tier — easiest, character-inspired ──────────────────────────
  {
    id: 'm-b1', name: 'THE FAIR PLAY', icon: '🚩⚖️',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A0000', accent: '#F87171',
    description:
      'Appeal to fairness and the rules. State clearly what the right thing to do is — loudly and with total certainty. Make your opponent feel like they are breaking a rule that everyone already knows.',
    inspiration: 'Hermione Granger',
  },
  {
    id: 'm-b2', name: 'THE KIND HEART', icon: '🧥💗',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A0A12', accent: '#F9A8D4',
    description:
      "Speak slowly, warmly, and with total sincerity. Acknowledge your opponent's feelings first — then gently explain why your side is the kinder, more caring choice for everyone.",
    inspiration: 'Mister Rogers',
  },
  {
    id: 'm-b3', name: 'THE GOLDEN RULE', icon: '🪙🤝',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#0A1A15', accent: '#6EE7B7',
    description:
      'Find the deeper "why" behind the whole debate. Then show that following your argument is the brave, necessary thing to do — not just for yourself, but for everyone who comes after.',
    inspiration: 'Moana',
  },
  {
    id: 'm-b4', name: 'THE PINKY PROMISE', icon: '🤞✨',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A1200', accent: '#FCD34D',
    description:
      'Make a heartfelt, unbreakable promise that your position will lead to the best possible outcome. Speak with such earnest, total conviction that no one can doubt your sincerity.',
    inspiration: 'Pinocchio (reformed)',
  },
  {
    id: 'm-b5', name: 'THE TEAM', icon: '🐾⭐',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#000D1A', accent: '#93C5FD',
    description:
      "Forget \"me vs. you.\" Show how your position helps everybody — the whole family, the whole class, the whole world. The best argument isn't the one that wins; it's the one that takes care of the team.",
    inspiration: 'Paw Patrol',
  },
  {
    id: 'm-b6', name: 'THE BEST FRIEND', icon: '🤠👢',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A0A00', accent: '#FDBA74',
    description:
      'Stick to your principles, no matter what. Calmly and loyally defend your position with the quiet confidence of someone who knows exactly who they are — no matter how much pressure is applied.',
    inspiration: 'Woody',
  },
  {
    id: 'm-b7', name: "THE LION'S COURAGE", icon: '🦁🌄',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A1200', accent: '#FDE68A',
    description:
      "Own your argument with royal confidence. If there are weaknesses in your position, admit them clearly — then show why you've thought them through, and why your answer is still the right one.",
    inspiration: 'Simba',
  },
  {
    id: 'm-b8', name: 'BE RESPONSIBLE', icon: '⭐🛡️',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#0F001A', accent: '#C4B5FD',
    description:
      "Argue not just for what you want, but for what's good and fair for everyone around you. Show that choosing your side is the responsible, grown-up, caring thing to do.",
    inspiration: 'Steven Universe',
  },
  // ── SILVER tier ────────────────────────────────────────────────────────
  {
    id: 'm1', name: 'THE CHARMING BLUFF', icon: '🗡️🎭',
    tier: 'SILVER', tierLabel: 'TACTICIAN',
    bg: '#1C2333', accent: '#A0AEC0',
    description:
      'Say something completely ridiculous or wildly exaggerated — but deliver it with 100% unbreakable confidence. Make your opponent doubt their own sanity.',
    inspiration: 'Locke Lamora',
  },
  {
    id: 'm3', name: 'THE HONEST TALE', icon: '🎩🪵',
    tier: 'SILVER', tierLabel: 'STORYTELLER',
    bg: '#1A1200', accent: '#C8A96E',
    description:
      'Instead of debating aggressively, tell a short, relatable, folksy story or fable. Frame your argument so it sounds like common sense and humble wisdom.',
    inspiration: 'Abraham Lincoln',
  },
  // ── GOLD tier ──────────────────────────────────────────────────────────
  {
    id: 'm2', name: 'PAINT THE FUTURE', icon: '🌅🎨',
    tier: 'GOLD', tierLabel: 'ORATOR',
    bg: '#2D1B00', accent: '#ECC94B',
    description:
      "Abandon the present argument entirely. Paint a vivid, irresistible picture of a better world. Make them feel the future so powerfully they forget what they were arguing about.",
    inspiration: 'Barack Obama',
  },
  {
    id: 'm4', name: 'THE BRIDGE BUILDER', icon: '🤝🧱',
    tier: 'GOLD', tierLabel: 'MASTER',
    bg: '#001A10', accent: '#68D391',
    description:
      "Do not attack. Instead, find a surprising common ground between you and your opponent. Then show why your solution is the best way to achieve what *both* of you want.",
    inspiration: 'Nelson Mandela',
  },
  // ── Add more Move Cards below ──────────────────────────────────────────
  // { id: 'm5', name: 'CARD NAME', icon: '🔥', tier: 'BRONZE', tierLabel: 'NOVICE',
  //   bg: '#1A0000', accent: '#FC8181', description: '...', inspiration: 'Name' },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CASE CARDS — copy an existing entry to add more
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CASE_CARDS = [
  // ── Kid-friendly EASY cases ────────────────────────────────────────────
  {
    id: 'c-k01', icon: '🦸📚', difficulty: 'EASY',
    title: 'SUPERHEROES WOULD MAKE TERRIBLE TEACHERS',
    description: "One side argues that flying, laser eyes, and saving the world make it impossible to run an orderly classroom. The other argues superpowers would make the best teachers imaginable.",
  },
  {
    id: 'c-k02', icon: '🎮📝', difficulty: 'EASY',
    title: 'VIDEO GAMES SHOULD COUNT AS HOMEWORK',
    description: "One player argues that gaming builds real skills — strategy, reflexes, and teamwork — that belong in any school curriculum. The other defends the value of traditional homework.",
  },
  {
    id: 'c-k03', icon: '🍦🧠', difficulty: 'EASY',
    title: 'ICE CREAM FOR BREAKFAST WOULD MAKE KIDS SMARTER',
    description: "One side argues happiness, sugar, and cold dairy first thing in the morning is the secret to a sharper brain. The other defends why breakfast rules exist.",
  },
  {
    id: 'c-k04', icon: '🐶💛', difficulty: 'EASY',
    title: "DOGS ARE TOO GOOD FOR US AND HUMANS DON'T DESERVE THEM",
    description: "One player argues dogs are so loyal, so loving, and so patient that humanity has simply not earned them. The other defends humanity's worthiness of its best friend.",
  },
  {
    id: 'c-k05', icon: '📚🌐', difficulty: 'EASY',
    title: 'LIBRARIES ARE MORE POWERFUL THAN THE INTERNET',
    description: "One side argues that silence, physical books, and a librarian's wisdom outperform any search engine. The other defends the limitless reach of the internet.",
  },
  {
    id: 'c-k06', icon: '🦕🧐', difficulty: 'EASY',
    title: 'DINOSAURS WERE SECRETLY MUCH SMARTER THAN WE THINK',
    description: "One player builds the case for underestimated dinosaur intelligence. The other defends the scientific evidence as it stands.",
  },
  {
    id: 'c-k07', icon: '🧦🛏️', difficulty: 'EASY',
    title: 'WEARING SOCKS TO BED IS THE CORRECT WAY TO SLEEP',
    description: "One side defends cosy, warm feet as the pinnacle of civilised bedtime behaviour. The other argues bare feet are the only acceptable option.",
  },
  {
    id: 'c-k08', icon: '🌮📐', difficulty: 'EASY',
    title: 'TACOS ARE MATHEMATICALLY THE PERFECT FOOD',
    description: "One player builds a scientific and philosophical case for the taco as the peak of culinary engineering. The other challenges this audacious claim.",
  },
  {
    id: 'c-k09', icon: '🚀👶', difficulty: 'EASY',
    title: 'CHILDREN SHOULD BE FIRST IN LINE TO GO TO SPACE',
    description: "One side argues kids are braver, more adaptable, and more curious — the perfect astronauts. The other defends why adults must lead the way.",
  },
  {
    id: 'c-k10', icon: '🤖🏫', difficulty: 'EASY',
    title: 'IF ROBOTS LIVE AMONG US THEY SHOULD HAVE TO GO TO SCHOOL',
    description: "One player argues that robots need to learn the rules of society just like everyone else. The other challenges whether robots need school at all.",
  },
  {
    id: 'c-k11', icon: '🦄🦴', difficulty: 'EASY',
    title: 'UNICORNS WERE REAL ANIMALS THAT SIMPLY WENT EXTINCT',
    description: "One side builds a compelling historical and scientific case for unicorns as real creatures. The other defends what we actually know about the fossil record.",
  },
  // ── Classic EASY cases ─────────────────────────────────────────────────
  {
    id: 'c1', icon: '🌙', difficulty: 'EASY',
    title: 'KIDS SHOULD DECIDE THEIR OWN BEDTIME',
    description: "One side defends the child's right to self-govern their sleep. The other upholds parental bedtime law. May the sharpest tongue win.",
  },
  {
    id: 'c2', icon: '🍕', difficulty: 'EASY',
    title: 'PIZZA IS A PERFECTLY VALID BREAKFAST FOOD',
    description: "One player stands for the glory of morning pizza. The other defends the sacred tradition of breakfast. Convince — or be convinced.",
  },
  {
    id: 'c3', icon: '🐱🕵️', difficulty: 'EASY',
    title: 'CATS WOULD MAKE FAR BETTER UNDERCOVER SECRET AGENTS THAN DOGS',
    description: "One side argues that cats are the perfect covert operatives. The other defends dogs as the ultimate agents of justice.",
  },
  {
    id: 'c4', icon: '🌭⚖️', difficulty: 'EASY', focus: 'Definitions & Semantics',
    title: 'HOT DOGS TECHNICALLY AND LEGALLY COUNT AS SANDWICHES',
    description: "A battle of definitions and semantics. One player argues the hot dog is a sandwich. The other defends culinary tradition.",
  },
  // ── MEDIUM cases ───────────────────────────────────────────────────────
  {
    id: 'c5', icon: '👽🌍', difficulty: 'MEDIUM', focus: 'Conspiracy vs. Logic',
    title: 'ALIENS DEFINITELY EXIST AND ARE CURRENTLY HIDING ON EARTH',
    description: "One player argues for the existence and presence of extraterrestrial life on Earth. The other defends logic and the burden of evidence.",
  },
  // ── HARD cases ─────────────────────────────────────────────────────────
  {
    id: 'c6', icon: '🪄⚙️', difficulty: 'HARD', focus: 'Chaos vs. Order',
    title: 'A WORLD GOVERNED BY MAGIC WOULD BE WORSE THAN ONE GOVERNED BY TECHNOLOGY',
    description: "One player defends the order and progress of technology. The other argues for the limitless possibilities of magic.",
  },
  // ── Add more Case Cards below ──────────────────────────────────────────
  // { id: 'c7', icon: '⚡', difficulty: 'MEDIUM', title: 'CASE TITLE', description: '...' },
];

const DIFF_ORDER = { EASY: 0, MEDIUM: 1, HARD: 2 };
export const sortedCases = [...CASE_CARDS].sort(
  (a, b) => (DIFF_ORDER[a.difficulty] ?? 1) - (DIFF_ORDER[b.difficulty] ?? 1)
);

// ── Daily Quick Draw ───────────────────────────────────────────────────────
// Deterministic seed from today's date. The same date always produces the
// same pick, so all players see the same daily pairing.
// IMPORTANT: always APPEND new cards to the arrays above — inserting in the
// middle changes index positions and breaks the daily seed for that day.

function seededRand(seed) {
  let s = (seed ^ 0x12345678) >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function getDailyDraw() {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  let hash = 5381;
  for (let i = 0; i < today.length; i++) {
    hash = (((hash << 5) + hash) + today.charCodeAt(i)) | 0;
  }
  const rand = seededRand(hash);
  return {
    caseCard: CASE_CARDS[Math.floor(rand() * CASE_CARDS.length)],
    moveCard: MOVE_CARDS[Math.floor(rand() * MOVE_CARDS.length)],
  };
}

// ── Move card dealing (New Case flow) ─────────────────────────────────────
// Deals 2 unique random cards. Forces NOVICE tier until the player has
// completed 10 rounds of history (gradual difficulty ramp).

export function dealMoveCards(historyLength) {
  const pool = historyLength < 10
    ? MOVE_CARDS.filter(c => c.tier === 'BRONZE')
    : MOVE_CARDS;
  const arr = [...pool];
  // Partial Fisher-Yates: shuffle first 2 positions only
  for (let i = 0; i < 2 && i < arr.length; i++) {
    const j = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(2, arr.length));
}
