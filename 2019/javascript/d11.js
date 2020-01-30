let fs = require('fs');
const commons = require('./commons');

let text = fs.readFileSync('./inputs/d11.txt', 'utf-8');
let c1 = new commons.intComputer(text.split(',').map((num) => {return +num}));

let map = [];
let position = [0, 0];
let rotation = [[0,1], [1,0], [0, -1], [-1, 0]];
let rotationIndex = 0;

let counter = [];

map[position[0]] = [];
map[position[0]][position[1]] = 0;
while (color = c1.compute([map[position[0]][position[1]]])) {
    map[position[0]][position[1]] = color[0];
    if (!counter[position[0]]) {
        counter[position[0]] = [];
    }
    if (!counter[position[0]][position[1]]) {
        counter[position[0]][position[1]] = 1;
    }
    let nextRot = c1.compute([])[0] * 2 - 1;
    rotationIndex = (rotationIndex + nextRot + 4) % 4;
    position[0] += rotation[rotationIndex][0];
    position[1] += rotation[rotationIndex][1];
    if (!map[position[0]]) {
        map[position[0]] = [];
    }
    if (!map[position[0]][position[1]]) {
        map[position[0]][position[1]] = 0;
    }
}
let solution = counter.reduce((memo, line) => {
    return memo + line.reduce((memo, pos) => {
        if (pos === 1) {
            return memo + 1;
        } else {
            return memo;
        }
    }, 0);
}, 0);
let solution2 = map.reduce((memo, line) => {
    return memo + line.reduce((memo, pos) => {
        if (pos>=0) {
            return memo + 1;
        } else {
            return memo;
        }
    }, 0);
}, 0);

map.forEach((line) => {
    console.log(line.join('.'));
})

console.log(solution, solution2);