let fs = require('fs');
let text =  fs.readFileSync('./inputs/d10.txt', 'utf-8');
spaceMap = [];
text.split('\n').map((line, index) => {
    spaceMap[index] = line.split('').map((char) => {
        return char === '#';
    });
});

const height = spaceMap.length;
const width = spaceMap[0].length;

function calcAst(iBase, jBase) {
    let total = 0;
    let angles = {};
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (!(i == iBase && j == jBase) && spaceMap[i][j]) {
                let angle = (iBase - i) / (jBase - j);

                if (i < iBase) {
                    angle = "u" + angle;
                } else if (i > iBase) {
                    angle = "d" + angle;
                } else {
                    if (j < jBase) {
                        angle = "l" + angle;
                    } else if (j > jBase) {
                        angle = "r" + angle;
                    }
                }
                if (!angles[angle]) {
                    angles[angle] = true;
                    total++;
                }
            }
        }
    }
    return total;
}

let vision = spaceMap.map((line, i) => {
    return line.map((ast, j) => {
        if (!ast) { return 0; }
        else { return calcAst(i,j) };
    })
});

let max = vision.reduce((memo, line, i) => {
    let res = line.reduce((memo, value, j) => {
        if (value > memo[0]) { return [value, i, j] }
        else { return memo }
    }, [0, 0, 0]);
    if (res[0] > memo[0]) { return res }
    else { return memo }
}, [0, 0, 0]);


console.log(max[0]);
console.log(`${max[1]} : ${max[2]}`);
const base = {i: max[1], j: max[2]};
let asteroidList = {};

function getValues(i, j) {
    let baseVec = {
        i: -1,
        j: 0
    };

    let vec = {
        i: i - base.i,
        j: j - base.j
    };

    let angle, magnitude;

    if (vec.i < 0) {
        if (vec.j < 0) {
            // QUAD IV
            angle = Math.atan(Math.abs(vec.i) / Math.abs(vec.j)) + 3 * Math.PI / 2;
        } else if (vec.j > 0) {
            // QUAD I
            angle = Math.atan(Math.abs(vec.j) / Math.abs(vec.i));

        } else {
            angle = 0;
        }
    } else if (vec.i > 0) {
        if (vec.j < 0) {
            // QUAD III
            angle = Math.atan(Math.abs(vec.j) / Math.abs(vec.i)) + Math.PI;
        } else if (vec.j > 0) {
            // QUAD II
            angle = Math.atan(Math.abs(vec.i) / Math.abs(vec.j)) + Math.PI / 2;
        } else {
            angle = Math.PI;
        }
    } else {
        if (vec.j < 0) {
            angle = 3 * Math.PI / 2;
        } else if (vec.j > 0) {
            angle = Math.PI / 2;
        } else {
            console.log("ERROR");
        }
    }

    magnitude = Math.sqrt(vec.i * vec.i + vec.j * vec.j);

    return [angle, magnitude];
}

function storeNewAsteroid(angle, magnitude, i, j) {
    if (!asteroidList[angle]) {
        asteroidList[angle] = {};
    }
    asteroidList[angle][magnitude] = {i, j};
}

spaceMap[base.i][base.j] = false;

spaceMap.map((line, i) => {
    line.map((ast, j) => {
        if (ast) {
            let [angle, magnitude] = getValues(i, j);
            storeNewAsteroid(angle, magnitude, i, j);
        }
    })
});
console.log(asteroidList);

let index = 1;
while (Object.keys(asteroidList).length > 0) {
    Object.keys(asteroidList).sort((a, b) => {
        return +a - +b
    }).map((key) => {
        let available = Object.keys(asteroidList[key]).sort((a, b) => {
            return +a - +b
        });
        console.log(index, '=>', asteroidList[key][available[0]]);
        index++;
        delete asteroidList[key][available[0]];
        if (Object.keys(asteroidList[key]).length === 0) {
            delete asteroidList[key];
        }
    });
}


