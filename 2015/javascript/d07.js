let fs = require('fs');
let text = fs.readFileSync('./inputs/d07.txt', 'utf-8');
let orders = text.split('\n');
let inst = orders.reduce((memo, order) => {
    let parts = order.split(' -> ');
    memo[parts[1]] = {order: parts[0]};
    return memo;
}, {});

let getValue = function(wire) {
    if (inst[wire].cache) {
        return inst[wire].cache;
    }
    let order = inst[wire].order;
    let dec = order.split(' ');
    if (dec.length === 1) {
        if (+dec[0] == dec[0]) {
            return +dec[0];
        } else {
            return getValue(dec[0]);
        }
    } else if (dec.length === 2) {
        if (dec[0] === 'NOT') {
            inst[wire].cache = 65535 - getValue(dec[1]);
            return inst[wire].cache;
        } else {
            console.log('ERROR dec.length===2', order);
        }
    } else if (dec.length === 3) {
        let first, second;
        if (+dec[0] == dec[0]) {
            first = dec[0];
        } else {
            first = getValue(dec[0]);
        }
        if (+dec[2] == dec[2]) {
            second = dec[2];
        } else {
            second = getValue(dec[2]);
        }

        switch(dec[1]) {
            case 'AND':
                inst[wire].cache = first & second;
                return inst[wire].cache;
            case 'OR':
                inst[wire].cache = first | second;
                return inst[wire].cache;
            case 'LSHIFT':
                inst[wire].cache = first * Math.pow(2, second);
                return inst[wire].cache;
            case 'RSHIFT':
                inst[wire].cache = Math.floor(first / Math.pow(2, second));
                return inst[wire].cache;
        }
    } else {
        console.log('error', order);
    }
    // return inst[wire];
}

console.log('answer 1:', getValue('a'));