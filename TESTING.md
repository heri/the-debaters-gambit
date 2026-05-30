# Testing — The Debater's Gambit

## Workflow rules

| Situation | Rule |
|---|---|
| Fixing a bug | Run tests before the fix (confirm baseline), then after — **all tests must pass** |
| Developing a new feature | Write tests alongside the code — **all tests must pass before the task is done** |

A feature is not done until its tests are written and green.

---

## Objectives

- **Unit coverage target: 85%+** (statements, branches, functions, lines) across all non-UI logic.
- **Back-end coverage target: 85%+** on Ecto schemas, context functions, and HTTP controllers.
- **E2E business scenarios**: one test per user journey listed below (Maestro — not yet implemented).

Tests must be fast, deterministic, and not dependent on external services or network calls.

---

## Tools

| Layer | Tool | Run command |
|---|---|---|
| Front-end unit | [Jest 29](https://jestjs.io/) | `cd front-end && npx jest` |
| Front-end coverage | Jest `--coverage` | `cd front-end && npx jest --coverage` |
| Back-end unit | [ExUnit](https://hexdocs.pm/ex_unit/) | `cd back-end && mix test` |
| Back-end coverage | [excoveralls](https://github.com/parroty/excoveralls) | `cd back-end && mix coveralls` (not yet set up) |
| E2E | [Maestro](https://maestro.mobile.dev/) | `maestro test e2e/` (not yet set up) |

---

## Front-end unit tests

**Location:** `front-end/__tests__/`

**What to test:**
- All pure functions in `data.js` and `drills.js` — card dealing, seeded draws, timer formatting, data integrity.
- All pure functions in `api.js` — request builders, response parsers (mock `fetch`).
- Extracted logic in `screens.js` — game state transitions, score calculation, card eligibility rules.

**What NOT to test:**
- React Native component rendering — use Maestro E2E for user-visible behaviour.
- `AsyncStorage` directly — mock it at the module level.
- Randomness outcomes — test pool/exclusion properties, not specific draws.

**Mocking conventions:**
- `react-native` → `front-end/__mocks__/react-native.js` (already in place)
- `@react-native-async-storage/async-storage` → mock in individual test files with `jest.mock`
- `fetch` → use `global.fetch = jest.fn(...)` in `beforeEach`

**Coverage command:**
```bash
cd front-end && npx jest --coverage --coverageReporters=text
```

---

## Back-end unit tests

**Location:** `back-end/test/`

**Structure:**
```
test/
  debater_gambit/
    cards_test.exs              # RemoteCard changeset + Cards context
  debater_gambit_web/
    controllers/
      api/
        cards_controller_test.exs   # GET /api/cards
      admin/
        session_controller_test.exs # Login / logout
        cards_controller_test.exs   # Admin CRUD + auth guard
```

**What to test:**
- Ecto changesets: required fields, format validations, inclusion constraints, unique constraints.
- Context functions: happy path and error path for every public function.
- API controllers: response shape, HTTP status codes, auth enforcement.
- Admin controllers: redirect when unauthenticated, correct flash messages, session behaviour.

**What NOT to test:**
- Phoenix framework internals (routing, plug pipeline ordering).
- Third-party library behaviour (Bcrypt, Ecto itself).

**Test database:** SQLite sandbox via `Ecto.Adapters.SQL.Sandbox`. Each test runs in a transaction that is rolled back on exit. Do not use `async: true` with SQLite.

**CSRF in browser pipeline tests:** use `put_private(conn, :plug_skip_csrf_protection, true)` for POST/DELETE requests that go through the `:browser` pipeline. This is a documented Plug test pattern and must only appear in test code.

---

## E2E business scenarios (Maestro — not yet implemented)

The following flows must each have a dedicated Maestro test file in `e2e/`:

| File | Scenario |
|---|---|
| `onboarding_new_user.yaml` | New user views 2 onboarding screens and skips to account creation |
| `drills_resume.yaml` | Logged-in user signs in and resumes drills where they left off |
| `settings_timer.yaml` | Active user changes game time per player to 3 minutes |
| `help_page.yaml` | Active user navigates to the Help screen |
| `quick_draw_exit.yaml` | Active user starts Quick Draw, plays 2 cards, then exits mid-game |
| `history_view.yaml` | Active user views their gaming history |

Setup: `brew install maestro` and run against the Expo Go simulator (`maestro test e2e/`).

---

## Running everything

```bash
# Front-end
cd front-end && npx jest --coverage

# Back-end
cd back-end && mix test

# E2E (once set up)
maestro test e2e/
```
