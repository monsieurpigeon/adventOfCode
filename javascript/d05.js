const inputs = require('./inputs');
const commons = require('./commons');

let intComputer = new commons.intComputer(inputs.d05);

console.log(intComputer.compute([5]));