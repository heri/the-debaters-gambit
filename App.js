// The Debater's Gambit — v6.0
// App.js is the state machine and persistence layer only.
// Card data → cards.js  |  Styles → styles.js  |  Components → components.js  |  Screens → screens.js

import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { uid, DEFAULT_DEBATE_SECS, getDailyDraw, dealCards, drawOneCard } from './data';
import { S } from './styles';
import { BottomNav } from './components';
import {
  HomeScreen, HelpScreen, AccountScreen,
  PlayerPickScreen, CasePickScreen, DebateScreen,
  CounterWindowScreen,
  ComebackScreen, ExchangeScreen, PlayerWinsScreen,
  SoloDojoScreen, QuickDrawScreen,
} from './screens';
import { HandPanel } from './components';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GAME FLOW (VS mode)
//
//   pick_case
//   → debate_p1              (P1 argues; picks hazard for P2 inline)
//   → counter_window_p2      (P2 has 15s to play counter, or skip)
//   → [counter_p2]
//   → [comeback_p1]          (only if counter played)
//   → exchange_p1
//   → [win check: if P2 has 0 cards → P2 wins]
//   → debate_p2              (P2 argues with P1's hazard; picks hazard for P1 inline)
//   → counter_window_p1      (P1 has 15s, or skip)
//   → [counter_p1]
//   → [comeback_p2]
//   → exchange_p2
//   → [win check: if P1 has 0 cards → P1 wins]
//   → debate_p1              (repeat)
//
// GAME FLOW (Quick Draw — solo):
//   quickdraw  (self-contained, no phases)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function App() {
  // Startup
  const [isReady, setIsReady] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState('home');

  // Persisted across restarts
  const [players, setPlayers] = useState([]);

  // Game state
  const [gameMode, setGameMode] = useState('new_case'); // 'new_case' | 'daily'
  const [gamePhase, setGamePhase] = useState('pick_case');
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  // Each player's live hand (cards are removed when played)
  const [p1Hand, setP1Hand] = useState([]);
  const [p2Hand, setP2Hand] = useState([]);

  // Tracks who currently holds the phone, to avoid redundant handoff cover screens
  const [phoneHolder, setPhoneHolder] = useState(null); // 'p1' | 'p2' | null

  // Active hazard / counter for the current turn
  const [activeHazard, setActiveHazard] = useState(null);
  const [activeCounterCard, setActiveCounterCard] = useState(null);

  // Whether each player played a card (move or hazard) this turn — gates exchange eligibility
  const [p1PlayedCard, setP1PlayedCard] = useState(false);
  const [p2PlayedCard, setP2PlayedCard] = useState(false);

  // Hazard queued during a counter-comeback, applied to the opponent's next debate turn
  const [pendingHazardForP1, setPendingHazardForP1] = useState(null);
  const [pendingHazardForP2, setPendingHazardForP2] = useState(null);

  // Winner
  const [winningPlayer, setWinningPlayer] = useState(null);

  const [debateSecs, setDebateSecs] = useState(DEFAULT_DEBATE_SECS);
  const [cardsPerPlayer, setCardsPerPlayer] = useState(2);
  const [currentRound, setCurrentRound] = useState(1);

  const [history, setHistory] = useState([]);
  const [completedDrills, setCompletedDrills] = useState([]);

  const dailyDraw = useMemo(() => getDailyDraw(), []);

  // ── Load from AsyncStorage on mount ─────────────────────────────────────
  useEffect(() => {
    AsyncStorage.multiGet(['players', 'settings', 'completedDrills']).then(results => {
      const playersRaw         = results[0][1];
      const settingsRaw        = results[1][1];
      const completedDrillsRaw = results[2][1];

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
        if (s.debateSecs)                    setDebateSecs(s.debateSecs);
        if (s.cardsPerPlayer !== undefined)  setCardsPerPlayer(s.cardsPerPlayer);
      }

      if (completedDrillsRaw) setCompletedDrills(JSON.parse(completedDrillsRaw));

      setIsReady(true);
    }).catch(() => setIsReady(true));
  }, []);

  // ── Persistence ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem('players', JSON.stringify(players)).catch(() => {});
  }, [players, isReady]);

  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem('settings', JSON.stringify({ debateSecs, cardsPerPlayer })).catch(() => {});
  }, [debateSecs, cardsPerPlayer, isReady]);

  useEffect(() => {
    if (!isReady) return;
    AsyncStorage.setItem('completedDrills', JSON.stringify(completedDrills)).catch(() => {});
  }, [completedDrills, isReady]);

  // ── Player management ────────────────────────────────────────────────────
  const handleAddPlayer = name => {
    const updated = [...players, { id: uid(), name }];
    setPlayers(updated);
    if (isOnboarding && updated.length >= 2) {
      setIsOnboarding(false);
      setActiveTab('game');
    }
  };

  const handleRemovePlayer = id => setPlayers(prev => prev.filter(p => p.id !== id));

  // ── Solo Dojo ────────────────────────────────────────────────────────────
  const handleDrillComplete = cardId => {
    if (!completedDrills.includes(cardId)) {
      setCompletedDrills(prev => [...prev, cardId]);
    }
  };

  // ── Game management ──────────────────────────────────────────────────────
  const resetGame = (mode = 'new_case') => {
    setGameMode(mode);
    setPlayer1(null); setPlayer2(null); setSelectedCase(null);
    setP1Hand([]); setP2Hand([]);
    setPhoneHolder(null);
    setActiveHazard(null); setActiveCounterCard(null);
    setP1PlayedCard(false); setP2PlayedCard(false);
    setPendingHazardForP1(null); setPendingHazardForP2(null);
    setWinningPlayer(null);
    setCurrentRound(1);
    const firstPhase = mode === 'new_case' ? 'pick_case'
                     : mode === 'quickdraw' ? 'quickdraw'
                     : 'pick_players';
    setGamePhase(firstPhase);
  };

  const handleTabPress = tab => {
    if (tab === 'game') resetGame('new_case');
    setActiveTab(tab);
  };

  const handlePlayDaily = () => {
    resetGame('quickdraw');
    setSelectedCase(dailyDraw.caseCard);
    setActiveTab('game');
  };

  const handleEndGame = () => {
    setHistory(h => [{
      id: uid(),
      case: selectedCase.title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      winner: winningPlayer?.name ?? null,
      players: [player1.name, player2.name],
    }, ...h]);
    setActiveTab('home');
    resetGame('new_case');
  };

  // ── Win check ────────────────────────────────────────────────────────────
  // Called after exchange_p1 to see if P2 starts their turn with 0 cards,
  // or after exchange_p2 to see if P1 starts their turn with 0 cards.
  const checkWinAndRoute = (nextPlayer, nextPlayerHand, nextPhase) => {
    if (nextPlayerHand.length === 0) {
      setWinningPlayer(nextPlayer);
      setGamePhase('player_wins');
    } else {
      setGamePhase(nextPhase);
    }
  };

  // ── P1 debate handlers ────────────────────────────────────────────────────

  // Called from counter_window skip and comeback to decide whether exchange is shown.
  // p1PlayedCard is set synchronously before entering the counter_window phase,
  // so it is safe to read here in subsequent callbacks.
  const endP1Turn = () => {
    setP1PlayedCard(false);
    checkWinAndRoute(player2, p2Hand, 'debate_p2');
  };

  const handleP1Done = (moveCard, hazardFollowed, hazardCard, timedOut = false) => {
    const prevHazard = activeHazard;
    // Hazard for P2's next debate: P1's inline pick, or fallback to pending hazard from P2's comeback
    const nextHazardForP2 = hazardCard || pendingHazardForP2 || null;
    setActiveHazard(nextHazardForP2);
    setPendingHazardForP2(null);

    let newHand = p1Hand;
    if (moveCard)   newHand = newHand.filter(c => c.id !== moveCard.id);
    if (hazardCard) newHand = newHand.filter(c => c.id !== hazardCard.id);

    if (prevHazard && !hazardFollowed) {
      const penalty = drawOneCard(history.length, newHand.map(c => c.id));
      if (penalty) newHand = [...newHand, penalty];
    }
    if (timedOut) {
      const penalty = drawOneCard(history.length, newHand.map(c => c.id));
      if (penalty) newHand = [...newHand, penalty];
    }
    setP1Hand(newHand);

    const played = !!(moveCard || hazardCard);
    setP1PlayedCard(played);
    setPhoneHolder('p2');

    // P2 cannot counter if a hazard was just placed on them
    const unusedCounters = (!nextHazardForP2) ? p2Hand.filter(c => c.cardType === 'counter') : [];
    if (unusedCounters.length > 0) {
      setGamePhase('counter_window_p2');
    } else if (played) {
      checkWinAndRoute(player2, p2Hand, 'debate_p2');
    } else {
      setGamePhase('exchange_p1');
    }
  };

  const handleP2CounterPlay = (card) => {
    setActiveCounterCard(card);
    setP2Hand(prev => prev.filter(c => c.id !== card.id));
    setGamePhase('comeback_p2'); // P2 (who played the counter) delivers it
  };

  // comeback_p1 = P1 delivered their counter against P2's argument → end P2's turn
  const handleComebackP1Done = (hazardCard) => {
    if (hazardCard) {
      setP1Hand(prev => prev.filter(c => c.id !== hazardCard.id));
      setPendingHazardForP2(hazardCard); // applied to P2's next debate via handleP1Done
    }
    setActiveCounterCard(null);
    setPhoneHolder('p1');
    if (p2PlayedCard) { endP2Turn(); } else { setGamePhase('exchange_p2'); }
  };

  const handleExchangeP1Done = (action, card) => {
    if (action === 'exchange' && card) {
      const allIds = p1Hand.map(c => c.id);
      const newCard = drawOneCard(history.length, allIds);
      if (newCard) setP1Hand(prev => prev.map(c => c.id === card.id ? newCard : c));
    }
    setPhoneHolder('p1');
    endP1Turn();
  };

  // ── P2 debate handlers ────────────────────────────────────────────────────

  const endP2Turn = () => {
    setP2PlayedCard(false);
    setCurrentRound(r => r + 1);
    checkWinAndRoute(player1, p1Hand, 'debate_p1');
  };

  const handleP2Done = (moveCard, hazardFollowed, hazardCard, timedOut = false) => {
    const prevHazard = activeHazard;
    // Hazard for P1's next debate: P2's inline pick, or fallback to pending hazard from P1's comeback
    const nextHazardForP1 = hazardCard || pendingHazardForP1 || null;
    setActiveHazard(nextHazardForP1);
    setPendingHazardForP1(null);

    let newHand = p2Hand;
    if (moveCard)   newHand = newHand.filter(c => c.id !== moveCard.id);
    if (hazardCard) newHand = newHand.filter(c => c.id !== hazardCard.id);

    if (prevHazard && !hazardFollowed) {
      const penalty = drawOneCard(history.length, newHand.map(c => c.id));
      if (penalty) newHand = [...newHand, penalty];
    }
    if (timedOut) {
      const penalty = drawOneCard(history.length, newHand.map(c => c.id));
      if (penalty) newHand = [...newHand, penalty];
    }
    setP2Hand(newHand);

    const played = !!(moveCard || hazardCard);
    setP2PlayedCard(played);
    setPhoneHolder('p1');

    // P1 cannot counter if a hazard was just placed on them
    const unusedCounters = (!nextHazardForP1) ? p1Hand.filter(c => c.cardType === 'counter') : [];
    if (unusedCounters.length > 0) {
      setGamePhase('counter_window_p1');
    } else if (played) {
      setCurrentRound(r => r + 1);
      checkWinAndRoute(player1, p1Hand, 'debate_p1');
    } else {
      setGamePhase('exchange_p2');
    }
  };

  const handleP1CounterPlay = (card) => {
    setActiveCounterCard(card);
    setP1Hand(prev => prev.filter(c => c.id !== card.id));
    setGamePhase('comeback_p1'); // P1 (who played the counter) delivers it
  };

  // comeback_p2 = P2 delivered their counter against P1's argument → end P1's turn
  const handleComebackP2Done = (hazardCard) => {
    if (hazardCard) {
      setP2Hand(prev => prev.filter(c => c.id !== hazardCard.id));
      setPendingHazardForP1(hazardCard); // applied to P1's next debate via handleP2Done
    }
    setActiveCounterCard(null);
    setPhoneHolder('p2');
    if (p1PlayedCard) { endP1Turn(); } else { setGamePhase('exchange_p1'); }
  };

  const handleExchangeP2Done = (action, card) => {
    if (action === 'exchange' && card) {
      const allIds = p2Hand.map(c => c.id);
      const newCard = drawOneCard(history.length, allIds);
      if (newCard) setP2Hand(prev => prev.map(c => c.id === card.id ? newCard : c));
    }
    setPhoneHolder('p2');
    endP2Turn();
  };

  // ── Daily flow simplified handlers ────────────────────────────────────────
  // Daily uses old 2-phase flow: debate_p1 → debate_p2 → repeat (no hazard/counter/exchange)

  const handleP1DoneDaily = (moveCard) => {
    if (moveCard) setP1Hand(prev => prev.filter(c => c.id !== moveCard.id));
    setGamePhase('debate_p2');
  };

  const handleP2DoneDaily = (moveCard) => {
    if (moveCard) setP2Hand(prev => prev.filter(c => c.id !== moveCard.id));
    setCurrentRound(r => r + 1);
    setGamePhase('debate_p1');
  };

  // ── Splash while loading ─────────────────────────────────────────────────
  if (!isReady) {
    return (
      <SafeAreaView style={S.safe}>
        <ExpoStatusBar style="light" />
        <HomeScreen dailyDraw={dailyDraw} onPlayDaily={() => {}} />
      </SafeAreaView>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────
  const renderContent = () => {
    if (activeTab === 'home') return (
      <HomeScreen
        dailyDraw={dailyDraw}
        onPlayDaily={handlePlayDaily}
        history={history}
        myName={players[0]?.name}
      />
    );
    if (activeTab === 'help') return <HelpScreen />;
    if (activeTab === 'dojo') return (
      <SoloDojoScreen completedDrills={completedDrills} onComplete={handleDrillComplete} />
    );
    if (activeTab === 'account') return (
      <AccountScreen
        players={players}
        onAdd={handleAddPlayer}
        onRemove={handleRemovePlayer}
        debateSecs={debateSecs}
        onDebateSecsChange={setDebateSecs}
        cardsPerPlayer={cardsPerPlayer}
        onCardsPerPlayerChange={setCardsPerPlayer}
        history={history}
        isOnboarding={isOnboarding}
        myName={players[0]?.name}
      />
    );

    switch (gamePhase) {
      // ── Quick Draw (solo) ─────────────────────────────────────────────────
      case 'quickdraw':
        return (
          <QuickDrawScreen
            caseCard={selectedCase}
            cards={dailyDraw.cards}
            onDone={() => { setActiveTab('home'); resetGame('new_case'); }}
          />
        );

      // ── Setup ─────────────────────────────────────────────────────────────
      case 'pick_players':
        return (
          <PlayerPickScreen
            players={players}
            onConfirm={(p1, p2) => {
              setPlayer1(p1); setPlayer2(p2);
              setGamePhase('debate_p1');
            }}
          />
        );

      case 'pick_case':
        return (
          <CasePickScreen
            players={players}
            onConfirm={(card, p1, p2) => {
              setSelectedCase(card);
              setPlayer1(p1); setPlayer2(p2);
              const all = dealCards(history.length, cardsPerPlayer * 2);
              setP1Hand(all.slice(0, cardsPerPlayer));
              setP2Hand(all.slice(cardsPerPlayer, cardsPerPlayer * 2));
              setGamePhase('debate_p1');
            }}
          />
        );

      // ── P1's turn ─────────────────────────────────────────────────────────
      case 'debate_p1':
        return (
          <DebateScreen
            key={`p1-round${currentRound}`}
            caseCard={selectedCase}
            player={player1}
            nextPlayerName={player2?.name}
            hand={p1Hand}
            activeHazard={activeHazard}
            debateSecs={debateSecs}
            onDone={gameMode === 'daily' ? handleP1DoneDaily : handleP1Done}
          />
        );

      case 'counter_window_p2': {
        const unusedCounters = p2Hand.filter(c => c.cardType === 'counter');
        return (
          <CounterWindowScreen
            player={player2}
            counterCards={unusedCounters}
            onPlay={handleP2CounterPlay}
            onSkip={() => p1PlayedCard ? endP1Turn() : setGamePhase('exchange_p1')}
          />
        );
      }

      case 'comeback_p1':
        return (
          <ComebackScreen
            player={player1}
            counterCard={activeCounterCard}
            hand={p1Hand}
            nextPlayerName={player2?.name}
            onDone={handleComebackP1Done}
          />
        );

      case 'exchange_p1':
        return (
          <ExchangeScreen
            player={player1}
            hand={p1Hand}
            onDone={handleExchangeP1Done}
          />
        );

      // ── P2's turn ─────────────────────────────────────────────────────────
      case 'debate_p2':
        return (
          <DebateScreen
            key={`p2-round${currentRound}`}
            caseCard={selectedCase}
            player={player2}
            nextPlayerName={player1?.name}
            hand={p2Hand}
            activeHazard={activeHazard}
            debateSecs={debateSecs}
            onDone={gameMode === 'daily' ? handleP2DoneDaily : handleP2Done}
          />
        );

      case 'counter_window_p1': {
        const unusedCounters = p1Hand.filter(c => c.cardType === 'counter');
        return (
          <CounterWindowScreen
            player={player1}
            counterCards={unusedCounters}
            onPlay={handleP1CounterPlay}
            onSkip={() => p2PlayedCard ? endP2Turn() : setGamePhase('exchange_p2')}
          />
        );
      }

      case 'comeback_p2':
        return (
          <ComebackScreen
            player={player2}
            counterCard={activeCounterCard}
            hand={p2Hand}
            nextPlayerName={player1?.name}
            onDone={handleComebackP2Done}
          />
        );

      case 'exchange_p2':
        return (
          <ExchangeScreen
            player={player2}
            hand={p2Hand}
            onDone={handleExchangeP2Done}
          />
        );

      // ── Win ───────────────────────────────────────────────────────────────
      case 'player_wins':
        return (
          <PlayerWinsScreen
            winner={winningPlayer}
            onContinue={handleEndGame}
          />
        );

      default:
        return <HomeScreen dailyDraw={dailyDraw} onPlayDaily={handlePlayDaily} canPlay={players.length >= 2} />;
    }
  };

  // Show the HandPanel only when the current phone-holder is actively playing
  // their VS turn (not during cover/handoff screens).
  const handPanelHand = (() => {
    if (activeTab !== 'game' || gameMode !== 'new_case') return null;
    if (['debate_p1', 'comeback_p1'].includes(gamePhase)) return p1Hand;
    if (['counter_window_p2'].includes(gamePhase)) return p2Hand;
    if (['debate_p2', 'comeback_p2'].includes(gamePhase)) return p2Hand;
    if (['counter_window_p1'].includes(gamePhase)) return p1Hand;
    return null;
  })();

  return (
    <SafeAreaView style={S.safe}>
      <ExpoStatusBar style="light" />
      <View style={{ flex: 1 }}>{renderContent()}</View>
      {handPanelHand ? <HandPanel hand={handPanelHand} /> : null}
      <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}
