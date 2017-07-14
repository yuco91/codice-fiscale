const cf = require('../main');

test('calcola cf', () => {
  expect(cf("mario", "rossi", "M", new Date('1980-1-1'), "udine", "ud")).toBe("RSSMRA80A01L483J");
  expect(cf("Nicola", "Bonavita", "M", new Date('1984-8-12'), "campobasso")).toBe("BNVNCL84M12B519F");
});