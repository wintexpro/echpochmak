"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giveGrams = exports.deploy = void 0;
const GiverConst_1 = require("../Contract/GiverConst");
exports.deploy = async (client, contractPackage, keys, constructorParams, constructorHeader, giveGram = true) => {
    const deployMessage = await client.contracts.createDeployMessage({
        package: contractPackage,
        constructorParams: constructorParams,
        constructorHeader: constructorHeader,
        keyPair: keys,
    });
    if (giveGram)
        await exports.giveGrams(client, deployMessage.address);
    const messageProcessingState = await client.contracts.sendMessage(deployMessage.message);
    await client.contracts.waitForDeployTransaction(deployMessage, messageProcessingState);
    return deployMessage.address;
};
exports.giveGrams = async (client, address, amount) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore currently unused local ignore
    const { contracts, queries } = client;
    await contracts.run({
        address: GiverConst_1.giverAddress,
        functionName: 'sendGrams',
        abi: GiverConst_1.giverAbi,
        input: {
            dest: address,
            amount: amount || 1000000000000000,
        },
        keyPair: null,
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RlcGxveS9EZXBsb3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQWdFO0FBQ25ELFFBQUEsTUFBTSxHQUFHLEtBQUssRUFDekIsTUFBTSxFQUNOLGVBQW9CLEVBQ3BCLElBQUksRUFDSixpQkFBc0IsRUFDdEIsaUJBQXNCLEVBQ3RCLFFBQVEsR0FBRyxJQUFJLEVBQ2YsRUFBRTtJQUNGLE1BQU0sYUFBYSxHQUFHLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQztRQUMvRCxPQUFPLEVBQUUsZUFBZTtRQUN4QixpQkFBaUIsRUFBRSxpQkFBaUI7UUFDcEMsaUJBQWlCLEVBQUUsaUJBQWlCO1FBQ3BDLE9BQU8sRUFBRSxJQUFJO0tBQ2QsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxRQUFRO1FBQUUsTUFBTSxpQkFBUyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0QsTUFBTSxzQkFBc0IsR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUMvRCxhQUFhLENBQUMsT0FBTyxDQUN0QixDQUFDO0lBQ0YsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUM3QyxhQUFhLEVBQ2Isc0JBQXNCLENBQ3ZCLENBQUM7SUFDRixPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBRVcsUUFBQSxTQUFTLEdBQUcsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTyxFQUFFLEVBQUU7SUFDMUQsNkRBQTZEO0lBQzdELDJDQUEyQztJQUMzQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQztJQUN0QyxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUM7UUFDbEIsT0FBTyxFQUFFLHlCQUFZO1FBQ3JCLFlBQVksRUFBRSxXQUFXO1FBQ3pCLEdBQUcsRUFBRSxxQkFBUTtRQUNiLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxPQUFPO1lBQ2IsTUFBTSxFQUFFLE1BQU0sSUFBSSxnQkFBZ0I7U0FDbkM7UUFDRCxPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9