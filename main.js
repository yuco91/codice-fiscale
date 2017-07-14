
var comuniJson = require('./comuni.json')

var tavolaMesi = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T']

var checkdigitDispari = {
  0: 1,  1: 0,  2: 5,  3: 7,  4: 9,  5: 13, 6: 15, 7: 17, 8: 19,
  9: 21, A: 1,  B: 0,  C: 5,  D: 7,  E: 9,  F: 13, G: 15, H: 17,
  I: 19, J: 21, K: 2,  L: 4,  M: 18, N: 20, O: 11, P: 3,  Q: 6,
  R: 8,  S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23
}

var checkdigitPari = {
  0: 0,  1: 1,   2: 2,  3: 3,   4: 4,  5: 5,  6: 6,  7: 7,  8: 8,
  9: 9,  A: 0,   B: 1,  C: 2,   D: 3,  E: 4,  F: 5,  G: 6,  H: 7,
  I: 8,  J: 9,   K: 10, L: 11,  M: 12, N: 13, O: 14, P: 15, Q: 16,
  R: 17, S: 18,  T: 19, U: 20,  V: 21, W: 22, X: 23, Y: 24, Z: 25
}

var tavolaCheckdigit = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function ottieniConsonanti (str) {
  return str.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/gi, '')
}

function ottieniVocali (str) {
  return str.replace(/[^AEIOU]/gi, '')
}

function calcolaCognome (cognome) {
  var codiceCognome = ottieniConsonanti(cognome)
  codiceCognome += ottieniVocali(cognome)
  codiceCognome += 'XXX'
  codiceCognome = codiceCognome.substr(0, 3)

  return codiceCognome.toUpperCase()
}

function calcolaNome (nome) {
  var codiceNome = ottieniConsonanti(nome)
  if (codiceNome.length >= 4) {
    codiceNome =
      codiceNome.charAt(0) +
      codiceNome.charAt(2) +
      codiceNome.charAt(3)
  } else {
    codiceNome += ottieniVocali(nome)
    codiceNome += 'XXX'
    codiceNome = codiceNome.substr(0, 3)
  }

  return codiceNome.toUpperCase()
}

function calcolaDataSesso (gg, mm, aa, sesso) {
  var d = new Date()
  d.setYear(aa)
  d.setMonth(mm - 1)
  d.setDate(gg)

  var anno = '0' + d.getFullYear()
  anno = anno.substr(anno.length - 2, 2)

  var mese = tavolaMesi[d.getMonth()]

  var giorno = d.getDate()
  if (sesso.toUpperCase() === 'F') giorno += 40
  giorno = '0' + giorno
  giorno = giorno.substr(giorno.length - 2, 2)

  return '' + anno + mese + giorno
}

function calcolaCheckdigit (codiceFiscaleWOCheckdigit) {
  var i, val = 0
  for (i = 0;i < 15;i++) {
    var c = codiceFiscaleWOCheckdigit[i]
    if (i % 2)
      val += checkdigitPari[c]
    else
      val += checkdigitDispari[c]
  }
  val = val % 26
  return tavolaCheckdigit.charAt(val)
}

function calcolaCodiceComune (comune, provincia = null) {
  if (comune.match(/^[A-Z]\d\d\d$/i)) return comune

  var comuneEscaped = comune.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, '\\$1')
  var reEx = new RegExp('^\\b' + comuneEscaped + '$', 'ig')

  var parsedJSON = JSON.parse(comuniJson)

  var comuneResultObj = parsedJSON.filter(function (el) {
    if (provincia !== null) {
      return el.comune.match(reEx) && el.provincia === provincia.toUpperCase()
    } else {
      return el.comune.match(reEx)
    }
  })

  return comuneResultObj[0].codice
}

function calcolaCodiceFiscale (nome, cognome, sesso,
  dataNascitaGG, dataNascitaMM, dataNascitaYY,
  luogoNascita, provinciaNascita = null) {
  var codiceFiscaleWOCheckdigit =
  calcolaCognome(cognome)
  + calcolaNome(nome)
  + calcolaDataSesso(dataNascitaGG, dataNascitaMM, dataNascitaYY, sesso)
  + calcolaCodiceComune(luogoNascita, provinciaNascita)

  var codiceFiscale =
  codiceFiscaleWOCheckdigit
  + calcolaCheckdigit(codiceFiscaleWOCheckdigit)

  return codiceFiscale
}


module.exports = calcolaCodiceFiscale
