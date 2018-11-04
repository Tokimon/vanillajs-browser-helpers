import { expect, helpers, describe, it } from './assets/init-test';

import inDOM from '../inDOM';



describe('"inDOM"', () => {
  it('Should return true for DOM elements actually in the DOM tree', () => {
    const hidden = helpers.create('p');
    hidden.style.cssText = 'width: 0; height: 0; position: absolute; margin: 0; padding: 0; opacity: 0; oveflow: hidden;';

    document.body.appendChild(hidden);

    // True statements
    expect(inDOM(document.documentElement)).to.equal(true);
    expect(inDOM(document.body)).to.equal(true);
    expect(inDOM(hidden)).to.equal(true);

    // False statements
    expect(inDOM(document)).to.equal(false);
    expect(inDOM(helpers.create('p'))).to.equal(false);
    expect(inDOM(document.implementation.createHTMLDocument('').documentElement)).to.equal(false);
  });

  it('Should return false for non DOM elements', () => {
    expect(inDOM(null)).to.equal(false);
    expect(inDOM({})).to.equal(false);
    expect(inDOM()).to.equal(false);
  });
});
