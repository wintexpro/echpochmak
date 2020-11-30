"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertError = void 0;
const chai_1 = require("chai");
exports.assertError = async (asyncFn, code, message) => {
    try {
        await asyncFn();
    }
    catch (error) {
        if (error.code == code) {
            return;
        }
        else {
            throw new chai_1.AssertionError(createAssertionMessage('The error code does not match what was expected', message));
        }
    }
    throw new chai_1.AssertionError(createAssertionMessage('An error was expected', message));
};
const createAssertionMessage = (passedMessage, defaultMessage) => {
    let assertionMessage = passedMessage;
    if (defaultMessage) {
        assertionMessage = `${passedMessage} : ${defaultMessage}`;
    }
    return assertionMessage;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXJ0RXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvQXNzZXJ0cy9Bc3NlcnRFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBc0M7QUFFekIsUUFBQSxXQUFXLEdBQUcsS0FBSyxFQUFFLE9BQVksRUFBRSxJQUFZLEVBQUUsT0FBUSxFQUFFLEVBQUU7SUFDeEUsSUFBSTtRQUNGLE1BQU0sT0FBTyxFQUFFLENBQUM7S0FDakI7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDdEIsT0FBTztTQUNSO2FBQU07WUFDTCxNQUFNLElBQUkscUJBQWMsQ0FDdEIsc0JBQXNCLENBQ3BCLGlEQUFpRCxFQUNqRCxPQUFPLENBQ1IsQ0FDRixDQUFDO1NBQ0g7S0FDRjtJQUNELE1BQU0sSUFBSSxxQkFBYyxDQUN0QixzQkFBc0IsQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLENBQUMsQ0FDekQsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLEVBQUU7SUFDL0QsSUFBSSxnQkFBZ0IsR0FBRyxhQUFhLENBQUM7SUFDckMsSUFBSSxjQUFjLEVBQUU7UUFDbEIsZ0JBQWdCLEdBQUcsR0FBRyxhQUFhLE1BQU0sY0FBYyxFQUFFLENBQUM7S0FDM0Q7SUFDRCxPQUFPLGdCQUFnQixDQUFDO0FBQzFCLENBQUMsQ0FBQyJ9