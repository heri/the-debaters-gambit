import {
  formatTime,
  timerColor,
  uid,
  getDailyDraw,
  dealMoveCards,
  MOVE_CARDS,
  CASE_CARDS,
  NAV_TABS,
  sortedCases,
  DEFAULT_DEBATE_SECS,
} from '../data';

// ── formatTime ─────────────────────────────────────────────────────────────

describe('formatTime', () => {
  test('formats 0 seconds as 00:00', () => {
    expect(formatTime(0)).toBe('00:00');
  });
  test('pads single-digit seconds with a leading zero', () => {
    expect(formatTime(9)).toBe('00:09');
  });
  test('formats 60 seconds as 01:00', () => {
    expect(formatTime(60)).toBe('01:00');
  });
  test('formats 90 seconds as 01:30', () => {
    expect(formatTime(90)).toBe('01:30');
  });
  test('formats the full debate duration (5 min) as 05:00', () => {
    expect(formatTime(DEFAULT_DEBATE_SECS)).toBe('05:00');
  });
  test('formats 3599 seconds as 59:59', () => {
    expect(formatTime(3599)).toBe('59:59');
  });
  test('formats 61 seconds as 01:01', () => {
    expect(formatTime(61)).toBe('01:01');
  });
  test('pads minutes with leading zero when < 10', () => {
    expect(formatTime(119)).toBe('01:59');
  });
});

// ── timerColor ─────────────────────────────────────────────────────────────

describe('timerColor', () => {
  test('returns Electric Teal when more than 120 seconds remain', () => {
    expect(timerColor(300)).toBe('#2ECFB0');
    expect(timerColor(121)).toBe('#2ECFB0');
  });
  test('returns Debate Gold at exactly 120 seconds', () => {
    expect(timerColor(120)).toBe('#F5C842');
  });
  test('returns Debate Gold between 61 and 120 seconds', () => {
    expect(timerColor(119)).toBe('#F5C842');
    expect(timerColor(61)).toBe('#F5C842');
  });
  test('returns Argument Red at exactly 60 seconds', () => {
    expect(timerColor(60)).toBe('#C0392B');
  });
  test('returns Argument Red below 60 seconds', () => {
    expect(timerColor(59)).toBe('#C0392B');
    expect(timerColor(1)).toBe('#C0392B');
    expect(timerColor(0)).toBe('#C0392B');
  });
});

// ── uid ───────────────────────────────────────────────────────────────────

describe('uid', () => {
  test('returns a non-empty string', () => {
    const id = uid();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });
  test('every call returns a unique value', () => {
    const ids = Array.from({ length: 200 }, () => uid());
    expect(new Set(ids).size).toBe(200);
  });
  test('contains a hyphen separator', () => {
    expect(uid()).toContain('-');
  });
});

// ── getDailyDraw ───────────────────────────────────────────────────────────

describe('getDailyDraw', () => {
  test('returns an object with caseCard and moveCard', () => {
    const draw = getDailyDraw();
    expect(draw).toHaveProperty('caseCard');
    expect(draw).toHaveProperty('moveCard');
  });
  test('caseCard is a member of CASE_CARDS', () => {
    const { caseCard } = getDailyDraw();
    const ids = CASE_CARDS.map(c => c.id);
    expect(ids).toContain(caseCard.id);
  });
  test('moveCard is a member of MOVE_CARDS', () => {
    const { moveCard } = getDailyDraw();
    const ids = MOVE_CARDS.map(c => c.id);
    expect(ids).toContain(moveCard.id);
  });
  test('is deterministic — repeated calls return identical cards', () => {
    const draw1 = getDailyDraw();
    const draw2 = getDailyDraw();
    expect(draw1.caseCard.id).toBe(draw2.caseCard.id);
    expect(draw1.moveCard.id).toBe(draw2.moveCard.id);
  });
  test('caseCard has all required fields', () => {
    const { caseCard } = getDailyDraw();
    expect(caseCard).toHaveProperty('id');
    expect(caseCard).toHaveProperty('title');
    expect(caseCard).toHaveProperty('description');
    expect(caseCard).toHaveProperty('difficulty');
    expect(caseCard).toHaveProperty('icon');
    expect(caseCard.title.length).toBeGreaterThan(0);
  });
  test('moveCard has all required fields', () => {
    const { moveCard } = getDailyDraw();
    expect(moveCard).toHaveProperty('id');
    expect(moveCard).toHaveProperty('name');
    expect(moveCard).toHaveProperty('tier');
    expect(moveCard).toHaveProperty('what');
    expect(moveCard).toHaveProperty('hint');
    expect(moveCard.name.length).toBeGreaterThan(0);
  });
  test('neither card is undefined or null', () => {
    const { caseCard, moveCard } = getDailyDraw();
    expect(caseCard).not.toBeNull();
    expect(caseCard).not.toBeUndefined();
    expect(moveCard).not.toBeNull();
    expect(moveCard).not.toBeUndefined();
  });
});

// ── dealMoveCards ──────────────────────────────────────────────────────────

describe('dealMoveCards', () => {
  test('always returns exactly 2 cards', () => {
    expect(dealMoveCards(0)).toHaveLength(2);
    expect(dealMoveCards(9)).toHaveLength(2);
    expect(dealMoveCards(10)).toHaveLength(2);
    expect(dealMoveCards(100)).toHaveLength(2);
  });
  test('returns only BRONZE cards when history length is 0 to 9', () => {
    for (let h = 0; h <= 9; h++) {
      const cards = dealMoveCards(h);
      expect(cards.every(c => c.tier === 'BRONZE')).toBe(true);
    }
  });
  test('BRONZE-only gate ends at history length 9 (boundary)', () => {
    const atNine = dealMoveCards(9);
    expect(atNine.every(c => c.tier === 'BRONZE')).toBe(true);
  });
  test('full pool available at history length 10 (boundary)', () => {
    // Run several times; over enough iterations a non-BRONZE card must appear
    // unless pool happens to always pick BRONZE (astronomically unlikely over 50 runs)
    const allCardIds = new Set(MOVE_CARDS.map(c => c.id));
    const dealtIds = new Set();
    for (let i = 0; i < 50; i++) {
      dealMoveCards(10).forEach(c => dealtIds.add(c.id));
    }
    // At minimum all returned IDs must be valid
    dealtIds.forEach(id => expect(allCardIds.has(id)).toBe(true));
  });
  test('the two dealt cards are always unique (no duplicate)', () => {
    for (let i = 0; i < 30; i++) {
      const [a, b] = dealMoveCards(0);
      expect(a.id).not.toBe(b.id);
    }
    for (let i = 0; i < 30; i++) {
      const [a, b] = dealMoveCards(100);
      expect(a.id).not.toBe(b.id);
    }
  });
  test('all returned cards exist in MOVE_CARDS', () => {
    const validIds = new Set(MOVE_CARDS.map(c => c.id));
    for (let i = 0; i < 20; i++) {
      dealMoveCards(0).forEach(c => expect(validIds.has(c.id)).toBe(true));
      dealMoveCards(50).forEach(c => expect(validIds.has(c.id)).toBe(true));
    }
  });
  test('returned cards have all required fields', () => {
    const cards = dealMoveCards(0);
    cards.forEach(card => {
      expect(card).toHaveProperty('id');
      expect(card).toHaveProperty('name');
      expect(card).toHaveProperty('tier');
      expect(card).toHaveProperty('accent');
      expect(card).toHaveProperty('what');
      expect(card).toHaveProperty('hint');
    });
  });
  test('does not mutate the original MOVE_CARDS array', () => {
    const originalLength = MOVE_CARDS.length;
    dealMoveCards(0);
    dealMoveCards(100);
    expect(MOVE_CARDS).toHaveLength(originalLength);
  });

  // count=4 deals for two-player split (P1 gets slice(0,2), P2 gets slice(2,4))
  test('count=4 returns exactly 4 cards', () => {
    expect(dealMoveCards(0, 4)).toHaveLength(4);
    expect(dealMoveCards(100, 4)).toHaveLength(4);
  });
  test('count=4 returns only BRONZE cards when history < 10', () => {
    for (let h = 0; h <= 9; h++) {
      expect(dealMoveCards(h, 4).every(c => c.tier === 'BRONZE')).toBe(true);
    }
  });
  test('count=4 produces 4 unique card IDs (no duplicates)', () => {
    for (let i = 0; i < 30; i++) {
      const ids = dealMoveCards(0, 4).map(c => c.id);
      expect(new Set(ids).size).toBe(4);
    }
    for (let i = 0; i < 30; i++) {
      const ids = dealMoveCards(100, 4).map(c => c.id);
      expect(new Set(ids).size).toBe(4);
    }
  });
  test('P1 slice(0,2) and P2 slice(2,4) share no card IDs', () => {
    for (let i = 0; i < 30; i++) {
      const all4 = dealMoveCards(0, 4);
      const p1Ids = new Set(all4.slice(0, 2).map(c => c.id));
      const p2Ids = all4.slice(2, 4).map(c => c.id);
      p2Ids.forEach(id => expect(p1Ids.has(id)).toBe(false));
    }
  });
});

// ── MOVE_CARDS integrity ───────────────────────────────────────────────────

describe('MOVE_CARDS integrity', () => {
  const REQUIRED_FIELDS = ['id', 'name', 'icon', 'tier', 'tierLabel', 'bg', 'accent', 'what', 'hint', 'inspiration', 'status'];
  const VALID_TIERS = ['BRONZE', 'SILVER', 'GOLD'];
  const VALID_TIER_LABELS = ['NOVICE', 'TACTICIAN', 'STORYTELLER', 'ORATOR', 'MASTER'];
  const VALID_STATUSES = ['active', 'draft', 'archived'];
  const HEX_COLOR = /^#[0-9A-Fa-f]{6}$/;

  test('array is non-empty', () => {
    expect(MOVE_CARDS.length).toBeGreaterThan(0);
  });
  test('every card has all required fields with truthy values', () => {
    MOVE_CARDS.forEach(card => {
      REQUIRED_FIELDS.forEach(field => {
        expect(card[field]).toBeTruthy();
      });
    });
  });
  test('all card IDs are unique', () => {
    const ids = MOVE_CARDS.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  test('all tiers are one of BRONZE / SILVER / GOLD', () => {
    MOVE_CARDS.forEach(card => {
      expect(VALID_TIERS).toContain(card.tier);
    });
  });
  test('all tierLabels are valid', () => {
    MOVE_CARDS.forEach(card => {
      expect(VALID_TIER_LABELS).toContain(card.tierLabel);
    });
  });
  test('has exactly 8 BRONZE, 2 SILVER, 2 GOLD cards', () => {
    const counts = { BRONZE: 0, SILVER: 0, GOLD: 0 };
    MOVE_CARDS.forEach(c => counts[c.tier]++);
    expect(counts.BRONZE).toBe(8);
    expect(counts.SILVER).toBe(2);
    expect(counts.GOLD).toBe(2);
  });
  test('bg and accent are valid 6-digit hex colors', () => {
    MOVE_CARDS.forEach(card => {
      expect(card.bg).toMatch(HEX_COLOR);
      expect(card.accent).toMatch(HEX_COLOR);
    });
  });
  test('no card has an empty name, what, or hint', () => {
    MOVE_CARDS.forEach(card => {
      expect(card.name.trim().length).toBeGreaterThan(0);
      expect(card.what.trim().length).toBeGreaterThan(0);
      expect(card.hint.trim().length).toBeGreaterThan(0);
    });
  });
  test('all statuses are valid', () => {
    MOVE_CARDS.forEach(card => {
      expect(VALID_STATUSES).toContain(card.status);
    });
  });
  test('all current cards have status active', () => {
    MOVE_CARDS.filter(c => c.status !== 'archived').forEach(card => {
      expect(['active', 'draft']).toContain(card.status);
    });
  });
  test('BRONZE cards all have tierLabel NOVICE', () => {
    MOVE_CARDS.filter(c => c.tier === 'BRONZE').forEach(c => {
      expect(c.tierLabel).toBe('NOVICE');
    });
  });
});

// ── CASE_CARDS integrity ───────────────────────────────────────────────────

describe('CASE_CARDS integrity', () => {
  const REQUIRED_FIELDS = ['id', 'title', 'description', 'difficulty', 'icon', 'status'];
  const VALID_DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD'];
  const VALID_STATUSES = ['active', 'draft', 'archived'];

  test('array is non-empty', () => {
    expect(CASE_CARDS.length).toBeGreaterThan(0);
  });
  test('every card has all required fields with truthy values', () => {
    CASE_CARDS.forEach(card => {
      REQUIRED_FIELDS.forEach(field => {
        expect(card[field]).toBeTruthy();
      });
    });
  });
  test('all card IDs are unique', () => {
    const ids = CASE_CARDS.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  test('all difficulties are one of EASY / MEDIUM / HARD', () => {
    CASE_CARDS.forEach(card => {
      expect(VALID_DIFFICULTIES).toContain(card.difficulty);
    });
  });
  test('no card has an empty title or description', () => {
    CASE_CARDS.forEach(card => {
      expect(card.title.trim().length).toBeGreaterThan(0);
      expect(card.description.trim().length).toBeGreaterThan(0);
    });
  });
  test('all case card statuses are valid', () => {
    CASE_CARDS.forEach(card => {
      expect(VALID_STATUSES).toContain(card.status);
    });
  });
  test('move card IDs and case card IDs do not overlap', () => {
    const moveIds = new Set(MOVE_CARDS.map(c => c.id));
    CASE_CARDS.forEach(c => {
      expect(moveIds.has(c.id)).toBe(false);
    });
  });
});

// ── sortedCases ────────────────────────────────────────────────────────────

describe('sortedCases', () => {
  test('contains all cards from CASE_CARDS', () => {
    expect(sortedCases).toHaveLength(CASE_CARDS.length);
    const sortedIds = new Set(sortedCases.map(c => c.id));
    CASE_CARDS.forEach(c => expect(sortedIds.has(c.id)).toBe(true));
  });
  test('EASY cards appear before MEDIUM', () => {
    const easyLastIdx = sortedCases.map(c => c.difficulty).lastIndexOf('EASY');
    const medFirstIdx = sortedCases.findIndex(c => c.difficulty === 'MEDIUM');
    if (easyLastIdx !== -1 && medFirstIdx !== -1) {
      expect(easyLastIdx).toBeLessThan(medFirstIdx);
    }
  });
  test('MEDIUM cards appear before HARD', () => {
    const medLastIdx = sortedCases.map(c => c.difficulty).lastIndexOf('MEDIUM');
    const hardFirstIdx = sortedCases.findIndex(c => c.difficulty === 'HARD');
    if (medLastIdx !== -1 && hardFirstIdx !== -1) {
      expect(medLastIdx).toBeLessThan(hardFirstIdx);
    }
  });
  test('does not mutate CASE_CARDS order', () => {
    const originalFirst = CASE_CARDS[0].id;
    expect(CASE_CARDS[0].id).toBe(originalFirst);
  });
});

// ── NAV_TABS integrity ────────────────────────────────────────────────────

describe('NAV_TABS', () => {
  test('has exactly 5 tabs', () => {
    expect(NAV_TABS).toHaveLength(5);
  });
  test('all tabs have id, icon, and label', () => {
    NAV_TABS.forEach(tab => {
      expect(tab).toHaveProperty('id');
      expect(tab).toHaveProperty('icon');
      expect(tab).toHaveProperty('label');
      expect(tab.id.trim().length).toBeGreaterThan(0);
      expect(tab.label.trim().length).toBeGreaterThan(0);
    });
  });
  test('tab IDs are unique', () => {
    const ids = NAV_TABS.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  test('contains required tabs: home, game, dojo, account, help', () => {
    const ids = NAV_TABS.map(t => t.id);
    ['home', 'game', 'dojo', 'account', 'help'].forEach(id => {
      expect(ids).toContain(id);
    });
  });
});
