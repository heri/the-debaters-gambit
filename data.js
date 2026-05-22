// Game constants and shared utilities.
// Card data lives in cards.js — edit there to add/modify Move and Case Cards.

import { Dimensions } from 'react-native';
import { MOVE_CARDS, CASE_CARDS, HAZARD_CARDS, COUNTER_CARDS } from './cards';

export { MOVE_CARDS, CASE_CARDS, HAZARD_CARDS, COUNTER_CARDS };

// All cards that can appear in a player's hand during a game.
export const ALL_PLAY_CARDS = [...MOVE_CARDS, ...HAZARD_CARDS, ...COUNTER_CARDS];

const { width } = Dimensions.get('window');

export const CARD_W = Math.min(width * 0.88, 360);
export const DEFAULT_DEBATE_SECS = 60;

export const formatTime = s =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export const timerColor = s => (s > 120 ? '#2ECFB0' : s > 60 ? '#F5C842' : '#C0392B');

export const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const NAV_TABS = [
  { id: 'home',    icon: '🏠', label: 'Home' },
  { id: 'game',    icon: '⚔️', label: 'VS' },
  { id: 'dojo',    icon: '🦊', label: 'Dojo' },
  { id: 'account', icon: '👤', label: 'Account' },
  { id: 'help',    icon: '❓', label: 'Help' },
];

const DIFF_ORDER = { EASY: 0, MEDIUM: 1, HARD: 2 };
export const sortedCases = [...CASE_CARDS].sort(
  (a, b) => (DIFF_ORDER[a.difficulty] ?? 1) - (DIFF_ORDER[b.difficulty] ?? 1)
);

// ── Daily Quick Draw ───────────────────────────────────────────────────────
// Deterministic seed from today's date. The same date always produces the
// same pick, so all players see the same daily pairing.
// IMPORTANT: always APPEND new cards in cards.js — inserting in the middle
// changes index positions and breaks the daily seed for that date.

function seededRand(seed) {
  let s = (seed ^ 0x12345678) >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// Returns { caseCard, cards: Card[] } — 1 case + 3 move/hazard cards (no counter).
// Seeded from today's date so everyone sees the same draw on a given day.
export function getDailyDraw() {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  let hash = 5381;
  for (let i = 0; i < today.length; i++) {
    hash = (((hash << 5) + hash) + today.charCodeAt(i)) | 0;
  }
  const rand = seededRand(hash);
  const caseCard = CASE_CARDS[Math.floor(rand() * CASE_CARDS.length)];

  // Pick 3 distinct move/hazard cards using the seeded RNG
  const pool = [...MOVE_CARDS, ...HAZARD_CARDS];
  for (let i = 0; i < 3; i++) {
    const j = i + Math.floor(rand() * (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return { caseCard, cards: pool.slice(0, 3) };
}

// ── Move card dealing (Daily Quick Draw — move cards only) ────────────────
// count: how many cards to deal (default 2; pass 4 to deal for both players at once)
// Forces NOVICE tier until the player has 10+ rounds in history.
export function dealMoveCards(historyLength, count = 2) {
  const pool = historyLength < 10
    ? MOVE_CARDS.filter(c => c.tier === 'BRONZE')
    : MOVE_CARDS;
  const arr = [...pool];
  const n = Math.min(count, arr.length);
  // Partial Fisher-Yates: shuffle only as many positions as needed
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

// ── Full-hand dealing (New Case flow) ─────────────────────────────────────
// Deals from the combined pool: move cards (tier-gated) + hazard + counter.
// count: how many cards to deal total (default 2 per player; pass 4 for both at once).
export function dealCards(historyLength, count = 2) {
  const movePool = historyLength < 10
    ? MOVE_CARDS.filter(c => c.tier === 'BRONZE')
    : MOVE_CARDS;
  const pool = [...movePool, ...HAZARD_CARDS, ...COUNTER_CARDS];
  const arr = [...pool];
  const n = Math.min(count, arr.length);
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

// Draw a single replacement card, excluding cards already in hand.
export function drawOneCard(historyLength, excludeIds = []) {
  const movePool = historyLength < 10
    ? MOVE_CARDS.filter(c => c.tier === 'BRONZE')
    : MOVE_CARDS;
  const pool = [...movePool, ...HAZARD_CARDS, ...COUNTER_CARDS]
    .filter(c => !excludeIds.includes(c.id));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
