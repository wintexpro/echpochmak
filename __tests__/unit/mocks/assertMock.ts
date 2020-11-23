export const errFunction = async (code: number, throwError: boolean) => {
  if (throwError) {
    throw new assertErrorMock(code);
  }
  return;
};

class assertErrorMock extends Error {
  public code: number;
  constructor(code: number) {
    super();
    this.code = code;
  }
}
