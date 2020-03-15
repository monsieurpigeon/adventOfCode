let fs= require('fs');
let text = fs.readFileSync('../inputs/d03.txt', 'utf-8');
let houses = {};
let houses2 = {};
let total = 0;
let total2 = 0;
let pos = {
    x: 0,
    y: 0
}

let posSanta = {x: 0, y: 0};
let posRobot = {x: 0, y: 0};

let map = {
    '>': {x: 1, y: 0},
    '^': {x: 0, y: 1},
    'v': {x: 0, y: -1},
    '<': {x: -1, y: 0}
}

houses[0] = {};
houses[0][0] = true;
total++;

houses2[0] = {};
houses2[0][0] = true;
total2++;

text.split('').forEach((dir, index) => {
    let tmp;

    pos.x += map[dir].x;
    pos.y += map[dir].y;

    if (!houses[pos.x]) {
        houses[pos.x] = {};
    }
    if (!houses[pos.x][pos.y]) {
        total++;
        houses[pos.x][pos.y] = true;
    }

    if (index % 2 == 0) {
        posSanta.x += map[dir].x;
        posSanta.y += map[dir].y;
        tmp = posSanta;
    } else {
        posRobot.x += map[dir].x;
        posRobot.y += map[dir].y;
        tmp = posRobot
    }

    if (!houses2[tmp.x]) {
        houses2[tmp.x] = {};
    }
    if (!houses2[tmp.x][tmp.y]) {
        total2++;
        houses2[tmp.x][tmp.y] = true;
    }
});
console.log('answer 1:', total);
console.log('answer 2:', total2);