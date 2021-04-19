import ensureHTML from '../ensureHTML';



describe('"findUniqueNodeCollection"', () => {
  it('Returns string containing "<" directly', () => {
    expect(ensureHTML('<')).toBe('<');
  });

  it('Returns generated HTML from a selector', () => {
    expect(ensureHTML('#id.class')).toBe('<div id="id" class="class"></div>');
  });
});
