// Hardcoded 2-step drills for each Move Card.
// Each drill: Argus presents a bad argument → player spots the flaw (multiple choice)
//             → player completes the counter using the move (fill in blank).
//
// To add a drill for a new card, copy an existing entry and change the card id key.
// argus       = what Argus says in the speech bubble
// question    = the task prompt shown to the player
// options     = exactly 3 choices, shortest-first where possible
// correct     = 0-based index of the right answer
// feedbackOk  = shown when the player picks correctly
// feedbackOops = shown when the player picks wrong (gentle, points to correct answer)

export const DRILLS = {

  // ── BRONZE ─────────────────────────────────────────────────────────────

  'm-b1': { // THE FAIR PLAY — Hermione Granger
    steps: [
      {
        argus: '"We should stay up later tonight because it\'s the weekend!"',
        question: "What's missing from this argument?",
        options: [
          "The weekend doesn't change the bedtime rule",
          'Weekends are too short',
          'Staying up late is unhealthy',
        ],
        correct: 0,
        feedbackOk: "Yes! Hermione would say: where in the rules does it say the weekend changes bedtime? It doesn't!",
        feedbackOops: "Not quite — the answer is A. Loving the weekend doesn't mean the rule disappears. THE FAIR PLAY always asks: what does the rule actually say?",
      },
      {
        argus: 'Now finish the argument using THE FAIR PLAY:',
        question: '"It might be the weekend — but the rule clearly says ___"',
        options: [
          'bedtime stays the same',
          'we can decide ourselves',
          'parents should check',
        ],
        correct: 0,
        feedbackOk: "⭐ Rule cited, argument made! That's THE FAIR PLAY in action.",
        feedbackOops: "Close — the strongest answer is A. THE FAIR PLAY points straight back to the rule, no wobbling.",
      },
    ],
  },

  'm-b2': { // THE KIND HEART — Mister Rogers
    steps: [
      {
        argus: '"The new kid keeps asking to join our game. Just say no — we already have enough players!"',
        question: "What would THE KIND HEART do first?",
        options: [
          'Understand how being left out feels',
          'Explain the game rules clearly',
          'Politely say the game is full',
        ],
        correct: 0,
        feedbackOk: "Right! Mister Rogers always said: before your argument, make the other person feel heard.",
        feedbackOops: "The answer is A. THE KIND HEART leads with empathy — understand the feeling before you make your point.",
      },
      {
        argus: 'Now complete the sentence using THE KIND HEART:',
        question: '"I know it feels ___ to be left out — so let\'s find a way to include you."',
        options: [
          'really hard',
          'a bit annoying',
          'confusing',
        ],
        correct: 0,
        feedbackOk: "⭐ Empathy first, always. That's THE KIND HEART!",
        feedbackOops: "A is the best answer — 'really hard' is the warmest and most honest. Mister Rogers wouldn't soften it.",
      },
    ],
  },

  'm-b3': { // THE GOLDEN RULE — Moana
    steps: [
      {
        argus: '"We should do PE today because I feel like running!"',
        question: "What deeper WHY is missing from this argument?",
        options: [
          'Why it helps everyone, not just one person',
          'What sport we should play',
          'Whether it might rain',
        ],
        correct: 0,
        feedbackOk: "Yes! Moana always asks: why does this matter for ALL of us, not just me?",
        feedbackOops: "The answer is A. THE GOLDEN RULE looks for the bigger reason — the one that works for everybody.",
      },
      {
        argus: "Complete the Golden Rule counter:",
        question: '"PE isn\'t just about me feeling like running — it keeps ___ healthy and ready to learn."',
        options: [
          'all of us',
          'just me',
          'the fastest kids',
        ],
        correct: 0,
        feedbackOk: "⭐ That's THE GOLDEN RULE — bigger than one person!",
        feedbackOops: "A is the move — 'all of us' shows you're thinking about the whole group, not just yourself.",
      },
    ],
  },

  'm-b4': { // THE PINKY PROMISE — Pinocchio (reformed)
    steps: [
      {
        argus: '"I think maybe we should probably perhaps try the new lunch option if you want to…"',
        question: "What's wrong with how this sounds?",
        options: [
          "Too many 'maybes' — a promise needs total certainty",
          'The lunch option might not be good',
          'The sentence is too long',
        ],
        correct: 0,
        feedbackOk: "Nailed it! A Pinky Promise cannot have 'maybe' or 'perhaps'. You must believe it 100%!",
        feedbackOops: "The answer is A. THE PINKY PROMISE lives and dies by conviction. 'Maybe' kills it instantly.",
      },
      {
        argus: 'Now deliver THE PINKY PROMISE — no maybes allowed:',
        question: '"I promise you: this new lunch option is ___ and everyone will love it."',
        options: [
          'absolutely worth trying',
          'probably okay',
          'worth a try maybe',
        ],
        correct: 0,
        feedbackOk: "⭐ That's a real Pinky Promise — certain, bold, unbreakable!",
        feedbackOops: "A is the only answer — 'absolutely' is the word that makes it a real promise. No hedging!",
      },
    ],
  },

  'm-b5': { // THE TEAM — Paw Patrol
    steps: [
      {
        argus: '"I should get the last slice of pizza because I\'m the hungriest!"',
        question: "What makes a stronger team argument?",
        options: [
          'Show how sharing helps the whole group',
          'Prove you really are the hungriest',
          'Say everyone should get equal pizza',
        ],
        correct: 0,
        feedbackOk: "Yes! Paw Patrol never argues for just one pup — the best argument helps the whole team!",
        feedbackOops: "The answer is A. THE TEAM move looks for what's best for everyone, not just the loudest voice.",
      },
      {
        argus: 'Complete the team argument:',
        question: '"If we share the last slice, ___ is happy — and a happy team works better."',
        options: [
          'everyone',
          'nobody',
          'most people',
        ],
        correct: 0,
        feedbackOk: "⭐ No pup left behind — that's THE TEAM!",
        feedbackOops: "A is right — 'everyone' is what THE TEAM is all about. Not 'most' — everyone.",
      },
    ],
  },

  'm-b6': { // THE BEST FRIEND — Woody
    steps: [
      {
        argus: '"I used to think homework was important — but everyone says it\'s useless now, so maybe I was wrong?"',
        question: "What does THE BEST FRIEND refuse to do?",
        options: [
          'Change position just because of pressure',
          'Admit homework has any value',
          'Listen to what others think',
        ],
        correct: 0,
        feedbackOk: "Exactly! Woody stays loyal to what he believes. Pressure doesn't change that.",
        feedbackOops: "The answer is A. THE BEST FRIEND doesn't flip just because the crowd disagrees. That's what makes it powerful.",
      },
      {
        argus: 'Stand firm! Complete THE BEST FRIEND:',
        question: '"I\'ve always believed homework builds real skills — and I ___ that, no matter what anyone says."',
        options: [
          'still believe',
          'used to believe',
          'might still believe',
        ],
        correct: 0,
        feedbackOk: "⭐ Still loyal to the end — that's THE BEST FRIEND!",
        feedbackOops: "A is the only answer. 'Still believe' — present tense, no waver. Woody doesn't say 'used to'.",
      },
    ],
  },

  'm-b7': { // THE LION'S COURAGE — Simba
    steps: [
      {
        argus: '"Your team lost 5 matches this season — so you\'ll definitely lose the big game too."',
        question: "How does THE LION'S COURAGE respond to this?",
        options: [
          "Admit the losses, then show how the team has grown",
          'Disagree with the score',
          'Change the subject to something else',
        ],
        correct: 0,
        feedbackOk: "Yes! Simba doesn't run from the past — he admits it honestly, then roars about the future.",
        feedbackOops: "The answer is A. THE LION'S COURAGE is about owning the weakness first, then showing the growth. That's what makes it powerful.",
      },
      {
        argus: "Complete Simba's response:",
        question: '"Yes, we lost those games — but since then we\'ve trained every day, and now we are ___."',
        options: [
          'ready to win',
          'still the same team',
          'a little bit better',
        ],
        correct: 0,
        feedbackOk: "⭐ The circle of life is improvement — that's THE LION'S COURAGE!",
        feedbackOops: "A is the move — 'ready to win' is the roar at the end. 'A little bit better' is too timid for Simba.",
      },
    ],
  },

  'm-b8': { // BE RESPONSIBLE — Steven Universe
    steps: [
      {
        argus: '"I should get more screen time because I really like watching videos!"',
        question: "What does BE RESPONSIBLE add that\'s missing?",
        options: [
          "Show it's fair and good for everyone, not just you",
          'List what videos you would watch',
          'Say exactly how long you need',
        ],
        correct: 0,
        feedbackOk: "Exactly! Steven always thinks about what's caring and fair for everyone — not just what he wants.",
        feedbackOops: "The answer is A. BE RESPONSIBLE isn't about what you want — it's about showing you've thought about others too.",
      },
      {
        argus: 'Complete the responsible argument:',
        question: '"Extra screen time makes sense because I\'ll use it for learning things that help ___."',
        options: [
          'all of us',
          'just me',
          'my favourite shows',
        ],
        correct: 0,
        feedbackOk: "⭐ Crystal Gem approved — you're thinking of others!",
        feedbackOops: "A is the answer — 'all of us' shows responsibility. 'Just me' is the opposite of this move.",
      },
    ],
  },

  // ── SILVER ─────────────────────────────────────────────────────────────

  'm1': { // THE CHARMING BLUFF — Locke Lamora
    steps: [
      {
        argus: '"Erm, I guess… cats might possibly be… okay at being secret agents? Maybe?"',
        question: "What's wrong with this bluff?",
        options: [
          'Zero confidence — a bluff must sound rock-solid',
          'The argument about cats is wrong',
          'The sentence is too short',
        ],
        correct: 0,
        feedbackOk: "The Charming Bluff lives and dies by confidence. If YOU don't believe it, nobody will!",
        feedbackOops: "The answer is A. THE CHARMING BLUFF needs unshakeable certainty — 'maybe' is a bluff-killer.",
      },
      {
        argus: 'Now deliver THE CHARMING BLUFF with total confidence:',
        question: '"Cats are ___ the greatest undercover agents in history. This is not up for debate."',
        options: [
          'objectively',
          'possibly',
          'probably',
        ],
        correct: 0,
        feedbackOk: "⭐ Delivered with zero doubt — that's THE CHARMING BLUFF!",
        feedbackOops: "A — 'objectively' sounds like established fact. 'Possibly' and 'probably' are confidence-killers.",
      },
    ],
  },

  'm3': { // THE HONEST TALE — Abraham Lincoln
    steps: [
      {
        argus: '"According to a 2019 longitudinal study of 4,200 participants across 12 countries, data suggests that…"',
        question: "What does THE HONEST TALE use instead?",
        options: [
          'A simple story anyone can feel and remember',
          'Even more specific data',
          'Agreement with the study',
        ],
        correct: 0,
        feedbackOk: "Lincoln didn't quote statistics — he told a story a farmer or a child could understand and remember forever.",
        feedbackOops: "The answer is A. THE HONEST TALE replaces data with a story — something people feel, not just understand.",
      },
      {
        argus: 'Start an Honest Tale! Complete the opening:',
        question: '"Let me tell you a quick story. Once, two friends tried to settle an argument with facts alone — and everyone ___. But when one told a simple story, everyone listened."',
        options: [
          'switched off',
          'immediately agreed',
          'asked for more facts',
        ],
        correct: 0,
        feedbackOk: "⭐ A tale that sticks better than any statistic — that's THE HONEST TALE!",
        feedbackOops: "A is right — 'switched off' shows why the story works better. Facts alone put people to sleep.",
      },
    ],
  },

  // ── GOLD ───────────────────────────────────────────────────────────────

  'm2': { // PAINT THE FUTURE — Barack Obama
    steps: [
      {
        argus: '"We\'ve always had the same school lunch menu — change is complicated and risky."',
        question: "How does PAINT THE FUTURE respond to 'it's always been this way'?",
        options: [
          'Make them feel and see a vivid, better future — forget the present argument',
          'Explain clearly why change is actually easy',
          'List all the problems with the current menu',
        ],
        correct: 0,
        feedbackOk: "Yes! Don't argue about now — paint a picture of tomorrow so vivid they stop caring about today.",
        feedbackOops: "The answer is A. PAINT THE FUTURE doesn't fight the past — it makes the future feel so real and good that people want to go there.",
      },
      {
        argus: 'Paint the future! Complete the vision:',
        question: '"Imagine walking into school tomorrow and finding ___. That\'s what we can build — together."',
        options: [
          'a lunch you actually love',
          'exactly the same thing',
          'a slightly better option',
        ],
        correct: 0,
        feedbackOk: "⭐ You just painted a future worth fighting for — that's PAINT THE FUTURE!",
        feedbackOops: "A is the answer — 'a lunch you actually love' creates desire. 'Slightly better' is forgettable. Go big!",
      },
    ],
  },

  'm4': { // THE BRIDGE BUILDER — Nelson Mandela
    steps: [
      {
        argus: '"You want longer breaks. I want more art class. We\'ll never agree — we\'re total opposites!"',
        question: "What does THE BRIDGE BUILDER look for first?",
        options: [
          'What both sides already have in common',
          'Who makes the stronger individual argument',
          'A compromise that neither side really likes',
        ],
        correct: 0,
        feedbackOk: "Yes! Mandela always found the ground both sides stood on — then he built from there.",
        feedbackOops: "The answer is A. THE BRIDGE BUILDER doesn't pick a winner — it finds what everyone already shares.",
      },
      {
        argus: 'Find the shared ground! Complete the bridge:',
        question: '"We both want school to feel like something we ___ — so let\'s build a plan that gives us both that."',
        options: [
          'actually enjoy',
          'have to get through',
          'are okay with',
        ],
        correct: 0,
        feedbackOk: "⭐ A bridge both sides can walk across — that's THE BRIDGE BUILDER!",
        feedbackOops: "A is right — 'actually enjoy' is the shared dream. 'Have to get through' is a shared complaint, not a shared goal.",
      },
    ],
  },
};
