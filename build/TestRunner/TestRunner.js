"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMocha = exports.restart = exports.SetTestGlobal = exports.TestRun = void 0;
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
    mocha.run(function (failures) {
        process.exit(failures ? 1 : 0);
    });
};
exports.SetTestGlobal = (config) => {
    globalThis.expect = chai_1.expect;
    globalThis.verbose = config.verbose;
    globalThis.assert = chai_1.assert;
    globalThis.Manager = Manager_1.Manager;
    globalThis.assertError = AssertError_1.assertError;
    globalThis.restart = exports.restart;
};
exports.restart = async (port = 80) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdFJ1bm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UZXN0UnVubmVyL1Rlc3RSdW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsMkJBQTJCO0FBQzNCLCtCQUFzQztBQUN0QywyREFBK0M7QUFDL0Msa0RBQTBCO0FBQzFCLGdEQUE2QztBQUU3QyxxQ0FBK0I7QUFDL0IsK0JBQTRCO0FBQzVCLHdEQUFxRDtBQUN4QyxRQUFBLE9BQU8sR0FBRyxLQUFLLEVBQUUsTUFBa0IsRUFBRSxFQUFFO0lBQ2xELHFCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsTUFBTSxLQUFLLEdBQUcsbUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ25DLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsUUFBUTtRQUMxQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVXLFFBQUEsYUFBYSxHQUFHLENBQUMsTUFBa0IsRUFBRSxFQUFFO0lBQ2xELFVBQVUsQ0FBQyxNQUFNLEdBQUcsYUFBTSxDQUFDO0lBQzNCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNwQyxVQUFVLENBQUMsTUFBTSxHQUFHLGFBQU0sQ0FBQztJQUMzQixVQUFVLENBQUMsT0FBTyxHQUFHLGlCQUFPLENBQUM7SUFDN0IsVUFBVSxDQUFDLFdBQVcsR0FBRyx5QkFBVyxDQUFDO0lBQ3JDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsZUFBTyxDQUFDO0FB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