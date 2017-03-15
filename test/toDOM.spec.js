/* eslint-env node, mocha, browser */
/* eslint-disable no-unused-expressions */
/* global expect, $ */

import toDOM from '../toDOM';

describe('"toDOM"', () => {
  it('Should generate DOM elements from a HTML string', () => {
    const dom = toDOM(`
      <p class="item">Text content</p>
      <div id='Item'><b></b><b></b><b></b></div>
      <p class="item">Text content 2</p>
    `);

    expect(dom).to.be.a('array').and.to.have.length(3);

    const Item = dom[1];
    const items = dom.filter((elm) => elm.className === 'item');

    expect(Item).to.exist.and.to.have.id('Item');
    expect(Item).to.contain('b');
    expect(Item.childNodes).to.have.length(3);
    expect(items).to.have.length(2);
    expect(items[0]).to.have.attribute('class', 'item');
    expect(items[0].textContent).to.equal('Text content');
  });

  it('Should return non String inputs as they were', () => {
    expect(toDOM()).to.be.undefined;
    expect(toDOM(null)).to.be.null;
    expect(toDOM($.create('p')).tagName).to.equal('P');
  });
});
