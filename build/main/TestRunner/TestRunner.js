"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMocha = exports.tondevRestart = exports.SetTestGlobal = exports.TestRun = void 0;
/* eslint-disable no-var */
const chai_1 = require("chai");
const ton_client_node_js_1 = require("ton-client-node-js");
const mocha_1 = __importDefault(require("mocha"));
const Manager_1 = require("../Manager/Manager");
const shelljs_1 = require("shelljs");
const path_1 = require("path");
const AssertError_1 = require("../Asserts/AssertError");
exports.TestRun = async (config) => {
    exports.SetTestGlobal(config);
    const mocha = exports.CreateMocha(config);
    config.testingFiles.forEach((file) => {
        mocha.addFile(file);
    });
    try {
        mocha.run(function (failures) {
            process.exit(failures ? 1 : 0);
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.SetTestGlobal = (config) => {
    globalThis.expect = chai_1.expect;
    globalThis.verbose = config.verbose;
    globalThis.assert = chai_1.assert;
    globalThis.Manager = Manager_1.Manager;
    globalThis.assertError = AssertError_1.assertError;
    globalThis.restart = exports.tondevRestart;
};
exports.tondevRestart = async (port = 80) => {
    await execAsync('tondev recreate && tondev start');
    await new Promise(async function (resolve) {
        while (true) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const serv = [`http://localhost:${port}/graphql`];
            try {
                const client = await ton_client_node_js_1.TONClient.create({
                    servers: serv,
                    log_verbose: globalThis.verbose,
                    err_log_verbose: globalThis.verbose,
                });
                await client.queries.serverInfo.version;
                break;
            }
            catch (error) {
                console.log(error);
            }
        }
        resolve();
    });
};
function execAsync(cmd, opts = {}) {
    return new Promise(function (resolve, reject) {
        // Execute the command, reject if we exit non-zero (i.e. error)
        shelljs_1.exec(cmd, opts, function (code, stdout, stderr) {
            if (code != 0)
                return reject(new Error(stderr));
            return resolve(stdout);
        });
    });
}
exports.CreateMocha = (config) => {
    const mochaConfig = config.mocha || {};
    // Propagate --bail option to mocha
    mochaConfig.bail = config.bail;
    // If the command line overrides color usage, use that.
    if (config.colors != null) {
        mochaConfig.color = config.colors;
    }
    mochaConfig.reporter = path_1.join(__dirname, '../Reporter/EchpochmakReporter.js');
    // Default to true if configuration isn't set anywhere.
    if (mochaConfig.color == null) {
        mochaConfig.color = true;
    }
    mochaConfig.timeout = config.timeout;
    const mocha = new mocha_1.default(mochaConfig);
    return mocha;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdFJ1bm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UZXN0UnVubmVyL1Rlc3RSdW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkJBQTJCO0FBQzNCLCtCQUFzQztBQUN0QywyREFBK0M7QUFDL0Msa0RBQTBCO0FBQzFCLGdEQUE2QztBQUU3QyxxQ0FBK0I7QUFDL0IsK0JBQTRCO0FBQzVCLHdEQUFxRDtBQUN4QyxRQUFBLE9BQU8sR0FBRyxLQUFLLEVBQUUsTUFBa0IsRUFBRSxFQUFFO0lBQ2xELHFCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsTUFBTSxLQUFLLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25DLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFJO1FBQ0YsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLFFBQVE7WUFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtBQUNILENBQUMsQ0FBQztBQUVXLFFBQUEsYUFBYSxHQUFHLENBQUMsTUFBa0IsRUFBRSxFQUFFO0lBQ2xELFVBQVUsQ0FBQyxNQUFNLEdBQUcsYUFBTSxDQUFDO0lBQzNCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNwQyxVQUFVLENBQUMsTUFBTSxHQUFHLGFBQU0sQ0FBQztJQUMzQixVQUFVLENBQUMsT0FBTyxHQUFHLGlC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