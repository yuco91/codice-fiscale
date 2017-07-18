# Codice Fiscale (Italian S.S.N.)

The Codice Fiscale in italy is the equivalent to social security number in america. 
This package helps to get C.F. code from user data.

## Installation

    npm install --save codice-fiscale

## Usage

### JS:

```
var cf = require('codice-fiscale')

 //cf(name, surname, sex, birthDateDay, placeOfBirth)
 var mycf = cf("mario", "rossi", "m", new Date('1980-1-1'), "udine")
```

### TS:

```
import cf from "codice-fiscale";

var cf = require('codice-fiscale')

 //cf(name, surname, sex, birthDate, placeOfBirth)
 //new Date('YYYY-DD-MM')
 let mycf = cf("stefania", "bianchi", "F", new Date('2017-09-12'), "SAMATZAI")
```

### Throws:

Exception if a field is not correct, you can get the error message in italian.
Example:
```
import cf from "codice-fiscale";
try{
var cf = require('codice-fiscale')

 cf(name, surname, sex, birthDate, placeOfBirth)
}catch(e){
    var errorMessage = translate(e.message);
    //do some stuff with errorMessage
}
```

Error keys ready for translation (e.message value):
surname => surname empty
name => name empty
sex => sex empty or sex not equal M or F
date => date is not an instance of js date
city => city not found



## License

(ISC License)

Nicola Bonavita (@topperblues)

Forked from yuco91 <yuco91@gmail.com>
