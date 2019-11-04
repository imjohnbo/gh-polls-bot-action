#!/usr/bin/env node

'use strict';

const meow = require('meow');
const awaitUrl = require('.');

const cli = meow(`
    Usage
      $ await-url <url>

    Option
      --tries     Maximum number of polling attempts
      --interval  Milliseconds to wait between tries

    Example
      $ await-url example.com/status
      $ await-url example.com --tries=3 --interval=1000
`);

awaitUrl(cli.input[0], cli.flags).catch((err) => {
    console.error(err);
    process.exit(1);
});
