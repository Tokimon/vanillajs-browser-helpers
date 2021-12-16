interface Overrides {
  top?: number,
  left?: number,
  right?: number,
  bottom?: number,
}

export function mockClientRect(overrides?: Overrides): () => void {
  const spy = jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue(Object.assign({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => undefined
    }, overrides));

  return () => spy.mockRestore();
}
