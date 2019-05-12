import { expect, describe, it } from './assets/init-test';

import viewport from '../viewport';



describe('"viewport" >', () => {
  const { body, documentElement: html } = document;
  const bodyOrHtml = (elm) => elm === body || elm === html;

  it('Should return NULL if no document was found', () => {
    const fakeDocCompat = { nodeType: 9, compatMode: 'BackCompat', body };
    const fakeDoc = { nodeType: 9, documentElement: html };

    expect(viewport({})).to.equal(null);
    expect(viewport(fakeDoc)).to.equal(null);
    expect(viewport(fakeDocCompat)).to.equal(null);
  });

  it('Should return either the Body or DOM element', () => {
    expect(viewport(document.createElement('div'))).to.satisfy(bodyOrHtml);
    expect(viewport(document.createComment('Comment'))).to.satisfy(bodyOrHtml);
    expect(viewport(document.body)).to.satisfy(bodyOrHtml);
    expect(viewport(document.documentElement)).to.satisfy(bodyOrHtml);
    expect(viewport(window)).to.satisfy(bodyOrHtml);
    expect(viewport(document)).to.satisfy(bodyOrHtml);
    expect(viewport(null)).to.satisfy(bodyOrHtml);
    expect(viewport()).to.satisfy(bodyOrHtml);
  });
});
