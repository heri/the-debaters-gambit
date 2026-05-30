import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Animated, Dimensions, Image,
} from 'react-native';
import { CARD_W, NAV_TABS } from './data';
import { C, S } from './styles';

const { width } = Dimensions.get('window');

// ── Pure helpers (exported for testing) ────────────────────────────────────

export const cardBadgeText = (card) => {
  if (card.cardType === 'hazard')     return 'HAZARD CARD  ·  CHAOS';
  if (card.cardType === 'counter')    return 'COUNTER CARD  ·  INTERRUPT';
  if (card.cardType === 'joker')      return 'JOKER CARD  ·  HAZARD CANCEL';
  if (card.cardType === 'filibuster') return 'FILIBUSTER CARD  ·  SKIP TURN';
  if (card.cardType === 'delegate')   return 'DELEGATE CARD  ·  PASS TURN';
  return `MOVE CARD  ·  ${card.tier}  ·  ${card.tierLabel}`;
};

export const handBadgeText = (card) => {
  if (card.cardType === 'hazard')     return 'HAZARD';
  if (card.cardType === 'counter')    return 'COUNTER';
  if (card.cardType === 'joker')      return 'JOKER';
  if (card.cardType === 'filibuster') return 'FILIBUSTER';
  if (card.cardType === 'delegate')   return 'DELEGATE';
  return `MOVE  ·  ${card.tier}`;
};

// ── Primitives ─────────────────────────────────────────────────────────────

export const Btn = ({ label, onPress, variant = 'primary', style, disabled }) => (
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

export const ToggleRow = ({ label, value, onToggle, pts }) => (
  <TouchableOpacity
    style={[S.toggleRow, value && S.toggleRowOn]}
    onPress={onToggle}
    activeOpacity={0.8}
  >
    <View style={[S.checkBox, value && S.checkBoxOn]}>
      {value ? <Text style={S.checkMark}>✓</Text> : null}
    </View>
    <Text style={[S.toggleLabel, value && { color: C.text }]}>{label}</Text>
    <Text style={[S.togglePts, value && { color: C.gold }]}>+{pts} pt</Text>
  </TouchableOpacity>
);

// ── Card views ─────────────────────────────────────────────────────────────

export const MoveCardView = ({ card, compact }) => {
  const isSpecial = card.cardType !== 'move';
  const badgeText = cardBadgeText(card);
  return (
    <View style={[S.card, { backgroundColor: card.bg }, compact && S.cardCompact]}>
      <View style={[S.badge, { borderColor: card.accent }]}>
        <Text style={[S.badgeTxt, { color: card.accent }]}>{badgeText}</Text>
      </View>
      <Text style={compact ? S.cardArtSm : S.cardArt}>{card.icon}</Text>
      <Text style={[S.cardTitle, compact && { fontSize: 16, marginBottom: 6 }]}>{card.name}</Text>
      {!compact ? (
        <>
          <View style={[S.divider, { backgroundColor: card.accent }]} />
          <Text style={S.cardDesc}>{card.what}</Text>
          <Text style={S.cardHint}>{card.hint}</Text>
        </>
      ) : null}
      {!isSpecial ? (
        <Text style={[S.cardInspo, { color: card.accent }]}>✦  {card.inspiration}</Text>
      ) : null}
    </View>
  );
};

export const CaseCardView = ({ card }) => (
  <View style={S.caseCard}>
    <View style={S.badge}>
      <Text style={S.badgeTxt}>CASE CARD  ·  {card.difficulty}</Text>
    </View>
    {card.focus ? <Text style={S.caseFocus}>{card.focus}</Text> : null}
    <Text style={S.caseArt}>{card.icon}</Text>
    <Text style={S.caseTitle}>{card.title}</Text>
    <View style={[S.divider, { backgroundColor: '#F5C842' }]} />
    <Text style={S.caseDesc}>{card.description}</Text>
  </View>
);

export const CaseBanner = ({ card }) => (
  <View style={S.caseBanner}>
    <Text style={S.caseBannerLabel}>THE CASE</Text>
    <Text style={S.caseBannerTitle}>{card.title}</Text>
    <Text style={S.caseBannerDesc}>{card.description}</Text>
  </View>
);

// Compact selectable row used in the inline move picker during debate
export const MovePickRow = ({ card, selected, onPress }) => (
  <TouchableOpacity
    style={[S.movePickRow, selected && { borderColor: card.accent, backgroundColor: card.bg }]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={S.movePickIcon}>{card.icon}</Text>
    <View style={{ flex: 1 }}>
      <Text style={[S.movePickName, selected && { color: card.accent }]}>{card.name}</Text>
      <Text style={S.movePickTier}>{card.tier}  ·  {card.inspiration}</Text>
    </View>
    {selected ? <Text style={[S.movePickCheck, { color: card.accent }]}>✓</Text> : null}
  </TouchableOpacity>
);

// ── Tinder-style card browser ──────────────────────────────────────────────
// Swipe left/right, arrow buttons, optional slot-machine random animation.

export const CardBrowser = ({ cards, renderCard, onChoose, showRandom, title, subtitle }) => {
  const [idx, setIdx] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const touchStartX = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => () => { isMounted.current = false; }, []);

  const slide = (dir, afterCb) => {
    Animated.timing(translateX, {
      toValue: dir * -width, duration: 200, useNativeDriver: true,
    }).start(() => {
      translateX.setValue(dir * width);
      afterCb();
      Animated.timing(translateX, {
        toValue: 0, duration: 200, useNativeDriver: true,
      }).start();
    });
  };

  const goNext = () => {
    if (!isSpinning && idx < cards.length - 1) slide(1, () => setIdx(i => i + 1));
  };
  const goPrev = () => {
    if (!isSpinning && idx > 0) slide(-1, () => setIdx(i => i - 1));
  };

  const onTouchStart = e => { touchStartX.current = e.nativeEvent.pageX; };
  const onTouchEnd = e => {
    if (touchStartX.current === null || isSpinning) return;
    const dx = e.nativeEvent.pageX - touchStartX.current;
    touchStartX.current = null;
    if (dx < -40) goNext();
    else if (dx > 40) goPrev();
  };

  const handleRandom = () => {
    if (isSpinning) return;
    const targetIdx = Math.floor(Math.random() * cards.length);
    const stepsToTarget = (targetIdx - idx + cards.length) % cards.length;
    const totalSteps = 2 * cards.length + (stepsToTarget || cards.length);
    let step = 0;
    let cur = idx;
    setIsSpinning(true);

    const spin = () => {
      if (!isMounted.current) return;
      cur = (cur + 1) % cards.length;
      setIdx(cur);
      step++;
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
        <Animated.View
          style={{ transform: [{ translateX }], width: CARD_W }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {renderCard(cards[idx])}
        </Animated.View>

        <View style={S.navRow}>
          <TouchableOpacity
            onPress={goPrev}
            disabled={idx === 0 || isSpinning}
            style={[S.navArrow, (idx === 0 || isSpinning) && { opacity: 0.25 }]}
          >
            <Text style={S.navArrowTxt}>‹  PREV</Text>
          </TouchableOpacity>
          <Text style={S.navCounter}>{idx + 1} / {cards.length}</Text>
          <TouchableOpacity
            onPress={goNext}
            disabled={idx === cards.length - 1 || isSpinning}
            style={[S.navArrow, (idx === cards.length - 1 || isSpinning) && { opacity: 0.25 }]}
          >
            <Text style={S.navArrowTxt}>NEXT  ›</Text>
          </TouchableOpacity>
        </View>

        <Btn label="✓  CHOOSE THIS" onPress={() => onChoose(cards[idx])} disabled={isSpinning} />
        {showRandom ? (
          <Btn
            label={isSpinning ? '🦊  ARGUS CHOOSES...' : '🎲  RANDOM'}
            variant="secondary"
            onPress={handleRandom}
            disabled={isSpinning}
            style={{ marginBottom: 40 }}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

// ── Hand panel — persistent card hand viewer for VS mode ─────────────────
// Shows the player's full hand at the bottom of the screen, just above the nav.
// Cards are stacked (2 px offset per card visible behind) and cycle one by one.
// hand: Card[] — the current player's live hand
export const HandPanel = ({ hand }) => {
  const [idx, setIdx] = useState(0);
  const clampedIdx = Math.min(idx, Math.max(hand.length - 1, 0));

  if (hand.length === 0) return null;

  const card = hand[clampedIdx];
  const badgeText = handBadgeText(card);

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(hand.length - 1, i + 1));

  // Stack shadow layers behind the front card
  const stackLayers = Math.min(hand.length - 1, 2);

  return (
    <View style={{
      borderTopWidth: 1, borderTopColor: C.border,
      backgroundColor: C.surface,
      paddingTop: 10, paddingBottom: 8, paddingHorizontal: 12,
    }}>
      {/* Header row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ color: C.muted, fontSize: 10, fontWeight: '700', letterSpacing: 2 }}>
          YOUR HAND
        </Text>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          {hand.map((_, i) => (
            <View key={i} style={[
              { width: 6, height: 6, borderRadius: 3, backgroundColor: C.border },
              i === clampedIdx && { backgroundColor: C.gold, width: 14, borderRadius: 3 },
            ]} />
          ))}
        </View>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <TouchableOpacity
            onPress={prev}
            disabled={clampedIdx === 0}
            style={{ paddingHorizontal: 8, paddingVertical: 4, opacity: clampedIdx === 0 ? 0.25 : 1 }}
          >
            <Text style={{ color: C.gold, fontWeight: '700', fontSize: 16 }}>‹</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={next}
            disabled={clampedIdx === hand.length - 1}
            style={{ paddingHorizontal: 8, paddingVertical: 4, opacity: clampedIdx === hand.length - 1 ? 0.25 : 1 }}
          >
            <Text style={{ color: C.gold, fontWeight: '700', fontSize: 16 }}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stacked card area */}
      <View style={{ position: 'relative', alignSelf: 'center', width: CARD_W }}>
        {/* Shadow layers behind */}
        {[...Array(stackLayers)].map((_, i) => (
          <View key={i} style={{
            position: 'absolute',
            top: (stackLayers - i) * 3,
            left: (stackLayers - i) * 3,
            right: -(stackLayers - i) * 3,
            height: 72, borderRadius: 14,
            backgroundColor: i === 0 ? C.bg : C.border,
            borderWidth: 1, borderColor: C.border,
          }} />
        ))}

        {/* Front card */}
        <View style={{
          backgroundColor: card.bg, borderRadius: 14,
          borderWidth: 1.5, borderColor: card.accent,
          padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12,
        }}>
          <Text style={{ fontSize: 36 }}>{card.icon}</Text>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <View style={{ borderWidth: 1, borderColor: card.accent, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}>
                <Text style={{ color: card.accent, fontSize: 9, fontWeight: '700', letterSpacing: 1 }}>{badgeText}</Text>
              </View>
            </View>
            <Text style={{ color: '#E8DFC8', fontWeight: '900', fontSize: 15, letterSpacing: 0.5, marginBottom: 2 }}>{card.name}</Text>
            <Text style={{ color: 'rgba(232,223,200,0.7)', fontSize: 11, lineHeight: 15 }} numberOfLines={2}>{card.what}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// ── Bottom navigation bar ──────────────────────────────────────────────────

export const BottomNav = ({ activeTab, onTabPress }) => (
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
