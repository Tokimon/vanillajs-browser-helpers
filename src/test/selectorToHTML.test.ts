import selectorToHTML from '../selectorToHTML';



describe('"selectorToHTML" >', () => {
  it('Correctly converts non-void tag selector', () => {
    const html = selectorToHTML('span[disabled][data-index=99].my-item#unique');
    expect(html).toBe('<span disabled data-index="99" class="my-item" id="unique"></span>');
  });

  it('Correctly converts void tag selector', () => {
    const html = selectorToHTML('input[disabled][data-index=99].my-item#unique');
    expect(html).toBe('<input disabled data-index="99" class="my-item" id="unique" />');
  });
});
