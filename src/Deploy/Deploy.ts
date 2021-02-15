import { giverAbi, giverAddress } from '../Contract/GiverConst';
export const deploy = async (
  client,
  contractPackage: any,
  keys,
  constructorParams: any,
  constructorHeader: any,
  initParams: any,
  giveGram = true
) => {
  const deployMessage = await client.contracts.createDeployMessage({
    package: contractPackage,
    constructorParams: constructorParams,
    constructorHeader: constructorHeader,
    initParams: initParams,
    keyPair: keys,
    _randomNonce: true,
  });
  if (giveGram) await giveGrams(client, deployMessage.address);
  const messageProcessingState = await client.contracts.sendMessage(
    deployMessage.message
  );
  await client.contracts.waitForDeployTransaction(
    deployMessage,
    messageProcessingState
  );
  return deployMessage.address;
};

export const giveGrams = async (client, address, amount?) => {
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
