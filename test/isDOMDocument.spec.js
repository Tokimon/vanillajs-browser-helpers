import { expect, helpers, describe, it } from './assets/init-test';

import isDOMDocument from '../isDOMDocument';



describe('"isDOMDocument"', () => {
  it('Should only return true for Document node elements', () => {
    expect(isDOMDocument(document)).to.equal(true);

    const iframe = helpers.create('iframe');
    iframe.src = 'about:blank';
    document.body.appendChild(iframe);

    expect(isDOMDocument(iframe.contentDocument)).to.equal(true);

    document.body.removeChild(iframe);
  });

  it('Should return false for non Document node elements', () => {
    expect(isDOMDocument(window)).to.equal(false);
    expect(isDOMDocument(document.documentElement)).to.equal(false);
    expect(isDOMDocument(document.body)).to.equal(false);
    expect(isDOMDocument(null)).to.equal(false);
    expect(isDOMDocument({})).to.equal(false);
    expect(isDOMDocument({ nodeType: 9 })).to.equal(false);
    expect(isDOMDocument()).to.equal(false);
  });
});
