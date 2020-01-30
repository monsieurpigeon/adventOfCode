let intComputer = function (seq) {
    this.sequence = seq.slice(0);
    this.index = 0;
    this.relative = 0;
    let iteration = 0;
    this.getValue = function(index, param) {
        if (param == 0) {
            if (!this.sequence[this.sequence[index]]) {
                this.sequence[this.sequence[index]] = 0;
            }
            return this.sequence[this.sequence[index]];
        } else if (param == 1) {
            if (!this.sequence[index]) {
                this.sequence[index] = 0;
            }
            return this.sequence[index];
        } else if (param == 2) {
            if (!this.sequence[this.sequence[index] + this.relative]) {
                this.sequence[this.sequence[index] + this.relative] = 0;
            }
            return this.sequence[this.sequence[index] + this.relative];
        }
    };

    this.setValue = function(index, param, value) {
        if (param == 0) {
            this.sequence[this.sequence[index]] = value;
        } else if (param == 2) {
            this.sequence[this.sequence[index] + this.relative] = value;
        } else {
            console.log('setValue error');
        }
    }

    this.inputIndex = 0;
    this.input = [];

    this.compute = function (input, isProd = true) {
        let out = [];
        if (input === null) {
            console.log('null input')
            return null;
        }
        this.input = [...this.input, ...input];
        while (this.sequence[this.index] !== 99) {

            const parameters = ("00000" + this.sequence[this.index]).slice(-5).split('').map((str) => {return +str});
            if (!isProd) {
                // console.log(this.sequence.slice(this.index, this.index + 10).join(','),'parameters', parameters, 'relative', this.relative, 'index', this.index, this.sequence[1000], this.sequence[63]);
            }
            if (parameters[4] === 1) {
                // addition
                this.setValue(this.index + 3, parameters[0], this.getValue(this.index + 1, parameters[2]) + this.getValue(this.index + 2, parameters[1]));
                this.index += 4;
            } else if (parameters[4] === 2) {
                // multiplication
                this.setValue(this.index + 3, parameters[0], this.getValue(this.index + 1, parameters[2]) * this.getValue(this.index + 2, parameters[1]));
                this.index += 4;
            } else if (parameters[4] === 3){
                // input
                this.setValue(this.index + 1, parameters[2], this.input[this.inputIndex]);
                this.inputIndex++;
                this.index += 2;
            } else if (parameters[4] === 4){
                // output
                const output = this.getValue(this.index + 1, parameters[2]);
                this.index += 2;
                if (isProd) {
                    return [output];
                } else {
                    out.push(output);
                }
            } else if (parameters[4] === 5){
                // jump-if-true
                // console.log('jump-if-true', this.getValue(this.index + 1, parameters[2]));
                if (this.getValue(this.index + 1, parameters[2]) !== 0) {
                    this.index = this.getValue(this.index + 2, parameters[1]);
                } else {
                    this.index += 3;
                }
            } else if (parameters[4] === 6){
                // jump-if-zero
                if (this.getValue(this.index + 1, parameters[2]) === 0) {
                    this.index = this.getValue(this.index + 2, parameters[1]);
                } else {
                    this.index += 3;
                }
            } else if (parameters[4] === 7){
                // less than
                if (this.getValue(this.index + 1, parameters[2]) < this.getValue(this.index + 2, parameters[1])) {
                    this.setValue(this.index + 3, parameters[0], 1);
                } else {
                    this.setValue(this.index + 3, parameters[0], 0);
                }
                this.index += 4;
            } else if (parameters[4] === 8){
                // equal
                if (this.getValue(this.index + 1, parameters[2]) === this.getValue(this.index + 2, parameters[1])) {
                    // console.log(this.getValue(this.index + 1, parameters[2]), '===', this.getValue(this.index + 2, parameters[1]))
                    this.setValue(this.index + 3, parameters[0], 1);
                } else {
                    // console.log(this.getValue(this.index + 1, parameters[2]), '!==', this.getValue(this.index + 2, parameters[1]))
                    this.setValue(this.index + 3, parameters[0], 0);
                }
                this.index += 4;
            } else if (parameters[4] === 9) {
                // relative
                this.relative += this.getValue(this.index + 1, parameters[2]);
                this.index += 2;
            } else {
                console.log('ERROR', this.index);
                break;
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