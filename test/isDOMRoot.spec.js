import { expect, helpers, describe, it } from './assets/init-test';

import isDOMRoot from '../isDOMRoot';



describe('"isDOMRoot"', () => {
  it('Should only return true for the `documentElement`', () => {
    const iframe = helpers.create('iframe');
    iframe.src = 'about:blank';
    document.body.appendChild(iframe);

    expect(isDOMRoot(document.documentElement)).to.equal(true);
    expect(isDOMRoot(iframe.contentWindow.document.documentElement)).to.equal(true);
    expect(isDOMRoot(document.implementation.createHTMLDocument('').documentElement)).to.equal(true);

    document.body.removeChild(iframe);
  });

  it('Should return false for DOM elements that are not `documentElement`', () => {
    expect(isDOMRoot(document.body)).to.equal(false);
    expect(isDOMRoot(document)).to.equal(false);
    expect(isDOMRoot(window)).to.equal(false);
    expect(isDOMRoot(helpers.create('html'))).to.equal(false);
  });

  it('Should return false for non DOM elements', () => {
    expect(isDOMRoot()).to.equal(false);
    expect(isDOMRoot(null)).to.equal(false);
    expect(isDOMRoot({})).to.equal(false);
    expect(isDOMRoot({ parentNode: { nodeType: 9 } })).to.equal(false);
  });
});
