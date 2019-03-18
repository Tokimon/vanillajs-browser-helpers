import { expect, helpers, describe, it } from './assets/init-test';

import inDOM from '../inDOM';



describe('"inDOM"', () => {
  it('Should return true for DOM elements found in the DOM tree', () => {
    const p = helpers.create('p');
    p.style.cssText = `
      width: 0;
      height: 0;
      position: absolute;
      margin: 0;
      padding: 0;
      opacity: 0;
      overflow: hidden;
    `;

    document.body.appendChild(p);

    expect(inDOM(document.documentElement), 'html failed').to.equal(true);
    expect(inDOM(document.body), 'body failed').to.equal(true);
    expect(inDOM(p), 'P failed').to.equal(true);

    document.body.removeChild(p);
  });

  it('Should return false for DOM elements not in the DOM tree', () => {
    expect(inDOM(document), 'document failed').to.equal(false);
    expect(inDOM(helpers.create('p')), 'P failed').to.equal(false);
    expect(inDOM(document.implementation.createHTMLDocument('').documentElement), 'HTML failed').to.equal(false);
  });

  it('Should return false for non DOM elements', () => {
    expect(inDOM(null)).to.equal(false);
    expect(inDOM({})).to.equal(false);
    expect(inDOM()).to.equal(false);
  });
});
