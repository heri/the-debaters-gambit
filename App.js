// The Debater's Gambit — v3.0
// All screens, logic, and data live here intentionally. Refactor later.

import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Animated,
  TextInput, KeyboardAvoidingView, StyleSheet,
  Platform, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');
const CARD_W = Math.min(width * 0.88, 360);
const DEBATE_SECS = 5 * 60; // 5 minutes

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD DATA — add cards by copying an existing entry
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MOVE_CARDS = [
  {
    id: 'm1',
    name: 'THE CHARMING BLUFF',
    icon: '🗡️🎭',
    tier: 'SILVER', tierLabel: 'TACTICIAN',
    bg: '#1C2333', accent: '#A0AEC0',
    description:
      'Say something completely ridiculous or wildly exaggerated — but deliver it with 100% unbreakable confidence. Make your opponent doubt their own sanity.',
    inspiration: 'Locke Lamora',
  },
  {
    id: 'm2',
    name: 'PAINT THE FUTURE',
    icon: '🌅🎨',
    tier: 'GOLD', tierLabel: 'ORATOR',
    bg: '#2D1B00', accent: '#ECC94B',
    description:
      "Abandon the present argument entirely. Paint a vivid, irresistible picture of a better world. Make them feel the future so powerfully they forget what they were arguing about.",
    inspiration: 'Barack Obama',
  },
  {
    id: 'm3',
    name: 'THE HONEST TALE',
    icon: '🎩🪵',
    tier: 'SILVER', tierLabel: 'STORYTELLER',
    bg: '#1A1200', accent: '#C8A96E',
    description:
      "Instead of debating aggressively, tell a short, relatable, folksy story or fable. Frame your argument so it sounds like common sense and humble wisdom.",
    inspiration: 'Abraham Lincoln',
  },
  {
    id: 'm4',
    name: 'THE BRIDGE BUILDER',
    icon: '🤝🧱',
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

// Cases are displayed sorted EASY → MEDIUM → HARD
const CASE_CARDS = [
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
  {
    id: 'c5', icon: '👽🌍', difficulty: 'MEDIUM', focus: 'Conspiracy vs. Logic',
    title: 'ALIENS DEFINITELY EXIST AND ARE CURRENTLY HIDING ON EARTH',
    description: "One player argues for the existence and presence of extraterrestrial life on Earth. The other defends logic and the burden of evidence.",
  },
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

// Checkbox row used on the points screen
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

// Full case banner shown during debate — no truncation
const CaseBanner = ({ card }) => (
  <View style={S.caseBanner}>
    <Text style={S.caseBannerLabel}>THE CASE</Text>
    <Text style={S.caseBannerTitle}>{card.title}</Text>
    <Text style={S.caseBannerDesc}>{card.description}</Text>
  </View>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TINDER-STYLE CARD BROWSER
// Supports: swipe left/right, arrow buttons, random slot-machine animation
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

  // These are defined per-render so they close over the current `idx`
  const goNext = () => {
    if (!isSpinning && idx < cards.length - 1) slide(1, () => setIdx(i => i + 1));
  };
  const goPrev = () => {
    if (!isSpinning && idx > 0) slide(-1, () => setIdx(i => i - 1));
  };

  // Touch-based swipe: detect horizontal flick on the card
  const onTouchStart = e => { touchStartX.current = e.nativeEvent.pageX; };
  const onTouchEnd = e => {
    if (touchStartX.current === null || isSpinning) return;
    const dx = e.nativeEvent.pageX - touchStartX.current;
    touchStartX.current = null;
    if (dx < -40) goNext();
    else if (dx > 40) goPrev();
  };

  // Slot-machine random: spin through cards with deceleration, land on target
  const handleRandom = () => {
    if (isSpinning) return;
    const targetIdx = Math.floor(Math.random() * cards.length);
    const stepsToTarget = (targetIdx - idx + cards.length) % cards.length;
    // Always spin at least 2 full rounds so it feels random
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
      over the horizon. He charmed merchants, convinced warlords, and navigated
      the courts of distant empires — returning with stories so extraordinary that
      the whole kingdom went quiet to hear them. A life of adventure written
      entirely in arguments won.
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
        <Text style={{ color: C.gold }}>Pick a Move Card</Text> — each player secretly chooses a rhetorical
        technique they must try to use.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>3</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Debate</Text> — each player gets 5 minutes. Make your case. There are no
        wrong arguments, only weak ones.
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

// ── Account: player management + history ─────────────────────────────────
const AccountScreen = ({ players, onAdd, onRemove, history }) => {
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
        <Text style={S.screenTitle}>PLAYERS</Text>

        {players.map(p => (
          <View key={p.id} style={S.playerRow}>
            <Text style={S.playerRowName}>{p.name}</Text>
            <TouchableOpacity onPress={() => onRemove(p.id)} style={S.removeBtn} hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
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

        {history.length > 0 ? (
          <>
            <View style={[S.sectionDivider]} />
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
      setSel([sel[0], p]); // replace second pick
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

// ── Debate: live timer, full case, finish-early button ────────────────────
const DebateScreen = ({ caseCard, move1, move2, player1, player2, onGameEnd }) => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(DEBATE_SECS);
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
  }, [currentPlayer, showModal]);

  const switchToP2 = () => {
    setCurrentPlayer(2);
    setSecondsLeft(DEBATE_SECS);
    setShowModal(false);
  };

  const tColor = timerColor(secondsLeft);
  const currentMove = currentPlayer === 1 ? move1 : move2;
  const currentName = (currentPlayer === 1 ? player1 : player2).name;
  const nextName = (currentPlayer === 1 ? player2 : player1).name;
  const isLastRound = currentPlayer === 2;

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {/* Sticky timer banner */}
      <View style={[S.timerBanner, { borderColor: tColor + '55', backgroundColor: tColor + '14' }]}>
        <Text style={[S.timerTxt, { color: tColor }]}>{formatTime(secondsLeft)}</Text>
        <View style={[S.playerChip, { backgroundColor: C.purple }]}>
          <Text style={S.playerChipTxt}>{currentName.toUpperCase()}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={S.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Full case — no truncation */}
        <CaseBanner card={caseCard} />

        {/* Scoring reminder */}
        <View style={S.scoringHint}>
          <Text style={S.scoringHintTxt}>
            1 pt for winning  ·  +1 bonus if you use your move card
          </Text>
        </View>

        <Text style={[S.screenLabel, { marginTop: 16 }]}>YOUR MOVE CARD</Text>
        <MoveCardView card={currentMove} />

        <Text style={[S.screenLabel, { marginTop: 16 }]}>OPPONENT'S MOVE</Text>
        <View style={S.faceDown}>
          <Text style={{ fontSize: 40 }}>🃏</Text>
          <Text style={S.faceDownLabel}>Revealed at scoring</Text>
        </View>

        <Btn
          label="✓  DONE — I'M FINISHED"
          onPress={() => setShowModal(true)}
          style={{ marginTop: 20, marginBottom: 40 }}
        />
      </ScrollView>

      {/* Modal: timer end or finish-early */}
      {showModal ? (
        <View style={S.modalOverlay}>
          <View style={S.modalBox}>
            <Text style={S.modalTitle}>
              {secondsLeft === 0 ? '⏱  TIME\'S UP!' : '✓  DONE!'}
            </Text>
            <Text style={S.modalBody}>
              {isLastRound
                ? `Both players have spoken!\nTime to score the round.`
                : `Great job, ${player1.name}!\nNow pass the phone to ${player2.name}.`}
            </Text>
            <Btn
              label={isLastRound ? 'SCORE THE ROUND  →' : `PASS TO ${nextName.toUpperCase()}  →`}
              onPress={isLastRound ? onGameEnd : switchToP2}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

// ── Points: allocate points, reveal both move cards ───────────────────────
const PointsScreen = ({ player1, player2, move1, move2, caseCard, onSave }) => {
  const [p1Won, setP1Won] = useState(false);
  const [p1Move, setP1Move] = useState(false);
  const [p2Won, setP2Won] = useState(false);
  const [p2Move, setP2Move] = useState(false);

  const p1pts = (p1Won ? 1 : 0) + (p1Move ? 1 : 0);
  const p2pts = (p2Won ? 1 : 0) + (p2Move ? 1 : 0);

  return (
    <ScrollView
      contentContainerStyle={[S.scrollContent, { paddingTop: 60 }]}
      style={{ backgroundColor: C.bg }}
    >
      <Text style={S.screenTitle}>ROUND RESULTS</Text>
      <Text style={[S.hint, { marginBottom: 24 }]} numberOfLines={2}>{caseCard.title}</Text>

      {/* Move card reveal */}
      <Text style={S.screenLabel}>MOVE CARDS PLAYED</Text>
      <View style={S.moveRevealRow}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={S.moveRevealName}>{player1.name}</Text>
          <MoveCardView card={move1} compact />
        </View>
        <Text style={S.vsLabel}>VS</Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={S.moveRevealName}>{player2.name}</Text>
          <MoveCardView card={move2} compact />
        </View>
      </View>

      {/* Player 1 points */}
      <View style={S.pointsSection}>
        <Text style={S.pointsPlayerName}>{player1.name}</Text>
        <ToggleRow label="Won the argument" value={p1Won} onToggle={() => setP1Won(v => !v)} pts={1} />
        <ToggleRow label="Used their move card" value={p1Move} onToggle={() => setP1Move(v => !v)} pts={1} />
        <Text style={S.pointsTotal}>{p1pts} point{p1pts !== 1 ? 's' : ''}</Text>
      </View>

      {/* Player 2 points */}
      <View style={S.pointsSection}>
        <Text style={S.pointsPlayerName}>{player2.name}</Text>
        <ToggleRow label="Won the argument" value={p2Won} onToggle={() => setP2Won(v => !v)} pts={1} />
        <ToggleRow label="Used their move card" value={p2Move} onToggle={() => setP2Move(v => !v)} pts={1} />
        <Text style={S.pointsTotal}>{p2pts} point{p2pts !== 1 ? 's' : ''}</Text>
      </View>

      <Btn
        label="SAVE RESULTS"
        onPress={() => onSave(p1pts, p2pts)}
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
// APP — GAME STATE MACHINE
// Phases: pick_players → pick_case → p1_pick_move → pass_to_p2
//         → p2_pick_move → debate → points
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [gamePhase, setGamePhase] = useState('pick_players');

  // Persistent player roster
  const [players, setPlayers] = useState([
    { id: uid(), name: 'Player 1' },
    { id: uid(), name: 'Player 2' },
  ]);

  // Per-game state
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [move1, setMove1] = useState(null);
  const [move2, setMove2] = useState(null);

  // History persists across games
  const [history, setHistory] = useState([]);

  const resetGame = () => {
    setGamePhase('pick_players');
    setPlayer1(null); setPlayer2(null);
    setSelectedCase(null);
    setMove1(null); setMove2(null);
  };

  const handleTabPress = tab => {
    if (tab === 'game') resetGame();
    setActiveTab(tab);
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

  const renderContent = () => {
    // Static tabs
    if (activeTab === 'home') return <HomeScreen />;
    if (activeTab === 'help') return <HelpScreen />;
    if (activeTab === 'account') return (
      <AccountScreen
        players={players}
        onAdd={name => setPlayers(p => [...p, { id: uid(), name }])}
        onRemove={id => setPlayers(p => p.filter(x => x.id !== id))}
        history={history}
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
            onChoose={card => { setSelectedCase(card); setGamePhase('p1_pick_move'); }}
            showRandom
            title="CHOOSE A CASE"
            subtitle={`${player1?.name}  vs  ${player2?.name}  ·  easiest first`}
          />
        );

      case 'p1_pick_move':
        return (
          <CardBrowser
            cards={MOVE_CARDS}
            renderCard={card => <MoveCardView card={card} />}
            onChoose={card => { setMove1(card); setGamePhase('pass_to_p2'); }}
            showRandom={false}
            title={player1?.name.toUpperCase()}
            subtitle="Choose your move card"
          />
        );

      case 'pass_to_p2':
        return <PassScreen name={player2?.name} onReady={() => setGamePhase('p2_pick_move')} />;

      case 'p2_pick_move':
        return (
          <CardBrowser
            cards={MOVE_CARDS}
            renderCard={card => <MoveCardView card={card} />}
            onChoose={card => { setMove2(card); setGamePhase('debate'); }}
            showRandom={false}
            title={player2?.name.toUpperCase()}
            subtitle="Choose your move card"
          />
        );

      case 'debate':
        return (
          <DebateScreen
            key={selectedCase?.id}
            caseCard={selectedCase}
            move1={move1}
            move2={move2}
            player1={player1}
            player2={player2}
            onGameEnd={() => setGamePhase('points')}
          />
        );

      case 'points':
        return (
          <PointsScreen
            player1={player1}
            player2={player2}
            move1={move1}
            move2={move2}
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

  // Face-down card
  faceDown: {
    width: CARD_W, height: 110, backgroundColor: '#111124',
    borderRadius: 16, borderWidth: 1, borderColor: '#1E2235',
    alignItems: 'center', justifyContent: 'center', marginVertical: 8,
  },
  faceDownLabel: { color: '#667788', fontSize: 12, marginTop: 8, letterSpacing: 1 },

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
    marginVertical: 12, gap: 8,
  },
  moveRevealName: { fontSize: 12, fontWeight: '700', color: '#E9C46A', letterSpacing: 1, marginBottom: 4, textAlign: 'center' },
  vsLabel: { fontSize: 16, fontWeight: '900', color: '#667788', alignSelf: 'center', marginTop: 40 },
  pointsSection: {
    width: CARD_W, backgroundColor: '#111124', borderRadius: 16,
    padding: 16, marginVertical: 8, borderWidth: 1, borderColor: '#1E2235',
  },
  pointsPlayerName: {
    fontSize: 18, fontWeight: '800', color: '#E9C46A',
    letterSpacing: 1, marginBottom: 12,
  },
  pointsTotal: {
    fontSize: 16, fontWeight: '800', color: '#F2EDD7',
    marginTop: 12, textAlign: 'right', letterSpacing: 0.5,
  },

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
