//address of giver on NodeSE
export const giverAddress =
  '0:841288ed3b55d9cdafa806807f02a0ae0c169aa5edfe88a789a6482429756a94';
//giver ABI on NodeSE
export const giverAbi = {
  'ABI version': 1,
  functions: [
    {
      name: 'constructor',
      inputs: [],
      outputs: [],
    },
    {
      name: 'sendGrams',
      inputs: [
        { name: 'dest', type: 'address' },
        { name: 'amount', type: 'uint64' },
      ],
      outputs: [],
    },
  ],
  events: [],
  data: [],
};
