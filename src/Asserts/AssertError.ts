import { AssertionError } from 'chai';

export const assertError = async (asyncFn: any, code: number, message?) => {
  try {
    await asyncFn();
  } catch (error) {
    if (error.code == code) {
      return;
    } else {
      throw new AssertionError(
        createAssertionMessage(
          'The error code does not match what was expected',
          message
        )
      );
    }
  }
  throw new AssertionError(
    createAssertionMessage('An error was expected', message)
  );
};

const createAssertionMessage = (passedMessage, defaultMessage) => {
  let assertionMessage = passedMessage;
  if (defaultMessage) {
    assertionMessage = `${passedMessage} : ${defaultMessage}`;
  }
  return assertionMessage;
};
