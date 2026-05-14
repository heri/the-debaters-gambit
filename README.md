# The Debater's Gambit

A mobile card game for sharpening debate and rhetoric skills — built for a parent and child to play together on one phone during the school run or at the dinner table. Players argue real cases using rhetorical move cards inspired by history's sharpest minds: Lincoln, Obama, Mandela, and more.

> *"Words are your weapons. Wit is your armor."*

---

## What is it?

Two players. One case. A hand of move cards.

A **Case Card** sets the debate topic — from kid-friendly warm-ups ("Superheroes would make terrible teachers") to hard philosophical clashes ("A world of magic would be worse than a world of technology"). Each player is **dealt their own 2 Move Cards** — rhetorical techniques they can slip in at any point during their argument to earn a bonus point. Tell a humble folktale, paint a vision of the future, find common ground, or bluff with absolute confidence. They're suggestions, not requirements.

Each player's turn is timed by a depleting progress bar. Points are awarded — 1 for winning the argument, and a +1 bonus if they actually used a move card. Over time, the card pool expands from Bronze to Gold tier as players build real-world persuasion and storytelling skills.

The app treats players as **junior debaters, not students** — members of the *Parlour of Minds*. Not here to learn. Here to practise.

---

## Scoring

| Action | Points |
|---|---|
| Won the argument | +1 pt |
| Used a move card | +1 bonus pt |

Maximum 2 points per player per round.

---

## Game Modes

### Daily Quick Draw (Home screen)
A pre-generated daily pairing — one Case Card and one Move Card of the Day — seeded from the date so it's identical for everyone. No browsing, no choosing. Tap **▶ Play Today's Round** and debate immediately. Foundation for the streak mechanic coming in V2.

### ⚔️ New Case (bottom nav)
Full custom game. Browse and pick a case + players in one screen, each player gets their own 2 random move cards, play as many rounds as you want.

**Move card dealing rules:**
- Fewer than 10 rounds in history → always dealt **NOVICE (Bronze)** cards
- 10+ rounds → dealt from the full card pool (Bronze, Silver, Gold)
- P1 and P2 always receive different cards (dealt like poker/UNO — no sharing)

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

### Move Cards (12 included — Bronze · Silver · Gold tiers)

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

### Case Cards (17 included — Easy · Medium · Hard)

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
  1. Tap "▶ Play Today's Round"
  2. Choose 2 players (PlayerPickScreen)
  3. [Corner Time — "Prepare your case, [Name]" shown; 60s to plan, if enabled]
  4. DEBATE — "State your case, [Name]"; progress bar depletes; P1 debates
     - Jot notes (text tab) or record yourself (voice tab, requires expo-av)
     - Tap a move card to mark it as used (+1 bonus)
     - "Done — I'm Finished" ends the turn early (auto-saves notes if time lapses)
  5. Pass phone to P2 (privacy cover screen)
  6. [Corner Time — 60s for P2, if enabled]
  7. P2 debates with their move card
  8. After each round: "Next Round" or "End Game & Score"
  9. SCORE — reveal move cards used, award points

⚔️  New Case →
  1. Browse case cards (sorted Easy → Hard, swipe or arrow)
     — or tap 🎲 Random ("🦊 Argus chooses...")
  2. Select Player 1 and Player 2 from inline dropdowns
     (Player 1 speaks first, then Player 2)
  3. Tap "Choose This Case" — each player is dealt their own 2 unique move cards
  4. [Corner Time — "Prepare your case, [Name]"; 60s for P1, if enabled]
  5. DEBATE — "State your case, [Name]"; progress bar depletes as time runs out
     - Case description always visible
     - Jot notes (text tab) or record yourself (voice tab, requires expo-av)
     - Your move cards shown — tap one to mark it as used (+1 bonus if you use a move card)
     - "Done — I'm Finished" ends the turn early (text notes auto-saved if time lapses)
  6. Pass phone to P2 (privacy cover screen)
  7. [Corner Time — 60s for P2, if enabled]
  8. P2 debates with their own different move cards
  9. After each round: "Next Round" or "End Game & Score"
  10. SCORE — reveal chosen move cards, award points, save to history

🦊  Solo Dojo →
  1. Pick any unlocked move card from the list
  2. Steps 1–5 — Info cards, comprehension questions, examples, full response build, 15s deliver
  3. Drill marked complete; replay anytime
```

---

## Settings (Account tab)

| Setting | Default | Description |
|---|---|---|
| Default Rounds | 1 | Rounds per game (1–10) |
| Debate Time | 5 min | Player turn duration (1–15 min) |
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

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React Native + Expo SDK 54** | Single codebase for iOS and Android; Expo Go for instant dev testing |
| Language | **JavaScript / React 19** | Fast iteration; no compile step |
| Navigation | **Custom state machine** (`gamePhase`) | No dependency overhead for a linear flow |
| Animation | **React Native `Animated` API** | Built-in; powers card slide transitions and random spin |
| Persistence | **AsyncStorage** | Players, settings, completed drills, and game history survive app restarts |
| Voice (optional) | **expo-av** | Microphone recording during debate turns; gracefully absent if not installed |
| Styling | **StyleSheet** | Native performance; no third-party UI lib |
| Safe area | **react-native-safe-area-context** | Correct notch/Dynamic Island handling on iOS |
| Build/Deploy | **EAS Build + TestFlight** | Cloud iOS builds without a Mac CI server |

### File structure

```
App.js          ← state machine + AsyncStorage (players, settings, completedDrills)
cards.js        ← MOVE_CARDS + CASE_CARDS (content: what, hint, status fields)
data.js         ← constants, utilities, getDailyDraw(), dealMoveCards(); re-exports cards
drills.js       ← DRILLS (5-step Bronze) + DRILLS_LEGACY (2-step Silver/Gold) for Solo Dojo
styles.js       ← design tokens (C) + StyleSheet (S) — Ink & Spark palette
components.js   ← Btn, CardBrowser, MovePickRow, BottomNav, card views
screens.js      ← all screens (Home, Help, Account, PlayerPick, CasePick, CornerTime,
                   Pass, Debate, RoundEnd, Points, SoloDojo)
app.json        ← Expo + EAS config; icon = argus_main_icon.png
argus_main_icon.png   ← shield crest icon (app icon + dojo drill bubble)
argus_confident.png   ← single confident fox (Solo Dojo header + Corner Time)
argus_expressions.png ← 6-expression sprite (Confident/Suspicious/etc.)
```

**To add a move card:** append to `MOVE_CARDS` in `cards.js` + add a matching entry to `drills.js`. Always **append** — inserting changes index positions and breaks the daily seed for that date.

**To add a case card:** append to `CASE_CARDS` in `cards.js` only.

---

## Running locally

```bash
# Requires Node 20+ (use nvm)
nvm use 20
npm install --legacy-peer-deps

# Start dev server (scan QR with Expo Go on iPhone)
npx expo start
```

## Building for TestFlight

```bash
npm install -g eas-cli
eas login
eas build --platform ios --profile production
eas submit --platform ios
```

---

## Roadmap

- **V1 (current)** — local pass-and-play, daily quick draw, inline case/player picker, Corner Time (personalised headings), text/voice notes during debate, depleting progress bar, configurable debate time, each player's own move cards, multi-round, scoring, Win/Loss/Draw history (Home + Account), Solo Dojo with Argus (5-step Bronze drills), AsyncStorage persistence, Ink & Spark design direction
- **V2** — daily streak counter, audio transcription (Apple Speech framework), LLM judge (Gemini Flash), structured verdict (winner + witty breakdown + feedback)
- **V3** — player accounts, match history, remote multiplayer, card deck OTA updates via Firebase/Supabase
