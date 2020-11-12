/* eslint-disable no-var */
import { expect, assert } from 'chai';
// import { TONClient } from 'ton-client-node-js';
import Mocha from 'mocha';
import _Manager from '../Deploy/CreateManager';
import { testConfig } from '../config/config';
import { exec } from 'shelljs';
export const TestRun = async (config: testConfig) => {
  SetTestGlobal(config);
  const mocha = CreateMocha(config);
  config.testingFiles.forEach((file) => {
    mocha.addFile(file);
  });
  mocha.run(function (failures) {
    process.exit(failures ? 1 : 0);
  });
};

export const SetTestGlobal = (config: testConfig) => {
  globalThis.expect = expect;
  globalThis.verbose = config.verbose;
  globalThis.assert = assert;
  globalThis.Manager = _Manager;
  globalThis.restart = tondevRestart;
};

export const tondevRestart = async () => {
  await execAsync('tondev recreate && tondev start');
  await new Promise(async function (resolve) {
    while (true) {
      //   const serv = [`http://localhost:${port}/graphql/graphql?query={info{version}}`, ];
      try {
        /*const client = await TONClient.create({
          servers: serv,
          log_verbose: globalThis.verbose,
        });
        const ver = await client.queries.serverInfo.version;
        console.log(ver);*/
      } catch (error) {
        console.log(error);
      }
      await new Promise((resolve) => setTimeout(resolve, 10000));
      resolve();
    }
  });
};

function execAsync(cmd, opts = {}) {
  return new Promise(function (resolve, reject) {
    // Execute the command, reject if we exit non-zero (i.e. error)
    exec(cmd, opts, function (code, stdout, stderr) {
      if (code != 0) return reject(new Error(stderr));
      return resolve(stdout);
    });
  });
}

export const CreateMocha = (config: testConfig): Mocha => {
  const mochaConfig = config.mocha || {};
  // Propagate --bail option to mocha
  mochaConfig.bail = config.bail;

  // If the command line overrides color usage, use that.
  if (config.colors != null) {
    mochaConfig.color = config.colors;
  }
  // Default to true if configuration isn't set anywhere.
  if (mochaConfig.color == null) {
    mochaConfig.color = true;
  }
  mochaConfig.timeout = config.timeout;
  const mocha = new Mocha(mochaConfig);

  return mocha;
};
