const cf = require('../main');

test('calcola cf', () => {
  expect(cf("mario", "rossi", "M", new Date('1980-1-1'), "udine", "ud")).toBe("RSSMRA80A01L483J");
  expect(cf("stefania", "bianchi", "F", new Date('2017-09-12'), "SAMATZAI")).toBe("BNCSFN17P52H739A");
});