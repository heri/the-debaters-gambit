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
  PlayerPickScreen, CasePickScreen, CornerTimeScreen, DebateScreen,
  HazardWindowScreen, CounterWindowScreen, CounterScreen,
  ComebackScreen, ExchangeScreen, PlayerWinsScreen,
  SoloDojoScreen,
} from './screens';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GAME FLOW (new_case)
//
//   pick_case
//   → hazard_window_for_p1   (P2 plays hazard against P1, or skips)
//   → [corner_time_p1]
//   → debate_p1
//   → counter_window_p2      (P2 has 15s to play counter, or skip)
//   → [counter_p2]
//   → [comeback_p1]          (only if counter played)
//   → exchange_p1
//   → [win check: if P2 has 0 cards → P2 wins]
//   → hazard_window_for_p2   (P1 plays hazard against P2, or skips)
//   → [corner_time_p2]
//   → debate_p2
//   → counter_window_p1      (P1 has 15s, or skip)
//   → [counter_p1]
//   → [comeback_p2]
//   → exchange_p2
//   → [win check: if P1 has 0 cards → P1 wins]
//   → hazard_window_for_p1   (repeat)
//
// GAME FLOW (daily) — simplified, move cards only:
//   pick_players → [corner_time_p1] → debate_p1 → [corner_time_p2] → debate_p2 → repeat
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

  // Winner
  const [winningPlayer, setWinningPlayer] = useState(null);

  const [debateSecs, setDebateSecs] = useState(DEFAULT_DEBATE_SECS);
  const [cornerTimeEnabled, setCornerTimeEnabled] = useState(true);
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
        if (s.debateSecs)                      setDebateSecs(s.debateSecs);
        if (s.cornerTimeEnabled !== undefined) setCornerTimeEnabled(s.cornerTimeEnabled);
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
    AsyncStorage.setItem('settings', JSON.stringify({ debateSecs, cornerTimeEnabled })).catch(() => {});
  }, [debateSecs, cornerTimeEnabled, isReady]);

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
    setWinningPlayer(null);
    setCurrentRound(1);
    setGamePhase(mode === 'new_case' ? 'pick_case' : 'pick_players');
  };

  const handleTabPress = tab => {
    if (tab === 'game') resetGame('new_case');
    setActiveTab(tab);
  };

  const handlePlayDaily = () => {
    resetGame('daily');
    setSelectedCase(dailyDraw.caseCard);
    setP1Hand([dailyDraw.moveCard]);
    setP2Hand([dailyDraw.moveCard]);
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

  // ── Hazard Window handlers ────────────────────────────────────────────────

  // P2 played (or skipped) hazard before P1's turn
  const handleHazardForP1 = (hazardCard) => {
    if (hazardCard) {
      setP2Hand(prev => prev.filter(c => c.id !== hazardCard.id));
      setActiveHazard(hazardCard);
    } else {
      setActiveHazard(null);
    }
    setPhoneHolder('p1'); // phone handed back to arguer P1
    setGamePhase(cornerTimeEnabled ? 'corner_time_p1' : 'debate_p1');
  };

  // P1 played (or skipped) hazard before P2's turn
  const handleHazardForP2 = (hazardCard) => {
    if (hazardCard) {
      setP1Hand(prev => prev.filter(c => c.id !== hazardCard.id));
      setActiveHazard(hazardCard);
    } else {
      setActiveHazard(null);
    }
    setPhoneHolder('p2'); // phone handed back to arguer P2
    setGamePhase(cornerTimeEnabled ? 'corner_time_p2' : 'debate_p2');
  };

  // ── P1 debate handlers ────────────────────────────────────────────────────

  const handleP1Done = (moveCard, hazardFollowed) => {
    const prevHazard = activeHazard;
    setActiveHazard(null);

    let newHand = moveCard ? p1Hand.filter(c => c.id !== moveCard.id) : p1Hand;

    // Penalty: if hazard was active and not followed → draw an extra card
    if (prevHazard && !hazardFollowed) {
      const penalty = drawOneCard(history.length, newHand.map(c => c.id));
      if (penalty) newHand = [...newHand, penalty];
    }
    setP1Hand(newHand);

    // Debate modal passes phone to P2 for counter window
    setPhoneHolder('p2');

    // Route to counter window if P2 has unused counter cards
    const unusedCounters = p2Hand.filter(c => c.cardType === 'counter');
    if (unusedCounters.length > 0) {
      setGamePhase('counter_window_p2');
    } else {
      setGamePhase('exchange_p1');
    }
  };

  const handleP2CounterPlay = (card) => {
    setActiveCounterCard(card);
    setP2Hand(prev => prev.filter(c => c.id !== card.id));
    setGamePhase('counter_p2');
  };

  const handleP2CounterDone = () => {
    setGamePhase('comeback_p1');
  };

  const handleComebackP1Done = (moveCard) => {
    if (moveCard) setP1Hand(prev => prev.filter(c => c.id !== moveCard.id));
    setActiveCounterCard(null);
    setPhoneHolder('p1'); // P1 just made comeback, still holds phone
    setGamePhase('exchange_p1');
  };

  const handleExchangeP1Done = (action, card) => {
    if (action === 'exchange' && card) {
      const allIds = p1Hand.map(c => c.id);
      const newCard = drawOneCard(history.length, allIds);
      if (newCard) setP1Hand(prev => prev.map(c => c.id === card.id ? newCard : c));
    }
    setPhoneHolder('p1'); // P1 retains phone after exchange (cover or no cover)
    // Check if P2 starts their turn with 0 cards
    checkWinAndRoute(player2, p2Hand, 'hazard_window_for_p2');
  };

  // ── P2 debate handlers ────────────────────────────────────────────────────

  const handleP2Done = (moveCard, hazardFollowed) => {
    const prevHazard = activeHazard;
    setActiveHazard(null);

    let newHand = moveCard ? p2Hand.filter(c => c.id !== moveCard.id) : p2Hand;

    if (prevHazard && !hazardFollowed) {
      const penalty = drawOneCard(history.length, newHand.map(c => c.id));
      if (penalty) newHand = [...newHand, penalty];
    }
    setP2Hand(newHand);

    // Debate modal passes phone to P1 for counter window
    setPhoneHolder('p1');

    const unusedCounters = p1Hand.filter(c => c.cardType === 'counter');
    if (unusedCounters.length > 0) {
      setGamePhase('counter_window_p1');
    } else {
      setGamePhase('exchange_p2');
    }
  };

  const handleP1CounterPlay = (card) => {
    setActiveCounterCard(card);
    setP1Hand(prev => prev.filter(c => c.id !== card.id));
    setGamePhase('counter_p1');
  };

  const handleP1CounterDone = () => {
    setGamePhase('comeback_p2');
  };

  const handleComebackP2Done = (moveCard) => {
    if (moveCard) setP2Hand(prev => prev.filter(c => c.id !== moveCard.id));
    setActiveCounterCard(null);
    setPhoneHolder('p2'); // P2 just made comeback, still holds phone
    setGamePhase('exchange_p2');
  };

  const handleExchangeP2Done = (action, card) => {
    if (action === 'exchange' && card) {
      const allIds = p2Hand.map(c => c.id);
      const newCard = drawOneCard(history.length, allIds);
      if (newCard) setP2Hand(prev => prev.map(c => c.id === card.id ? newCard : c));
    }
    setPhoneHolder('p2'); // P2 retains phone after exchange (cover or no cover)
    setCurrentRound(r => r + 1);
    // Check if P1 starts their turn with 0 cards
    checkWinAndRoute(player1, p1Hand, 'hazard_window_for_p1');
  };

  // ── Daily flow simplified handlers ────────────────────────────────────────
  // Daily uses old 2-phase flow: debate_p1 → debate_p2 → repeat (no hazard/counter/exchange)

  const handleP1DoneDaily = (moveCard) => {
    if (moveCard) setP1Hand(prev => prev.filter(c => c.id !== moveCard.id));
    setGamePhase(cornerTimeEnabled ? 'corner_time_p2' : 'debate_p2');
  };

  const handleP2DoneDaily = (moveCard) => {
    if (moveCard) setP2Hand(prev => prev.filter(c => c.id !== moveCard.id));
    setCurrentRound(r => r + 1);
    setGamePhase(cornerTimeEnabled ? 'corner_time_p1' : 'debate_p1');
  };

  // ── Splash while loading ─────────────────────────────────────────────────
  if (!isReady) {
    return (
      <SafeAreaView style={S.safe}>
        <ExpoStatusBar style="light" />
        <HomeScreen dailyDraw={dailyDraw} onPlayDaily={() => {}} canPlay={false} />
      </SafeAreaView>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────
  const renderContent = () => {
    if (activeTab === 'home') return (
      <HomeScreen
        dailyDraw={dailyDraw}
        onPlayDaily={handlePlayDaily}
        canPlay={players.length >= 2}
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
        cornerTimeEnabled={cornerTimeEnabled}
        onCornerTimeChange={setCornerTimeEnabled}
        history={history}
        isOnboarding={isOnboarding}
        myName={players[0]?.name}
      />
    );

    switch (gamePhase) {
      // ── Setup ─────────────────────────────────────────────────────────────
      case 'pick_players':
        return (
          <PlayerPickScreen
            players={players}
            onConfirm={(p1, p2) => {
              setPlayer1(p1); setPlayer2(p2);
              setGamePhase(cornerTimeEnabled ? 'corner_time_p1' : 'debate_p1');
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
              const all6 = dealCards(history.length, 6);
              setP1Hand(all6.slice(0, 3));
              setP2Hand(all6.slice(3, 6));
              setGamePhase('hazard_window_for_p1');
            }}
          />
        );

      // ── P1's turn ─────────────────────────────────────────────────────────
      case 'hazard_window_for_p1': {
        const hazardCards = p2Hand.filter(c => c.cardType === 'hazard');
        return (
          <HazardWindowScreen
            arguer={player1}
            hazardPlayer={player2}
            hazardCards={hazardCards}
            hazardPlayerAlreadyHasPhone={phoneHolder === 'p2'}
            onDone={handleHazardForP1}
          />
        );
      }

      case 'corner_time_p1':
        return (
          <CornerTimeScreen
            player={player1}
            cards={p1Hand}
            activeHazard={activeHazard}
            onReady={() => setGamePhase('debate_p1')}
          />
        );

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
            onSkip={() => setGamePhase('exchange_p1')}
          />
        );
      }

      case 'counter_p2':
        return (
          <CounterScreen
            player={player2}
            caseCard={selectedCase}
            counterCard={activeCounterCard}
            onDone={handleP2CounterDone}
          />
        );

      case 'comeback_p1':
        return (
          <ComebackScreen
            player={player1}
            caseCard={selectedCase}
            hand={p1Hand}
            onDone={handleComebackP1Done}
          />
        );

      case 'exchange_p1':
        return (
          <ExchangeScreen
            player={player1}
            hand={p1Hand}
            playerAlreadyHasPhone={phoneHolder === 'p1'}
            onDone={handleExchangeP1Done}
          />
        );

      // ── P2's turn ─────────────────────────────────────────────────────────
      case 'hazard_window_for_p2': {
        const hazardCards = p1Hand.filter(c => c.cardType === 'hazard');
        return (
          <HazardWindowScreen
            arguer={player2}
            hazardPlayer={player1}
            hazardCards={hazardCards}
            hazardPlayerAlreadyHasPhone={phoneHolder === 'p1'}
            onDone={handleHazardForP2}
          />
        );
      }

      case 'corner_time_p2':
        return (
          <CornerTimeScreen
            player={player2}
            cards={p2Hand}
            activeHazard={activeHazard}
            onReady={() => setGamePhase('debate_p2')}
          />
        );

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
            onSkip={() => setGamePhase('exchange_p2')}
          />
        );
      }

      case 'counter_p1':
        return (
          <CounterScreen
            player={player1}
            caseCard={selectedCase}
            counterCard={activeCounterCard}
            onDone={handleP1CounterDone}
          />
        );

      case 'comeback_p2':
        return (
          <ComebackScreen
            player={player2}
            caseCard={selectedCase}
            hand={p2Hand}
            onDone={handleComebackP2Done}
          />
        );

      case 'exchange_p2':
        return (
          <ExchangeScreen
            player={player2}
            hand={p2Hand}
            playerAlreadyHasPhone={phoneHolder === 'p2'}
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

  return (
    <SafeAreaView style={S.safe}>
      <ExpoStatusBar style="light" />
      <View style={{ flex: 1 }}>{renderContent()}</View>
      <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}
