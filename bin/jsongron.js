#!/usr/bin/env node
'use strict';

const MagicFilehandle = require('../lib/magic');
const Gron = require('../lib/gron');

const fh = new MagicFilehandle(process.argv);

for (const doc of fh) {
    const gron = new Gron(doc);
    gron.gron();
}
