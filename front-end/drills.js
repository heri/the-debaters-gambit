// drills.js. Solo Dojo drill content
//
// DRILLS        → new 5-step format (Bronze cards)
// DRILLS_LEGACY → old 2-step format (Silver + Gold cards, kept for back-compat)
//
// Each screen type:
//   info     . { heading?, body, quote?, note?, cta? }
//   question . { prompt, options: [{ text, correct, feedback }] }
//   deliver  . { body, caption, timerSecs }
//   completion— { saidText, skippedText }  (rendered by DrillRunner using saidIt state)
//
// argusExpression per step (overridden by phase on question screens):
//   Step 1: confident   │ wrong → suspicious │ right → smug
//   Step 2: encouraging │ wrong → suspicious │ right → encouraging
//   Step 3: thinking    │ wrong → suspicious │ right → smug
//   Step 4: thinking    │ wrong → suspicious │ right → smug
//   Step 5: encouraging (model) → confident (deliver) → smug/encouraging (completion)

export const DRILLS = {

  // ─────────────────────────────────────────────────────────────────────────────
  // m-b1  THE FAIR PLAY
  // ─────────────────────────────────────────────────────────────────────────────
  'm-b1': {
    cardId: 'm-b1',
    steps: [
      {
        step: 1, title: 'Understand Fairness',
        screens: [
          {
            id: 'b1-1-1', type: 'info', argusExpression: 'confident',
            heading: 'What is Fairness?',
            body: 'Fairness means everyone plays by the same rules. Nobody gets special treatment just because of who they are. When something is fair, everyone has an equal chance, no matter who they are or who they know.',
          },
          {
            id: 'b1-1-2', type: 'info', argusExpression: 'confident',
            heading: 'Fairness in Action',
            body: 'In your classroom, everyone has to put their hand up before speaking. That rule applies to everyone. The teacher\'s favourite, the quiet kid in the corner, and you. That rule makes the classroom fair.',
          },
          {
            id: 'b1-1-3', type: 'question', argusExpression: 'thinking',
            prompt: 'There\'s one computer in the library. Maya used it yesterday, and today both Maya and Sam want to use it. What\'s the fairest thing to do?',
            options: [
              { text: 'Let Maya use it again. She was there first yesterday.', correct: false, feedback: 'Being first yesterday doesn\'t make today fair. Fairness means everyone gets an equal turn, not that whoever went first keeps going first.' },
              { text: 'Let Sam use it today, since it\'s his turn.', correct: true, feedback: 'Exactly! Taking turns means everyone gets the same chance. That\'s fairness in action.' },
              { text: 'Let whoever is taller use it.', correct: false, feedback: 'Height has nothing to do with fairness. Rules need to apply to everyone the same way, not based on how you look.' },
            ],
          },
          {
            id: 'b1-1-4', type: 'info', argusExpression: 'confident',
            heading: 'Fairness in the Bigger World',
            body: 'In sports, referees make sure no team cheats. In court, judges make sure the same laws apply to everybody. Fairness keeps the whole system working. Without it, people with the most power would always win.',
          },
          {
            id: 'b1-1-5', type: 'question', argusExpression: 'thinking',
            prompt: 'A new student says: "Why do football matches even need a referee? The teams know the rules." What\'s the best answer?',
            options: [
              { text: 'Because the best team needs help winning.', correct: false, feedback: 'Even the best team has to earn it. A referee isn\'t there to help one side. They\'re there to make sure the rules are the same for everyone.' },
              { text: 'Because without someone watching, teams could bend the rules, and that wouldn\'t be fair to the team that plays honestly.', correct: true, feedback: 'Spot on! The referee is fairness made visible. The same rules, enforced equally, for both teams.' },
              { text: 'Because matches would be boring without them.', correct: false, feedback: 'Referees aren\'t entertainment. Their job is to make sure neither team can cheat. That\'s what fairness requires.' },
            ],
          },
        ],
      },
      {
        step: 2, title: 'Understand the Feeling',
        screens: [
          {
            id: 'b1-2-1', type: 'info', argusExpression: 'encouraging',
            quote: 'That\'s SO unfair! He got to be team captain TWICE this week and I\'ve never even been asked!',
            note: 'Someone is very upset. Let\'s think carefully about what they\'re actually feeling.',
          },
          {
            id: 'b1-2-2', type: 'question', argusExpression: 'encouraging',
            prompt: 'Why is this person upset?',
            options: [
              { text: 'They want to be in charge of everyone.', correct: false, feedback: 'They\'re not after power for its own sake. They just want to be treated the same as everyone else.' },
              { text: 'They feel like the rules are different for them than for someone else.', correct: true, feedback: 'Exactly! When someone else gets the same opportunity over and over and you never do, it feels like the rules don\'t apply equally. That\'s the feeling of unfairness.' },
              { text: 'They don\'t like the other person.', correct: false, feedback: 'This isn\'t really about that person. It\'s about feeling like you\'re being treated as less important. That\'s a fairness problem, not a friendship problem.' },
            ],
          },
          {
            id: 'b1-2-3', type: 'info', argusExpression: 'encouraging',
            quote: 'Every time there\'s something good. A prize, a special job, a school trip. It\'s always the same people. Never me. Like I\'m invisible.',
            note: 'This isn\'t one bad day. This is a pattern. How many feelings can you spot?',
          },
          {
            id: 'b1-2-4', type: 'question', argusExpression: 'encouraging',
            prompt: 'What is this person feeling?',
            options: [
              { text: 'Only angry that they were left out once.', correct: false, feedback: 'They are angry. But look at the words again. "Always the same people. Never me." That\'s more than one moment.' },
              { text: 'Only sad about one missed opportunity.', correct: false, feedback: 'Sadness is part of it. But there\'s a second feeling layered underneath. What else do they feel?' },
              { text: 'Both angry and deeply invisible. Like the rules simply don\'t include them.', correct: true, feedback: 'Right. There\'s anger at the unfairness AND sadness at feeling erased. When both pile up, the feeling is much heavier. Knowing that makes your argument more powerful.' },
            ],
          },
        ],
      },
      {
        step: 3, title: 'See It in Arguments',
        screens: [
          {
            id: 'b1-3-1', type: 'info', argusExpression: 'thinking',
            heading: 'How The Fair Play Works in Arguments',
            body: 'When you use The Fair Play, you remind everyone of a rule, an agreement, or a principle that already exists. And you show that your argument simply follows from it. It makes your point feel like common sense, not just your opinion.',
          },
          {
            id: 'b1-3-2', type: 'question', argusExpression: 'thinking',
            prompt: 'Two groups argue about who gets the school hall. One student says: "The schedule has always given the drama club the main hall for end-of-year shows. That agreement has been in place since the school was founded. This year shouldn\'t be different." What is this student doing?',
            options: [
              { text: 'Making up a new rule to help their side.', correct: false, feedback: 'They\'re not inventing anything. They\'re pointing to an existing agreement. That\'s exactly what The Fair Play does.' },
              { text: 'Appealing to an existing agreement to prove their point.', correct: true, feedback: 'Yes! They used "the agreement since the school was founded" as their evidence. The rule does the arguing for them. They don\'t even need to fight.' },
              { text: 'Threatening the other group.', correct: false, feedback: 'No threats here. Just a calm, clear appeal to what was already agreed. That\'s much stronger than any threat.' },
            ],
          },
          {
            id: 'b1-3-3', type: 'info', argusExpression: 'thinking',
            heading: 'The Fair Play in a Real Debate',
            body: 'In a class debate about whether older students should get longer lunch breaks, a student said: "The school handbook says every student gets equal access to the canteen. A longer break for some students but not others breaks that rule. And we shouldn\'t change it without everyone agreeing."',
            note: 'Notice: they didn\'t say "I want this." They said "this is what the rules already say." The rule speaks for them.',
          },
          {
            id: 'b1-3-4', type: 'question', argusExpression: 'thinking',
            prompt: 'Why does pointing to an existing rule make an argument stronger?',
            options: [
              { text: 'Because rules are always correct and can never be questioned.', correct: false, feedback: 'Rules can be wrong or outdated. That\'s a different debate. But in this moment, the rule is shared ground that everyone already accepts.' },
              { text: 'Because it takes your personal opinion out of it. The rule speaks for you.', correct: true, feedback: 'Exactly! When you say "the rule says X," it\'s not just your opinion anymore. It\'s something everyone agreed to. That\'s very hard to argue against.' },
              { text: 'Because the other side will immediately give up.', correct: false, feedback: 'Appealing to rules doesn\'t guarantee instant victory. But it puts your argument on solid ground that\'s very difficult to move.' },
            ],
          },
        ],
      },
      {
        step: 4, title: 'Put It Together',
        screens: [
          {
            id: 'b1-4-1', type: 'info', argusExpression: 'thinking',
            heading: 'The Full Move',
            body: 'Opponent: "I think we should let the popular kids sit at the front of assembly. They work the hardest."\n\nResponse: "Actually, the rule for assembly seating rotates by class. Everyone gets a turn at the front. We all agreed to that at the start of term. If we change it now for some students, we\'re breaking the agreement everyone else has been counting on."',
            note: 'Notice: no insults, no complaints. They acknowledged what was said, then went straight to the rule. Short and solid.',
          },
          {
            id: 'b1-4-2', type: 'question', argusExpression: 'thinking',
            prompt: 'Your friend says: "We should get rid of the homework rota and just give homework to whoever the teacher thinks needs it most." Which response uses The Fair Play correctly?',
            options: [
              { text: '"That\'s a terrible idea. Everyone needs homework."', correct: false, feedback: 'That\'s just an opinion. It doesn\'t appeal to any rule or agreement. The Fair Play needs something shared to lean on.' },
              { text: '"I disagree with that."', correct: false, feedback: 'Disagreement alone isn\'t an argument. The Fair Play works by pointing to a rule or agreement that already exists.' },
              { text: '"The homework rota was agreed to make sure everyone gets the same workload. Changing it means some students get judged differently. That breaks the agreement."', correct: true, feedback: 'That\'s The Fair Play! You pointed to the existing agreement, explained its purpose, and showed why changing it would be unfair.' },
            ],
          },
          {
            id: 'b1-4-3', type: 'info', argusExpression: 'thinking',
            heading: 'A Harder Version',
            body: 'Opponent: "The school should cancel the art show this year. Not everyone has had equal time to prepare, so it\'s not fair to judge everyone the same way."',
            note: 'Trickier: the opponent is ALSO arguing for fairness. How do you use The Fair Play when both sides claim it?',
          },
          {
            id: 'b1-4-4', type: 'question', argusExpression: 'thinking',
            prompt: 'What\'s the best response using The Fair Play?',
            options: [
              { text: '"Art show is a tradition. We\'re having it."', correct: false, feedback: 'Tradition alone isn\'t fairness. It\'s just "we\'ve always done it." The Fair Play needs a rule or agreement, not a habit.' },
              { text: '"Students were told at the start of the year that the art show would happen. They\'ve prepared based on that promise. Cancelling now is unfair to everyone who kept their side of the agreement."', correct: true, feedback: 'Sharp! You found the fairness argument on your side. The agreement made at the start of the year. Both sides wanted fairness, but yours is anchored in a real, existing promise.' },
              { text: '"The art show is fun for everyone, so we should keep it."', correct: false, feedback: 'That\'s appealing to shared enjoyment. Closer to The Team. The Fair Play needs a specific rule or agreement, not just a reason it\'s good for everyone.' },
            ],
          },
        ],
      },
      {
        step: 5, title: 'Say It',
        screens: [
          {
            id: 'b1-5-1', type: 'info', argusExpression: 'encouraging',
            heading: 'The Fair Play Out Loud',
            body: '"We all agreed at the start of term that everyone takes turns with the equipment. That rule isn\'t there by accident. It\'s there so nobody gets left out. My argument is simple: follow the agreement. That\'s what fairness looks like."',
            note: 'Notice the structure: name the agreement, explain why it exists, then state your conclusion like it\'s obvious. Because it is.',
            cta: "I\'m ready →",
          },
          {
            id: 'b1-5-2', type: 'deliver', argusExpression: 'confident',
            body: '"We all agreed at the start of term that everyone takes turns with the equipment. That rule isn\'t there by accident. It\'s there so nobody gets left out. My argument is simple: follow the agreement. That\'s what fairness looks like."',
            caption: 'Now say it out loud. Like you mean every word.',
            timerSecs: 15,
          },
          {
            id: 'b1-5-3', type: 'completion',
            saidText: 'Verdict: The Fair Play. Mastered. The Parlour notes your progress.',
            skippedText: 'Almost. Come back and say it next time. Words need a voice.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // m-b2  THE KIND HEART
  // ─────────────────────────────────────────────────────────────────────────────
  'm-b2': {
    cardId: 'm-b2',
    steps: [
      {
        step: 1, title: 'Understand Kindness',
        screens: [
          {
            id: 'b2-1-1', type: 'info', argusExpression: 'confident',
            heading: 'What is Kindness?',
            body: 'Kindness means caring about how other people feel. And choosing to help them, even when you don\'t have to. It\'s not just being nice. It\'s noticing someone needs something and doing something about it.',
          },
          {
            id: 'b2-1-2', type: 'info', argusExpression: 'confident',
            heading: 'Kindness in Action',
            body: 'A mum baked cookies for her two children. She spent all afternoon making them. When they were ready, she wanted to make sure both children felt equally loved. So she thought carefully about how to share them fairly and warmly.',
          },
          {
            id: 'b2-1-3', type: 'question', argusExpression: 'thinking',
            prompt: 'A mother has 3 cookies for her 2 children. What should she do?',
            options: [
              { text: 'Give 2 cookies to one child and 1 to the other.', correct: false, feedback: 'That would leave one child with much less. Kindness means thinking about how each person feels. And one of them would feel left out.' },
              { text: 'Give 1 cookie to each child and keep 1 for herself.', correct: true, feedback: 'That\'s right! Everyone gets something, and nobody feels left out. That\'s what kindness looks like. Everyone gets to enjoy it together.' },
              { text: 'Eat all the cookies herself because she baked them.', correct: false, feedback: 'She did work hard! But kindness means thinking about others, not just yourself. The children were expecting some too.' },
            ],
          },
          {
            id: 'b2-1-4', type: 'info', argusExpression: 'confident',
            heading: 'Bigger Kindness',
            body: 'Some people give up their free weekend time to volunteer at a local shelter. They help cook meals and sit with people who are lonely. Nobody asks them to. Nobody pays them. They do it because kindness is a choice they make.',
          },
          {
            id: 'b2-1-5', type: 'question', argusExpression: 'thinking',
            prompt: 'Why does someone volunteer at a shelter on their day off?',
            options: [
              { text: 'To get something in return.', correct: false, feedback: 'Kindness that expects something back is more like a trade. True kindness doesn\'t come with a bill.' },
              { text: 'Because they were told to by their school or work.', correct: false, feedback: 'That might be why some people start. But the ones who keep going, week after week, do it for a different reason.' },
              { text: 'Because they care about making things better for someone else, even when it\'s hard.', correct: true, feedback: 'Exactly! That\'s the heart of kindness. Choosing to help, not because you gain something, but because someone else needs it.' },
            ],
          },
        ],
      },
      {
        step: 2, title: 'Understand the Feeling',
        screens: [
          {
            id: 'b2-2-1', type: 'info', argusExpression: 'encouraging',
            quote: 'I am so angry! Nobody understands me. I don\'t want to play with you.',
            note: 'Something is very wrong here. Let\'s figure out what this person is actually feeling before we react.',
          },
          {
            id: 'b2-2-2', type: 'question', argusExpression: 'encouraging',
            prompt: 'Why is this person angry?',
            options: [
              { text: 'They want to play alone.', correct: false, feedback: 'Look at the words: "Nobody understands me." That\'s not about wanting to be alone. It\'s about something else entirely.' },
              { text: 'They feel misunderstood. Like nobody is really listening to them.', correct: true, feedback: 'Exactly. The anger is on the surface, but underneath it is a need to feel heard. That\'s what The Kind Heart looks for first.' },
              { text: 'They are just having a bad day.', correct: false, feedback: 'That might be true. But "bad day" doesn\'t tell you how to respond. "Feeling misunderstood" does. That\'s why we look for the real feeling.' },
            ],
          },
          {
            id: 'b2-2-3', type: 'info', argusExpression: 'encouraging',
            quote: 'Why did you guys leave me alone in the park! I don\'t want to talk to you anymore.',
            note: 'This one is more complicated. They\'re upset. But about what, exactly? There might be more than one feeling here.',
          },
          {
            id: 'b2-2-4', type: 'question', argusExpression: 'encouraging',
            prompt: 'What feelings does this person have?',
            options: [
              { text: 'Only angry.', correct: false, feedback: 'Anger is definitely there. But look at what happened. They were LEFT alone. Is anger the only thing you\'d feel if that happened to you?' },
              { text: 'Only sad.', correct: false, feedback: 'Sadness is there too. But they\'re also shouting "Why did you leave me!" That\'s not just sadness. There\'s something else.' },
              { text: 'Both angry AND sad. They feel abandoned and hurt.', correct: true, feedback: 'Right! They\'re angry because it happened, and sad because it hurt. When someone has two big feelings at once, they really need to feel understood before anything else. That\'s exactly what The Kind Heart does.' },
            ],
          },
        ],
      },
      {
        step: 3, title: 'See It in Arguments',
        screens: [
          {
            id: 'b2-3-1', type: 'info', argusExpression: 'thinking',
            heading: 'How The Kind Heart Works in Arguments',
            body: 'When you use The Kind Heart, you don\'t start with your argument. You start by showing that you understand how the other person feels. Once they feel heard, they\'re much more open to hearing your point. It\'s not weakness. It\'s strategy.',
          },
          {
            id: 'b2-3-2', type: 'question', argusExpression: 'thinking',
            prompt: 'Someone says: "I know you\'re a kind person, and I think your help would mean a lot to the team right now." What is this person doing?',
            options: [
              { text: 'Making a logical argument about why help is needed.', correct: false, feedback: 'They\'re not making a list of reasons. They\'re speaking to who the other person IS, not just what they need.' },
              { text: 'Appealing to the other person\'s kindness to encourage them to act.', correct: true, feedback: 'Yes! They reminded the other person that they are kind. And that framing makes it much harder to say no. They didn\'t argue facts. They reminded someone of who they are.' },
              { text: 'Threatening them if they don\'t help.', correct: false, feedback: 'The opposite! This is the softest kind of persuasion. It works because it makes the other person WANT to help, not because it forces them.' },
            ],
          },
          {
            id: 'b2-3-3', type: 'info', argusExpression: 'thinking',
            heading: 'The Kind Heart in a Real Debate',
            body: 'In a class debate about school lunches, a student said: "By making sure every kid has a hot meal, we\'re showing kindness to the children who need it most. That\'s the kind of school we want to be. One where we look out for each other."',
            note: 'Notice: they didn\'t argue about food costs or nutrition data. They made it about what kind of people we are. That\'s The Kind Heart at its most powerful.',
          },
          {
            id: 'b2-3-4', type: 'question', argusExpression: 'thinking',
            prompt: 'Why does using kindness in an argument make it stronger?',
            options: [
              { text: 'Because it makes the other side feel guilty.', correct: false, feedback: 'Guilt can shut people down. It doesn\'t open them up. The Kind Heart works the other way: it makes people WANT to do the kind thing.' },
              { text: 'Because it connects the argument to something people already care about: being a good person.', correct: true, feedback: 'Exactly! Most people want to see themselves as kind. When you show that the kind choice is YOUR choice, you make it easy for them to agree with you.' },
              { text: 'Because the other side will be too emotional to argue back.', correct: false, feedback: 'The goal isn\'t to overwhelm them emotionally. It\'s to connect with them. There\'s a big difference.' },
            ],
          },
        ],
      },
      {
        step: 4, title: 'Put It Together',
        screens: [
          {
            id: 'b2-4-1', type: 'info', argusExpression: 'thinking',
            heading: 'The Full Move',
            body: 'Opponent: "We should cut the school library budget. Nobody really uses it anymore."\n\nResponse: "I understand why it might seem that way. If you don\'t use it much yourself, it can feel like nobody does. But for kids who don\'t have books at home, that library is the only quiet place they have to read. Keeping it open is one of the kindest things our school can do."',
            note: 'Notice how the response STARTS with acknowledging the opponent\'s view. Only then does it pivot to the argument. That\'s The Kind Heart.',
          },
          {
            id: 'b2-4-2', type: 'question', argusExpression: 'thinking',
            prompt: 'Your friend says: "I am NOT happy. We should have NO homework EVER because kids are completely exhausted after school." Which response uses The Kind Heart correctly?',
            options: [
              { text: '"What\'s wrong with homework? It\'s actually good for you."', correct: false, feedback: 'That ignores their feeling completely. The Kind Heart always acknowledges the feeling first. Then argues. Jumping straight to "you\'re wrong" will just make them angrier.' },
              { text: '"I actually love homework, so I disagree."', correct: false, feedback: 'Making it about yourself doesn\'t help. The Kind Heart is about showing you understand THEIR experience. Not broadcasting yours.' },
              { text: '"I know. I get tired too. And doing just a little homework keeps what we learned fresh so we do better tomorrow."', correct: true, feedback: 'Perfect! You started with "I know. I get tired too." That\'s the acknowledgement. Then you gently pivoted to your argument. That\'s The Kind Heart.' },
            ],
          },
          {
            id: 'b2-4-3', type: 'info', argusExpression: 'thinking',
            heading: 'A Harder Version',
            body: 'Opponent: "I\'ve been trying to show everyone my science project for THREE days and every time something else comes first. I\'m starting to think nobody even cares what I\'ve been working on."',
            note: 'This one has two feelings underneath. Make sure your response catches both.',
          },
          {
            id: 'b2-4-4', type: 'question', argusExpression: 'thinking',
            prompt: 'Which response uses The Kind Heart correctly here?',
            options: [
              { text: '"The schedule has been really busy. It\'s not personal."', correct: false, feedback: '"It\'s not personal" is one of the least comforting things you can say to someone who feels invisible. It explains the situation but dismisses the feeling.' },
              { text: '"I can see you\'re frustrated. And honestly, you should be. Three days is a long time to wait. Your project matters and I think we should make it the first thing we do tomorrow."', correct: true, feedback: 'That catches both feelings: the frustration AND the sense of invisibility. Then it pivots to a concrete, kind action. That\'s The Kind Heart at full strength.' },
              { text: '"Your project is probably really good, don\'t worry."', correct: false, feedback: 'That\'s encouraging, but it sidesteps the real feeling. That they feel forgotten. The Kind Heart names the feeling before offering comfort.' },
            ],
          },
        ],
      },
      {
        step: 5, title: 'Say It',
        screens: [
          {
            id: 'b2-5-1', type: 'info', argusExpression: 'encouraging',
            heading: 'The Kind Heart Out Loud',
            body: '"I understand why you feel that way. If I were in your position, I might feel the same. And I still think there\'s a kinder way through this that works for both of us. Here\'s what I\'d suggest."',
            note: 'Three parts: acknowledge, show you genuinely understand, then gently steer. Short. Warm. Steady.',
            cta: "I\'m ready →",
          },
          {
            id: 'b2-5-2', type: 'deliver', argusExpression: 'confident',
            body: '"I understand why you feel that way. If I were in your position, I might feel the same. And I still think there\'s a kinder way through this that works for both of us. Here\'s what I\'d suggest."',
            caption: 'Now say it out loud. Like you mean it. And you do.',
            timerSecs: 15,
          },
          {
            id: 'b2-5-3', type: 'completion',
            saidText: 'Verdict: The Kind Heart. Mastered. The Parlour notes your progress.',
            skippedText: 'Almost. Come back and say it next time. Words need a voice.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // m-b3  THE GOLDEN RULE
  // ─────────────────────────────────────────────────────────────────────────────
  'm-b3': {
    cardId: 'm-b3',
    steps: [
      {
        step: 1, title: "Understand the Bigger Purpose",
        screens: [
          {
            id: 'b3-1-1', type: 'info', argusExpression: 'confident',
            heading: "What's It Really About?",
            body: "Sometimes people argue about something small. But underneath it, there's a much bigger reason why it matters. The Golden Rule asks you to pause and ask: what does everyone here actually want? What is this really about?",
          },
          {
            id: 'b3-1-2', type: 'info', argusExpression: 'confident',
            heading: 'Finding the Bigger Goal',
            body: "Mia and her brother are fighting about who gets the TV remote. On the surface, it looks like an argument about a remote control. But underneath? They've both had a long day and they both just want to relax. That's what the argument is really about.",
          },
          {
            id: 'b3-1-3', type: 'question', argusExpression: 'thinking',
            prompt: "Mia and her brother are arguing about the TV. What are they REALLY arguing about?",
            options: [
              { text: 'Which shows are better.', correct: false, feedback: "That's the surface. The thing they're fighting over. But look underneath: why does each of them want the TV at all?" },
              { text: 'They both want to rest and unwind after a long day.', correct: true, feedback: "Exactly! The TV is just the surface. Underneath, they both want the same thing: a break. Once you see that, you can find an answer that works for both of them." },
              { text: 'Who has more power at home.', correct: false, feedback: "Power might creep in. But that's not the core need here. They're both just tired. Start with the simplest explanation." },
            ],
          },
          {
            id: 'b3-1-4', type: 'info', argusExpression: 'confident',
            heading: 'A Bigger Stage',
            body: "In a town debate, some people want to build a new road. Others are angry because it would go through a park they love. On the surface, it looks like they want opposite things. But they both actually want the same thing: a better, happier community for everyone who lives there.",
          },
          {
            id: 'b3-1-5', type: 'question', argusExpression: 'thinking',
            prompt: "In the road vs. park debate, what do both sides REALLY want?",
            options: [
              { text: "Specifically a road, or specifically a park. One or the other.", correct: false, feedback: "Those are what they're each asking for. But they're the means, not the end. What goal are both trying to reach?" },
              { text: "To win the argument so the other side has to give up.", correct: false, feedback: "Winning might feel satisfying in the moment. But it's not the underlying need. People argue because something they care about is at stake." },
              { text: "A better life for their community. They just disagree on how to get there.", correct: true, feedback: "Right! Both sides want the same destination. The Golden Rule finds that shared destination and argues that your path is the best way to reach it." },
            ],
          },
        ],
      },
      {
        step: 2, title: 'Understand the Feeling',
        screens: [
          {
            id: 'b3-2-1', type: 'info', argusExpression: 'encouraging',
            quote: "Stop! This isn't even about the bedtime rule anymore! It's about the fact that you NEVER listen to me!",
            note: "The argument just shifted. Something bigger is going on. What does this person actually need right now?",
          },
          {
            id: 'b3-2-2', type: 'question', argusExpression: 'encouraging',
            prompt: "Why has this argument grown bigger than the bedtime rule?",
            options: [
              { text: "They just really hate the bedtime rule.", correct: false, feedback: "The bedtime rule started it. But listen to the words: 'you NEVER listen to me.' That's not about bedtime anymore." },
              { text: "They feel like they're not being heard or taken seriously.", correct: true, feedback: "Exactly. The bedtime rule was the trigger, but the real need is to feel listened to. Once you see that, you know what the argument is really about." },
              { text: "They want to stay up as late as possible.", correct: false, feedback: "That might be what started it. But the feeling driving the shout is much bigger than that now." },
            ],
          },
          {
            id: 'b3-2-3', type: 'info', argusExpression: 'encouraging',
            quote: "Every time I suggest something, you say 'that's not how we do things.' I feel like... what's the point of even trying? Like my ideas don't count.",
            note: "This person isn't upset about one decision. What's the bigger feeling underneath all of this?",
          },
          {
            id: 'b3-2-4', type: 'question', argusExpression: 'encouraging',
            prompt: "What is this person really feeling?",
            options: [
              { text: "Annoyed that one idea got rejected.", correct: false, feedback: "It started there. But they said 'every time' and 'what's the point of even trying.' That's not one rejection. That's something heavier." },
              { text: "Only sad.", correct: false, feedback: "Sadness is part of it. But there's also frustration and something that sounds like giving up. Look again." },
              { text: "Both frustrated AND hopeless. Like their voice simply doesn't count.", correct: true, feedback: "Yes. Frustrated from repeated rejection AND hopeless from feeling invisible. The Golden Rule would ask: what do they REALLY need? To feel like their voice matters." },
            ],
          },
        ],
      },
      {
        step: 3, title: 'See It in Arguments',
        screens: [
          {
            id: 'b3-3-1', type: 'info', argusExpression: 'thinking',
            heading: 'How The Golden Rule Works in Arguments',
            body: "When you use The Golden Rule, you pause the surface argument and ask out loud: what does everyone here actually want? Then you show that your answer is the one that gets everyone there. It's very hard to argue against your own goal.",
          },
          {
            id: 'b3-3-2', type: 'question', argusExpression: 'thinking',
            prompt: 'In a debate about homework, a student said: "We\'re not really arguing about homework. We\'re arguing about how kids learn best. If that\'s the real goal, then homework that feels connected to real life will work better than homework that feels like a punishment." What did this student do?',
            options: [
              { text: "Changed the subject to avoid the question.", correct: false, feedback: "They didn't change the subject. They found the REAL subject underneath. That's the whole move." },
              { text: "Found the shared goal (learning well) and argued their answer reaches it.", correct: true, feedback: "Yes! They lifted the debate above 'homework yes or no' to 'what helps kids learn?'. And then answered that question. That's The Golden Rule." },
              { text: "Agreed with the other side to end the argument.", correct: false, feedback: "They didn't agree. They reframed the entire debate. That's not giving in. That's taking control of what the debate is actually about." },
            ],
          },
          {
            id: 'b3-3-3', type: 'info', argusExpression: 'thinking',
            heading: 'The Golden Rule in a Bigger Debate',
            body: 'In a student council debate about extending lunch break, a student said: "Let\'s think about what lunch break is actually for. It\'s not just about eating. It\'s about recharging so we can learn better in the afternoon. If that\'s the goal, then a slightly longer break doesn\'t cost us time. It buys us focus."',
            note: "They didn't argue about lunch. They argued about learning. Same conclusion. Completely different ground.",
          },
          {
            id: 'b3-3-4', type: 'question', argusExpression: 'thinking',
            prompt: "Why is it powerful to reframe an argument around the deeper goal?",
            options: [
              { text: "Because it makes your opponent look like they're missing the point.", correct: false, feedback: "The Golden Rule isn't about making your opponent look bad. It's about finding the thing everyone already agrees on. And building from there." },
              { text: "Because it shifts the debate to ground that both sides already care about.", correct: true, feedback: "Exactly! When you name the shared goal, you're not fighting anymore. You're showing how your answer reaches a destination everyone wants. That's much harder to argue against." },
              { text: "Because it confuses the other side and they make mistakes.", correct: false, feedback: "Confusion isn't the goal. Clarity is. The Golden Rule wins by making your argument feel obvious, not bewildering." },
            ],
          },
        ],
      },
      {
        step: 4, title: 'Put It Together',
        screens: [
          {
            id: 'b3-4-1', type: 'info', argusExpression: 'thinking',
            heading: 'The Full Move',
            body: 'Opponent: "We should cancel the book club. Nobody\'s that interested anymore."\n\nResponse: "Before we decide, let\'s think about what book club is actually for. It\'s not just about reading. It\'s about finding kids who love stories and giving them somewhere to belong. If that\'s the goal, the question isn\'t \'is it popular?\' It\'s \'are there kids who need it?\' And the answer to that is yes."',
            note: 'They stepped BACK from the surface question (is it popular?) and asked what the thing is really FOR. Then they answered that deeper question.',
          },
          {
            id: 'b3-4-2', type: 'question', argusExpression: 'thinking',
            prompt: 'Opponent: "We shouldn\'t get a class pet. It\'s too much work and someone always ends up doing all the cleaning." Which response uses The Golden Rule correctly?',
            options: [
              { text: '"Pets are not that much work. Stop exaggerating."', correct: false, feedback: "That argues the surface complaint without asking what the class pet is really for. The Golden Rule asks the deeper question first." },
              { text: '"I love animals and I\'ll do all the cleaning myself."', correct: false, feedback: "That's a kind offer. But it's still stuck on the surface problem. The Golden Rule finds the shared goal, not just a solution to one complaint." },
              { text: '"The real question is whether a class pet helps us learn to care for something living. If that\'s what we\'re here to find out, then the work is part of the lesson."', correct: true, feedback: "That's The Golden Rule! You lifted the debate above 'too much work' and argued for the deeper purpose. Now the work becomes an argument FOR the pet." },
            ],
          },
          {
            id: 'b3-4-3', type: 'info', argusExpression: 'thinking',
            heading: 'A Harder Version',
            body: 'Opponent: "Screen time rules are unfair because some kids are more responsible than others. We should be trusted individually."',
            note: "This one is trickier. The opponent is making a good point about fairness. How do you use The Golden Rule when the other side isn't clearly wrong?",
          },
          {
            id: 'b3-4-4', type: 'question', argusExpression: 'thinking',
            prompt: "What's the best response using The Golden Rule?",
            options: [
              { text: '"The rules are the rules and they apply to everyone equally."', correct: false, feedback: "That's The Fair Play. Correct card for some situations, but not The Golden Rule. The Golden Rule asks what the rule is actually FOR." },
              { text: '"Screen time rules aren\'t really about trust. They\'re about making sure everyone has time for other things too. If the goal is balance, the rules help everyone reach it."', correct: true, feedback: "Sharp! You found the purpose of the rule (balance, not punishment) and showed that your side serves that purpose. The opponent argued about trust; you argued about goals. That's The Golden Rule." },
              { text: '"You\'re right. Responsible kids should get different rules."', correct: false, feedback: "That's conceding the point, not reframing it. The Golden Rule reframes the debate. It doesn't surrender the ground." },
            ],
          },
        ],
      },
      {
        step: 5, title: 'Say It',
        screens: [
          {
            id: 'b3-5-1', type: 'info', argusExpression: 'encouraging',
            heading: 'The Golden Rule Out Loud',
            body: '"We might be arguing about the school garden. But what we\'re really arguing about is whether this school teaches us things that matter. A garden teaches patience, biology, and how to care for something living. That\'s what school is for. Keep the garden."',
            note: "Short. Direct. Finds the real question first, then answers it. Notice how it doesn't fight the opponent's point. It moves past it entirely.",
            cta: "I\'m ready →",
          },
          {
            id: 'b3-5-2', type: 'deliver', argusExpression: 'confident',
            body: '"We might be arguing about the school garden. But what we\'re really arguing about is whether this school teaches us things that matter. A garden teaches patience, biology, and how to care for something living. That\'s what school is for. Keep the garden."',
            caption: 'Now say it out loud. Find the thing it\'s really about. Then own it.',
            timerSecs: 15,
          },
          {
            id: 'b3-5-3', type: 'completion',
            saidText: 'Verdict: The Golden Rule. Mastered. The Parlour notes your progress.',
            skippedText: 'Almost. Come back and say it next time. Words need a voice.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // m-b4  THE PINKY PROMISE
  // ─────────────────────────────────────────────────────────────────────────────
  'm-b4': {
    cardId: 'm-b4',
    steps: [
      {
        step: 1, title: 'Understand Commitment',
        screens: [
          {
            id: 'b4-1-1', type: 'info', argusExpression: 'confident',
            heading: 'What Makes a Promise Real?',
            body: 'A real promise isn\'t "maybe" or "I\'ll try." A real promise is specific. It says exactly what will happen, when, and how. The more specific a promise is, the more you trust the person making it. Vague promises sound like excuses waiting to happen.',
          },
          {
            id: 'b4-1-2', type: 'info', argusExpression: 'confident',
            heading: 'The Vague Promise vs. The Real Promise',
            body: 'Friend A says: "I\'ll probably come to your birthday. I might be able to make it." Friend B says: "I\'ll be there at 3pm with the blue-wrapped present, and I\'m bringing your favourite crisps." Which friend do you trust more?',
          },
          {
            id: 'b4-1-3', type: 'question', argusExpression: 'thinking',
            prompt: 'Why does Friend B sound more trustworthy?',
            options: [
              { text: 'Because they have a better present.', correct: false, feedback: "The present isn't what makes the promise trustworthy. Look at the structure of what they said. The detail, the specifics." },
              { text: 'Because they gave exact details. Time, gift, food. Which shows they\'ve actually thought it through.', correct: true, feedback: "Exactly! Specific details prove that someone has committed with their mind, not just their mouth. Vague promises can always be wriggled out of. Specific ones can't." },
              { text: 'Because they seem more excited.', correct: false, feedback: "Excitement fades. Commitment is about what you DO. And the specifics show what they're actually planning to do." },
            ],
          },
          {
            id: 'b4-1-4', type: 'info', argusExpression: 'confident',
            heading: 'Commitment in the Bigger World',
            body: 'When a builder quotes a job, they don\'t say "it\'ll probably be fine and should cost roughly something." They say: "I\'ll finish by Friday the 14th, it will cost £240, and here\'s exactly what I\'ll fix." That level of detail is how you know they mean it.',
          },
          {
            id: 'b4-1-5', type: 'question', argusExpression: 'thinking',
            prompt: 'Why does giving specific details make people trust you more?',
            options: [
              { text: 'Because it shows you\'ve actually thought about what you\'re promising. Not just saying words.', correct: true, feedback: "Right! Detail is the proof of real commitment. Anyone can say 'I promise.' Only someone who means it can say exactly what, when, and how." },
              { text: 'Because long answers always sound smarter.', correct: false, feedback: "Length alone doesn't build trust. A specific short promise ('I'll be there at 3pm') is more trustworthy than a long vague one." },
              { text: "Because it gives the other person more to argue about.", correct: false, feedback: "The goal of The Pinky Promise is certainty. Not to invite more debate. Specifics close arguments down, not open them up." },
            ],
          },
        ],
      },
      {
        step: 2, title: 'Understand the Feeling',
        screens: [
          {
            id: 'b4-2-1', type: 'info', argusExpression: 'encouraging',
            quote: "You said you MIGHT come to my match. Maybe. Probably. And then you weren't there.",
            note: "Someone was let down by a vague promise. Let's think about what that actually feels like from the inside.",
          },
          {
            id: 'b4-2-2', type: 'question', argusExpression: 'encouraging',
            prompt: "Why did the vague promise hurt so much?",
            options: [
              { text: "Because the person missed the match by accident.", correct: false, feedback: "The accident isn't the hurt. The hurt came before. From the moment the promise was vague. 'Might' and 'probably' already told them not to count on it." },
              { text: 'Because "maybe" meant they could never really rely on it. They were already half-expecting to be let down.', correct: true, feedback: "Exactly. Vague promises don't just fail in the moment. They fail from the second they're made. The person spent the whole lead-up hoping but not knowing. That's exhausting." },
              { text: "Because the match wasn't important enough to warrant a real promise.", correct: false, feedback: "The match was very important to THEM. What makes something worth a real promise isn't how big it is. It's how much it matters to the person asking." },
            ],
          },
          {
            id: 'b4-2-3', type: 'info', argusExpression: 'encouraging',
            quote: "Every time you say 'probably' or 'I'll try,' I don't know if I can count on you. It makes me feel like I'm not worth a proper answer.",
            note: "The problem isn't just unreliability. There's a deeper feeling here. Something about what vague promises say about how much you matter.",
          },
          {
            id: 'b4-2-4', type: 'question', argusExpression: 'encouraging',
            prompt: "What is this person feeling?",
            options: [
              { text: "Only frustrated by the uncertainty.", correct: false, feedback: "Frustration is there. But look at the last words: 'like I'm not worth a proper answer.' That's something more personal than just frustration." },
              { text: "Only hurt.", correct: false, feedback: "Hurt is there too. But the frustration at never being able to plan or count on anyone is also real. It's both." },
              { text: "Both frustrated AND like they don't matter enough to deserve a real commitment.", correct: true, feedback: "Yes. The vague promises aren't just inconvenient. They send a message: 'You're not important enough for me to commit to.' That's why The Pinky Promise matters so much. It says: you ARE worth a real answer." },
            ],
          },
        ],
      },
      {
        step: 3, title: 'See It in Arguments',
        screens: [
          {
            id: 'b4-3-1', type: 'info', argusExpression: 'thinking',
            heading: 'How The Pinky Promise Works in Arguments',
            body: 'In a debate, vague arguments sound like: "This might work" or "Things would probably be better." The Pinky Promise replaces all of that with certainty. You don\'t say what might happen. You say exactly what WILL happen, with specific details that show you\'ve thought it through.',
          },
          {
            id: 'b4-3-2', type: 'question', argusExpression: 'thinking',
            prompt: 'In a debate about getting a class pet, a student said: "If we get the hamster, here\'s exactly what will happen: I will clean the cage every Monday. Priya will bring fresh food every Wednesday. By the end of term, we will have a pet AND we will have proved we can be responsible." What makes this argument convincing?',
            options: [
              { text: 'They mentioned three different people.', correct: false, feedback: "The number of people isn't what makes it convincing. Look at the TYPE of things they said. Days, names, a clear outcome." },
              { text: 'They gave specific, committed details. Days, names, a clear outcome. Leaving no room for doubt.', correct: true, feedback: "Yes! Specific details ('Monday', 'Wednesday', 'Priya') turn a wish into a plan. A plan is much harder to argue against than a hope." },
              { text: 'They were very enthusiastic.', correct: false, feedback: "Enthusiasm without specifics sounds desperate. Specifics without enthusiasm still sound solid. It's the detail that does the work." },
            ],
          },
          {
            id: 'b4-3-3', type: 'info', argusExpression: 'thinking',
            heading: 'The Pinky Promise in a Real Debate',
            body: 'In a student council debate, a candidate said: "If you vote for me, here\'s exactly what I\'ll do: first week, I\'ll run a survey of every class. Second week, I\'ll present the results to the head teacher. By half-term, we\'ll have a concrete proposal on the table. Not promises. A plan."',
            note: "Notice how they replaced 'I'll try to make things better' with a timeline and specific actions. That's the difference between hope and commitment.",
          },
          {
            id: 'b4-3-4', type: 'question', argusExpression: 'thinking',
            prompt: "Why does a specific commitment persuade people better than a general promise?",
            options: [
              { text: "Because it sounds more impressive.", correct: false, feedback: "It's not about sounding impressive. It's about being believable. Specific details are evidence that you've actually thought it through." },
              { text: "Because it shows you've planned it. Which means you believe it will actually work.", correct: true, feedback: "Exactly! If you're willing to say exactly what will happen, it's because you're genuinely confident it will. That confidence is contagious." },
              { text: "Because the other side won't have time to check your facts.", correct: false, feedback: "The goal isn't to bluff faster than they can check. The Pinky Promise works because the specifics are REAL. They're a genuine commitment." },
            ],
          },
        ],
      },
      {
        step: 4, title: 'Put It Together',
        screens: [
          {
            id: 'b4-4-1', type: 'info', argusExpression: 'thinking',
            heading: 'The Full Move',
            body: 'Opponent: "Kids can\'t be trusted to look after the school garden. They\'ll forget and everything will die."\n\nResponse: "Here\'s exactly what will happen: Group A waters on Monday and Thursday. Group B weeds on Wednesday. I will check every Friday and if something is wrong, I will fix it that day. By the end of term, the garden will be healthier than it is now."',
            note: 'Notice: no "hopefully" or "we\'ll try." Every sentence is a specific commitment. That\'s The Pinky Promise. Your certainty IS the argument.',
          },
          {
            id: 'b4-4-2', type: 'question', argusExpression: 'thinking',
            prompt: 'Opponent: "Longer playtime is a nice idea, but it\'ll probably just lead to more mess and arguments." Which response uses The Pinky Promise correctly?',
            options: [
              { text: '"Longer playtime would be great for everyone. Trust us."', correct: false, feedback: "'Trust us' without specifics is exactly the kind of vague promise The Pinky Promise replaces. What will you actually do?" },
              { text: '"It might work out fine, and I think we should try it."', correct: false, feedback: "'Might' and 'think' are the enemy. The Pinky Promise removes all the maybes." },
              { text: '"Here\'s what will happen: two duty teachers on the field every day, one extra litter bin, and I\'ll personally write a report after two weeks. If it\'s not working, we stop."', correct: true, feedback: "That's The Pinky Promise! Specific people, specific actions, a clear timeline, and a direct challenge to the opponent. Certainty wins." },
            ],
          },
          {
            id: 'b4-4-3', type: 'info', argusExpression: 'thinking',
            heading: 'A Harder Version',
            body: 'Opponent: "I\'m worried that if we stay up an extra half hour, we\'ll be too tired the next morning and do worse at school."',
            note: 'This one is trickier. The opponent has a real, specific worry. Your commitment needs to match their specific concern.',
          },
          {
            id: 'b4-4-4', type: 'question', argusExpression: 'thinking',
            prompt: "What's the best response using The Pinky Promise?",
            options: [
              { text: '"We won\'t be tired. Kids can handle staying up later."', correct: false, feedback: "That's a blanket denial. It doesn't address their specific worry or give them any reason to believe you." },
              { text: '"I\'ll use that extra half hour to read, not screens. I\'ll be in bed by 9:15 with the light off. If my grades drop in the next month, we go back to 8:45. You can check."', correct: true, feedback: "That's The Pinky Promise at full strength! You matched their specific worry with specific commitments. Exact bedtime, a measurable test period, and accountability." },
              { text: '"Lots of kids stay up later and they\'re fine."', correct: false, feedback: "That's an appeal to others, not a personal commitment. The Pinky Promise is about YOUR specific plan. Not what other people do." },
            ],
          },
        ],
      },
      {
        step: 5, title: 'Say It',
        screens: [
          {
            id: 'b4-5-1', type: 'info', argusExpression: 'encouraging',
            heading: 'The Pinky Promise Out Loud',
            body: '"Here is exactly what will happen. On Monday, I will do this. By Wednesday, that will be done. At the end of the month, here is what you will see. Not maybe. Not probably. That is my promise. And I\'m ready to be held to it."',
            note: "Notice there are no maybes. No hedging. Every sentence is a statement of fact about the future.",
            cta: "I\'m ready →",
          },
          {
            id: 'b4-5-2', type: 'deliver', argusExpression: 'confident',
            body: '"Here is exactly what will happen. On Monday, I will do this. By Wednesday, that will be done. At the end of the month, here is what you will see. Not maybe. Not probably. That is my promise. And I\'m ready to be held to it."',
            caption: "Now say it out loud. Say it like you've already seen it happen.",
            timerSecs: 15,
          },
          {
            id: 'b4-5-3', type: 'completion',
            saidText: 'Verdict: The Pinky Promise. Mastered. The Parlour notes your progress.',
            skippedText: 'Almost. Come back and say it next time. Words need a voice.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // m-b5  THE TEAM
  // ─────────────────────────────────────────────────────────────────────────────
  'm-b5': {
    cardId: 'm-b5',
    steps: [
      {
        step: 1, title: "Understand the Power of Everyone Winning",
        screens: [
          {
            id: 'b5-1-1', type: 'info', argusExpression: 'confident',
            heading: 'What Does "Everyone Wins" Mean?',
            body: "The strongest arguments aren't ones where one side wins and the other loses. They're the ones where nobody loses. When you can show that your idea helps everyone. Not just yourself. It becomes very hard to say no.",
          },
          {
            id: 'b5-1-2', type: 'info', argusExpression: 'confident',
            heading: 'When Everyone Benefits',
            body: 'The class is planning their end-of-year trip. One group wants a science museum. Another wants an art gallery. A third student says: "What about the natural history museum? The science group gets fossils and evolution. The art group gets incredible sculptures. And the school gets an educational trip that covers both." Nobody loses.',
          },
          {
            id: 'b5-1-3', type: 'question', argusExpression: 'thinking',
            prompt: 'Why is the natural history museum a strong argument in this situation?',
            options: [
              { text: "Because it's the most popular choice.", correct: false, feedback: "We don't know it's the most popular. What we know is something more important: it gives something to everyone who was arguing." },
              { text: "Because it gives something to each group. So nobody can reasonably say no.", correct: true, feedback: "Exactly! When your argument helps everyone, the people arguing against each other have no reason to say no. The Team makes rejection feel unreasonable." },
              { text: "Because science is more important than art.", correct: false, feedback: "That's a different argument. And one that would just restart the fight. The Team doesn't pick a winner. It makes everyone one." },
            ],
          },
          {
            id: 'b5-1-4', type: 'info', argusExpression: 'confident',
            heading: 'The Team in the Bigger World',
            body: 'When a city builds a new park, a good proposal says: "Families get a safe place for children to play. Elderly residents get a quiet place to walk. Local businesses get more foot traffic. The whole community wins." That\'s The Team at full scale.',
          },
          {
            id: 'b5-1-5', type: 'question', argusExpression: 'thinking',
            prompt: 'Why does listing who benefits make an argument more persuasive?',
            options: [
              { text: "Because longer lists sound more impressive.", correct: false, feedback: "A long list of weak beneficiaries is still weak. What matters is that EVERY major group is genuinely served. Not just mentioned." },
              { text: "Because it's harder to oppose a plan when you're one of the people it helps.", correct: true, feedback: "Right! If you're in the list of people who benefit, you'd have to argue against your own interests to say no. The Team puts everyone on the same side." },
              { text: "Because it avoids having to explain the actual idea.", correct: false, feedback: "The Team doesn't hide the idea. It frames the idea's impact. You still have to be clear about what you're proposing." },
            ],
          },
        ],
      },
      {
        step: 2, title: 'Understand the Feeling of Being Left Out',
        screens: [
          {
            id: 'b5-2-1', type: 'info', argusExpression: 'encouraging',
            quote: "How come they get a brand new playground and our side of the school still has the old broken equipment? We're in the same school!",
            note: "Someone feels like they've been forgotten. Let's look carefully at what that actually feels like from the inside.",
          },
          {
            id: 'b5-2-2', type: 'question', argusExpression: 'encouraging',
            prompt: "What is this person feeling?",
            options: [
              { text: "Jealous of the other group's equipment.", correct: false, feedback: "Jealousy might be part of it. But look at the last four words: 'We're in the same school.' That's the real feeling underneath." },
              { text: "Left out and like they're being treated as less important than others in the same community.", correct: true, feedback: "Exactly. This isn't pure jealousy. It's the feeling that they don't count as much as the other group. When your team isn't mentioned, you feel invisible. That's why The Team matters." },
              { text: "Angry that the other group got lucky.", correct: false, feedback: "Luck would be random. And that would almost be easier to accept. What's hurting them is that the decision was made and they weren't included in it." },
            ],
          },
          {
            id: 'b5-2-3', type: 'info', argusExpression: 'encouraging',
            quote: "I don't mind you having something nice. I just want to feel like we matter too. Like we're part of the same school, not a different one.",
            note: "This person isn't being selfish. Look at what they're actually asking for. What are both feelings here?",
          },
          {
            id: 'b5-2-4', type: 'question', argusExpression: 'encouraging',
            prompt: "What is this person really feeling?",
            options: [
              { text: "Only sad that they don't have nice equipment.", correct: false, feedback: "Look again: 'I don't mind you having something nice.' They're not complaining about the other group getting something. Something deeper is happening." },
              { text: "Only angry at the people who made the decision.", correct: false, feedback: "Anger is there. But it's quiet anger. The sadder feeling is in the last sentence: 'like we're part of the same school.'" },
              { text: "Both hurt AND feeling like they don't belong to the same community as everyone else.", correct: true, feedback: "Yes. There's hurt from being left out AND a deeper sadness about not feeling like a valued part of the whole. The Team directly answers both: when everyone is included, nobody has to feel this way." },
            ],
          },
        ],
      },
      {
        step: 3, title: 'See It in Arguments',
        screens: [
          {
            id: 'b5-3-1', type: 'info', argusExpression: 'thinking',
            heading: 'How The Team Works in Arguments',
            body: "When you use The Team, you don't just argue for yourself. You name every group who benefits from your position and show exactly how. The goal is for everyone listening to hear their own name in your argument. And to realise they'd be saying no to themselves.",
          },
          {
            id: 'b5-3-2', type: 'question', argusExpression: 'thinking',
            prompt: 'A student argues for a Friday reading period: "This helps the readers. They get more time with books. It helps the kids who find school tiring. A quiet, low-pressure end to the week. And it helps the teachers. A calm Friday afternoon instead of a difficult one." What made this argument effective?',
            options: [
              { text: "The student was very enthusiastic about reading.", correct: false, feedback: "Personal enthusiasm is fine. But it only persuades people who share your enthusiasm. This argument was designed to reach people who might NOT care about reading." },
              { text: "The student identified different groups and showed each one a specific benefit.", correct: true, feedback: "Exactly! Readers, tired kids, teachers. Three different groups, three different benefits. Everyone in the room heard themselves named. That's The Team." },
              { text: "The student spoke for a long time.", correct: false, feedback: "Length isn't the point. This argument is actually quite short. The power comes from covering every group. Not from talking more." },
            ],
          },
          {
            id: 'b5-3-3', type: 'info', argusExpression: 'thinking',
            heading: 'The Team in a Real Debate',
            body: 'In a school council debate about starting school 15 minutes later, a student said: "Later start helps students who travel far. They stop arriving stressed. It helps teachers. A calm arrival is a better start to a lesson. It helps parents. Less rushing at home. And it helps the school\'s performance, because tired students learn less."',
            note: "Notice the structure: group, their specific benefit, repeat. When everyone is on the list, it's very hard to argue against.",
          },
          {
            id: 'b5-3-4', type: 'question', argusExpression: 'thinking',
            prompt: "Why does naming specific groups make The Team stronger than just saying 'this is good for everyone'?",
            options: [
              { text: "Because it makes the argument longer.", correct: false, feedback: "Length isn't strength. But specificity is." },
              { text: "Because vague claims like 'everyone benefits' are easy to dismiss. Specific groups make it real and checkable.", correct: true, feedback: "Right! 'Everyone benefits' sounds like an empty claim. 'This helps Year 4 students, the dinner staff, and the PE department' sounds like someone who has actually thought it through." },
              { text: "Because it shows you've done a lot of research.", correct: false, feedback: "The groups don't have to come from research. They come from thinking carefully about who is affected. That's a skill, not a library trip." },
            ],
          },
        ],
      },
      {
        step: 4, title: 'Put It Together',
        screens: [
          {
            id: 'b5-4-1', type: 'info', argusExpression: 'thinking',
            heading: 'The Full Move',
            body: 'Opponent: "We don\'t need a homework club after school. Kids just want to go home."\n\nResponse: "Let\'s think about who a homework club actually helps. It helps the kids who don\'t have a quiet space at home. They get somewhere to concentrate. It helps the ones who get stuck. They get a teacher nearby. It helps parents who work late. They don\'t have to worry. Nobody has to go. But lots of people need it to exist."',
            note: 'Key phrase: "Nobody has to go." The Team never forces anyone. It just shows that removing something hurts specific people who need it.',
          },
          {
            id: 'b5-4-2', type: 'question', argusExpression: 'thinking',
            prompt: 'Opponent: "We shouldn\'t bother with a school vegetable garden. It takes up space and it\'s extra work for the caretaker." Which response uses The Team correctly?',
            options: [
              { text: '"I really want a garden and I think it would be fun."', correct: false, feedback: "That's arguing for yourself. The Team is specifically about showing the benefit isn't just yours." },
              { text: '"A garden would be good for the school."', correct: false, feedback: "Too vague. The Team needs to name specific groups and specific benefits. 'Good for the school' doesn't help anyone see themselves in the argument." },
              { text: '"The science class gets a living lab. Food tech gets real ingredients. The caretaker gets a space managed by students, not dumped on him. And every kid who tends a plant gets to feel like they made something. Nobody loses."', correct: true, feedback: "That's The Team! The objection about the caretaker's workload is turned into an argument FOR the garden. Everyone named, everyone wins." },
            ],
          },
          {
            id: 'b5-4-3', type: 'info', argusExpression: 'thinking',
            heading: 'A Harder Version',
            body: 'Opponent: "Giving Year 6 a separate lunch sitting is unfair to the younger years. It feels like Year 6 get special treatment."',
            note: "The Team needs to show that fairness to everyone. Including that group. Supports your side.",
          },
          {
            id: 'b5-4-4', type: 'question', argusExpression: 'thinking',
            prompt: "What's the best response using The Team?",
            options: [
              { text: '"Year 6 deserve it because they\'re the oldest."', correct: false, feedback: "That's an argument for one group only. It actually confirms the opponent's worry that it's special treatment." },
              { text: '"The separate sitting helps Year 6 prepare for secondary school. But it also helps the younger years. The hall is less crowded and noisy when Year 6 isn\'t there. Both groups win."', correct: true, feedback: "That's The Team! You took the opponent's specific concern (younger years being left out) and turned it into an argument: the younger years ALSO benefit." },
              { text: '"We can all take turns having a special sitting."', correct: false, feedback: "That's a compromise. Not The Team. The Team shows the current proposal already helps everyone, without needing to change it." },
            ],
          },
        ],
      },
      {
        step: 5, title: 'Say It',
        screens: [
          {
            id: 'b5-5-1', type: 'info', argusExpression: 'encouraging',
            heading: 'The Team Out Loud',
            body: '"This doesn\'t just help me. It helps the younger kids who need more support. It helps the teachers who want calmer lessons. It helps the parents who want less stress at home. When everyone wins, nobody can reasonably say no. That\'s why we should do this."',
            note: "Notice the structure: name a group, name their benefit, repeat until everyone is covered, then land the conclusion. Nobody left out.",
            cta: "I\'m ready →",
          },
          {
            id: 'b5-5-2', type: 'deliver', argusExpression: 'confident',
            body: '"This doesn\'t just help me. It helps the younger kids who need more support. It helps the teachers who want calmer lessons. It helps the parents who want less stress at home. When everyone wins, nobody can reasonably say no. That\'s why we should do this."',
            caption: 'Now say it out loud. Put everyone on your team.',
            timerSecs: 15,
          },
          {
            id: 'b5-5-3', type: 'completion',
            saidText: 'Verdict: The Team. Mastered. The Parlour notes your progress.',
            skippedText: 'Almost. Come back and say it next time. Words need a voice.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // m-b6  THE BEST FRIEND
  // ─────────────────────────────────────────────────────────────────────────────
  'm-b6': {
    cardId: 'm-b6',
    steps: [
      {
        step: 1, title: 'Understand Calm Certainty',
        screens: [
          {
            id: 'b6-1-1', type: 'info', argusExpression: 'confident',
            heading: 'What Is Calm Certainty?',
            body: "Some arguments are won not by the person who shouts loudest, but by the person who stays calmest. Calm certainty means you know what you believe, you know why you believe it. And no amount of pressure will change that. You're not stubborn. You're steady.",
          },
          {
            id: 'b6-1-2', type: 'info', argusExpression: 'confident',
            heading: 'What Steady Looks Like',
            body: "Woody never changes who he is, no matter what happens. Lotso tries to convince him. Buzz turns against him. He ends up in the bin. And still, when it matters most, he knows exactly what he stands for. Nothing moves him off that.",
          },
          {
            id: 'b6-1-3', type: 'question', argusExpression: 'thinking',
            prompt: "What makes Woody's certainty convincing rather than just annoying?",
            options: [
              { text: "He shouts louder than everyone else.", correct: false, feedback: "Woody is actually quite calm. It's the steadiness, not the volume, that makes people take him seriously." },
              { text: "He knows his reason. And he never loses sight of it, even under extreme pressure.", correct: true, feedback: "Exactly. He doesn't just say 'I'm right.' He knows WHY he's right. And that knowledge is what keeps him steady. The Best Friend isn't stubbornness. It's rootedness." },
              { text: "He never listens to what the other side says.", correct: false, feedback: "'I hear you' is literally part of the move. What he doesn't do is let listening change his core conviction." },
            ],
          },
          {
            id: 'b6-1-4', type: 'info', argusExpression: 'confident',
            heading: 'Steady Under Pressure in the Real World',
            body: "Scientists sometimes hold conclusions that most people disagree with. For years. Until the evidence finally proves them right. They don't shout. They don't give up. They keep saying: 'Here is my evidence. Here is why I believe it.' Calmly. Again and again.",
          },
          {
            id: 'b6-1-5', type: 'question', argusExpression: 'thinking',
            prompt: "Why does calm repetition work better than getting louder when someone pressures you?",
            options: [
              { text: "Because it makes the other person feel bad for pushing.", correct: false, feedback: "Making the other person feel bad is not the goal. The goal is to show your position is solid. Not to win by making them uncomfortable." },
              { text: "Because staying calm shows your belief is based on something real, not just emotion.", correct: true, feedback: "Right. If you shout or get flustered, it looks like your argument is weak and you're compensating. If you stay calm, it looks like you have nothing to fear. Because you've thought it through." },
              { text: "Because people will eventually give up trying.", correct: false, feedback: "The goal isn't to outlast people through boredom. It's to stay grounded because you're genuinely convinced. There's a big difference between those two things." },
            ],
          },
        ],
      },
      {
        step: 2, title: 'Understand the Feeling of Being Pressured',
        screens: [
          {
            id: 'b6-2-1', type: 'info', argusExpression: 'encouraging',
            quote: "But EVERYONE says you're wrong! How can you STILL think that? Maybe you're the problem.",
            note: "Someone is being pushed very hard to change their mind. What does that pressure actually feel like. And what should you do?",
          },
          {
            id: 'b6-2-2', type: 'question', argusExpression: 'encouraging',
            prompt: 'When someone says "everyone disagrees with you," what are they really trying to do?',
            options: [
              { text: "Help you understand that you've made a mistake.", correct: false, feedback: "Maybe. But notice how they said it. 'Everyone says you're wrong' is pressure, not information. It doesn't give you any new evidence." },
              { text: "Use social pressure to make you doubt yourself, even without any new argument.", correct: true, feedback: "Exactly. 'Everyone thinks so' is not a reason. It's a tactic. It tries to make you feel isolated and wrong without actually proving anything. The Best Friend recognises this and doesn't move." },
              { text: "Ask you to think more carefully about your position.", correct: false, feedback: "They're not asking you to think. They're telling you you're wrong because others say so. Those are very different things." },
            ],
          },
          {
            id: 'b6-2-3', type: 'info', argusExpression: 'encouraging',
            quote: "You've been saying the same thing for ten minutes. Don't you ever change your mind? Maybe you're just not smart enough to see you're wrong.",
            note: "Now they're attacking the person directly, not just the argument. This is when The Best Friend is most important. And most difficult.",
          },
          {
            id: 'b6-2-4', type: 'question', argusExpression: 'encouraging',
            prompt: "What is the right move when someone attacks you personally instead of your argument?",
            options: [
              { text: "Get angry and attack back.", correct: false, feedback: "That's exactly what the pressure tactic wants. It's trying to knock you off your steady ground. Anger looks like a hit landed. Stay calm." },
              { text: "Apologise and change your position.", correct: false, feedback: "Changing your mind because someone called you names isn't open-mindedness. It's giving in to pressure. Real open-mindedness changes for evidence and reasons, not insults." },
              { text: "Stay calm, acknowledge what was said, and restate your position. The attack hasn't changed your evidence.", correct: true, feedback: "Right. 'I hear you. And I still believe [your position], because [your reason].' The attack is irrelevant. Your argument stands on its own." },
            ],
          },
        ],
      },
      {
        step: 3, title: 'See It in Arguments',
        screens: [
          {
            id: 'b6-3-1', type: 'info', argusExpression: 'thinking',
            heading: 'How The Best Friend Works in Arguments',
            body: "The Best Friend has one job: to hold the line. When the other side pushes back, you don't get defensive, you don't raise your voice, you don't add ten new arguments. You simply acknowledge what they said. And then restate your position, with the same calm certainty as the first time.",
          },
          {
            id: 'b6-3-2', type: 'question', argusExpression: 'thinking',
            prompt: 'In a debate about bedtime, the opponent pushed back three times. Each time, the student replied: "I hear you. And I still believe kids should have a say in their own bedtime, because they know better than anyone how tired they actually are." Why does this response work even when repeated?',
            options: [
              { text: "Because repetition is confusing.", correct: false, feedback: "Repetition isn't supposed to confuse. It's supposed to demonstrate that the position hasn't changed, and no pressure can change it." },
              { text: "Because each time it's repeated, it shows the position is grounded. Not a guess or a fleeting opinion.", correct: true, feedback: "Yes! Every time you calmly repeat the same thing, it says: 'This isn't a bluff. This isn't a reaction. This is what I actually believe.' That's very hard to break down." },
              { text: "Because eventually the opponent will run out of things to say.", correct: false, feedback: "The goal isn't to outlast. It's to stay grounded. You're repeating because you're sure, not because you're waiting them out." },
            ],
          },
          {
            id: 'b6-3-3', type: 'info', argusExpression: 'thinking',
            heading: 'The Best Friend in a Real Debate',
            body: 'In a student council speech, a candidate was challenged four times by an audience member who kept saying their plan "would never work." Each time, the candidate said: "I understand the concern. And I still believe it\'s the right plan, because the evidence from schools that have tried it shows it works."',
            note: "Notice: they acknowledged the challenge every single time. They never ignored it. But they also never moved. Acknowledgement without movement is the whole technique.",
          },
          {
            id: 'b6-3-4', type: 'question', argusExpression: 'thinking',
            prompt: "Why is it important to acknowledge what the other side says, even when you're not going to change your position?",
            options: [
              { text: "To make them feel heard so they'll stop pushing.", correct: false, feedback: "That's a side effect, not the reason. You acknowledge because you ARE listening. You just disagree. There's a difference between not listening and not agreeing." },
              { text: "Because ignoring their point looks like you can't answer it. Acknowledgement shows you've heard and considered it.", correct: true, feedback: "Exactly. 'I hear you' isn't just politeness. It's proof that you engaged with what they said. And then moving back to your position shows you considered it and weren't moved. That's more powerful than pretending they didn't speak." },
              { text: "Because the rules of debate say you have to.", correct: false, feedback: "This isn't about rules. It's about what works. Acknowledgement without movement is a very specific technique that makes you look thoughtful AND unshakeable." },
            ],
          },
        ],
      },
      {
        step: 4, title: 'Put It Together',
        screens: [
          {
            id: 'b6-4-1', type: 'info', argusExpression: 'thinking',
            heading: 'The Full Move',
            body: 'Opponent: "You\'re wrong about dogs being better than cats. Everyone knows cats are more independent."\n\nResponse: "I hear you. Cats are definitely more independent, and that\'s a real advantage. And I still believe dogs are better companions for most families, because the loyalty and affection dogs give is something most people want from a pet more than independence."',
            note: 'Three moves: "I hear you." Find something true in their point and say so. "And I still believe…" followed by your reason. Calm, grounded, unshakeable.',
          },
          {
            id: 'b6-4-2', type: 'question', argusExpression: 'thinking',
            prompt: 'Opponent: "Pizza is obviously NOT a good breakfast food. It has no nutritional value and you know it." Which response uses The Best Friend correctly?',
            options: [
              { text: '"That\'s completely wrong! Pizza has tomatoes and cheese which are nutritious!"', correct: false, feedback: "That's getting pulled into an argument about nutrition. Which is getting defensive. The Best Friend doesn't scramble to find new evidence. It holds the line it already had." },
              { text: '"You might be right that it\'s not the healthiest option. I still believe pizza can be a valid breakfast because breakfast is about starting the day with something you enjoy. And enjoyment matters."', correct: true, feedback: "Perfect! 'You might be right' acknowledges their point. 'I still believe' holds the line. The reason is the same as it always was. Nothing moved. That's The Best Friend." },
              { text: '"Fine. Maybe pizza isn\'t that good for breakfast."', correct: false, feedback: "That's capitulating to pressure. Not changing because of a new argument. The Best Friend only moves for genuine new reasons, not because someone pushed harder." },
            ],
          },
          {
            id: 'b6-4-3', type: 'info', argusExpression: 'thinking',
            heading: 'A Harder Version',
            body: 'Opponent: "I understand you want kids to decide their own bedtime. But kids who stay up late actually do worse in school, and that\'s been proven by science. You can\'t argue against that."',
            note: "The hardest version: the opponent makes a point that's genuinely quite good. Do you acknowledge it. Or hold your ground? The answer: both.",
          },
          {
            id: 'b6-4-4', type: 'question', argusExpression: 'thinking',
            prompt: "What's the best response using The Best Friend?",
            options: [
              { text: '"That science is probably wrong."', correct: false, feedback: "Dismissing evidence you can't counter is not The Best Friend. It's denial. The Best Friend acknowledges truth, then holds its ground anyway." },
              { text: '"I hear you. And that research matters. And I still believe kids should have a SAY, even if the final decision is made with parents. Input and full control are different things."', correct: true, feedback: "Brilliant! You acknowledged the science. Then held your position by narrowing it to something still defensible. Not full control, but having a say. The Best Friend adjusts the frame only when necessary, never the core conviction." },
              { text: '"I never said kids should stay up really late. I just said they should choose."', correct: false, feedback: "That's trying to rewrite what you said, not stand by it. The Best Friend holds what it always believed. It doesn't retreat by pretending it said something slightly different." },
            ],
          },
        ],
      },
      {
        step: 5, title: 'Say It',
        screens: [
          {
            id: 'b6-5-1', type: 'info', argusExpression: 'encouraging',
            heading: 'The Best Friend Out Loud',
            body: '"I hear you. I really do. And I still believe this is the right answer, because the reason I had from the start hasn\'t changed. You can push as hard as you like. I\'m still here."',
            note: "Three parts: hear them, hold your ground, name your reason one more time. The final line is optional. But Argus recommends it.",
            cta: "I\'m ready →",
          },
          {
            id: 'b6-5-2', type: 'deliver', argusExpression: 'confident',
            body: '"I hear you. I really do. And I still believe this is the right answer, because the reason I had from the start hasn\'t changed. You can push as hard as you like. I\'m still here."',
            caption: 'Now say it out loud. Calm, clear, unmoved.',
            timerSecs: 15,
          },
          {
            id: 'b6-5-3', type: 'completion',
            saidText: 'Verdict: The Best Friend. Mastered. The Parlour notes your progress.',
            skippedText: 'Almost. Come back and say it next time. Words need a voice.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // m-b7  THE LION'S COURAGE
  // ─────────────────────────────────────────────────────────────────────────────
  'm-b7': {
    cardId: 'm-b7',
    steps: [
      {
        step: 1, title: 'Understand Honest Courage',
        screens: [
          {
            id: 'b7-1-1', type: 'info', argusExpression: 'confident',
            heading: 'What is Honest Courage?',
            body: "Brave doesn't always mean fighting. Sometimes the bravest thing you can do is admit that something is true. Even when it makes your position look harder to defend. And then explain why you're still right anyway. That takes more courage than pretending the flaw doesn't exist.",
          },
          {
            id: 'b7-1-2', type: 'info', argusExpression: 'confident',
            heading: "Simba's Courage",
            body: "Simba ran away from the Pride Lands and hid for years. When Nala found him, he didn't pretend that never happened. He said: \"Yes. I ran. And I'm coming back.\" He admitted the weakness, and then showed why it didn't change what he was about to do. That's The Lion's Courage.",
          },
          {
            id: 'b7-1-3', type: 'question', argusExpression: 'thinking',
            prompt: "Why does admitting a flaw actually make Simba MORE convincing, not less?",
            options: [
              { text: "Because it makes people feel sorry for him.", correct: false, feedback: "Pity isn't the goal. Trust is. Simba doesn't want people to feel sorry for him. He wants them to believe in what he's about to do." },
              { text: "Because admitting the truth shows he isn't hiding anything. So when he says 'I'm coming back,' it sounds real.", correct: true, feedback: "Exactly. If he pretended he'd never run away, everyone would know he was lying. And nothing else he said would be trustworthy. By admitting the flaw, he earns the right to be believed." },
              { text: "Because it gets the embarrassing part out of the way early.", correct: false, feedback: "That's one way to think about it. But the deeper point is that honesty builds credibility. Once you've admitted the hard thing, everything else you say sounds more real." },
            ],
          },
          {
            id: 'b7-1-4', type: 'info', argusExpression: 'confident',
            heading: 'Honest Courage in the Real World',
            body: 'When a city council proposed a new bus route, a councillor said: "Yes, it will mean closing three stops in the village. That\'s a real inconvenience. I won\'t pretend otherwise. But the new route will carry four times as many passengers and reduce the journey time for everyone else by 20 minutes. The trade-off is worth it."',
          },
          {
            id: 'b7-1-5', type: 'question', argusExpression: 'thinking',
            prompt: "Why does admitting the bus stop closure make the argument stronger?",
            options: [
              { text: "Because it makes the opponents feel heard.", correct: false, feedback: "That's a side effect, not the mechanism. The real reason is more specific. About credibility." },
              { text: "Because pretending the closures don't exist would immediately destroy the argument's credibility.", correct: true, feedback: "Right! Everyone in that room knows three stops are closing. If the speaker pretended otherwise, nobody would trust anything else they said. Admitting it first is the only move that keeps them in the room." },
              { text: "Because it proves the proposal is balanced.", correct: false, feedback: "Admitting a downside doesn't automatically prove balance. It just proves honesty. The argument still has to show the benefit outweighs the cost." },
            ],
          },
        ],
      },
      {
        step: 2, title: 'Understand the Feeling of Being Caught',
        screens: [
          {
            id: 'b7-2-1', type: 'info', argusExpression: 'encouraging',
            quote: "You said ice cream for breakfast would make kids smarter. But sugar is really bad for you. Doesn't that prove you're completely wrong?",
            note: "Someone has just found a weakness in an argument. What is the person on the other side feeling right now. And what should they do?",
          },
          {
            id: 'b7-2-2', type: 'question', argusExpression: 'encouraging',
            prompt: "When someone points out a genuine weakness in your argument, what is the worst thing you can do?",
            options: [
              { text: "Admit it and explain why you're still right.", correct: false, feedback: "That's actually The Lion's Courage. It's the RIGHT move, not the worst one." },
              { text: "Pretend the weakness doesn't exist or change the subject.", correct: true, feedback: "Exactly. Pretending a real flaw isn't there is the worst move. Everyone can see it, and now they also know you're not being honest. You've lost both the argument and the trust." },
              { text: "Get frustrated and repeat your original point louder.", correct: false, feedback: "Getting louder when you've been caught doesn't help. But it's not quite as bad as pretending the flaw doesn't exist, because at least you're still engaging." },
            ],
          },
          {
            id: 'b7-2-3', type: 'info', argusExpression: 'encouraging',
            quote: "You see? You CAN'T answer that, can you? That means I've won. You should just give up now.",
            note: "They think they've won because they found a weakness. But finding a weakness doesn't automatically win the argument. Unless the other side lets it.",
          },
          {
            id: 'b7-2-4', type: 'question', argusExpression: 'encouraging',
            prompt: 'When an opponent says "you can\'t answer that," what does The Lion\'s Courage say to do?',
            options: [
              { text: "Agree that they've made a strong point and give up.", correct: false, feedback: "A strong point is not the same as a winning argument. The Lion's Courage agrees the point is true. Then shows why it doesn't decide the whole question." },
              { text: "Deny the weakness exists.", correct: false, feedback: "Denial only works if the weakness isn't real. If it is real, denial destroys credibility. The Lion's Courage is honest precisely because honesty is the strongest move here." },
              { text: "Acknowledge the weakness directly and then show why your argument still stands.", correct: true, feedback: "Right! 'Yes, it's true that [weakness]. AND here's why that doesn't decide the question.' Admitting it takes the wind out of their 'you can't answer that'. Because you just did." },
            ],
          },
        ],
      },
      {
        step: 3, title: 'See It in Arguments',
        screens: [
          {
            id: 'b7-3-1', type: 'info', argusExpression: 'thinking',
            heading: "How The Lion's Courage Works in Arguments",
            body: "The Lion's Courage has a very specific structure: admit the flaw, pivot with 'but' or 'and yet', then explain why your argument still holds. The admission does two things: it shows you're honest, and it shows you've already thought about the hard part.",
          },
          {
            id: 'b7-3-2', type: 'question', argusExpression: 'thinking',
            prompt: 'In a debate about cats as spies, a student said: "Yes, it\'s true that cats are completely unpredictable and might just sit down in the middle of a mission. BUT. That unpredictability is exactly what makes them impossible to track. No spy agency would ever expect the asset that stops to nap. That\'s perfect cover." What did this student do?',
            options: [
              { text: "Changed the subject when things got difficult.", correct: false, feedback: "They didn't change the subject. They went straight into the flaw. The whole point is that they faced it head-on." },
              { text: "Admitted a genuine weakness and then turned it into a strength.", correct: true, feedback: "Exactly! They didn't just admit the flaw. They flipped it. The unpredictability they admitted became part of the argument FOR cats. That's the most advanced version of The Lion's Courage." },
              { text: "Agreed with the opponent.", correct: false, feedback: "They agreed with one specific FACT. The unpredictability. But they didn't agree with the conclusion. Agreeing with a fact is not the same as surrendering the argument." },
            ],
          },
          {
            id: 'b7-3-3', type: 'info', argusExpression: 'thinking',
            heading: "The Lion's Courage in a Real Debate",
            body: 'In a debate about video games as homework, a student said: "Yes, it\'s true that some games are a complete waste of time. I won\'t pretend every game teaches something useful. But Minecraft genuinely teaches spatial reasoning. Kerbal Space Program teaches real physics. The category includes good and bad. And dismissing all of it because of the bad ones is like banning all books because some books are rubbish."',
            note: "Notice: they gave up the weakest part of their argument before their opponent could use it against them. That left the strongest part standing alone.",
          },
          {
            id: 'b7-3-4', type: 'question', argusExpression: 'thinking',
            prompt: "Why is it strategic to admit your weakness before your opponent points it out?",
            options: [
              { text: "Because it takes away their best attack.", correct: true, feedback: "Yes! If you admit the flaw first, your opponent can't use it against you. You've already dealt with it. And the fact that you brought it up yourself makes you look more trustworthy." },
              { text: "Because it proves your argument is weak.", correct: false, feedback: "Admitting one flaw doesn't prove the whole argument is weak. It proves the rest of it is solid enough to survive honesty. That's actually a strength." },
              { text: "Because judges reward honesty.", correct: false, feedback: "Maybe. But that's not why The Lion's Courage works. It works because admitting a real flaw and surviving it is more persuasive than pretending flaws don't exist." },
            ],
          },
        ],
      },
      {
        step: 4, title: 'Put It Together',
        screens: [
          {
            id: 'b7-4-1', type: 'info', argusExpression: 'thinking',
            heading: 'The Full Move',
            body: 'Opponent: "Your idea of having a class pet is irresponsible. Pets need constant care and kids will forget."\n\nResponse: "Yes, it\'s true that kids forget things. I won\'t pretend that\'s not a real risk. But here\'s why that doesn\'t decide the question: forgetting is exactly why we need the responsibility in the first place. The cage rota, the feeding chart. Those ARE the lesson."',
            note: "The flaw becomes part of the argument FOR, not against.",
          },
          {
            id: 'b7-4-2', type: 'question', argusExpression: 'thinking',
            prompt: 'Opponent: "Kids can\'t manage their own bedtime. They\'ll just stay up all night playing games." Which response uses The Lion\'s Courage correctly?',
            options: [
              { text: '"That\'s not true. Kids are more responsible than adults give them credit for."', correct: false, feedback: "That's a denial. And not a very convincing one. Some kids WOULD stay up too late. Pretending that's never true loses the audience who know it sometimes is." },
              { text: '"Yes, it\'s true that some kids would push it too far at first. AND that\'s exactly what a trial period is for. Two weeks, and if the morning routine suffers, the rule comes back."', correct: true, feedback: "That's The Lion's Courage! You admitted the real risk, then turned that admission into the reason for a structured trial. The flaw becomes the argument." },
              { text: '"I hear you. And I still believe kids should decide their own bedtime."', correct: false, feedback: "That's The Best Friend. A different move. The Lion's Courage specifically admits the flaw before holding its ground." },
            ],
          },
          {
            id: 'b7-4-3', type: 'info', argusExpression: 'thinking',
            heading: 'A Harder Version',
            body: 'Opponent: "Library books go missing all the time because nobody takes care of them. Your argument that libraries are more powerful than the internet falls apart when the books are gone."',
            note: "This one is harder. The opponent's flaw is a real and important one. The Lion's Courage has to work harder.",
          },
          {
            id: 'b7-4-4', type: 'question', argusExpression: 'thinking',
            prompt: "What's the best response using The Lion's Courage?",
            options: [
              { text: '"Libraries are well-maintained. That\'s not a real problem."', correct: false, feedback: "Books DO go missing. That's a real thing. Denying it damages credibility." },
              { text: '"Yes, it\'s true that books go missing. And that\'s a genuine problem. But it\'s a solvable one: better systems, library cards, return reminders. The internet has problems too. Misinformation, broken links, paywalls. Neither is perfect. The question is which serves readers better overall."', correct: true, feedback: "Sharp! You admitted the flaw fully, showed it's fixable, then did the same thing to the other side, and brought the debate back to the real question. That's The Lion's Courage at full strength." },
              { text: '"The internet has even more problems than libraries."', correct: false, feedback: "That's deflection. Pointing at the other side's problems instead of acknowledging your own. The Lion's Courage specifically starts with YOUR OWN flaw." },
            ],
          },
        ],
      },
      {
        step: 5, title: 'Say It',
        screens: [
          {
            id: 'b7-5-1', type: 'info', argusExpression: 'encouraging',
            heading: "The Lion's Courage Out Loud",
            body: '"Yes, it\'s true that there\'s a weakness here. I\'m not going to pretend that isn\'t real. But here\'s why that doesn\'t change my answer: the core argument still stands. The flaw exists. And I\'m still right."',
            note: "Three moves: admit, acknowledge it's real, then explain why it doesn't decide the question.",
            cta: "I\'m ready →",
          },
          {
            id: 'b7-5-2', type: 'deliver', argusExpression: 'confident',
            body: '"Yes, it\'s true that there\'s a weakness here. I\'m not going to pretend that isn\'t real. But here\'s why that doesn\'t change my answer: the core argument still stands. The flaw exists. And I\'m still right."',
            caption: "Now say it out loud. Don't hide from the hard part. Face it.",
            timerSecs: 15,
          },
          {
            id: 'b7-5-3', type: 'completion',
            saidText: "Verdict: The Lion's Courage. Mastered. The Parlour notes your progress.",
            skippedText: 'Almost. Come back and say it next time. Words need a voice.',
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // m-b8  BE RESPONSIBLE
  // ─────────────────────────────────────────────────────────────────────────────
  'm-b8': {
    cardId: 'm-b8',
    steps: [
      {
        step: 1, title: 'Understand Responsibility',
        screens: [
          {
            id: 'b8-1-1', type: 'info', argusExpression: 'confident',
            heading: 'What Does Responsibility Mean?',
            body: "Being responsible means thinking not just about what YOU want, but about what's right for everyone around you. It means asking: if I get this, what happens to everyone else? And it means being willing to argue for the answer that's good for the whole group. Even when it's harder.",
          },
          {
            id: 'b8-1-2', type: 'info', argusExpression: 'confident',
            heading: 'Responsibility in Action',
            body: 'Steven Universe could have just protected his friends and gone home. Instead, he kept asking: "What about the people we\'re fighting against? Don\'t they deserve help too? What\'s the solution that doesn\'t leave anyone behind?" That\'s what responsibility looks like. Holding a wider view when everyone else has narrowed theirs.',
          },
          {
            id: 'b8-1-3', type: 'question', argusExpression: 'thinking',
            prompt: "Your class has one big tin of biscuits. Five students want them all. What's the responsible thing to do?",
            options: [
              { text: "Give them to whoever asks first.", correct: false, feedback: "Being first doesn't make something right for everyone. Responsibility means thinking about the whole group, not just rewarding speed." },
              { text: "Split them equally so every student in the class gets some.", correct: true, feedback: "Right! Responsibility means thinking beyond the five students who spoke up. The rest of the class exists too. And the right answer includes them." },
              { text: "Give them to the most popular student to share however they want.", correct: false, feedback: "That transfers responsibility to someone else instead of solving the problem. A responsible argument takes the whole group on directly." },
            ],
          },
          {
            id: 'b8-1-4', type: 'info', argusExpression: 'confident',
            heading: 'Responsibility in the Bigger World',
            body: "A class president who only helps their friends isn't doing their job. A good class president makes decisions that are fair for the whole class. Even the students who didn't vote for them, even the difficult ones, even the ones who never say anything. That's the weight of responsibility.",
          },
          {
            id: 'b8-1-5', type: 'question', argusExpression: 'thinking',
            prompt: "Why is thinking about EVERYONE. Not just the people who voted for you. The sign of a responsible leader?",
            options: [
              { text: "Because it makes more people like you.", correct: false, feedback: "Popularity might follow. But that's not the reason. A responsible leader does the right thing even when it doesn't win them any extra friends." },
              { text: "Because responsibility means your decisions affect everyone, so everyone deserves to be considered.", correct: true, feedback: "Exactly. If your decision affects someone, they deserve to be in your thinking. Leaving people out doesn't make them disappear. It just means your decision harms them without you having to see it." },
              { text: "Because teachers will give you better marks for it.", correct: false, feedback: "Responsibility isn't for marks or rewards. It's what you owe to the people your decisions affect." },
            ],
          },
        ],
      },
      {
        step: 2, title: 'Understand the Feeling of Being Ignored',
        screens: [
          {
            id: 'b8-2-1', type: 'info', argusExpression: 'encouraging',
            quote: "He just took the last of everything for himself. There was nothing left for anyone else. It's like we don't even exist to him.",
            note: "Someone was left out because another person only thought about themselves. Let's look at what that actually does to the people left behind.",
          },
          {
            id: 'b8-2-2', type: 'question', argusExpression: 'encouraging',
            prompt: "What's wrong with taking everything for yourself when others haven't had any yet?",
            options: [
              { text: "It's against the rules.", correct: false, feedback: "Rules matter. But responsibility goes deeper than rules. The problem isn't just that it broke a rule. It's about what it says about how much you value other people." },
              { text: "It treats the other people as less important. As if their needs simply don't count.", correct: true, feedback: "Yes. Taking everything for yourself doesn't just leave others without. It sends a message: 'You don't matter to me.' That's what irresponsibility does." },
              { text: "It will make them angry at you.", correct: false, feedback: "The consequence for YOU isn't why it's wrong. It's wrong because of what it does to THEM. Their needs go unmet and they feel unseen." },
            ],
          },
          {
            id: 'b8-2-3', type: 'info', argusExpression: 'encouraging',
            quote: "I know you want what's best for yourself. But what about the rest of us? Don't our needs count too? We're all in this together.",
            note: "This person isn't asking for everything. They're asking for something much simpler. What are both feelings here?",
          },
          {
            id: 'b8-2-4', type: 'question', argusExpression: 'encouraging',
            prompt: "What is this person really feeling?",
            options: [
              { text: "Mostly jealous of what the other person has.", correct: false, feedback: "Look at the last line: 'We're all in this together.' That's not jealousy. That's a wish for something more than just equal stuff." },
              { text: "Hurt that their needs were ignored AND a need to feel that they belong to the same community.", correct: true, feedback: "Yes. There's hurt. And underneath it, a need to matter, to be included, to be part of the same 'we.' Be Responsible directly answers this: the right argument is the one that makes sure nobody gets left behind." },
              { text: "Only angry at the unfairness.", correct: false, feedback: "Anger is part of it. But 'we're all in this together' shows they want connection, not just a fair share of things." },
            ],
          },
        ],
      },
      {
        step: 3, title: 'See It in Arguments',
        screens: [
          {
            id: 'b8-3-1', type: 'info', argusExpression: 'thinking',
            heading: 'How Be Responsible Works in Arguments',
            body: "When you use Be Responsible, you don't just argue for what you want. You lift your argument to the level of what's right for everyone. Instead of 'this is good for me,' you say: 'this is good for all of us. And that's why it's the right choice.' It's very hard to argue against someone who is genuinely trying to look out for everyone.",
          },
          {
            id: 'b8-3-2', type: 'question', argusExpression: 'thinking',
            prompt: 'In a class meeting about how to use the leftover budget, a student said: "I think we should split it. It\'s not the most exciting answer. But it\'s the one that doesn\'t leave half the class feeling forgotten. That\'s what\'s right for all of us." What makes this a responsible argument?',
            options: [
              { text: "It's a compromise, which is always the fairest option.", correct: false, feedback: "Compromise isn't always the most responsible answer. Sometimes the responsible answer is to stand firm. This argument is responsible for a different reason." },
              { text: "It explicitly puts the whole class's feeling of belonging above any one group's preference.", correct: true, feedback: "Yes! 'Doesn't leave half the class feeling forgotten' is Be Responsible in action. The argument isn't 'I want a split.' It's 'a split is what's right for all of us.'" },
              { text: "It avoids conflict, which makes everyone happier.", correct: false, feedback: "Avoiding conflict isn't the goal of Be Responsible. Serving the whole group is. Sometimes being responsible means having a harder conversation, not an easier one." },
            ],
          },
          {
            id: 'b8-3-3', type: 'info', argusExpression: 'thinking',
            heading: 'Be Responsible in a Real Debate',
            body: 'In a debate about whether homework should be abolished, a student said: "I know a lot of us want less homework. But I think about the students who actually need the structure. Whose home life is chaotic and who need school to give them something reliable. Abolishing homework helps some of us and hurts others. We need to find the answer that\'s fair for everyone."',
            note: "They argued FOR students they were not. That's the most powerful form of Be Responsible. Advocating for the group that isn't speaking.",
          },
          {
            id: 'b8-3-4', type: 'question', argusExpression: 'thinking',
            prompt: "Why is arguing for people who aren't speaking one of the most powerful things you can do in a debate?",
            options: [
              { text: "Because it makes you look generous.", correct: false, feedback: "Looking generous is a side effect. The real power is in the argument itself. You're showing that your position covers more people, which makes it harder to dismiss." },
              { text: "Because it shows your argument applies to the whole situation. Not just the people in the room.", correct: true, feedback: "Exactly! An argument that only covers the people shouting is easy to defeat. Just point at who it leaves out. An argument that includes the quiet people too is much harder to attack." },
              { text: "Because the judge will feel sorry for the people you mention.", correct: false, feedback: "Sympathy isn't the mechanism. The mechanism is coverage. Your argument is stronger because it reaches more people." },
            ],
          },
        ],
      },
      {
        step: 4, title: 'Put It Together',
        screens: [
          {
            id: 'b8-4-1', type: 'info', argusExpression: 'thinking',
            heading: 'The Full Move',
            body: 'Opponent: "We should only get new playground equipment for the sports kids. They use it the most, so they should get the most."\n\nResponse: "I understand that argument. But school resources belong to everyone, not just the students who use them most. The kids who don\'t play sports might just need a different kind of space. If we only spend money on the loudest group, we\'re telling the quieter ones they don\'t count."',
            note: "They didn't attack the sports kids. They just expanded the picture. Be Responsible never argues against one group. It argues for the group that was left out.",
          },
          {
            id: 'b8-4-2', type: 'question', argusExpression: 'thinking',
            prompt: 'Opponent: "We should let the older kids have the computers first because they have more important work to do." Which response uses Be Responsible correctly?',
            options: [
              { text: '"The younger kids also deserve computer time just as much."', correct: false, feedback: "That's a fairness argument (The Fair Play). Be Responsible needs to be grounded in what's right for the whole community. Not just one group's equal claim." },
              { text: '"If we give one group priority, we\'re deciding that some students matter more than others. The right system is one that works fairly for everyone. Because every student here deserves to be considered."', correct: true, feedback: "That's Be Responsible! You didn't deny the older kids' needs. You widened the frame to include everyone. 'Every student here deserves to be considered' is the core of the move." },
              { text: '"That would make the younger kids feel left out."', correct: false, feedback: "That's The Kind Heart. Focusing on feelings. Be Responsible is about the right choice for everyone, not just managing one group's feelings." },
            ],
          },
          {
            id: 'b8-4-3', type: 'info', argusExpression: 'thinking',
            heading: 'A Harder Version',
            body: 'Opponent: "We should let kids who have no books at home borrow the class library books and keep them longer. They need it more."',
            note: "The opponent is also using a responsibility-style argument. You need to show your answer takes everyone into account, including that group.",
          },
          {
            id: 'b8-4-4', type: 'question', argusExpression: 'thinking',
            prompt: "What's the best response using Be Responsible?",
            options: [
              { text: '"Everyone should get equal time with the books. No exceptions."', correct: false, feedback: "That's The Fair Play. Equal rules. But Be Responsible sometimes means recognising that equal treatment of unequal situations isn't actually fair." },
              { text: '"I agree those students need more support. And I think the responsible answer is to get MORE books so nobody has to choose. We don\'t solve a resource problem by deciding some students matter less."', correct: true, feedback: "Brilliant! You agreed with the opponent's underlying concern AND expanded the solution so nobody loses. That's Be Responsible at its most sophisticated." },
              { text: '"That\'s not fair to the other students."', correct: false, feedback: "That's a fairness complaint. It doesn't offer a responsible solution. Be Responsible doesn't just say 'that's unfair.' It proposes the answer that's right for everyone." },
            ],
          },
        ],
      },
      {
        step: 5, title: 'Say It',
        screens: [
          {
            id: 'b8-5-1', type: 'info', argusExpression: 'encouraging',
            heading: 'Be Responsible Out Loud',
            body: '"This isn\'t just about what I want. It\'s about what\'s right for everyone here. The students who are loudest aren\'t the only ones who count. The ones who are quiet count too. And that\'s why this is the right choice for all of us."',
            note: "It starts by stepping outside yourself: 'not just about what I want.' Then it expands the circle. End on: 'the right choice for ALL of us.'",
            cta: "I\'m ready →",
          },
          {
            id: 'b8-5-2', type: 'deliver', argusExpression: 'confident',
            body: '"This isn\'t just about what I want. It\'s about what\'s right for everyone here. The students who are loudest aren\'t the only ones who count. The ones who are quiet count too. And that\'s why this is the right choice for all of us."',
            caption: "Now say it out loud. Argue for everyone. Including the people who aren't in the room.",
            timerSecs: 15,
          },
          {
            id: 'b8-5-3', type: 'completion',
            saidText: 'Verdict: Be Responsible. Mastered. The Parlour notes your progress.',
            skippedText: 'Almost. Come back and say it next time. Words need a voice.',
          },
        ],
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Legacy 2-step drills (Silver + Gold cards)
// ─────────────────────────────────────────────────────────────────────────────
export const DRILLS_LEGACY = {
  'm1': {
    steps: [
      { argus: '"Erm, I guess… cats might possibly be… okay at being secret agents? Maybe?"', question: "What's wrong with this bluff?", options: ['Zero confidence. A bluff must sound rock-solid', 'The argument about cats is wrong', 'The sentence is too short'], correct: 0, feedbackOk: "The Charming Bluff lives and dies by confidence. If YOU don't believe it, nobody will!", feedbackOops: "The answer is A. THE CHARMING BLUFF needs unshakeable certainty. 'maybe' is a bluff-killer." },
      { argus: 'Now deliver THE CHARMING BLUFF with total confidence:', question: '"Cats are ___ the greatest undercover agents in history. This is not up for debate."', options: ['objectively', 'possibly', 'probably'], correct: 0, feedbackOk: "⭐ Delivered with zero doubt. That's THE CHARMING BLUFF!", feedbackOops: "A. 'objectively' sounds like established fact. 'Possibly' and 'probably' are confidence-killers." },
    ],
  },
  'm3': {
    steps: [
      { argus: '"According to a 2019 longitudinal study of 4,200 participants across 12 countries, data suggests that…"', question: "What does THE HONEST TALE use instead?", options: ['A simple story anyone can feel and remember', 'Even more specific data', 'Agreement with the study'], correct: 0, feedbackOk: "Lincoln didn't quote statistics. He told a story a farmer or a child could understand and remember forever.", feedbackOops: "The answer is A. THE HONEST TALE replaces data with a story. Something people feel, not just understand." },
      { argus: 'Start an Honest Tale! Complete the opening:', question: '"Let me tell you a quick story. Once, two friends tried to settle an argument with facts alone. And everyone ___. But when one told a simple story, everyone listened."', options: ['switched off', 'immediately agreed', 'asked for more facts'], correct: 0, feedbackOk: "⭐ A tale that sticks better than any statistic. That's THE HONEST TALE!", feedbackOops: "A is right. 'switched off' shows why the story works better. Facts alone put people to sleep." },
    ],
  },
  'm2': {
    steps: [
      { argus: '"We\'ve always had the same school lunch menu. Change is complicated and risky."', question: "How does PAINT THE FUTURE respond to 'it's always been this way'?", options: ['Make them feel and see a vivid, better future. Forget the present argument', 'Explain clearly why change is actually easy', 'List all the problems with the current menu'], correct: 0, feedbackOk: "Yes! Don't argue about now. Paint a picture of tomorrow so vivid they stop caring about today.", feedbackOops: "The answer is A. PAINT THE FUTURE doesn't fight the past. It makes the future feel so real and good that people want to go there." },
      { argus: 'Paint the future! Complete the vision:', question: '"Imagine walking into school tomorrow and finding ___. That\'s what we can build. Together."', options: ['a lunch you actually love', 'exactly the same thing', 'a slightly better option'], correct: 0, feedbackOk: "⭐ You just painted a future worth fighting for. That's PAINT THE FUTURE!", feedbackOops: "A is the answer. 'a lunch you actually love' creates desire. 'Slightly better' is forgettable. Go big!" },
    ],
  },
  'm4': {
    steps: [
      { argus: '"You want longer breaks. I want more art class. We\'ll never agree. We\'re total opposites!"', question: "What does THE BRIDGE BUILDER look for first?", options: ['What both sides already have in common', 'Who makes the stronger individual argument', 'A compromise that neither side really likes'], correct: 0, feedbackOk: "Yes! Mandela always found the ground both sides stood on. Then he built from there.", feedbackOops: "The answer is A. THE BRIDGE BUILDER doesn't pick a winner. It finds what everyone already shares." },
      { argus: 'Find the shared ground! Complete the bridge:', question: '"We both want school to feel like something we ___. So let\'s build a plan that gives us both that."', options: ['actually enjoy', 'have to get through', 'are okay with'], correct: 0, feedbackOk: "⭐ A bridge both sides can walk across. That's THE BRIDGE BUILDER!", feedbackOops: "A is right. 'actually enjoy' is the shared dream. 'Have to get through' is a shared complaint, not a shared goal." },
    ],
  },
};
