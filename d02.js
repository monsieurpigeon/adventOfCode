const input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,6,19,23,1,13,23,27,1,6,27,31,1,31,10,35,1,35,6,39,1,39,13,43,2,10,43,47,1,47,6,51,2,6,51,55,1,5,55,59,2,13,59,63,2,63,9,67,1,5,67,71,2,13,71,75,1,75,5,79,1,10,79,83,2,6,83,87,2,13,87,91,1,9,91,95,1,9,95,99,2,99,9,103,1,5,103,107,2,9,107,111,1,5,111,115,1,115,2,119,1,9,119,0,99,2,0,14,0];
for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        let index = 0;
        let test = input.slice(0);
        test[1] = i;
        test[2] = j;
        while (test[index] !== 99) {
            if (test[index] === 1) {
                test[test[index + 3]] = test[test[index + 1]]  + test[test[index + 2]];
            } else if (test[index] === 2) {
                test[test[index + 3]] = test[test[index + 1]]  * test[test[index + 2]];
            } else {
                console.log('ERROR');
            }
            index += 4;
        }
        // console.log(i, j, test[0]);
        if (i==12 && j==2) {
            console.log('response 1',test[0]);
        }
        if (test[0] === 19690720) {
            console.log('response 2',i * 100 + j);
        }
    }
}