let fs = require('fs');
let text = fs.readFileSync('../inputs/d05.txt', 'utf-8');
let total1 = 0;
let total2 = 0;
let naughty = ['ab', 'cd', 'pq', 'xy'];
let vowels = ['a', 'e', 'i', 'o', 'u'];

let has3Vowels = function (line) {
    let count = line.split('').reduce((memo, letter) => {
        if (vowels.includes(letter)) {
            memo++;
        }
        return memo;
    }, 0);
    return (count >= 3);
}

let hasDouble = function (line) {
    let letters = line.split('');
    for (let i = 0; i < letters.length - 1; i++) {
        if (letters[i] === letters[i + 1]) {
            return true;
        }
    }
    return false;
}

let notNaughty = function (line) {
    let size = line.split('').length;
    for (let i = 0; i < size - 1; i++) {
        if (naughty.includes(line.slice(i, i + 2))) {
            return false;
        }
    }
    return true;
}

let twoPairs = function(line) {
    let size = line.length;
    for (let i = 0; i < size - 2; i++) {
        if (line.slice(i+2).includes(line.slice(i, i+2))) {
            return true;
        }
    }
    return false;
}

let doubleBetween = function (line) {
    let size = line.split('').length;
    let letters = line.split('');
    for (let i = 0; i < size - 2; i++) {
        if (letters[i] === letters[i+2]) {
            return true
        }
    }
    return false;
}

let isNice1 = function (line) {
    return (has3Vowels(line) && hasDouble(line) && notNaughty(line));
}

let isNice2 = function (line) {
    return (twoPairs(line) && doubleBetween(line));
}

text.split('\n').map((line) => {
    if (isNice1(line)) {
        total1++;
    }
    if (isNice2(line)) {
        total2++;
    }
})

console.log('answer 1:',total1);
console.log('answer 2:',total2);