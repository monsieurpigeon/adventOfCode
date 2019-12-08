// list of input from the exercice
const inputs = require('./inputs');
const input = inputs.d02;
// first iteration on the first parameter
for (let i = 0; i < 100; i++) {

    // second (nested) iteration on the second parameter
    for (let j = 0; j < 100; j++) {

        // initialisation of the index for each test
        let index = 0;
        // clone of the input to perform the test
        let test = input.slice(0);
        // initialisation of the parameters
        test[1] = i;
        test[2] = j;
        // runs the loop of the exercice
        while (test[index] !== 99) {
            if (test[index] === 1) {
                // addition
                test[test[index + 3]] = test[test[index + 1]]  + test[test[index + 2]];
            } else if (test[index] === 2) {
                // multiplication
                test[test[index + 3]] = test[test[index + 1]]  * test[test[index + 2]];
            } else {
                console.log('ERROR');
            }
            // move the index to the next input.
            index += 4;
        }
        if (i==12 && j==2) {
            // parameters for the first exercice
            console.log('response 1 :',test[0]);
        }
        if (test[0] === 19690720) {
            // solution for the second exercice
            console.log('response 2 :',i * 100 + j);
        }
    }
}