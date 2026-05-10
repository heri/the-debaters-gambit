import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { MOVE_CARDS, CARD_W, DEBATE_SECS, formatTime, timerColor } from './data';
import { C, S } from './styles';
import { Btn, ToggleRow, MoveCardView, CaseCardView, CaseBanner, MovePickRow } from './components';

// ── Home ───────────────────────────────────────────────────────────────────

export const HomeScreen = () => (
  <View style={S.screen}>
    <Text style={S.heroTitle}>THE{'\n'}DEBATER'S{'\n'}GAMBIT</Text>
    <Text style={S.heroTagline}>Words are your weapons.{'\n'}Wit is your armor.</Text>
    <Text style={[S.hint, { marginTop: 32 }]}>Tap ⚔️ below to start a new case</Text>
  </View>
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

// ── Account ────────────────────────────────────────────────────────────────

export const AccountScreen = ({ players, onAdd, onRemove, defaultRounds, onRoundsChange, history, isOnboarding }) => {
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

// ── Debate: live timer + optional inline move picker ───────────────────────
// Player picks (or skips) a move card during their own turn.
// onDone(selectedMove | null) hands control back to the parent.

export const DebateScreen = ({ caseCard, player, nextPlayerName, onDone }) => {
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

// ── Round end: next round or score the game ────────────────────────────────

export const RoundEndScreen = ({ currentRound, defaultRounds, player1, player2, onNextRound, onEndGame }) => (
  <View style={S.screen}>
    <Text style={[S.screenLabel, { marginBottom: 8 }]}>ROUND {currentRound} COMPLETE</Text>
    <Text style={S.heroTitle}>WELL{'\n'}FOUGHT!</Text>
    <Text style={[S.hint, { marginTop: 16 }]}>
      {player1.name} and {player2.name} have both spoken.{'\n'}What's next?
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
