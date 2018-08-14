/* eslint-env node, browser */
/* eslint-disable no-unused-expressions */

import 'babel-polyfill';

import { expect, testUtils, describe, it, before, after } from './assets/init-test';

import children from '../children';



const testID = 'TestNode';



describe('"children"', () => {
  before(() => testUtils.html(`<div id="${testID}">
  <span><b></b></span>
  text
  <br>
  <span><i></i><span>
</div>`));

  after(() => testUtils.remove(testID));

  it('Should get all the children of a given DOM element', () => {
    const node = testUtils.id(testID);
    const childs = children(node);

    expect(Array.isArray(childs)).to.be.true;
    expect(childs.length).to.equal(3);
  });

  it('Should return an empty Array if a non DOM element is passed in as elm argument', () => {
    let childs = children(null);

    expect(Array.isArray(childs)).to.be.true;
    expect(childs.length).to.equal(0);

    childs = children({});

    expect(Array.isArray(childs)).to.be.true;
    expect(childs.length).to.equal(0);
  });

  it('Should return child elements of an element not yet in the DOM', () => {
    const div = testUtils.create('div');
    div.innerHTML = `
    <span><b></b></span>
    text
    <br>
    <span><i></i><span>
    `;

    const childs = children(div);

    expect(Array.isArray(childs)).to.be.true;
    expect(childs.length).to.equal(3);
  });
});
