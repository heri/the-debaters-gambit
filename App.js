// The Debater's Gambit — v4.1
// App.js is the state machine and persistence layer only.
// Card data → data.js  |  Styles → styles.js  |  Components → components.js  |  Screens → screens.js

import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { uid, sortedCases, getDailyDraw, dealMoveCards } from './data';
import { S } from './styles';
import { CardBrowser, CaseCardView, BottomNav } from './components';
import {
  HomeScreen, HelpScreen, AccountScreen,
  PlayerPickScreen, PassScreen, DebateScreen,
  RoundEndScreen, PointsScreen, SoloDojoScreen,
} from './screens';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GAME MODES
//   'daily'    – case + single move card pre-seeded by today's date.
//                Launched from the Home screen Quick Draw button.
//   'new_case' – user browses and picks a case; each player is dealt 2 move
//                cards (NOVICE only until 10 games in history).
//
// GAME PHASES (shared by both modes)
//   pick_players → pick_case (new_case only) → debate_p1 → pass_to_p2
//   → debate_p2 → round_end → debate_p1 (next round) | points
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
  const [gameMode, setGameMode] = useState('new_case'); // 'daily' | 'new_case'
  const [gamePhase, setGamePhase] = useState('pick_players');
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [availableMoves, setAvailableMoves] = useState([]); // cards dealt for this game
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
    AsyncStorage.setItem('settings', JSON.stringify({ defaultRounds })).catch(() => {});
  }, [defaultRounds, isReady]);

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
    setGamePhase('pick_players');
    setPlayer1(null); setPlayer2(null); setSelectedCase(null);
    setAvailableMoves([]);
    setCurrentRound(1);
    setCurrentP1Move(null); setCurrentP2Move(null);
    setRoundHistory([]);
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
    setAvailableMoves([dailyDraw.moveCard]); // one shared move card for both players
    setActiveTab('game');
  };

  const handleP1Done = move => { setCurrentP1Move(move); setGamePhase('pass_to_p2'); };
  const handleP2Done = move => { setCurrentP2Move(move); setGamePhase('round_end'); };

  const handleNextRound = () => {
    setRoundHistory(prev => [...prev, { roundNum: currentRound, p1Move: currentP1Move, p2Move: currentP2Move }]);
    setCurrentRound(r => r + 1);
    setCurrentP1Move(null); setCurrentP2Move(null);
    setGamePhase('debate_p1');
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
              // Daily mode skips case browsing — case + move are already set
              setGamePhase(gameMode === 'daily' ? 'debate_p1' : 'pick_case');
            }}
          />
        );

      case 'pick_case':
        return (
          <CardBrowser
            cards={sortedCases}
            renderCard={card => <CaseCardView card={card} />}
            onChoose={card => {
              // Deal 2 move cards the moment the case is locked in.
              // NOVICE only for the first 10 rounds of history.
              setSelectedCase(card);
              setAvailableMoves(dealMoveCards(history.length));
              setGamePhase('debate_p1');
            }}
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
            availableMoves={availableMoves}
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
            availableMoves={availableMoves}
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
