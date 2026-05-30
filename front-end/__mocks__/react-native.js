// React Native mock for Jest (Node test environment).
// Stubs everything that screens.js, components.js, and data.js need at import time.
// Components are host-element strings so React.createElement() doesn't crash.

class AnimatedValue {
  constructor(v) { this._value = v; }
  setValue(v) { this._value = v; }
  interpolate() { return this; }
}

module.exports = {
  // ── Core ────────────────────────────────────────────────────────────────
  Dimensions: {
    get: () => ({ width: 375, height: 667 }),
    addEventListener: () => ({ remove: () => {} }),
  },
  StyleSheet: {
    create: styles => styles,
    flatten: style => style,
    hairlineWidth: 1,
  },
  Platform: {
    OS: 'ios',
    select: obj => obj.ios ?? obj.default,
  },

  // ── Components (host-element strings) ──────────────────────────────────
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  ScrollView: 'ScrollView',
  TextInput: 'TextInput',
  KeyboardAvoidingView: 'KeyboardAvoidingView',
  Image: 'Image',

  // ── Animated ────────────────────────────────────────────────────────────
  Animated: {
    View: 'Animated.View',
    Text: 'Animated.Text',
    Value: AnimatedValue,
    timing: () => ({ start: cb => cb && cb() }),
    spring: () => ({ start: cb => cb && cb() }),
    parallel: cmds => ({ start: cb => { cmds.forEach(c => c.start()); cb && cb(); } }),
    sequence: cmds => ({ start: cb => { cmds.forEach(c => c.start()); cb && cb(); } }),
    createAnimatedComponent: c => c,
  },
};
