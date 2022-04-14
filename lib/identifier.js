'use strict';

const RX = {};

RX.UNICODE_ESCAPE_SEQUENCE = /(?:u(?:[0-9A-Fa-f]{4}|\{[0-9A-Fa-f]{1,6} \}))/u;
RX.IDENTIFIER_PART_CHAR    = /(?:\p{ID_Continue}|\$|\u200c|\u200d)/u;
RX.IDENTIFIER_START_CHAR   = /(?:\p{ID_Start}|\$|_)/u;
RX.IDENTIFIER_PART         = fix(/(?:<IDENTIFIER_PART_CHAR>|\\<UNICODE_ESCAPE_SEQUENCE>)/u);
RX.IDENTIFIER_START        = fix(/(?:<IDENTIFIER_START_CHAR>|\\<UNICODE_ESCAPE_SEQUENCE>)/u);
RX.IDENTIFIER_NAME         = fix(/(?:<IDENTIFIER_START><IDENTIFIER_PART>*)/u);

const reservedWords = {
    // reserved keywords as of ECMAScript 2015
    'break': true,
    'case': true,
    'catch': true,
    'class': true,
    'const': true,
    'continue': true,
    'debugger': true,
    'default': true,
    'delete': true,
    'do': true,
    'else': true,
    'export': true,
    'extends': true,
    'finally': true,
    'for': true,
    'function': true,
    'if': true,
    'import': true,
    'in': true,
    'instanceof': true,
    'new': true,
    'return': true,
    'super': true,
    'switch': true,
    'this': true,
    'throw': true,
    'try': true,
    'typeof': true,
    'var': true,
    'void': true,
    'while': true,
    'with': true,
    'yield': true,

    // future reserved keywords
    'enum': true,

    // future reserved keywords when found in strict mode code
    'implements': true,
    'interface': true,
    'let': true,
    'package': true,
    'private': true,
    'protected': true,
    'public': true,
    'static': true,
    // 'yield': true,

    // future reserved keywords when found in module code
    'await': true,

    // future reserved keywords in ECMAScript 1 through 3
    'abstract': true,
    'boolean': true,
    'byte': true,
    'char': true,
    'double': true,
    'final': true,
    'float': true,
    'goto': true,
    'int': true,
    'long': true,
    'native': true,
    'short': true,
    'synchronized': true,
    'throws': true,
    'transient': true,
    'volatile': true,

    // also
    'false': true,
    'true': true,
    'null': true,
};

function fix(rx) {
    const flags = rx.flags;
    rx = rx.source;
    rx = rx.replace(/<([A-Za-z0-9_]+)>/g, function (whole, ident) {
        return RX[ident].source;
    });
    rx = new RegExp(rx, flags);
    return rx;
}

function isIdentifier(str) {
    return !reservedWords[str] && RX.IDENTIFIER_NAME.test(str);
}

module.exports = isIdentifier;
