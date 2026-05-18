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
    what: 'Your opponent cannot use any statistics, quantities, or numbers in their argument.',
    hint: 'Play at the end of your turn. Any number = instant forfeit of their argument.',
    status: 'active',
  },
  {
    id: 'h2', name: 'ONE SENTENCE', icon: '✂️💬',
    cardType: 'hazard',
    bg: '#1A0800', accent: '#FCA5A5',
    what: 'Your opponent must make their entire argument in a single sentence.',
    hint: 'Play at the end of your turn. One sentence — no more.',
    status: 'active',
  },
  {
    id: 'h3', name: 'MUST USE NUMBERS', icon: '🔢⚡',
    cardType: 'hazard',
    bg: '#001A10', accent: '#4ADE80',
    what: 'Your opponent must include at least one statistic or specific number in their argument.',
    hint: 'Play at the end of your turn. No numbers = argument does not count.',
    status: 'active',
  },
  {
    id: 'h4', name: '5 YEAR OLD', icon: '👶🌈',
    cardType: 'hazard',
    bg: '#0D001A', accent: '#C084FC',
    what: "Your opponent can only use words a 5-year-old would know. No big vocabulary.",
    hint: 'Play at the end of your turn. Simple words only — the littlest kids must understand.',
    status: 'active',
  },
  {
    id: 'h5', name: '30 SECONDS', icon: '⏱️🔥',
    cardType: 'hazard',
    restrictDebateSecs: 30,
    bg: '#1A0000', accent: '#F87171',
    what: 'Your opponent has only 30 seconds to make their entire argument.',
    hint: 'Play at the end of your turn. Their debate clock drops to 30 seconds.',
    status: 'active',
  },
  {
    id: 'h6', name: 'USE THE ROOM', icon: '🏠👁️',
    cardType: 'hazard',
    bg: '#001A1A', accent: '#67E8F9',
    what: 'Your opponent must reference something physically visible in the room right now.',
    hint: 'Play at the end of your turn. No mention of the room = argument does not count.',
    status: 'active',
  },
  {
    id: 'h7', name: 'STORY TIME', icon: '📖✨',
    cardType: 'hazard',
    bg: '#0A1500', accent: '#86EFAC',
    what: "Your opponent must open their argument with 'Once upon a time…' and weave their point into a story.",
    hint: 'Play at the end of your turn. No story opening = argument does not count.',
    status: 'active',
  },
  {
    id: 'h8', name: 'ANOTHER LANGUAGE', icon: '🌍🗣️',
    cardType: 'hazard',
    bg: '#00101A', accent: '#7DD3FC',
    what: 'Your opponent must include at least one full sentence in a different language.',
    hint: 'Play at the end of your turn. One full foreign-language sentence required.',
    status: 'active',
  },
  {
    id: 'h9', name: 'TALK LIKE BOND', icon: '🕴️🍸',
    cardType: 'hazard',
    bg: '#0A0A1A', accent: '#CBD5E1',
    what: 'Your opponent must argue with suave British confidence — no contractions, total composure.',
    hint: "'I am' not 'I'm' — charm is mandatory. Play at the end of your turn.",
    status: 'active',
  },
  {
    id: 'h10', name: 'TALK LIKE TRUMP', icon: '🇺🇸🏆',
    cardType: 'hazard',
    bg: '#1A0500', accent: '#FCA5A5',
    what: "Your opponent must use short punchy sentences and say 'believe me' or 'tremendous' at least once.",
    hint: "Play at the end of your turn. Short sentences. Believe me, it's gonna be huge.",
    status: 'active',
  },
  {
    id: 'h11', name: 'TALK LIKE OBAMA', icon: '🕊️🌅',
    cardType: 'hazard',
    bg: '#001120', accent: '#93C5FD',
    what: "Your opponent must speak with measured hope — they must use 'let me be clear' or 'yes we can'.",
    hint: "Play at the end of your turn. Measured. Thoughtful. Hopeful. Yes, they can.",
    status: 'active',
  },
  {
    id: 'h12', name: 'TALK LIKE MUSK', icon: '🚀🔭',
    cardType: 'hazard',
    bg: '#050010', accent: '#A78BFA',
    what: 'Your opponent must reference the future, technology, or Mars at least once in their argument.',
    hint: 'Play at the end of your turn. Think bigger. Think interplanetary.',
    status: 'active',
  },
  {
    id: 'h13', name: 'TALK LIKE OPRAH', icon: '💛🎤',
    cardType: 'hazard',
    bg: '#1A0D00', accent: '#FCD34D',
    what: "Your opponent must be warm and inspirational — they must say 'you get a [something]!'",
    hint: "Play at the end of your turn. Passion required. Everyone gets something.",
    status: 'active',
  },
  {
    id: 'h14', name: 'NO ADJECTIVES', icon: '🚫🎨',
    cardType: 'hazard',
    bg: '#1A1A00', accent: '#FDE68A',
    what: 'Your opponent cannot use any descriptive words — no adjectives at all.',
    hint: 'Play at the end of your turn. No big, small, good, bad, amazing, terrible — nothing descriptive.',
    status: 'active',
  },
  {
    id: 'h15', name: 'RHYME TIME', icon: '🎵🪄',
    cardType: 'hazard',
    bg: '#1A0A1A', accent: '#E879F9',
    what: 'Your opponent must include at least one rhyming couplet anywhere in their argument.',
    hint: 'Play at the end of your turn. Two lines that rhyme — cleverness is compulsory.',
    status: 'active',
  },
  {
    id: 'h16', name: 'WHISPER ONLY', icon: '🤫💨',
    cardType: 'hazard',
    bg: '#001A1A', accent: '#5EEAD4',
    what: 'Your opponent must deliver their entire argument in a whisper.',
    hint: 'Play at the end of your turn. Voices down — whispers only, start to finish.',
    status: 'active',
  },
  {
    id: 'h17', name: 'THREE EXAMPLES', icon: '🧮✅',
    cardType: 'hazard',
    bg: '#001505', accent: '#4ADE80',
    what: 'Your opponent must include exactly three real examples or reasons to support their argument.',
    hint: 'Play at the end of your turn. First… second… third — exactly three, no more, no fewer.',
    status: 'active',
  },
  {
    id: 'h18', name: 'AGREE FIRST', icon: '🤝⚔️',
    cardType: 'hazard',
    bg: '#100A00', accent: '#FDBA74',
    what: "Your opponent must open by acknowledging your strongest point before they disagree with it.",
    hint: "Play at the end of your turn. They must say 'I admit that…' or 'You're right that…' first.",
    status: 'active',
  },
  {
    id: 'h19', name: 'WALK AND TALK', icon: '🚶💬',
    cardType: 'hazard',
    bg: '#0A001A', accent: '#C084FC',
    what: 'Your opponent must be on their feet and walking around while they make their argument.',
    hint: 'Play at the end of your turn. No sitting, no standing still — pace and argue.',
    status: 'active',
  },
  {
    id: 'h20', name: 'FORBIDDEN WORD', icon: '🚫🗝️',
    cardType: 'hazard',
    bg: '#1A0000', accent: '#F87171',
    what: "You name one word your opponent cannot say during their entire argument.",
    hint: "Play at the end of your turn — say the forbidden word out loud before they begin.",
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
