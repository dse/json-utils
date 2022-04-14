'use strict';

const fs = require('fs');

class MagicFilehandle {
    constructor(args) {
        if (args === process.argv) {
            this.args = process.argv.slice(2);
        } else {
            this.args = args.slice();
        }
        if (!this.args.length) {
            this.args.push(0);  // stdin
        }
        this[Symbol.iterator] = function () {
            return this;
        };
    }
    next() {
        if (!this.args.length) {
            return {
                'done': true,
                'value': undefined, // distinct from null
            };
        }
        const filename = this.args.shift();
        const value = JSON.parse(fs.readFileSync(filename, 'utf-8'));
        return {
            'done': false,
            'value': value,
        };
    }
}

module.exports = MagicFilehandle;
