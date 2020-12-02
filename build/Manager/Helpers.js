"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasChangedValue = exports.Helpers = void 0;
class Helpers {
    static async deployCheck(address, client) {
        while (true) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const _contract = await client.queries.accounts.query({
                id: { eq: address },
            }, 'id');
            if (_contract.length > 0)
                break;
        }
    }
    static async getAccountBalance(address, client) {
        const balance = await client.queries.accounts.query({
            id: { eq: address },
        }, 'id');
        return parseInt(balance[0].balance, 16);
    }
    static async hasOnBounced(address, timestamp, client) {
        while (true) {
            const messages = await client.queries.messages.query({
                dst: { eq: address },
                created_at: { gt: timestamp },
                bounced: { eq: true },
            }, 'dst created_at, bounced');
            if (messages.length > 1) {
                return;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
    static async lastTransaction(address, client, fields = 'account_addr, aborted') {
        const transaction = await client.queries.transactions.query({
            account_addr: { eq: address },
        }, fields);
        return transaction.length != 0 ? transaction[0] : null;
    }
    static async lastMessage(address, client, fields = 'src, dst, bounce, bounced, value') {
        const messages = await client.queries.messages.query({
            src: { eq: address },
        }, fields);
        return messages.length != 0 ? messages[0] : null;
    }
    static async balanceHasChanged(address, client, oldValue, type) {
        while (true) {
            const currentBalance = await Helpers.getAccountBalance(address, client);
            if (currentBalance != oldValue) {
                if (type == hasChangedValue.big) {
                    if (currentBalance > oldValue)
                        break;
                    else
                        throw new Error('The value has decreased');
                }
            }
            else if (type == hasChangedValue.small) {
                if (currentBalance < oldValue)
                    break;
                else
                    throw new Error('The value has grown');
            }
        }
    }
    static async getRunFees(contract, functionName, input, client, keyPair) {
        const calcFees = await client.contracts.calcRunFees({
            address: contract.address,
            functionName,
            abi: contract.contractPackage.abi,
            input,
            keyPair,
        });
        return calcFees;
    }
    static async getDeployFees(contract, constructorParams, newAccount, client, keyPair) {
        const deployFees = await client.contracts.calcDeployFees({
            package: contract.contractPackage,
            constructorParams,
            keyPair,
            newAccount,
        });
        return deployFees;
    }
}
exports.Helpers = Helpers;
var hasChangedValue;
(function (hasChangedValue) {
    hasChangedValue[hasChangedValue["big"] = 0] = "big";
    hasChangedValue[hasChangedValue["small"] = 1] = "small";
})(hasChangedValue = exports.hasChangedValue || (exports.hasChangedValue = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9NYW5hZ2VyL0hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBYSxPQUFPO0lBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU07UUFDN0MsT0FBTyxJQUFJLEVBQUU7WUFDWCxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTSxTQUFTLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQ25EO2dCQUNFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUU7YUFDcEIsRUFDRCxJQUFJLENBQ0wsQ0FBQztZQUNGLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUFFLE1BQU07U0FDakM7SUFDSCxDQUFDO0lBQ00sTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsTUFBTTtRQUNuRCxNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FDakQ7WUFDRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFO1NBQ3BCLEVBQ0QsSUFBSSxDQUNMLENBQUM7UUFDRixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsU0FBaUIsRUFBRSxNQUFNO1FBQ2pFLE9BQU8sSUFBSSxFQUFFO1lBQ1gsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENB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