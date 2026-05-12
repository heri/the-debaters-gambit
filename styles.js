import { StyleSheet, Platform } from 'react-native';
import { CARD_W } from './data';

export const C = {
  bg:      '#0D0F1C',  // Ink Navy
  surface: '#131728',
  gold:    '#F5C842',  // Debate Gold
  text:    '#E8DFC8',  // Parchment
  muted:   '#6B7A8D',
  teal:    '#2ECFB0',  // Electric Teal (replaces purple everywhere)
  red:     '#C0392B',  // Argument Red
  border:  '#1C2038',
};

export const S = StyleSheet.create({
  // Layout
  safe: { flex: 1, backgroundColor: '#0D0F1C' },
  screen: {
    flex: 1, backgroundColor: '#0D0F1C',
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24,
  },
  scrollContent: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 24 },

  // Buttons
  btnPrimary: {
    backgroundColor: '#F5C842', paddingHorizontal: 36, paddingVertical: 15,
    borderRadius: 32, marginVertical: 8, minWidth: 220, alignItems: 'center',
    shadowColor: '#F5C842', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10,
  },
  btnPrimaryTxt: { color: '#0D0F1C', fontWeight: '800', fontSize: 15, letterSpacing: 1.5 },
  btnSecondary: {
    borderWidth: 2, borderColor: '#F5C842', paddingHorizontal: 30, paddingVertical: 13,
    borderRadius: 32, marginVertical: 6, minWidth: 160, alignItems: 'center',
  },
  btnSecondaryTxt: { color: '#F5C842', fontWeight: '700', fontSize: 14, letterSpacing: 1.2 },

  // Toggle rows (points screen)
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#131728', borderRadius: 12, padding: 14,
    marginVertical: 5, borderWidth: 1, borderColor: '#1C2038',
  },
  toggleRowOn: { borderColor: '#F5C842', backgroundColor: '#1A1500' },
  checkBox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 2,
    borderColor: '#6B7A8D', alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  checkBoxOn: { borderColor: '#F5C842', backgroundColor: '#F5C842' },
  checkMark: { color: '#0D0F1C', fontWeight: '900', fontSize: 13 },
  toggleLabel: { flex: 1, color: '#6B7A8D', fontSize: 14, fontWeight: '600' },
  togglePts: { color: '#6B7A8D', fontWeight: '700', fontSize: 13, letterSpacing: 0.5 },

  // Typography
  heroTitle: {
    fontSize: 48, fontWeight: '900', color: '#F5C842',
    textAlign: 'center', letterSpacing: 3, lineHeight: 56,
  },
  heroTagline: {
    fontSize: 15, color: '#6B7A8D', textAlign: 'center',
    fontStyle: 'italic', lineHeight: 24, marginTop: 16,
  },
  screenLabel: {
    fontSize: 11, fontWeight: '700', color: '#6B7A8D',
    letterSpacing: 3, marginBottom: 4, textAlign: 'center',
  },
  screenTitle: {
    fontSize: 24, fontWeight: '900', color: '#F5C842',
    letterSpacing: 2, marginBottom: 6, textAlign: 'center',
  },
  hint: { fontSize: 13, color: '#6B7A8D', textAlign: 'center', fontStyle: 'italic', lineHeight: 20 },

  // Card browser
  browserHeader: { alignItems: 'center', paddingTop: 56, paddingBottom: 8, paddingHorizontal: 24 },
  dots: { flexDirection: 'row', gap: 5, marginTop: 10, marginBottom: 4, alignItems: 'center' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#1C2038' },
  dotActive: { backgroundColor: '#F5C842', width: 18, borderRadius: 3 },
  navRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    width: CARD_W, marginVertical: 12,
  },
  navArrow: { paddingHorizontal: 16, paddingVertical: 10 },
  navArrowTxt: { color: '#F5C842', fontWeight: '700', fontSize: 14, letterSpacing: 1 },
  navCounter: { color: '#6B7A8D', fontSize: 13, fontWeight: '600', letterSpacing: 1 },

  // Privacy cover
  coverEyebrow: { fontSize: 13, fontWeight: '700', color: '#6B7A8D', letterSpacing: 4, marginBottom: 8 },
  coverHeading: {
    fontSize: 32, fontWeight: '900', color: '#F5C842',
    letterSpacing: 2, textAlign: 'center', marginBottom: 12,
  },
  coverHint: { fontSize: 14, color: '#6B7A8D', fontStyle: 'italic', textAlign: 'center', marginBottom: 48, lineHeight: 22 },
  coverTap: {
    width: CARD_W, height: CARD_W * 0.6, backgroundColor: '#131728',
    borderRadius: 20, borderWidth: 2, borderColor: '#1C2038',
    alignItems: 'center', justifyContent: 'center',
  },
  coverTapIcon: { fontSize: 60 },
  coverTapLabel: { color: '#F5C842', fontWeight: '800', letterSpacing: 2, fontSize: 13, marginTop: 16 },

  // Move card
  card: {
    width: CARD_W, borderRadius: 20, padding: 22, marginVertical: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6, shadowRadius: 14, elevation: 12,
  },
  cardCompact: { padding: 12, marginVertical: 4 },
  badge: {
    borderWidth: 1, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4,
    alignSelf: 'flex-start', marginBottom: 12, borderColor: '#6B7A8D',
  },
  badgeTxt: { color: '#6B7A8D', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  cardArt: { fontSize: 80, textAlign: 'center', marginVertical: 10 },
  cardArtSm: { fontSize: 44, textAlign: 'center', marginVertical: 6 },
  cardTitle: {
    fontSize: 22, fontWeight: '900', color: '#E8DFC8',
    textAlign: 'center', letterSpacing: 1.5, marginBottom: 14,
  },
  divider: { height: 1, width: '60%', alignSelf: 'center', marginBottom: 14, opacity: 0.5 },
  cardDesc: {
    fontSize: 15, color: 'rgba(232,223,200,0.9)',
    lineHeight: 24, textAlign: 'center', marginBottom: 8,
  },
  cardHint: {
    fontSize: 13, color: 'rgba(232,223,200,0.6)',
    lineHeight: 22, textAlign: 'center', fontStyle: 'italic', marginBottom: 16,
  },
  cardInspo: { fontSize: 12, fontWeight: '700', textAlign: 'center', letterSpacing: 1.5, fontStyle: 'italic' },

  // Case card
  caseCard: {
    width: CARD_W, backgroundColor: '#1A1600', borderRadius: 20, padding: 22, marginVertical: 8,
    borderWidth: 1.5, borderColor: '#F5C842',
    shadowColor: '#F5C842', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45, shadowRadius: 14,
  },
  caseFocus: { fontSize: 10, color: '#F5C842', fontWeight: '600', letterSpacing: 2, textAlign: 'center', marginBottom: 8 },
  caseArt: { fontSize: 80, textAlign: 'center', marginVertical: 10 },
  caseTitle: {
    fontSize: 20, fontWeight: '900', color: '#E8DFC8',
    textAlign: 'center', letterSpacing: 1.2, marginBottom: 14, lineHeight: 28,
  },
  caseDesc: { fontSize: 15, color: 'rgba(232,223,200,0.85)', lineHeight: 24, textAlign: 'center' },

  // Case banner in debate screen
  caseBanner: {
    width: CARD_W, backgroundColor: '#1A1600', borderRadius: 14,
    padding: 16, marginTop: 12, marginBottom: 4,
    borderLeftWidth: 4, borderLeftColor: '#F5C842',
  },
  caseBannerLabel: { fontSize: 10, fontWeight: '700', color: '#6B7A8D', letterSpacing: 3, marginBottom: 6 },
  caseBannerTitle: { fontSize: 15, fontWeight: '800', color: '#E8DFC8', lineHeight: 22, marginBottom: 8 },
  caseBannerDesc: { fontSize: 13, color: 'rgba(232,223,200,0.75)', lineHeight: 20 },

  // Scoring hint
  scoringHint: {
    width: CARD_W, backgroundColor: '#1A1500', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 10, marginTop: 8, marginBottom: 4,
    borderWidth: 1, borderColor: '#F5C84233',
  },
  scoringHintTxt: { color: '#F5C842', fontSize: 12, fontWeight: '700', textAlign: 'center', letterSpacing: 0.5 },

  // Timer banner
  timerBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingVertical: 12, borderBottomWidth: 1, marginTop: 4,
  },
  timerTxt: { fontSize: 38, fontWeight: '900', letterSpacing: 3 },
  playerChip: { borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8 },
  playerChipTxt: { color: '#E8DFC8', fontWeight: '800', fontSize: 13, letterSpacing: 2 },

  // Case picker — inline player selector dropdowns
  playerSelectorBtn: {
    backgroundColor: '#131728', borderRadius: 12,
    borderWidth: 1.5, borderColor: '#1C2038',
    paddingHorizontal: 10, paddingVertical: 8, marginBottom: 2,
  },
  playerSelectorLabel: {
    fontSize: 9, fontWeight: '700', color: '#6B7A8D',
    letterSpacing: 1.5, marginBottom: 4,
  },
  playerSelectorName: {
    fontSize: 14, fontWeight: '800', color: '#E8DFC8', letterSpacing: 0.3,
  },
  playerSelectorCaret: { fontSize: 11, color: '#6B7A8D', marginTop: 2 },
  playerSelectorOption: {
    paddingVertical: 9, paddingHorizontal: 10,
    borderRadius: 8, marginTop: 2,
    backgroundColor: '#131728', borderWidth: 1, borderColor: '#1C2038',
  },
  playerSelectorOptionTxt: { fontSize: 13, fontWeight: '700', color: '#E8DFC8' },

  // Inline move picker (during debate)
  movePickRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#131728', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12,
    marginVertical: 3, borderWidth: 1, borderColor: '#1C2038',
  },
  movePickIcon: { fontSize: 22, marginRight: 10, minWidth: 36, textAlign: 'center' },
  movePickName: { fontSize: 13, fontWeight: '700', color: '#E8DFC8' },
  movePickTier: { fontSize: 10, color: '#6B7A8D', letterSpacing: 0.8, marginTop: 2 },
  movePickCheck: { fontSize: 18, fontWeight: '900', marginLeft: 8 },
  movePickDesc: {
    width: CARD_W, borderRadius: 12, padding: 14, marginTop: 4, marginBottom: 8, borderWidth: 1,
  },
  movePickDescTitle: { fontSize: 12, fontWeight: '800', letterSpacing: 1, marginBottom: 6 },
  movePickDescText: { fontSize: 13, color: 'rgba(232,223,200,0.85)', lineHeight: 20 },

  // Modal
  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.88)', alignItems: 'center', justifyContent: 'center', padding: 32,
  },
  modalBox: {
    backgroundColor: '#131728', borderRadius: 24, padding: 32,
    width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#F5C842',
  },
  modalTitle: { fontSize: 28, fontWeight: '900', color: '#F5C842', letterSpacing: 2, marginBottom: 12 },
  modalBody: { fontSize: 16, color: '#E8DFC8', textAlign: 'center', lineHeight: 26, marginBottom: 24 },

  // Points screen
  moveRevealRow: {
    flexDirection: 'row', width: CARD_W, alignItems: 'flex-start',
    marginVertical: 8, gap: 8,
  },
  moveRevealName: { fontSize: 12, fontWeight: '700', color: '#F5C842', letterSpacing: 1, marginBottom: 4, textAlign: 'center' },
  vsLabel: { fontSize: 16, fontWeight: '900', color: '#6B7A8D', alignSelf: 'center', marginTop: 40 },
  pointsSection: {
    width: CARD_W, backgroundColor: '#131728', borderRadius: 16,
    padding: 16, marginVertical: 8, borderWidth: 1, borderColor: '#1C2038',
  },
  pointsPlayerName: {
    fontSize: 18, fontWeight: '800', color: '#F5C842', letterSpacing: 1, marginBottom: 8,
  },
  grandTotalPts: { fontSize: 48, fontWeight: '900', color: '#F5C842', marginTop: 4 },

  // Account — player management
  playerRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#131728', borderRadius: 12, padding: 14,
    marginVertical: 5, borderWidth: 1, borderColor: '#1C2038',
  },
  playerRowName: { flex: 1, color: '#E8DFC8', fontSize: 15, fontWeight: '600' },
  removeBtn: { padding: 4 },
  removeTxt: { color: '#6B7A8D', fontSize: 18, fontWeight: '700' },
  addRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    marginTop: 8, marginBottom: 8,
  },
  playerInput: {
    flex: 1, backgroundColor: '#131728', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    color: '#E8DFC8', fontSize: 15, borderWidth: 1, borderColor: '#1C2038', marginRight: 8,
  },
  addBtn: {
    width: 46, height: 46, backgroundColor: '#F5C842', borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  addBtnTxt: { color: '#0D0F1C', fontSize: 22, fontWeight: '800' },
  sectionDivider: {
    width: CARD_W, height: 1, backgroundColor: '#1C2038', marginVertical: 28,
  },

  // Account — settings
  settingRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#131728', borderRadius: 14, padding: 16,
    borderWidth: 1, borderColor: '#1C2038', marginVertical: 6,
  },
  settingLabel: { fontSize: 13, fontWeight: '800', color: '#E8DFC8', letterSpacing: 1 },
  settingSubLabel: { fontSize: 11, color: '#6B7A8D', marginTop: 2 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepBtn: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#1C2038',
    alignItems: 'center', justifyContent: 'center',
  },
  stepBtnTxt: { color: '#F5C842', fontSize: 22, fontWeight: '800', lineHeight: 28 },
  stepValue: { fontSize: 22, fontWeight: '900', color: '#F5C842', minWidth: 28, textAlign: 'center' },

  // Onboarding banner
  onboardingBanner: {
    width: CARD_W, backgroundColor: '#0D1A18', borderRadius: 14,
    padding: 20, marginBottom: 24, borderWidth: 1.5, borderColor: '#2ECFB0',
    alignItems: 'center',
  },
  onboardingTitle: { fontSize: 20, fontWeight: '900', color: '#F5C842', letterSpacing: 2, marginBottom: 8 },
  onboardingText: { fontSize: 14, color: 'rgba(232,223,200,0.8)', textAlign: 'center', lineHeight: 22 },

  // History
  historyItem: {
    width: CARD_W, backgroundColor: '#131728', borderRadius: 14,
    padding: 16, marginVertical: 6, borderLeftWidth: 3, borderLeftColor: '#2ECFB0',
  },
  historyCase: { fontSize: 13, fontWeight: '700', color: '#E8DFC8', lineHeight: 20, marginBottom: 8 },
  historyScores: { flexDirection: 'row', gap: 16, marginBottom: 4 },
  historyScore: { fontSize: 13, color: '#F5C842', fontWeight: '700' },
  historyDate: { fontSize: 12, color: '#6B7A8D' },

  // Player picker
  pickRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#131728', borderRadius: 14, padding: 16,
    marginVertical: 6, borderWidth: 1.5, borderColor: '#1C2038',
  },
  pickRowSel: { borderColor: '#2ECFB0', backgroundColor: '#0D1A18' },
  pickBadge: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#1C2038',
    alignItems: 'center', justifyContent: 'center', marginRight: 14,
  },
  pickBadgeTxt: { color: '#E8DFC8', fontWeight: '800', fontSize: 11, letterSpacing: 0.5 },
  pickName: { fontSize: 16, fontWeight: '700', color: '#6B7A8D' },

  // Help screen
  helpDivider: { width: CARD_W, height: 1, backgroundColor: '#1C2038', marginVertical: 20 },
  helpBody: {
    width: CARD_W, fontSize: 15, color: 'rgba(232,223,200,0.82)',
    lineHeight: 26, marginBottom: 16, textAlign: 'left',
  },
  helpRule: { flexDirection: 'row', width: CARD_W, marginBottom: 14, alignItems: 'flex-start' },
  helpRuleNum: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#F5C842',
    color: '#0D0F1C', fontWeight: '900', fontSize: 13, textAlign: 'center',
    lineHeight: 28, marginRight: 12, marginTop: 1,
  },
  helpRuleText: { flex: 1, color: 'rgba(232,223,200,0.82)', fontSize: 14, lineHeight: 22 },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row', backgroundColor: '#0D0D22',
    borderTopWidth: 1, borderTopColor: '#1C2038',
    paddingBottom: Platform.OS === 'ios' ? 4 : 8,
  },
  navTab: { flex: 1, alignItems: 'center', paddingVertical: 10, gap: 3 },
  navTabIcon: { fontSize: 20, opacity: 0.4 },
  navTabIconActive: { opacity: 1 },
  navTabLabel: { fontSize: 9, fontWeight: '600', color: '#6B7A8D', letterSpacing: 0.8 },
  navTabLabelActive: { color: '#F5C842' },

  // Solo Dojo — card selection list
  dojoTierHeader: {
    width: CARD_W, flexDirection: 'row', alignItems: 'center', marginTop: 18, marginBottom: 6,
  },
  dojoTierLine: { flex: 1, height: 1, backgroundColor: '#1C2038' },
  dojoTierLabel: {
    fontSize: 10, fontWeight: '700', color: '#6B7A8D',
    letterSpacing: 2.5, marginHorizontal: 10,
  },
  dojoRow: {
    flexDirection: 'row', alignItems: 'center', width: CARD_W,
    backgroundColor: '#131728', borderRadius: 14, padding: 14,
    marginVertical: 4, borderWidth: 1, borderColor: '#1C2038',
  },
  dojoRowDone: { borderColor: '#4ADE80', backgroundColor: '#0A1A10' },
  dojoRowLocked: { opacity: 0.35 },
  dojoRowIcon: { fontSize: 26, marginRight: 12, minWidth: 40, textAlign: 'center' },
  dojoRowName: { flex: 1, fontSize: 14, fontWeight: '800', color: '#E8DFC8', letterSpacing: 0.5 },
  dojoRowInspo: { fontSize: 11, color: '#6B7A8D', marginTop: 2 },
  dojoRowStatus: { fontSize: 18, marginLeft: 8 },

  // Solo Dojo — Argus speech bubble
  argusBubble: {
    width: CARD_W, backgroundColor: '#1A1200', borderRadius: 16,
    padding: 18, marginBottom: 4,
    borderWidth: 1.5, borderColor: '#F5C842',
    shadowColor: '#F5C842', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, shadowRadius: 10,
  },
  argusBubbleHeader: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 10,
  },
  argusMascot: { fontSize: 28, marginRight: 10 },
  argusName: { fontSize: 11, fontWeight: '700', color: '#F5C842', letterSpacing: 2 },
  argusSpeech: { fontSize: 15, color: '#E8DFC8', lineHeight: 24, fontStyle: 'italic' },

  // Solo Dojo — drill question & step
  drillStepPip: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12,
  },
  drillPip: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: '#1C2038',
  },
  drillPipActive: { backgroundColor: '#F5C842', width: 20, borderRadius: 4 },
  drillQuestion: {
    fontSize: 16, fontWeight: '700', color: '#E8DFC8',
    lineHeight: 26, textAlign: 'center', marginBottom: 16,
  },

  // Solo Dojo — multiple choice options
  drillOption: {
    width: CARD_W, backgroundColor: '#131728', borderRadius: 12,
    paddingHorizontal: 18, paddingVertical: 14,
    marginVertical: 4, borderWidth: 1.5, borderColor: '#1C2038',
    flexDirection: 'row', alignItems: 'center',
  },
  drillOptionLetter: {
    width: 26, height: 26, borderRadius: 8, backgroundColor: '#1C2038',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  drillOptionLetterTxt: { fontSize: 12, fontWeight: '800', color: '#6B7A8D' },
  drillOptionTxt: { flex: 1, fontSize: 14, color: '#E8DFC8', lineHeight: 20 },
  drillOptionCorrect: {
    borderColor: '#4ADE80', backgroundColor: '#0A1A10',
  },
  drillOptionWrong: {
    borderColor: '#FC8181', backgroundColor: '#1A0A0A',
  },
  drillOptionReveal: {
    borderColor: '#4ADE80', backgroundColor: '#0A1A10', opacity: 0.7,
  },

  // Solo Dojo — feedback strip
  drillFeedback: {
    width: CARD_W, borderRadius: 12, padding: 16,
    marginTop: 8, marginBottom: 4,
  },
  drillFeedbackOk: { backgroundColor: '#0A1A10', borderWidth: 1, borderColor: '#4ADE80' },
  drillFeedbackOops: { backgroundColor: '#1A0A0A', borderWidth: 1, borderColor: '#FC8181' },
  drillFeedbackTxt: { fontSize: 14, lineHeight: 22, color: '#E8DFC8', textAlign: 'center' },

  // Daily Quick Draw card (Home screen)
  dailyCard: {
    width: CARD_W, backgroundColor: '#0D1A18', borderRadius: 20,
    padding: 20, marginTop: 28,
    borderWidth: 1.5, borderColor: '#2ECFB0',
    shadowColor: '#2ECFB0', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 14,
  },
  dailyLabel: {
    fontSize: 11, fontWeight: '700', color: '#2ECFB0',
    letterSpacing: 2.5, marginBottom: 10,
  },
  dailyCaseTitle: {
    fontSize: 17, fontWeight: '900', color: '#E8DFC8',
    lineHeight: 24, marginBottom: 12,
  },
  dailyDivider: {
    height: 1, backgroundColor: '#2ECFB0', opacity: 0.4, marginBottom: 12,
  },
  dailyMoveLabel: {
    fontSize: 10, fontWeight: '700', color: '#6B7A8D',
    letterSpacing: 2, marginBottom: 4,
  },
  dailyMoveName: {
    fontSize: 14, fontWeight: '800', color: '#2ECFB0',
    letterSpacing: 0.5, marginBottom: 16,
  },
  dailyPlayBtn: {
    backgroundColor: '#2ECFB0', borderRadius: 28,
    paddingHorizontal: 24, paddingVertical: 13,
    alignItems: 'center',
  },
  dailyPlayBtnTxt: {
    color: '#E8DFC8', fontWeight: '800', fontSize: 14, letterSpacing: 1.5,
  },
  dailyPlayBtnDisabled: { opacity: 0.4 },
});
