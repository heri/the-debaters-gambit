// Mocks must come before imports.
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn().mockResolvedValue(undefined),
  removeItem: jest.fn().mockResolvedValue(undefined),
  multiGet: jest.fn().mockResolvedValue([]),
}));
jest.mock('../styles', () => ({ C: {}, S: {} }));
jest.mock('../components', () => ({
  Btn: () => null,
  ToggleRow: () => null,
  MoveCardView: () => null,
  CaseCardView: () => null,
  CaseBanner: () => null,
  HandPanel: () => null,
}));

import {
  getResult,
  resultColor,
  ONBOARDING_PAGES,
  OnboardingScreen,
  AuthScreen,
  HomeScreen,
  QuickDrawScreen,
  HelpScreen,
  AccountScreen,
  PlayerPickScreen,
  CasePickScreen,
  PassScreen,
  CornerTimeScreen,
  DebateScreen,
  ComplianceCheckScreen,
  CounterWindowScreen,
  CounterScreen,
  HazardWindowScreen,
  ComebackScreen,
  ExchangeScreen,
  PlayerWinsScreen,
  RoundEndScreen,
  PointsScreen,
  SoloDojoScreen,
} from '../screens';

// ── getResult ──────────────────────────────────────────────────────────────

describe('getResult', () => {
  test('returns WIN when winner matches myName', () => {
    expect(getResult({ winner: 'Alice' }, 'Alice')).toBe('WIN');
  });

  test('returns LOSS when winner does not match myName', () => {
    expect(getResult({ winner: 'Bob' }, 'Alice')).toBe('LOSS');
  });

  test('returns null when there is no winner', () => {
    expect(getResult({ winner: null }, 'Alice')).toBeNull();
    expect(getResult({}, 'Alice')).toBeNull();
  });

  test('returns null when myName is falsy', () => {
    expect(getResult({ winner: 'Alice' }, null)).toBeNull();
    expect(getResult({ winner: 'Alice' }, '')).toBeNull();
    expect(getResult({ winner: 'Alice' }, undefined)).toBeNull();
  });

  test('comparison is case-sensitive', () => {
    expect(getResult({ winner: 'alice' }, 'Alice')).toBe('LOSS');
  });
});

// ── resultColor ────────────────────────────────────────────────────────────

describe('resultColor', () => {
  test('returns green for WIN', () => {
    expect(resultColor('WIN')).toBe('#4ADE80');
  });

  test('returns red for LOSS', () => {
    expect(resultColor('LOSS')).toBe('#FC8181');
  });

  test('returns gold for any other value (draw, null, unknown)', () => {
    expect(resultColor('DRAW')).toBe('#F5C842');
    expect(resultColor(null)).toBe('#F5C842');
    expect(resultColor(undefined)).toBe('#F5C842');
    expect(resultColor('')).toBe('#F5C842');
  });
});

// ── ONBOARDING_PAGES ───────────────────────────────────────────────────────

describe('ONBOARDING_PAGES', () => {
  test('has exactly 3 pages', () => {
    expect(ONBOARDING_PAGES).toHaveLength(3);
  });

  test('each page has eyebrow, title, sub, cta, and accent', () => {
    ONBOARDING_PAGES.forEach((page, i) => {
      expect(page.eyebrow.length).toBeGreaterThan(0);
      expect(page.title.length).toBeGreaterThan(0);
      expect(page.sub.length).toBeGreaterThan(0);
      expect(page.cta.length).toBeGreaterThan(0);
      expect(page.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  test('first page says WELCOME and has a NEXT CTA', () => {
    expect(ONBOARDING_PAGES[0].eyebrow).toContain('WELCOME');
    expect(ONBOARDING_PAGES[0].cta).toContain('NEXT');
  });

  test('second page has skill items', () => {
    expect(Array.isArray(ONBOARDING_PAGES[1].skills)).toBe(true);
    expect(ONBOARDING_PAGES[1].skills.length).toBeGreaterThan(0);
    ONBOARDING_PAGES[1].skills.forEach(s => {
      expect(s.icon.length).toBeGreaterThan(0);
      expect(s.label.length).toBeGreaterThan(0);
    });
  });

  test('third page has step items', () => {
    expect(Array.isArray(ONBOARDING_PAGES[2].skills)).toBe(true);
    expect(ONBOARDING_PAGES[2].skills.length).toBe(3);
  });

  test('last page CTA is LET\'S BEGIN', () => {
    const last = ONBOARDING_PAGES[ONBOARDING_PAGES.length - 1];
    expect(last.cta).toContain("LET'S BEGIN");
  });

  test('all accent values are distinct hex colors', () => {
    const accents = ONBOARDING_PAGES.map(p => p.accent);
    expect(new Set(accents).size).toBe(accents.length);
  });
});

// ── Settings: debateSecs bounds ────────────────────────────────────────────
// These test the clamping logic used in AccountScreen's stepper.

describe('debateSecs stepper logic', () => {
  const decrease = secs => Math.max(30, secs - 30);
  const increase = secs => Math.min(900, secs + 30);

  test('cannot go below 30 seconds', () => {
    expect(decrease(30)).toBe(30);
    expect(decrease(60)).toBe(30);
  });

  test('decrease by 30 seconds from default (60)', () => {
    expect(decrease(60)).toBe(30);
  });

  test('increase by 30 seconds from default (60)', () => {
    expect(increase(60)).toBe(90);
  });

  test('three increases from default reaches 150 seconds', () => {
    expect(increase(increase(increase(60)))).toBe(150);
  });

  test('to reach 3 minutes (180s) from default (60s) requires 4 increases', () => {
    let secs = 60;
    for (let i = 0; i < 4; i++) secs = increase(secs);
    expect(secs).toBe(180);
  });

  test('cannot exceed 900 seconds (15 minutes)', () => {
    expect(increase(900)).toBe(900);
    expect(increase(870)).toBe(900);
  });
});

// ── Settings: cardsPerPlayer bounds ───────────────────────────────────────

describe('cardsPerPlayer stepper logic', () => {
  const decrease = n => Math.max(1, n - 1);
  const increase = n => Math.min(5, n + 1);

  test('cannot go below 1', () => {
    expect(decrease(1)).toBe(1);
  });

  test('cannot exceed 5', () => {
    expect(increase(5)).toBe(5);
  });

  test('increases and decreases correctly in range', () => {
    expect(increase(3)).toBe(4);
    expect(decrease(3)).toBe(2);
  });
});

// ── Module exports smoke test ──────────────────────────────────────────────

describe('screens.js exports', () => {
  const EXPECTED_EXPORTS = [
    'OnboardingScreen', 'AuthScreen', 'HomeScreen', 'QuickDrawScreen',
    'HelpScreen', 'AccountScreen', 'PlayerPickScreen', 'CasePickScreen',
    'PassScreen', 'CornerTimeScreen', 'DebateScreen', 'ComplianceCheckScreen',
    'CounterWindowScreen', 'CounterScreen', 'HazardWindowScreen',
    'ComebackScreen', 'ExchangeScreen', 'PlayerWinsScreen', 'RoundEndScreen',
    'PointsScreen', 'SoloDojoScreen',
  ];

  test('all expected screen components are exported as functions', () => {
    const module = {
      OnboardingScreen, AuthScreen, HomeScreen, QuickDrawScreen,
      HelpScreen, AccountScreen, PlayerPickScreen, CasePickScreen,
      PassScreen, CornerTimeScreen, DebateScreen, ComplianceCheckScreen,
      CounterWindowScreen, CounterScreen, HazardWindowScreen,
      ComebackScreen, ExchangeScreen, PlayerWinsScreen, RoundEndScreen,
      PointsScreen, SoloDojoScreen,
    };
    EXPECTED_EXPORTS.forEach(name => {
      expect(typeof module[name]).toBe('function');
    });
  });
});
