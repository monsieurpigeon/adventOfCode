let intComputer = function (seq) {
    this.sequence = seq.slice(0);
    this.index = 0;
    let iteration = 0;
    this.getValue = function(index, param) {
        if (param == 0) {
            return this.sequence[this.sequence[index]];
        } else if (param == 1) {
            return this.sequence[index];
        }
    };

    this.compute = function (input, isProd = true) {
        let inputIndex = 0;
        let out;
        if (input === null) {
            return null;
        }
        while (this.sequence[this.index] !== 99) {

            const parameters = ("00000" + this.sequence[this.index]).slice(-5).split('').map((str) => {return +str});
            if (parameters[4] === 1) {
                // addition
                this.sequence[this.sequence[this.index + 3]] = this.getValue(this.index + 1, parameters[2]) + this.getValue(this.index + 2, parameters[1]);
                this.index += 4;
            } else if (parameters[4] === 2) {
                // multiplication
                this.sequence[this.sequence[this.index + 3]] = this.getValue(this.index + 1, parameters[2]) * this.getValue(this.index + 2, parameters[1]);
                this.index += 4;
            } else if (parameters[4] === 3){
                // input
                this.sequence[this.sequence[this.index + 1]] = input[inputIndex];
                inputIndex++;
                this.index += 2;
            } else if (parameters[4] === 4){
                // output
                const output = this.getValue(this.index + 1, parameters[2]);
                this.index += 2;
                if (isProd) {
                    return [output];
                } else {
                    out = output;
                }
            } else if (parameters[4] === 5){
                if (this.getValue(this.index + 1, parameters[2]) !== 0) {
                    this.index = this.getValue(this.index + 2, parameters[1]);
                } else {
                    this.index += 3;
                }
            } else if (parameters[4] === 6){
                if (this.getValue(this.index + 1, parameters[2]) === 0) {
                    this.index = this.getValue(this.index + 2, parameters[1]);
                } else {
                    this.index += 3;
                }
            } else if (parameters[4] === 7){
                if (this.getValue(this.index + 1, parameters[2]) < this.getValue(this.index + 2, parameters[1])) {
                    this.sequence[this.sequence[this.index + 3]] = 1;
                } else {
                    this.sequence[this.sequence[this.index + 3]] = 0;
                }
                this.index += 4;
            } else if (parameters[4] === 8){
                if (this.getValue(this.index + 1, parameters[2]) === this.getValue(this.index + 2, parameters[1])) {
                    this.sequence[this.sequence[this.index + 3]] = 1;
                } else {
                    this.sequence[this.sequence[this.index + 3]] = 0;
                }
                this.index += 4;
            } else {
                console.log('ERROR');
            }
        }
        if (isProd) {
            return null;
        } else {
            return out;
        }
    }
}

module.exports = {
    intComputer
}