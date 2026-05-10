# The Debater's Gambit

A mobile card game for sharpening debate and rhetoric skills — built for a parent and child to play together on one phone during the school run or at the dinner table. Players argue real cases using rhetorical move cards inspired by history's sharpest minds: Lincoln, Obama, Mandela, and more.

> *"Words are your weapons. Wit is your armor."*

---

## What is it?

Two players. One case. A hand of move cards.

A **Case Card** sets the debate topic — from kid-friendly warm-ups ("Superheroes would make terrible teachers") to hard philosophical clashes ("A world of magic would be worse than a world of technology"). Each player is **dealt 2 Move Cards** — rhetorical techniques they can choose to use during their turn for a bonus point: tell a humble folktale, paint a vision of the future, find common ground, or bluff with absolute confidence.

Each player gets 5 minutes to speak. Then points are awarded — 1 for winning the argument, and a bonus point if you actually used a move card. Over time, the card pool expands from Bronze to Gold tier as you build real-world persuasion and storytelling skills.

---

## Scoring

| Action | Points |
|---|---|
| Won the argument | +1 pt |
| Used your move card | +1 bonus pt |

Maximum 2 points per player per round.

---

## Game Modes

### 📅 Daily Quick Draw (Home screen)
A pre-generated daily pairing — one Case Card and one Move Card of the Day — seeded from the date so it's identical for everyone. No browsing, no choosing. Tap **▶ Play Today's Round** and debate immediately. Foundation for the streak mechanic coming in V2.

### ⚔️ New Case (bottom nav)
Full custom game. Browse and pick any case, get dealt 2 random move cards, play as many rounds as you want.

**Move card dealing rules:**
- Fewer than 10 rounds in history → always dealt **NOVICE (Bronze)** cards — easier techniques suited to beginners
- 10+ rounds → dealt from the full card pool (Bronze, Silver, Gold)

---

## Cards

### Move Cards (12 included — Bronze · Silver · Gold tiers)

| Card | Tier | Inspiration |
|---|---|---|
| The Fair Play | Bronze · Novice | Hermione Granger |
| The Kind Heart | Bronze · Novice | Mister Rogers |
| The Golden Rule | Bronze · Novice | Moana |
| The Pinky Promise | Bronze · Novice | Pinocchio (reformed) |
| The Team | Bronze · Novice | Paw Patrol |
| The Best Friend | Bronze · Novice | Woody |
| The Lion's Courage | Bronze · Novice | Simba |
| Be Responsible | Bronze · Novice | Steven Universe |
| The Charming Bluff | Silver · Tactician | Locke Lamora |
| The Honest Tale | Silver · Storyteller | Abraham Lincoln |
| Paint the Future | Gold · Orator | Barack Obama |
| The Bridge Builder | Gold · Master | Nelson Mandela |

### Case Cards (17 included — Easy · Medium · Hard)

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

📅  Home tab → Daily Quick Draw card →
  1. Tap "▶ Play Today's Round"
  2. Choose 2 players
  3. DEBATE — case and Move of the Day pre-assigned, timer starts immediately
  4. After each round: "Next Round" or "End Game & Score"
  5. SCORE — reveal move cards, award points

⚔️  New Case tab →
  1. Choose 2 players
  2. Browse case cards (sorted Easy → Hard, swipe or arrow)
     — or tap 🎲 Random for a slot-machine pick
  3. 2 move cards are dealt to both players (NOVICE only before 10 rounds in history)
  4. DEBATE — 5-minute live timer per player
     - Full case description visible at all times
     - Your 2 dealt cards shown; pick one (or none) during your turn
     - Tap "Done" to finish early and pass to opponent
  5. After each round: "Next Round" or "End Game & Score"
  6. SCORE — reveal chosen move cards, award points, save to history
```

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React Native + Expo SDK 54** | Single codebase for iOS and Android; Expo Go for instant dev testing |
| Language | **JavaScript / React 19** | Fast iteration; no compile step |
| Navigation | **Custom state machine** (`gamePhase` + `gameMode`) | No dependency overhead for a linear flow |
| Animation | **React Native `Animated` API** | Built-in; powers card slide transitions and random spin |
| Persistence | **AsyncStorage** | Player names and settings survive app restarts |
| Styling | **StyleSheet** | Native performance; no third-party UI lib |
| Safe area | **react-native-safe-area-context** | Correct notch/Dynamic Island handling on iOS |
| Build/Deploy | **EAS Build + TestFlight** | Cloud iOS builds without a Mac CI server |

### File structure

```
App.js          ← state machine + AsyncStorage only
data.js         ← MOVE_CARDS, CASE_CARDS, getDailyDraw(), dealMoveCards()
styles.js       ← design tokens (C) + StyleSheet (S)
components.js   ← Btn, CardBrowser, MovePickRow, BottomNav, card views
screens.js      ← all 8 screens
package.json
app.json        ← Expo + EAS config
babel.config.js
```

**To add a card:** edit `data.js` only. Always **append** to the arrays — inserting changes index positions and breaks the daily seed for that date.

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

- **V1 (current)** — local pass-and-play, daily quick draw, dealt move cards, multi-round, scoring, player roster, history, AsyncStorage persistence
- **V2** — daily streak counter, audio recording + transcription (Apple Speech framework), LLM judge (Gemini Flash), structured verdict (winner + witty breakdown + feedback)
- **V3** — player accounts, match history, remote multiplayer, card deck OTA updates via Firebase/Supabase
