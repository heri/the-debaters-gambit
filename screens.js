import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Animated, Dimensions,
  TextInput, KeyboardAvoidingView, Platform, Image,
} from 'react-native';
import { CARD_W, DEFAULT_DEBATE_SECS, MOVE_CARDS, sortedCases, formatTime, timerColor } from './data';
import { DRILLS } from './drills';
import { C, S } from './styles';
import { Btn, ToggleRow, MoveCardView, CaseCardView, CaseBanner } from './components';

const { width: SCREEN_W } = Dimensions.get('window');

// ── Home ───────────────────────────────────────────────────────────────────
// dailyDraw: { caseCard, moveCard } — pre-seeded by today's date
// canPlay: whether >= 2 players exist (disables the daily button if not)

export const HomeScreen = ({ dailyDraw, onPlayDaily, canPlay }) => (
  <ScrollView
    contentContainerStyle={[S.scrollContent, { paddingTop: 60, paddingBottom: 40 }]}
    style={{ backgroundColor: C.bg }}
  >
    <Text style={S.heroTitle}>THE{'\n'}DEBATER'S{'\n'}GAMBIT</Text>
    <Text style={S.heroTagline}>Words are your weapons.{'\n'}Wit is your armor.</Text>

    {/* Daily Quick Draw card */}
    <TouchableOpacity
      style={[S.dailyCard, !canPlay && S.dailyPlayBtnDisabled]}
      onPress={canPlay ? onPlayDaily : null}
      activeOpacity={0.85}
    >
      <Text style={S.dailyLabel}>TODAY'S QUICK DRAW</Text>
      <Text style={S.dailyCaseTitle} numberOfLines={2}>
        {dailyDraw.caseCard.title}
      </Text>
      <View style={S.dailyDivider} />
      <Text style={S.dailyMoveLabel}>MOVE OF THE DAY</Text>
      <Text style={S.dailyMoveName}>
        {dailyDraw.moveCard.icon}  {dailyDraw.moveCard.name}
      </Text>
      <View style={[S.dailyPlayBtn, !canPlay && { opacity: 0.5 }]}>
        <Text style={S.dailyPlayBtnTxt}>
          {canPlay ? '▶  PLAY TODAY\'S ROUND' : 'ADD 2 PLAYERS TO PLAY'}
        </Text>
      </View>
    </TouchableOpacity>

    <Text style={[S.hint, { marginTop: 20 }]}>Step into the Parlour — tap ⚔️ to choose your case</Text>
  </ScrollView>
);

// ── Help ───────────────────────────────────────────────────────────────────

export const HelpScreen = () => (
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
    <Text style={S.helpBody}>
      The game treats you as a junior debater — not a student. A member of the{' '}
      <Text style={{ color: C.gold, fontStyle: 'italic' }}>Parlour of Minds</Text>.
      Not here to learn. Here to practise.
    </Text>

    <View style={S.helpDivider} />

    <Text style={[S.screenTitle, { marginTop: 8 }]}>HOW TO PLAY</Text>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>1</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Choose a Case</Text> — the debate topic both players will argue.
        Use the dropdowns below the case card to select who is playing.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>2</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Get your hand</Text> — each player is dealt their own 2 Move Cards.
        Beginners get easier NOVICE cards. Slip one in at any point during your argument to earn a +1 bonus — no pressure, they're optional.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>3</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Debate</Text> — each player gets a timed turn. The bar at the top
        starts full and depletes as time runs out. Your dealt cards are shown — tap one to select it.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>4</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>After each round</Text> — choose to play another round or end the game and score.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>5</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Score</Text> —{' '}
        <Text style={{ color: '#FC8181' }}>1 point</Text> for winning the argument.{' '}
        <Text style={{ color: '#68D391' }}>+1 bonus point</Text> if you actually used your move card.
      </Text>
    </View>

    <View style={S.helpDivider} />
    <Text style={[S.screenTitle, { marginTop: 8 }]}>QUICK DRAW</Text>
    <Text style={S.helpBody}>
      Every day the app generates a unique pairing — one Case and one Move Card of
      the Day — seeded from the date. Tap{' '}
      <Text style={{ color: C.gold }}>▶ Play Today's Round</Text> on the home
      screen to jump straight in. No browsing, no choosing — just debate.
    </Text>
    <Text style={S.helpBody}>
      Your streak will be tracked here in a future update. Start playing daily now
      to build the habit before the counter arrives.
    </Text>
  </ScrollView>
);

// ── Account ────────────────────────────────────────────────────────────────

export const AccountScreen = ({ players, onAdd, onRemove, defaultRounds, onRoundsChange, debateSecs, onDebateSecsChange, cornerTimeEnabled, onCornerTimeChange, history, isOnboarding }) => {
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

        <View style={S.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={S.settingLabel}>DEBATE TIME</Text>
            <Text style={S.settingSubLabel}>Minutes per player turn</Text>
          </View>
          <View style={S.stepper}>
            <TouchableOpacity
              style={S.stepBtn}
              onPress={() => onDebateSecsChange(Math.max(60, debateSecs - 60))}
            >
              <Text style={S.stepBtnTxt}>−</Text>
            </TouchableOpacity>
            <Text style={S.stepValue}>{debateSecs / 60} min</Text>
            <TouchableOpacity
              style={S.stepBtn}
              onPress={() => onDebateSecsChange(Math.min(900, debateSecs + 60))}
            >
              <Text style={S.stepBtnTxt}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={S.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={S.settingLabel}>CORNER TIME</Text>
            <Text style={S.settingSubLabel}>60s to plan before each turn</Text>
          </View>
          <TouchableOpacity
            onPress={() => onCornerTimeChange(!cornerTimeEnabled)}
            style={{
              paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
              backgroundColor: cornerTimeEnabled ? C.teal : C.border,
              borderWidth: 1.5,
              borderColor: cornerTimeEnabled ? C.teal : C.muted,
            }}
          >
            <Text style={{
              fontSize: 11, fontWeight: '900', letterSpacing: 1.5,
              color: cornerTimeEnabled ? '#0D0F1C' : C.muted,
            }}>
              {cornerTimeEnabled ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
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

// ── Player picker ──────────────────────────────────────────────────────────

export const PlayerPickScreen = ({ players, onConfirm }) => {
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
            <View style={[S.pickBadge, picked && { backgroundColor: C.teal }]}>
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

// ── Case picker with inline player selection (new_case flow) ──────────────
// players: all registered players
// onConfirm(caseCard, p1, p2) — called when user locks in their choice

export const CasePickScreen = ({ players, onConfirm }) => {
  const [idx, setIdx] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [p1, setP1] = useState(players.length > 0 ? players[0] : null);
  const [p2, setP2] = useState(players.length > 1 ? players[1] : null);
  const [p1Open, setP1Open] = useState(false);
  const [p2Open, setP2Open] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const touchStartX = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => () => { isMounted.current = false; }, []);

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

  const slide = (dir, afterCb) => {
    Animated.timing(translateX, {
      toValue: dir * -SCREEN_W, duration: 200, useNativeDriver: true,
    }).start(() => {
      translateX.setValue(dir * SCREEN_W);
      afterCb();
      Animated.timing(translateX, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    });
  };

  const goNext = () => {
    if (!isSpinning && idx < sortedCases.length - 1) slide(1, () => setIdx(i => i + 1));
  };
  const goPrev = () => {
    if (!isSpinning && idx > 0) slide(-1, () => setIdx(i => i - 1));
  };

  const onTouchStart = e => { touchStartX.current = e.nativeEvent.pageX; };
  const onTouchEnd = e => {
    if (touchStartX.current === null || isSpinning) return;
    const dx = e.nativeEvent.pageX - touchStartX.current;
    touchStartX.current = null;
    if (dx < -40) goNext(); else if (dx > 40) goPrev();
  };

  const handleRandom = () => {
    if (isSpinning) return;
    const targetIdx = Math.floor(Math.random() * sortedCases.length);
    const stepsToTarget = (targetIdx - idx + sortedCases.length) % sortedCases.length;
    const totalSteps = 2 * sortedCases.length + (stepsToTarget || sortedCases.length);
    let step = 0; let cur = idx;
    setIsSpinning(true);
    const spin = () => {
      if (!isMounted.current) return;
      cur = (cur + 1) % sortedCases.length;
      setIdx(cur); step++;
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

  const canConfirm = p1 && p2 && p1.id !== p2.id;

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={S.browserHeader}>
        <Text style={S.screenTitle}>CHOOSE A CASE</Text>
        <View style={S.dots}>
          {sortedCases.map((_, i) => (
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
          <CaseCardView card={sortedCases[idx]} />
        </Animated.View>

        <View style={S.navRow}>
          <TouchableOpacity
            onPress={goPrev}
            disabled={idx === 0 || isSpinning}
            style={[S.navArrow, (idx === 0 || isSpinning) && { opacity: 0.25 }]}
          >
            <Text style={S.navArrowTxt}>‹  PREV</Text>
          </TouchableOpacity>
          <Text style={S.navCounter}>{idx + 1} / {sortedCases.length}</Text>
          <TouchableOpacity
            onPress={goNext}
            disabled={idx === sortedCases.length - 1 || isSpinning}
            style={[S.navArrow, (idx === sortedCases.length - 1 || isSpinning) && { opacity: 0.25 }]}
          >
            <Text style={S.navArrowTxt}>NEXT  ›</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: CARD_W, marginTop: 12 }}>
          <Text style={[S.hint, { marginBottom: 12, textAlign: 'center' }]}>
            Player 1 speaks first, then Player 2
          </Text>

          <Text style={S.playerSelectorLabel}>PLAYER 1</Text>
          <TouchableOpacity
            style={S.playerSelectorBtn}
            onPress={() => { setP1Open(o => !o); setP2Open(false); }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={S.playerSelectorName}>{p1 ? p1.name : 'Select player…'}</Text>
              <Text style={S.playerSelectorCaret}>{p1Open ? '▲' : '▼'}</Text>
            </View>
          </TouchableOpacity>
          {p1Open ? players.map(p => (
            <TouchableOpacity
              key={p.id}
              style={S.playerSelectorOption}
              onPress={() => { setP1(p); if (p2?.id === p.id) setP2(null); setP1Open(false); }}
            >
              <Text style={S.playerSelectorOptionTxt}>{p.name}</Text>
            </TouchableOpacity>
          )) : null}

          <View style={{ height: 12 }} />

          <Text style={S.playerSelectorLabel}>PLAYER 2</Text>
          <TouchableOpacity
            style={S.playerSelectorBtn}
            onPress={() => { setP2Open(o => !o); setP1Open(false); }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={S.playerSelectorName}>{p2 ? p2.name : 'Select player…'}</Text>
              <Text style={S.playerSelectorCaret}>{p2Open ? '▲' : '▼'}</Text>
            </View>
          </TouchableOpacity>
          {p2Open ? players.map(p => (
            <TouchableOpacity
              key={p.id}
              style={S.playerSelectorOption}
              onPress={() => { setP2(p); if (p1?.id === p.id) setP1(null); setP2Open(false); }}
            >
              <Text style={S.playerSelectorOptionTxt}>{p.name}</Text>
            </TouchableOpacity>
          )) : null}
        </View>

        <Btn
          label="✓  CHOOSE THIS CASE"
          onPress={() => onConfirm(sortedCases[idx], p1, p2)}
          disabled={isSpinning || !canConfirm}
          style={{ marginTop: 16 }}
        />
        <Btn
          label={isSpinning ? '🦊  ARGUS CHOOSES...' : '🎲  RANDOM'}
          variant="secondary"
          onPress={handleRandom}
          disabled={isSpinning}
          style={{ marginBottom: 40 }}
        />
      </ScrollView>
    </View>
  );
};

// ── Privacy pass-phone cover ───────────────────────────────────────────────

export const PassScreen = ({ name, onReady }) => (
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

// ── Corner Time: 60-second planning window before each debate turn ─────────
// Gives players a moment to read their move cards and plan their argument.
// Auto-advances when the 60s countdown expires; player can also skip early.

export const CornerTimeScreen = ({ player, moves, onReady }) => {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const intervalRef = useRef(null);
  const calledReady = useRef(false);

  const fireReady = () => {
    if (calledReady.current) return;
    calledReady.current = true;
    clearInterval(intervalRef.current);
    onReady();
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) { clearInterval(intervalRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) fireReady();
  }, [secondsLeft]);

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ height: 4, backgroundColor: C.border }}>
        <View style={{ width: `${Math.round(secondsLeft / 60 * 100)}%`, height: 4, backgroundColor: C.teal }} />
      </View>

      <ScrollView contentContainerStyle={[S.scrollContent, { paddingTop: 40, paddingBottom: 48 }]}>
        <Text style={S.screenLabel}>CORNER TIME  ·  {secondsLeft}s</Text>

        <View style={[S.playerChip, { backgroundColor: C.teal, marginVertical: 12 }]}>
          <Text style={[S.playerChipTxt, { color: '#0D0F1C' }]}>{player.name.toUpperCase()}</Text>
        </View>

        <Image
          source={require('./argus_confident.png')}
          style={{ width: CARD_W * 0.44, height: CARD_W * 0.44, resizeMode: 'contain', alignSelf: 'center', marginBottom: 8 }}
        />

        <Text style={[S.hint, { marginBottom: 24 }]}>
          Read your move cards.{'\n'}Jot a note. Plan your argument.
        </Text>

        {moves.length > 0 ? (
          <>
            <Text style={[S.screenLabel, { marginBottom: 12 }]}>YOUR MOVE CARDS</Text>
            {moves.map(card => <MoveCardView key={card.id} card={card} />)}
          </>
        ) : null}

        <Btn
          label="I'M READY  →"
          onPress={fireReady}
          style={{ marginTop: 24 }}
        />
      </ScrollView>
    </View>
  );
};

// ── Debate: depleting progress bar + dealt move card picker ───────────────
// moves: Card[] — each player's own 2 dealt cards (or 1 for daily mode)
// debateSecs: total seconds for this player's turn (configurable from Account)
// onDone(selectedMove | null) hands control back to the parent.

export const DebateScreen = ({ caseCard, player, nextPlayerName, moves, debateSecs = DEFAULT_DEBATE_SECS, onDone }) => {
  const [secondsLeft, setSecondsLeft] = useState(debateSecs);
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

  const movePickerLabel = moves.length === 1
    ? 'YOUR MOVE CARD — slip it in any time for +1 bonus  ⭐'
    : 'YOUR MOVE CARDS — slip one in any time for +1 bonus  ⭐';

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      {/* Depleting progress bar — starts full, empties as time runs out */}
      <View style={{ height: 5, backgroundColor: C.border, width: '100%' }}>
        <View style={{
          width: debateSecs > 0 ? `${Math.round(secondsLeft / debateSecs * 100)}%` : '0%',
          height: 5,
          backgroundColor: tColor,
        }} />
      </View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface }}>
        <View style={[S.playerChip, { backgroundColor: C.teal }]}>
          <Text style={[S.playerChipTxt, { color: '#0D0F1C' }]}>{player.name.toUpperCase()}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={S.scrollContent} showsVerticalScrollIndicator={false}>
        <CaseBanner card={caseCard} />

        <View style={S.scoringHint}>
          <Text style={S.scoringHintTxt}>
            ⚔️  1 pt for winning  ·  ⭐ +1 bonus if you slip in a move
          </Text>
        </View>

        {moves.length > 0 ? (
          <>
            <Text style={[S.screenLabel, { marginTop: 20 }]}>{movePickerLabel}</Text>
            {moves.map(card => {
              const selected = selectedMove?.id === card.id;
              const dimmed = selectedMove !== null && !selected;
              return (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => toggleMove(card)}
                  activeOpacity={0.88}
                  style={[
                    { marginVertical: 6, borderRadius: 22, borderWidth: 2.5, borderColor: 'transparent' },
                    selected && {
                      borderColor: card.accent,
                      shadowColor: card.accent,
                      shadowOpacity: 0.5,
                      shadowRadius: 14,
                      shadowOffset: { width: 0, height: 4 },
                    },
                    dimmed && { opacity: 0.4 },
                  ]}
                >
                  <MoveCardView card={card} />
                  {selected ? (
                    <View style={{
                      position: 'absolute', top: 14, right: 14,
                      backgroundColor: card.accent, borderRadius: 14,
                      paddingHorizontal: 12, paddingVertical: 5,
                    }}>
                      <Text style={{ color: '#0D0F1C', fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>
                        ✓ USING
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </>
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
                ? `Your argument is on record.\nThe floor passes to ${nextPlayerName}.`
                : `${player.name} has spoken.\nThe Parlour awaits your verdict.`}
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

// ── Round end: next round or score the game ────────────────────────────────

export const RoundEndScreen = ({ currentRound, defaultRounds, player1, player2, onNextRound, onEndGame }) => (
  <View style={S.screen}>
    <Text style={[S.screenLabel, { marginBottom: 8 }]}>ROUND {currentRound} COMPLETE</Text>
    <Text style={S.heroTitle}>WELL{'\n'}ARGUED.</Text>
    <Text style={[S.hint, { marginTop: 16 }]}>
      Both sides have spoken.{'\n'}The Parlour awaits your verdict.
    </Text>
    <Btn label={`⚔️  PLAY ROUND ${currentRound + 1}`} onPress={onNextRound} style={{ marginTop: 40 }} />
    <Btn label="🏆  END GAME & SCORE" variant="secondary" onPress={onEndGame} />
    {defaultRounds > 1 ? (
      <Text style={[S.hint, { marginTop: 16 }]}>Default: {defaultRounds} rounds per game</Text>
    ) : null}
  </View>
);

// ── Points: multi-round scoring + grand totals ─────────────────────────────

export const PointsScreen = ({ player1, player2, roundHistory, caseCard, onSave }) => {
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

          {(round.p1Move || round.p2Move) ? (
            <View style={S.moveRevealRow}>
              {round.p1Move ? (
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={S.moveRevealName}>{player1.name}</Text>
                  <MoveCardView card={round.p1Move} compact />
                </View>
              ) : null}
              {round.p1Move && round.p2Move ? <Text style={S.vsLabel}>VS</Text> : null}
              {round.p2Move ? (
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={S.moveRevealName}>{player2.name}</Text>
                  <MoveCardView card={round.p2Move} compact />
                </View>
              ) : null}
            </View>
          ) : null}

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

      <View style={[S.pointsSection, { backgroundColor: '#1A1500', borderColor: '#F5C84244', marginBottom: 8 }]}>
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
          <Text style={[S.screenTitle, { marginTop: 16, color: C.text }]}>🏆  VERDICT: {winner}.</Text>
        ) : (p1Total > 0 || p2Total > 0) ? (
          <Text style={[S.screenTitle, { marginTop: 16, color: C.muted }]}>THE PARLOUR CALLS A DRAW.</Text>
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

// ── Solo Dojo ──────────────────────────────────────────────────────────────
// completedDrills: string[] — card IDs the player has fully drilled at least once
// onComplete(cardId)        — called when both steps of a drill are finished

export const SoloDojoScreen = ({ completedDrills, onComplete }) => {
  const [view, setView]               = useState('select'); // 'select' | 'drill'
  const [currentCard, setCurrentCard] = useState(null);
  const [step, setStep]               = useState(0);          // 0 or 1
  const [phase, setPhase]             = useState('question'); // 'question' | 'feedback' | 'complete'
  const [selectedOption, setSelectedOption] = useState(null);
  const [wasCorrect, setWasCorrect]   = useState(false);

  const bronzeCards = MOVE_CARDS.filter(c => c.tier === 'BRONZE');
  const silverCards = MOVE_CARDS.filter(c => c.tier === 'SILVER');
  const goldCards   = MOVE_CARDS.filter(c => c.tier === 'GOLD');

  const allBronzeDone = bronzeCards.every(c => completedDrills.includes(c.id));
  const allSilverDone = silverCards.every(c => completedDrills.includes(c.id));

  const isUnlocked = card => {
    if (card.tier === 'BRONZE') return true;
    if (card.tier === 'SILVER') return allBronzeDone;
    return allBronzeDone && allSilverDone;
  };

  const startDrill = card => {
    setCurrentCard(card);
    setStep(0);
    setPhase('question');
    setSelectedOption(null);
    setWasCorrect(false);
    setView('drill');
  };

  const handleOption = idx => {
    if (phase !== 'question') return;
    const correct = DRILLS[currentCard.id].steps[step].correct === idx;
    setSelectedOption(idx);
    setWasCorrect(correct);
    setPhase('feedback');
  };

  const handleNext = () => {
    if (step === 0) {
      setStep(1);
      setPhase('question');
      setSelectedOption(null);
      setWasCorrect(false);
    } else {
      onComplete(currentCard.id);
      setPhase('complete');
    }
  };

  const handleBack = () => {
    setView('select');
    setCurrentCard(null);
  };

  // ── Selection view ─────────────────────────────────────────────────────────

  if (view === 'select') {
    const renderTier = (label, cards) => (
      <>
        <View style={S.dojoTierHeader}>
          <View style={S.dojoTierLine} />
          <Text style={S.dojoTierLabel}>{label}</Text>
          <View style={S.dojoTierLine} />
        </View>
        {cards.map(card => {
          const unlocked = isUnlocked(card);
          const done = completedDrills.includes(card.id);
          return (
            <TouchableOpacity
              key={card.id}
              style={[S.dojoRow, done && S.dojoRowDone, !unlocked && S.dojoRowLocked]}
              onPress={() => unlocked && startDrill(card)}
              activeOpacity={unlocked ? 0.8 : 1}
            >
              <Text style={S.dojoRowIcon}>{card.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={S.dojoRowName}>{card.name}</Text>
                <Text style={S.dojoRowInspo}>{card.inspiration}</Text>
              </View>
              <Text style={S.dojoRowStatus}>{!unlocked ? '🔒' : done ? '✅' : '▶'}</Text>
            </TouchableOpacity>
          );
        })}
      </>
    );

    return (
      <ScrollView
        contentContainerStyle={[S.scrollContent, { paddingTop: 70, paddingBottom: 48 }]}
        style={{ backgroundColor: C.bg }}
      >
        <Text style={S.screenLabel}>TRAINING WITH ARGUS</Text>
        <Text style={S.screenTitle}>SOLO DOJO</Text>
        <Text style={[S.hint, { marginBottom: 4 }]}>
          Pick a move card to drill alone.{'\n'}Argus will challenge you!
        </Text>
        <Image
          source={require('./argus_confident.png')}
          style={{ width: CARD_W, height: CARD_W * 0.66, resizeMode: 'contain', marginBottom: 8, opacity: 0.92 }}
        />

        {renderTier('BRONZE · NOVICE', bronzeCards)}
        {renderTier('SILVER · TACTICIAN & STORYTELLER', silverCards)}
        {renderTier('GOLD · ORATOR & MASTER', goldCards)}

        {!allBronzeDone ? (
          <Text style={[S.hint, { marginTop: 20 }]}>
            Complete all BRONZE drills to unlock SILVER
          </Text>
        ) : !allSilverDone ? (
          <Text style={[S.hint, { marginTop: 20 }]}>
            Complete all SILVER drills to unlock GOLD
          </Text>
        ) : (
          <Text style={[S.hint, { marginTop: 20, color: C.gold }]}>
            All tiers mastered. Argus calls you a worthy debater.
          </Text>
        )}
      </ScrollView>
    );
  }

  // ── Drill view ─────────────────────────────────────────────────────────────

  const drill = DRILLS[currentCard?.id];
  if (!drill) return null;
  const currentStep = drill.steps[step];

  if (phase === 'complete') {
    return (
      <View style={S.screen}>
        <Text style={{ fontSize: 72, marginBottom: 16 }}>⭐</Text>
        <Text style={S.screenTitle}>{currentCard.name}</Text>
        <Text style={[S.heroTagline, { marginTop: 8 }]}>
          Verdict: mastered.{'\n'}The Parlour notes your progress.
        </Text>
        <Btn label="← BACK TO DOJO" onPress={handleBack} style={{ marginTop: 32 }} />
      </View>
    );
  }

  const letters = ['A', 'B', 'C'];

  const optionStyle = idx => {
    if (phase === 'question') return S.drillOption;
    if (idx === currentStep.correct) return [S.drillOption, S.drillOptionCorrect];
    if (idx === selectedOption && !wasCorrect) return [S.drillOption, S.drillOptionWrong];
    return [S.drillOption, { opacity: 0.4 }];
  };

  const letterStyle = idx => {
    if (phase === 'question') return [S.drillOptionLetter];
    if (idx === currentStep.correct) return [S.drillOptionLetter, { backgroundColor: '#15803D' }];
    if (idx === selectedOption && !wasCorrect) return [S.drillOptionLetter, { backgroundColor: '#9B1C1C' }];
    return [S.drillOptionLetter];
  };

  const letterTxtStyle = idx => {
    if (phase !== 'question' && (idx === currentStep.correct || (idx === selectedOption && !wasCorrect))) {
      return [S.drillOptionLetterTxt, { color: '#E8DFC8' }];
    }
    return S.drillOptionLetterTxt;
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={[S.scrollContent, { paddingTop: 60, paddingBottom: 40 }]}>
        <TouchableOpacity
          onPress={handleBack}
          style={{ alignSelf: 'flex-start', marginBottom: 16, padding: 4 }}
        >
          <Text style={{ color: C.muted, fontSize: 13, fontWeight: '700', letterSpacing: 1 }}>
            ← DOJO
          </Text>
        </TouchableOpacity>

        <View style={S.drillStepPip}>
          <View style={[S.drillPip, step === 0 && S.drillPipActive]} />
          <View style={[S.drillPip, step === 1 && S.drillPipActive]} />
          <Text style={[S.hint, { marginLeft: 8, marginBottom: 0, fontStyle: 'normal' }]}>
            Step {step + 1} of 2
          </Text>
        </View>

        <Text style={[S.screenLabel, { marginBottom: 12 }]}>
          {currentCard.icon}  {currentCard.name}
        </Text>

        <View style={S.argusBubble}>
          <View style={S.argusBubbleHeader}>
            <Image
              source={require('./argus_main_icon.png')}
              style={{ width: 44, height: 44, borderRadius: 10, marginRight: 10 }}
            />
            <Text style={S.argusName}>ARGUS</Text>
          </View>
          <Text style={S.argusSpeech}>{currentStep.argus}</Text>
        </View>

        <Text style={S.drillQuestion}>{currentStep.question}</Text>

        {currentStep.options.map((opt, idx) => (
          <TouchableOpacity
            key={idx}
            style={optionStyle(idx)}
            onPress={() => handleOption(idx)}
            activeOpacity={phase === 'question' ? 0.8 : 1}
          >
            <View style={letterStyle(idx)}>
              <Text style={letterTxtStyle(idx)}>{letters[idx]}</Text>
            </View>
            <Text style={S.drillOptionTxt}>{opt}</Text>
          </TouchableOpacity>
        ))}

        {phase === 'feedback' ? (
          <>
            <View style={[S.drillFeedback, wasCorrect ? S.drillFeedbackOk : S.drillFeedbackOops]}>
              <Text style={S.drillFeedbackTxt}>
                {wasCorrect ? currentStep.feedbackOk : currentStep.feedbackOops}
              </Text>
            </View>
            <Btn
              label={step === 0 ? 'NEXT STEP  →' : '⭐  COMPLETE DRILL'}
              onPress={handleNext}
              style={{ marginTop: 12 }}
            />
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};
