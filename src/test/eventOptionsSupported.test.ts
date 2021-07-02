import eventOptionsSupported from '../eventOptionsSupported';



describe('"eventOptionsSupported"', () => {
  it('Memoizes the result', () => {
    const spy = jest.spyOn(document, 'addEventListener');

    eventOptionsSupported(true);
    eventOptionsSupported();

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('Calling with recheck = true, bypasses the memoization', () => {
    const spy = jest.fn();
    const stub = jest.spyOn(document, 'addEventListener').mockImplementation(spy);

    eventOptionsSupported(true);
    eventOptionsSupported(true);

    expect(spy).toHaveBeenCalledTimes(2);

    stub.mockRestore();
  });

  it('Returns `false` when options are ignored when calling `addEventListener`', () => {
    const stub = jest.spyOn(document, 'addEventListener').mockImplementation(() => undefined);

    expect(eventOptionsSupported(true)).toBe(false);

    stub.mockRestore();
  });

  it('Returns `false` when calling `addEventListener` with options, throws an error', () => {
    const stub = jest
      .spyOn(document, 'addEventListener')
      .mockImplementation(() => { throw new Error('ups'); });

    expect(eventOptionsSupported(true)).toBe(false);

    stub.mockRestore();
  });

  it('Returns `true` when options are supported', () => {
    const cb = (
      evt: string,
      handler: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) => {
      const { passive } = options as AddEventListenerOptions;
    };

    const stub = jest.spyOn(window, 'addEventListener').mockImplementation(cb);

    expect(eventOptionsSupported(true)).toBe(true);

    stub.mockRestore();
  });
});
