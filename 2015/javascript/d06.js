let fs = require('fs');
let text = fs.readFileSync('../inputs/d06.txt', 'utf-8');
let instr = text.split('\n');
let lights = [];
let lights2 = [];
for (let i = 0; i < 1000; i++) {
    lights[i] = [];
    lights2[i] = [];
    for (let j = 0; j < 1000; j++) {
        lights[i][j] = false;
        lights2[i][j] = 0;
    }
}
instr.map((instru) => {
    let mes = instru.split(' ');
    if (mes[0] === 'turn') {
        let coord1 = mes[2].split(',');
        let coord2 = mes[4].split(',');
        for (let i = +coord1[0]; i <= +coord2[0]; i++) {
            for (let j = +coord1[1]; j <= +coord2[1]; j++) {
                if (mes[1] === 'on') {
                    lights[i][j] = true
                    lights2[i][j]++;
                } else {
                    lights[i][j] = false;
                    lights2[i][j] = Math.max(0, lights2[i][j] - 1);
                }
            }
        }
    } else {
        let coord1 = mes[1].split(',');
        let coord2 = mes[3].split(',');
        for (let i = +coord1[0]; i <= +coord2[0]; i++) {
            for (let j = +coord1[1]; j <= +coord2[1]; j++) {
                lights[i][j] = !lights[i][j];
                lights2[i][j]+= 2;
            }
        }
    }
});

let ans1 = lights.reduce((memo, line) => {
    return memo + line.reduce((memo, light) => {
        if (light) {
            memo++;
        }
        return memo;
    }, 0);
}, 0);

let ans2 = lights2.reduce((memo, line) => {
    return memo + line.reduce((memo, light) => {
        return memo + light;
    }, 0);
}, 0);

console.log('answer 1:', ans1);
console.log('answer 2:', ans2);