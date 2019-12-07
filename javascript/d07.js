const commons = require('./commons');
const inputs = require('./inputs');
let intComputer = commons.intComputer;
const sequence = inputs.d07;
// const sequence = [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
//     -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
//     53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10]
let max = 0;

// for (let i1 = 0; i1 < 5; i1++) {
//     for (let i2 = 0; i2 < 5; i2++) {
//         for (let i3 = 0; i3 < 5; i3++) {
//             for (let i4 = 0; i4 < 5; i4++) {
//                 for (let i5 = 0; i5 < 5; i5++) {
//                     if ((new Set([i1, i2, i3, i4, i5])).size === 5) {
//                         let c1 = new intComputer(sequence);
//                         let c2 = new intComputer(sequence);
//                         let c3 = new intComputer(sequence);
//                         let c4 = new intComputer(sequence);
//                         let c5 = new intComputer(sequence);
//                         let result = c5.compute(
//                             [i5, ...c4.compute(
//                                 [i4, ...c3.compute(
//                                     [i3, ...c2.compute(
//                                         [i2, ...c1.compute(
//                                             [i1, 0]
//                                         )]
//                                     )]
//                                 )]
//                             )]
//                         );
//                         if (result[0] > max) {
//                             max = result[0];
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }
// console.log('response 1 :', max);
max = 0;
for (let i1 = 5; i1 < 10; i1++) {
    for (let i2 = 5; i2 < 10; i2++) {
        for (let i3 = 5; i3 < 10; i3++) {
            for (let i4 = 5; i4 < 10; i4++) {
                for (let i5 = 5; i5 < 10; i5++) {
                    if ((new Set([i1, i2, i3, i4, i5])).size === 5) {
                        // console.log(i1,i2,i3,i4,i5);
                        console.log('NEW', [i1, i2, i3, i4, i5]);
                        let c1 = new intComputer(sequence);
                        let c2 = new intComputer(sequence);
                        let c3 = new intComputer(sequence);
                        let c4 = new intComputer(sequence);
                        let c5 = new intComputer(sequence);
                        let start = c5.compute([i5, ...c4.compute([i4, ...c3.compute([i3, ...c2.compute([i2, ...c1.compute([i1, 0])])])])]);
                        console.log([i1, i2, i3, i4, i5], start);
                        while (tmp = c5.compute(c4.compute(c3.compute(c2.compute(c1.compute(start)))))) {
                            console.log('-- loop -----------');
                            start = tmp;
                        }
                        if (start[0] > max) {
                            console.log(start);
                            max = start[0];
                        }
                        console.log('-------------');
                    }
                }
            }
        }
    }
}
console.log(max);