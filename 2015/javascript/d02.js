let fs = require('fs');
let text = fs.readFileSync('./inputs/d02.txt', 'utf-8');
let arr = text.split('\n');
let gifts = arr.map((line) => {
    return line.split('x');
});

let wrap = gifts.reduce((memo, gift) => {
    let a1 = gift[0] * gift[1];
    let a2 = gift[1] * gift[2];
    let a3 = gift[2] * gift[0];
    return memo + 2 * a1 + 2 * a2 + 2 * a3 + Math.min(a1, a2, a3);
}, 0);
let ribbon = gifts.reduce((memo, gift) => {
    let a1 = +gift[0];
    let a2 = +gift[1];
    let a3 = +gift[2];
    let around = (a1 + a2 + a3 - Math.max(a1, a2, a3)) * 2;
    let bow = a1 * a2 * a3;
    console.log(gift, around, bow);
    return memo + around + bow;
}, 0);

console.log('answer 1:', wrap);
console.log('answer 2:', ribbon);