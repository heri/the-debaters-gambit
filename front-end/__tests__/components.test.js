jest.mock('../styles', () => ({ C: {}, S: {} }));

import {
  cardBadgeText,
  handBadgeText,
  Btn,
  ToggleRow,
  MoveCardView,
  CaseCardView,
  CaseBanner,
  MovePickRow,
  CardBrowser,
  HandPanel,
  BottomNav,
} from '../components';

// ── cardBadgeText ──────────────────────────────────────────────────────────

describe('cardBadgeText', () => {
  test('hazard card', () => {
    expect(cardBadgeText({ cardType: 'hazard' })).toBe('HAZARD CARD  ·  CHAOS');
  });

  test('counter card', () => {
    expect(cardBadgeText({ cardType: 'counter' })).toBe('COUNTER CARD  ·  INTERRUPT');
  });

  test('joker card', () => {
    expect(cardBadgeText({ cardType: 'joker' })).toBe('JOKER CARD  ·  HAZARD CANCEL');
  });

  test('filibuster card', () => {
    expect(cardBadgeText({ cardType: 'filibuster' })).toBe('FILIBUSTER CARD  ·  SKIP TURN');
  });

  test('delegate card', () => {
    expect(cardBadgeText({ cardType: 'delegate' })).toBe('DELEGATE CARD  ·  PASS TURN');
  });

  test('move card includes tier and tierLabel', () => {
    expect(cardBadgeText({ cardType: 'move', tier: 'BRONZE', tierLabel: 'NOVICE' }))
      .toBe('MOVE CARD  ·  BRONZE  ·  NOVICE');
  });

  test('move card with GOLD tier', () => {
    expect(cardBadgeText({ cardType: 'move', tier: 'GOLD', tierLabel: 'MASTER' }))
      .toBe('MOVE CARD  ·  GOLD  ·  MASTER');
  });

  test('returns a non-empty string for every cardType', () => {
    const types = ['hazard', 'counter', 'joker', 'filibuster', 'delegate'];
    types.forEach(cardType => {
      const text = cardBadgeText({ cardType });
      expect(typeof text).toBe('string');
      expect(text.length).toBeGreaterThan(0);
    });
  });
});

// ── handBadgeText ──────────────────────────────────────────────────────────

describe('handBadgeText', () => {
  test('hazard card', () => {
    expect(handBadgeText({ cardType: 'hazard' })).toBe('HAZARD');
  });

  test('counter card', () => {
    expect(handBadgeText({ cardType: 'counter' })).toBe('COUNTER');
  });

  test('joker card', () => {
    expect(handBadgeText({ cardType: 'joker' })).toBe('JOKER');
  });

  test('filibuster card', () => {
    expect(handBadgeText({ cardType: 'filibuster' })).toBe('FILIBUSTER');
  });

  test('delegate card', () => {
    expect(handBadgeText({ cardType: 'delegate' })).toBe('DELEGATE');
  });

  test('move card includes tier', () => {
    expect(handBadgeText({ cardType: 'move', tier: 'BRONZE' })).toBe('MOVE  ·  BRONZE');
    expect(handBadgeText({ cardType: 'move', tier: 'SILVER' })).toBe('MOVE  ·  SILVER');
    expect(handBadgeText({ cardType: 'move', tier: 'GOLD' })).toBe('MOVE  ·  GOLD');
  });

  test('handBadgeText is shorter than cardBadgeText for all special types', () => {
    const types = ['hazard', 'counter', 'joker', 'filibuster', 'delegate'];
    types.forEach(cardType => {
      const hand = handBadgeText({ cardType });
      const card = cardBadgeText({ cardType });
      expect(hand.length).toBeLessThan(card.length);
    });
  });
});

// ── cardBadgeText / handBadgeText — consistency check ─────────────────────

describe('cardBadgeText and handBadgeText consistency', () => {
  const TYPES = ['hazard', 'counter', 'joker', 'filibuster', 'delegate'];

  test('every cardBadgeText starts with the corresponding handBadgeText keyword', () => {
    TYPES.forEach(cardType => {
      const hand = handBadgeText({ cardType });
      const card = cardBadgeText({ cardType });
      expect(card).toContain(hand);
    });
  });
});

// ── Module exports smoke test ──────────────────────────────────────────────

describe('components.js exports', () => {
  test('all expected components are exported as functions', () => {
    const components = {
      Btn, ToggleRow, MoveCardView, CaseCardView, CaseBanner,
      MovePickRow, CardBrowser, HandPanel, BottomNav,
    };
    Object.entries(components).forEach(([name, comp]) => {
      expect(typeof comp).toBe('function');
    });
  });
});
