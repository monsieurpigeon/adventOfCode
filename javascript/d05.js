const inputs = require('./inputs');
const commons = require('./commons');

let c1 = new commons.intComputer(inputs.d05);
let c2 = new commons.intComputer(inputs.d05);

console.log('response 1 :', c1.compute([1], false));
console.log('response 2 :', c2.compute([5])[0]);