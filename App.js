// The Debater's Gambit — v4.0
// All screens, logic, and data live here intentionally. Refactor later.

import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, TouchableOpacity, ScrollView, Animated,
  TextInput, KeyboardAvoidingView, StyleSheet,
  Platform, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');
const CARD_W = Math.min(width * 0.88, 360);
const DEBATE_SECS = 5 * 60;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD DATA — add cards by copying an existing entry
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MOVE_CARDS = [
  // ── BRONZE tier — easiest, character-inspired ──────────────────────────
  {
    id: 'm-b1', name: 'THE FAIR PLAY', icon: '🚩⚖️',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A0000', accent: '#F87171',
    description:
      'Appeal to fairness and the rules. State clearly what the right thing to do is — loudly and with total certainty. Make your opponent feel like they are breaking a rule that everyone already knows.',
    inspiration: 'Hermione Granger',
  },
  {
    id: 'm-b2', name: 'THE KIND HEART', icon: '🧥💗',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A0A12', accent: '#F9A8D4',
    description:
      'Speak slowly, warmly, and with total sincerity. Acknowledge your opponent\'s feelings first — then gently explain why your side is the kinder, more caring choice for everyone.',
    inspiration: 'Mister Rogers',
  },
  {
    id: 'm-b3', name: 'THE GOLDEN RULE', icon: '🪙🤝',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#0A1A15', accent: '#6EE7B7',
    description:
      'Find the deeper "why" behind the whole debate. Then show that following your argument is the brave, necessary thing to do — not just for yourself, but for everyone who comes after.',
    inspiration: 'Moana',
  },
  {
    id: 'm-b4', name: 'THE PINKY PROMISE', icon: '🤞✨',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A1200', accent: '#FCD34D',
    description:
      'Make a heartfelt, unbreakable promise that your position will lead to the best possible outcome. Speak with such earnest, total conviction that no one can doubt your sincerity.',
    inspiration: 'Pinocchio (reformed)',
  },
  {
    id: 'm-b5', name: 'THE TEAM', icon: '🐾⭐',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#000D1A', accent: '#93C5FD',
    description:
      'Forget "me vs. you." Show how your position helps everybody — the whole family, the whole class, the whole world. The best argument isn\'t the one that wins; it\'s the one that takes care of the team.',
    inspiration: 'Paw Patrol',
  },
  {
    id: 'm-b6', name: 'THE BEST FRIEND', icon: '🤠👢',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A0A00', accent: '#FDBA74',
    description:
      'Stick to your principles, no matter what. Calmly and loyally defend your position with the quiet confidence of someone who knows exactly who they are — no matter how much pressure is applied.',
    inspiration: 'Woody',
  },
  {
    id: 'm-b7', name: "THE LION'S COURAGE", icon: '🦁🌄',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#1A1200', accent: '#FDE68A',
    description:
      'Own your argument with royal confidence. If there are weaknesses in your position, admit them clearly — then show why you\'ve thought them through, and why your answer is still the right one.',
    inspiration: 'Simba',
  },
  {
    id: 'm-b8', name: 'BE RESPONSIBLE', icon: '⭐🛡️',
    tier: 'BRONZE', tierLabel: 'NOVICE',
    bg: '#0F001A', accent: '#C4B5FD',
    description:
      'Argue not just for what you want, but for what\'s good and fair for everyone around you. Show that choosing your side is the responsible, grown-up, caring thing to do.',
    inspiration: 'Steven Universe',
  },
  // ── SILVER tier ────────────────────────────────────────────────────────
  {
    id: 'm1', name: 'THE CHARMING BLUFF', icon: '🗡️🎭',
    tier: 'SILVER', tierLabel: 'TACTICIAN',
    bg: '#1C2333', accent: '#A0AEC0',
    description:
      'Say something completely ridiculous or wildly exaggerated — but deliver it with 100% unbreakable confidence. Make your opponent doubt their own sanity.',
    inspiration: 'Locke Lamora',
  },
  {
    id: 'm3', name: 'THE HONEST TALE', icon: '🎩🪵',
    tier: 'SILVER', tierLabel: 'STORYTELLER',
    bg: '#1A1200', accent: '#C8A96E',
    description:
      'Instead of debating aggressively, tell a short, relatable, folksy story or fable. Frame your argument so it sounds like common sense and humble wisdom.',
    inspiration: 'Abraham Lincoln',
  },
  // ── GOLD tier ──────────────────────────────────────────────────────────
  {
    id: 'm2', name: 'PAINT THE FUTURE', icon: '🌅🎨',
    tier: 'GOLD', tierLabel: 'ORATOR',
    bg: '#2D1B00', accent: '#ECC94B',
    description:
      "Abandon the present argument entirely. Paint a vivid, irresistible picture of a better world. Make them feel the future so powerfully they forget what they were arguing about.",
    inspiration: 'Barack Obama',
  },
  {
    id: 'm4', name: 'THE BRIDGE BUILDER', icon: '🤝🧱',
    tier: 'GOLD', tierLabel: 'MASTER',
    bg: '#001A10', accent: '#68D391',
    description:
      "Do not attack. Instead, find a surprising common ground between you and your opponent. Then show why your solution is the best way to achieve what *both* of you want.",
    inspiration: 'Nelson Mandela',
  },
  // ── Add more Move Cards below ──────────────────────────────────────────
  // { id: 'm5', name: 'CARD NAME', icon: '🔥', tier: 'BRONZE', tierLabel: 'NOVICE',
  //   bg: '#1A0000', accent: '#FC8181', description: '...', inspiration: 'Name' },
];

// Cases sorted EASY → MEDIUM → HARD
const CASE_CARDS = [
  // ── Kid-friendly EASY cases ────────────────────────────────────────────
  {
    id: 'c-k01', icon: '🦸📚', difficulty: 'EASY',
    title: 'SUPERHEROES WOULD MAKE TERRIBLE TEACHERS',
    description: "One side argues that flying, laser eyes, and saving the world make it impossible to run an orderly classroom. The other argues superpowers would make the best teachers imaginable.",
  },
  {
    id: 'c-k02', icon: '🎮📝', difficulty: 'EASY',
    title: 'VIDEO GAMES SHOULD COUNT AS HOMEWORK',
    description: "One player argues that gaming builds real skills — strategy, reflexes, and teamwork — that belong in any school curriculum. The other defends the value of traditional homework.",
  },
  {
    id: 'c-k03', icon: '🍦🧠', difficulty: 'EASY',
    title: 'ICE CREAM FOR BREAKFAST WOULD MAKE KIDS SMARTER',
    description: "One side argues happiness, sugar, and cold dairy first thing in the morning is the secret to a sharper brain. The other defends why breakfast rules exist.",
  },
  {
    id: 'c-k04', icon: '🐶💛', difficulty: 'EASY',
    title: "DOGS ARE TOO GOOD FOR US AND HUMANS DON'T DESERVE THEM",
    description: "One player argues dogs are so loyal, so loving, and so patient that humanity has simply not earned them. The other defends humanity's worthiness of its best friend.",
  },
  {
    id: 'c-k05', icon: '📚🌐', difficulty: 'EASY',
    title: 'LIBRARIES ARE MORE POWERFUL THAN THE INTERNET',
    description: "One side argues that silence, physical books, and a librarian's wisdom outperform any search engine. The other defends the limitless reach of the internet.",
  },
  {
    id: 'c-k06', icon: '🦕🧐', difficulty: 'EASY',
    title: 'DINOSAURS WERE SECRETLY MUCH SMARTER THAN WE THINK',
    description: "One player builds the case for underestimated dinosaur intelligence. The other defends the scientific evidence as it stands.",
  },
  {
    id: 'c-k07', icon: '🧦🛏️', difficulty: 'EASY',
    title: 'WEARING SOCKS TO BED IS THE CORRECT WAY TO SLEEP',
    description: "One side defends cosy, warm feet as the pinnacle of civilised bedtime behaviour. The other argues bare feet are the only acceptable option.",
  },
  {
    id: 'c-k08', icon: '🌮📐', difficulty: 'EASY',
    title: 'TACOS ARE MATHEMATICALLY THE PERFECT FOOD',
    description: "One player builds a scientific and philosophical case for the taco as the peak of culinary engineering. The other challenges this audacious claim.",
  },
  {
    id: 'c-k09', icon: '🚀👶', difficulty: 'EASY',
    title: 'CHILDREN SHOULD BE FIRST IN LINE TO GO TO SPACE',
    description: "One side argues kids are braver, more adaptable, and more curious — the perfect astronauts. The other defends why adults must lead the way.",
  },
  {
    id: 'c-k10', icon: '🤖🏫', difficulty: 'EASY',
    title: 'IF ROBOTS LIVE AMONG US THEY SHOULD HAVE TO GO TO SCHOOL',
    description: "One player argues that robots need to learn the rules of society just like everyone else. The other challenges whether robots need school at all.",
  },
  {
    id: 'c-k11', icon: '🦄🦴', difficulty: 'EASY',
    title: 'UNICORNS WERE REAL ANIMALS THAT SIMPLY WENT EXTINCT',
    description: "One side builds a compelling historical and scientific case for unicorns as real creatures. The other defends what we actually know about the fossil record.",
  },
  // ── Classic EASY cases ─────────────────────────────────────────────────
  {
    id: 'c1', icon: '🌙', difficulty: 'EASY',
    title: 'KIDS SHOULD DECIDE THEIR OWN BEDTIME',
    description: "One side defends the child's right to self-govern their sleep. The other upholds parental bedtime law. May the sharpest tongue win.",
  },
  {
    id: 'c2', icon: '🍕', difficulty: 'EASY',
    title: 'PIZZA IS A PERFECTLY VALID BREAKFAST FOOD',
    description: "One player stands for the glory of morning pizza. The other defends the sacred tradition of breakfast. Convince — or be convinced.",
  },
  {
    id: 'c3', icon: '🐱🕵️', difficulty: 'EASY',
    title: 'CATS WOULD MAKE FAR BETTER UNDERCOVER SECRET AGENTS THAN DOGS',
    description: "One side argues that cats are the perfect covert operatives. The other defends dogs as the ultimate agents of justice.",
  },
  {
    id: 'c4', icon: '🌭⚖️', difficulty: 'EASY', focus: 'Definitions & Semantics',
    title: 'HOT DOGS TECHNICALLY AND LEGALLY COUNT AS SANDWICHES',
    description: "A battle of definitions and semantics. One player argues the hot dog is a sandwich. The other defends culinary tradition.",
  },
  // ── MEDIUM cases ───────────────────────────────────────────────────────
  {
    id: 'c5', icon: '👽🌍', difficulty: 'MEDIUM', focus: 'Conspiracy vs. Logic',
    title: 'ALIENS DEFINITELY EXIST AND ARE CURRENTLY HIDING ON EARTH',
    description: "One player argues for the existence and presence of extraterrestrial life on Earth. The other defends logic and the burden of evidence.",
  },
  // ── HARD cases ─────────────────────────────────────────────────────────
  {
    id: 'c6', icon: '🪄⚙️', difficulty: 'HARD', focus: 'Chaos vs. Order',
    title: 'A WORLD GOVERNED BY MAGIC WOULD BE WORSE THAN ONE GOVERNED BY TECHNOLOGY',
    description: "One player defends the order and progress of technology. The other argues for the limitless possibilities of magic.",
  },
  // ── Add more Case Cards below ──────────────────────────────────────────
  // { id: 'c7', icon: '⚡', difficulty: 'MEDIUM', title: 'CASE TITLE', description: '...' },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DIFF_ORDER = { EASY: 0, MEDIUM: 1, HARD: 2 };
const sortedCases = [...CASE_CARDS].sort(
  (a, b) => (DIFF_ORDER[a.difficulty] ?? 1) - (DIFF_ORDER[b.difficulty] ?? 1)
);

const formatTime = s =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

const timerColor = s => (s > 120 ? '#68D391' : s > 60 ? '#ECC94B' : '#FC8181');
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PRIMITIVES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const Btn = ({ label, onPress, variant = 'primary', style, disabled }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.78}
    disabled={disabled}
    style={[
      variant === 'primary' ? S.btnPrimary : S.btnSecondary,
      disabled && { opacity: 0.4 },
      style,
    ]}
  >
    <Text style={variant === 'primary' ? S.btnPrimaryTxt : S.btnSecondaryTxt}>{label}</Text>
  </TouchableOpacity>
);

const ToggleRow = ({ label, value, onToggle, pts }) => (
  <TouchableOpacity
    style={[S.toggleRow, value && S.toggleRowOn]}
    onPress={onToggle}
    activeOpacity={0.8}
  >
    <View style={[S.checkBox, value && S.checkBoxOn]}>
      {value ? <Text style={S.checkMark}>✓</Text> : null}
    </View>
    <Text style={[S.toggleLabel, value && { color: C.text }]}>{label}</Text>
    <Text style={[S.togglePts, value && { color: C.gold }]}>+{pts} pt</Text>
  </TouchableOpacity>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MoveCardView = ({ card, compact }) => (
  <View style={[S.card, { backgroundColor: card.bg }, compact && S.cardCompact]}>
    <View style={[S.badge, { borderColor: card.accent }]}>
      <Text style={[S.badgeTxt, { color: card.accent }]}>
        MOVE CARD  ·  {card.tier}  ·  {card.tierLabel}
      </Text>
    </View>
    <Text style={compact ? S.cardArtSm : S.cardArt}>{card.icon}</Text>
    <Text style={[S.cardTitle, compact && { fontSize: 16, marginBottom: 6 }]}>{card.name}</Text>
    {!compact ? (
      <>
        <View style={[S.divider, { backgroundColor: card.accent }]} />
        <Text style={S.cardDesc}>{card.description}</Text>
      </>
    ) : null}
    <Text style={[S.cardInspo, { color: card.accent }]}>✦  {card.inspiration}</Text>
  </View>
);

const CaseCardView = ({ card }) => (
  <View style={S.caseCard}>
    <View style={S.badge}>
      <Text style={S.badgeTxt}>CASE CARD  ·  {card.difficulty}</Text>
    </View>
    {card.focus ? <Text style={S.caseFocus}>{card.focus}</Text> : null}
    <Text style={S.caseArt}>{card.icon}</Text>
    <Text style={S.caseTitle}>{card.title}</Text>
    <View style={[S.divider, { backgroundColor: '#7B2FBE' }]} />
    <Text style={S.caseDesc}>{card.description}</Text>
  </View>
);

const CaseBanner = ({ card }) => (
  <View style={S.caseBanner}>
    <Text style={S.caseBannerLabel}>THE CASE</Text>
    <Text style={S.caseBannerTitle}>{card.title}</Text>
    <Text style={S.caseBannerDesc}>{card.description}</Text>
  </View>
);

// Compact row used in the inline move picker during debate
const MovePickRow = ({ card, selected, onPress }) => (
  <TouchableOpacity
    style={[S.movePickRow, selected && { borderColor: card.accent, backgroundColor: card.bg }]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={S.movePickIcon}>{card.icon}</Text>
    <View style={{ flex: 1 }}>
      <Text style={[S.movePickName, selected && { color: card.accent }]}>{card.name}</Text>
      <Text style={S.movePickTier}>{card.tier}  ·  {card.inspiration}</Text>
    </View>
    {selected ? <Text style={[S.movePickCheck, { color: card.accent }]}>✓</Text> : null}
  </TouchableOpacity>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TINDER-STYLE CARD BROWSER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CardBrowser = ({ cards, renderCard, onChoose, showRandom, title, subtitle }) => {
  const [idx, setIdx] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const touchStartX = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => () => { isMounted.current = false; }, []);

  const slide = (dir, afterCb) => {
    Animated.timing(translateX, {
      toValue: dir * -width, duration: 200, useNativeDriver: true,
    }).start(() => {
      translateX.setValue(dir * width);
      afterCb();
      Animated.timing(translateX, {
        toValue: 0, duration: 200, useNativeDriver: true,
      }).start();
    });
  };

  const goNext = () => {
    if (!isSpinning && idx < cards.length - 1) slide(1, () => setIdx(i => i + 1));
  };
  const goPrev = () => {
    if (!isSpinning && idx > 0) slide(-1, () => setIdx(i => i - 1));
  };

  const onTouchStart = e => { touchStartX.current = e.nativeEvent.pageX; };
  const onTouchEnd = e => {
    if (touchStartX.current === null || isSpinning) return;
    const dx = e.nativeEvent.pageX - touchStartX.current;
    touchStartX.current = null;
    if (dx < -40) goNext();
    else if (dx > 40) goPrev();
  };

  const handleRandom = () => {
    if (isSpinning) return;
    const targetIdx = Math.floor(Math.random() * cards.length);
    const stepsToTarget = (targetIdx - idx + cards.length) % cards.length;
    const totalSteps = 2 * cards.length + (stepsToTarget || cards.length);
    let step = 0;
    let cur = idx;
    setIsSpinning(true);

    const spin = () => {
      if (!isMounted.current) return;
      cur = (cur + 1) % cards.length;
      setIdx(cur);
      step++;
      if (step < totalSteps) {
        const progress = step / totalSteps;
        const delay = progress < 0.5 ? 55 : progress < 0.75 ? 95 : progress < 0.9 ? 160 : 280;
        setTimeout(spin, delay);
      } else {
        setIsSpinning(false);
      }
    };
    setTimeout(spin, 0);
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={S.browserHeader}>
        {title ? <Text style={S.screenTitle}>{title}</Text> : null}
        {subtitle ? <Text style={S.hint}>{subtitle}</Text> : null}
        <View style={S.dots}>
          {cards.map((_, i) => (
            <View key={i} style={[S.dot, i === idx && S.dotActive]} />
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={S.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{ transform: [{ translateX }], width: CARD_W }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {renderCard(cards[idx])}
        </Animated.View>

        <View style={S.navRow}>
          <TouchableOpacity
            onPress={goPrev}
            disabled={idx === 0 || isSpinning}
            style={[S.navArrow, (idx === 0 || isSpinning) && { opacity: 0.25 }]}
          >
            <Text style={S.navArrowTxt}>‹  PREV</Text>
          </TouchableOpacity>
          <Text style={S.navCounter}>{idx + 1} / {cards.length}</Text>
          <TouchableOpacity
            onPress={goNext}
            disabled={idx === cards.length - 1 || isSpinning}
            style={[S.navArrow, (idx === cards.length - 1 || isSpinning) && { opacity: 0.25 }]}
          >
            <Text style={S.navArrowTxt}>NEXT  ›</Text>
          </TouchableOpacity>
        </View>

        <Btn
          label="✓  CHOOSE THIS"
          onPress={() => onChoose(cards[idx])}
          disabled={isSpinning}
        />
        {showRandom ? (
          <Btn
            label={isSpinning ? '🎲  SHUFFLING...' : '🎲  RANDOM'}
            variant="secondary"
            onPress={handleRandom}
            disabled={isSpinning}
            style={{ marginBottom: 40 }}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCREENS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Home ──────────────────────────────────────────────────────────────────
const HomeScreen = () => (
  <View style={S.screen}>
    <Text style={S.heroTitle}>THE{'\n'}DEBATER'S{'\n'}GAMBIT</Text>
    <Text style={S.heroTagline}>Words are your weapons.{'\n'}Wit is your armor.</Text>
    <Text style={[S.hint, { marginTop: 32 }]}>Tap ⚔️ below to start a new case</Text>
  </View>
);

// ── Help ──────────────────────────────────────────────────────────────────
const HelpScreen = () => (
  <ScrollView
    contentContainerStyle={[S.scrollContent, { paddingTop: 70, paddingBottom: 60 }]}
    style={{ backgroundColor: C.bg }}
  >
    <Text style={S.screenTitle}>THE TALE OF{'\n'}TWO BROTHERS</Text>

    <View style={S.helpDivider} />

    <Text style={S.helpBody}>
      Long before kings had crowns and explorers had maps, two brothers lived in a
      small village at the edge of the known world.
    </Text>
    <Text style={S.helpBody}>
      Ander and Sol were clever enough — but when arguments came, their words came
      out tangled. In debates they stumbled, and when they needed to persuade, they
      went red in the face and stomped their feet like children.
    </Text>
    <Text style={S.helpBody}>
      One winter, a travelling merchant left them a battered card game called{' '}
      <Text style={{ color: C.gold, fontStyle: 'italic' }}>The Debater's Gambit</Text>.
      "Play this," he said with a knowing smile, "and your words will become your
      sharpest weapon."
    </Text>
    <Text style={S.helpBody}>
      They played every night by firelight. Ander learned to tell stories that made
      hard truths sound like common wisdom. Sol learned to paint futures so bright
      that listeners forgot what they had been arguing about. They practiced the
      moves of the greatest minds — the humble tale, the charming bluff, the bridge
      that turns enemies into allies.
    </Text>
    <Text style={S.helpBody}>
      Years passed. The brothers became the sharpest tongues in the land.
    </Text>
    <Text style={S.helpBody}>
      When the old king died, it was Ander — calm, precise, unshakeable — who rose
      to the throne. Not by sword, but by word.
    </Text>
    <Text style={S.helpBody}>
      And Sol? Sol packed a small bag, took his sharpest moves, and disappeared
      over the horizon — returning with stories so extraordinary that the whole
      kingdom went quiet to hear them. A life of adventure written entirely in
      arguments won.
    </Text>

    <View style={S.helpDivider} />

    <Text style={[S.screenTitle, { marginTop: 8 }]}>HOW TO PLAY</Text>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>1</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Choose a Case</Text> — the debate topic both players will argue.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>2</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Debate</Text> — each player gets 5 minutes with the timer running.
        During your turn, pick a Move Card from the list on screen if you want — it earns you a bonus point if you use it.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>3</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>After each round</Text> — choose to play another round or end the game and score.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>4</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Score</Text> —{' '}
        <Text style={{ color: '#FC8181' }}>1 point</Text> for winning the argument.{' '}
        <Text style={{ color: '#68D391' }}>+1 bonus point</Text> if you actually used your move card.
      </Text>
    </View>
  </ScrollView>
);

// ── Account: player management + settings + history ───────────────────────
const AccountScreen = ({ players, onAdd, onRemove, defaultRounds, onRoundsChange, history, isOnboarding }) => {
  const [name, setName] = useState('');

  const submit = () => {
    const t = name.trim();
    if (t) { onAdd(t); setName(''); }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[S.scrollContent, { paddingTop: 70, paddingBottom: 60 }]}
        style={{ backgroundColor: C.bg }}
        keyboardShouldPersistTaps="handled"
      >
        {isOnboarding ? (
          <View style={S.onboardingBanner}>
            <Text style={S.onboardingTitle}>👋 WELCOME!</Text>
            <Text style={S.onboardingText}>
              Add 2 players to get started. The game will launch automatically.
            </Text>
          </View>
        ) : null}

        <Text style={S.screenTitle}>PLAYERS</Text>

        {players.map(p => (
          <View key={p.id} style={S.playerRow}>
            <Text style={S.playerRowName}>{p.name}</Text>
            <TouchableOpacity
              onPress={() => onRemove(p.id)}
              style={S.removeBtn}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            >
              <Text style={S.removeTxt}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={S.addRow}>
          <TextInput
            style={S.playerInput}
            value={name}
            onChangeText={setName}
            placeholder="Add a player…"
            placeholderTextColor={C.muted}
            returnKeyType="done"
            onSubmitEditing={submit}
            autoCapitalize="words"
          />
          <TouchableOpacity style={S.addBtn} onPress={submit}>
            <Text style={S.addBtnTxt}>＋</Text>
          </TouchableOpacity>
        </View>

        <View style={S.sectionDivider} />
        <Text style={S.screenTitle}>SETTINGS</Text>

        <View style={S.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={S.settingLabel}>DEFAULT ROUNDS</Text>
            <Text style={S.settingSubLabel}>Rounds per game</Text>
          </View>
          <View style={S.stepper}>
            <TouchableOpacity
              style={S.stepBtn}
              onPress={() => onRoundsChange(Math.max(1, defaultRounds - 1))}
            >
              <Text style={S.stepBtnTxt}>−</Text>
            </TouchableOpacity>
            <Text style={S.stepValue}>{defaultRounds}</Text>
            <TouchableOpacity
              style={S.stepBtn}
              onPress={() => onRoundsChange(Math.min(10, defaultRounds + 1))}
            >
              <Text style={S.stepBtnTxt}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {history.length > 0 ? (
          <>
            <View style={S.sectionDivider} />
            <Text style={[S.screenTitle, { marginTop: 8 }]}>HISTORY</Text>
            {history.map(h => (
              <View key={h.id} style={S.historyItem}>
                <Text style={S.historyCase}>{h.case}</Text>
                <View style={S.historyScores}>
                  {h.players.map(p => (
                    <Text key={p.name} style={S.historyScore}>
                      {p.name}  {p.points} pt{p.points !== 1 ? 's' : ''}
                    </Text>
                  ))}
                </View>
                <Text style={S.historyDate}>{h.date}</Text>
              </View>
            ))}
          </>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ── Player picker ─────────────────────────────────────────────────────────
const PlayerPickScreen = ({ players, onConfirm }) => {
  const [sel, setSel] = useState([]);

  if (players.length < 2) {
    return (
      <View style={S.screen}>
        <Text style={S.heroTitle}>NEED MORE{'\n'}PLAYERS</Text>
        <Text style={[S.hint, { marginTop: 16 }]}>
          Go to 👤 Account to add at least 2 players.
        </Text>
      </View>
    );
  }

  const numOf = p => { const i = sel.findIndex(s => s.id === p.id); return i >= 0 ? i + 1 : null; };

  const toggle = p => {
    if (sel.some(s => s.id === p.id)) {
      setSel(sel.filter(s => s.id !== p.id));
    } else if (sel.length < 2) {
      setSel([...sel, p]);
    } else {
      setSel([sel[0], p]);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[S.scrollContent, { paddingTop: 70 }]}
      style={{ backgroundColor: C.bg }}
    >
      <Text style={S.screenTitle}>WHO'S PLAYING?</Text>
      <Text style={S.hint}>Choose 2 players</Text>

      {players.map(p => {
        const num = numOf(p);
        const picked = num !== null;
        return (
          <TouchableOpacity
            key={p.id}
            style={[S.pickRow, picked && S.pickRowSel]}
            onPress={() => toggle(p)}
            activeOpacity={0.8}
          >
            <View style={[S.pickBadge, picked && { backgroundColor: C.purple }]}>
              <Text style={S.pickBadgeTxt}>{picked ? `P${num}` : '  '}</Text>
            </View>
            <Text style={[S.pickName, picked && { color: C.text }]}>{p.name}</Text>
            {picked ? <Text style={{ fontSize: 16, marginLeft: 'auto' }}>✓</Text> : null}
          </TouchableOpacity>
        );
      })}

      {sel.length === 2 ? (
        <Btn
          label={`⚔️  ${sel[0].name}  vs  ${sel[1].name}`}
          onPress={() => onConfirm(sel[0], sel[1])}
          style={{ marginTop: 24, marginBottom: 40 }}
        />
      ) : (
        <Text style={[S.hint, { marginTop: 20 }]}>
          Select {2 - sel.length} more player{sel.length === 1 ? '' : 's'}
        </Text>
      )}
    </ScrollView>
  );
};

// ── Privacy pass-phone cover ──────────────────────────────────────────────
const PassScreen = ({ name, onReady }) => (
  <View style={S.screen}>
    <Text style={S.coverEyebrow}>PASS THE PHONE TO</Text>
    <Text style={S.coverHeading}>{name}</Text>
    <Text style={S.coverHint}>Cover the screen — don't peek 👀</Text>
    <TouchableOpacity style={S.coverTap} onPress={onReady} activeOpacity={0.8}>
      <Text style={S.coverTapIcon}>🃏</Text>
      <Text style={S.coverTapLabel}>TAP WHEN READY</Text>
    </TouchableOpacity>
  </View>
);

// ── Debate: live timer + optional inline move picker ──────────────────────
// Player chooses (or skips) a move card during their debate turn.
// onDone(selectedMove | null) transitions to the next phase.
const DebateScreen = ({ caseCard, player, nextPlayerName, onDone }) => {
  const [secondsLeft, setSecondsLeft] = useState(DEBATE_SECS);
  const [selectedMove, setSelectedMove] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (showModal) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setShowModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [showModal]);

  const tColor = timerColor(secondsLeft);

  const toggleMove = card =>
    setSelectedMove(prev => (prev?.id === card.id ? null : card));

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {/* Sticky timer + player name */}
      <View style={[S.timerBanner, { borderColor: tColor + '55', backgroundColor: tColor + '14' }]}>
        <Text style={[S.timerTxt, { color: tColor }]}>{formatTime(secondsLeft)}</Text>
        <View style={[S.playerChip, { backgroundColor: C.purple }]}>
          <Text style={S.playerChipTxt}>{player.name.toUpperCase()}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={S.scrollContent} showsVerticalScrollIndicator={false}>
        <CaseBanner card={caseCard} />

        <View style={S.scoringHint}>
          <Text style={S.scoringHintTxt}>
            ⚔️  1 pt for winning  ·  ⭐ +1 pt if you use a move card
          </Text>
        </View>

        {/* Inline move picker */}
        <Text style={[S.screenLabel, { marginTop: 20 }]}>
          PICK A MOVE CARD — OPTIONAL  (+1 BONUS PT)
        </Text>

        {MOVE_CARDS.map(card => (
          <MovePickRow
            key={card.id}
            card={card}
            selected={selectedMove?.id === card.id}
            onPress={() => toggleMove(card)}
          />
        ))}

        {/* Selected move description */}
        {selectedMove ? (
          <View style={[S.movePickDesc, { borderColor: selectedMove.accent + '66', backgroundColor: selectedMove.bg }]}>
            <Text style={[S.movePickDescTitle, { color: selectedMove.accent }]}>
              {selectedMove.name}  ✦  {selectedMove.inspiration}
            </Text>
            <Text style={S.movePickDescText}>{selectedMove.description}</Text>
          </View>
        ) : null}

        <Btn
          label="✓  DONE — I'M FINISHED"
          onPress={() => setShowModal(true)}
          style={{ marginTop: 20, marginBottom: 40 }}
        />
      </ScrollView>

      {showModal ? (
        <View style={S.modalOverlay}>
          <View style={S.modalBox}>
            <Text style={S.modalTitle}>
              {secondsLeft === 0 ? "⏱  TIME'S UP!" : '✓  DONE!'}
            </Text>
            <Text style={S.modalBody}>
              {nextPlayerName
                ? `Great job, ${player.name}!\nPass the phone to ${nextPlayerName}.`
                : `${player.name} has spoken!\nTime to decide what's next.`}
            </Text>
            <Btn
              label={nextPlayerName ? `PASS TO ${nextPlayerName.toUpperCase()}  →` : 'CONTINUE  →'}
              onPress={() => onDone(selectedMove)}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

// ── Round end: next round or score the game ───────────────────────────────
const RoundEndScreen = ({ currentRound, defaultRounds, player1, player2, onNextRound, onEndGame }) => (
  <View style={S.screen}>
    <Text style={[S.screenLabel, { marginBottom: 8 }]}>ROUND {currentRound} COMPLETE</Text>
    <Text style={S.heroTitle}>WELL{'\n'}FOUGHT!</Text>
    <Text style={[S.hint, { marginTop: 16 }]}>
      {player1.name} and {player2.name} have both spoken.{'\n'}What's next?
    </Text>
    <Btn
      label={`⚔️  PLAY ROUND ${currentRound + 1}`}
      onPress={onNextRound}
      style={{ marginTop: 40 }}
    />
    <Btn
      label="🏆  END GAME & SCORE"
      variant="secondary"
      onPress={onEndGame}
    />
    {defaultRounds > 1 ? (
      <Text style={[S.hint, { marginTop: 16 }]}>Default: {defaultRounds} rounds per game</Text>
    ) : null}
  </View>
);

// ── Points: multi-round scoring + grand totals ────────────────────────────
const PointsScreen = ({ player1, player2, roundHistory, caseCard, onSave }) => {
  const [scores, setScores] = useState(
    roundHistory.map(() => ({ p1Won: false, p1UsedMove: false, p2Won: false, p2UsedMove: false }))
  );

  const toggle = (roundIdx, field) =>
    setScores(prev => prev.map((r, i) => i === roundIdx ? { ...r, [field]: !r[field] } : r));

  const p1Total = scores.reduce((s, r) => s + (r.p1Won ? 1 : 0) + (r.p1UsedMove ? 1 : 0), 0);
  const p2Total = scores.reduce((s, r) => s + (r.p2Won ? 1 : 0) + (r.p2UsedMove ? 1 : 0), 0);
  const winner = p1Total > p2Total ? player1.name : p2Total > p1Total ? player2.name : null;

  return (
    <ScrollView
      contentContainerStyle={[S.scrollContent, { paddingTop: 60 }]}
      style={{ backgroundColor: C.bg }}
    >
      <Text style={S.screenTitle}>FINAL RESULTS</Text>
      <Text style={[S.hint, { marginBottom: 24 }]} numberOfLines={2}>{caseCard.title}</Text>

      {roundHistory.map((round, idx) => (
        <View key={idx} style={[S.pointsSection, { marginBottom: 12 }]}>
          <Text style={[S.screenLabel, { marginBottom: 12 }]}>
            {roundHistory.length > 1 ? `ROUND ${round.roundNum}` : 'THE ROUND'}
          </Text>

          {/* Move card reveal */}
          {(round.p1Move || round.p2Move) ? (
            <View style={S.moveRevealRow}>
              {round.p1Move ? (
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={S.moveRevealName}>{player1.name}</Text>
                  <MoveCardView card={round.p1Move} compact />
                </View>
              ) : null}
              {round.p1Move && round.p2Move ? (
                <Text style={S.vsLabel}>VS</Text>
              ) : null}
              {round.p2Move ? (
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={S.moveRevealName}>{player2.name}</Text>
                  <MoveCardView card={round.p2Move} compact />
                </View>
              ) : null}
            </View>
          ) : null}

          {/* P1 scoring */}
          <Text style={[S.pointsPlayerName, { marginTop: 12 }]}>{player1.name}</Text>
          <ToggleRow
            label="Won the argument"
            value={scores[idx].p1Won}
            onToggle={() => toggle(idx, 'p1Won')}
            pts={1}
          />
          {round.p1Move ? (
            <ToggleRow
              label={`Used move: ${round.p1Move.name}`}
              value={scores[idx].p1UsedMove}
              onToggle={() => toggle(idx, 'p1UsedMove')}
              pts={1}
            />
          ) : null}

          {/* P2 scoring */}
          <Text style={[S.pointsPlayerName, { marginTop: 12 }]}>{player2.name}</Text>
          <ToggleRow
            label="Won the argument"
            value={scores[idx].p2Won}
            onToggle={() => toggle(idx, 'p2Won')}
            pts={1}
          />
          {round.p2Move ? (
            <ToggleRow
              label={`Used move: ${round.p2Move.name}`}
              value={scores[idx].p2UsedMove}
              onToggle={() => toggle(idx, 'p2UsedMove')}
              pts={1}
            />
          ) : null}
        </View>
      ))}

      {/* Grand total */}
      <View style={[S.pointsSection, { backgroundColor: '#1A1500', borderColor: '#E9C46A44', marginBottom: 8 }]}>
        <Text style={[S.screenLabel, { marginBottom: 12 }]}>GRAND TOTAL</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={S.moveRevealName}>{player1.name}</Text>
            <Text style={S.grandTotalPts}>{p1Total}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={S.moveRevealName}>{player2.name}</Text>
            <Text style={S.grandTotalPts}>{p2Total}</Text>
          </View>
        </View>
        {winner ? (
          <Text style={[S.screenTitle, { marginTop: 16, color: C.text }]}>🏆  {winner} WINS!</Text>
        ) : (p1Total > 0 || p2Total > 0) ? (
          <Text style={[S.screenTitle, { marginTop: 16, color: C.muted }]}>IT'S A TIE!</Text>
        ) : null}
      </View>

      <Btn
        label="SAVE RESULTS"
        onPress={() => onSave(p1Total, p2Total)}
        style={{ marginTop: 8, marginBottom: 48 }}
      />
    </ScrollView>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BOTTOM NAV  (4 tabs)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const NAV_TABS = [
  { id: 'home',    icon: '🏠', label: 'Home' },
  { id: 'game',    icon: '⚔️', label: 'New Case' },
  { id: 'account', icon: '👤', label: 'Account' },
  { id: 'help',    icon: '❓', label: 'Help' },
];

const BottomNav = ({ activeTab, onTabPress }) => (
  <View style={S.bottomNav}>
    {NAV_TABS.map(t => (
      <TouchableOpacity
        key={t.id}
        style={S.navTab}
        onPress={() => onTabPress(t.id)}
        activeOpacity={0.7}
      >
        <Text style={[S.navTabIcon, activeTab === t.id && S.navTabIconActive]}>{t.icon}</Text>
        <Text style={[S.navTabLabel, activeTab === t.id && S.navTabLabelActive]}>{t.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APP — STATE MACHINE
// Phases: pick_players → pick_case → debate_p1 → pass_to_p2
//         → debate_p2 → round_end → debate_p1 (next round) | points
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function App() {
  // Startup / persistence
  const [isReady, setIsReady] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState('home');

  // Persisted
  const [players, setPlayers] = useState([]);
  const [defaultRounds, setDefaultRounds] = useState(1);

  // Per-game
  const [gamePhase, setGamePhase] = useState('pick_players');
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentP1Move, setCurrentP1Move] = useState(null);
  const [currentP2Move, setCurrentP2Move] = useState(null);
  const [roundHistory, setRoundHistory] = useState([]);

  // In-memory across games
  const [history, setHistory] = useState([]);

  // ── AsyncStorage load on mount ─────────────────────────────────────────
  useEffect(() => {
    AsyncStorage.multiGet(['players', 'settings']).then(results => {
      const playersRaw = results[0][1];
      const settingsRaw = results[1][1];

      if (playersRaw) {
        const saved = JSON.parse(playersRaw);
        setPlayers(saved);
        if (saved.length < 2) { setIsOnboarding(true); setActiveTab('account'); }
      } else {
        setIsOnboarding(true);
        setActiveTab('account');
      }

      if (settingsRaw) {
        const s = JSON.parse(settingsRaw);
        if (s.defaultRounds) setDefaultRounds(s.defaultRounds);
      }

      setIsReady(true);
    }).catch(() => setIsReady(true));
  }, []);

  // ── Persist players whenever they change ───────────────────────────────
  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem('players', JSON.stringify(players)).catch(() => {});
  }, [players, isReady]);

  // ── Persist settings whenever defaultRounds changes ────────────────────
  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem('settings', JSON.stringify({ defaultRounds })).catch(() => {});
  }, [defaultRounds, isReady]);

  // ── Player management ──────────────────────────────────────────────────
  const handleAddPlayer = name => {
    const newPlayer = { id: uid(), name };
    const updated = [...players, newPlayer];
    setPlayers(updated);
    if (isOnboarding && updated.length >= 2) {
      setIsOnboarding(false);
      setActiveTab('game');
    }
  };

  const handleRemovePlayer = id => {
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  // ── Game management ────────────────────────────────────────────────────
  const resetGame = () => {
    setGamePhase('pick_players');
    setPlayer1(null); setPlayer2(null);
    setSelectedCase(null);
    setCurrentRound(1);
    setCurrentP1Move(null); setCurrentP2Move(null);
    setRoundHistory([]);
  };

  const handleTabPress = tab => {
    if (tab === 'game') resetGame();
    setActiveTab(tab);
  };

  const handleP1Done = move => {
    setCurrentP1Move(move);
    setGamePhase('pass_to_p2');
  };

  const handleP2Done = move => {
    setCurrentP2Move(move);
    setGamePhase('round_end');
  };

  const handleNextRound = () => {
    setRoundHistory(prev => [
      ...prev,
      { roundNum: currentRound, p1Move: currentP1Move, p2Move: currentP2Move },
    ]);
    setCurrentRound(r => r + 1);
    setCurrentP1Move(null);
    setCurrentP2Move(null);
    setGamePhase('debate_p1');
  };

  const handleEndGame = () => {
    setRoundHistory(prev => [
      ...prev,
      { roundNum: currentRound, p1Move: currentP1Move, p2Move: currentP2Move },
    ]);
    setGamePhase('points');
  };

  const handleSavePoints = (p1pts, p2pts) => {
    setHistory(h => [{
      id: uid(),
      case: selectedCase.title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      players: [
        { name: player1.name, points: p1pts },
        { name: player2.name, points: p2pts },
      ],
    }, ...h]);
    setActiveTab('home');
    resetGame();
  };

  // ── Splash while loading ───────────────────────────────────────────────
  if (!isReady) {
    return (
      <SafeAreaView style={S.safe}>
        <ExpoStatusBar style="light" />
        <View style={S.screen}>
          <Text style={S.heroTitle}>THE{'\n'}DEBATER'S{'\n'}GAMBIT</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── Content renderer ───────────────────────────────────────────────────
  const renderContent = () => {
    if (activeTab === 'home') return <HomeScreen />;
    if (activeTab === 'help') return <HelpScreen />;
    if (activeTab === 'account') return (
      <AccountScreen
        players={players}
        onAdd={handleAddPlayer}
        onRemove={handleRemovePlayer}
        defaultRounds={defaultRounds}
        onRoundsChange={setDefaultRounds}
        history={history}
        isOnboarding={isOnboarding}
      />
    );

    // Game tab — phase-based flow
    switch (gamePhase) {
      case 'pick_players':
        return (
          <PlayerPickScreen
            players={players}
            onConfirm={(p1, p2) => {
              setPlayer1(p1); setPlayer2(p2);
              setGamePhase('pick_case');
            }}
          />
        );

      case 'pick_case':
        return (
          <CardBrowser
            cards={sortedCases}
            renderCard={card => <CaseCardView card={card} />}
            onChoose={card => { setSelectedCase(card); setGamePhase('debate_p1'); }}
            showRandom
            title="CHOOSE A CASE"
            subtitle={`${player1?.name}  vs  ${player2?.name}  ·  easiest first`}
          />
        );

      case 'debate_p1':
        return (
          <DebateScreen
            key={`p1-round${currentRound}`}
            caseCard={selectedCase}
            player={player1}
            nextPlayerName={player2?.name}
            currentRound={currentRound}
            onDone={handleP1Done}
          />
        );

      case 'pass_to_p2':
        return <PassScreen name={player2?.name} onReady={() => setGamePhase('debate_p2')} />;

      case 'debate_p2':
        return (
          <DebateScreen
            key={`p2-round${currentRound}`}
            caseCard={selectedCase}
            player={player2}
            nextPlayerName={null}
            currentRound={currentRound}
            onDone={handleP2Done}
          />
        );

      case 'round_end':
        return (
          <RoundEndScreen
            currentRound={currentRound}
            defaultRounds={defaultRounds}
            player1={player1}
            player2={player2}
            onNextRound={handleNextRound}
            onEndGame={handleEndGame}
          />
        );

      case 'points':
        return (
          <PointsScreen
            player1={player1}
            player2={player2}
            roundHistory={roundHistory}
            caseCard={selectedCase}
            onSave={handleSavePoints}
          />
        );

      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={S.safe}>
      <ExpoStatusBar style="light" />
      <View style={{ flex: 1 }}>{renderContent()}</View>
      <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DESIGN TOKENS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const C = {
  bg:      '#0A0A1A',
  surface: '#111124',
  gold:    '#E9C46A',
  text:    '#F2EDD7',
  muted:   '#667788',
  purple:  '#6B2FBE',
  border:  '#1E2235',
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STYLES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const S = StyleSheet.create({
  // Layout
  safe: { flex: 1, backgroundColor: '#0A0A1A' },
  screen: {
    flex: 1, backgroundColor: '#0A0A1A',
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24,
  },
  scrollContent: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 24 },

  // Buttons
  btnPrimary: {
    backgroundColor: '#E9C46A', paddingHorizontal: 36, paddingVertical: 15,
    borderRadius: 32, marginVertical: 8, minWidth: 220, alignItems: 'center',
    shadowColor: '#E9C46A', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10,
  },
  btnPrimaryTxt: { color: '#0A0A1A', fontWeight: '800', fontSize: 15, letterSpacing: 1.5 },
  btnSecondary: {
    borderWidth: 2, borderColor: '#E9C46A', paddingHorizontal: 30, paddingVertical: 13,
    borderRadius: 32, marginVertical: 6, minWidth: 160, alignItems: 'center',
  },
  btnSecondaryTxt: { color: '#E9C46A', fontWeight: '700', fontSize: 14, letterSpacing: 1.2 },

  // Toggle rows (points screen)
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#111124', borderRadius: 12, padding: 14,
    marginVertical: 5, borderWidth: 1, borderColor: '#1E2235',
  },
  toggleRowOn: { borderColor: '#E9C46A', backgroundColor: '#1A1500' },
  checkBox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 2,
    borderColor: '#667788', alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  checkBoxOn: { borderColor: '#E9C46A', backgroundColor: '#E9C46A' },
  checkMark: { color: '#0A0A1A', fontWeight: '900', fontSize: 13 },
  toggleLabel: { flex: 1, color: '#667788', fontSize: 14, fontWeight: '600' },
  togglePts: { color: '#667788', fontWeight: '700', fontSize: 13, letterSpacing: 0.5 },

  // Typography
  heroTitle: {
    fontSize: 48, fontWeight: '900', color: '#E9C46A',
    textAlign: 'center', letterSpacing: 3, lineHeight: 56,
  },
  heroTagline: {
    fontSize: 15, color: '#667788', textAlign: 'center',
    fontStyle: 'italic', lineHeight: 24, marginTop: 16,
  },
  screenLabel: {
    fontSize: 11, fontWeight: '700', color: '#667788',
    letterSpacing: 3, marginBottom: 4, textAlign: 'center',
  },
  screenTitle: {
    fontSize: 24, fontWeight: '900', color: '#E9C46A',
    letterSpacing: 2, marginBottom: 6, textAlign: 'center',
  },
  hint: { fontSize: 13, color: '#667788', textAlign: 'center', fontStyle: 'italic', lineHeight: 20 },

  // Card browser
  browserHeader: { alignItems: 'center', paddingTop: 56, paddingBottom: 8, paddingHorizontal: 24 },
  dots: { flexDirection: 'row', gap: 5, marginTop: 10, marginBottom: 4, alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#1E2235' },
  dotActive: { backgroundColor: '#E9C46A', width: 18, borderRadius: 3 },
  navRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    width: CARD_W, marginVertical: 12,
  },
  navArrow: { paddingHorizontal: 16, paddingVertical: 10 },
  navArrowTxt: { color: '#E9C46A', fontWeight: '700', fontSize: 14, letterSpacing: 1 },
  navCounter: { color: '#667788', fontSize: 13, fontWeight: '600', letterSpacing: 1 },

  // Privacy cover
  coverEyebrow: { fontSize: 13, fontWeight: '700', color: '#667788', letterSpacing: 4, marginBottom: 8 },
  coverHeading: {
    fontSize: 32, fontWeight: '900', color: '#E9C46A',
    letterSpacing: 2, textAlign: 'center', marginBottom: 12,
  },
  coverHint: { fontSize: 14, color: '#667788', fontStyle: 'italic', textAlign: 'center', marginBottom: 48, lineHeight: 22 },
  coverTap: {
    width: CARD_W, height: CARD_W * 0.6, backgroundColor: '#111124',
    borderRadius: 20, borderWidth: 2, borderColor: '#1E2235',
    alignItems: 'center', justifyContent: 'center',
  },
  coverTapIcon: { fontSize: 60 },
  coverTapLabel: { color: '#E9C46A', fontWeight: '800', letterSpacing: 2, fontSize: 13, marginTop: 16 },

  // Move card
  card: {
    width: CARD_W, borderRadius: 20, padding: 22, marginVertical: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6, shadowRadius: 14, elevation: 12,
  },
  cardCompact: { padding: 12, marginVertical: 4 },
  badge: {
    borderWidth: 1, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4,
    alignSelf: 'flex-start', marginBottom: 12, borderColor: '#667788',
  },
  badgeTxt: { color: '#667788', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  cardArt: { fontSize: 80, textAlign: 'center', marginVertical: 10 },
  cardArtSm: { fontSize: 44, textAlign: 'center', marginVertical: 6 },
  cardTitle: {
    fontSize: 22, fontWeight: '900', color: '#F2EDD7',
    textAlign: 'center', letterSpacing: 1.5, marginBottom: 14,
  },
  divider: { height: 1, width: '60%', alignSelf: 'center', marginBottom: 14, opacity: 0.5 },
  cardDesc: {
    fontSize: 15, color: 'rgba(242,237,215,0.9)',
    lineHeight: 24, textAlign: 'center', marginBottom: 16,
  },
  cardInspo: { fontSize: 12, fontWeight: '700', textAlign: 'center', letterSpacing: 1.5, fontStyle: 'italic' },

  // Case card
  caseCard: {
    width: CARD_W, backgroundColor: '#130926', borderRadius: 20, padding: 22, marginVertical: 8,
    borderWidth: 1.5, borderColor: '#6B2FBE',
    shadowColor: '#6B2FBE', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45, shadowRadius: 14,
  },
  caseFocus: { fontSize: 10, color: '#A78BFA', fontWeight: '600', letterSpacing: 2, textAlign: 'center', marginBottom: 8 },
  caseArt: { fontSize: 80, textAlign: 'center', marginVertical: 10 },
  caseTitle: {
    fontSize: 20, fontWeight: '900', color: '#F2EDD7',
    textAlign: 'center', letterSpacing: 1.2, marginBottom: 14, lineHeight: 28,
  },
  caseDesc: { fontSize: 15, color: 'rgba(242,237,215,0.85)', lineHeight: 24, textAlign: 'center' },

  // Case banner in debate screen
  caseBanner: {
    width: CARD_W, backgroundColor: '#130926', borderRadius: 14,
    padding: 16, marginTop: 12, marginBottom: 4,
    borderLeftWidth: 4, borderLeftColor: '#6B2FBE',
  },
  caseBannerLabel: { fontSize: 10, fontWeight: '700', color: '#667788', letterSpacing: 3, marginBottom: 6 },
  caseBannerTitle: { fontSize: 15, fontWeight: '800', color: '#F2EDD7', lineHeight: 22, marginBottom: 8 },
  caseBannerDesc: { fontSize: 13, color: 'rgba(242,237,215,0.75)', lineHeight: 20 },

  // Scoring hint
  scoringHint: {
    width: CARD_W, backgroundColor: '#1A1500', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 10, marginTop: 8, marginBottom: 4,
    borderWidth: 1, borderColor: '#E9C46A33',
  },
  scoringHintTxt: { color: '#E9C46A', fontSize: 12, fontWeight: '700', textAlign: 'center', letterSpacing: 0.5 },

  // Timer banner
  timerBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingVertical: 12, borderBottomWidth: 1, marginTop: 4,
  },
  timerTxt: { fontSize: 38, fontWeight: '900', letterSpacing: 3 },
  playerChip: { borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8 },
  playerChipTxt: { color: '#F2EDD7', fontWeight: '800', fontSize: 13, letterSpacing: 2 },

  // Inline move picker (during debate)
  movePickRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#111124', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12,
    marginVertical: 3, borderWidth: 1, borderColor: '#1E2235',
  },
  movePickIcon: { fontSize: 22, marginRight: 10, minWidth: 36, textAlign: 'center' },
  movePickName: { fontSize: 13, fontWeight: '700', color: '#F2EDD7' },
  movePickTier: { fontSize: 10, color: '#667788', letterSpacing: 0.8, marginTop: 2 },
  movePickCheck: { fontSize: 18, fontWeight: '900', marginLeft: 8 },
  movePickDesc: {
    width: CARD_W, borderRadius: 12, padding: 14, marginTop: 4, marginBottom: 8, borderWidth: 1,
  },
  movePickDescTitle: { fontSize: 12, fontWeight: '800', letterSpacing: 1, marginBottom: 6 },
  movePickDescText: { fontSize: 13, color: 'rgba(242,237,215,0.85)', lineHeight: 20 },

  // Modal
  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.88)', alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  modalBox: {
    backgroundColor: '#111124', borderRadius: 24, padding: 32,
    width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#E9C46A',
  },
  modalTitle: { fontSize: 28, fontWeight: '900', color: '#E9C46A', letterSpacing: 2, marginBottom: 12 },
  modalBody: { fontSize: 16, color: '#F2EDD7', textAlign: 'center', lineHeight: 26, marginBottom: 24 },

  // Points screen
  moveRevealRow: {
    flexDirection: 'row', width: CARD_W, alignItems: 'flex-start',
    marginVertical: 8, gap: 8,
  },
  moveRevealName: { fontSize: 12, fontWeight: '700', color: '#E9C46A', letterSpacing: 1, marginBottom: 4, textAlign: 'center' },
  vsLabel: { fontSize: 16, fontWeight: '900', color: '#667788', alignSelf: 'center', marginTop: 40 },
  pointsSection: {
    width: CARD_W, backgroundColor: '#111124', borderRadius: 16,
    padding: 16, marginVertical: 8, borderWidth: 1, borderColor: '#1E2235',
  },
  pointsPlayerName: {
    fontSize: 18, fontWeight: '800', color: '#E9C46A', letterSpacing: 1, marginBottom: 8,
  },
  grandTotalPts: { fontSize: 48, fontWeight: '900', color: '#E9C46A', marginTop: 4 },

  // Account — player management
  playerRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#111124', borderRadius: 12, padding: 14,
    marginVertical: 5, borderWidth: 1, borderColor: '#1E2235',
  },
  playerRowName: { flex: 1, color: '#F2EDD7', fontSize: 15, fontWeight: '600' },
  removeBtn: { padding: 4 },
  removeTxt: { color: '#667788', fontSize: 18, fontWeight: '700' },
  addRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    marginTop: 8, marginBottom: 8,
  },
  playerInput: {
    flex: 1, backgroundColor: '#111124', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    color: '#F2EDD7', fontSize: 15, borderWidth: 1, borderColor: '#1E2235', marginRight: 8,
  },
  addBtn: {
    width: 46, height: 46, backgroundColor: '#E9C46A', borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  addBtnTxt: { color: '#0A0A1A', fontSize: 22, fontWeight: '800' },
  sectionDivider: {
    width: CARD_W, height: 1, backgroundColor: '#1E2235', marginVertical: 28,
  },

  // Account — settings
  settingRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#111124', borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: '#1E2235', marginVertical: 6,
  },
  settingLabel: { fontSize: 13, fontWeight: '800', color: '#F2EDD7', letterSpacing: 1 },
  settingSubLabel: { fontSize: 11, color: '#667788', marginTop: 2 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepBtn: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#1E2235',
    alignItems: 'center', justifyContent: 'center',
  },
  stepBtnTxt: { color: '#E9C46A', fontSize: 22, fontWeight: '800', lineHeight: 28 },
  stepValue: { fontSize: 22, fontWeight: '900', color: '#E9C46A', minWidth: 28, textAlign: 'center' },

  // Onboarding banner
  onboardingBanner: {
    width: CARD_W, backgroundColor: '#130926', borderRadius: 14,
    padding: 20, marginBottom: 24, borderWidth: 1.5, borderColor: '#6B2FBE',
    alignItems: 'center',
  },
  onboardingTitle: { fontSize: 20, fontWeight: '900', color: '#E9C46A', letterSpacing: 2, marginBottom: 8 },
  onboardingText: { fontSize: 14, color: 'rgba(242,237,215,0.8)', textAlign: 'center', lineHeight: 22 },

  // History
  historyItem: {
    width: CARD_W, backgroundColor: '#111124', borderRadius: 14,
    padding: 16, marginVertical: 6, borderLeftWidth: 3, borderLeftColor: '#6B2FBE',
  },
  historyCase: { fontSize: 13, fontWeight: '700', color: '#F2EDD7', lineHeight: 20, marginBottom: 8 },
  historyScores: { flexDirection: 'row', gap: 16, marginBottom: 4 },
  historyScore: { fontSize: 13, color: '#E9C46A', fontWeight: '700' },
  historyDate: { fontSize: 12, color: '#667788' },

  // Player picker
  pickRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#111124', borderRadius: 14, padding: 16,
    marginVertical: 6, borderWidth: 1.5, borderColor: '#1E2235',
  },
  pickRowSel: { borderColor: '#6B2FBE', backgroundColor: '#130926' },
  pickBadge: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#1E2235',
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  pickBadgeTxt: { color: '#F2EDD7', fontWeight: '800', fontSize: 11, letterSpacing: 0.5 },
  pickName: { fontSize: 16, fontWeight: '700', color: '#667788' },

  // Help screen
  helpDivider: { width: CARD_W, height: 1, backgroundColor: '#1E2235', marginVertical: 20 },
  helpBody: {
    width: CARD_W, fontSize: 15, color: 'rgba(242,237,215,0.82)',
    lineHeight: 26, marginBottom: 16, textAlign: 'left',
  },
  helpRule: { flexDirection: 'row', width: CARD_W, marginBottom: 14, alignItems: 'flex-start' },
  helpRuleNum: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#6B2FBE',
    color: '#F2EDD7', fontWeight: '900', fontSize: 13, textAlign: 'center',
    lineHeight: 28, marginRight: 12, marginTop: 1,
  },
  helpRuleText: { flex: 1, color: 'rgba(242,237,215,0.82)', fontSize: 14, lineHeight: 22 },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row', backgroundColor: '#0D0D22',
    borderTopWidth: 1, borderTopColor: '#1E2235',
    paddingBottom: Platform.OS === 'ios' ? 4 : 8,
  },
  navTab: { flex: 1, alignItems: 'center', paddingVertical: 10, gap: 3 },
  navTabIcon: { fontSize: 20, opacity: 0.4 },
  navTabIconActive: { opacity: 1 },
  navTabLabel: { fontSize: 9, fontWeight: '600', color: '#667788', letterSpacing: 0.8 },
  navTabLabelActive: { color: '#E9C46A' },
});
