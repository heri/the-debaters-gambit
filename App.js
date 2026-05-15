// The Debater's Gambit — v5.0
// App.js is the state machine and persistence layer only.
// Card data → data.js  |  Styles → styles.js  |  Components → components.js  |  Screens → screens.js

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
  CounterWindowScreen, CounterScreen, PlayerWinsScreen,
  SoloDojoScreen,
} from './screens';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GAME FLOWS
//   new_case – pick_case → [corner_time_p1] → debate_p1
//              → [counter_window_p2] → [counter_p2]
//              → [corner_time_p2] → debate_p2 → [repeat rounds until win]
//
//   daily    – pick_players → [corner_time_p1] → debate_p1
//              → [corner_time_p2] → debate_p2 → [repeat rounds until win]
//              (daily uses move cards only — no hazard/counter)
//
//   win      – when a player uses all their cards → player_wins → home
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function App() {
  // Startup
  const [isReady, setIsReady] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState('home');

  // Persisted across restarts
  const [players, setPlayers] = useState([]);
  // Per-game
  const [gamePhase, setGamePhase] = useState('pick_case');
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  // Each player's full hand: mix of move / hazard / counter cards
  const [p1Cards, setP1Cards] = useState([]);
  const [p2Cards, setP2Cards] = useState([]);

  // Track which card IDs have been used (played or played as counter/hazard)
  const [p1UsedCardIds, setP1UsedCardIds] = useState([]);
  const [p2UsedCardIds, setP2UsedCardIds] = useState([]);

  // Hazard card currently applied to the next player's debate turn
  const [activeHazard, setActiveHazard] = useState(null);

  // Counter card selected during counter window
  const [activeCounterCard, setActiveCounterCard] = useState(null);

  // Player who used all their cards
  const [winningPlayer, setWinningPlayer] = useState(null);

  const [debateSecs, setDebateSecs] = useState(DEFAULT_DEBATE_SECS);
  const [cornerTimeEnabled, setCornerTimeEnabled] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentP1Move, setCurrentP1Move] = useState(null);


  // In-memory across games
  const [history, setHistory] = useState([]);

  // Solo Dojo — persisted list of completed card IDs
  const [completedDrills, setCompletedDrills] = useState([]);

  // Daily draw is stable for the session (date doesn't change mid-game)
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
        if (s.debateSecs)                 setDebateSecs(s.debateSecs);
        if (s.cornerTimeEnabled !== undefined) setCornerTimeEnabled(s.cornerTimeEnabled);
      }

      if (completedDrillsRaw) setCompletedDrills(JSON.parse(completedDrillsRaw));

      setIsReady(true);
    }).catch(() => setIsReady(true));
  }, []);

  // ── Persist whenever data changes (skip before initial load) ─────────────
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

  // ── Win condition check ──────────────────────────────────────────────────
  // Returns the winning player object if they've used all their cards, else null.
  const checkWin = (usedIds, hand, player) => {
    if (hand.length > 0 && usedIds.length >= hand.length) return player;
    return null;
  };

  // ── Game management ──────────────────────────────────────────────────────
  const resetGame = (mode = 'new_case') => {
    setPlayer1(null); setPlayer2(null); setSelectedCase(null);
    setP1Cards([]); setP2Cards([]);
    setP1UsedCardIds([]); setP2UsedCardIds([]);
    setActiveHazard(null); setActiveCounterCard(null);
    setWinningPlayer(null);
    setCurrentRound(1);
    setCurrentP1Move(null);
    setGamePhase(mode === 'new_case' ? 'pick_case' : 'pick_players');
  };

  const handleTabPress = tab => {
    if (tab === 'game') resetGame('new_case');
    setActiveTab(tab);
  };

  const handlePlayDaily = () => {
    resetGame('daily');
    setSelectedCase(dailyDraw.caseCard);
    // Daily mode: move cards only (one each, shared card is fine for quick draw)
    setP1Cards([dailyDraw.moveCard]);
    setP2Cards([dailyDraw.moveCard]);
    setActiveTab('game');
  };

  // ── P2 counter window routing ────────────────────────────────────────────
  const routeAfterPass = () => {
    const unusedCounters = p2Cards.filter(
      c => c.cardType === 'counter' && !p2UsedCardIds.includes(c.id)
    );
    if (unusedCounters.length > 0) {
      setGamePhase('counter_window_p2');
    } else {
      setGamePhase(cornerTimeEnabled ? 'corner_time_p2' : 'debate_p2');
    }
  };

  // ── P1 finishes arguing ──────────────────────────────────────────────────
  const handleP1Done = (moveCard, _note, hazardCard) => {
    setActiveHazard(null);
    setCurrentP1Move(moveCard);

    const newUsed = [...p1UsedCardIds];
    if (moveCard)   newUsed.push(moveCard.id);
    if (hazardCard) newUsed.push(hazardCard.id);
    setP1UsedCardIds(newUsed);
    if (hazardCard) setActiveHazard(hazardCard);

    const winner = checkWin(newUsed, p1Cards, player1);
    if (winner) { setWinningPlayer(winner); setGamePhase('player_wins'); return; }

    routeAfterPass();
  };

  // ── P1 exchanges a card ──────────────────────────────────────────────────
  const handleP1Exchange = (cardToDiscard) => {
    const allIds = p1Cards.map(c => c.id);
    const newCard = drawOneCard(history.length, allIds);
    if (newCard) {
      setP1Cards(prev => prev.map(c => c.id === cardToDiscard.id ? newCard : c));
    }
    routeAfterPass();
  };

  // ── P2 plays counter card ────────────────────────────────────────────────
  const handleP2CounterPlay = (card) => {
    setActiveCounterCard(card);
    const newUsed = [...p2UsedCardIds, card.id];
    setP2UsedCardIds(newUsed);
    // Check win before counter screen (unlikely but consistent)
    const winner = checkWin(newUsed, p2Cards, player2);
    if (winner) { setWinningPlayer(winner); setGamePhase('player_wins'); return; }
    setGamePhase('counter_p2');
  };

  const handleP2CounterDone = () => {
    setGamePhase(cornerTimeEnabled ? 'corner_time_p2' : 'debate_p2');
  };

  // ── P2 finishes arguing ──────────────────────────────────────────────────
  const handleP2Done = (moveCard, _note, hazardCard) => {
    setActiveHazard(null);

    const newUsed = [...p2UsedCardIds];
    if (moveCard)   newUsed.push(moveCard.id);
    if (hazardCard) newUsed.push(hazardCard.id);
    setP2UsedCardIds(newUsed);
    if (hazardCard) setActiveHazard(hazardCard);

    const winner = checkWin(newUsed, p2Cards, player2);
    if (winner) { setWinningPlayer(winner); setGamePhase('player_wins'); return; }

    setRoundHistory(prev => [...prev, { roundNum: currentRound, p1Move: currentP1Move, p2Move: moveCard }]);
    setCurrentRound(r => r + 1);
    setCurrentP1Move(null);
    setGamePhase(cornerTimeEnabled ? 'corner_time_p1' : 'debate_p1');
  };

  // ── P2 exchanges a card ──────────────────────────────────────────────────
  const handleP2Exchange = (cardToDiscard) => {
    const allIds = p2Cards.map(c => c.id);
    const newCard = drawOneCard(history.length, allIds);
    if (newCard) {
      setP2Cards(prev => prev.map(c => c.id === cardToDiscard.id ? newCard : c));
    }
    setRoundHistory(prev => [...prev, { roundNum: currentRound, p1Move: currentP1Move, p2Move: null }]);
    setCurrentRound(r => r + 1);
    setCurrentP1Move(null);
    setGamePhase(cornerTimeEnabled ? 'corner_time_p1' : 'debate_p1');
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

  // ── Splash while AsyncStorage loads ─────────────────────────────────────
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
              const all4 = dealCards(history.length, 4);
              setP1Cards(all4.slice(0, 2));
              setP2Cards(all4.slice(2, 4));
              setGamePhase(cornerTimeEnabled ? 'corner_time_p1' : 'debate_p1');
            }}
          />
        );

      case 'corner_time_p1':
        return (
          <CornerTimeScreen
            player={player1}
            cards={p1Cards}
            onReady={() => setGamePhase('debate_p1')}
          />
        );

      case 'corner_time_p2':
        return (
          <CornerTimeScreen
            player={player2}
            cards={p2Cards}
            onReady={() => setGamePhase('debate_p2')}
          />
        );

      case 'debate_p1':
        return (
          <DebateScreen
            key={`p1-round${currentRound}`}
            caseCard={selectedCase}
            player={player1}
            nextPlayerName={player2?.name}
            cards={p1Cards}
            activeHazard={activeHazard}
            debateSecs={debateSecs}
            onDone={handleP1Done}
            onExchange={handleP1Exchange}
          />
        );

      case 'counter_window_p2': {
        const unusedCounters = p2Cards.filter(
          c => c.cardType === 'counter' && !p2UsedCardIds.includes(c.id)
        );
        return (
          <CounterWindowScreen
            player={player2}
            counterCards={unusedCounters}
            onPlay={handleP2CounterPlay}
            onSkip={() => setGamePhase(cornerTimeEnabled ? 'corner_time_p2' : 'debate_p2')}
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

      case 'debate_p2':
        return (
          <DebateScreen
            key={`p2-round${currentRound}`}
            caseCard={selectedCase}
            player={player2}
            nextPlayerName={null}
            cards={p2Cards}
            activeHazard={activeHazard}
            debateSecs={debateSecs}
            onDone={handleP2Done}
            onExchange={handleP2Exchange}
          />
        );

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
