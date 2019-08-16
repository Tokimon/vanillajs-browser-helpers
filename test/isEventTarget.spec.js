import { expect, describe, it } from './assets/init-test';

import isEventTarget, { eventTargetCheck } from '../isEventTarget';



class Custom extends EventTarget {}

const tests = (eventTargetCheck) => {
  it.each(
    [undefined, null, {}, [], '', 123, true],
    'Should return "false" for %s',
    ['element'],
    (obj) => { expect(eventTargetCheck(obj)).to.equal(false); }
  );

  it.each(
    [
      document.createElement('div'),
      document.createTextNode('text'),
      document.createComment('comment'),
      new XMLHttpRequest(),
      new Custom()
    ],
    'Should return "false" for %s',
    ['element'],
    (obj) => { expect(eventTargetCheck(obj)).to.equal(true); }
  );
};

describe('"isEventTarget" >', () => {
  it('Default export is a function', () => {
    expect(typeof isEventTarget).to.equal('function');
  });

  describe('With EventTarget support', () => {
    tests(eventTargetCheck(true));
  });

  describe('With no EventTarget support', () => {
    tests(eventTargetCheck(false));
  });
});
