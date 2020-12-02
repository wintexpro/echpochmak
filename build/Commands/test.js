"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const config_1 = require("../config/config");
const TestRunner_1 = require("../TestRunner/TestRunner");
class Test {
    constructor() {
        this.command = 'test';
        this.describe = 'Run tests';
    }
    builder(args) {
        return args
            .option('p', {
            alias: 'path',
            type: 'string',
            array: true,
            required: true,
            describe: 'Path to test folder',
        })
            .option('b', {
            alias: 'bail',
            type: 'boolean',
            required: false,
            default: null,
            describe: 'Enable bail',
        })
            .option('v', {
            alias: 'verbose',
            type: 'boolean',
            required: false,
            default: false,
            describe: 'Wite debug info',
        })
            .option('t', {
            alias: 'timeout',
            type: 'number',
            required: false,
            default: 0,
            describe: 'Timeout time for test',
        });
    }
    async handler(args) {
        TestRunner_1.TestRun(new config_1.testConfig(args.p, args.b, args.t, null, args.v));
    }
}
exports.Test = Test;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21tYW5kcy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZDQUE4QztBQUM5Qyx5REFBbUQ7QUFDbkQsTUFBYSxJQUFJO0lBQWpCO1FBQ1MsWUFBTyxHQUFHLE1BQU0sQ0FBQztRQUNqQixhQUFRLEdBQUcsV0FBVyxDQUFDO0lBNkNoQyxDQUFDO0lBM0NRLE9BQU8sQ0FBQyxJQUFnQjtRQUM3QixPQUFPLElBQUk7YUFDUixNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ1gsS0FBSyxFQUFFLE1BQU07WUFDYixJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSxJQUFJO1lBQ1gsUUFBUSxFQUFFLElBQUk7WUFDZCxRQUFRLEVBQUUscUJBQXFCO1NBQ2hDLENBQUM7YUFDRCxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ1gsS0FBSyxFQUFFLE1BQU07WUFDYixJQUFJLEVBQUUsU0FBUztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsT0FBTyxFQUFFLElBQUk7WUFDYixRQUFRLEVBQUUsYUFBYTtTQUN4QixDQUFDO2FBQ0QsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssRUFBRSxTQUFTO1lBQ2hCLElBQUksRUFBRSxTQUFTO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixPQUFPLEVBQUUsS0FBSztZQUNkLFFBQVEsRUFBRSxpQkFBaUI7U0FDNUIsQ0FBQzthQUNELE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDWCxLQUFLLEVBQUUsU0FBUztZQUNoQixJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxLQUFLO1lBQ2YsT0FBTyxFQUFFLENBQUM7WUFDVixRQUFRLEVBQUUsdUJBQXVCO1NBQ2xDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQXFCO1FBQ3hDLG9CQUFPLENBQ0wsSUFBSSxtQkFBVSxDQUNaLElBQUksQ0FBQyxDQUFhLEVBQ2xCLElBQUksQ0FBQyxDQUFZLEVBQ2pCLElBQUksQ0FBQyxDQUFXLEVBQ2hCLElBQUksRUFDSixJQUFJLENBQUMsQ0FBWSxDQUNsQixDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUEvQ0Qsb0JBK0NDIn0=