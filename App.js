// The Debater's Gambit — v4.1
// App.js is the state machine and persistence layer only.
// Card data → data.js  |  Styles → styles.js  |  Components → components.js  |  Screens → screens.js

import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { uid, DEFAULT_DEBATE_SECS, getDailyDraw, dealMoveCards } from './data';
import { S } from './styles';
import { BottomNav } from './components';
import {
  HomeScreen, HelpScreen, AccountScreen,
  PlayerPickScreen, CasePickScreen, CornerTimeScreen, PassScreen, DebateScreen,
  RoundEndScreen, PointsScreen, SoloDojoScreen,
} from './screens';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GAME FLOWS
//   new_case – tap ⚔️: pick_case → debate_p1 → pass_to_p2 → debate_p2
//              → round_end → [repeat | points]
//              Player selection + case browsing happen together in CasePickScreen.
//              Each player is dealt their own 2 move cards (no sharing).
//
//   daily    – tap ▶ Quick Draw: pick_players → debate_p1 → pass_to_p2
//              → debate_p2 → round_end → [repeat | points]
//              Case and move card are pre-seeded from today's date.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function App() {
  // Startup
  const [isReady, setIsReady] = useState(false);
  const [isOnboarding, setIsOnboarding] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState('home');

  // Persisted across restarts
  const [players, setPlayers] = useState([]);
  const [defaultRounds, setDefaultRounds] = useState(1);

  // Per-game
  const [gamePhase, setGamePhase] = useState('pick_case');
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [p1Moves, setP1Moves] = useState([]);
  const [p2Moves, setP2Moves] = useState([]);
  const [debateSecs, setDebateSecs] = useState(DEFAULT_DEBATE_SECS);
  const [cornerTimeEnabled, setCornerTimeEnabled] = useState(true);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentP1Move, setCurrentP1Move] = useState(null);
  const [currentP2Move, setCurrentP2Move] = useState(null);
  const [roundHistory, setRoundHistory] = useState([]);

  // In-memory across games
  const [history, setHistory] = useState([]);

  // Solo Dojo — persisted list of completed card IDs
  const [completedDrills, setCompletedDrills] = useState([]);

  // Daily draw is stable for the session (date doesn't change mid-game)
  const dailyDraw = useMemo(() => getDailyDraw(), []);

  // ── Load from AsyncStorage on mount ─────────────────────────────────────
  useEffect(() => {
    AsyncStorage.multiGet(['players', 'settings', 'completedDrills']).then(results => {
      const playersRaw        = results[0][1];
      const settingsRaw       = results[1][1];
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
        if (s.defaultRounds) setDefaultRounds(s.defaultRounds);
        if (s.debateSecs) setDebateSecs(s.debateSecs);
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
    AsyncStorage.setItem('settings', JSON.stringify({ defaultRounds, debateSecs, cornerTimeEnabled })).catch(() => {});
  }, [defaultRounds, debateSecs, cornerTimeEnabled, isReady]);

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
    setPlayer1(null); setPlayer2(null); setSelectedCase(null);
    setP1Moves([]); setP2Moves([]);
    setCurrentRound(1);
    setCurrentP1Move(null); setCurrentP2Move(null);
    setRoundHistory([]);
    // new_case: player selection is inline in CasePickScreen — skip pick_players
    // daily: still shows PlayerPickScreen first
    setGamePhase(mode === 'new_case' ? 'pick_case' : 'pick_players');
  };

  const handleTabPress = tab => {
    if (tab === 'game') resetGame('new_case');
    setActiveTab(tab);
  };

  // Launch the daily draw from the Home screen Quick Draw card.
  // Pre-loads case + the daily move card so pick_case is skipped entirely.
  const handlePlayDaily = () => {
    resetGame('daily');
    setSelectedCase(dailyDraw.caseCard);
    setP1Moves([dailyDraw.moveCard]);
    setP2Moves([dailyDraw.moveCard]);
    setActiveTab('game');
  };

  const handleP1Done = move => { setCurrentP1Move(move); setGamePhase('pass_to_p2'); };
  const handleP2Done = move => { setCurrentP2Move(move); setGamePhase('round_end'); };

  const handleNextRound = () => {
    setRoundHistory(prev => [...prev, { roundNum: currentRound, p1Move: currentP1Move, p2Move: currentP2Move }]);
    setCurrentRound(r => r + 1);
    setCurrentP1Move(null); setCurrentP2Move(null);
    setGamePhase(cornerTimeEnabled ? 'corner_time_p1' : 'debate_p1');
  };

  const handleEndGame = () => {
    setRoundHistory(prev => [...prev, { roundNum: currentRound, p1Move: currentP1Move, p2Move: currentP2Move }]);
    setGamePhase('points');
  };

  const handleSavePoints = (p1pts, p2pts) => {
    setHistory(h => [{
      id: uid(),
      case: selectedCase.title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      players: [{ name: player1.name, points: p1pts }, { name: player2.name, points: p2pts }],
    }, ...h]);
    setActiveTab('home');
    resetGame('new_case');
  };

  // ── Splash while AsyncStorage loads ─────────────────────────────────────
  if (!isReady) {
    return (
      <SafeAreaView style={S.safe}>
        <ExpoStatusBar style="light" />
        <HomeScreen
          dailyDraw={dailyDraw}
          onPlayDaily={() => {}}
          canPlay={false}
        />
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
      />
    );
    if (activeTab === 'help') return <HelpScreen />;
    if (activeTab === 'dojo') return (
      <SoloDojoScreen
        completedDrills={completedDrills}
        onComplete={handleDrillComplete}
      />
    );
    if (activeTab === 'account') return (
      <AccountScreen
        players={players}
        onAdd={handleAddPlayer}
        onRemove={handleRemovePlayer}
        defaultRounds={defaultRounds}
        onRoundsChange={setDefaultRounds}
        debateSecs={debateSecs}
        onDebateSecsChange={setDebateSecs}
        cornerTimeEnabled={cornerTimeEnabled}
        onCornerTimeChange={setCornerTimeEnabled}
        history={history}
        isOnboarding={isOnboarding}
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
              const all4 = dealMoveCards(history.length, 4);
              setP1Moves(all4.slice(0, 2));
              setP2Moves(all4.slice(2, 4));
              setGamePhase(cornerTimeEnabled ? 'corner_time_p1' : 'debate_p1');
            }}
          />
        );

      case 'corner_time_p1':
        return (
          <CornerTimeScreen
            player={player1}
            moves={p1Moves}
            onReady={() => setGamePhase('debate_p1')}
          />
        );

      case 'corner_time_p2':
        return (
          <CornerTimeScreen
            player={player2}
            moves={p2Moves}
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
            moves={p1Moves}
            debateSecs={debateSecs}
            onDone={handleP1Done}
          />
        );

      case 'pass_to_p2':
        return <PassScreen name={player2?.name} onReady={() => setGamePhase(cornerTimeEnabled ? 'corner_time_p2' : 'debate_p2')} />;

      case 'debate_p2':
        return (
          <DebateScreen
            key={`p2-round${currentRound}`}
            caseCard={selectedCase}
            player={player2}
            nextPlayerName={null}
            moves={p2Moves}
            debateSecs={debateSecs}
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
