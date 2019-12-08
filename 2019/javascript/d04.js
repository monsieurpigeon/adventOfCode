let input = [171309,643603];
let response = 0;
for (let index = input[0]; index < input[1] + 1; index++) {
    let digits = (index + "").split("");
    let isOkay = true;
    for (let j = 0; j < digits.length - 1; j++) {
        if (digits[j] > digits[j+1]) {
            isOkay = false;
            break;
        }
    }
    if (isOkay) {
        let doubles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let j = 0; j < digits.length - 1; j++) {
            if (digits[j] === digits[j+1]) {
                doubles[digits[j]]++;
            }
        }
        if (doubles.includes(1)) {
            response ++;
        }
    }
}
console.log(response);