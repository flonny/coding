/*variable*/
var num = 1;
num = 3;
var price = 1.5;
var myName = 'Packt';
var tureValue = true;
var nullValue = null;
var uud;
console.log('num ' + num);
console.log('myName ' + myName);
console.log('trueValue ' + tureValue);
console.log('price ' + price);
console.log('nullValue ' + nullValue);
console.log('uud ' + uud);

/* variable scope */
var myVariable =  'global';
myOtherVariable = 'global';

function myFunction() {
  var myVariable = 'local';
  return myVariable;
}

function myOtherFunction() {
  myOtherVariable = 'local';
  return myOtherVariable
}

console.log(myVariable);
console.log(myFunction());

console.log(myOtherVariable);
console.log(myOtherFunction());
console.log(myOtherVariable);