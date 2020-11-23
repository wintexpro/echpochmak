import { assertError } from '../../src/Asserts/AssertError';
import { errFunction } from './mocks/assertMock';
import { describe, expect, test } from '@jest/globals';

describe('Asserts', () => {
  test('assertError', async (done) => {
    await expect(
      assertError(
        async () => {
          await errFunction(100, true);
        },
        100,
        'Unit test - assertError'
      )
    ).resolves.not.toThrow();
    done();
  });

  test('assertError : error was expected', async (done) => {
    await expect(
      assertError(
        async () => {
          await errFunction(100, false);
        },
        100,
        'Unit test - assertError : error was expected'
      )
    ).rejects.toThrow();
    done();
  });

  test('assertError : code does not match', async (done) => {
    await expect(
      assertError(
        async () => {
          await errFunction(100, true);
        },
        101,
        'Unit test - assertError : code does not match'
      )
    ).rejects.toThrow();
    done();
  });
});
