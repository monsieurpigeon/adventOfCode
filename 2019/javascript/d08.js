let fs = require("fs");
let text = fs.readFileSync("./inputs/d08.txt", "utf-8");
let arr = text.match(/.{150}/g);
let answer = arr.map((str) => {
    return str.split('').reduce((memo, char) => {
        memo[+char]++;
        return memo;
    }, [0, 0, 0])
}).reduce((memo, arr) => {
    if (arr[0] < memo.max) {
        memo.max = arr[0];
        memo.arr = arr;
    }
    return memo;
}, {max:1000, arr:[0,0,0]});
console.log('response 1 :',answer.arr[1] * answer.arr[2]);
console.log(arr);
let image = [];
for (let i = 0; i < 150; i++) {
    for (let j = 0; j < arr.length; j++) {
        const pixel = +arr[j].split('')[i];
        console.log(pixel);
        if (pixel == 0 || pixel == 1) {
            image.push(pixel);
            break;
        }
    }
}
console.log(image);
for (let i = 0; i < 6; i++) {
    let result = '';
    for (let j = 0; j < 25; j++) {
        if (image[25 * i + j] === 1) {
            result += 'X';
        } else {
            result += ' ';
        }
    }
    console.log(result);
}