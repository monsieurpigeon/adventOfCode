let md5 = require('md5');

let input = 'iwrupvqb';
let ans = 0;
let found1 = false;
let found2 = false;

while (true) {
    let hash = md5(input + ans);
    if (!found1 && hash.slice(0,5) === '00000') {
        console.log('answer 1:', ans);
        found1 = true;
        if (found1 && found2) {
            break;
        }
    }
    if (!found2 && hash.slice(0,6) === '000000') {
        console.log('answer 2:', ans);
        found2 = true;
        if (found1 && found2) {
            break;
        }
    }
    ans++;
}