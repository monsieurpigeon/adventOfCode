let fs = require('fs');
const commons = require('./commons');
let text = fs.readFileSync('./inputs/d09.txt', 'utf-8');

let c1 = new commons.intComputer(text.split(',').map((num) => {return +num}));
let c2 = new commons.intComputer(text.split(',').map((num) => {return +num}));

console.log('answer 1:', c1.compute([1], false)[0]);
console.log('answer 2:', c2.compute([2], false)[0]);