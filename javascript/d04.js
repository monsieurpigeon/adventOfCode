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
        for (let j = 0; j < digits.length - 1; j++) {
            if (digits[j] === digits[j+1]) {
                response ++;
                break;
            }
        }
    }
}
console.log(response);