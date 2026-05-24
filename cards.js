// Move Cards and Case Cards data.
// Each move card has:
//   what   — 1 sentence: what the move IS
//   hint   — 1 sentence: a concrete structural cue ("the move in action")
//   status — 'active' | 'draft' | 'archived'
//
// Always APPEND to these arrays — never insert in the middle.
// Inserting changes index positions and breaks the daily seed for that date.

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MOVE CARDS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const MOVE_CARDS = [
  // ── BRONZE tier ───────────────────────────────────────────────────────────
  {
    id: 'm-b1', name: 'THE FAIR PLAY', icon: '🚩⚖️',
    cardType: 'move',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A0000', accent: '#F87171',
    what: 'Appeal to fairness and the rules to make your point feel like the obvious right thing to do.',
    hint: "Say 'We all agreed that…' or 'The rule is clear:' — then state your point with total certainty.",
    inspiration: 'Hermione Granger',
    status: 'active',
  },
  {
    id: 'm-b2', name: 'THE KIND HEART', icon: '🧥💗',
    cardType: 'move',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A0A12', accent: '#F9A8D4',
    what: "Show you understand your opponent's feelings first, then steer gently toward the kinder choice.",
    hint: "Open with 'I understand why you feel that way…' then slowly pivot to your point.",
    inspiration: 'Mister Rogers',
    status: 'active',
  },
  {
    id: 'm-b3', name: 'THE GOLDEN RULE', icon: '🪙🤝',
    cardType: 'move',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#0A1A15', accent: '#6EE7B7',
    what: 'Find the bigger goal underneath the whole debate and show your answer serves everyone.',
    hint: "Ask yourself 'What's this REALLY about?' — then argue for that deeper purpose.",
    inspiration: 'Moana',
    status: 'active',
  },
  {
    id: 'm-b4', name: 'THE PINKY PROMISE', icon: '🤞✨',
    cardType: 'move',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A1200', accent: '#FCD34D',
    what: 'Make such a sincere, specific commitment that your certainty itself becomes the argument.',
    hint: 'State exactly what will happen if your side wins — in specific detail, with zero hesitation.',
    inspiration: 'Pinocchio (reformed)',
    status: 'active',
  },
  {
    id: 'm-b5', name: 'THE TEAM', icon: '🐾⭐',
    cardType: 'move',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#000D1A', accent: '#93C5FD',
    what: 'Show how your position benefits everybody — the whole group, not just yourself.',
    hint: "List who wins: 'This helps [A], [B], and even [C] — nobody loses.'",
    inspiration: 'Paw Patrol',
    status: 'active',
  },
  {
    id: 'm-b6', name: 'THE BEST FRIEND', icon: '🤠👢',
    cardType: 'move',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A0A00', accent: '#FDBA74',
    what: 'Calmly and stubbornly stick to your position no matter how much pressure is applied.',
    hint: "When pushed hard, simply restate: 'I hear you — and I still believe…'",
    inspiration: 'Woody',
    status: 'active',
  },
  {
    id: 'm-b7', name: "THE LION'S COURAGE", icon: '🦁🌄',
    cardType: 'move',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A1200', accent: '#FDE68A',
    what: 'Admit a weakness in your own argument openly, then explain why you are still right.',
    hint: "Say 'Yes, it's true that… — but here's why that doesn't change my answer.'",
    inspiration: 'Simba',
    status: 'active',
  },
  {
    id: 'm-b8', name: 'BE RESPONSIBLE', icon: '⭐🛡️',
    cardType: 'move',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#0F001A', accent: '#C4B5FD',
    what: 'Argue for what is fair and good for everyone around you, not just what you want.',
    hint: "Close with 'And that's why this is the right thing for all of us.'",
    inspiration: 'Steven Universe',
    status: 'active',
  },
  // ── SILVER tier ───────────────────────────────────────────────────────────
  {
    id: 'm1', name: 'THE CHARMING BLUFF', icon: '🗡️🎭',
    cardType: 'move',
    tier: 'SILVER', tierLabel: 'TACTICIAN',
    bg: '#1C2333', accent: '#A0AEC0',
    what: 'Say something bold or wildly exaggerated and deliver it with total, unshakeable confidence.',
    hint: 'Take the most outrageous version of your argument and state it like it is obvious fact.',
    inspiration: 'Locke Lamora',
    status: 'active',
  },
  {
    id: 'm3', name: 'THE HONEST TALE', icon: '🎩🪵',
    cardType: 'move',
    tier: 'SILVER', tierLabel: 'STORYTELLER',
    bg: '#1A1200', accent: '#C8A96E',
    what: 'Tell a short, folksy story or fable that makes your argument feel like pure common sense.',
    hint: "Open with 'It reminds me of a time when…' and let the story do the persuading.",
    inspiration: 'Abraham Lincoln',
    status: 'active',
  },
  // ── GOLD tier ─────────────────────────────────────────────────────────────
  {
    id: 'm2', name: 'PAINT THE FUTURE', icon: '🌅🎨',
    cardType: 'move',
    tier: 'GOLD', tierLabel: 'ORATOR',
    bg: '#2D1B00', accent: '#ECC94B',
    what: 'Abandon the current argument entirely and paint a vivid, irresistible picture of a better world.',
    hint: "Start with 'Imagine a world where…' and make it feel so real they forget what they were arguing about.",
    inspiration: 'Barack Obama',
    status: 'active',
  },
  {
    id: 'm4', name: 'THE BRIDGE BUILDER', icon: '🤝🧱',
    cardType: 'move',
    tier: 'GOLD', tierLabel: 'MASTER',
    bg: '#001A10', accent: '#68D391',
    what: 'Find surprising common ground with your opponent, then show your solution serves both of you.',
    hint: "Say 'We actually want the same thing — here's how my answer gets us both there.'",
    inspiration: 'Nelson Mandela',
    status: 'active',
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HAZARD CARDS — played at end of YOUR argument; restricts opponent's next turn
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Always APPEND — never insert.

export const HAZARD_CARDS = [
  {
    id: 'h1', name: 'NO NUMBERS', icon: '🚫🔢',
    cardType: 'hazard',
    bg: '#1A0D00', accent: '#FB923C',
    what: 'No statistics, quantities, or numbers allowed in the argument.',
    hint: 'Any number used = argument does not count.',
    status: 'active',
  },
  {
    id: 'h2', name: 'ONE SENTENCE', icon: '✂️💬',
    cardType: 'hazard',
    bg: '#1A0800', accent: '#FCA5A5',
    what: 'The entire argument must be made in a single sentence.',
    hint: 'One sentence — no more.',
    status: 'active',
  },

  {
  
    id: 'h3', name: 'MUST USE NUMBERS', icon: '🔢⚡',
    cardType: 'hazard',
    bg: '#001A10', accent: '#4ADE80',
    what: 'At least one statistic or specific number must appear in the argument.',
    hint: 'No numbers used = argument does not count.',
    status: 'active',
  },
  {
    id: 'h4', name: '5 YEAR OLD', icon: '👶🌈',
    cardType: 'hazard',
    bg: '#0D001A', accent: '#C084FC',
    what: 'Only words a 5-year-old would understand — no big vocabulary.',
    hint: 'Simple words only — the littlest kids must be able to follow.',
    status: 'active',
  },
  {
    id: 'h5', name: '30 SECONDS', icon: '⏱️🔥',
    cardType: 'hazard',
    restrictDebateSecs: 30,
    bg: '#1A0000', accent: '#F87171',
    what: 'Only 30 seconds to make the entire argument.',
    hint: 'The debate clock drops to 30 seconds.',
    status: 'active',
  },
  {
    id: 'h6', name: 'USE THE ROOM', icon: '🏠👁️',
    cardType: 'hazard',
    bg: '#001A1A', accent: '#67E8F9',
    what: 'Something physically visible in the room right now must be referenced in the argument.',
    hint: 'No mention of the room = argument does not count.',
    status: 'active',
  },
  {
    id: 'h7', name: 'STORY TIME', icon: '📖✨',
    cardType: 'hazard',
    bg: '#0A1500', accent: '#86EFAC',
    what: "The argument must open with 'Once upon a time…' and weave the point into a story.",
    hint: 'No story opening = argument does not count.',
    status: 'active',
  },
  {
    id: 'h8', name: 'ANOTHER LANGUAGE', icon: '🌍🗣️',
    cardType: 'hazard',
    bg: '#00101A', accent: '#7DD3FC',
    what: 'At least one full sentence in a different language must be included.',
    hint: 'One full foreign-language sentence required.',
    status: 'active',
  },
  {
    id: 'h9', name: 'TALK LIKE BOND', icon: '🕴️🍸',
    cardType: 'hazard',
    bg: '#0A0A1A', accent: '#CBD5E1',
    what: 'Must argue with suave British confidence — no contractions, total composure.',
    hint: "'I am' not 'I'm' — no contractions permitted.",
    status: 'active',
  },
  {
    id: 'h10', name: 'TALK LIKE TRUMP', icon: '🇺🇸🏆',
    cardType: 'hazard',
    bg: '#1A0500', accent: '#FCA5A5',
    what: "Must use short punchy sentences and include 'believe me' or 'tremendous' at least once.",
    hint: "Short sentences. Believe me, it's gonna be huge.",
    status: 'active',
  },
  {
    id: 'h11', name: 'TALK LIKE OBAMA', icon: '🕊️🌅',
    cardType: 'hazard',
    bg: '#001120', accent: '#93C5FD',
    what: "Must speak with measured hope — 'let me be clear' or 'yes we can' must appear in the argument.",
    hint: 'Measured. Thoughtful. Hopeful. Yes, we can.',
    status: 'active',
  },
  {
    id: 'h12', name: 'TALK LIKE MUSK', icon: '🚀🔭',
    cardType: 'hazard',
    bg: '#050010', accent: '#A78BFA',
    what: 'Must reference the future, technology, or Mars at least once in the argument.',
    hint: 'Think bigger. Think interplanetary.',
    status: 'active',
  },
  {
    id: 'h13', name: 'TALK LIKE OPRAH', icon: '💛🎤',
    cardType: 'hazard',
    bg: '#1A0D00', accent: '#FCD34D',
    what: "Must be warm and inspirational — 'you get a [something]!' must appear in the argument.",
    hint: 'Passion required. Everyone gets something.',
    status: 'active',
  },
  {
    id: 'h14', name: 'NO ADJECTIVES', icon: '🚫🎨',
    cardType: 'hazard',
    bg: '#1A1A00', accent: '#FDE68A',
    what: 'No descriptive words — no adjectives allowed in the argument.',
    hint: 'No big, small, good, bad, amazing, terrible — nothing descriptive.',
    status: 'active',
  },
  {
    id: 'h15', name: 'RHYME TIME', icon: '🎵🪄',
    cardType: 'hazard',
    bg: '#1A0A1A', accent: '#E879F9',
    what: 'At least one rhyming couplet must appear somewhere in the argument.',
    hint: 'Two lines that rhyme — cleverness is compulsory.',
    status: 'active',
  },
  {
    id: 'h16', name: 'WHISPER ONLY', icon: '🤫💨',
    cardType: 'hazard',
    bg: '#001A1A', accent: '#5EEAD4',
    what: 'The entire argument must be delivered in a whisper.',
    hint: 'Voices down — whispers only, start to finish.',
    status: 'active',
  },
  {
    id: 'h17', name: 'THREE EXAMPLES', icon: '🧮✅',
    cardType: 'hazard',
    bg: '#001505', accent: '#4ADE80',
    what: 'Exactly three real examples or reasons must support the argument — no more, no fewer.',
    hint: 'First… second… third — exactly three.',
    status: 'active',
  },
  {
    id: 'h18', name: 'AGREE FIRST', icon: '🤝⚔️',
    cardType: 'hazard',
    bg: '#100A00', accent: '#FDBA74',
    what: 'Must open by acknowledging the strongest opposing point before disagreeing.',
    hint: "'I admit that…' or 'That's true, but…' — acknowledgment comes first.",
    status: 'active',
  },
  {
    id: 'h19', name: 'WALK AND TALK', icon: '🚶💬',
    cardType: 'hazard',
    bg: '#0A001A', accent: '#C084FC',
    what: 'Must be standing and walking while making the argument.',
    hint: 'No sitting, no standing still — pace and argue.',
    status: 'active',
  },
  {
    id: 'h20', name: 'FORBIDDEN WORD', icon: '🚫🗝️',
    cardType: 'hazard',
    bg: '#1A0000', accent: '#F87171',
    what: 'One word is declared forbidden — that word cannot be said during the entire argument.',
    hint: 'The forbidden word must be declared out loud before the argument begins.',
    status: 'active',
  },
  // ── New hazards ───────────────────────────────────────────────────────────
  {
    id: 'h21', name: 'QUESTION ENDER', icon: '❓🔚',
    cardType: 'hazard',
    bg: '#1A0800', accent: '#FB923C',
    what: "The argument must end with a question — the final word out of your mouth must be a question mark.",
    hint: 'Plan your closing line first — it must be a question, no exceptions.',
    status: 'active',
  },
  {
    id: 'h22', name: 'NO I OR ME', icon: '🚫🙋',
    cardType: 'hazard',
    bg: '#0F001A', accent: '#C084FC',
    what: "The words 'I' and 'me' are banned for the entire argument.",
    hint: "Replace every 'I' with 'one', 'we', or restructure the sentence entirely.",
    status: 'active',
  },
  {
    id: 'h23', name: 'TALK LIKE A FRENCHMAN', icon: '🇫🇷🥖',
    cardType: 'hazard',
    bg: '#00101A', accent: '#93C5FD',
    what: 'Argue with the passion, flair, and casual confidence of a Frenchman who cannot believe this is even a debate.',
    hint: "Shrug often. Speak slowly. Throw in 'zut alors' or 'c'est évident' once or twice.",
    status: 'active',
  },
  {
    id: 'h24', name: 'TALK LIKE AN ITALIAN', icon: '🇮🇹🤌',
    cardType: 'hazard',
    bg: '#1A0500', accent: '#FCA5A5',
    what: 'Argue with full Italian dramatic energy — hands moving, voice rising, every sentence an opera.',
    hint: 'Use your hands. Express everything twice as loudly as needed. Treat the debate like a family dinner.',
    status: 'active',
  },
  {
    id: 'h25', name: 'TALK LIKE A NEW YORKER', icon: '🗽🚕',
    cardType: 'hazard',
    bg: '#1A1200', accent: '#FCD34D',
    what: "Argue fast, loud, and direct — a New Yorker has no time for your nonsense and neither do you.",
    hint: "Speak quickly. Get to the point. 'I'm walkin' here' energy throughout.",
    status: 'active',
  },
  {
    id: 'h26', name: 'TALK LIKE AN AUSTRALIAN', icon: '🦘🌏',
    cardType: 'hazard',
    bg: '#001505', accent: '#4ADE80',
    what: "Argue with cheerful, no-worries Australian confidence — laid-back tone, casual language, total certainty.",
    hint: "'No worries, mate' — keep the energy sunny even when the argument gets fierce.",
    status: 'active',
  },
  {
    id: 'h27', name: 'TALK LIKE A PASTOR', icon: '⛪🕊️',
    cardType: 'hazard',
    bg: '#1A1200', accent: '#FDE68A',
    what: 'Deliver the argument like a Sunday sermon — solemn, rhythmic, with moments of quiet and moments of thunder.',
    hint: 'Pause for effect. Build to your point like the congregation needs saving.',
    status: 'active',
  },
  {
    id: 'h28', name: 'TALK LIKE A GENERAL', icon: '🎖️⚔️',
    cardType: 'hazard',
    bg: '#0A0A12', accent: '#94A3B8',
    what: 'Argue with military precision — short commands, no wasted words, total authority.',
    hint: 'Every sentence is an order. State your position like a battlefield briefing.',
    status: 'active',
  },
  {
    id: 'h29', name: 'TALK LIKE MARIO', icon: '🍄⭐',
    cardType: 'hazard',
    bg: '#1A0000', accent: '#EF4444',
    what: "Argue in the cheerful, enthusiastic spirit of everyone's favourite plumber.",
    hint: "'Mama mia!' — keep the energy high, the joy genuine, and the accent thick.",
    status: 'active',
  },
  {
    id: 'h30', name: 'TALK LIKE GANDALF', icon: '🧙‍♂️🔥',
    cardType: 'hazard',
    bg: '#0A0A0A', accent: '#E2E8F0',
    what: 'Argue with ancient wisdom and absolute gravity — every sentence sounds like it was foretold.',
    hint: "Speak slowly and with weight. Reference 'the long road', 'what must be done', or 'you shall not...'",
    status: 'active',
  },
  {
    id: 'h31', name: 'GET THE HUG', icon: '🤗💛',
    cardType: 'hazard',
    bg: '#1A0A12', accent: '#F472B6',
    what: 'While arguing, make the other person so moved or charmed that they voluntarily hug you.',
    hint: 'Warmth, humour, and genuine connection — you cannot ask for the hug directly.',
    status: 'active',
  },
  {
    id: 'h32', name: 'MAKE THEM SMILE', icon: '😊✨',
    cardType: 'hazard',
    bg: '#1A1200', accent: '#FCD34D',
    what: 'Get the other person to smile at least once during your argument — genuinely, not politely.',
    hint: 'A well-timed joke, an absurd image, or unexpected warmth. No tickling.',
    status: 'active',
  },
  {
    id: 'h33', name: 'MAKE THEM LAUGH', icon: '😂🎭',
    cardType: 'hazard',
    bg: '#1A0800', accent: '#FB923C',
    what: 'Get the other person to laugh out loud during your argument.',
    hint: 'Wit, absurdity, or a perfectly placed pause. Make it unavoidable.',
    status: 'active',
  },
  {
    id: 'h34', name: 'MAKE THEM SAD', icon: '😢💧',
    cardType: 'hazard',
    bg: '#00101A', accent: '#7DD3FC',
    what: 'Deliver your argument with such poignant emotion that the other person visibly saddens.',
    hint: 'Find the emotional heart of the topic. Make it feel real and slightly devastating.',
    status: 'active',
  },
  {
    id: 'h35', name: 'MAKE THEM ANGRY', icon: '😤🔥',
    cardType: 'hazard',
    bg: '#1A0000', accent: '#EF4444',
    what: 'Argue so provocatively that the other person cannot hide their frustration.',
    hint: 'Challenge something they care about. Contradict their deepest assumption.',
    status: 'active',
  },
  {
    id: 'h36', name: 'SIT/STAND SWAP', icon: '🪑⬆️',
    cardType: 'hazard',
    bg: '#0A001A', accent: '#A78BFA',
    what: 'During your argument, get the other person to change posture — seated → standing, or standing → seated.',
    hint: 'Invite them in, surprise them, or make the moment so dramatic they naturally move.',
    status: 'active',
  },
  {
    id: 'h37', name: 'TEST THEIR PATIENCE', icon: '😤⏳',
    cardType: 'hazard',
    bg: '#1A0D00', accent: '#FBBF24',
    what: "Argue in a way that visibly tests the other person's patience — they must show obvious frustration or impatience.",
    hint: 'Repeat yourself. Take long pauses. Meander beautifully.',
    status: 'active',
  },
  {
    id: 'h38', name: 'THE CLOCK CHECK', icon: '⌚👀',
    cardType: 'hazard',
    bg: '#001A1A', accent: '#2DD4BF',
    what: 'Make the other person look at a clock, phone, or ask what time it is during your argument.',
    hint: "Reference urgency, deadlines, or 'how long this will take' until they check.",
    status: 'active',
  },
  {
    id: 'h39', name: 'MAKE THEM SAY YES', icon: '✅🎯',
    cardType: 'hazard',
    bg: '#001505', accent: '#4ADE80',
    what: "Get the other person to say 'yes' — out loud — at any point during your argument.",
    hint: 'Ask obvious questions with obvious answers. Lead them gently into agreement.',
    status: 'active',
  },
  {
    id: 'h40', name: 'THE NOD', icon: '🤝👁️',
    cardType: 'hazard',
    bg: '#0F001A', accent: '#C4B5FD',
    what: 'Argue so compellingly that the other person nods — a genuine, involuntary nod of agreement.',
    hint: "Build slowly to a point so obvious they cannot help but agree. Don't rush it.",
    status: 'active',
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COUNTER CARDS — played as interrupts when your opponent finishes arguing
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Always APPEND — never insert.

export const COUNTER_CARDS = [
  // ── REGULAR counters ──────────────────────────────────────────────────────
  {
    id: 'cr1', name: 'THE REDIRECT', icon: '↩️⚡',
    cardType: 'counter', counterType: 'regular',
    bg: '#001A10', accent: '#34D399',
    what: "When your opponent makes a strong point, immediately pivot to a different angle they haven't covered.",
    hint: "'That may be true — but what about…' and shift the whole debate onto new ground.",
    status: 'active',
  },
  {
    id: 'cr2', name: 'THE QUESTION MARK', icon: '❓🎯',
    cardType: 'counter', counterType: 'regular',
    bg: '#1A1000', accent: '#FCD34D',
    what: "Respond to their entire argument with one single powerful question that exposes a flaw in their premise.",
    hint: "Say nothing but your question. Make it count — one question to shake the whole argument.",
    status: 'active',
  },
  {
    id: 'cr3', name: 'THE PLAIN TRUTH', icon: '💡🪨',
    cardType: 'counter', counterType: 'regular',
    bg: '#1A1200', accent: '#FBBF24',
    what: "Cut through all the fancy arguments and state the one obvious, simple truth they are ignoring.",
    hint: "'Forget everything — here is the plain truth:' and say it in one sentence.",
    status: 'active',
  },
  {
    id: 'cr4', name: 'THE ABOUT-FACE', icon: '🔄🎭',
    cardType: 'counter', counterType: 'regular',
    bg: '#0A1A00', accent: '#86EFAC',
    what: "Pretend you are reconsidering their argument — then use their own confidence to prove them wrong.",
    hint: "'Actually, you've made me think… and that thinking proves exactly why I am right.'",
    status: 'active',
  },
  {
    id: 'cr5', name: 'THE WITNESS', icon: '🧑‍⚖️📜',
    cardType: 'counter', counterType: 'regular',
    bg: '#001A1A', accent: '#67E8F9',
    what: "Invoke a real or fictional authority — someone famous who would clearly agree with your side.",
    hint: "'Even [person] would tell you…' — pick someone your opponent cannot argue with.",
    status: 'active',
  },
  // ── ADVANCED counters ─────────────────────────────────────────────────────
  {
    id: 'c1', name: 'THE MAGNIFYING GLASS', icon: '🔍⚔️',
    cardType: 'counter', counterType: 'advanced',
    bg: '#001429', accent: '#38BDF8',
    what: "Find and expose the exact flaw in your opponent's argument before making your own.",
    hint: "Say 'The flaw in that argument is…' — name it precisely, then build yours on top.",
    status: 'active',
  },
  {
    id: 'c2', name: 'THE FEINT', icon: '🎭⚡',
    cardType: 'counter', counterType: 'advanced',
    bg: '#0D0029', accent: '#A78BFA',
    what: "Agree loudly with their weakest point, then systematically destroy their strongest.",
    hint: "'You're right about [X] — but that proves nothing, because [their strongest point falls].'",
    status: 'active',
  },
  {
    id: 'c3', name: 'THE MIRROR', icon: '🪞🔄',
    cardType: 'counter', counterType: 'advanced',
    bg: '#0A001A', accent: '#E879F9',
    what: "Take their exact argument and reverse it — use their own words to prove the opposite.",
    hint: "'Using your own logic — [their point] — that actually proves MY side, not yours.'",
    status: 'active',
  },
  {
    id: 'ca4', name: 'THE ENDLESS QUESTION', icon: '🔁❓',
    cardType: 'counter', counterType: 'advanced',
    bg: '#001A1A', accent: '#22D3EE',
    what: "Answer every argument they just made with a question that reveals a deeper flaw in their logic.",
    hint: "'But if that's true, then why…?' — keep asking until the foundation crumbles.",
    status: 'active',
  },
  {
    id: 'ca5', name: 'THE REFRAME', icon: '🖼️🔀',
    cardType: 'counter', counterType: 'advanced',
    bg: '#001500', accent: '#4ADE80',
    what: "Redefine the key term in their argument so that their entire case no longer applies.",
    hint: "'The real question is not [their frame] — it is [your frame].' Then argue that.",
    status: 'active',
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JOKER CARDS — VS mode only; cancel any hazard placed on you
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Always APPEND — never insert.

export const JOKER_CARDS = [
  {
    id: 'j1', name: 'THE WILD CARD', icon: '🃏✨',
    cardType: 'joker',
    bg: '#1A1200', accent: '#FFD700',
    what: 'Cancel any hazard placed on you — argue on your own terms, no restrictions apply.',
    hint: 'Play when a hazard is active. The hazard is void and you are free.',
    status: 'active',
  },
  {
    id: 'j2', name: 'THE ESCAPE PLAN', icon: '🚪💨',
    cardType: 'joker',
    bg: '#0A001A', accent: '#C084FC',
    what: "Your opponent's hazard restriction? Not today. Slip free and argue without constraints.",
    hint: 'Play to nullify the hazard. No restriction, no penalty.',
    status: 'active',
  },
  {
    id: 'j3', name: 'THE NULLIFIER', icon: '🚫🎴',
    cardType: 'joker',
    bg: '#001A1A', accent: '#2DD4BF',
    what: 'Any hazard played against you is cancelled outright — argue entirely on your own terms.',
    hint: "Play it. The hazard never happened. Argue freely.",
    status: 'active',
  },
  {
    id: 'j4', name: 'THE FREE PASS', icon: '🎟️🌟',
    cardType: 'joker',
    bg: '#001505', accent: '#4ADE80',
    what: 'Use this pass to dodge any hazard restriction your opponent placed on you.',
    hint: 'Free pass activated. No hazard applies to your argument.',
    status: 'active',
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILIBUSTER CARDS — VS mode only; skip your debate turn (blocked by hazard)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Always APPEND — never insert.

export const FILIBUSTER_CARDS = [
  {
    id: 'fb1', name: 'THE FILIBUSTER', icon: '🗣️⏭️',
    cardType: 'filibuster',
    bg: '#0A0A12', accent: '#94A3B8',
    what: 'Skip your turn to argue — choose not to engage this round.',
    hint: 'Cannot be played if the opponent placed a hazard on you this turn.',
    status: 'active',
  },
  {
    id: 'fb2', name: 'THE PROCEDURAL HOLD', icon: '✋📋',
    cardType: 'filibuster',
    bg: '#0A0F1A', accent: '#64748B',
    what: 'Invoke procedure — formally delay and skip your debate turn.',
    hint: 'Only valid when no hazard is active on your turn.',
    status: 'active',
  },
  {
    id: 'fb3', name: 'THE WALKOUT', icon: '🚶‍♂️🚪',
    cardType: 'filibuster',
    bg: '#0F0020', accent: '#A78BFA',
    what: 'Walk off the debate floor — skip your argument turn entirely.',
    hint: 'Requires no active hazard to play.',
    status: 'active',
  },
  {
    id: 'fb4', name: 'THE ABSTENTION', icon: '🤐🙅',
    cardType: 'filibuster',
    bg: '#001A0A', accent: '#6EE7B7',
    what: 'Formally abstain — choose silence over argument this turn.',
    hint: 'Cannot be used if a hazard was placed on you this turn.',
    status: 'active',
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DELEGATE CARDS — VS mode only; opponent argues your side this turn
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Always APPEND — never insert.

export const DELEGATE_CARDS = [
  {
    id: 'dg1', name: 'THE PROXY', icon: '📋🔀',
    cardType: 'delegate',
    bg: '#1A001A', accent: '#E879F9',
    what: 'Your opponent argues your side of the case this turn — you pick the brief, they make the case.',
    hint: 'Optionally hand them one of your move cards to use. Works even with a hazard active.',
    status: 'active',
  },
  {
    id: 'dg2', name: 'THE SECONDMENT', icon: '🤝📜',
    cardType: 'delegate',
    bg: '#001A1A', accent: '#22D3EE',
    what: 'Second the motion — pass your argument turn to your opponent to argue for you.',
    hint: 'You may assign a move card as their required technique. Hazards carry over to them.',
    status: 'active',
  },
  {
    id: 'dg3', name: 'THE ADVOCATE', icon: '⚖️🦅',
    cardType: 'delegate',
    bg: '#0A1500', accent: '#86EFAC',
    what: "Appoint your opponent as your advocate — they must argue your position this turn.",
    hint: 'Hand them a move card as your brief if you like. Hazards transfer with the turn.',
    status: 'active',
  },
  {
    id: 'dg4', name: 'THE DELEGATION', icon: '🌐🎖️',
    cardType: 'delegate',
    bg: '#1A1200', accent: '#FCD34D',
    what: "Official delegation — your opponent takes the floor to argue your side.",
    hint: 'Optionally assign a move card as their required technique. Hazards still apply.',
    status: 'active',
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CASE CARDS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CASE_CARDS = [
  // ── Kid-friendly EASY cases ───────────────────────────────────────────────
  {
    id: 'c-k01', icon: '🦸📚', difficulty: 'EASY', status: 'active',
    title: 'SUPERHEROES WOULD MAKE TERRIBLE TEACHERS',
    description: "One side argues that flying, laser eyes, and saving the world make it impossible to run an orderly classroom. The other argues superpowers would make the best teachers imaginable.",
  },
  {
    id: 'c-k02', icon: '🎮📝', difficulty: 'EASY', status: 'active',
    title: 'VIDEO GAMES SHOULD COUNT AS HOMEWORK',
    description: "One player argues that gaming builds real skills — strategy, reflexes, and teamwork — that belong in any school curriculum. The other defends the value of traditional homework.",
  },
  {
    id: 'c-k03', icon: '🍦🧠', difficulty: 'EASY', status: 'active',
    title: 'ICE CREAM FOR BREAKFAST WOULD MAKE KIDS SMARTER',
    description: "One side argues happiness, sugar, and cold dairy first thing in the morning is the secret to a sharper brain. The other defends why breakfast rules exist.",
  },
  {
    id: 'c-k04', icon: '🐶💛', difficulty: 'EASY', status: 'active',
    title: "DOGS ARE TOO GOOD FOR US AND HUMANS DON'T DESERVE THEM",
    description: "One player argues dogs are so loyal, so loving, and so patient that humanity has simply not earned them. The other defends humanity's worthiness of its best friend.",
  },
  {
    id: 'c-k05', icon: '📚🌐', difficulty: 'EASY', status: 'active',
    title: 'LIBRARIES ARE MORE POWERFUL THAN THE INTERNET',
    description: "One side argues that silence, physical books, and a librarian's wisdom outperform any search engine. The other defends the limitless reach of the internet.",
  },
  {
    id: 'c-k06', icon: '🦕🧐', difficulty: 'EASY', status: 'active',
    title: 'DINOSAURS WERE SECRETLY MUCH SMARTER THAN WE THINK',
    description: "One player builds the case for underestimated dinosaur intelligence. The other defends the scientific evidence as it stands.",
  },
  {
    id: 'c-k07', icon: '🧦🛏️', difficulty: 'EASY', status: 'active',
    title: 'WEARING SOCKS TO BED IS THE CORRECT WAY TO SLEEP',
    description: "One side defends cosy, warm feet as the pinnacle of civilised bedtime behaviour. The other argues bare feet are the only acceptable option.",
  },
  {
    id: 'c-k08', icon: '🌮📐', difficulty: 'EASY', status: 'active',
    title: 'TACOS ARE MATHEMATICALLY THE PERFECT FOOD',
    description: "One player builds a scientific and philosophical case for the taco as the peak of culinary engineering. The other challenges this audacious claim.",
  },
  {
    id: 'c-k09', icon: '🚀👶', difficulty: 'EASY', status: 'active',
    title: 'CHILDREN SHOULD BE FIRST IN LINE TO GO TO SPACE',
    description: "One side argues kids are braver, more adaptable, and more curious — the perfect astronauts. The other defends why adults must lead the way.",
  },
  {
    id: 'c-k10', icon: '🤖🏫', difficulty: 'EASY', status: 'active',
    title: 'IF ROBOTS LIVE AMONG US THEY SHOULD HAVE TO GO TO SCHOOL',
    description: "One player argues that robots need to learn the rules of society just like everyone else. The other challenges whether robots need school at all.",
  },
  {
    id: 'c-k11', icon: '🦄🦴', difficulty: 'EASY', status: 'active',
    title: 'UNICORNS WERE REAL ANIMALS THAT SIMPLY WENT EXTINCT',
    description: "One side builds a compelling historical and scientific case for unicorns as real creatures. The other defends what we actually know about the fossil record.",
  },
  {
    id: 'c-k12', icon: '🧠👯', difficulty: 'EASY', status: 'active',
    title: "SIBLINGS WOULD BE HAPPIER IF THEY COULD READ EACH OTHER'S MINDS",
    description: "One side argues that perfect honesty would end all arguments and build unbreakable friendship. The other warns of the total disaster of knowing your brother is plotting to eat your dessert.",
  },
  {
    id: 'c-k13', icon: '😠🪑', difficulty: 'EASY', status: 'active',
    title: 'PARENTS SHOULD HAVE TO TAKE TIMEOUTS WHEN THEY GET CRANKY',
    description: "One player argues that adults need to practice the same emotional control and respect they teach kids. The other defends a parent's right to be grumpily in charge.",
  },
  {
    id: 'c-k14', icon: '🎲🤥', difficulty: 'EASY', status: 'active',
    title: 'LOSING A GAME ON PURPOSE TO BE NICE IS ACTUALLY LYING',
    description: "One side argues that true respect and honesty mean playing your best, even if your friend loses. The other defends losing on purpose as a supreme act of compassion.",
  },
  {
    id: 'c-k15', icon: '🐕🧹', difficulty: 'EASY', status: 'active',
    title: 'HOUSEHOLD PETS SHOULD HAVE TO DO CHORES TO EARN THEIR KEEP',
    description: "One player claims it's only fair that dogs and cats learn the value of hard work and responsibility. The other defends their sacred right to sleep all day and look cute doing it.",
  },
  {
    id: 'c-k16', icon: '🕷️🤝', difficulty: 'EASY', status: 'active',
    title: 'SPIDERS SHOULD BE TREATED LIKE HELPFUL TINY ROOMMATES, NOT MONSTERS',
    description: "One side argues for compassion, noting spiders eat pests and work hard on their webs. The other defends the absolute right to peacefully scream and run away.",
  },
  {
    id: 'c-k17', icon: '🥪❤️', difficulty: 'EASY', status: 'active',
    title: 'SHARING YOUR LUNCH SHOULD BE A GRADUATION REQUIREMENT',
    description: "One player argues that generosity and kindness are more important than math or reading. The other argues that personal property (especially cookies) must be protected at all costs.",
  },
  {
    id: 'c-k18', icon: '🤦‍♂️🚫', difficulty: 'EASY', status: 'active',
    title: 'KIDS SHOULD BE ALLOWED TO GROUND PARENTS FOR TELLING TERRIBLE JOKES',
    description: "One side argues that terrible dad jokes cause unnecessary suffering and require strict disciplinary action. The other defends the freedom to be painfully unfunny.",
  },
  {
    id: 'c-k19', icon: '🎮🛑', difficulty: 'EASY', status: 'active',
    title: 'CHEATING IN A SINGLE-PLAYER VIDEO GAME IS STILL MORALLY WRONG',
    description: "One player argues that honesty matters even when no one is watching, and cheating breaks the spirit of the game. The other argues it's just pixels and having fun is all that matters.",
  },
  {
    id: 'c-k20', icon: '🪑🙏', difficulty: 'EASY', status: 'active',
    title: 'APOLOGIZING TO FURNITURE WHEN YOU BUMP INTO IT IS THE HIGHEST FORM OF RESPECT',
    description: "One side argues that practicing universal kindness, even to tables and doors, makes you a better person. The other points out that tables absolutely do not have feelings.",
  },
  {
    id: 'c-k21', icon: '🦓⚽', difficulty: 'EASY', status: 'active',
    title: 'ANIMALS WOULD BE FAR FAIRER REFEREES IN SPORTS THAN HUMANS',
    description: "One player argues that animals don't care about money or favorite teams, making them perfectly unbiased. The other points out that a dog referee would just steal the soccer ball.",
  },
  // ── Classic EASY cases ────────────────────────────────────────────────────
  {
    id: 'c1', icon: '🌙', difficulty: 'EASY', status: 'active',
    title: 'KIDS SHOULD DECIDE THEIR OWN BEDTIME',
    description: "One side defends the child's right to self-govern their sleep. The other upholds parental bedtime law. May the sharpest tongue win.",
  },
  {
    id: 'c2', icon: '🍕', difficulty: 'EASY', status: 'active',
    title: 'PIZZA IS A PERFECTLY VALID BREAKFAST FOOD',
    description: "One player stands for the glory of morning pizza. The other defends the sacred tradition of breakfast. Convince — or be convinced.",
  },
  {
    id: 'c3', icon: '🐱🕵️', difficulty: 'EASY', status: 'active',
    title: 'CATS WOULD MAKE FAR BETTER UNDERCOVER SECRET AGENTS THAN DOGS',
    description: "One side argues that cats are the perfect covert operatives. The other defends dogs as the ultimate agents of justice.",
  },
  {
    id: 'c4', icon: '🌭⚖️', difficulty: 'EASY', focus: 'Definitions & Semantics', status: 'active',
    title: 'HOT DOGS TECHNICALLY AND LEGALLY COUNT AS SANDWICHES',
    description: "A battle of definitions and semantics. One player argues the hot dog is a sandwich. The other defends culinary tradition.",
  },
  // ── MEDIUM cases ──────────────────────────────────────────────────────────
  {
    id: 'c5', icon: '👽🌍', difficulty: 'MEDIUM', focus: 'Conspiracy vs. Logic', status: 'active',
    title: 'ALIENS DEFINITELY EXIST AND ARE CURRENTLY HIDING ON EARTH',
    description: "One player argues for the existence and presence of extraterrestrial life on Earth. The other defends logic and the burden of evidence.",
  },
  // ── HARD cases ────────────────────────────────────────────────────────────
  {
    id: 'c6', icon: '🪄⚙️', difficulty: 'HARD', focus: 'Chaos vs. Order', status: 'active',
    title: 'A WORLD GOVERNED BY MAGIC WOULD BE WORSE THAN ONE GOVERNED BY TECHNOLOGY',
    description: "One player defends the order and progress of technology. The other argues for the limitless possibilities of magic.",
  },
  // ── Add more Case Cards below ──────────────────────────────────────────────
  // { id: 'c7', icon: '⚡', difficulty: 'MEDIUM', status: 'active',
  //   title: 'CASE TITLE', description: '...' },
];
