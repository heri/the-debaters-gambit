import { DRILLS } from '../drills';
import { MOVE_CARDS } from '../data';

// ── DRILLS completeness ───────────────────────────────────────────────────

describe('DRILLS completeness', () => {
  test('DRILLS is a non-empty object', () => {
    expect(typeof DRILLS).toBe('object');
    expect(DRILLS).not.toBeNull();
    expect(Object.keys(DRILLS).length).toBeGreaterThan(0);
  });

  test('every move card has a corresponding drill entry', () => {
    MOVE_CARDS.forEach(card => {
      expect(DRILLS).toHaveProperty(card.id);
    });
  });

  test('no drill references a card ID that does not exist in MOVE_CARDS', () => {
    const validIds = new Set(MOVE_CARDS.map(c => c.id));
    Object.keys(DRILLS).forEach(drillId => {
      expect(validIds.has(drillId)).toBe(true);
    });
  });

  test('drill count matches MOVE_CARDS count', () => {
    expect(Object.keys(DRILLS).length).toBe(MOVE_CARDS.length);
  });
});

// ── DRILLS structure ──────────────────────────────────────────────────────

describe('DRILLS structure — every drill', () => {
  test('has a steps array', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      expect(Array.isArray(drill.steps)).toBe(true);
    });
  });

  test('has exactly 2 steps', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      expect(drill.steps).toHaveLength(2);
    });
  });
});

// ── Step structure ─────────────────────────────────────────────────────────

describe('DRILLS step structure — every step', () => {
  const REQUIRED_STEP_FIELDS = ['argus', 'question', 'options', 'correct', 'feedbackOk', 'feedbackOops'];

  test('has all required fields', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      drill.steps.forEach((step, stepIdx) => {
        REQUIRED_STEP_FIELDS.forEach(field => {
          expect(step).toHaveProperty(field);
        });
      });
    });
  });

  test('argus is a non-empty string', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      drill.steps.forEach(step => {
        expect(typeof step.argus).toBe('string');
        expect(step.argus.trim().length).toBeGreaterThan(0);
      });
    });
  });

  test('question is a non-empty string', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      drill.steps.forEach(step => {
        expect(typeof step.question).toBe('string');
        expect(step.question.trim().length).toBeGreaterThan(0);
      });
    });
  });

  test('feedbackOk is a non-empty string', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      drill.steps.forEach(step => {
        expect(typeof step.feedbackOk).toBe('string');
        expect(step.feedbackOk.trim().length).toBeGreaterThan(0);
      });
    });
  });

  test('feedbackOops is a non-empty string', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      drill.steps.forEach(step => {
        expect(typeof step.feedbackOops).toBe('string');
        expect(step.feedbackOops.trim().length).toBeGreaterThan(0);
      });
    });
  });
});

// ── Options ────────────────────────────────────────────────────────────────

describe('DRILLS options', () => {
  test('every step has exactly 3 options', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      drill.steps.forEach(step => {
        expect(step.options).toHaveLength(3);
      });
    });
  });

  test('all options are non-empty strings', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      drill.steps.forEach(step => {
        step.options.forEach(opt => {
          expect(typeof opt).toBe('string');
          expect(opt.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });

  test('all 3 options within a step are distinct', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      drill.steps.forEach(step => {
        const unique = new Set(step.options.map(o => o.trim().toLowerCase()));
        expect(unique.size).toBe(3);
      });
    });
  });
});

// ── Correct index ──────────────────────────────────────────────────────────

describe('DRILLS correct index', () => {
  test('correct is an integer', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      drill.steps.forEach(step => {
        expect(Number.isInteger(step.correct)).toBe(true);
      });
    });
  });

  test('correct is within valid options range (0–2)', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      drill.steps.forEach(step => {
        expect(step.correct).toBeGreaterThanOrEqual(0);
        expect(step.correct).toBeLessThan(step.options.length);
      });
    });
  });

  test('correct is always 0 (option A is always the right answer)', () => {
    // By design all correct answers are the first option.
    // This test will catch accidental edits that break the pattern.
    Object.entries(DRILLS).forEach(([id, drill]) => {
      drill.steps.forEach(step => {
        expect(step.correct).toBe(0);
      });
    });
  });
});

// ── Completion step (step index 1) ─────────────────────────────────────────

describe('DRILLS step 2 (completion step)', () => {
  test('feedbackOk contains the ⭐ star emoji', () => {
    // The game shows this emoji on successful completion of step 2.
    Object.entries(DRILLS).forEach(([id, drill]) => {
      expect(drill.steps[1].feedbackOk).toContain('⭐');
    });
  });

  test('feedbackOops on step 2 references option A', () => {
    // Hints always point back to option A so the player knows the right answer.
    Object.entries(DRILLS).forEach(([id, drill]) => {
      expect(drill.steps[1].feedbackOops).toMatch(/\bA\b/);
    });
  });
});

// ── SoloDojoScreen crash guards ────────────────────────────────────────────
// These tests directly replicate the runtime access patterns in SoloDojoScreen
// to ensure the patterns that caused crashes cannot regress.

describe('SoloDojoScreen runtime access patterns', () => {
  test('DRILLS[card.id] is never undefined for any move card', () => {
    MOVE_CARDS.forEach(card => {
      const drill = DRILLS[card.id];
      expect(drill).not.toBeUndefined();
      expect(drill).not.toBeNull();
    });
  });

  test('drill.steps[0] and drill.steps[1] are both accessible without error', () => {
    MOVE_CARDS.forEach(card => {
      const drill = DRILLS[card.id];
      expect(drill.steps[0]).toBeDefined();
      expect(drill.steps[1]).toBeDefined();
    });
  });

  test('drill.steps[0].options[correct] is the correct answer string', () => {
    MOVE_CARDS.forEach(card => {
      const drill = DRILLS[card.id];
      drill.steps.forEach(step => {
        expect(typeof step.options[step.correct]).toBe('string');
        expect(step.options[step.correct].trim().length).toBeGreaterThan(0);
      });
    });
  });

  test('accessing a step index beyond 1 returns undefined safely', () => {
    // SoloDojoScreen only uses steps 0 and 1. Verifying step 2 is undefined
    // prevents accidental off-by-one regressions.
    MOVE_CARDS.forEach(card => {
      expect(DRILLS[card.id].steps[2]).toBeUndefined();
    });
  });
});
