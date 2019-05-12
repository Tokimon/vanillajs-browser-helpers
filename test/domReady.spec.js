/* eslint-disable no-unused-expressions */

import { expect, describe, it, sinon, helpers } from './assets/init-test';

import domReady, { docComplete } from '../domReady';



function afterDomLoad() {
  return new Promise((resolve) => {
    if (docComplete()) {
      resolve();
    } else {
      helpers.on(document, 'readystatechange', () => {
        if (docComplete()) {
          resolve();
          helpers.off(document, 'readystatechange');
        }
      });
    }
  });
}



describe('"domReady" >', () => {
  it('Should not fail if no handler is given', () => {
    expect(domReady()).to.equal(undefined);
    expect(domReady(null)).to.equal(undefined);
    expect(domReady('handler')).to.equal(undefined);
  });

  it('Should trigger the handler on the document ready event', async () => {
    await afterDomLoad();

    const domreadyCb = sinon.spy();
    const fakeReadyState = sinon.stub(document, 'readyState').get(() => 'loading');

    domReady(domreadyCb);
    fakeReadyState.restore();
    helpers.trigger('readystatechange');

    expect(domreadyCb).to.have.callCount(1);
  });

  it('Should trigger the handler if the method is bound after the DOM has finished loading', async () => {
    await afterDomLoad();
    const cb = sinon.spy();
    domReady(cb);
    expect(cb).to.have.callCount(1);
  });
});
