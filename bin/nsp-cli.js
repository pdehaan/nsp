#!/usr/bin/env node

var celeri = require('celeri');
require('./../commands');

celeri.parse(process.argv);
