// The Debater's Gambit — v2.0
// All screens, logic, and data live here intentionally. Refactor later.

import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Animated,
  StyleSheet, SafeAreaView, Platform, Dimensions,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');
const CARD_W = Math.min(width * 0.88, 360);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD DATA — add cards by copying an existing entry
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MOVE_CARDS = [
  {
    id: 'm1',
    name: 'THE CHARMING BLUFF',
    icon: '🗡️🎭',
    tier: 'SILVER',
    tierLabel: 'TACTICIAN',
    bg: '#1C2333',
    accent: '#A0AEC0',
    description:
      'Say something completely ridiculous or wildly exaggerated — but deliver it with 100% unbreakable confidence. Make your opponent doubt their own sanity.',
    inspiration: 'Locke Lamora',
  },
  {
    id: 'm2',
    name: 'PAINT THE FUTURE',
    icon: '🌅🎨',
    tier: 'GOLD',
    tierLabel: 'ORATOR',
    bg: '#2D1B00',
    accent: '#ECC94B',
    description:
      "Abandon the present argument entirely. Paint a vivid, irresistible picture of a better world. Make them feel the future so powerfully they forget what they were arguing about.",
    inspiration: 'Barack Obama',
  },
  {
    id: 'm3',
    name: 'THE HONEST TALE',
    icon: '🎩🪵',
    tier: 'SILVER',
    tierLabel: 'STORYTELLER',
    bg: '#1A1200',
    accent: '#C8A96E',
    description:
      "Instead of debating aggressively, tell a short, relatable, folksy story or fable. Frame your argument so it sounds like common sense and humble wisdom.",
    inspiration: 'Abraham Lincoln',
  },
  {
    id: 'm4',
    name: 'THE BRIDGE BUILDER',
    icon: '🤝🧱',
    tier: 'GOLD',
    tierLabel: 'MASTER',
    bg: '#001A10',
    accent: '#68D391',
    description:
      "Do not attack. Instead, find a surprising common ground between you and your opponent. Then show why your solution is actually the best way to achieve what *both* of you want.",
    inspiration: 'Nelson Mandela',
  },
  // ── Add more Move Cards below ──────────────────────────────────────────
  // {
  //   id: 'm5',
  //   name: 'CARD NAME',
  //   icon: '🔥',
  //   tier: 'BRONZE',          ← BRONZE / SILVER / GOLD / PLATINUM
  //   tierLabel: 'NOVICE',
  //   bg: '#1A0000',
  //   accent: '#FC8181',
  //   description: 'What the player must do when this card is played.',
  //   inspiration: 'Role figure',
  // },
];

// Cases are displayed sorted EASY → MEDIUM → HARD
const CASE_CARDS = [
  {
    id: 'c1',
    title: 'KIDS SHOULD DECIDE THEIR OWN BEDTIME',
    icon: '🌙',
    difficulty: 'EASY',
    description:
      "One side defends the child's right to self-govern their sleep. The other upholds parental bedtime law. May the sharpest tongue win.",
  },
  {
    id: 'c2',
    title: 'PIZZA IS A PERFECTLY VALID BREAKFAST FOOD',
    icon: '🍕',
    difficulty: 'EASY',
    description:
      "One player stands for the glory of morning pizza. The other defends the sacred tradition of breakfast. Convince — or be convinced.",
  },
  {
    id: 'c3',
    title: 'CATS WOULD MAKE FAR BETTER UNDERCOVER SECRET AGENTS THAN DOGS',
    icon: '🐱🕵️',
    difficulty: 'EASY',
    description:
      "One side argues that cats are the perfect covert operatives. The other defends dogs as the ultimate agents of justice.",
  },
  {
    id: 'c4',
    title: 'HOT DOGS TECHNICALLY AND LEGALLY COUNT AS SANDWICHES',
    icon: '🌭⚖️',
    difficulty: 'EASY',
    focus: 'Definitions & Semantics',
    description:
      "A battle of definitions and semantics. One player argues the hot dog is a sandwich. The other defends culinary tradition.",
  },
  {
    id: 'c5',
    title: 'ALIENS DEFINITELY EXIST AND ARE CURRENTLY HIDING ON EARTH',
    icon: '👽🌍',
    difficulty: 'MEDIUM',
    focus: 'Conspiracy vs. Logic',
    description:
      "One player argues for the existence and presence of extraterrestrial life on Earth. The other defends logic and the burden of evidence.",
  },
  {
    id: 'c6',
    title: 'A WORLD GOVERNED BY MAGIC WOULD BE WORSE THAN ONE GOVERNED BY TECHNOLOGY',
    icon: '🪄⚙️',
    difficulty: 'HARD',
    focus: 'Chaos vs. Order',
    description:
      "One player defends the order and progress of technology. The other argues for the limitless possibilities of magic.",
  },
  // ── Add more Case Cards below ──────────────────────────────────────────
  // {
  //   id: 'c7',
  //   title: 'CASE STATEMENT IN CAPS',
  //   icon: '⚡',
  //   difficulty: 'MEDIUM',   ← EASY / MEDIUM / HARD
  //   description: 'Short flavour text.',
  // },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DIFF_ORDER = { EASY: 0, MEDIUM: 1, HARD: 2 };
const sortedCases = [...CASE_CARDS].sort(
  (a, b) => (DIFF_ORDER[a.difficulty] ?? 1) - (DIFF_ORDER[b.difficulty] ?? 1)
);

const randomFrom = arr => arr[Math.floor(Math.random() * arr.length)];

const formatTime = s =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

const timerColor = s => (s > 120 ? '#68D391' : s > 60 ? '#ECC94B' : '#FC8181');

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
    <Text style={[S.cardTitle, compact && { fontSize: 16, marginBottom: 8 }]}>{card.name}</Text>
    {!compact && (
      <>
        <View style={[S.divider, { backgroundColor: card.accent }]} />
        <Text style={S.cardDesc}>{card.description}</Text>
      </>
    )}
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

const CasePill = ({ card }) => (
  <View style={S.casePill}>
    <Text style={S.casePillLabel}>THE CASE</Text>
    <Text style={S.casePillTitle} numberOfLines={2}>{card.title}</Text>
  </View>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TINDER-STYLE CARD BROWSER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CardBrowser = ({ cards, renderCard, onChoose, showRandom, title, subtitle }) => {
  const [idx, setIdx] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const slide = (dir, afterCb) => {
    Animated.timing(translateX, {
      toValue: dir * -width,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      translateX.setValue(dir * width);
      afterCb();
      Animated.timing(translateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const goNext = () => { if (idx < cards.length - 1) slide(1, () => setIdx(i => i + 1)); };
  const goPrev = () => { if (idx > 0) slide(-1, () => setIdx(i => i - 1)); };

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
        <Animated.View style={{ transform: [{ translateX }], width: CARD_W }}>
          {renderCard(cards[idx])}
        </Animated.View>

        <View style={S.navRow}>
          <TouchableOpacity
            onPress={goPrev}
            disabled={idx === 0}
            style={[S.navArrow, idx === 0 && { opacity: 0.25 }]}
          >
            <Text style={S.navArrowTxt}>‹  PREV</Text>
          </TouchableOpacity>
          <Text style={S.navCounter}>{idx + 1} / {cards.length}</Text>
          <TouchableOpacity
            onPress={goNext}
            disabled={idx === cards.length - 1}
            style={[S.navArrow, idx === cards.length - 1 && { opacity: 0.25 }]}
          >
            <Text style={S.navArrowTxt}>NEXT  ›</Text>
          </TouchableOpacity>
        </View>

        <Btn label="✓  CHOOSE THIS" onPress={() => onChoose(cards[idx])} />
        {showRandom ? (
          <Btn
            label="🎲  RANDOM"
            variant="secondary"
            onPress={() => onChoose(randomFrom(cards))}
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

// ── Pass phone cover ──────────────────────────────────────────────────────
const PassScreen = ({ playerNum, onReady }) => (
  <View style={S.screen}>
    <Text style={S.coverEyebrow}>PASS THE PHONE TO</Text>
    <Text style={S.coverHeading}>PLAYER {playerNum}</Text>
    <Text style={S.coverHint}>Cover the screen — don't peek 👀</Text>
    <TouchableOpacity style={S.coverTap} onPress={onReady} activeOpacity={0.8}>
      <Text style={S.coverTapIcon}>🃏</Text>
      <Text style={S.coverTapLabel}>TAP WHEN READY</Text>
    </TouchableOpacity>
  </View>
);

// ── Debate with live 5-min timer ──────────────────────────────────────────
const DebateScreen = ({ caseCard, move1, move2, onGameEnd }) => {
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(300);
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
    setSecondsLeft(300);
    setShowModal(false);
  };

  const tColor = timerColor(secondsLeft);
  const currentMove = currentPlayer === 1 ? move1 : move2;
  const opponentMove = currentPlayer === 1 ? move2 : move1;
  const isLastRound = currentPlayer === 2;

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {/* Timer banner */}
      <View style={[S.timerBanner, { borderColor: tColor + '66', backgroundColor: tColor + '18' }]}>
        <Text style={[S.timerTxt, { color: tColor }]}>{formatTime(secondsLeft)}</Text>
        <View style={[S.playerChip, { backgroundColor: C.purple }]}>
          <Text style={S.playerChipTxt}>PLAYER {currentPlayer}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={S.scrollContent} showsVerticalScrollIndicator={false}>
        <CasePill card={caseCard} />

        <Text style={[S.screenLabel, { marginTop: 16 }]}>YOUR MOVE</Text>
        <MoveCardView card={currentMove} />

        <Text style={[S.screenLabel, { marginTop: 16 }]}>OPPONENT'S MOVE</Text>
        <View style={S.faceDown}>
          <Text style={{ fontSize: 40 }}>🃏</Text>
          <Text style={S.faceDownLabel}>Revealed when they speak</Text>
        </View>
      </ScrollView>

      {/* Timer-end modal */}
      {showModal ? (
        <View style={S.modalOverlay}>
          <View style={S.modalBox}>
            <Text style={S.modalTitle}>⏱  TIME'S UP!</Text>
            <Text style={S.modalBody}>
              {isLastRound
                ? "Both players have spoken!\nTime to decide the winner."
                : "Great argument, Player 1!\nNow pass the phone to Player 2."}
            </Text>
            <Btn
              label={isLastRound ? "SEE WHO WON  →" : "SWITCH TO PLAYER 2  →"}
              onPress={isLastRound ? onGameEnd : switchToP2}
            />
            {/* Also show opponent's card reveal before switching */}
            {!isLastRound ? (
              <Text style={[S.hint, { marginTop: 12 }]}>
                Opponent played: {opponentMove.name}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}
    </View>
  );
};

// ── Who won? ──────────────────────────────────────────────────────────────
const WinnerScreen = ({ caseCard, onSave }) => (
  <ScrollView
    contentContainerStyle={[S.scrollContent, { paddingTop: 80 }]}
    style={{ backgroundColor: C.bg }}
  >
    <Text style={S.heroTitle}>DEBATE{'\n'}COMPLETE</Text>
    <Text style={[S.hint, { marginTop: 8, marginBottom: 32 }]}>
      {caseCard.title}
    </Text>
    <Text style={S.screenTitle}>WHO WON?</Text>
    <Btn label="🏆  PLAYER 1 WINS" onPress={() => onSave(1)} />
    <Btn label="🏆  PLAYER 2 WINS" onPress={() => onSave(2)} />
    <Btn
      label="🤝  IT'S A DRAW"
      variant="secondary"
      onPress={() => onSave(0)}
      style={{ marginBottom: 40 }}
    />
  </ScrollView>
);

// ── Account / History ─────────────────────────────────────────────────────
const AccountScreen = ({ history }) => (
  <ScrollView
    contentContainerStyle={[S.scrollContent, { paddingTop: 80 }]}
    style={{ backgroundColor: C.bg }}
  >
    <Text style={S.screenTitle}>MY HISTORY</Text>
    {history.length === 0 ? (
      <Text style={[S.hint, { marginTop: 40 }]}>No debates yet.{'\n'}Start a new case!</Text>
    ) : (
      history.map(h => (
        <View key={h.id} style={S.historyItem}>
          <Text style={S.historyCase} numberOfLines={2}>{h.case}</Text>
          <View style={S.historyMeta}>
            <Text style={S.historyWinner}>
              {h.winner === 0 ? '🤝 Draw' : `🏆 Player ${h.winner}`}
            </Text>
            <Text style={S.historyDate}>{h.date}</Text>
          </View>
        </View>
      ))
    )}
  </ScrollView>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BOTTOM NAV
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const NAV_TABS = [
  { id: 'home',    icon: '🏠', label: 'Home' },
  { id: 'game',    icon: '⚔️', label: 'New Case' },
  { id: 'account', icon: '👤', label: 'Account' },
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
// Phases: pick_case → p1_pick_move → pass_to_p2 → p2_pick_move → debate → winner
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [gamePhase, setGamePhase] = useState('pick_case');
  const [selectedCase, setSelectedCase] = useState(null);
  const [move1, setMove1] = useState(null);
  const [move2, setMove2] = useState(null);
  const [history, setHistory] = useState([]);

  const resetGame = () => {
    setGamePhase('pick_case');
    setSelectedCase(null);
    setMove1(null);
    setMove2(null);
  };

  const handleTabPress = tab => {
    if (tab === 'game') resetGame();
    setActiveTab(tab);
  };

  const handleWinner = winner => {
    setHistory(h => [
      {
        id: Date.now(),
        case: selectedCase.title,
        winner,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      },
      ...h,
    ]);
    setActiveTab('home');
    resetGame();
  };

  const renderContent = () => {
    if (activeTab === 'home') return <HomeScreen />;
    if (activeTab === 'account') return <AccountScreen history={history} />;

    switch (gamePhase) {
      case 'pick_case':
        return (
          <CardBrowser
            cards={sortedCases}
            renderCard={card => <CaseCardView card={card} />}
            onChoose={card => { setSelectedCase(card); setGamePhase('p1_pick_move'); }}
            showRandom
            title="CHOOSE A CASE"
            subtitle="Easiest first — swipe to explore"
          />
        );

      case 'p1_pick_move':
        return (
          <CardBrowser
            cards={MOVE_CARDS}
            renderCard={card => <MoveCardView card={card} />}
            onChoose={card => { setMove1(card); setGamePhase('pass_to_p2'); }}
            showRandom={false}
            title="PLAYER 1"
            subtitle="Choose your move card"
          />
        );

      case 'pass_to_p2':
        return <PassScreen playerNum={2} onReady={() => setGamePhase('p2_pick_move')} />;

      case 'p2_pick_move':
        return (
          <CardBrowser
            cards={MOVE_CARDS}
            renderCard={card => <MoveCardView card={card} />}
            onChoose={card => { setMove2(card); setGamePhase('debate'); }}
            showRandom={false}
            title="PLAYER 2"
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
            onGameEnd={() => setGamePhase('winner')}
          />
        );

      case 'winner':
        return <WinnerScreen caseCard={selectedCase} onSave={handleWinner} />;

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
  safe: { flex: 1, backgroundColor: C.bg },
  screen: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  // Buttons
  btnPrimary: {
    backgroundColor: C.gold,
    paddingHorizontal: 36,
    paddingVertical: 15,
    borderRadius: 32,
    marginVertical: 8,
    minWidth: 220,
    alignItems: 'center',
    shadowColor: C.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  btnPrimaryTxt: {
    color: '#0A0A1A',
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 1.5,
  },
  btnSecondary: {
    borderWidth: 2,
    borderColor: C.gold,
    paddingHorizontal: 30,
    paddingVertical: 13,
    borderRadius: 32,
    marginVertical: 6,
    minWidth: 160,
    alignItems: 'center',
  },
  btnSecondaryTxt: {
    color: C.gold,
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 1.2,
  },

  // Typography
  heroTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: C.gold,
    textAlign: 'center',
    letterSpacing: 3,
    lineHeight: 56,
  },
  heroTagline: {
    fontSize: 15,
    color: C.muted,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 24,
    marginTop: 16,
  },
  screenLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: C.muted,
    letterSpacing: 3,
    marginBottom: 4,
    textAlign: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: C.gold,
    letterSpacing: 2,
    marginBottom: 6,
    textAlign: 'center',
  },
  hint: {
    fontSize: 13,
    color: C.muted,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },

  // Card browser
  browserHeader: {
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 8,
    paddingHorizontal: 24,
  },
  dots: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
    marginBottom: 4,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.border,
  },
  dotActive: {
    backgroundColor: C.gold,
    width: 18,
    borderRadius: 3,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: CARD_W,
    marginVertical: 12,
  },
  navArrow: { paddingHorizontal: 16, paddingVertical: 10 },
  navArrowTxt: { color: C.gold, fontWeight: '700', fontSize: 14, letterSpacing: 1 },
  navCounter: { color: C.muted, fontSize: 13, fontWeight: '600', letterSpacing: 1 },

  // Privacy cover
  coverEyebrow: {
    fontSize: 13,
    fontWeight: '700',
    color: C.muted,
    letterSpacing: 4,
    marginBottom: 8,
  },
  coverHeading: {
    fontSize: 32,
    fontWeight: '900',
    color: C.gold,
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 12,
  },
  coverHint: {
    fontSize: 14,
    color: C.muted,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 22,
  },
  coverTap: {
    width: CARD_W,
    height: CARD_W * 0.6,
    backgroundColor: C.surface,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverTapIcon: { fontSize: 60 },
  coverTapLabel: {
    color: C.gold,
    fontWeight: '800',
    letterSpacing: 2,
    fontSize: 13,
    marginTop: 16,
  },

  // Move card
  card: {
    width: CARD_W,
    borderRadius: 20,
    padding: 22,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 12,
  },
  cardCompact: { padding: 14 },
  badge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
    borderColor: C.muted,
  },
  badgeTxt: { color: C.muted, fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  cardArt: { fontSize: 80, textAlign: 'center', marginVertical: 10 },
  cardArtSm: { fontSize: 48, textAlign: 'center', marginVertical: 6 },
  cardTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: C.text,
    textAlign: 'center',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  divider: {
    height: 1,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 14,
    opacity: 0.5,
  },
  cardDesc: {
    fontSize: 15,
    color: 'rgba(242,237,215,0.9)',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  cardInspo: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1.5,
    fontStyle: 'italic',
  },

  // Case card
  caseCard: {
    width: CARD_W,
    backgroundColor: '#130926',
    borderRadius: 20,
    padding: 22,
    marginVertical: 8,
    borderWidth: 1.5,
    borderColor: '#6B2FBE',
    shadowColor: '#6B2FBE',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
  },
  caseFocus: {
    fontSize: 10,
    color: '#A78BFA',
    fontWeight: '600',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  caseArt: { fontSize: 80, textAlign: 'center', marginVertical: 10 },
  caseTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: C.text,
    textAlign: 'center',
    letterSpacing: 1.2,
    marginBottom: 14,
    lineHeight: 28,
  },
  caseDesc: {
    fontSize: 15,
    color: 'rgba(242,237,215,0.85)',
    lineHeight: 24,
    textAlign: 'center',
  },

  // Case pill
  casePill: {
    width: CARD_W,
    backgroundColor: '#130926',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6B2FBE',
  },
  casePillLabel: { fontSize: 10, fontWeight: '700', color: C.muted, letterSpacing: 3, marginBottom: 4 },
  casePillTitle: { fontSize: 14, fontWeight: '800', color: C.text, letterSpacing: 0.5, lineHeight: 20 },

  // Debate timer banner
  timerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginTop: 4,
  },
  timerTxt: { fontSize: 38, fontWeight: '900', letterSpacing: 3 },
  playerChip: {
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  playerChipTxt: { color: C.text, fontWeight: '800', fontSize: 13, letterSpacing: 2 },

  // Face-down card
  faceDown: {
    width: CARD_W,
    height: 110,
    backgroundColor: C.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  faceDownLabel: { color: C.muted, fontSize: 12, marginTop: 8, letterSpacing: 1 },

  // Timer modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  modalBox: {
    backgroundColor: C.surface,
    borderRadius: 24,
    padding: 32,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.gold,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: C.gold,
    letterSpacing: 2,
    marginBottom: 12,
  },
  modalBody: {
    fontSize: 16,
    color: C.text,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
  },

  // History
  historyItem: {
    width: CARD_W,
    backgroundColor: C.surface,
    borderRadius: 14,
    padding: 16,
    marginVertical: 6,
    borderLeftWidth: 3,
    borderLeftColor: C.purple,
  },
  historyCase: { fontSize: 14, fontWeight: '700', color: C.text, lineHeight: 20, marginBottom: 8 },
  historyMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  historyWinner: { fontSize: 13, color: C.gold, fontWeight: '700' },
  historyDate: { fontSize: 12, color: C.muted },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#0D0D22',
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingBottom: Platform.OS === 'ios' ? 4 : 8,
  },
  navTab: { flex: 1, alignItems: 'center', paddingVertical: 10, gap: 3 },
  navTabIcon: { fontSize: 22, opacity: 0.4 },
  navTabIconActive: { opacity: 1 },
  navTabLabel: { fontSize: 10, fontWeight: '600', color: C.muted, letterSpacing: 0.8 },
  navTabLabelActive: { color: C.gold },
});
