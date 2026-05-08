# The Debater's Gambit

A mobile card game for sharpening debate and rhetoric skills — built for a parent and child to play together on one phone during the school run or at the dinner table. Players argue real cases using rhetorical move cards inspired by history's sharpest minds: Lincoln, Obama, Mandela, and more.

> *"Words are your weapons. Wit is your armor."*

---

## What is it?

Two players. One case. One move card each.

A **Case Card** sets the debate topic — from easy warm-ups ("Pizza is a valid breakfast food") to hard philosophical clashes ("A world of magic would be worse than a world of technology"). A **Move Card** assigns each player a rhetorical technique they must try to use: tell a humble folktale, paint an irresistible vision of the future, find common ground, or bluff with absolute confidence.

Each player gets 5 minutes to speak. Then points are awarded — 1 for winning the argument, and a bonus point if you actually used your move card. Over time, players level up from Bronze to Platinum tier, building real-world persuasion and storytelling skills one round at a time.

---

## Scoring

| Action | Points |
|---|---|
| Won the argument | +1 pt |
| Used your move card | +1 bonus pt |

Maximum 2 points per player per round.

---

## Cards

### Move Cards (4 included, 20 planned)

| Card | Tier | Inspiration |
|---|---|---|
| The Charming Bluff | Silver · Tactician | Locke Lamora |
| Paint the Future | Gold · Orator | Barack Obama |
| The Honest Tale | Silver · Storyteller | Abraham Lincoln |
| The Bridge Builder | Gold · Master | Nelson Mandela |

### Case Cards (6 included, 20 planned)

| Case | Difficulty |
|---|---|
| Kids should decide their own bedtime | Easy |
| Pizza is a perfectly valid breakfast food | Easy |
| Cats would make better secret agents than dogs | Easy |
| Hot dogs legally count as sandwiches | Easy |
| Aliens are currently hiding on Earth | Medium |
| A world of magic would be worse than one of technology | Hard |

---

## Game Flow

```
Account tab → Add players (e.g. Heri, Raphael, Leo)

⚔️  New Case tab →
  1. Choose 2 players
  2. Browse case cards (sorted Easy → Hard, swipe or arrow)
     — or tap 🎲 Random for a slot-machine pick
  3. Player 1 picks their move card (secretly)
  4. Pass phone to Player 2 (privacy cover screen)
  5. Player 2 picks their move card (secretly)
  6. DEBATE — 5-minute live timer per player
     - Full case description visible at all times
     - Your move card shown; opponent's hidden until scoring
     - Tap "Done" to finish early and pass to opponent
  7. SCORE — reveal both move cards, award points
  8. Results saved to Account history
```

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React Native + Expo SDK 54** | Single codebase for iOS and Android; Expo Go for instant dev testing |
| Language | **JavaScript / React 19** | Fast iteration; no compile step |
| Navigation | **Custom state machine** (`gamePhase`) | No dependency overhead for a linear flow |
| Animation | **React Native `Animated` API** | Built-in; powers card slide transitions and random spin |
| Persistence | In-memory React state | Zero-config for V1; swap to AsyncStorage or Supabase for V2 |
| Styling | **StyleSheet** | Native performance; no third-party UI lib |
| Safe area | **react-native-safe-area-context** | Correct notch/Dynamic Island handling on iOS |
| Build/Deploy | **EAS Build + TestFlight** | Cloud iOS builds without a Mac CI server |

### File structure (intentionally minimal)

```
App.js          ← everything: data, logic, all screens, styles
package.json
app.json        ← Expo + EAS config
babel.config.js
```

Per the README philosophy: ship first, refactor later.

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

- **V1 (current)** — local pass-and-play, card browser, scoring, player roster, history
- **V2** — audio recording + transcription (Apple Speech framework), LLM judge (Gemini Flash), structured verdict (winner + witty breakdown + feedback)
- **V3** — player accounts, match history, remote multiplayer, card deck OTA updates via Firebase/Supabase
