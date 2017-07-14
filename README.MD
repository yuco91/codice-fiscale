# CODICE FISCALE ITALIANO

The Codice Fiscale in italy is the equivalent to social security number in america. 

## Installation

    npm install --save codice-fiscale

## Usage

### JS:

```
var cf = require('codice-fiscale')

 cf(name, surname, sex, birthDateDay, placeOfBirth, [stateOfBirth])
```

### TS:

```
import cf from "codice-fiscale";

var cf = require('codice-fiscale')

 cf(name, surname, sex, birthDate, placeOfBirth, [stateOfBirth])
```

### Throws:

Exception if a field is not correct, you can get the error message in italian.
Example:
```
import cf from "codice-fiscale";
try{
var cf = require('codice-fiscale')

 cf(name, surname, sex, birthDate, placeOfBirth, [stateOfBirth])
}catch(e){
    alert(e.message)
}
```


## License


(ISC License)

Forked from yuco91 <yuco91@gmail.com>
