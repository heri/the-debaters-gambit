# The Debater's Gambit

A mobile card game for sharpening debate and rhetoric skills — built for a parent and child to play together on one phone during the school run or at the dinner table. Players argue real cases using rhetorical move cards inspired by history's sharpest minds: Lincoln, Obama, Mandela, and more.

> *"Words are your weapons. Wit is your armor."*

---

## What is it?

Two players. One case. A hand of cards.

A **Case Card** sets the debate topic — from kid-friendly warm-ups ("Superheroes would make terrible teachers") to hard philosophical clashes ("A world of magic would be worse than a world of technology"). Each player is **dealt their own 3 cards** from a mixed deck: **Move Cards** (rhetorical techniques), **Hazard Cards** (restrictions you play before your opponent argues), and **Counter Cards** (interrupt moves after your opponent argues).

Each player's turn has three phases: a **Hazard Window** (opponent picks a hazard), an **Argument** (timed turn with optional move card), and a **Counter Window** (15 seconds for the opponent to interrupt, triggering a 30-second comeback). The first player to have **zero cards at the start of their turn wins** — no point scoring, no voting. Over time, the card pool expands from Bronze to Gold tier as players build real-world persuasion and storytelling skills.

The app treats players as **junior debaters, not students** — members of the *Parlour of Minds*. Not here to learn. Here to practise.

---

## Win Condition

The first player to have **zero cards at the start of their own turn** wins. Rounds continue automatically until that happens. If an opponent plays a **Hazard Card** against you and you don't confirm you followed it, you're dealt a penalty card — making it harder to win.

---

## Game Modes

### Daily Quick Draw (Home screen)
A pre-generated solo creative challenge — one Case Card and three play cards (move or hazard, no counter), seeded from the date so everyone sees the same draw. No timer, no opponent. Tap **▶ Start Quick Draw** to begin.

- Tap a card to select it (highlighted)
- Press **Confirm** to mark it as played
- When all three cards are used, the Quick Draw is complete

### ⚔️ VS (bottom nav)
Full two-player game. Browse and pick a case + players in one screen. Each player is dealt **3 cards** from the combined pool (move + hazard + counter). Game ends when one player uses all their cards.

Each player's full hand is always visible in the **hand panel** at the bottom of the screen during their turns — cycle through cards one by one with ‹ › arrows.

**Card dealing rules:**
- Fewer than 10 games in history → move cards are always **BRONZE (Novice)** tier
- 10+ games → move cards dealt from the full pool (Bronze, Silver, Gold)
- Hazard and Counter cards are always available regardless of history
- Each player is dealt 3 cards; P1 and P2 always receive different cards

**Card types:**
- **Move Cards** — rhetorical techniques (The Fair Play, The Honest Tale, etc.). Select one during your argument turn to use it.
- **Hazard Cards** — played by the **opponent** at the start of your turn (Hazard Window) to restrict your argument (e.g. "No Numbers", "30 Seconds"). If you can't confirm you followed the restriction, you're dealt an extra penalty card.
- **Counter Cards** — interrupt moves shown in a **15-second window** after the arguer finishes; the opponent may play one for a quick rebuttal. The original arguer then gets a **30-second comeback**.

**Turn structure (VS mode):**
1. **Hazard Window** — opponent picks a hazard from their hand (or skips)
2. **Corner Time** — 60s planning window (if enabled)
3. **Argument** — timed debate turn; optionally play a Move Card; confirm hazard compliance
4. **Counter Window** — opponent has 15s to play a Counter Card
5. **Counter** — opponent delivers 30s rebuttal using counter card
6. **Comeback** — arguer gets 30s to respond (optional move card)
7. **Exchange** — arguer may swap one card (or skip)

**End of turn:** Check if the next player starts with 0 cards → that player wins.

### 🦊 Solo Dojo (bottom nav)
Solo practice mode with **Argus**, the app mascot (a fox barrister). Kids drill move cards alone through a 5-step interactive arc:

1. **Understand** (Steps 1–2) — Info cards + comprehension questions teach the concept and the feeling behind the move
2. **See it** (Step 3) — Argus shows the move in real argument examples with guided questions
3. **Build it** (Step 4) — Player assembles a complete response using the move
4. **Say it** (Step 5) — Model response on screen; 15s countdown to say it out loud

Bronze cards use this full 5-step arc. Silver and Gold cards use a shorter legacy format.

**Tier gating:** BRONZE drills are available immediately. SILVER unlocks when all 8 BRONZE are completed. GOLD unlocks when both SILVER are completed. All drills are replayable.

---

## Move Cards

Each card has two lines: **what** (what the move is) and **hint** (a structural cue — how to actually do it). Cards also carry a `status` field: `active | draft | archived`.

### Move Cards (12 — Bronze · Silver · Gold tiers)

| Card | Tier | What | Hint | Inspiration |
|---|---|---|---|---|
| The Fair Play | Bronze · Novice | Appeal to rules and fairness | "We all agreed that…" | Hermione Granger |
| The Kind Heart | Bronze · Novice | Acknowledge feelings first, then pivot | "I understand why you feel that way…" | Mister Rogers |
| The Golden Rule | Bronze · Novice | Find the deeper goal, serve everyone | "What's this REALLY about?" | Moana |
| The Pinky Promise | Bronze · Novice | Commit with such certainty it becomes the argument | State specifics, no hesitation | Pinocchio (reformed) |
| The Team | Bronze · Novice | Show how everyone benefits | "This helps [A], [B], and even [C]" | Paw Patrol |
| The Best Friend | Bronze · Novice | Calmly hold your position under pressure | "I hear you — and I still believe…" | Woody |
| The Lion's Courage | Bronze · Novice | Admit a weakness, then explain why you're still right | "Yes, it's true that… but…" | Simba |
| Be Responsible | Bronze · Novice | Argue for what's fair for everyone | "That's why this is right for all of us." | Steven Universe |
| The Charming Bluff | Silver · Tactician | Bold exaggeration with total confidence | State the outrageous version like obvious fact | Locke Lamora |
| The Honest Tale | Silver · Storyteller | A folksy story that sounds like common sense | "It reminds me of a time when…" | Abraham Lincoln |
| Paint the Future | Gold · Orator | Abandon the now, paint a better world | "Imagine a world where…" | Barack Obama |
| The Bridge Builder | Gold · Master | Find common ground, show it serves both sides | "We actually want the same thing…" | Nelson Mandela |

### Hazard Cards (20 included) · Counter Cards (10 — 5 Regular · 5 Advanced)

Hazard cards restrict the opponent's argument turn. Counter cards interrupt after the opponent argues.

### Case Cards (25 included — Easy · Medium · Hard)

All case cards carry a `status` field: `active | draft | archived`.

| Case | Difficulty |
|---|---|
| Superheroes would make terrible teachers | Easy |
| Video games should count as homework | Easy |
| Ice cream for breakfast would make kids smarter | Easy |
| Dogs are too good for us and humans don't deserve them | Easy |
| Libraries are more powerful than the internet | Easy |
| Dinosaurs were secretly much smarter than we think | Easy |
| Wearing socks to bed is the correct way to sleep | Easy |
| Tacos are mathematically the perfect food | Easy |
| Children should be first in line to go to space | Easy |
| If robots live among us they should have to go to school | Easy |
| Unicorns were real animals that simply went extinct | Easy |
| Kids should decide their own bedtime | Easy |
| Pizza is a perfectly valid breakfast food | Easy |
| Cats would make better secret agents than dogs | Easy |
| Hot dogs legally count as sandwiches | Easy |
| Aliens are currently hiding on Earth | Medium |
| A world of magic would be worse than one of technology | Hard |

---

## Game Flow

```
First launch → Account tab (add 2 players) → game launches automatically

Daily Quick Draw →
  1. Tap "▶ Start Quick Draw" (no player selection needed)
  2. Case card + 3 play cards shown
  3. Tap a card to highlight it → press "Confirm" to mark as used
  4. Repeat for remaining cards; when all 3 used → Quick Draw complete

⚔️  VS →
  1. Browse case cards (sorted Easy → Hard, swipe or arrow)
     — or tap 🎲 Random ("🦊 Argus chooses...")
  2. Select Player 1 and Player 2 from inline dropdowns
  3. Tap "Choose This Case" — each player dealt 3 cards (move/hazard/counter mix)
  4. For each turn:
     a. Hazard Window — pass phone to opponent; they pick a hazard card (or skip);
        pass phone back to arguer
     b. [Corner Time — 60s to plan, if enabled; active hazard shown]
     c. DEBATE — arguer argues; selects optional move card;
        confirms hazard compliance toggle (or penalty card is auto-dealt)
     d. Done modal — "Pass to [opponent]"
     e. Counter Window — opponent has 15s to play a counter card (or skip)
     f. [Counter — opponent delivers 30s rebuttal]
     g. [Comeback — pass back to arguer; 30s with optional move card]
     h. Exchange — pass to arguer; swap one card (or skip)
  5. After exchange: if next player has 0 cards → they win
  6. Win screen — "FINISH GAME →" saves result and returns home

🦊  Solo Dojo →
  1. Pick any unlocked move card from the list
  2. Steps 1–5 — Info cards, comprehension questions, examples, full response build, 15s deliver
  3. Drill marked complete; replay anytime
```

---

## Settings (Account tab)

| Setting | Default | Description |
|---|---|---|
| Debate Time | 1:30 (90s) | Player argument duration; adjust in 30s increments (0:30–15:00) |
| Corner Time | ON | 60s planning window before each debate turn |

**Corner Time** shows a depleting teal bar, a big personalised heading ("Prepare your case, [Name]"), and the player's move cards — giving kids time to plan their argument before the debate clock starts. Players can tap "I'm Ready" to skip early.

**Voice Recording** requires `expo-av` to be installed (`npx expo install expo-av`). If not installed, the voice tab shows install instructions and the app continues to work normally with text notes only.

---

## Design Direction: Ink & Spark

The visual identity is **a debating club that a 9-year-old broke into and redecorated.** Classic bones. Chaotic energy inside.

### Colour palette

| Token | Hex | Role |
|---|---|---|
| Ink Navy | `#0D0F1C` | Background |
| Debate Gold | `#F5C842` | Primary accent, CTAs, highlights |
| Parchment | `#E8DFC8` | Card text, secondary text |
| Electric Teal | `#2ECFB0` | Daily draw, live indicators, player chips, Corner Time |
| Argument Red | `#C0392B` | Progress bar danger state |

### Mascot: Argus

Argus is a fox barrister — tiny curly wig (slightly tilted), teal waistcoat, gold pocket watch chain. He appears in the Solo Dojo and Corner Time screen.

Expression range: Confident · Suspicious · Dramatic · Smug · Encouraging · Thinking.

App icon: Argus's face inside a shield crest on Ink Navy, with gold laurel detail.

### Tone of voice

The game speaks like a sparring partner, not a teacher.

| Situation | App says |
|---|---|
| After a debate round | "Both sides have spoken. The Parlour awaits your verdict." |
| P1 done, passing to P2 | "Your argument is on record. The floor passes to [P2]." |
| Winner declared | "Verdict: [Name]." |
| Tied game | "The Parlour calls a draw." |
| Drill complete | "Verdict: mastered. The Parlour notes your progress." |
| All tiers unlocked | "Argus calls you a worthy debater." |
| Random button spinning | "🦊 Argus chooses..." |

---

## Monorepo Structure

```
the-debater-gambit/
├── front-end/    ← React Native / Expo app
└── back-end/     ← Phoenix API (Elixir + SQLite)
```

## Tech Stack

### Front-end

| Layer | Choice | Why |
|---|---|---|
| Framework | **React Native + Expo SDK 54** | Single codebase for iOS and Android; Expo Go for instant dev testing |
| Language | **JavaScript / React 19** | Fast iteration; no compile step |
| Navigation | **Custom state machine** (`gamePhase`) | No dependency overhead for a linear flow |
| Animation | **React Native `Animated` API** | Built-in; powers card slide transitions and random spin |
| Persistence | **AsyncStorage** | Players, settings, completed drills, and game history survive app restarts |
| Styling | **StyleSheet** | Native performance; no third-party UI lib |
| Safe area | **react-native-safe-area-context** | Correct notch/Dynamic Island handling on iOS |
| Build/Deploy | **EAS Build + TestFlight** | Cloud iOS builds without a Mac CI server |

### Back-end

| Layer | Choice | Why |
|---|---|---|
| Framework | **Phoenix 1.8** | Fast, reliable Elixir web framework with built-in JSON support |
| Language | **Elixir 1.19** | Fault-tolerant, great for concurrent API workloads |
| Database | **SQLite via ecto_sqlite3** | Zero-config, file-based, easy to back up; upgrade to Postgres when needed |
| Auth | **Bearer tokens** (bcrypt + random token in DB) | Simple, stateless, works well for mobile clients |
| CORS | **cors_plug** | Allows the RN app (and local dev) to call the API |

### Front-end file structure

```
front-end/
├── App.js          ← state machine + AsyncStorage
├── cards.js        ← MOVE_CARDS + CASE_CARDS + HAZARD_CARDS + COUNTER_CARDS + ...
├── data.js         ← constants, utilities, getDailyDraw(), dealCards(), fetchRemoteCards()
├── drills.js       ← DRILLS (5-step Bronze) + DRILLS_LEGACY for Solo Dojo
├── styles.js       ← design tokens (C) + StyleSheet (S) — Ink & Spark palette
├── components.js   ← Btn, CardBrowser, BottomNav, card views
├── screens.js      ← all screens
├── content/        ← remote case cards (cards.json for CDN)
└── app.json        ← Expo + EAS config
```

### Back-end file structure

```
back-end/
├── lib/debater_gambit/
│   ├── accounts/
│   │   ├── accounts.ex      ← register_user, sign_in, sign_out, get_user_by_token
│   │   ├── user.ex          ← User schema + registration changeset
│   │   └── user_token.ex    ← UserToken schema (Bearer tokens)
│   └── stats/
│       ├── stats.ex         ← complete_drill, record_game, record_card_plays, get_card_stats
│       ├── card_stat.ex     ← CardStat schema (play_count, success_count, fail_count)
│       ├── drill_completion.ex
│       └── game_record.ex
├── lib/debater_gambit_web/
│   ├── controllers/api/
│   │   ├── user_controller.ex    ← register, sign_in, sign_out, me
│   │   ├── drill_controller.ex   ← complete, index
│   │   ├── game_controller.ex    ← create, index
│   │   └── stats_controller.ex   ← record (batch upsert), index
│   ├── plugs/auth.ex             ← Bearer token auth plug
│   └── router.ex
└── priv/repo/migrations/         ← 5 migrations (users → user_tokens → drills → games → card_stats)
```

**To add a move card:** append to `MOVE_CARDS` in `cards.js` + add a matching entry to `drills.js`. Always **append** — inserting changes index positions and breaks the daily seed for that date.

**To add a case card (bundled):** append to `CASE_CARDS` in `cards.js` only.

**To add a case card (remote — no app update needed):**

1. Edit `content/cards.json` in this repo (or directly in the hosting repo):
   ```json
   {
     "label": "✨ New Cases",
     "version": 2,
     "case_cards": [
       {
         "id": "rc8",
         "title": "Your new case title",
         "description": "One sentence framing the debate.",
         "difficulty": "EASY",
         "icon": "🎃",
         "focus": "Optional theme label"
       }
     ]
   }
   ```
2. Push `cards.json` to the hosting repo (currently `heri/studiozenkai.com` on GitHub).
3. jsDelivr propagates in **5–10 minutes**. To purge the CDN cache immediately:
   ```
   https://purge.jsdelivr.net/gh/heri/studiozenkai.com/cards.json
   ```
4. The app fetches on startup and caches for **24 hours**. A fresh launch after the TTL expires picks up new cards automatically.

Cards with `id` values that already exist in `cards.js` are deduplicated — remote cards never override bundled ones.

The remote URL is configured in `.env`:
```
EXPO_PUBLIC_REMOTE_CARDS_URL=https://cdn.jsdelivr.net/gh/heri/studiozenkai.com/cards.json
```
Change this value if the JSON moves to a different host.

---

## Running locally

### Front-end (React Native / Expo)

```bash
cd front-end

# Requires Node 20+ (use nvm)
nvm use 20
npm install --legacy-peer-deps

# Start dev server (scan QR with Expo Go on iPhone)
npx expo start
```

### Back-end (Phoenix API)

```bash
cd back-end

# First-time setup
mix deps.get
mix ecto.setup       # creates DB + runs all migrations

# Start the server (runs on http://localhost:4000)
mix phx.server
```

The API base URL is configured in `front-end/.env`:
```
EXPO_PUBLIC_API_URL=http://localhost:4000
```
Change to your deployed URL when shipping to production.

## API reference

All protected routes require `Authorization: Bearer <token>` header.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/users/register` | — | Create account `{ email, name, password }` |
| POST | `/api/users/sign_in` | — | Sign in `{ email, password }` → `{ token, user }` |
| DELETE | `/api/users/sign_out` | ✓ | Revoke current token |
| GET | `/api/users/me` | ✓ | Current user info |
| POST | `/api/drills/:id/complete` | ✓ | Mark a dojo drill complete |
| GET | `/api/drills` | ✓ | List completed drill IDs |
| POST | `/api/games` | ✓ | Record a game `{ game_type, winner_name, case_title, round_count }` |
| GET | `/api/games` | ✓ | Last 20 games |
| POST | `/api/card_stats/record` | ✓ | Batch-record card plays `{ plays: [{ card_id, card_type, success }] }` |
| GET | `/api/card_stats` | ✓ | Stats per card (play_count, success_count, fail_count, success_rate) |

Stats are tracked for **hazard** and **move** cards only. Joker, filibuster, and delegate cards are intentionally excluded.

## Testing

**Bug fix:** run tests before and after — all must pass.
**New feature:** write tests alongside the feature code — all must pass before the task is done.

Coverage targets: **85%+ statements/branches/functions/lines** on front-end and back-end. See [TESTING.md](TESTING.md) for the full guide.

```bash
# Front-end
cd front-end && npx jest --coverage

# Back-end
cd back-end && mix test
```

---

## Building for TestFlight

```bash
cd front-end
npm install -g eas-cli
eas login
eas build --platform ios --profile production
eas submit --platform ios
```

---

## Roadmap

- **V1 (current)** — local pass-and-play, daily quick draw, inline case/player picker, Corner Time (personalised headings), text/voice notes during debate, depleting progress bar, configurable debate time, mixed-deck dealing (move/hazard/counter), hazard compliance mechanic (penalty card if not followed), counter window (10s interrupt), win-by-cards mechanic, game history (Home + Account), Solo Dojo with Argus (5-step Bronze drills), AsyncStorage persistence, Ink & Spark design direction
- **V2** — daily streak counter, audio transcription (Apple Speech framework), LLM judge (Gemini Flash), structured verdict (winner + witty breakdown + feedback)
- **V3** — player accounts, match history, remote multiplayer, card deck OTA updates via Firebase/Supabase
