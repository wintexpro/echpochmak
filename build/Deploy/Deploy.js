"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giveGrams = exports.deploy = void 0;
const GiverConst_1 = require("../Contract/GiverConst");
exports.deploy = async (client, contractPackage, keys, constructorParams, giveGram = true) => {
    const deployMessage = await client.contracts.createDeployMessage({
        package: contractPackage,
        constructorParams: constructorParams,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0RlcGxveS9EZXBsb3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQWdFO0FBQ25ELFFBQUEsTUFBTSxHQUFHLEtBQUssRUFDekIsTUFBTSxFQUNOLGVBQW9CLEVBQ3BCLElBQUksRUFDSixpQkFBc0IsRUFDdEIsUUFBUSxHQUFHLElBQUksRUFDZixFQUFFO0lBQ0YsTUFBTSxhQUFhLEdBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDO1FBQy9ELE9BQU8sRUFBRSxlQUFlO1FBQ3hCLGlCQUFpQixFQUFFLGlCQUFpQjtRQUNwQyxPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUMsQ0FBQztJQUNILElBQUksUUFBUTtRQUFFLE1BQU0saUJBQVMsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdELE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FDL0QsYUFBYSxDQUFDLE9BQU8sQ0FDdEIsQ0FBQztJQUNGLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FDN0MsYUFBYSxFQUNiLHNCQUFzQixDQUN2QixDQUFDO0lBQ0YsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUVXLFFBQUEsU0FBUyxHQUFHLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU8sRUFBRSxFQUFFO0lBQzFELDZEQUE2RDtJQUM3RCwyQ0FBMkM7SUFDM0MsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUM7SUFDdEMsTUFBTSxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQ2xCLE9BQU8sRUFBRSx5QkFBWTtRQUNyQixZQUFZLEVBQUUsV0FBVztRQUN6QixHQUFHLEVBQUUscUJBQVE7UUFDYixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsT0FBTztZQUNiLE1BQU0sRUFBRSxNQUFNLElBQUksZ0JBQWdCO1NBQ25DO1FBQ0QsT0FBTyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==