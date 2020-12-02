/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-this-alias */
'use strict';
/**
 * @module Spec
 */
/**
 * Module dependencies.
 */

const Mocha = require('mocha');
var Base = Mocha.reporters.Base;
var figlet = require('figlet');
const gradient = require('gradient-string');
const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END,
  EVENT_TEST_PENDING,
} = Mocha.Runner.constants;
var inherits = Mocha.utils.inherits;
var color = Base.color;

/**
 * Expose `Spec`.
 */

exports = module.exports = Spec;

/**
 * Constructs a new `Spec` reporter instance.
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner - Instance triggers reporter actions.
 * @param {Object} [options] - runner options
 */
function Spec(runner, options) {
  Base.call(this, runner, options);

  var self = this;
  var indents = 0;
  var n = 0;

  function indent() {
    return Array(indents).join('  ');
  }

  runner.on(EVENT_RUN_BEGIN, function () {
    figlet('ECHPOCHMAK', { font: '3-D' }, function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(gradient('violet', 'cyan')(data));
    });
    Base.consoleLog();
  });

  runner.on(EVENT_SUITE_BEGIN, function (suite) {
    ++indents;
    Base.consoleLog(color('suite', '%s%s'), indent(), suite.title);
  });

  runner.on(EVENT_SUITE_END, function () {
    --indents;
    if (indents === 1) {
      Base.consoleLog();
    }
  });

  runner.on(EVENT_TEST_PENDING, function (test) {
    var fmt = indent() + color('pending', '  - %s');
    Base.consoleLog(fmt, test.title);
  });

  runner.on(EVENT_TEST_PASS, function (test) {
    var fmt;
    if (test.speed === 'fast') {
      fmt =
        indent() +
        color('checkmark', '  ' + Base.symbols.ok) +
        color('pass', ' %s');
      Base.consoleLog(fmt, test.title);
    } else {
      fmt =
        indent() +
        color('checkmark', '  ' + Base.symbols.ok) +
        color('pass', ' %s') +
        color(test.speed, ' (%dms)');
      Base.consoleLog(fmt, test.title, test.duration);
    }
  });

  runner.on(EVENT_TEST_FAIL, function (test) {
    if (this.test)
      if (this.test.err)
        if (this.test.err.message) {
          this.test.err.message +=
            test.err.data.description == undefined
              ? ``
              : `\n Description: ${test.err.data.description}`;
        }

    Base.consoleLog(indent() + color('fail', '  %d) %s'), ++n, test.title);
  });

  runner.once(EVENT_RUN_END, self.epilogue.bind(self));
}

/**
 * Inherit from `Base.prototype`.
 */
inherits(Spec, Base);

Spec.description = 'hierarchical & verbose [default]';
