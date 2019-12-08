const inputs = require('./inputs');
const input = inputs.d06;
const map = {};
input.forEach((orbit) => {
    data = orbit.split(')');
    if (!map[data[0]]) {
        map[data[0]] = [];
    }
    map[data[0]].push(data[1]);
});

let youpath = '';
let santapath = '';

const getOrbits = function(planet, path) {
    if (map[planet]) {
        return map[planet].reduce((memo, orbit) => {
            memo[orbit] = getOrbits(orbit, `${path}-${orbit}`);
            return memo;
        }, {});
    } else {
        if (planet == 'YOU') {
            youpath = path;
        }
        if (planet == 'SAN') {
            santapath = path;
        }
        return `${path}`;
    }
}

const graph = {
    'COM': map['COM'].reduce((memo, orbit) => {
        memo[orbit] = getOrbits(orbit, `COM-${orbit}`);
        return memo;
    }, {})
}

const countOrbits = function(index, planet) {
    if (map[planet]) {
        return index + map[planet].reduce((memo, orbit) => {
            return memo + countOrbits(index + 1, orbit);
        }, 0);
    } else {
        return index;
    }
}

const key = countOrbits(0, 'COM');

console.log('response 1 :', key);
const you = youpath.split('-');
const santa = santapath.split('-');
const length = Math.min(you.length, santa.length);

for (let i = 0; i < length; i++) {
    if (you[i] !== santa[i]) {
        console.log('response 2 :', santa.length + you.length - 2 * i - 2);
        break;
    }
}