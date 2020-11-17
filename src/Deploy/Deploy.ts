import { giverAbi, giverAddress } from '../Contract/GiverConst';
export const Deploy = async (
  client,
  contractPackage: any,
  keys,
  constructorParams: any
) => {
  const deployMessage = await client.contracts.createDeployMessage({
    package: contractPackage,
    constructorParams: constructorParams,
    keyPair: keys,
  });
  await GiveGrams(client, deployMessage.address);
  const messageProcessingState = await client.contracts.sendMessage(
    deployMessage.message
  );
  await client.contracts.waitForDeployTransaction(
    deployMessage,
    messageProcessingState
  );
  return deployMessage.address;
};

export const GiveGrams = async (client, address, amount?) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore currently unused local ignore
  const { contracts, queries } = client;
  await contracts.run({
    address: giverAddress,
    functionName: 'sendGrams',
    abi: giverAbi,
    input: {
      dest: address,
      amount: amount || 1000000000000000,
    },
    keyPair: null,
  });
};
