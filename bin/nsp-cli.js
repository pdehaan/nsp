#!/usr/bin/env node

var version = process.versions.node.split('.');
if (version[0] === 0 && version[1] < 10) {
    console.error('Error: Cannot run in Node.js version < 0.10');
    process.exit(1);
}

var optimist = require('optimist');
var args = process.argv;
var arg0 = args.shift();

args.shift();

var command = args.shift();

var commands = require('../commands');

if (! command) {
    console.error('Usage: nsp <command>\n' +
        'List of available commands:\n' +
        commands.list().map(bullet).join('\n'));
    process.exit(-1);
}

if (! ~commands.list().indexOf(command)) {
    console.error('Unknown command:', command);
    process.exit(-1);
}

var args = optimist(args);
var cli = commands.module(command);
if (cli.usage) {
    cli.usage(command, args);
}

cli(args.argv);

function bullet(s) {
    return '\t' + s;
}


