// Instantiate the grammar.
var fs = require('fs');
var ohm = require('ohm-js');
var g = ohm.grammar(fs.readFileSync('time.ohm'));

var text = '10h + 20s + 30m + 1h30m + 2h30s'

console.log(g.match(text).succeeded());
// console.log(g.trace(text).toString());

// Create an operation that evaluates the expression. An operation always belongs to a Semantics,
// which is a family of related operations and attributes for a particular grammar.
var semantics = g.createSemantics().addOperation('eval', {
  Exp: function(e) {
    const eval = e.eval()
    const hours = Math.floor(eval / (60 * 60))
    const minutes = Math.floor(eval % (60 * 60) / 60)
    const seconds = eval % 60
    let result = ""
    if(hours) {
      result += `${hours}h`
    }
    if(minutes) {
      result += `${minutes}m`
    }
    if(seconds) {
      result += `${seconds}s`
    }
    return result;
  },
  AddExp: function(e) {
    return e.eval();
  },
  AddExp_plus: function(left, op, right) {
    return left.eval() + right.eval();
  },
  Time_HourMinuteSeconds: function(hour, minute, second) {
    return hour.eval() + minute.eval() + second.eval();
  },
  Time_HourMinute: function(hour, minute) {
    return hour.eval() + minute.eval();
  },
  Time_HourSeconds: function(hour, second) {
    return hour.eval() + second.eval();
  },
  Time_MinuteSeconds: function(minute, second) {
    return minute.eval() + second.eval();
  },
  Hours: function(didit, u) {
    return parseInt(didit.sourceString, 10) * 60 * 60;
  },
  Minutes: function(didit, u) {
    return parseInt(didit.sourceString, 10) * 60;
  },
  Seconds: function(didit, u) {
    return parseInt(didit.sourceString, 10);
  },
});
var match = g.match(text);
console.log(semantics(match).eval());
