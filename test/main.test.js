const cf = require('../main');

test('calcola cf', () => {
  expect(cf("mario", "rossi", "M", 1, 1, 1980, "udine", "ud")).toBe("RSSMRA80A01L483J");
});