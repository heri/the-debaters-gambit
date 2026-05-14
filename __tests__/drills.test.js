import { DRILLS, DRILLS_LEGACY } from '../drills';
import { MOVE_CARDS } from '../data';

const BRONZE_CARDS = MOVE_CARDS.filter(c => c.tier === 'BRONZE');
const SILVER_GOLD_CARDS = MOVE_CARDS.filter(c => c.tier === 'SILVER' || c.tier === 'GOLD');

// ── DRILLS (5-step Bronze format) ─────────────────────────────────────────

describe('DRILLS — presence', () => {
  test('DRILLS is a non-empty object', () => {
    expect(typeof DRILLS).toBe('object');
    expect(DRILLS).not.toBeNull();
    expect(Object.keys(DRILLS).length).toBeGreaterThan(0);
  });

  test('every Bronze move card has a corresponding DRILLS entry', () => {
    BRONZE_CARDS.forEach(card => {
      expect(DRILLS).toHaveProperty(card.id);
    });
  });

  test('DRILLS contains only Bronze card IDs', () => {
    const bronzeIds = new Set(BRONZE_CARDS.map(c => c.id));
    Object.keys(DRILLS).forEach(id => {
      expect(bronzeIds.has(id)).toBe(true);
    });
  });

  test('DRILLS count matches Bronze card count', () => {
    expect(Object.keys(DRILLS).length).toBe(BRONZE_CARDS.length);
  });
});

describe('DRILLS — drill structure', () => {
  test('every drill has a cardId string', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      expect(typeof drill.cardId).toBe('string');
      expect(drill.cardId.trim().length).toBeGreaterThan(0);
      expect(drill.cardId).toBe(id);
    });
  });

  test('every drill has a steps array', () => {
    Object.entries(DRILLS).forEach(([, drill]) => {
      expect(Array.isArray(drill.steps)).toBe(true);
    });
  });

  test('every drill has exactly 5 steps', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      expect(drill.steps).toHaveLength(5);
    });
  });

  test('every step has a screens array', () => {
    Object.entries(DRILLS).forEach(([, drill]) => {
      drill.steps.forEach(step => {
        expect(Array.isArray(step.screens)).toBe(true);
        expect(step.screens.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('DRILLS — screen structure', () => {
  const VALID_TYPES = ['info', 'question', 'deliver', 'completion'];
  const VALID_EXPRESSIONS = ['confident', 'suspicious', 'smug', 'encouraging', 'thinking', 'dramatic'];

  test('every screen has a unique non-empty id', () => {
    const allIds = [];
    Object.values(DRILLS).forEach(drill => {
      drill.steps.forEach(step => {
        step.screens.forEach(screen => {
          expect(typeof screen.id).toBe('string');
          expect(screen.id.trim().length).toBeGreaterThan(0);
          allIds.push(screen.id);
        });
      });
    });
    expect(new Set(allIds).size).toBe(allIds.length);
  });

  test('every screen has a valid type', () => {
    Object.values(DRILLS).forEach(drill => {
      drill.steps.forEach(step => {
        step.screens.forEach(screen => {
          expect(VALID_TYPES).toContain(screen.type);
        });
      });
    });
  });

  test('every non-completion screen has a valid argusExpression', () => {
    Object.values(DRILLS).forEach(drill => {
      drill.steps.forEach(step => {
        step.screens.filter(s => s.type !== 'completion').forEach(screen => {
          expect(VALID_EXPRESSIONS).toContain(screen.argusExpression);
        });
      });
    });
  });

  test('info screens have a non-empty body or quote', () => {
    Object.values(DRILLS).forEach(drill => {
      drill.steps.forEach(step => {
        step.screens.filter(s => s.type === 'info').forEach(screen => {
          const hasContent = (screen.body && screen.body.trim().length > 0)
            || (screen.quote && screen.quote.trim().length > 0);
          expect(hasContent).toBe(true);
        });
      });
    });
  });

  test('question screens have a non-empty prompt', () => {
    Object.values(DRILLS).forEach(drill => {
      drill.steps.forEach(step => {
        step.screens.filter(s => s.type === 'question').forEach(screen => {
          expect(typeof screen.prompt).toBe('string');
          expect(screen.prompt.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });

  test('question screens have exactly 3 options', () => {
    Object.values(DRILLS).forEach(drill => {
      drill.steps.forEach(step => {
        step.screens.filter(s => s.type === 'question').forEach(screen => {
          expect(Array.isArray(screen.options)).toBe(true);
          expect(screen.options).toHaveLength(3);
        });
      });
    });
  });

  test('question screen options each have text, correct flag, and feedback', () => {
    Object.values(DRILLS).forEach(drill => {
      drill.steps.forEach(step => {
        step.screens.filter(s => s.type === 'question').forEach(screen => {
          screen.options.forEach(opt => {
            expect(typeof opt.text).toBe('string');
            expect(opt.text.trim().length).toBeGreaterThan(0);
            expect(typeof opt.correct).toBe('boolean');
            expect(typeof opt.feedback).toBe('string');
            expect(opt.feedback.trim().length).toBeGreaterThan(0);
          });
        });
      });
    });
  });

  test('each question screen has exactly one correct option', () => {
    Object.values(DRILLS).forEach(drill => {
      drill.steps.forEach(step => {
        step.screens.filter(s => s.type === 'question').forEach(screen => {
          const correctCount = screen.options.filter(o => o.correct).length;
          expect(correctCount).toBe(1);
        });
      });
    });
  });

  test('deliver screens have a non-empty body and caption', () => {
    Object.values(DRILLS).forEach(drill => {
      drill.steps.forEach(step => {
        step.screens.filter(s => s.type === 'deliver').forEach(screen => {
          expect(typeof screen.body).toBe('string');
          expect(screen.body.trim().length).toBeGreaterThan(0);
          expect(typeof screen.caption).toBe('string');
          expect(screen.caption.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });

  test('deliver screens have a positive timerSecs', () => {
    Object.values(DRILLS).forEach(drill => {
      drill.steps.forEach(step => {
        step.screens.filter(s => s.type === 'deliver').forEach(screen => {
          expect(typeof screen.timerSecs).toBe('number');
          expect(screen.timerSecs).toBeGreaterThan(0);
        });
      });
    });
  });

  test('completion screens have saidText and skippedText', () => {
    Object.values(DRILLS).forEach(drill => {
      drill.steps.forEach(step => {
        step.screens.filter(s => s.type === 'completion').forEach(screen => {
          expect(typeof screen.saidText).toBe('string');
          expect(screen.saidText.trim().length).toBeGreaterThan(0);
          expect(typeof screen.skippedText).toBe('string');
          expect(screen.skippedText.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });

  test('step 5 (index 4) contains a deliver and a completion screen', () => {
    Object.entries(DRILLS).forEach(([id, drill]) => {
      const lastStep = drill.steps[4];
      const types = lastStep.screens.map(s => s.type);
      expect(types).toContain('deliver');
      expect(types).toContain('completion');
    });
  });
});

// ── DRILLS_LEGACY (2-step Silver/Gold format) ─────────────────────────────

describe('DRILLS_LEGACY — presence', () => {
  test('DRILLS_LEGACY is a non-empty object', () => {
    expect(typeof DRILLS_LEGACY).toBe('object');
    expect(DRILLS_LEGACY).not.toBeNull();
    expect(Object.keys(DRILLS_LEGACY).length).toBeGreaterThan(0);
  });

  test('every Silver/Gold move card has a corresponding DRILLS_LEGACY entry', () => {
    SILVER_GOLD_CARDS.forEach(card => {
      expect(DRILLS_LEGACY).toHaveProperty(card.id);
    });
  });

  test('DRILLS_LEGACY count matches Silver+Gold card count', () => {
    expect(Object.keys(DRILLS_LEGACY).length).toBe(SILVER_GOLD_CARDS.length);
  });
});

describe('DRILLS_LEGACY — step structure', () => {
  const REQUIRED_FIELDS = ['argus', 'question', 'options', 'correct', 'feedbackOk', 'feedbackOops'];

  test('every drill has exactly 2 steps', () => {
    Object.values(DRILLS_LEGACY).forEach(drill => {
      expect(drill.steps).toHaveLength(2);
    });
  });

  test('every step has all required fields', () => {
    Object.entries(DRILLS_LEGACY).forEach(([, drill]) => {
      drill.steps.forEach(step => {
        REQUIRED_FIELDS.forEach(field => {
          expect(step).toHaveProperty(field);
        });
      });
    });
  });

  test('argus is a non-empty string', () => {
    Object.values(DRILLS_LEGACY).forEach(drill => {
      drill.steps.forEach(step => {
        expect(typeof step.argus).toBe('string');
        expect(step.argus.trim().length).toBeGreaterThan(0);
      });
    });
  });

  test('question is a non-empty string', () => {
    Object.values(DRILLS_LEGACY).forEach(drill => {
      drill.steps.forEach(step => {
        expect(typeof step.question).toBe('string');
        expect(step.question.trim().length).toBeGreaterThan(0);
      });
    });
  });

  test('every step has exactly 3 options', () => {
    Object.values(DRILLS_LEGACY).forEach(drill => {
      drill.steps.forEach(step => {
        expect(step.options).toHaveLength(3);
      });
    });
  });

  test('all options are non-empty strings', () => {
    Object.values(DRILLS_LEGACY).forEach(drill => {
      drill.steps.forEach(step => {
        step.options.forEach(opt => {
          expect(typeof opt).toBe('string');
          expect(opt.trim().length).toBeGreaterThan(0);
        });
      });
    });
  });

  test('correct is 0 for every step (option A is always right)', () => {
    Object.values(DRILLS_LEGACY).forEach(drill => {
      drill.steps.forEach(step => {
        expect(step.correct).toBe(0);
      });
    });
  });

  test('feedbackOk and feedbackOops are non-empty strings', () => {
    Object.values(DRILLS_LEGACY).forEach(drill => {
      drill.steps.forEach(step => {
        expect(step.feedbackOk.trim().length).toBeGreaterThan(0);
        expect(step.feedbackOops.trim().length).toBeGreaterThan(0);
      });
    });
  });

  test('step 2 feedbackOk contains the ⭐ star emoji', () => {
    Object.values(DRILLS_LEGACY).forEach(drill => {
      expect(drill.steps[1].feedbackOk).toContain('⭐');
    });
  });

  test('step 2 feedbackOops references option A', () => {
    Object.values(DRILLS_LEGACY).forEach(drill => {
      expect(drill.steps[1].feedbackOops).toMatch(/\bA\b/);
    });
  });
});

// ── No ID overlap between DRILLS and DRILLS_LEGACY ────────────────────────

describe('DRILLS and DRILLS_LEGACY — no ID overlap', () => {
  test('Bronze IDs and Silver/Gold IDs are disjoint', () => {
    const drillIds = new Set(Object.keys(DRILLS));
    Object.keys(DRILLS_LEGACY).forEach(id => {
      expect(drillIds.has(id)).toBe(false);
    });
  });
});
