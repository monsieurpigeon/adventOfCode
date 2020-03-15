let fs = require("fs");
let text = fs.readFileSync("../inputs/d01.txt", "utf-8");
let arr = text.split('');
let firstTime = true;
let floor = arr.reduce((memo, dir, index) => {
    if (dir === '(') {
        memo++;
    } else {
        memo--;
    }
    if (memo === -1 && firstTime) {
        console.log('answer 2:',index + 1);
        firstTime = false;
    }
    return memo;
}, 0);
console.log('answer 1:',floor);