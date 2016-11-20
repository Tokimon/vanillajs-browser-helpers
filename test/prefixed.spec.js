/* eslint-env node, mocha, browser */
/* global expect, $ */
import prefixed from '../prefixed';

function expectArrayInput(arr, input) {
  expect(arr).to.be.a('array');
  expect(arr[0]).to.equal(`webkit${input}`);
  expect(arr[1]).to.equal(`moz${input}`);
  expect(arr[2]).to.equal(`ms${input}`);
  expect(arr[3]).to.equal(`o${input}`);
}

describe('"prefixed"', () => {
  it('Should prefix a word with vendor prefixes', () => {
    expectArrayInput(prefixed('prefixed'), 'Prefixed');
  });

  it('Should prefix a phrase with vendor prefixes and convert it into PascalCased word', () => {
    expectArrayInput(prefixed('prefix this phrase'), 'PrefixThisPhrase');
  });

  it('Should always return array with prefixes', () => {
    expectArrayInput(prefixed(9), '9');
    expectArrayInput(prefixed(null), 'Null');
    expectArrayInput(prefixed(), '');
  });
});
