import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Animated, Dimensions,
  TextInput, KeyboardAvoidingView, Platform, Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CARD_W, DEFAULT_DEBATE_SECS, MOVE_CARDS, sortedCases, getMergedCases, formatTime, timerColor } from './data';
import { DRILLS, DRILLS_LEGACY } from './drills';
import { C, S } from './styles';
import { Btn, ToggleRow, MoveCardView, CaseCardView, CaseBanner, HandPanel } from './components';

const { width: SCREEN_W } = Dimensions.get('window');

// Graceful degradation: expo-av enables voice recording; falls back to install prompt if absent

// ── History helpers ────────────────────────────────────────────────────────
// Determine the current player's result for a saved game entry.
// myName = players[0].name (first registered player = "you").
const getResult = (h, myName) => {
  if (!myName || !h.winner) return null;
  return h.winner === myName ? 'WIN' : 'LOSS';
};
const resultColor = r => r === 'WIN' ? '#4ADE80' : r === 'LOSS' ? '#FC8181' : '#F5C842';

const HistoryEntry = ({ item, myName }) => {
  const result = getResult(item, myName);
  const rc = result ? resultColor(result) : null;
  return (
    <View style={S.historyItem}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <Text style={[S.historyCase, { flex: 1, marginBottom: 0 }]}>{item.case}</Text>
        {rc ? (
          <View style={{ marginLeft: 8, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, borderWidth: 1, borderColor: rc }}>
            <Text style={{ fontSize: 10, fontWeight: '900', color: rc, letterSpacing: 1.5 }}>{result}</Text>
          </View>
        ) : null}
      </View>
      {item.winner ? (
        <View style={S.historyScores}>
          <Text style={S.historyScore}>🏆  {item.winner} won</Text>
        </View>
      ) : null}
      <Text style={S.historyDate}>{item.date}</Text>
    </View>
  );
};

// ── Home ───────────────────────────────────────────────────────────────────
// dailyDraw: { caseCard, cards: Card[] } — pre-seeded by today's date

export const HomeScreen = ({ dailyDraw, onPlayDaily, history = [], myName }) => (
  <ScrollView
    contentContainerStyle={[S.scrollContent, { paddingTop: 60, paddingBottom: 40 }]}
    style={{ backgroundColor: C.bg }}
  >
    <Text style={S.heroTitle}>THE{'\n'}DEBATER'S{'\n'}GAMBIT</Text>
    <Text style={S.heroTagline}>Words are your weapons.{'\n'}Wit is your armor.</Text>

    {/* Daily Quick Draw card */}
    <TouchableOpacity
      style={S.dailyCard}
      onPress={onPlayDaily}
      activeOpacity={0.85}
    >
      <Text style={S.dailyLabel}>TODAY'S QUICK DRAW</Text>
      <Text style={S.dailyCaseTitle} numberOfLines={2}>
        {dailyDraw.caseCard.title}
      </Text>
      <View style={S.dailyDivider} />
      <Text style={S.dailyMoveLabel}>TODAY'S CARDS</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 4, marginBottom: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        {dailyDraw.cards.map(card => (
          <View
            key={card.id}
            style={{
              borderRadius: 8, borderWidth: 1.5, borderColor: card.accent,
              backgroundColor: card.bg, paddingHorizontal: 10, paddingVertical: 5,
              flexDirection: 'row', alignItems: 'center', gap: 4,
            }}
          >
            <Text style={{ fontSize: 14 }}>{card.icon}</Text>
            <Text style={{ color: card.accent, fontWeight: '800', fontSize: 11, letterSpacing: 0.5 }}>
              {card.name}
            </Text>
          </View>
        ))}
      </View>
      <View style={S.dailyPlayBtn}>
        <Text style={S.dailyPlayBtnTxt}>▶  START QUICK DRAW</Text>
      </View>
    </TouchableOpacity>

    <Text style={[S.hint, { marginTop: 20 }]}>Step into the Parlour — tap ⚔️ VS to pick your case</Text>

    {history.length > 0 ? (
      <>
        <View style={[S.sectionDivider, { marginTop: 28 }]} />
        <Text style={[S.screenTitle, { marginTop: 8 }]}>HISTORY</Text>
        {history.map(h => (
          <HistoryEntry key={h.id} item={h} myName={myName} />
        ))}
      </>
    ) : null}
  </ScrollView>
);

// ── Quick Draw — solo creative challenge ──────────────────────────────────
// caseCard: the day's case card
// cards: Card[] — 3 move/hazard cards dealt for this draw
// onDone() — called when the player finishes (all cards used or exits)

export const QuickDrawScreen = ({ caseCard, cards, onDone }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [usedIds, setUsedIds]       = useState([]);
  const allUsed = usedIds.length === cards.length;

  const handleSelect = id => {
    if (usedIds.includes(id)) return;
    setSelectedId(prev => (prev === id ? null : id));
  };

  const handleConfirm = () => {
    if (!selectedId) return;
    setUsedIds(prev => [...prev, selectedId]);
    setSelectedId(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={[S.scrollContent, { paddingTop: 56, paddingBottom: 60 }]}>
        <Text style={{ color: C.teal, fontWeight: '900', fontSize: 11, letterSpacing: 2, marginBottom: 6 }}>
          ⚡ QUICK DRAW
        </Text>
        <Text style={{ fontSize: 22, fontWeight: '900', color: C.gold, textAlign: 'center', letterSpacing: 1, lineHeight: 30, marginBottom: 20 }}>
          Argue the case.{'\n'}Use your cards.
        </Text>

        {/* Case card */}
        <View style={S.caseBanner}>
          <Text style={S.caseBannerLabel}>THE CASE</Text>
          <Text style={S.caseBannerTitle}>{caseCard.title}</Text>
          <Text style={S.caseBannerDesc}>{caseCard.description}</Text>
        </View>

        <Text style={[S.screenLabel, { marginTop: 24, marginBottom: 12 }]}>
          {usedIds.length}/{cards.length} CARDS USED
        </Text>

        {/* Cards */}
        {cards.map(card => {
          const used     = usedIds.includes(card.id);
          const selected = selectedId === card.id;
          return (
            <TouchableOpacity
              key={card.id}
              onPress={() => handleSelect(card.id)}
              activeOpacity={used ? 1 : 0.88}
              style={[
                { marginVertical: 6, borderRadius: 22, borderWidth: 2.5, borderColor: 'transparent' },
                selected && { borderColor: card.accent, shadowColor: card.accent, shadowOpacity: 0.5, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } },
                used && { opacity: 0.35 },
              ]}
            >
              <MoveCardView card={card} />
              {selected ? (
                <View style={{ position: 'absolute', top: 14, right: 14, backgroundColor: card.accent, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5 }}>
                  <Text style={{ color: '#0D0F1C', fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>✓ USING</Text>
                </View>
              ) : null}
              {used ? (
                <View style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                  <View style={{ backgroundColor: 'rgba(13,15,28,0.7)', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 6 }}>
                    <Text style={{ color: '#4ADE80', fontWeight: '900', fontSize: 12, letterSpacing: 2 }}>✓ USED</Text>
                  </View>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}

        {/* Confirm / done button */}
        {allUsed ? (
          <>
            <View style={{ marginTop: 24, marginBottom: 8, padding: 16, backgroundColor: '#071A07', borderRadius: 16, borderWidth: 1.5, borderColor: '#4ADE80' }}>
              <Text style={{ color: '#4ADE80', fontWeight: '900', fontSize: 14, textAlign: 'center', letterSpacing: 1, lineHeight: 22 }}>
                All cards played.{'\n'}The Parlour notes your argument.
              </Text>
            </View>
            <Btn label="FINISH  →" onPress={onDone} style={{ marginTop: 8 }} />
          </>
        ) : (
          <>
            <Btn
              label={selectedId ? '✓  CONFIRM — I USED THIS CARD' : 'Tap a card to use it'}
              onPress={handleConfirm}
              disabled={!selectedId}
              style={{ marginTop: 24, opacity: selectedId ? 1 : 0.5 }}
            />
            <Btn label="Exit Draw" variant="secondary" onPress={onDone} style={{ marginTop: 4 }} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

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
        <Text style={{ color: C.gold }}>Choose a Case</Text> — pick the debate topic and select both players from the dropdowns. The first player listed argues first.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>2</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Get your hand</Text> — each player is dealt cards from the full deck. There are six types:{'\n'}
        {'  '}⚔️  <Text style={{ color: C.gold }}>Move cards</Text> — rhetorical techniques (Fair Play, Honest Tale…). Play one during your argument turn.{'\n'}
        {'  '}⚡  <Text style={{ color: C.gold }}>Hazard cards</Text> — played against your opponent before their turn to restrict how they argue.{'\n'}
        {'  '}🛡️  <Text style={{ color: C.gold }}>Counter cards</Text> — interrupt your opponent after they argue and deliver a rebuttal.{'\n'}
        {'  '}🃏  <Text style={{ color: C.gold }}>Joker cards</Text> — cancel a hazard that was played against you, freeing you to argue without the restriction.{'\n'}
        {'  '}⏭️  <Text style={{ color: C.gold }}>Filibuster cards</Text> — skip your turn entirely. Can only be played if your opponent did not play a hazard against you.{'\n'}
        {'  '}📋  <Text style={{ color: C.gold }}>Delegate cards</Text> — your opponent must argue your side of the case for your turn. You can also hand them a move card they must follow. Works even if a hazard is active.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>3</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Each turn has three phases</Text> — (1) <Text style={{ color: C.gold }}>Hazard Window</Text>: opponent may play a hazard card against you. (2) <Text style={{ color: C.gold }}>Argument</Text>: you debate and choose how to play — a move card, a joker to cancel the hazard, a filibuster to skip your turn, or a delegate card to pass your turn to your opponent. (3) <Text style={{ color: C.gold }}>Counter Window</Text>: opponent has 15 seconds to play a counter card for a rebuttal — then you get a 30-second comeback. At end of turn you may exchange one card.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>4</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Win</Text> — be the first to have zero cards at the start of your turn. Use every card in your hand to win. No scoring — just outwit your opponent.
      </Text>
    </View>

    <View style={S.helpDivider} />
    <Text style={[S.screenTitle, { marginTop: 8 }]}>SOLO DOJO</Text>
    <Text style={S.helpBody}>
      The Solo Dojo is where you train alone with{' '}
      <Text style={{ color: C.gold, fontStyle: 'italic' }}>Argus</Text>{' '}
      — the fox barrister. Pick any unlocked move card from the list, and Argus walks you through it in five steps.
    </Text>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>1</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Understand</Text> — Argus explains the move and why it works, with examples drawn from history's sharpest minds.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>2</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Feel it</Text> — You explore the emotion behind the move: why it matters, what it does to the person hearing it.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>3</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>See it</Text> — Argus shows the move in a real argument. You identify what makes it work.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>4</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Build it</Text> — You construct a full response using the move technique, step by step.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>5</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Say it</Text> — A model response appears on screen. You have 15 seconds to say it out loud. Say it like you mean it.
      </Text>
    </View>
    <Text style={S.helpBody}>
      <Text style={{ color: C.teal }}>BRONZE</Text> cards are always available.{' '}
      <Text style={{ color: '#C0C0C0' }}>SILVER</Text> unlocks when all 8 Bronze are mastered.{' '}
      <Text style={{ color: '#ECC94B' }}>GOLD</Text> unlocks when both Silver are done. All drills can be replayed anytime.
    </Text>

    <View style={S.helpDivider} />
    <Text style={[S.screenTitle, { marginTop: 8 }]}>QUICK DRAW</Text>
    <Text style={S.helpBody}>
      Every day the home screen deals a fresh challenge — one Case Card and three
      play cards (move or hazard), seeded from the date. Everyone gets the same
      draw on the same day.
    </Text>
    <Text style={S.helpBody}>
      Tap <Text style={{ color: C.gold }}>▶ Start Quick Draw</Text> to begin.
      No opponent, no timer — just you and your creativity. Argue the case using
      the cards as your tools.
    </Text>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>1</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Read the case</Text> — it's your prompt. Argue for it, against it, or sideways. Creativity counts.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>2</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Tap a card to select it</Text> — it highlights to show you're using it.
        Press <Text style={{ color: C.gold }}>Confirm</Text> to mark it as played.
      </Text>
    </View>
    <View style={S.helpRule}>
      <Text style={S.helpRuleNum}>3</Text>
      <Text style={S.helpRuleText}>
        <Text style={{ color: C.gold }}>Use all three cards</Text> — when the last one is confirmed, the Quick Draw is complete. You can use them one by one or all at once.
      </Text>
    </View>
  </ScrollView>
);

// ── Account ────────────────────────────────────────────────────────────────

export const AccountScreen = ({ players, onAdd, onRemove, debateSecs, onDebateSecsChange, cardsPerPlayer, onCardsPerPlayerChange, history, isOnboarding, myName }) => {
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
            <Text style={S.settingLabel}>DEBATE TIME</Text>
            <Text style={S.settingSubLabel}>Seconds per player turn</Text>
          </View>
          <View style={S.stepper}>
            <TouchableOpacity
              style={S.stepBtn}
              onPress={() => onDebateSecsChange(Math.max(30, debateSecs - 30))}
            >
              <Text style={S.stepBtnTxt}>−</Text>
            </TouchableOpacity>
            <Text style={S.stepValue}>{formatTime(debateSecs)}</Text>
            <TouchableOpacity
              style={S.stepBtn}
              onPress={() => onDebateSecsChange(Math.min(900, debateSecs + 30))}
            >
              <Text style={S.stepBtnTxt}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={S.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={S.settingLabel}>CARDS PER PLAYER</Text>
            <Text style={S.settingSubLabel}>Cards dealt to each player in VS mode</Text>
          </View>
          <View style={S.stepper}>
            <TouchableOpacity
              style={S.stepBtn}
              onPress={() => onCardsPerPlayerChange(Math.max(1, cardsPerPlayer - 1))}
            >
              <Text style={S.stepBtnTxt}>−</Text>
            </TouchableOpacity>
            <Text style={S.stepValue}>{cardsPerPlayer}</Text>
            <TouchableOpacity
              style={S.stepBtn}
              onPress={() => onCardsPerPlayerChange(Math.min(5, cardsPerPlayer + 1))}
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
              <HistoryEntry key={h.id} item={h} myName={myName} />
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

export const CasePickScreen = ({ players, onConfirm, cases = sortedCases, remoteLabel = null }) => {
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
    if (!isSpinning && idx < cases.length - 1) slide(1, () => setIdx(i => i + 1));
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
    const targetIdx = Math.floor(Math.random() * cases.length);
    const stepsToTarget = (targetIdx - idx + cases.length) % cases.length;
    const totalSteps = 2 * cases.length + (stepsToTarget || cases.length);
    let step = 0; let cur = idx;
    setIsSpinning(true);
    const spin = () => {
      if (!isMounted.current) return;
      cur = (cur + 1) % cases.length;
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

  const speaksFirstHint = p1 && p2
    ? `${p1.name} speaks first, then ${p2.name}`
    : 'Select both players to begin';

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={S.browserHeader}>
        <Text style={S.screenTitle}>CHOOSE A CASE</Text>
        {remoteLabel ? (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 6 }}>
            <View style={{ backgroundColor: '#0D2F2C', borderWidth: 1, borderColor: '#2ECFB0', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 }}>
              <Text style={{ color: '#2ECFB0', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }}>✨ {remoteLabel.toUpperCase()}</Text>
            </View>
          </View>
        ) : null}
        <View style={S.dots}>
          {cases.map((_, i) => (
            <View key={i} style={[S.dot, i === idx && S.dotActive]} />
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={S.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Player selection — at the top so players are set before browsing */}
        <View style={{ width: CARD_W, marginBottom: 16 }}>
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

          <View style={{ height: 10 }} />

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

          <Text style={[S.hint, { marginTop: 10, textAlign: 'center' }]}>{speaksFirstHint}</Text>
        </View>

        <Animated.View
          style={{ transform: [{ translateX }], width: CARD_W }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <CaseCardView card={cases[idx]} />
        </Animated.View>

        <View style={S.navRow}>
          <TouchableOpacity
            onPress={goPrev}
            disabled={idx === 0 || isSpinning}
            style={[S.navArrow, (idx === 0 || isSpinning) && { opacity: 0.25 }]}
          >
            <Text style={S.navArrowTxt}>‹  PREV</Text>
          </TouchableOpacity>
          <Text style={S.navCounter}>{idx + 1} / {cases.length}</Text>
          <TouchableOpacity
            onPress={goNext}
            disabled={idx === cases.length - 1 || isSpinning}
            style={[S.navArrow, (idx === cases.length - 1 || isSpinning) && { opacity: 0.25 }]}
          >
            <Text style={S.navArrowTxt}>NEXT  ›</Text>
          </TouchableOpacity>
        </View>

        <Btn
          label="✓  CHOOSE THIS CASE"
          onPress={() => onConfirm(cases[idx], p1, p2)}
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

export const CornerTimeScreen = ({ player, cards = [], moves, activeHazard = null, onReady }) => {
  // `cards` is the new unified prop; `moves` kept for backward-compat (daily flow)
  const allCards = cards.length > 0 ? cards : (moves || []);
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

        <Text style={{ fontSize: 28, fontWeight: '900', color: '#F5C842', textAlign: 'center', letterSpacing: 1, lineHeight: 38, marginTop: 8, marginBottom: 16 }}>
          Prepare your case,{'\n'}{player.name}
        </Text>

        <Image
          source={require('./argus_confident.png')}
          style={{ width: CARD_W * 0.44, height: CARD_W * 0.44, resizeMode: 'contain', alignSelf: 'center', marginBottom: 16 }}
        />

        {activeHazard ? (
          <View style={{ backgroundColor: '#2A1000', borderRadius: 12, borderWidth: 1.5, borderColor: activeHazard.accent, padding: 14, marginBottom: 14 }}>
            <Text style={{ color: activeHazard.accent, fontWeight: '900', fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>⚡ HAZARD IN EFFECT</Text>
            <Text style={{ color: '#E8DFC8', fontWeight: '800', fontSize: 15, marginBottom: 4 }}>{activeHazard.name}</Text>
            <Text style={{ color: '#E8DFC8', fontSize: 13, opacity: 0.85 }}>{activeHazard.what}</Text>
          </View>
        ) : null}

        {allCards.length > 0 ? (
          <>
            <Text style={[S.screenLabel, { marginBottom: 12 }]}>YOUR CARDS</Text>
            {allCards.map(card => <MoveCardView key={card.id} card={card} />)}
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

// ── Debate: depleting progress bar + move card picker ─────────────────────
// hand: Card[] — player's full hand; only move cards are shown/playable here
// activeHazard: Card | null — hazard played by opponent before this turn
// debateSecs: total seconds for this player's turn (configurable from Account)
// onDone(moveCard, hazardFollowed) — move used + whether the active hazard was followed

export const DebateScreen = ({
  caseCard, player, nextPlayerName,
  hand = [], activeHazard = null,
  debateSecs = DEFAULT_DEBATE_SECS,
  onDone,
}) => {
  // Honour "30 SECONDS" hazard by capping the clock
  const effectiveSecs = activeHazard?.restrictDebateSecs
    ? Math.min(activeHazard.restrictDebateSecs, debateSecs)
    : debateSecs;

  const moveCards       = hand.filter(c => c.cardType === 'move');
  const hazardCards     = hand.filter(c => c.cardType === 'hazard');
  const jokerCards      = hand.filter(c => c.cardType === 'joker');
  const filibusterCards = hand.filter(c => c.cardType === 'filibuster');
  const delegateCards   = hand.filter(c => c.cardType === 'delegate');

  const [secondsLeft, setSecondsLeft] = useState(effectiveSecs);
  const [selectedMove,         setSelectedMove]         = useState(null);
  const [selectedHazard,       setSelectedHazard]       = useState(null);
  const [selectedJoker,        setSelectedJoker]        = useState(null);
  const [selectedFilibuster,   setSelectedFilibuster]   = useState(null);
  const [selectedDelegate,     setSelectedDelegate]     = useState(null);
  const [selectedDelegateMove, setSelectedDelegateMove] = useState(null);
  const [hazardFollowed, setHazardFollowed] = useState(false);
  const intervalRef = useRef(null);
  const calledRef   = useRef(false);

  const toggleFilibuster = c => {
    setSelectedFilibuster(prev => prev?.id === c.id ? null : c);
    setSelectedDelegate(null);
    setSelectedDelegateMove(null);
    setSelectedMove(null);
  };
  const toggleDelegate = c => {
    setSelectedDelegate(prev => prev?.id === c.id ? null : c);
    setSelectedFilibuster(null);
    setSelectedMove(null);
    setSelectedDelegateMove(null);
  };

  const finish = (move, followed, timedOut = false) => {
    if (calledRef.current) return;
    calledRef.current = true;
    clearInterval(intervalRef.current);
    onDone(move, followed, selectedHazard, timedOut, selectedJoker, selectedFilibuster, selectedDelegate, selectedDelegateMove);
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

  // Auto-submit when the clock hits zero; timedOut=true triggers a penalty card in App.js
  useEffect(() => {
    if (secondsLeft === 0) finish(selectedMove, hazardFollowed, true);
  }, [secondsLeft]);

  const tColor = timerColor(secondsLeft);
  const toggleMove = c => setSelectedMove(prev => (prev?.id === c.id ? null : c));

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ height: 5, backgroundColor: C.border }}>
        <View style={{ width: effectiveSecs > 0 ? `${Math.round(secondsLeft / effectiveSecs * 100)}%` : '0%', height: 5, backgroundColor: tColor }} />
      </View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface }}>
        <View style={[S.playerChip, { backgroundColor: C.teal }]}>
          <Text style={[S.playerChipTxt, { color: '#0D0F1C' }]}>{player.name.toUpperCase()}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={S.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 28, fontWeight: '900', color: C.gold, textAlign: 'center', letterSpacing: 1, lineHeight: 38, marginTop: 8, marginBottom: 16 }}>
          State your case,{'\n'}{player.name}
        </Text>

        {/* Active hazard restriction banner + joker cancel OR compliance confirm */}
        {activeHazard ? (
          <>
            <View style={{ backgroundColor: '#2A1000', borderRadius: 12, borderWidth: 1.5, borderColor: activeHazard.accent, padding: 14, marginBottom: 10 }}>
              <Text style={{ color: activeHazard.accent, fontWeight: '900', fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>⚡ HAZARD IN EFFECT</Text>
              <Text style={{ color: '#E8DFC8', fontWeight: '800', fontSize: 15, marginBottom: 4 }}>{activeHazard.name}</Text>
              <Text style={{ color: '#E8DFC8', fontSize: 13, opacity: 0.85 }}>{activeHazard.what}</Text>
            </View>

            {/* Joker cards — cancel the hazard */}
            {jokerCards.length > 0 ? (
              <>
                <Text style={[S.screenLabel, { marginBottom: 4 }]}>🃏 PLAY A JOKER TO CANCEL</Text>
                <Text style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Play one to cancel this hazard — or ignore it and follow the hazard below.</Text>
                {jokerCards.map(card => {
                  const sel = selectedJoker?.id === card.id;
                  return (
                    <TouchableOpacity
                      key={card.id}
                      onPress={() => setSelectedJoker(prev => prev?.id === card.id ? null : card)}
                      activeOpacity={0.88}
                      style={[
                        { marginVertical: 6, borderRadius: 22, borderWidth: 2.5, borderColor: 'transparent' },
                        sel && { borderColor: card.accent, shadowColor: card.accent, shadowOpacity: 0.5, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } },
                      ]}
                    >
                      <MoveCardView card={card} />
                      {sel ? (
                        <View style={{ position: 'absolute', top: 14, right: 14, backgroundColor: card.accent, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5 }}>
                          <Text style={{ color: '#0D0F1C', fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>🃏 CANCELLING</Text>
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : null}

            {/* Hazard compliance toggle — hidden when joker is active */}
            {!selectedJoker ? (
              <TouchableOpacity
                onPress={() => setHazardFollowed(prev => !prev)}
                activeOpacity={0.8}
                style={{
                  borderRadius: 12, borderWidth: 2,
                  borderColor: hazardFollowed ? '#4ADE80' : '#6B7280',
                  backgroundColor: hazardFollowed ? '#071A07' : C.surface,
                  padding: 12, marginBottom: 14,
                  flexDirection: 'row', alignItems: 'center', gap: 8,
                }}
              >
                <Text style={{ fontSize: 16 }}>{hazardFollowed ? '✅' : '☐'}</Text>
                <Text style={{ color: hazardFollowed ? '#4ADE80' : C.muted, fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>
                  {hazardFollowed ? 'HAZARD FOLLOWED' : 'TAP TO CONFIRM: I FOLLOWED THE HAZARD'}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{ borderRadius: 12, borderWidth: 2, borderColor: '#FFD700', backgroundColor: '#1A1200', padding: 12, marginBottom: 14, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 16 }}>🃏</Text>
                <Text style={{ color: '#FFD700', fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>JOKER ACTIVE — HAZARD CANCELLED</Text>
              </View>
            )}
          </>
        ) : null}

        <CaseBanner card={caseCard} />

        {/* Filibuster cards — skip turn; only available when no hazard is active */}
        {!selectedDelegate && filibusterCards.length > 0 && !activeHazard ? (
          <>
            <Text style={[S.screenLabel, { marginTop: 22, marginBottom: 4 }]}>⏭️ OR PLAY A FILIBUSTER</Text>
            <Text style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Skip your debate turn entirely — no argument needed.</Text>
            {filibusterCards.map(card => {
              const sel = selectedFilibuster?.id === card.id;
              return (
                <TouchableOpacity key={card.id} onPress={() => toggleFilibuster(card)} activeOpacity={0.88}
                  style={[{ marginVertical: 6, borderRadius: 22, borderWidth: 2.5, borderColor: 'transparent' },
                    sel && { borderColor: card.accent, shadowColor: card.accent, shadowOpacity: 0.5, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } }]}>
                  <MoveCardView card={card} />
                  {sel ? (
                    <View style={{ position: 'absolute', top: 14, right: 14, backgroundColor: card.accent, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5 }}>
                      <Text style={{ color: '#0D0F1C', fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>⏭️ PLAYING</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </>
        ) : null}

        {/* Filibuster active banner */}
        {selectedFilibuster ? (
          <View style={{ borderRadius: 12, borderWidth: 2, borderColor: selectedFilibuster.accent, backgroundColor: '#0A0A12', padding: 14, marginTop: 8, marginBottom: 8 }}>
            <Text style={{ color: selectedFilibuster.accent, fontWeight: '900', fontSize: 12, letterSpacing: 1.5, marginBottom: 4 }}>⏭️ FILIBUSTER ACTIVE — TURN SKIPPED</Text>
            <Text style={{ color: C.muted, fontSize: 12 }}>Your debate turn will be skipped. You may still place a hazard for {nextPlayerName || 'the next player'} below.</Text>
          </View>
        ) : null}

        {/* Delegate cards — pass your turn to opponent */}
        {!selectedFilibuster && delegateCards.length > 0 ? (
          <>
            <Text style={[S.screenLabel, { marginTop: 22, marginBottom: 4 }]}>📋 OR PLAY A DELEGATE</Text>
            <Text style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>
              {nextPlayerName ? `${nextPlayerName} will argue your side this turn.` : 'Your opponent argues your side this turn.'}
              {activeHazard ? ' The active hazard carries over to them.' : ''}
            </Text>
            {delegateCards.map(card => {
              const sel = selectedDelegate?.id === card.id;
              return (
                <TouchableOpacity key={card.id} onPress={() => toggleDelegate(card)} activeOpacity={0.88}
                  style={[{ marginVertical: 6, borderRadius: 22, borderWidth: 2.5, borderColor: 'transparent' },
                    sel && { borderColor: card.accent, shadowColor: card.accent, shadowOpacity: 0.5, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } }]}>
                  <MoveCardView card={card} />
                  {sel ? (
                    <View style={{ position: 'absolute', top: 14, right: 14, backgroundColor: card.accent, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5 }}>
                      <Text style={{ color: '#0D0F1C', fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>📋 DELEGATING</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </>
        ) : null}

        {/* Move cards — own hand (hidden if delegate selected) / brief for opponent (shown if delegate selected) */}
        {moveCards.length > 0 ? (
          <>
            <Text style={[S.screenLabel, { marginTop: 22, marginBottom: 6 }]}>
              {selectedDelegate ? `GIVE A MOVE CARD TO ${(nextPlayerName || 'OPPONENT').toUpperCase()} (OPTIONAL)` : 'MOVE CARDS'}
            </Text>
            {selectedDelegate ? (
              <Text style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>
                Pick one from your hand — {nextPlayerName || 'your opponent'} must argue using this technique. Or skip.
              </Text>
            ) : null}
            {moveCards.map(card => {
              const selected = selectedDelegate
                ? selectedDelegateMove?.id === card.id
                : selectedMove?.id === card.id;
              const dimmed = selectedDelegate
                ? selectedDelegateMove !== null && !selected
                : selectedMove !== null && !selected;
              const onPress = selectedDelegate
                ? () => setSelectedDelegateMove(prev => prev?.id === card.id ? null : card)
                : () => toggleMove(card);
              return (
                <TouchableOpacity key={card.id} onPress={onPress} activeOpacity={0.88}
                  style={[{ marginVertical: 6, borderRadius: 22, borderWidth: 2.5, borderColor: 'transparent' },
                    selected && { borderColor: card.accent, shadowColor: card.accent, shadowOpacity: 0.5, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } },
                    dimmed && { opacity: 0.4 }]}>
                  <MoveCardView card={card} />
                  {selected ? (
                    <View style={{ position: 'absolute', top: 14, right: 14, backgroundColor: card.accent, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5 }}>
                      <Text style={{ color: '#0D0F1C', fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>
                        {selectedDelegate ? '📋 BRIEFING' : '✓ USING'}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </>
        ) : null}

        {/* Hazard picker for the next player */}
        {hazardCards.length > 0 && nextPlayerName ? (
          <>
            <Text style={[S.screenLabel, { marginTop: 22, marginBottom: 4 }]}>⚡ HAZARD FOR {nextPlayerName.toUpperCase()}</Text>
            <Text style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Play one to restrict {nextPlayerName}'s argument — or skip.</Text>
            {hazardCards.map(card => {
              const sel = selectedHazard?.id === card.id;
              return (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => setSelectedHazard(prev => (prev?.id === card.id ? null : card))}
                  activeOpacity={0.88}
                  style={[
                    { marginVertical: 6, borderRadius: 22, borderWidth: 2.5, borderColor: 'transparent' },
                    sel && { borderColor: card.accent, shadowColor: card.accent, shadowOpacity: 0.5, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } },
                  ]}
                >
                  <MoveCardView card={card} />
                  {sel ? (
                    <View style={{ position: 'absolute', top: 14, right: 14, backgroundColor: card.accent, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5 }}>
                      <Text style={{ color: '#0D0F1C', fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>⚡ PLAYING</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </>
        ) : null}

        {activeHazard && !selectedJoker && !selectedDelegate && !hazardFollowed ? (
          <View style={{ marginTop: 12, backgroundColor: '#2A0A00', borderRadius: 10, borderWidth: 1, borderColor: '#FB923C', padding: 10 }}>
            <Text style={{ color: '#FB923C', fontWeight: '700', fontSize: 12, textAlign: 'center', lineHeight: 18 }}>
              ⚠️ Confirm the hazard above — or play a joker to cancel it, or delegate your turn. Otherwise you'll receive a penalty card.
            </Text>
          </View>
        ) : null}
        <Btn
          label={
            selectedFilibuster ? `⏭️  SKIP TURN${nextPlayerName ? ` — PASS TO ${nextPlayerName.toUpperCase()}` : ''}`
            : selectedDelegate ? `📋  DELEGATE TO ${(nextPlayerName || 'OPPONENT').toUpperCase()}`
            : nextPlayerName ? `→  PASS TO ${nextPlayerName.toUpperCase()}`
            : '✓  DONE'
          }
          onPress={() => finish(selectedDelegate ? null : selectedMove, hazardFollowed)}
          style={{ marginTop: 12 }}
        />
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

// ── Delegate Debate: opponent argues the delegator's side ────────────────
// delegatorPlayer: who played the delegate card
// player:          who is arguing (the opponent)
// delegateMoveCard: optional move card they must follow
// activeHazard:    carries over from the delegator's turn (shown for info)
// onDone(confirmed): true = argued successfully, false = declined (penalty card dealt by handler)
export const DelegateDebateScreen = ({
  caseCard, delegatorPlayer, player, delegateMoveCard = null,
  activeHazard = null, onDone,
}) => {
  const calledRef = useRef(false);

  const finish = (confirmed) => {
    if (calledRef.current) return;
    calledRef.current = true;
    onDone(confirmed);
  };

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface }}>
        <View style={[S.playerChip, { backgroundColor: '#7C3AED' }]}>
          <Text style={[S.playerChipTxt, { color: '#E8DFC8' }]}>{player.name.toUpperCase()}  ·  DELEGATE</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={S.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 22, fontWeight: '900', color: C.muted, textAlign: 'center', letterSpacing: 1, lineHeight: 30, marginTop: 8, marginBottom: 2 }}>
          Argue {delegatorPlayer.name}'s side,
        </Text>
        <Text style={{ fontSize: 28, fontWeight: '900', color: '#E879F9', textAlign: 'center', letterSpacing: 1, lineHeight: 38, marginBottom: 16 }}>
          {player.name}!
        </Text>

        {/* Active hazard — carries over from delegator's turn, shown for reference */}
        {activeHazard ? (
          <View style={{ backgroundColor: '#2A1000', borderRadius: 12, borderWidth: 1.5, borderColor: activeHazard.accent, padding: 14, marginBottom: 14 }}>
            <Text style={{ color: activeHazard.accent, fontWeight: '900', fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>⚡ HAZARD IN EFFECT</Text>
            <Text style={{ color: '#E8DFC8', fontWeight: '800', fontSize: 15, marginBottom: 4 }}>{activeHazard.name}</Text>
            <Text style={{ color: '#E8DFC8', fontSize: 13, opacity: 0.85 }}>{activeHazard.what}</Text>
          </View>
        ) : null}

        <CaseBanner card={caseCard} />

        {/* Required move card from delegator */}
        {delegateMoveCard ? (
          <>
            <Text style={[S.screenLabel, { marginTop: 20, marginBottom: 6 }]}>📋 YOUR BRIEF FROM {delegatorPlayer.name.toUpperCase()}</Text>
            <Text style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>
              {delegatorPlayer.name} requires you to use this technique in your argument.
            </Text>
            <View style={{ borderRadius: 22, borderWidth: 2.5, borderColor: delegateMoveCard.accent }}>
              <MoveCardView card={delegateMoveCard} />
            </View>
          </>
        ) : null}

        <Btn
          label="✓  I PLAYED DELEGATE CARD"
          onPress={() => finish(true)}
          style={{ marginTop: 20 }}
        />
        <Btn
          label="✗  I CANNOT PLAY DELEGATE CARD"
          variant="secondary"
          onPress={() => finish(false)}
          style={{ marginTop: 8 }}
        />
        <Text style={{ color: C.muted, fontSize: 12, textAlign: 'center', marginTop: 8, lineHeight: 18 }}>
          Declining will add a random card to your hand.
        </Text>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

// ── Counter Window: 15s interrupt after opponent finishes arguing ─────────
// counterCards: Card[] — only the unused counter cards for this player
// onPlay(card)  — player chose to play a counter card
// onSkip()      — player skipped the counter window

export const CounterWindowScreen = ({ player, counterCards, onPlay, onSkip }) => {
  const [secsLeft, setSecsLeft]   = useState(15);
  const [selected, setSelected]   = useState(null);
  const calledRef = useRef(false);
  const intervalRef = useRef(null);

  const doSkip = () => {
    if (calledRef.current) return;
    calledRef.current = true;
    clearInterval(intervalRef.current);
    onSkip();
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecsLeft(s => {
        if (s <= 1) { clearInterval(intervalRef.current); doSkip(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ height: 4, backgroundColor: C.border }}>
        <View style={{ width: `${(secsLeft / 15) * 100}%`, height: 4, backgroundColor: '#A78BFA' }} />
      </View>

      <ScrollView contentContainerStyle={[S.scrollContent, { paddingTop: 48, paddingBottom: 48 }]}>
        <Text style={{ color: '#A78BFA', fontWeight: '900', fontSize: 11, letterSpacing: 2, textAlign: 'center', marginBottom: 8 }}>
          ⚡ COUNTER WINDOW  ·  {secsLeft}s
        </Text>
        <Text style={{ fontSize: 26, fontWeight: '900', color: C.gold, textAlign: 'center', letterSpacing: 1, lineHeight: 36, marginBottom: 6 }}>
          Heard something{'\n'}worth countering?
        </Text>
        <Text style={{ color: C.muted, fontSize: 14, textAlign: 'center', marginBottom: 28 }}>
          {player.name} — choose a counter card to interrupt, or skip straight to your argument.
        </Text>

        {counterCards.map(card => (
          <TouchableOpacity
            key={card.id}
            onPress={() => setSelected(card)}
            style={[
              { marginVertical: 6, borderRadius: 22, borderWidth: 2.5, borderColor: 'transparent' },
              selected?.id === card.id && { borderColor: card.accent, shadowColor: card.accent, shadowOpacity: 0.5, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } },
            ]}
          >
            <MoveCardView card={card} />
            {selected?.id === card.id ? (
              <View style={{ position: 'absolute', top: 14, right: 14, backgroundColor: card.accent, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5 }}>
                <Text style={{ color: '#0D0F1C', fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>✓ SELECTED</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ))}

        <Btn
          label="🗡  PLAY COUNTER CARD!"
          onPress={() => {
            if (!selected) return;
            clearInterval(intervalRef.current);
            calledRef.current = true;
            onPlay(selected);
          }}
          style={{ marginTop: 20, opacity: selected ? 1 : 0.4 }}
        />
        <Btn label="Skip — make my argument" variant="secondary" onPress={doSkip} />
      </ScrollView>
    </View>
  );
};

// ── Counter: 30-second focused rebuttal ──────────────────────────────────
// counterCard: the card being played
// onDone()    — counter argument delivered

export const CounterScreen = ({ player, caseCard, counterCard, onDone }) => {
  const [secsLeft, setSecsLeft] = useState(30);
  const calledRef   = useRef(false);
  const intervalRef = useRef(null);

  const finish = () => {
    if (calledRef.current) return;
    calledRef.current = true;
    clearInterval(intervalRef.current);
    onDone();
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecsLeft(s => {
        if (s <= 1) { clearInterval(intervalRef.current); finish(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const tColor = timerColor(secsLeft);

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ height: 5, backgroundColor: C.border }}>
        <View style={{ width: `${(secsLeft / 30) * 100}%`, height: 5, backgroundColor: tColor }} />
      </View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 10, backgroundColor: C.surface }}>
        <View style={[S.playerChip, { backgroundColor: '#A78BFA' }]}>
          <Text style={[S.playerChipTxt, { color: '#0D0F1C' }]}>{player.name.toUpperCase()}  ·  COUNTER</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={[S.scrollContent, { paddingTop: 32, paddingBottom: 48 }]}>
        <Text style={{ color: '#A78BFA', fontWeight: '900', fontSize: 11, letterSpacing: 2, textAlign: 'center', marginBottom: 6 }}>
          🗡  {counterCard.name}  ·  {secsLeft}s
        </Text>
        <Text style={{ fontSize: 24, fontWeight: '900', color: C.gold, textAlign: 'center', letterSpacing: 1, lineHeight: 34, marginBottom: 20 }}>
          Counter one point{'\n'}they just made.
        </Text>

        <View style={{ backgroundColor: '#0D0029', borderRadius: 14, borderWidth: 1, borderColor: counterCard.accent, padding: 16, marginBottom: 20 }}>
          <Text style={{ color: counterCard.accent, fontWeight: '900', fontSize: 10, letterSpacing: 2, marginBottom: 6 }}>YOUR COUNTER</Text>
          <Text style={{ color: '#E8DFC8', fontSize: 14, fontWeight: '600', lineHeight: 22 }}>{counterCard.hint}</Text>
        </View>

        <CaseBanner card={caseCard} />

        <Btn label="✓  COUNTER DELIVERED" onPress={finish} style={{ marginTop: 24 }} />
      </ScrollView>
    </View>
  );
};

// ── Hazard Window: opponent picks a hazard before the arguer's turn ───────
// arguer: the player who will argue this turn
// hazardPlayer: the opponent who picks the hazard
// hazardCards: hazardPlayer's remaining hazard cards
// onDone(card | null)

// hazardPlayerAlreadyHasPhone: true when hazardPlayer already holds the phone (e.g. right after they
// completed their own ExchangeScreen), so the initial handoff cover is skipped.
export const HazardWindowScreen = ({ arguer, hazardPlayer, hazardCards = [], hazardPlayerAlreadyHasPhone, onDone }) => {
  const [phase, setPhase] = useState(hazardPlayerAlreadyHasPhone ? 'pick' : 'hand_to_picker'); // 'hand_to_picker' | 'pick' | 'hand_to_arguer'
  const [selected, setSelected] = useState(null);
  const calledRef = useRef(false);

  const confirmPick = (card) => {
    if (calledRef.current) return;
    calledRef.current = true;
    onDone(card || null);
  };

  if (phase === 'hand_to_picker') {
    return (
      <View style={S.screen}>
        <Text style={S.coverEyebrow}>PASS THE PHONE TO</Text>
        <Text style={S.coverHeading}>{hazardPlayer.name}</Text>
        <Text style={S.coverHint}>⚡ Pick a hazard for {arguer.name}'s turn</Text>
        <TouchableOpacity style={S.coverTap} onPress={() => setPhase('pick')} activeOpacity={0.8}>
          <Text style={S.coverTapIcon}>⚡</Text>
          <Text style={S.coverTapLabel}>TAP WHEN READY</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // phase === 'pick'
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={[S.scrollContent, { paddingTop: 48, paddingBottom: 48 }]}>
        <Text style={{ color: '#FB923C', fontWeight: '900', fontSize: 11, letterSpacing: 2, textAlign: 'center', marginBottom: 8 }}>
          ⚡ HAZARD WINDOW
        </Text>
        <Text style={{ fontSize: 26, fontWeight: '900', color: C.gold, textAlign: 'center', letterSpacing: 1, lineHeight: 36, marginBottom: 6 }}>
          Pick a hazard{'\n'}for {arguer.name}
        </Text>
        <Text style={{ color: C.muted, fontSize: 14, textAlign: 'center', marginBottom: 20 }}>
          {hazardPlayer.name} — play one hazard card to restrict {arguer.name}'s argument, or skip.
        </Text>

        {hazardCards.length === 0 ? (
          <Text style={[S.hint, { textAlign: 'center' }]}>No hazard cards in hand — skip to continue.</Text>
        ) : hazardCards.map(card => (
          <TouchableOpacity
            key={card.id}
            onPress={() => setSelected(s => s?.id === card.id ? null : card)}
            activeOpacity={0.88}
            style={[
              { marginVertical: 6, borderRadius: 22, borderWidth: 2.5, borderColor: 'transparent' },
              selected?.id === card.id && { borderColor: card.accent, shadowColor: card.accent, shadowOpacity: 0.5, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } },
            ]}
          >
            <MoveCardView card={card} />
            {selected?.id === card.id ? (
              <View style={{ position: 'absolute', top: 14, right: 14, backgroundColor: card.accent, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5 }}>
                <Text style={{ color: '#0D0F1C', fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>⚡ PLAYING</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        ))}

        <Btn
          label={selected ? `⚡  PLAY ${selected.name}` : 'Skip — no hazard this turn'}
          onPress={() => confirmPick(selected)}
          variant={selected ? 'primary' : 'secondary'}
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </View>
  );
};

// ── Comeback: the player who played the counter delivers their counter-argument ─────
// player: the counter player (who played the counter card)
// counterCard: the counter card they played
// hand: counter player's current hand (we offer hazard picker from it)
// nextPlayerName: name of the player they're countering (for hazard label)
// onDone(hazardCard | null)

export const ComebackScreen = ({ player, counterCard, hand = [], nextPlayerName, onDone }) => {
  const hazardCards = hand.filter(c => c.cardType === 'hazard');
  const [secsLeft, setSecsLeft] = useState(30);
  const [selectedHazard, setSelectedHazard] = useState(null);
  const [counterFollowed, setCounterFollowed] = useState(false);
  const intervalRef = useRef(null);
  const calledRef = useRef(false);

  const finish = (followed, hazard) => {
    if (calledRef.current) return;
    calledRef.current = true;
    clearInterval(intervalRef.current);
    onDone(followed, hazard);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecsLeft(prev => {
        if (prev <= 1) { clearInterval(intervalRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (secsLeft === 0) finish(counterFollowed, selectedHazard);
  }, [secsLeft]);

  const tColor = timerColor(secsLeft);

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ height: 5, backgroundColor: C.border }}>
        <View style={{ width: `${(secsLeft / 30) * 100}%`, height: 5, backgroundColor: tColor }} />
      </View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 10, backgroundColor: C.surface }}>
        <View style={[S.playerChip, { backgroundColor: '#A78BFA' }]}>
          <Text style={[S.playerChipTxt, { color: '#0D0F1C' }]}>{player.name.toUpperCase()}  ·  COUNTER  ·  {secsLeft}s</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={[S.scrollContent, { paddingTop: 16, paddingBottom: 48 }]}>
        <Text style={{ fontSize: 24, fontWeight: '900', color: C.gold, textAlign: 'center', letterSpacing: 1, lineHeight: 34, marginBottom: 16 }}>
          Deliver your counter,{'\n'}{player.name}
        </Text>

        {counterCard ? (
          <View style={{ backgroundColor: '#0D0029', borderRadius: 14, borderWidth: 1.5, borderColor: counterCard.accent, padding: 16, marginBottom: 16 }}>
            <Text style={{ color: counterCard.accent, fontWeight: '900', fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>🗡 {counterCard.name}</Text>
            <Text style={{ color: '#E8DFC8', fontSize: 14, fontWeight: '600', lineHeight: 22 }}>{counterCard.hint}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          onPress={() => setCounterFollowed(prev => !prev)}
          activeOpacity={0.8}
          style={{
            borderRadius: 12, borderWidth: 2,
            borderColor: counterFollowed ? '#4ADE80' : '#6B7280',
            backgroundColor: counterFollowed ? '#071A07' : C.surface,
            padding: 12, marginBottom: 14,
            flexDirection: 'row', alignItems: 'center', gap: 8,
          }}
        >
          <Text style={{ fontSize: 16 }}>{counterFollowed ? '✅' : '☐'}</Text>
          <Text style={{ color: counterFollowed ? '#4ADE80' : C.muted, fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>
            {counterFollowed ? 'COUNTER DELIVERED' : 'TAP TO CONFIRM: I DID THE COUNTER'}
          </Text>
        </TouchableOpacity>

        {hazardCards.length > 0 && nextPlayerName ? (
          <>
            <Text style={[S.screenLabel, { marginTop: 8, marginBottom: 4 }]}>⚡ HAZARD FOR {nextPlayerName.toUpperCase()}</Text>
            <Text style={{ color: C.muted, fontSize: 12, marginBottom: 8 }}>Play one to restrict {nextPlayerName}'s next argument — or skip.</Text>
            {hazardCards.map(card => {
              const sel = selectedHazard?.id === card.id;
              return (
                <TouchableOpacity
                  key={card.id}
                  onPress={() => setSelectedHazard(prev => (prev?.id === card.id ? null : card))}
                  activeOpacity={0.88}
                  style={[
                    { marginVertical: 6, borderRadius: 22, borderWidth: 2.5, borderColor: 'transparent' },
                    sel && { borderColor: card.accent, shadowColor: card.accent, shadowOpacity: 0.5, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } },
                  ]}
                >
                  <MoveCardView card={card} />
                  {sel ? (
                    <View style={{ position: 'absolute', top: 14, right: 14, backgroundColor: card.accent, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 5 }}>
                      <Text style={{ color: '#0D0F1C', fontWeight: '900', fontSize: 11, letterSpacing: 1.5 }}>⚡ PLAYING</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </>
        ) : null}

        {!counterFollowed ? (
          <View style={{ marginTop: 12, backgroundColor: '#2A0A00', borderRadius: 10, borderWidth: 1, borderColor: '#FB923C', padding: 10 }}>
            <Text style={{ color: '#FB923C', fontWeight: '700', fontSize: 12, textAlign: 'center', lineHeight: 18 }}>
              ⚠️ Confirm your counter above — otherwise you'll receive a penalty card.
            </Text>
          </View>
        ) : null}
        <Btn
          label={nextPlayerName ? `→  PASS TO ${nextPlayerName.toUpperCase()}` : '✓  DONE'}
          onPress={() => finish(counterFollowed, selectedHazard)}
          style={{ marginTop: 12 }}
        />
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

// ── Exchange: end-of-turn card management ─────────────────────────────────
// player: who is exchanging
// hand: their full current hand
// hasBurned: whether this player has already burned a card this game
// onDone(action: 'exchange'|'burn'|'skip', card: Card|null)

// playerAlreadyHasPhone: true when the arguer already holds the phone (e.g. after a comeback),
// so the handoff cover screen is skipped.
export const ExchangeScreen = ({ player, hand = [], onDone }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const exchangeableCards = hand.filter(c => c.cardType !== 'counter');

  return (
    <ScrollView
      contentContainerStyle={[S.scrollContent, { paddingTop: 60, paddingBottom: 48 }]}
      style={{ backgroundColor: C.bg }}
    >
      <Text style={[S.screenLabel, { marginBottom: 4 }]}>END OF TURN</Text>
      <Text style={[S.screenTitle, { marginBottom: 8 }]}>EXCHANGE{'\n'}A CARD?</Text>
      <Text style={S.hint}>
        {player.name} — pick a card to swap for a new one, or skip.
      </Text>

      <Text style={[S.screenLabel, { marginTop: 20, marginBottom: 10 }]}>CHOOSE CARD TO SWAP</Text>
      {exchangeableCards.length === 0 ? (
        <Text style={[S.hint, { textAlign: 'center' }]}>No cards available to exchange.</Text>
      ) : exchangeableCards.map(c => (
        <TouchableOpacity
          key={c.id}
          onPress={() => setSelectedCard(p => p?.id === c.id ? null : c)}
          style={{
            borderRadius: 12, borderWidth: 2, padding: 12, marginBottom: 8, backgroundColor: C.surface,
            borderColor: selectedCard?.id === c.id ? c.accent : C.border,
          }}
        >
          <Text style={{ color: selectedCard?.id === c.id ? c.accent : '#E8DFC8', fontWeight: '800' }}>{c.icon}  {c.name}</Text>
          <Text style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{c.cardType.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}

      <Btn
        label={selectedCard ? '↺  CONFIRM EXCHANGE' : 'Skip — keep my hand'}
        onPress={() => onDone(selectedCard ? 'exchange' : 'skip', selectedCard)}
        style={{ marginTop: 16 }}
      />
    </ScrollView>
  );
};

// ── Player wins: all cards used ───────────────────────────────────────────

export const PlayerWinsScreen = ({ winner, onContinue }) => (
  <View style={[S.screen, { justifyContent: 'center', paddingHorizontal: 32 }]}>
    <Text style={[S.screenLabel, { marginBottom: 8 }]}>ALL CARDS PLAYED!</Text>
    <Text style={S.heroTitle}>{winner.name}{'\n'}PLAYED{'\n'}THEM ALL.</Text>
    <Text style={[S.hint, { marginTop: 16 }]}>
      {winner.name} used every card in their hand.{'\n'}Game over.
    </Text>
    <Btn label="FINISH GAME  →" onPress={onContinue} style={{ marginTop: 40 }} />
  </View>
);

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

const ARGUS_IMAGES = {
  confident:   require('./argus_confident.png'),
  suspicious:  require('./argus_suspicious.png'),
  smug:        require('./argus_smug.png'),
  encouraging: require('./argus_encouraging.png'),
  thinking:    require('./argus_thinking.png'),
  dramatic:    require('./argus_dramatic.png'),
};

const DRILL_PROGRESS_KEY = 'drillProgress';

const DrillRunner = ({ drill, card, onComplete, onBack }) => {
  const [stepIdx, setStepIdx]       = useState(0);
  const [screenIdx, setScreenIdx]   = useState(0);
  const [phase, setPhase]           = useState('viewing');
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [saidIt, setSaidIt]         = useState(false);
  const [secsLeft, setSecsLeft]     = useState(15);
  const [showLeave, setShowLeave]   = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  // Typewriter state — only active on the very first screen of the drill
  const [twHeading, setTwHeading]   = useState('');
  const [twBody, setTwBody]         = useState('');
  const [twDone, setTwDone]         = useState(false);
  const timerRef  = useRef(null);
  const twRef     = useRef(null);
  const progressLoadedRef = useRef(false);

  const currentStep   = drill.steps[stepIdx];
  const currentScreen = currentStep.screens[screenIdx];

  const totalScreens = drill.steps.reduce((n, s) => n + s.screens.length, 0);
  const doneScreens  = drill.steps.slice(0, stepIdx).reduce((n, s) => n + s.screens.length, 0) + screenIdx;
  const progress     = doneScreens / totalScreens;

  // ── Load saved progress on mount ────────────────────────────────────────
  useEffect(() => {
    AsyncStorage.getItem(DRILL_PROGRESS_KEY).then(raw => {
      if (!raw) { progressLoadedRef.current = true; return; }
      try {
        const saved = JSON.parse(raw);
        const pos = saved[card.id];
        if (pos) {
          setStepIdx(pos.stepIdx);
          setScreenIdx(pos.screenIdx);
        }
      } catch (_) {}
      progressLoadedRef.current = true;
    });
  }, []);

  // ── Save progress whenever position changes ──────────────────────────────
  useEffect(() => {
    if (!progressLoadedRef.current) return;
    AsyncStorage.getItem(DRILL_PROGRESS_KEY).then(raw => {
      const all = raw ? JSON.parse(raw) : {};
      all[card.id] = { stepIdx, screenIdx };
      AsyncStorage.setItem(DRILL_PROGRESS_KEY, JSON.stringify(all));
    }).catch(() => {});
  }, [stepIdx, screenIdx]);

  // ── Typewriter: only on the very first info screen (step 0, screen 0) ────
  useEffect(() => {
    clearInterval(twRef.current);
    const isFirst = stepIdx === 0 && screenIdx === 0 && currentScreen.type === 'info';
    if (!isFirst) { setTwDone(true); return; }

    const heading = currentScreen.heading || '';
    const body    = currentScreen.body    || '';
    const total   = heading.length + body.length;
    setTwHeading('');
    setTwBody('');
    setTwDone(false);

    let i = 0;
    twRef.current = setInterval(() => {
      i++;
      if (i <= heading.length) {
        setTwHeading(heading.slice(0, i));
      } else {
        setTwBody(body.slice(0, i - heading.length));
      }
      if (i >= total) { clearInterval(twRef.current); setTwDone(true); }
    }, 35);
    return () => clearInterval(twRef.current);
  }, [stepIdx, screenIdx]);

  // Tap anywhere on typewriter text to skip to full text immediately
  const skipTypewriter = () => {
    if (twDone) return;
    clearInterval(twRef.current);
    setTwHeading(currentScreen.heading || '');
    setTwBody(currentScreen.body || '');
    setTwDone(true);
  };

  // ── Deliver countdown timer ───────────────────────────────────────────────
  useEffect(() => {
    if (currentScreen.type !== 'deliver') return;
    const secs = currentScreen.timerSecs || 15;
    setSecsLeft(secs);
    timerRef.current = setInterval(() => {
      setSecsLeft(s => { if (s <= 1) { clearInterval(timerRef.current); return 0; } return s - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [stepIdx, screenIdx]);

  const advance = () => {
    const screens = currentStep.screens;
    if (screenIdx < screens.length - 1) {
      setScreenIdx(screenIdx + 1);
    } else if (stepIdx < drill.steps.length - 1) {
      setStepIdx(stepIdx + 1);
      setScreenIdx(0);
    }
    setPhase('viewing');
    setSelectedIdx(null);
    setWasCorrect(false);
  };

  const doRestart = async () => {
    // Clear saved position for this card
    try {
      const raw = await AsyncStorage.getItem(DRILL_PROGRESS_KEY);
      if (raw) {
        const all = JSON.parse(raw);
        delete all[card.id];
        await AsyncStorage.setItem(DRILL_PROGRESS_KEY, JSON.stringify(all));
      }
    } catch (_) {}
    setStepIdx(0); setScreenIdx(0);
    setPhase('viewing'); setSelectedIdx(null); setWasCorrect(false);
    setSaidIt(false); setShowRestart(false); setShowLeave(false);
  };

  const argusImg = () => {
    const base = currentScreen.argusExpression || 'thinking';
    if (currentScreen.type === 'question' && phase === 'answered') {
      return wasCorrect ? 'smug' : 'suspicious';
    }
    return base;
  };

  const letters = ['A', 'B', 'C'];
  const isFirstScreen = stepIdx === 0 && screenIdx === 0 && currentScreen.type === 'info';

  if (currentScreen.type === 'completion') {
    return (
      <View style={[S.screen, { padding: 32 }]}>
        <Image
          source={ARGUS_IMAGES[saidIt ? 'smug' : 'encouraging']}
          style={{ width: CARD_W * 0.55, height: CARD_W * 0.55, resizeMode: 'contain', marginBottom: 20 }}
        />
        <Text style={S.screenTitle}>{card.name}</Text>
        <Text style={[S.heroTagline, { marginTop: 8, marginBottom: 32 }]}>
          {saidIt ? currentScreen.saidText : currentScreen.skippedText}
        </Text>
        <Btn label="← BACK TO DOJO" onPress={onComplete} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={[S.scrollContent, { paddingTop: 60, paddingBottom: 48 }]}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <TouchableOpacity onPress={() => setShowLeave(true)} style={{ padding: 4 }}>
            <Text style={{ color: C.muted, fontSize: 13, fontWeight: '700', letterSpacing: 1 }}>← DOJO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowRestart(true)} style={{ padding: 4 }}>
            <Text style={{ color: C.muted, fontSize: 12, fontWeight: '700', letterSpacing: 1 }}>↺ RESTART</Text>
          </TouchableOpacity>
        </View>

        <View style={S.drillProgressBar}>
          <View style={[S.drillProgressFill, { width: `${progress * 100}%` }]} />
        </View>

        <Text style={S.drillStepBadge}>STEP {currentStep.step} · {currentStep.title.toUpperCase()}</Text>

        <Text style={[S.screenLabel, { marginBottom: 8 }]}>{card.icon}  {card.name}</Text>

        <Image
          source={ARGUS_IMAGES[argusImg()]}
          style={{ width: CARD_W * 0.38, height: CARD_W * 0.38, resizeMode: 'contain', alignSelf: 'center', marginBottom: 16 }}
        />

        {currentScreen.type === 'info' && (
          <>
            {currentScreen.quote ? (
              <View style={S.drillQuoteBubble}>
                <Text style={S.drillQuoteTxt}>"{currentScreen.quote}"</Text>
              </View>
            ) : null}
            {isFirstScreen ? (
              // Typewriter rendering on first screen — tap to skip
              <TouchableOpacity activeOpacity={1} onPress={skipTypewriter}>
                {twHeading.length > 0 ? (
                  <Text style={[S.drillInfoHeading, { minHeight: 30 }]}>{twHeading}</Text>
                ) : null}
                {twBody.length > 0 ? (
                  <Text style={S.drillInfoBody}>{twBody}</Text>
                ) : null}
              </TouchableOpacity>
            ) : (
              <>
                {currentScreen.heading ? <Text style={S.drillInfoHeading}>{currentScreen.heading}</Text> : null}
                {currentScreen.body    ? <Text style={S.drillInfoBody}>{currentScreen.body}</Text>       : null}
              </>
            )}
            {currentScreen.note ? (
              <View style={S.drillArgusNote}>
                <Text style={S.drillArgusNoteTxt}>{currentScreen.note}</Text>
              </View>
            ) : null}
            {(!isFirstScreen || twDone) ? (
              <Btn label={currentScreen.cta || 'Continue  →'} onPress={advance} style={{ marginTop: 20 }} />
            ) : null}
          </>
        )}

        {currentScreen.type === 'question' && (
          <>
            <Text style={S.drillQuestion}>{currentScreen.prompt}</Text>
            {currentScreen.options.map((opt, idx) => {
              let rowStyle = S.drillOption;
              let badgeStyle = S.drillOptionLetter;
              let badgeTxtStyle = S.drillOptionLetterTxt;
              if (phase === 'answered') {
                if (opt.correct) {
                  rowStyle = [S.drillOption, S.drillOptionCorrect];
                  badgeStyle = [S.drillOptionLetter, { backgroundColor: '#15803D' }];
                  badgeTxtStyle = [S.drillOptionLetterTxt, { color: '#E8DFC8' }];
                } else if (idx === selectedIdx) {
                  rowStyle = [S.drillOption, S.drillOptionWrong];
                  badgeStyle = [S.drillOptionLetter, { backgroundColor: '#9B1C1C' }];
                  badgeTxtStyle = [S.drillOptionLetterTxt, { color: '#E8DFC8' }];
                } else {
                  rowStyle = [S.drillOption, { opacity: 0.4 }];
                }
              }
              return (
                <TouchableOpacity
                  key={idx}
                  style={rowStyle}
                  onPress={() => {
                    if (phase !== 'viewing') return;
                    setSelectedIdx(idx);
                    setWasCorrect(opt.correct);
                    setPhase('answered');
                  }}
                  activeOpacity={phase === 'viewing' ? 0.8 : 1}
                >
                  <View style={badgeStyle}><Text style={badgeTxtStyle}>{letters[idx]}</Text></View>
                  <Text style={S.drillOptionTxt}>{opt.text}</Text>
                </TouchableOpacity>
              );
            })}
            {phase === 'answered' && (
              <>
                <View style={[S.drillFeedback, wasCorrect ? S.drillFeedbackOk : S.drillFeedbackOops]}>
                  <Text style={S.drillFeedbackTxt}>
                    {currentScreen.options[selectedIdx]?.feedback}
                  </Text>
                </View>
                {wasCorrect ? (
                  <Btn label="Continue  →" onPress={advance} style={{ marginTop: 12 }} />
                ) : (
                  <Btn
                    label="Try again"
                    onPress={() => { setPhase('viewing'); setSelectedIdx(null); }}
                    style={{ marginTop: 12 }}
                  />
                )}
              </>
            )}
          </>
        )}

        {currentScreen.type === 'deliver' && (
          <>
            <View style={S.drillDeliverBar}>
              <View style={[S.drillDeliverBarFill, { width: `${(secsLeft / (currentScreen.timerSecs || 15)) * 100}%` }]} />
            </View>
            <View style={S.drillDeliverCard}>
              <Text style={S.drillDeliverText}>{currentScreen.body}</Text>
            </View>
            {currentScreen.caption ? (
              <Text style={S.drillDeliverCaption}>{currentScreen.caption}</Text>
            ) : null}
            <Btn
              label="🎤  I said it!"
              onPress={() => { clearInterval(timerRef.current); setSaidIt(true); advance(); }}
              style={{ marginTop: 4 }}
            />
            <TouchableOpacity
              onPress={() => { clearInterval(timerRef.current); advance(); }}
              style={{ paddingVertical: 14 }}
            >
              <Text style={{ color: C.muted, fontSize: 13, textAlign: 'center', letterSpacing: 0.5 }}>
                Skip this time
              </Text>
            </TouchableOpacity>
          </>
        )}

      </ScrollView>

      {showLeave && (
        <View style={S.backConfirmOverlay}>
          <View style={S.backConfirmBox}>
            <Text style={[S.screenTitle, { marginBottom: 10 }]}>Leave this drill?</Text>
            <Text style={[S.hint, { marginBottom: 24 }]}>Progress is saved — you can pick up where you left off.</Text>
            <Btn label="LEAVE" onPress={onBack} style={{ marginBottom: 4 }} />
            <TouchableOpacity onPress={() => setShowLeave(false)} style={{ paddingVertical: 12 }}>
              <Text style={{ color: C.muted, fontSize: 14, fontWeight: '700' }}>Stay in drill</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showRestart && (
        <View style={S.backConfirmOverlay}>
          <View style={S.backConfirmBox}>
            <Text style={[S.screenTitle, { marginBottom: 10 }]}>Restart from Step 1?</Text>
            <Text style={[S.hint, { marginBottom: 24 }]}>This clears your saved position for this card.</Text>
            <Btn label="RESTART" onPress={doRestart} style={{ marginBottom: 4 }} />
            <TouchableOpacity onPress={() => setShowRestart(false)} style={{ paddingVertical: 12 }}>
              <Text style={{ color: C.muted, fontSize: 14, fontWeight: '700' }}>Keep my progress</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// completedDrills: string[] — card IDs the player has fully drilled at least once
// onComplete(cardId)        — called when a drill is finished
export const SoloDojoScreen = ({ completedDrills, onComplete }) => {
  const [view, setView]               = useState('select'); // 'select' | 'drill'
  const [currentCard, setCurrentCard] = useState(null);

  // Legacy drill state (Silver/Gold cards, 2-step format)
  const [step, setStep]               = useState(0);
  const [phase, setPhase]             = useState('question');
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
          source={require('./argus_encouraging.png')}
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

  // ── New 5-step drill format (Bronze cards) ─────────────────────────────────

  const newDrill = DRILLS[currentCard?.id];
  if (newDrill) {
    return (
      <DrillRunner
        drill={newDrill}
        card={currentCard}
        onComplete={() => { onComplete(currentCard.id); handleBack(); }}
        onBack={handleBack}
      />
    );
  }

  // ── Legacy 2-step drill format (Silver / Gold cards) ───────────────────────

  const drill = DRILLS_LEGACY[currentCard?.id];
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

  const handleOption = idx => {
    if (phase !== 'question') return;
    const correct = currentStep.correct === idx;
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
              source={require('./argus_thinking.png')}
              style={{ width: 44, height: 44, resizeMode: 'contain', marginRight: 10 }}
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
            <Image
              source={wasCorrect ? require('./argus_confident.png') : require('./argus_dramatic.png')}
              style={{ width: CARD_W * 0.35, height: CARD_W * 0.35, resizeMode: 'contain', alignSelf: 'center', marginTop: 16, marginBottom: 4 }}
            />
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
