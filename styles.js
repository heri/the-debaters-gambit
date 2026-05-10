import { StyleSheet, Platform } from 'react-native';
import { CARD_W } from './data';

export const C = {
  bg:      '#0A0A1A',
  surface: '#111124',
  gold:    '#E9C46A',
  text:    '#F2EDD7',
  muted:   '#667788',
  purple:  '#6B2FBE',
  border:  '#1E2235',
};

export const S = StyleSheet.create({
  // Layout
  safe: { flex: 1, backgroundColor: '#0A0A1A' },
  screen: {
    flex: 1, backgroundColor: '#0A0A1A',
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24,
  },
  scrollContent: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 24 },

  // Buttons
  btnPrimary: {
    backgroundColor: '#E9C46A', paddingHorizontal: 36, paddingVertical: 15,
    borderRadius: 32, marginVertical: 8, minWidth: 220, alignItems: 'center',
    shadowColor: '#E9C46A', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10,
  },
  btnPrimaryTxt: { color: '#0A0A1A', fontWeight: '800', fontSize: 15, letterSpacing: 1.5 },
  btnSecondary: {
    borderWidth: 2, borderColor: '#E9C46A', paddingHorizontal: 30, paddingVertical: 13,
    borderRadius: 32, marginVertical: 6, minWidth: 160, alignItems: 'center',
  },
  btnSecondaryTxt: { color: '#E9C46A', fontWeight: '700', fontSize: 14, letterSpacing: 1.2 },

  // Toggle rows (points screen)
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#111124', borderRadius: 12, padding: 14,
    marginVertical: 5, borderWidth: 1, borderColor: '#1E2235',
  },
  toggleRowOn: { borderColor: '#E9C46A', backgroundColor: '#1A1500' },
  checkBox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 2,
    borderColor: '#667788', alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  checkBoxOn: { borderColor: '#E9C46A', backgroundColor: '#E9C46A' },
  checkMark: { color: '#0A0A1A', fontWeight: '900', fontSize: 13 },
  toggleLabel: { flex: 1, color: '#667788', fontSize: 14, fontWeight: '600' },
  togglePts: { color: '#667788', fontWeight: '700', fontSize: 13, letterSpacing: 0.5 },

  // Typography
  heroTitle: {
    fontSize: 48, fontWeight: '900', color: '#E9C46A',
    textAlign: 'center', letterSpacing: 3, lineHeight: 56,
  },
  heroTagline: {
    fontSize: 15, color: '#667788', textAlign: 'center',
    fontStyle: 'italic', lineHeight: 24, marginTop: 16,
  },
  screenLabel: {
    fontSize: 11, fontWeight: '700', color: '#667788',
    letterSpacing: 3, marginBottom: 4, textAlign: 'center',
  },
  screenTitle: {
    fontSize: 24, fontWeight: '900', color: '#E9C46A',
    letterSpacing: 2, marginBottom: 6, textAlign: 'center',
  },
  hint: { fontSize: 13, color: '#667788', textAlign: 'center', fontStyle: 'italic', lineHeight: 20 },

  // Card browser
  browserHeader: { alignItems: 'center', paddingTop: 56, paddingBottom: 8, paddingHorizontal: 24 },
  dots: { flexDirection: 'row', gap: 5, marginTop: 10, marginBottom: 4, alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#1E2235' },
  dotActive: { backgroundColor: '#E9C46A', width: 18, borderRadius: 3 },
  navRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    width: CARD_W, marginVertical: 12,
  },
  navArrow: { paddingHorizontal: 16, paddingVertical: 10 },
  navArrowTxt: { color: '#E9C46A', fontWeight: '700', fontSize: 14, letterSpacing: 1 },
  navCounter: { color: '#667788', fontSize: 13, fontWeight: '600', letterSpacing: 1 },

  // Privacy cover
  coverEyebrow: { fontSize: 13, fontWeight: '700', color: '#667788', letterSpacing: 4, marginBottom: 8 },
  coverHeading: {
    fontSize: 32, fontWeight: '900', color: '#E9C46A',
    letterSpacing: 2, textAlign: 'center', marginBottom: 12,
  },
  coverHint: { fontSize: 14, color: '#667788', fontStyle: 'italic', textAlign: 'center', marginBottom: 48, lineHeight: 22 },
  coverTap: {
    width: CARD_W, height: CARD_W * 0.6, backgroundColor: '#111124',
    borderRadius: 20, borderWidth: 2, borderColor: '#1E2235',
    alignItems: 'center', justifyContent: 'center',
  },
  coverTapIcon: { fontSize: 60 },
  coverTapLabel: { color: '#E9C46A', fontWeight: '800', letterSpacing: 2, fontSize: 13, marginTop: 16 },

  // Move card
  card: {
    width: CARD_W, borderRadius: 20, padding: 22, marginVertical: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6, shadowRadius: 14, elevation: 12,
  },
  cardCompact: { padding: 12, marginVertical: 4 },
  badge: {
    borderWidth: 1, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4,
    alignSelf: 'flex-start', marginBottom: 12, borderColor: '#667788',
  },
  badgeTxt: { color: '#667788', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  cardArt: { fontSize: 80, textAlign: 'center', marginVertical: 10 },
  cardArtSm: { fontSize: 44, textAlign: 'center', marginVertical: 6 },
  cardTitle: {
    fontSize: 22, fontWeight: '900', color: '#F2EDD7',
    textAlign: 'center', letterSpacing: 1.5, marginBottom: 14,
  },
  divider: { height: 1, width: '60%', alignSelf: 'center', marginBottom: 14, opacity: 0.5 },
  cardDesc: {
    fontSize: 15, color: 'rgba(242,237,215,0.9)',
    lineHeight: 24, textAlign: 'center', marginBottom: 16,
  },
  cardInspo: { fontSize: 12, fontWeight: '700', textAlign: 'center', letterSpacing: 1.5, fontStyle: 'italic' },

  // Case card
  caseCard: {
    width: CARD_W, backgroundColor: '#130926', borderRadius: 20, padding: 22, marginVertical: 8,
    borderWidth: 1.5, borderColor: '#6B2FBE',
    shadowColor: '#6B2FBE', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45, shadowRadius: 14,
  },
  caseFocus: { fontSize: 10, color: '#A78BFA', fontWeight: '600', letterSpacing: 2, textAlign: 'center', marginBottom: 8 },
  caseArt: { fontSize: 80, textAlign: 'center', marginVertical: 10 },
  caseTitle: {
    fontSize: 20, fontWeight: '900', color: '#F2EDD7',
    textAlign: 'center', letterSpacing: 1.2, marginBottom: 14, lineHeight: 28,
  },
  caseDesc: { fontSize: 15, color: 'rgba(242,237,215,0.85)', lineHeight: 24, textAlign: 'center' },

  // Case banner in debate screen
  caseBanner: {
    width: CARD_W, backgroundColor: '#130926', borderRadius: 14,
    padding: 16, marginTop: 12, marginBottom: 4,
    borderLeftWidth: 4, borderLeftColor: '#6B2FBE',
  },
  caseBannerLabel: { fontSize: 10, fontWeight: '700', color: '#667788', letterSpacing: 3, marginBottom: 6 },
  caseBannerTitle: { fontSize: 15, fontWeight: '800', color: '#F2EDD7', lineHeight: 22, marginBottom: 8 },
  caseBannerDesc: { fontSize: 13, color: 'rgba(242,237,215,0.75)', lineHeight: 20 },

  // Scoring hint
  scoringHint: {
    width: CARD_W, backgroundColor: '#1A1500', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 10, marginTop: 8, marginBottom: 4,
    borderWidth: 1, borderColor: '#E9C46A33',
  },
  scoringHintTxt: { color: '#E9C46A', fontSize: 12, fontWeight: '700', textAlign: 'center', letterSpacing: 0.5 },

  // Timer banner
  timerBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingVertical: 12, borderBottomWidth: 1, marginTop: 4,
  },
  timerTxt: { fontSize: 38, fontWeight: '900', letterSpacing: 3 },
  playerChip: { borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8 },
  playerChipTxt: { color: '#F2EDD7', fontWeight: '800', fontSize: 13, letterSpacing: 2 },

  // Inline move picker (during debate)
  movePickRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#111124', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12,
    marginVertical: 3, borderWidth: 1, borderColor: '#1E2235',
  },
  movePickIcon: { fontSize: 22, marginRight: 10, minWidth: 36, textAlign: 'center' },
  movePickName: { fontSize: 13, fontWeight: '700', color: '#F2EDD7' },
  movePickTier: { fontSize: 10, color: '#667788', letterSpacing: 0.8, marginTop: 2 },
  movePickCheck: { fontSize: 18, fontWeight: '900', marginLeft: 8 },
  movePickDesc: {
    width: CARD_W, borderRadius: 12, padding: 14, marginTop: 4, marginBottom: 8, borderWidth: 1,
  },
  movePickDescTitle: { fontSize: 12, fontWeight: '800', letterSpacing: 1, marginBottom: 6 },
  movePickDescText: { fontSize: 13, color: 'rgba(242,237,215,0.85)', lineHeight: 20 },

  // Modal
  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.88)', alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  modalBox: {
    backgroundColor: '#111124', borderRadius: 24, padding: 32,
    width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#E9C46A',
  },
  modalTitle: { fontSize: 28, fontWeight: '900', color: '#E9C46A', letterSpacing: 2, marginBottom: 12 },
  modalBody: { fontSize: 16, color: '#F2EDD7', textAlign: 'center', lineHeight: 26, marginBottom: 24 },

  // Points screen
  moveRevealRow: {
    flexDirection: 'row', width: CARD_W, alignItems: 'flex-start',
    marginVertical: 8, gap: 8,
  },
  moveRevealName: { fontSize: 12, fontWeight: '700', color: '#E9C46A', letterSpacing: 1, marginBottom: 4, textAlign: 'center' },
  vsLabel: { fontSize: 16, fontWeight: '900', color: '#667788', alignSelf: 'center', marginTop: 40 },
  pointsSection: {
    width: CARD_W, backgroundColor: '#111124', borderRadius: 16,
    padding: 16, marginVertical: 8, borderWidth: 1, borderColor: '#1E2235',
  },
  pointsPlayerName: {
    fontSize: 18, fontWeight: '800', color: '#E9C46A', letterSpacing: 1, marginBottom: 8,
  },
  grandTotalPts: { fontSize: 48, fontWeight: '900', color: '#E9C46A', marginTop: 4 },

  // Account — player management
  playerRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#111124', borderRadius: 12, padding: 14,
    marginVertical: 5, borderWidth: 1, borderColor: '#1E2235',
  },
  playerRowName: { flex: 1, color: '#F2EDD7', fontSize: 15, fontWeight: '600' },
  removeBtn: { padding: 4 },
  removeTxt: { color: '#667788', fontSize: 18, fontWeight: '700' },
  addRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    marginTop: 8, marginBottom: 8,
  },
  playerInput: {
    flex: 1, backgroundColor: '#111124', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    color: '#F2EDD7', fontSize: 15, borderWidth: 1, borderColor: '#1E2235', marginRight: 8,
  },
  addBtn: {
    width: 46, height: 46, backgroundColor: '#E9C46A', borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  addBtnTxt: { color: '#0A0A1A', fontSize: 22, fontWeight: '800' },
  sectionDivider: {
    width: CARD_W, height: 1, backgroundColor: '#1E2235', marginVertical: 28,
  },

  // Account — settings
  settingRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#111124', borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: '#1E2235', marginVertical: 6,
  },
  settingLabel: { fontSize: 13, fontWeight: '800', color: '#F2EDD7', letterSpacing: 1 },
  settingSubLabel: { fontSize: 11, color: '#667788', marginTop: 2 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepBtn: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#1E2235',
    alignItems: 'center', justifyContent: 'center',
  },
  stepBtnTxt: { color: '#E9C46A', fontSize: 22, fontWeight: '800', lineHeight: 28 },
  stepValue: { fontSize: 22, fontWeight: '900', color: '#E9C46A', minWidth: 28, textAlign: 'center' },

  // Onboarding banner
  onboardingBanner: {
    width: CARD_W, backgroundColor: '#130926', borderRadius: 14,
    padding: 20, marginBottom: 24, borderWidth: 1.5, borderColor: '#6B2FBE',
    alignItems: 'center',
  },
  onboardingTitle: { fontSize: 20, fontWeight: '900', color: '#E9C46A', letterSpacing: 2, marginBottom: 8 },
  onboardingText: { fontSize: 14, color: 'rgba(242,237,215,0.8)', textAlign: 'center', lineHeight: 22 },

  // History
  historyItem: {
    width: CARD_W, backgroundColor: '#111124', borderRadius: 14,
    padding: 16, marginVertical: 6, borderLeftWidth: 3, borderLeftColor: '#6B2FBE',
  },
  historyCase: { fontSize: 13, fontWeight: '700', color: '#F2EDD7', lineHeight: 20, marginBottom: 8 },
  historyScores: { flexDirection: 'row', gap: 16, marginBottom: 4 },
  historyScore: { fontSize: 13, color: '#E9C46A', fontWeight: '700' },
  historyDate: { fontSize: 12, color: '#667788' },

  // Player picker
  pickRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#111124', borderRadius: 14, padding: 16,
    marginVertical: 6, borderWidth: 1.5, borderColor: '#1E2235',
  },
  pickRowSel: { borderColor: '#6B2FBE', backgroundColor: '#130926' },
  pickBadge: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#1E2235',
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  pickBadgeTxt: { color: '#F2EDD7', fontWeight: '800', fontSize: 11, letterSpacing: 0.5 },
  pickName: { fontSize: 16, fontWeight: '700', color: '#667788' },

  // Help screen
  helpDivider: { width: CARD_W, height: 1, backgroundColor: '#1E2235', marginVertical: 20 },
  helpBody: {
    width: CARD_W, fontSize: 15, color: 'rgba(242,237,215,0.82)',
    lineHeight: 26, marginBottom: 16, textAlign: 'left',
  },
  helpRule: { flexDirection: 'row', width: CARD_W, marginBottom: 14, alignItems: 'flex-start' },
  helpRuleNum: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#6B2FBE',
    color: '#F2EDD7', fontWeight: '900', fontSize: 13, textAlign: 'center',
    lineHeight: 28, marginRight: 12, marginTop: 1,
  },
  helpRuleText: { flex: 1, color: 'rgba(242,237,215,0.82)', fontSize: 14, lineHeight: 22 },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row', backgroundColor: '#0D0D22',
    borderTopWidth: 1, borderTopColor: '#1E2235',
    paddingBottom: Platform.OS === 'ios' ? 4 : 8,
  },
  navTab: { flex: 1, alignItems: 'center', paddingVertical: 10, gap: 3 },
  navTabIcon: { fontSize: 20, opacity: 0.4 },
  navTabIconActive: { opacity: 1 },
  navTabLabel: { fontSize: 9, fontWeight: '600', color: '#667788', letterSpacing: 0.8 },
  navTabLabelActive: { color: '#E9C46A' },
});
