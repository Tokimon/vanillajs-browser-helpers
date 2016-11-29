/* eslint-env node, mocha, browser */
/* global expect */

import viewport from '../viewport';

describe('"viewport"', () => {
  it('Should return NULL if no document was found', () => {
    expect(viewport({})).to.be.null;
  });

  it('Should return either the Body or HTML element', () => {
    const { body, documentElement: html } = document;
    const bodyOrHtml = (elm) => elm === body || elm === html;
    const fakeDocCompat = { nodeType: 9, compatMode: 'BackCompat', body };
    const fakeDoc = { nodeType: 9, documentElement: html };

    expect(viewport(document.createElement('div'))).to.satisfy(bodyOrHtml);
    expect(viewport(document.createComment('Comment'))).to.satisfy(bodyOrHtml);
    expect(viewport(document.body)).to.satisfy(bodyOrHtml);
    expect(viewport(document.documentElement)).to.satisfy(bodyOrHtml);
    expect(viewport(window)).to.satisfy(bodyOrHtml);
    expect(viewport(document)).to.satisfy(bodyOrHtml);
    expect(viewport(null)).to.satisfy(bodyOrHtml);
    expect(viewport()).to.satisfy(bodyOrHtml);
    expect(viewport(fakeDoc)).to.satisfy(bodyOrHtml);
    expect(viewport(fakeDocCompat)).to.satisfy(bodyOrHtml);
  });
});
