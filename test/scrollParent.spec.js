import { expect, helpers, describe, it } from './assets/init-test';

import scrollParent from '../scrollParent';



describe('', () => {
  const { html, remove, id, one } = helpers;
  const { body } = document;

  it.each(
    [document, document.documentElement, document.body, null, {}, undefined],
    'Returns null for %s',
    ['element'],
    (elm) => {
      expect(scrollParent(elm)).to.equal(null);
    }
  );

  it.each(
    [
      '<div class="root" id="child" />',
      '<div class="root" id="child" style="position: fixed"></div>',
      `
        <div class="root">
          <div style="position: relative">
            <div id="child" />
          </div>
        </div>
      `,
      `
        <div class="root">
          <div style="position: static; overflow: auto">
            <div id="child" style="position: absolute" />
          </div>
        </div>
      `,
      `
        <div class="root" style="overflow: auto">
          <div id="child" style="position: fixed" />
        </div>
      `
    ],
    '%s: Returns document.body',
    ['x'],
    (HTML) => {
      html(HTML);

      expect(scrollParent(id('child'))).to.equal(body);

      remove(one('.root'));
    }
  );

  it.each(
    [
      `
        <div class="root" id="scroller">
          <div id="child" />
        </div>
      `,
      `
        <div class="root" id="scroller">
          <div style="position: relative">
            <div id="child" />
          <div>
        </div>
      `,
      `
        <div class="root" id="scroller" style="position: relative">
          <div style="position: static; overflow: auto">
            <div id="child" style="position: absolute" />
          <div>
        </div>
      `,
      `
        <div class="root" id="scroller" style="position: relative">
          <div style="position: static; overflow: auto">
            <div style="position: relative">
              <div id="child" style="position: absolute" />
            </div>
          <div>
        </div>
      `,
      `
        <div class="root">
          <div style="position: static; overflow: auto">
            <div id="scroller" style="position: relative">
              <div id="child" style="position: absolute" />
            </div>
          <div>
        </div>
      // `
    ],
    '%s: Finds correct scroll parent',
    ['x'],
    (HTML) => {
      html(HTML);
      const scroller = id('scroller');
      const child = id('child');
      const root = one('.root');

      const css = scroller.style.cssText;

      ['', '-x', '-y']
        .reduce((all, suffix) => {
          all.push(`overflow${suffix}: auto`);
          all.push(`overflow${suffix}: scroll`);
          return all;
        }, [])
        .forEach((style) => {
          scroller.style.cssText = css + ';' + style;
          expect(scrollParent(child)).to.equal(scroller);
        });

      remove(root);
    }
  );
});
