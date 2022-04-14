'use strict';

const isIdentifier = require('./identifier');

class Gron {
    constructor(value, options) {
        this.value = value;
        this.noIndices = options?.noIndices ?? false;
        this.stringify = options?.stringify ?? JSON.stringify;
        this.noValues = options?.noValues ?? false;
        this.valueColumn = 64;
    }
    gron(value, lvalue, lvalueStart) {
        value = value === undefined ? this.value : value; // undefined distinct from null
        lvalue = lvalue ?? 'json';
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            this.out(JSON.stringify(value), lvalueStart ?? lvalue);
        } else if (typeof value === 'object') {
            if (!value) {
                this.out('null', lvalueStart ?? lvalue);
            } else if (Object.prototype.toString.apply(value) === "[object Array]") {
                this.out('[]', lvalueStart ?? lvalue);
                const length = value.length;
                for (let i = 0; i < length; i += 1) {
                    const v = value[i] ?? null;
                    if (this.noIndices) {
                        this.gron(v, lvalue + '[i]', lvalue + '[++i]');
                    } else {
                        this.gron(v, lvalue + '[' + JSON.stringify(i) + ']');
                    }
                }
            } else {
                this.out('{}', lvalueStart ?? lvalue);
                for (let k in value) {
                    if (!Object.prototype.hasOwnProperty.call(value, k)) {
                        continue;
                    }
                    let p = '[' + JSON.stringify(k) + ']';
                    if (isIdentifier(k)) {
                        p = '.' + k;
                    }
                    const v = value[k] ?? null;
                    this.gron(v, lvalue + p);
                }
            }
        }
    }
    out(string, lvalue) {
        if (this.noValues) {
            console.log(`${lvalue}`);
        } else {
            console.log(`${lvalue.padEnd(this.valueColumn ?? 0)} = ${string};`);
        }
    }
}

module.exports = Gron;
