import { expect, assert } from 'chai';
import { Manager } from '../Deploy/CreateMananger';
import Mocha from 'mocha';
declare global {
  var expect;
  var assert;
}

export const TestRun = async () => {

}

export const SetTestGlobal = () => {
  global.expect = expect;
  global.assert = assert;
}
