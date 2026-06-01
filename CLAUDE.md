# CLAUDE.md — The Debater's Gambit

Developer guide for Claude Code. These rules apply to every task in this repository.

---

## Project layout

```
front-end/    Expo / React Native app (JS)
back-end/     Phoenix API + admin panel (Elixir/SQLite)
```

---

## Testing rules

These are non-negotiable requirements, not suggestions.

### When fixing a bug

1. Run the full test suite before touching any code to confirm the baseline.
2. Fix the bug.
3. Run the full test suite again — **all tests must pass before the task is done**.

### When developing a new feature

1. Write the feature code.
2. **Add tests** that cover the new logic. See coverage targets below.
3. Run the full test suite — **all tests must pass before the task is done**.

A feature is not done until the tests are written and green.

### Coverage targets

| Layer | Target |
|---|---|
| Front-end unit (Jest) | 85%+ statements, branches, functions, lines |
| Back-end unit (ExUnit) | 85%+ on context functions and controllers |
| E2E (Maestro) | one flow per user-facing journey |

See [TESTING.md](TESTING.md) for tools, file locations, test guidelines, and the list of pending E2E scenarios.

### How to run tests

```bash
# Front-end — unit tests + coverage
cd front-end && npx jest --coverage

# Back-end — unit tests
cd back-end && mix test
```

---

## Code style

- No comments unless the **why** is non-obvious (a hidden constraint, a workaround, a subtle invariant).
- No LLM-style copy: no em-dashes (`—`), no `→` as separators in user-visible text.
- Keep files small. Logic lives in `data.js`, `api.js`, or back-end contexts — not in screen components.
- No new files unless the task genuinely requires them. Prefer editing existing ones.
