import { expect, helpers, describe, it } from './assets/init-test';

import isWindow from '../isWindow';



describe('"isWindow" >', () => {
  it('Should return true for window elements', () => {
    expect(isWindow(window)).to.equal(true);

    const iframe = helpers.create('iframe');
    iframe.src = 'about:blank';
    document.body.appendChild(iframe);

    expect(isWindow(iframe)).to.equal(false);
    expect(isWindow(iframe.contentWindow)).to.equal(true);

    document.body.removeChild(iframe);
  });

  it('Should return false for non window values', () => {
    expect(isWindow(null)).to.equal(false);
    expect(isWindow({})).to.equal(false);
    expect(isWindow(document)).to.equal(false);
    expect(isWindow(document.body)).to.equal(false);
    expect(isWindow(document.documentElement)).to.equal(false);
    expect(isWindow()).to.equal(false);
  });
});
