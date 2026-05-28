// The Debater's Gambit — v6.0
// App.js is the state machine and persistence layer only.
// Card data → cards.js  |  Styles → styles.js  |  Components → components.js  |  Screens → screens.js

import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { uid, DEFAULT_DEBATE_SECS, getDailyDraw, dealCards, drawOneCard, fetchRemoteCards, getMergedCases } from './data';
import { apiGetMe, apiCompleteDrill, apiGetCompletedDrills, apiRecordGame, apiSignOut } from './api';
import { S } from './styles';
import { BottomNav } from './components';
import {
  HomeScreen, HelpScreen, AccountScreen,
  PlayerPickScreen, CasePickScreen, DebateScreen,
  DelegateDebateScreen, CounterWindowScreen,
  ComebackScreen, ExchangeScreen, PlayerWinsScreen,
  SoloDojoScreen, QuickDrawScreen, ComplianceCheckScreen,
  OnboardingScreen, AuthScreen,
} from './screens';
import { HandPanel } from './components';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GAME FLOW (VS mode)
//
//   pick_case
//   → debate_p1              (P1 argues; picks hazard for P2 inline)
//   → [hazard_check_p2]      (P2 judges if P1 followed the hazard — if one was active)
//   → counter_window_p2      (P2 has 15s to play counter, or skip)
//   → [comeback_p1]          (P1 delivers counter argument)
//   → [counter_check_p2]     (P2 judges if P1's counter was effective)
//   → [exchange_p1]
//   → [win check: if P2 has 0 cards → P2 wins]
//   → debate_p2              (P2 argues; picks hazard for P1 inline)
//   → [hazard_check_p1]      (P1 judges if P2 followed the hazard)
//   → counter_window_p1      (P1 has 15s, or skip)
//   → [comeback_p2]          (P2 delivers counter argument)
//   → [counter_check_p1]     (P1 judges if P2's counter was effective)
//   → [exchange_p2]
//   → [win check: if P1 has 0 cards → P1 wins]
//   → debate_p1              (repeat)
//
// GAME FLOW (Quick Draw — solo):
//   quickdraw  (self-contained, no phases)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function App() {
  // Startup
  const [isReady, setIsReady] = useState(false);
  // 'loading' | 'onboarding' | 'auth' | 'app'
  const [startupPhase, setStartupPhase] = useState('loading');
  const [isOnboarding, setIsOnboarding] = useState(false);

  // Authenticated user (null = guest)
  const [authUser, setAuthUser]   = useState(null);
  const [authToken, setAuthToken] = useState(null);

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

  // Delegate card state: move card and hazard passed into the DelegateDebateScreen
  const [activeDelegateMoveCard, setActiveDelegateMoveCard] = useState(null);
  const [activeDelegateHazard,   setActiveDelegateHazard]   = useState(null);

  // The hazard or counter card being judged in a compliance check phase
  const [complianceCard, setComplianceCard] = useState(null);

  // Winner
  const [winningPlayer, setWinningPlayer] = useState(null);

  const [debateSecs, setDebateSecs] = useState(DEFAULT_DEBATE_SECS);
  const [cardsPerPlayer, setCardsPerPlayer] = useState(2);
  const [currentRound, setCurrentRound] = useState(1);

  const [history, setHistory] = useState([]);
  const [completedDrills, setCompletedDrills] = useState([]);
  const [remoteCards, setRemoteCards] = useState(null);

  const dailyDraw = useMemo(() => getDailyDraw(), []);

  // ── Load from AsyncStorage on mount ─────────────────────────────────────
  useEffect(() => {
    AsyncStorage.multiGet([
      'players', 'settings', 'completedDrills',
      'onboarding_seen', 'auth_skipped', 'auth_token',
    ]).then(async results => {
      const playersRaw         = results[0][1];
      const settingsRaw        = results[1][1];
      const completedDrillsRaw = results[2][1];
      const onboardingSeen     = results[3][1];
      const authSkipped        = results[4][1];
      const savedToken         = results[5][1];

      // ── Local state ──────────────────────────────────────────────────────
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
        if (s.debateSecs)                   setDebateSecs(s.debateSecs);
        if (s.cardsPerPlayer !== undefined) setCardsPerPlayer(s.cardsPerPlayer);
      }
      if (completedDrillsRaw) setCompletedDrills(JSON.parse(completedDrillsRaw));

      setIsReady(true);
      fetchRemoteCards().then(remote => { if (remote) setRemoteCards(remote); }).catch(() => {});

      // ── Auth check ───────────────────────────────────────────────────────
      if (savedToken) {
        const user = await apiGetMe(savedToken);
        if (user) {
          setAuthUser(user);
          setAuthToken(savedToken);
          // Merge server-side completed drills into local state
          const serverDrills = await apiGetCompletedDrills(savedToken);
          if (serverDrills.length > 0) {
            setCompletedDrills(prev => [...new Set([...prev, ...serverDrills])]);
          }
          setStartupPhase('app');
          return;
        }
        // Token expired / invalid — discard it
        AsyncStorage.removeItem('auth_token').catch(() => {});
      }

      // ── No valid token: decide where to start ────────────────────────────
      if (!onboardingSeen) {
        setStartupPhase('onboarding');
      } else if (!authSkipped) {
        setStartupPhase('auth');
      } else {
        setStartupPhase('app');
      }
    }).catch(() => { setIsReady(true); setStartupPhase('app'); });
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

  const handleAuthSuccess = (user, token) => {
    AsyncStorage.setItem('auth_token', token).catch(() => {});
    setAuthUser(user);
    setAuthToken(token);
    setStartupPhase('app');
    // Merge server-side drills
    apiGetCompletedDrills(token).then(serverDrills => {
      if (serverDrills.length > 0) setCompletedDrills(prev => [...new Set([...prev, ...serverDrills])]);
    });
  };

  const handleSignOut = () => {
    if (authToken) apiSignOut(authToken);
    AsyncStorage.multiRemove(['auth_token', 'auth_skipped']).catch(() => {});
    setAuthUser(null);
    setAuthToken(null);
    setStartupPhase('auth');
  };

  // ── Solo Dojo ────────────────────────────────────────────────────────────
  const handleDrillComplete = cardId => {
    if (!completedDrills.includes(cardId)) {
      setCompletedDrills(prev => [...prev, cardId]);
      if (authToken) apiCompleteDrill(authToken, cardId);
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
    setActiveDelegateMoveCard(null); setActiveDelegateHazard(null);
    setComplianceCard(null);
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
    const entry = {
      id: uid(),
      case: selectedCase.title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      winner: winningPlayer?.name ?? null,
      players: [player1.name, player2.name],
    };
    setHistory(h => [entry, ...h]);
    if (authToken) {
      apiRecordGame(authToken, {
        game_type: 'vs',
        winner_name: entry.winner,
        case_title: entry.case,
        round_count: currentRound,
      });
    }
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

  const handleP1Done = (moveCard, hazardCard, timedOut = false, jokerCard = null, filibusterCard = null, delegateCard = null, delegateMoveCard = null) => {
    const prevHazard = activeHazard;
    // Hazard for P2's next debate: P1's inline pick, or fallback to pending hazard from P2's comeback
    const nextHazardForP2 = hazardCard || pendingHazardForP2 || null;
    setActiveHazard(nextHazardForP2);
    setPendingHazardForP2(null);

    let newHand = p1Hand;
    if (moveCard)         newHand = newHand.filter(c => c.id !== moveCard.id);
    if (hazardCard)       newHand = newHand.filter(c => c.id !== hazardCard.id);
    if (jokerCard)        newHand = newHand.filter(c => c.id !== jokerCard.id);
    if (filibusterCard)   newHand = newHand.filter(c => c.id !== filibusterCard.id);
    if (delegateCard)     newHand = newHand.filter(c => c.id !== delegateCard.id);
    if (delegateMoveCard) newHand = newHand.filter(c => c.id !== delegateMoveCard.id);

    const isSpecialPlay = !!(filibusterCard || delegateCard);
    if (timedOut && !isSpecialPlay) {
      const penalty = drawOneCard(history.length, newHand.map(c => c.id));
      if (penalty) newHand = [...newHand, penalty];
    }
    setP1Hand(newHand);

    const played = !!(moveCard || hazardCard || jokerCard || filibusterCard || delegateCard);
    const skipExchange = played || p1PlayedCard;
    setP1PlayedCard(skipExchange);
    setPhoneHolder('p2');

    if (delegateCard) {
      setActiveDelegateMoveCard(delegateMoveCard || null);
      setActiveDelegateHazard(jokerCard ? null : prevHazard);
      setGamePhase('delegate_debate_p1');
      return;
    }

    if (filibusterCard) {
      checkWinAndRoute(player2, p2Hand, 'debate_p2');
      return;
    }

    // Route to hazard compliance check if P1 had a hazard and didn't cancel it with a joker
    if (prevHazard && !jokerCard) {
      setComplianceCard(prevHazard);
      setGamePhase('hazard_check_p2');
      return;
    }

    // Normal post-debate routing — P2 cannot counter if a hazard was just placed on them
    const unusedCounters = (!nextHazardForP2) ? p2Hand.filter(c => c.cardType === 'counter') : [];
    if (unusedCounters.length > 0) {
      setGamePhase('counter_window_p2');
    } else if (skipExchange) {
      checkWinAndRoute(player2, p2Hand, 'debate_p2');
    } else {
      setGamePhase('exchange_p1');
    }
  };

  // ── Concede handlers ─────────────────────────────────────────────────────
  // Player concedes: discard chosen card, draw a replacement, skip straight to opponent's debate.
  // No hazard penalty (the concession is the consequence), no counter/exchange.
  // Any pending hazard from a prior comeback still applies to the next turn.

  const handleConcedeP1 = (discardCard) => {
    const nextHazardForP2 = pendingHazardForP2 || null;
    setActiveHazard(nextHazardForP2);
    setPendingHazardForP2(null);

    let newHand = p1Hand.filter(c => c.id !== discardCard.id);
    const replacement = drawOneCard(history.length, newHand.map(c => c.id));
    if (replacement) newHand = [...newHand, replacement];
    setP1Hand(newHand);
    setP1PlayedCard(false);
    setPhoneHolder('p2');
    checkWinAndRoute(player2, p2Hand, 'debate_p2');
  };

  const handleConcedeP2 = (discardCard) => {
    const nextHazardForP1 = pendingHazardForP1 || null;
    setActiveHazard(nextHazardForP1);
    setPendingHazardForP1(null);

    let newHand = p2Hand.filter(c => c.id !== discardCard.id);
    const replacement = drawOneCard(history.length, newHand.map(c => c.id));
    if (replacement) newHand = [...newHand, replacement];
    setP2Hand(newHand);
    setP2PlayedCard(false);
    setCurrentRound(r => r + 1);
    setPhoneHolder('p1');
    checkWinAndRoute(player1, p1Hand, 'debate_p1');
  };

  // hazard_check_p2: P2 judges whether P1 followed the hazard → end P1's turn routing
  const handleHazardCheckP2Done = (followed) => {
    let newP1Hand = p1Hand;
    if (!followed) {
      const penalty = drawOneCard(history.length, newP1Hand.map(c => c.id));
      if (penalty) newP1Hand = [...newP1Hand, penalty];
      setP1Hand(newP1Hand);
    }
    setComplianceCard(null);
    setPhoneHolder('p2');
    const unusedCounters = (!activeHazard) ? p2Hand.filter(c => c.cardType === 'counter') : [];
    if (unusedCounters.length > 0) {
      setGamePhase('counter_window_p2');
    } else if (p1PlayedCard) {
      checkWinAndRoute(player2, p2Hand, 'debate_p2');
    } else {
      setGamePhase('exchange_p1');
    }
  };

  // delegate_debate_p1: P2 argued P1's side → end P1's turn
  const handleDelegateP1Done = (confirmed) => {
    let newP2Hand = p2Hand;
    if (!confirmed) {
      const penalty = drawOneCard(history.length, newP2Hand.map(c => c.id));
      if (penalty) newP2Hand = [...newP2Hand, penalty];
    }
    setP2Hand(newP2Hand);
    setActiveDelegateMoveCard(null);
    setActiveDelegateHazard(null);
    setPhoneHolder('p1');
    checkWinAndRoute(player2, newP2Hand, 'debate_p2');
  };

  // hazard_check_p1: P1 judges whether P2 followed the hazard → end P2's turn routing
  const handleHazardCheckP1Done = (followed) => {
    let newP2Hand = p2Hand;
    if (!followed) {
      const penalty = drawOneCard(history.length, newP2Hand.map(c => c.id));
      if (penalty) newP2Hand = [...newP2Hand, penalty];
      setP2Hand(newP2Hand);
    }
    setComplianceCard(null);
    setPhoneHolder('p1');
    const unusedCounters = (!activeHazard) ? p1Hand.filter(c => c.cardType === 'counter') : [];
    if (unusedCounters.length > 0) {
      setGamePhase('counter_window_p1');
    } else if (p2PlayedCard) {
      setCurrentRound(r => r + 1);
      checkWinAndRoute(player1, p1Hand, 'debate_p1');
    } else {
      setGamePhase('exchange_p2');
    }
  };

  const handleP2CounterPlay = (card) => {
    setActiveCounterCard(card);
    setP2Hand(prev => prev.filter(c => c.id !== card.id));
    setP2PlayedCard(true); // playing a counter counts as playing a card — blocks exchange
    setGamePhase('comeback_p2'); // P2 (who played the counter) delivers it
  };

  // comeback_p1 = P1 delivered their counter against P2's argument → compliance check (P2 judges)
  const handleComebackP1Done = (hazardCard) => {
    let newP1Hand = p1Hand;
    if (hazardCard) {
      newP1Hand = newP1Hand.filter(c => c.id !== hazardCard.id);
      setPendingHazardForP2(hazardCard);
    }
    setP1Hand(newP1Hand);
    setComplianceCard(activeCounterCard);
    setPhoneHolder('p2');
    setGamePhase('counter_check_p2');
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

  const handleP2Done = (moveCard, hazardCard, timedOut = false, jokerCard = null, filibusterCard = null, delegateCard = null, delegateMoveCard = null) => {
    const prevHazard = activeHazard;
    // Hazard for P1's next debate: P2's inline pick, or fallback to pending hazard from P1's comeback
    const nextHazardForP1 = hazardCard || pendingHazardForP1 || null;
    setActiveHazard(nextHazardForP1);
    setPendingHazardForP1(null);

    let newHand = p2Hand;
    if (moveCard)         newHand = newHand.filter(c => c.id !== moveCard.id);
    if (hazardCard)       newHand = newHand.filter(c => c.id !== hazardCard.id);
    if (jokerCard)        newHand = newHand.filter(c => c.id !== jokerCard.id);
    if (filibusterCard)   newHand = newHand.filter(c => c.id !== filibusterCard.id);
    if (delegateCard)     newHand = newHand.filter(c => c.id !== delegateCard.id);
    if (delegateMoveCard) newHand = newHand.filter(c => c.id !== delegateMoveCard.id);

    const isSpecialPlay = !!(filibusterCard || delegateCard);
    if (timedOut && !isSpecialPlay) {
      const penalty = drawOneCard(history.length, newHand.map(c => c.id));
      if (penalty) newHand = [...newHand, penalty];
    }
    setP2Hand(newHand);

    const played = !!(moveCard || hazardCard || jokerCard || filibusterCard || delegateCard);
    const skipExchange = played || p2PlayedCard;
    setP2PlayedCard(skipExchange);
    setPhoneHolder('p1');

    if (delegateCard) {
      setActiveDelegateMoveCard(delegateMoveCard || null);
      setActiveDelegateHazard(jokerCard ? null : prevHazard);
      setGamePhase('delegate_debate_p2');
      return;
    }

    if (filibusterCard) {
      setCurrentRound(r => r + 1);
      checkWinAndRoute(player1, p1Hand, 'debate_p1');
      return;
    }

    // Route to hazard compliance check if P2 had a hazard and didn't cancel it with a joker
    if (prevHazard && !jokerCard) {
      setComplianceCard(prevHazard);
      setGamePhase('hazard_check_p1');
      return;
    }

    // Normal post-debate routing — P1 cannot counter if a hazard was just placed on them
    const unusedCounters = (!nextHazardForP1) ? p1Hand.filter(c => c.cardType === 'counter') : [];
    if (unusedCounters.length > 0) {
      setGamePhase('counter_window_p1');
    } else if (skipExchange) {
      setCurrentRound(r => r + 1);
      checkWinAndRoute(player1, p1Hand, 'debate_p1');
    } else {
      setGamePhase('exchange_p2');
    }
  };

  // delegate_debate_p2: P1 argued P2's side → end P2's turn
  const handleDelegateP2Done = (confirmed) => {
    let newP1Hand = p1Hand;
    if (!confirmed) {
      const penalty = drawOneCard(history.length, newP1Hand.map(c => c.id));
      if (penalty) newP1Hand = [...newP1Hand, penalty];
    }
    setP1Hand(newP1Hand);
    setActiveDelegateMoveCard(null);
    setActiveDelegateHazard(null);
    setPhoneHolder('p2');
    setCurrentRound(r => r + 1);
    checkWinAndRoute(player1, newP1Hand, 'debate_p1');
  };

  const handleP1CounterPlay = (card) => {
    setActiveCounterCard(card);
    setP1Hand(prev => prev.filter(c => c.id !== card.id));
    setP1PlayedCard(true); // playing a counter counts as playing a card — blocks exchange
    setGamePhase('comeback_p1'); // P1 (who played the counter) delivers it
  };

  // comeback_p2 = P2 delivered their counter against P1's argument → compliance check (P1 judges)
  const handleComebackP2Done = (hazardCard) => {
    let newP2Hand = p2Hand;
    if (hazardCard) {
      newP2Hand = newP2Hand.filter(c => c.id !== hazardCard.id);
      setPendingHazardForP1(hazardCard);
    }
    setP2Hand(newP2Hand);
    setComplianceCard(activeCounterCard);
    setPhoneHolder('p1');
    setGamePhase('counter_check_p1');
  };

  // counter_check_p1: P1 judges whether P2's counter was effective → end P1's turn routing
  const handleCounterCheckP1Done = (followed) => {
    let newP2Hand = p2Hand;
    if (!followed) {
      const penalty = drawOneCard(history.length, newP2Hand.map(c => c.id));
      if (penalty) newP2Hand = [...newP2Hand, penalty];
      setP2Hand(newP2Hand);
    }
    setComplianceCard(null);
    setActiveCounterCard(null);
    setPhoneHolder('p2');
    if (p1PlayedCard) { endP1Turn(); } else { setGamePhase('exchange_p1'); }
  };

  // counter_check_p2: P2 judges whether P1's counter was effective → end P2's turn routing
  const handleCounterCheckP2Done = (followed) => {
    let newP1Hand = p1Hand;
    if (!followed) {
      const penalty = drawOneCard(history.length, newP1Hand.map(c => c.id));
      if (penalty) newP1Hand = [...newP1Hand, penalty];
      setP1Hand(newP1Hand);
    }
    setComplianceCard(null);
    setActiveCounterCard(null);
    setPhoneHolder('p1');
    if (p2PlayedCard) { endP2Turn(); } else { setGamePhase('exchange_p2'); }
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
  if (!isReady || startupPhase === 'loading') {
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
        authUser={authUser}
        onSignOut={handleSignOut}
        onSignIn={() => setStartupPhase('auth')}
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
            cases={getMergedCases(remoteCards?.case_cards)}
            remoteLabel={remoteCards?.label ?? null}
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
            onConcede={handleConcedeP1}
          />
        );

      case 'delegate_debate_p1':
        return (
          <DelegateDebateScreen
            key={`delegate-p1-round${currentRound}`}
            caseCard={selectedCase}
            delegatorPlayer={player1}
            player={player2}
            delegateMoveCard={activeDelegateMoveCard}
            activeHazard={activeDelegateHazard}
            onDone={handleDelegateP1Done}
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

      case 'counter_check_p2':
        return (
          <ComplianceCheckScreen
            judge={player2}
            subject={player1}
            type="counter"
            card={complianceCard}
            onYes={() => handleCounterCheckP2Done(true)}
            onNo={() => handleCounterCheckP2Done(false)}
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
            onConcede={handleConcedeP2}
          />
        );

      case 'delegate_debate_p2':
        return (
          <DelegateDebateScreen
            key={`delegate-p2-round${currentRound}`}
            caseCard={selectedCase}
            delegatorPlayer={player2}
            player={player1}
            delegateMoveCard={activeDelegateMoveCard}
            activeHazard={activeDelegateHazard}
            onDone={handleDelegateP2Done}
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

      case 'counter_check_p1':
        return (
          <ComplianceCheckScreen
            judge={player1}
            subject={player2}
            type="counter"
            card={complianceCard}
            onYes={() => handleCounterCheckP1Done(true)}
            onNo={() => handleCounterCheckP1Done(false)}
          />
        );

      case 'hazard_check_p2':
        return (
          <ComplianceCheckScreen
            judge={player2}
            subject={player1}
            type="hazard"
            card={complianceCard}
            onYes={() => handleHazardCheckP2Done(true)}
            onNo={() => handleHazardCheckP2Done(false)}
          />
        );

      case 'hazard_check_p1':
        return (
          <ComplianceCheckScreen
            judge={player1}
            subject={player2}
            type="hazard"
            card={complianceCard}
            onYes={() => handleHazardCheckP1Done(true)}
            onNo={() => handleHazardCheckP1Done(false)}
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

  if (startupPhase === 'onboarding') {
    return (
      <SafeAreaView style={S.safe}>
        <ExpoStatusBar style="light" />
        <OnboardingScreen onDone={() => {
          AsyncStorage.setItem('onboarding_seen', '1').catch(() => {});
          setStartupPhase('auth');
        }} />
      </SafeAreaView>
    );
  }

  if (startupPhase === 'auth') {
    return (
      <SafeAreaView style={S.safe}>
        <ExpoStatusBar style="light" />
        <AuthScreen
          onSuccess={handleAuthSuccess}
          onSkip={() => {
            AsyncStorage.setItem('auth_skipped', '1').catch(() => {});
            setStartupPhase('app');
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={S.safe}>
      <ExpoStatusBar style="light" />
      <View style={{ flex: 1 }}>{renderContent()}</View>
      {handPanelHand ? <HandPanel hand={handPanelHand} /> : null}
      <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  );
}
