#!/usr/bin/env node
import yargs from 'yargs';
import { Test } from './Commands/test';

yargs.usage('Usage: $0 <cmd> [args]').command(new Test()).help().argv;
