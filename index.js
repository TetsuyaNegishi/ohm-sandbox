const fs = require('fs');
const ohm = require('ohm-js');
const contents = fs.readFileSync('myGrammar.ohm');
const myGrammar = ohm.grammar(contents);

const semantics = myGrammar.createSemantics();
semantics.addOperation('greet', {
  Exp: function(e) {
    return e.greet();
  },
  Exp2: function(e) {
    return e.greet();
  },
  Exp2_plus: function(left, op, right) {
    return left.greet() + right.greet();
  },
  Greeting: function(e) {
    return this.sourceString;
  }
})

const userInput = 'Hola + Hola';
const m = myGrammar.match(userInput);
console.log('succeed')
if (m.succeeded()) {
  console.log('Greetings, human.');
} else {
  console.log("That's not a greeting!");
}

console.log(semantics(m).greet())
