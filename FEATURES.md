# The Debater's Gambit — Feature List

> Current as of May 2026. Covers the front-end app (React Native / Expo) and back-end API (Phoenix / Elixir).

---

## What the App Is

A card game that teaches speaking, arguing, and persuasion. Playable solo or with others, no experience required. Players draw cards and use them to structure real, spoken arguments. The mascot is Argus, a fox barrister with six mood expressions (confident, encouraging, smug, suspicious, thinking, dramatic).

---

## Game Modes

### Quick Draw (Solo)
- One player, no opponent needed.
- A case (debate topic) and three cards are dealt automatically.
- The player argues out loud using the cards in their hand.
- Seeded daily: the same case and card combination appears for everyone on a given date.
- Accessible from the Home screen with one tap.

### VS Mode (2-player, pass-and-play)
Full debate game on a single device, passed between two players.

**Setup**
- Players are selected from a saved list of names.
- A case card (debate topic) is chosen, filterable by difficulty (Easy / Medium / Hard).
- Each player is dealt a hand of cards (configurable: 2–N cards per player).

**Each debate turn**
1. The active player receives the phone and debates out loud using a move card (a rhetorical technique). A countdown timer runs (default 60 seconds, configurable).
2. The active player may also place a hazard card on their opponent, restricting how the opponent must argue next turn.
3. Joker cards cancel any active hazard. Filibuster cards skip the debate turn entirely. Delegate cards make the opponent argue your side.
4. After the debate, the opponent has a 15-second window to play a counter card (an interrupt technique). If they do, the original player delivers a comeback argument.
5. Compliance checks: after a hazard or counter argument, the other player judges whether the restriction was followed. Failing means drawing a penalty card.
6. If neither player played a card this turn, they may exchange one card from their hand for a fresh one.
7. Win condition: the first player to empty their hand wins.

**Between turns**
- A cover screen prompts the pass so the next player cannot see the current hand.
- Pending hazards (queued during a comeback) carry forward to the next debate turn.

**Post-game**
- Winner is displayed with a win screen.
- The result is saved to local game history (case title, winner, date, players).
- If signed in, the result is also synced to the server.

### Solo Dojo (Training)
Structured drills for each move card. Players work through training content at their own pace.

**Drill structure (5 steps per card)**
1. Understand the Concept: what the technique is in the real world, with examples and multiple-choice questions.
2. Understand the Feeling: emotional recognition — what it feels like to need this technique, with layered scenarios.
3. See It in Arguments: the technique demonstrated in debate contexts, with comprehension questions.
4. Put It Together: full technique practice — the player sees an opponent's argument and picks the best response.
5. Say It: a model argument is shown, a timer runs, and the player says it out loud.

**Drill mechanics**
- Argus changes expression based on correct/incorrect answers.
- Per-answer feedback for every multiple-choice option.
- Completion tracked per card, persisted locally and synced to server when logged in.
- Each drill is fully replayable.
- Legacy 2-step drills exist for Silver and Gold tier cards (backward-compatible format).

---

## Card Library

### Move Cards (12 total)
Rhetorical techniques. Each card has a name, a one-sentence description (what the move is), a concrete structural hint, and an inspiration figure.

| Tier | Cards |
|---|---|
| Bronze / Novice (8) | The Fair Play, The Kind Heart, The Golden Rule, The Pinky Promise, The Team, The Best Friend, The Lion's Courage, Be Responsible |
| Silver / Tactician (2) | The Charming Bluff, The Honest Tale |
| Gold / Orator (2) | Paint the Future, The Bridge Builder |

### Hazard Cards (40 total)
Played at the end of your debate turn. Restricts how your opponent must argue next round.

| Category | Cards |
|---|---|
| Constraints | No Numbers, One Sentence, Must Use Numbers, 5 Year Old, 30 Seconds, No Adjectives, Forbidden Word, No I or Me, Rhyme Time, Three Examples, Agree First, Question Ender |
| Physical | Walk and Talk, Whisper Only, Use the Room, Story Time, Another Language |
| Persona | Talk Like Bond, Talk Like Trump, Talk Like Obama, Talk Like Musk, Talk Like Oprah, Talk Like a Frenchman, Talk Like an Italian, Talk Like a New Yorker, Talk Like an Australian, Talk Like a Pastor, Talk Like a General, Talk Like Mario, Talk Like Gandalf |
| Social Reaction | Get the Hug, Make Them Smile, Make Them Laugh, Make Them Sad, Make Them Angry, Sit/Stand Swap, Test Their Patience, The Clock Check, Make Them Say Yes, The Nod |

### Counter Cards (10 total)
Played as an interrupt when your opponent finishes arguing.

| Category | Cards |
|---|---|
| Regular (5) | The Redirect, The Question Mark, The Plain Truth, The About-Face, The Witness |
| Advanced (5) | The Magnifying Glass, The Feint, The Mirror, The Endless Question, The Reframe |

### Joker Cards (4 total)
Cancel any hazard placed on you. VS mode only.
The Wild Card, The Escape Plan, The Nullifier, The Free Pass.

### Filibuster Cards (4 total)
Skip your debate turn. Cannot be played if a hazard is active. VS mode only.
The Filibuster, The Procedural Hold, The Walkout, The Abstention.

### Delegate Cards (4 total)
Your opponent argues your side of the case this turn. Hazards carry over. VS mode only.
The Proxy, The Secondment, The Advocate, The Delegation.

### Case Cards (28 total)
Debate topics. Each has a title, difficulty level, and a short description of both sides.

| Difficulty | Count |
|---|---|
| Easy | 25 (21 kid-friendly + 4 classic) |
| Medium | 2 |
| Hard | 1 |

Sample topics: Superheroes Would Make Terrible Teachers, Video Games Should Count as Homework, Kids Should Decide Their Own Bedtime, Hot Dogs Technically Count as Sandwiches, Aliens Definitely Exist, Magic Should Be Regulated by the Government.

---

## Home Screen

- Daily Quick Draw card — today's seeded case and card pairing, same for all players.
- Start Quick Draw button — launches the daily solo draw in one tap.
- Start VS Game button — goes directly to the VS mode flow (player selection, then case selection).
- Navigation bar with five tabs: Home, VS, Dojo, Account, Help.

---

## Onboarding

Shown once on first launch. A 3-page carousel:

1. Welcome page — what the app is, who it's for.
2. Skills page — four skills you'll develop: speaking clearly, building arguments, pushing back, storytelling.
3. How It Works page — three steps: pick a case, play your cards, win by playing your whole hand.

After onboarding, the app goes to account creation.

---

## Accounts and Authentication

**Guest mode**
- Play immediately without signing in.
- Progress (drills, history) stays local on the device.

**Account creation and sign in**
- Register with name, email, and password.
- Sign in with email and password.
- Sign out (invalidates server token).
- Auth is optional at every step — "Not now. Play as a guest." is always available.

**Signed-in experience**
- Auth token stored locally and validated silently on every launch.
- If the token is expired or invalid, the user is returned to the sign-in screen.
- Drill completions sync to the server automatically.
- Game results sync to the server automatically.
- On login, server-side completed drills are merged with local progress (no data is lost).

**Player profiles**
- Multiple named players can be stored on a device.
- Any two players can be selected for a VS game.
- Players are distinct from account users (profiles are local names; accounts are server identities).

---

## Settings

- Debate timer: adjustable duration per debate turn.
- Cards per player: adjustable hand size at game start.
- Settings are persisted locally across app restarts.

---

## Game History

- Every VS game result is saved: case title, winner, player names, date.
- Displayed in the Account tab as a list.
- Win/loss badge shown for the first registered player.
- When signed in, history is also recorded on the server.

---

## Help Screen

A built-in reference screen explaining:

- What the game is and the lore behind it (Argus and the Parlour of Minds).
- How to play each mode (VS, Quick Draw, Solo Dojo).
- What each card type does (Move, Hazard, Counter, Joker, Filibuster, Delegate).
- Rules for compliance checks and penalty cards.

---

## Content Delivery

- Card data is seeded locally in the app bundle (cards.js, drills.js).
- Remote card updates can be pushed from the back-end without an app update. New case cards are fetched, cached, and merged with local data on each launch.

---

## Back-end API

A Phoenix (Elixir) server with a SQLite database. All endpoints are optional — the app works fully offline without them.

| Endpoint | What it does |
|---|---|
| POST /api/users/register | Create an account |
| POST /api/users/sign_in | Sign in, returns bearer token |
| DELETE /api/users/sign_out | Invalidate token |
| GET /api/users/me | Validate token, return user info |
| POST /api/drills/:id/complete | Record a completed drill |
| GET /api/drills | Get the list of completed drill IDs |
| POST /api/games | Record a finished VS game |
| GET /api/games | Get game history |

**Data stored per user**
- Completed drill IDs
- Game records (type, winner, case title, round count, timestamp)
- Card usage stats

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile app | React Native, Expo SDK 55 |
| State and storage | React hooks, AsyncStorage |
| Back-end | Phoenix 1.8, Elixir |
| Database | SQLite (via Ecto) |
| Auth | Bearer token (stored in AsyncStorage) |
| Card updates | Remote JSON fetch with local cache |
