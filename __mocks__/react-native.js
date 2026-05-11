// Minimal mock for the react-native module so data.js can be imported in
// a plain Node test environment without loading the full RN runtime.
// Only Dimensions is needed (used by data.js to compute CARD_W).

module.exports = {
  Dimensions: {
    get: () => ({ width: 375, height: 667 }),
    addEventListener: () => ({ remove: () => {} }),
  },
  StyleSheet: {
    create: styles => styles,
    flatten: style => style,
  },
  Platform: {
    OS: 'ios',
    select: obj => obj.ios ?? obj.default,
  },
};
