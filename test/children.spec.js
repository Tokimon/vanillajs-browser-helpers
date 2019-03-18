import { expect, helpers, describe, it, before, after } from './assets/init-test';

import children from '../children';



const testID = 'TestNode';



describe('"children"', () => {
  before(() => helpers.html(`
    <div id="${testID}">
      <span><b></b></span>
      text
      <br>
      <span><i></i><span>
    </div>
  `));

  after(() => helpers.remove(testID));

  it('Should get all the children of a given DOM element', () => {
    const node = helpers.id(testID);
    const childs = children(node);

    expect(childs).to.be.array().ofSize(3);
  });

  it('Should return an empty Array if a non DOM element is passed in as elm argument', () => {
    expect(children()).to.equalTo([]);
    expect(children({})).to.equalTo([]);
  });

  it('Should return child elements of an element not yet in the DOM', () => {
    const div = helpers.create('div');
    div.innerHTML = `
      <span><b></b></span>
      text
      <br>
      <span><i></i><span>
    `;

    const childs = children(div);

    expect(childs).to.be.array().ofSize(3);
  });
});
