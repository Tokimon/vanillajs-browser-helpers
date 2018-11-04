/* eslint-disable no-unused-expressions */

import { expect, describe, it, spy } from './assets/init-test';

import domReady from '../domReady';



const domreadyCb = spy();
let domLoaded = false;


function afterDomLoad(cb) {
  return domLoaded ? cb() : setTimeout(() => afterDomLoad(cb), 100);
}

document.addEventListener('DOMContentLoaded', (e) => {
  domLoaded = true;
}, true);



// We have to build the dom ready handlers here as we otherwise will be to late
// to test the dom ready event
domReady(domreadyCb);



describe('"domReady"', () => {
  it('Should not fail if no handler is given', () => {
    expect(domReady()).to.not.fail;
  });

  afterDomLoad(() => {
    it('Should trigger the handler on the document ready event', (done) => {
      expect(domreadyCb).to.have.callCount(1);
      done();
    });

    it('Should trigger the handler if the method is bound after the DOM has finished loading', (done) => {
      const cb = spy();
      domReady(cb);
      expect(cb).to.have.callCount(1);
      done();
    });
  });
});
