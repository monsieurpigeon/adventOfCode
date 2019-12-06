// list of input from the exercice
const inputs = require('./inputs');
const input = inputs.d01;

// return the total fuel quantity for every module
const compute = function(doTheSum) {
    return input.reduce((memo, value) => {
        let total = Math.floor(value / 3) - 2;
        let last = total;
        // continue the math to get the fuel necessary for the new fuel (exercice 2)
        // false for exercice 1, true for exercice 2
        if (doTheSum) {
            while (last > 0) {
                last = Math.max(Math.floor(last / 3) - 2, 0);
                total += last;
            }
        }
        // add the fuel necessary for the current module (total) to the sum previously computed (memo)
        return memo + total;
    }, 0);
}

// displays the answers to the console
console.log('response 1 :', compute(false));
console.log('response 2 :', compute(true));