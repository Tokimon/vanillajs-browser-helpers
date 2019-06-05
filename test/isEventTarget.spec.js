import { expect, describe, it } from './assets/init-test';

import isEventTarget from '../isEventTarget';



describe('"isDOMChildNode" >', () => {
  it('Should return false for non objects', () => {
    expect(isEventTarget()).to.equal(false, 'Undefined');
    expect(isEventTarget(null)).to.equal(false, 'Null');
  });

  it('Should return false for invalid event targets', () => {
    expect(isEventTarget({})).to.equal(false, 'Plain Object');
    expect(isEventTarget([])).to.equal(false, 'Array');
    expect(isEventTarget('')).to.equal(false, 'String');
    expect(isEventTarget(12)).to.equal(false, 'Number');
    expect(isEventTarget(true)).to.equal(false, 'Boolean');
  });

  it('Should return true for valid event targets', () => {
    class Custom extends EventTarget {}

    expect(isEventTarget(document.createElement('div'))).to.equal(true, 'HTML Element');
    expect(isEventTarget(document.createTextNode('text'))).to.equal(true, 'Text Node');
    expect(isEventTarget(document.createComment('comment'))).to.equal(true, 'Comment');
    expect(isEventTarget(new XMLHttpRequest())).to.equal(true, 'XML Http Request');
    expect(isEventTarget(new Custom())).to.equal(true, 'Custom Event Target');
  });
});
