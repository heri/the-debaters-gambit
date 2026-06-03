# The Debater's Gambit — Product Requirements v2.1
## Solo Dojo Edition: Full Drill Specification

> *"Words are your weapons. Wit is your armor."*

---

## Document Purpose

This version supersedes PRD v2.0. The core architecture is unchanged. This update fully specifies the **Solo Dojo drill structure** so that developers and content writers can begin implementation immediately. Everything in this document is buildable without backend infrastructure.

---

## What Didn't Change

- Three-mode architecture: Solo Dojo → Debate Puzzles → The Arena
- Account model: main account + child accounts, AsyncStorage for V2
- Progression: Wit Points, streaks, tier gating, Vault collection
- Design direction: Ink & Spark, Argus the fox barrister
- Tech stack: React Native + Expo SDK 54
- Content files: `cards.js`, `drills.js`, `puzzles.js`

What changed: the Solo Dojo drill structure is now fully specified. The previous 4-step model is replaced by a **5-step model** based on validated content design.

---

## The Solo Dojo: Full Specification

### Why Solo Dojo Is the Core Loop

Real-world testing showed that kids do not spontaneously use move cards during live debates. They freeze. This is expected — you cannot apply a technique you haven't internalised yet. The fix is not better UI during the debate. The fix is deeper training before the debate.

When a child discovered Solo Dojo unprompted, completed nearly every drill in one session, and immediately asked for more — that is the signal this entire version is built around.

Solo Dojo is not a tutorial. It is not help text. It is the primary product. The Arena is the payoff you earn by doing it.

---

### The 5-Step Drill Structure

Every move card gets one drill. Each drill has exactly 5 steps. Each step is one or more screens. Steps are sequential and forward-only during a session. Every drill is fully replayable.

The arc is always the same:

```
Step 1 — UNDERSTAND THE CONCEPT       (what is this value/technique in the real world?)
Step 2 — UNDERSTAND THE FEELING       (what does it feel like to need this?)
Step 3 — SEE IT IN ARGUMENTS          (how is this used when debating or persuading?)
Step 4 — PUT IT TOGETHER              (understand your opponent's position, then apply)
Step 5 — SAY IT                       (speak it out loud)
```

This arc mirrors how Duolingo builds language skills: comprehension before production, simple before complex, recognition before generation, reading before speaking.

---

### Step Specifications

---

#### STEP 1 — Understand the Concept

**Purpose:** Ground the move card in real-world experience the child already has. Not debate theory. Not persuasion tactics. Just: what is this thing, and when do you see it in daily life?

**Screen count:** 3 screens per drill minimum (intro → simple example → question → elaborated example → question)

**Screen 1 — Definition screen**
- Argus introduces the concept in 2–3 sentences maximum. Plain words. No jargon.
- Visual: Argus expression = Confident. One simple illustration or icon.
- No interaction. Child taps "Next →" to continue.

**Screen 2 — Simple example screen**
- A concrete, relatable scene. Real life. Ages 6–9 range.
- Shown as a short illustrated scenario with 1–2 caption sentences.
- Example for The Kind Heart: *"A mum baked cookies for her two children. She spent all afternoon making them, and she wants everyone to enjoy them together."*
- No interaction. Child taps "Next →".

**Screen 3 — Simple multiple choice**
- A question about the simple example, testing comprehension.
- 3 options (A, B, C). One clearly correct. Two plausible but wrong.
- **Wrong answer:** Argus expression = Suspicious. Short gentle explanation (1 sentence). Option to try again.
- **Right answer:** Argus expression = Smug. Satisfying sound effect. 1–2 sentence reinforcement shown briefly before auto-advancing.
- Example for The Kind Heart:
  - Scenario: *"A mother has 3 cookies for her 2 children. What should she do?"*
  - A) Give 2 cookies to one child
  - B) Give 1 cookie to each child and keep 1 for herself ✓
  - C) Eat all the cookies herself
  - Correct reinforcement: *"That's right! This way everyone gets to enjoy the cookies together."*

**Screen 4 — Elaborated example screen**
- Same concept, more complex or real-world scenario. Ages 9–12 range.
- Example for The Kind Heart: *"Some people give up their free time every week to volunteer at a local shelter. They help cook meals and keep people company."*
- No interaction. Child taps "Next →".

**Screen 5 — Elaborated multiple choice**
- Question testing the elaborated example.
- Allow for "all of the above" as a correct answer where multiple reasons are valid. This teaches that good arguments often have multiple supporting reasons — itself a debate skill.
- Example for The Kind Heart:
  - Question: *"Why does someone volunteer at a local shelter?"*
  - A) To help people in need
  - B) To learn new skills
  - C) To make new friends
  - D) All of the above ✓
  - Correct reinforcement: *"All of those are great reasons! But the biggest one is kindness — a wish to make things better for someone else."*

---

#### STEP 2 — Understand the Feeling

**Purpose:** Build empathy and emotional vocabulary. Before a child can use The Kind Heart in a debate, they must be able to recognise when someone *needs* kindness — i.e., when someone feels unheard, dismissed, or misunderstood. This step teaches feeling-recognition, not persuasion.

**Screen count:** 4 screens per drill (simple emotional scenario → question → complex emotional scenario → question)

**Screen 1 — Simple emotional scenario**
- A character expresses one clear emotion. Direct quote in speech bubble style.
- Example for The Kind Heart: *"I am so angry! Nobody understands me. I don't want to play with you."*
- Argus expression = Encouraging. Prompt: *"Something is wrong here. Let's figure out what they're feeling."*
- No interaction. Child taps "Next →".

**Screen 2 — Simple emotion multiple choice**
- Question: what is this character feeling?
- Example:
  - A) They feel misunderstood ✓
  - B) They are hungry
  - C) They want to play alone
  - Correct reinforcement: *"Exactly! They're angry because they feel misunderstood. Understanding that is the first step."*

**Screen 3 — Complex emotional scenario**
- Same pattern but character expresses two emotions simultaneously, or a more layered feeling.
- Example for The Kind Heart: *"Why did you guys leave me alone in the park! I don't want to talk to you anymore."*
- Argus: *"This one is more complicated. What are they feeling now?"*

**Screen 4 — Complex emotion multiple choice**
- Options must include "both A and B" or similar as correct answer to teach emotional layering.
- Example:
  - A) Angry
  - B) Sad and left out
  - C) Both A and B ✓
  - Correct reinforcement: *"Right! They're feeling both angry and sad. When someone has big mixed feelings like this, they really need to feel understood before anything else."*

---

#### STEP 3 — See It in Arguments

**Purpose:** Bridge from real-world concept (Step 1) and emotional recognition (Step 2) into the context of debate and persuasion. The child sees the move card technique demonstrated in an argument — not performed by them yet. Observation before action.

**Screen count:** 4 screens per drill (explanation → example → debate example → question)

**Screen 1 — How this works in arguments**
- Argus explains directly how this concept applies when arguing or persuading.
- 2–3 sentences. Plain language.
- Example for The Kind Heart: *"When we argue, we can appeal to someone's kindness. Instead of fighting their point head-on, we show them how being kind leads to the better choice."*

**Screen 2 — Simple argument example + question**
- A short argument scenario. One character trying to convince another.
- The move card is used correctly. Child must identify what made it work.
- Example:
  - Scenario: *"'I know you're a kind person, and your help would mean a lot to me.'"*
  - Question: *"What is this person doing?"*
  - A) Appealing to the other person's kindness ✓
  - B) Making a logical argument
  - C) Threatening them
  - Correct reinforcement: *"Yes! They're appealing to kindness. They're not arguing facts — they're reminding the other person of who they are."*

**Screen 3 — Debate/speech example**
- A more formal context: a debate stage, a class presentation, a student council speech.
- The move card is used in a slightly more sophisticated way.
- Example for The Kind Heart: *"In a debate about school lunches, a student said: 'By making sure every kid has a hot meal, we're showing kindness to the ones who need it most. That's the kind of school we want to be.'"*
- Argus: *"Notice how they didn't just argue about food. They made it about what kind of people we are."*

**Screen 4 — Debate example question**
- Tests comprehension of why the technique works in debate context.
- Allow multi-correct answers where genuine. Teach that persuasion works on multiple levels at once.
- Example:
  - Question: *"Why did appealing to kindness make that argument stronger?"*
  - A) It helped others feel connected to the argument ✓
  - B) It made people feel good about saying yes ✓
  - C) It made the debate more enjoyable ✓
  - D) All of the above ✓
  - Correct reinforcement: *"All of these are true! A kind argument doesn't just win the point — it wins the person."*

---

#### STEP 4 — Put It Together

**Purpose:** This is the full technique in action. The child sees their opponent's feelings AND uses the move card to respond. This is the core skill. Steps 1–3 were preparation. This step is rehearsal.

**Screen count:** 5–6 screens per drill (demonstration → question → harder scenario → question → optional second harder scenario → question)

**Screen 1 — Full technique demonstration**
- A complete example of the move card used correctly in a real debate-style exchange.
- Show both sides: what the opponent said, and what the debater responded.
- Make the move card mechanics visible in the response — annotate or bold the key phrase.
- Example for The Kind Heart:
  - Opponent: *"I think we should stop spending money on the school library. Nobody uses it."*
  - Response: *"I understand why it might seem that way. But for kids who don't have books at home, that library is the only quiet place they have. Keeping it open is one of the kindest things our school can do."*
  - Argus note: *"Notice: they started by acknowledging the opponent's point ('I understand why it might seem that way') — then used kindness to reframe the whole debate."*

**Screen 2 — Build the response (multiple choice)**
- Child is given the opponent's argument. Child must choose the best response using this move card.
- All 3 options are complete arguments. Only one correctly uses the move card technique AND addresses the opponent's actual point.
- Wrong answers are plausible but flawed — they either ignore the opponent's feeling, skip to the argument too fast, or use a different technique entirely.
- Example for The Kind Heart:
  - Opponent: *"My friend says: 'I am not happy, we should have no homework ever because kids are tired after school.'"*
  - A) *"What's wrong with homework? It helps you learn."* ✗ (ignores their feeling)
  - B) *"I actually like homework, so I disagree."* ✗ (doesn't address their experience)
  - C) *"I know — I get tired too. AND doing a little homework keeps what we learned fresh so we do better tomorrow."* ✓
  - Correct reinforcement: *"Perfect! You started by showing you understood their feeling, then added your argument gently. That's The Kind Heart."*

**Screen 3 — Harder scenario demonstration**
- A more complex exchange. The opponent's feeling is less obvious, or involves multiple feelings (from Step 2). The correct response must acknowledge both.

**Screen 4 — Harder build-the-response question**
- Same format as Screen 2 but with the harder scenario. Fewer obvious wrong answers.

**Screens 5–6 (optional, for replayability)** — second harder scenario pair. Shown only on second or third playthrough of the drill (difficulty scaling). First playthrough ends after Screen 4.

---

#### STEP 5 — Say It

**Purpose:** The most important step. Cognitive understanding becomes spoken skill. The child reads a model response out loud — not reads it silently, not taps "got it." Says it. This is the muscle memory step. Without it, the skill stays on the screen.

**Screen count:** 3 screens per drill (model response → say it → confirm)

**Design principle:** This step should feel like a performance, not a test. Argus is the audience. The child is the debater. The Parlour is watching.

**Screen 1 — Model response display**
- Show one complete, polished argument using the move card correctly.
- Formatted clearly for reading aloud — short sentences, natural pauses implied by punctuation.
- Argus expression = Encouraging. Caption: *"This is how The Kind Heart sounds when it works. Read it to yourself first."*
- Large readable text. Parchment background. No timer yet.
- Child taps "I'm ready →" when they've read it.

**Screen 2 — Deliver it**
- Same text remains on screen.
- A 15-second countdown timer starts (gentle depleting bar, not aggressive countdown numbers).
- Argus expression = Confident. Caption: *"Now say it out loud. Like you mean it."*
- Two options at the bottom: **[🎤 I said it!]** and **[Skip this time]**.
- No microphone, no recording, no evaluation. The honour system. Tapping "I said it!" is the commitment. The act of saying it is the point — not proving it to the app.
- "Skip this time" is always available. No shame. But Argus's expression shifts to Suspicious if they skip, and the Wit Points reward is smaller.

**Screen 3 — Completion**
- Argus expression = Smug (if said it) or Encouraging (if skipped).
- Wit Points awarded with animation.
- Card marked complete in collection with a stamp effect.
- One-line Argus sign-off. Tone: sparring partner, not teacher.
  - If completed: *"Verdict: The Kind Heart. Mastered. The Parlour notes your progress."*
  - If skipped: *"Almost. Come back and say it next time. Words need a voice."*
- "Next Card →" button or "Back to Dojo" button.

---

### The Complete Drill — Screen Count Summary

| Step | Screens | Interactions |
|---|---|---|
| 1 — Understand the Concept | 5 | 2 multiple choice questions |
| 2 — Understand the Feeling | 4 | 2 multiple choice questions |
| 3 — See It in Arguments | 4 | 2 multiple choice questions |
| 4 — Put It Together | 4–6 | 2–3 multiple choice questions |
| 5 — Say It | 3 | 1 confirm action |
| **Total** | **20–22 screens** | **9–10 interactions** |

**Estimated session time:** 6–9 minutes for a first-time drill. 3–4 minutes for a replay (child skips faster through known material).

**This is the right length.** Duolingo's average lesson is 5–7 minutes. The child in the real-world test completed nearly every drill in one sitting — the length is not the limiting factor. Engagement is.

---

### Multiple Choice Design Rules

These rules apply to every question across all 5 steps. Consistent rules mean consistent content quality.

1. **Always 3 options minimum.** Never 2 (too easy, feels binary). Never 4+ for ages 6–9 (cognitive overload).
2. **"All of the above" is a valid and encouraged correct answer** when multiple reasons are genuinely true. This teaches that strong arguments often have multiple valid supports — a real debate skill.
3. **Wrong answers must be plausible, not absurd.** "They are hungry" is a lazy distractor. "They want to fix the problem themselves" is a genuine alternative interpretation.
4. **Wrong answer feedback is always one sentence.** Explains why it's wrong, not just that it's wrong. Argus delivers it without sarcasm.
5. **Right answer feedback is always one sentence.** Reinforces the correct reasoning, doesn't just praise. "That's right!" alone is not sufficient — the reinforcement must state *why* it's right.
6. **Right answer sound effect plays immediately** before the text feedback appears. The sound is the reward. The text is the learning.
7. **Never more than 2 questions per step** at Bronze difficulty. Complexity increases on replay (Silver/Gold difficulty) but screen count stays the same.

---

### Argus Expression Usage — Per Step

| Step | Primary Expression | Wrong Answer | Right Answer |
|---|---|---|---|
| 1 — Concept | Confident | Suspicious | Smug |
| 2 — Feeling | Encouraging | Suspicious | Encouraging |
| 3 — Arguments | Thinking | Suspicious | Smug |
| 4 — Put Together | Thinking | Suspicious | Smug |
| 5 — Say It (ready) | Encouraging | — | — |
| 5 — Say It (deliver) | Confident | — | — |
| 5 — Completion (said) | Smug | — | — |
| 5 — Completion (skipped) | Encouraging | — | — |

---

### Difficulty Scaling (Replay Value)

Each drill has 3 difficulty levels, unlocked by replaying:

**Bronze (first playthrough):**
- 3-option multiple choice throughout
- Correct answer includes a visual or textual hint in the option text
- Step 4 ends after Screen 4 (easier scenario only)
- Step 5: 15-second timer

**Silver (second playthrough):**
- 3-option multiple choice with no hints embedded in options
- Step 4 includes Screens 5–6 (harder scenario)
- Step 5: 10-second timer

**Gold (third playthrough):**
- Step 3 and 4: fill-in-the-blank instead of multiple choice
- Step 4: open text field for "build the response" (Argus gives structural cue only, no options)
- Step 5: 8-second timer + Argus says *"Say it faster this time. Like you've said it a hundred times."*

Difficulty is tracked per card per account. Displayed as a small Bronze/Silver/Gold pip on each card in the Dojo browser.

---

### Content Data Structure

Every drill lives in `drills.js`. Each drill maps to one move card via `cardId`. Structure:

```js
{
  cardId: "card_kind_heart",
  steps: [
    {
      step: 1,
      title: "Understand Kindness",
      screens: [
        {
          id: "s1_s1",
          type: "info",                    // info | question | deliver
          argusExpression: "confident",
          heading: "What is Kindness?",
          body: "Kindness means caring about how other people feel — and choosing to help them, even when you don't have to.",
          cta: "Next →"
        },
        {
          id: "s1_s2",
          type: "info",
          argusExpression: "confident",
          heading: "Kindness in Action",
          body: "A mum baked cookies for her two children. She spent all afternoon making them, and she wants everyone to enjoy them together.",
          cta: "Next →"
        },
        {
          id: "s1_s3",
          type: "question",
          argusExpression: "thinking",
          prompt: "A mother has 3 cookies for her 2 children. What should she do?",
          options: [
            { text: "Give 2 cookies to one child", correct: false,
              feedback: "That wouldn't be fair to the other child." },
            { text: "Give 1 cookie to each child and keep 1 for herself", correct: true,
              feedback: "That's right! This way everyone gets to enjoy the cookies together." },
            { text: "Eat all the cookies herself", correct: false,
              feedback: "That would leave the children with nothing — not very kind!" }
          ]
        }
        // ... more screens
      ]
    },
    // steps 2–5...
  ]
}
```

**Screen types:**
- `info` — display only, Argus + heading + body + CTA button
- `question` — multiple choice, options array with correct flag and per-option feedback
- `fill_blank` — sentence with `___` placeholder + options or free text (Silver/Gold difficulty)
- `deliver` — Say It screen with timer, "I said it!" / "Skip" buttons

---

### Wit Points — Solo Dojo

| Action | Points |
|---|---|
| Complete a question correctly (first try) | +5 |
| Complete a question correctly (after retry) | +2 |
| Complete a full drill (Bronze, first time) | +20 |
| Complete a full drill (Silver difficulty) | +15 |
| Complete a full drill (Gold difficulty) | +25 |
| Step 5 — "I said it!" | +10 |
| Step 5 — "Skip this time" | +3 |
| All Bronze drills completed | +100 (milestone bonus) |

---

### Tier Gating

| Tier | Unlock Condition |
|---|---|
| Bronze drills (8 cards) | Available immediately |
| Silver drills (4 cards) | All 8 Bronze drills completed at Bronze difficulty |
| Gold drills (not in V2) | All Silver drills completed at Bronze difficulty |
| Bronze drill Silver difficulty | Card completed once at Bronze difficulty |
| Bronze drill Gold difficulty | Card completed twice (Bronze + Silver difficulty) |

---

## The Three Modes — Summary (Unchanged from v2.0)

### Mode 1: Solo Dojo
Fully specified above. This is the core loop for V2.

### Mode 2: Debate Puzzles
Frozen debate moments. Given: case card + opponent's argument + player's move card. Task: choose the best response from 3 options. Each option is a complete 2–3 sentence argument. Correct answer uses the move card technique AND addresses the opponent's actual points.

Grouped into packs of 5 per move card. Daily Puzzle on home screen. Full spec in v2.0 (unchanged).

### Mode 3: The Arena
Pass-and-play live debate. Argus gives move-card-specific coaching whisper during Corner Time. Move cards are bonus points, not requirements. Full spec in v2.0 (unchanged).

---

## Home Screen — Daily Loop

Every day, the home screen shows:

1. **Daily Quick Draw** — one pre-seeded Case + Move Card pairing. Tap to go directly to Arena with today's case. (~2 min)
2. **Daily Dojo Drill** — one recommended drill based on what's next in the child's progression. Tap to go directly to that drill. (~6–8 min first time, ~3 min replay)
3. **Streak counter** — days in a row with at least one completed action.
4. **Argus greeting** — one rotating contextual line based on streak, last session, or time of day.

Completing either Daily Quick Draw OR Daily Dojo Drill maintains the streak. Both in one day = streak bonus Wit Points.

---

## Account Structure

**On first launch:**
1. *"Who's playing?"* — set up main account (name, I am: Adult / Teen / Child)
2. Optional: *"Add a child?"* — child name, age range (6–8 / 9–11 / 12+)
3. Every subsequent launch: *"Playing as [Main] or [Child]?"* — one tap selector

All progress (streak, Wit Points, drills completed, Arena history, collection) is stored per account in AsyncStorage. Accounts are device-local in V2. Cross-device sync in V3 via Supabase.

Parent account can view child account's progress from Account tab. Child account cannot access parent progress or settings.

---

## Content Needed for V2 Launch

To ship V2, the following content must be written and entered into `drills.js`:

| Move Card | Tier | Drill Status Needed |
|---|---|---|
| The Fair Play | Bronze | Full 5-step drill |
| The Kind Heart | Bronze | Full 5-step drill ✓ (this document) |
| The Golden Rule | Bronze | Full 5-step drill |
| The Pinky Promise | Bronze | Full 5-step drill |
| The Team | Bronze | Full 5-step drill |
| The Best Friend | Bronze | Full 5-step drill |
| The Lion's Courage | Bronze | Full 5-step drill |
| Be Responsible | Bronze | Full 5-step drill |

8 drills × ~20 screens each = **~160 screens of content** to write.

This is handcrafted work, not generated. Each screen should be reviewed by someone who has spent time with children in the 7–10 age range. Scenarios must feel real and familiar, not educational-video-stilted.

**Content writing guide (for each drill):**
- Step 1 examples: start with home/food/family context, move to school or community context
- Step 2 examples: playground conflicts, feeling left out, feeling misunderstood — universally recognisable
- Step 3 examples: start with a one-on-one conversation, move to a class debate or student council context
- Step 4 examples: use topics from the Case Card library where possible (homework, bedtime, pets, food) so the training directly connects to games they've already played
- Step 5 model response: write it the way a confident 10-year-old would actually say it — not a TED talk, not baby talk

---

## File Structure (Updated)

```
App.js                  ← state machine, account switching, AsyncStorage
cards.js                ← MOVE_CARDS + CASE_CARDS (status, tier, metadata)
drills.js               ← all drill content (5 steps × ~20 screens × 8 Bronze cards)
puzzles.js              ← puzzle packs (5 puzzles × 8 Bronze cards = 40 puzzles)
data.js                 ← getDailyDraw(), getDailyPuzzle(), getDailyDrill(), utilities
accounts.js             ← account creation, switching, per-account AsyncStorage
progression.js          ← Wit Points logic, streak, tier gating, vault state
styles.js               ← Ink & Spark design tokens + StyleSheet
components.js           ← shared UI: Btn, CardBrowser, MovePickRow, BottomNav,
                           ArgusDisplay, ProgressBar, WitPointsBurst, MultiChoice
screens/
  Home.js               ← daily quick draw + daily dojo + streak + Argus greeting
  SoloDojo.js           ← drill browser (tier-gated) + drill runner (5 steps)
  Puzzles.js            ← puzzle pack browser + puzzle player
  Arena.js              ← case picker + debate flow + corner time + scoring
  Vault.js              ← move card collection + case collection + trophies
  Account.js            ← account switcher + parent view + settings
  Help.js
assets/
  argus_confident.png
  argus_suspicious.png
  argus_smug.png
  argus_encouraging.png
  argus_thinking.png
  argus_dramatic.png
  argus_main_icon.png   ← app icon (shield crest)
  sfx_correct.mp3
  sfx_wrong.mp3
  sfx_complete.mp3
  sfx_streak.mp3
```

---

## New Component: DrillRunner

The Solo Dojo drill runner is a new screen component that handles the 5-step flow. It is separate from the existing SoloDojo screen (which is the browser/selection screen).

**Props:**
- `cardId` — which card's drill to run
- `difficulty` — 'bronze' | 'silver' | 'gold'
- `onComplete(result)` — callback with `{ witPoints, stepsCompleted, saidIt }`

**Internal state:**
- `currentStep` (1–5)
- `currentScreen` (index within step)
- `correctAnswers` (count, for Wit Points)
- `wrongAttempts` (count per question, for feedback)

**Behaviour:**
- Tracks completion per screen in a local array, persisted to AsyncStorage on `onComplete`
- Never skips a screen (forward-only within a session)
- "Back" during a drill = confirmation dialog ("Leave this drill? Your progress won't be saved.")
- Progress bar at top shows position within the full drill (not per step)

---

## Roadmap (Updated)

### V2 — This Document
- [ ] DrillRunner component (5-step flow, all screen types)
- [ ] Full Bronze drill content for all 8 Bronze move cards (~160 screens)
- [ ] Difficulty scaling infrastructure (Bronze/Silver/Gold per card per account)
- [ ] Account model (main + child, AsyncStorage, account switcher)
- [ ] Debate Puzzles mode (40 puzzles across Bronze pack)
- [ ] Daily Dojo recommendation on home screen
- [ ] Streak counter + milestone Wit Points
- [ ] Argus 5-expression asset set
- [ ] Sound effects (correct, wrong, complete, streak)
- [ ] Basic Vault (move card + case card collection)

### V3 — The Network
- [ ] Supabase backend, cross-device sync
- [ ] Silver + Gold tier drill content
- [ ] AI-powered Argus arguments in Arena Vs AI mode
- [ ] OTA content updates
- [ ] Parent weekly Debate Digest
- [ ] Combo Book, Trophy Shelf, Argus costumes

### V4 — The Platform
- [ ] Teacher / classroom accounts
- [ ] Custom Case Card creator
- [ ] School leaderboard (class vs class)
- [ ] Open-text drill responses with AI feedback

---

*Document Version 2.1 — The Debater's Gambit Product Requirements*
*Supersedes v2.0 and all previous README versions*
*Solo Dojo drill structure fully specified and ready for development*