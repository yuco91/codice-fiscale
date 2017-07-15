
var citiesJson = require('./comuni.json')

var monthLiterals = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T']

var checkOddDigit = {
  0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19,
  9: 21, A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17,
  I: 19, J: 21, K: 2, L: 4, M: 18, N: 20, O: 11, P: 3, Q: 6,
  R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23
}

var checkEvenDigit = {
  0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8,
  9: 9, A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7,
  I: 8, J: 9, K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16,
  R: 17, S: 18, T: 19, U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25
}

var checkDigitTable = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'




function getConsonants(str) {
  return str.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/gi, '')
}

function getVowels(str) {
  return str.replace(/[^AEIOU]/gi, '')
}

function getSurnameCode(surname) {
  var surnameCode = getConsonants(surname)
  surnameCode += getVowels(surname)
  surnameCode += "XXX"
  surnameCode = surnameCode.slice(0, 3)

  if (surnameCode == "") {
    throw new Error("surname")
  }

  return surnameCode.toUpperCase()
}

function getNameCode(name) {
  var nameCode = getConsonants(name)
  if (nameCode.length >= 4) {
    nameCode =
      nameCode.charAt(0) +
      nameCode.charAt(2) +
      nameCode.charAt(3)
  } else {
    nameCode += getVowels(name)
    nameCode += "XXX"
    nameCode = nameCode.slice(0, 3)
  }

  if (nameCode == "") {
    throw new Error("name")
  }

  return nameCode.toUpperCase()
}

function getDateAndSexCodes(date, sex) {
  if (sex.toUpperCase() != "M" && sex.toUpperCase() != "F") {
    throw new Error("sex")
  }

  if (!(date instanceof Date)) {
    throw new Error("date")
  }

  var year = date.getFullYear().toString()
  year = year.slice(-2)

  var month = monthLiterals[date.getMonth()]

  var day = date.getDate()
  if (sex.toUpperCase() === 'F') day += 40

  if (day < 10) {
    day = '0' + day
  }

  return '' + year + month + day
}

function getCheckdigit(codiceFiscaleWOCheckdigit) {
  var i, val = 0
  for (i = 0; i < 15; i++) {
    var c = codiceFiscaleWOCheckdigit[i]
    if (i % 2)
      val += checkEvenDigit[c]
    else
      val += checkOddDigit[c]
  }
  val = val % 26
  return checkDigitTable.charAt(val)
}


function getCityCode(city) {
  if (city.match(/^[A-Z]\d\d\d$/i)) return city

  var cityEscaped = city.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g, '\\$1')

  var reEx = new RegExp('^\\b' + cityEscaped + '$', 'ig')

  var parsedJSON = JSON.parse(JSON.stringify(citiesJson))

  var cityResultObj = parsedJSON.filter(function (el) {
    return el.comune.match(reEx)
  })

  if (!cityResultObj[0]) {
    throw new Error("city")
  }

  return cityResultObj[0].codice
}

function getCodiceFiscale(name, surname, sex, dateOfBirth, birthPlace) {

  var codiceFiscaleWOCheckdigit =
    getSurnameCode(surname)
    + getNameCode(name)
    + getDateAndSexCodes(dateOfBirth, sex)
    + getCityCode(birthPlace)

  var codiceFiscale =
    codiceFiscaleWOCheckdigit
    + getCheckdigit(codiceFiscaleWOCheckdigit)

  return codiceFiscale

}

module.exports = getCodiceFiscale
