/* eslint-disable no-unused-expressions */

import { expect, helpers, describe, it, beforeEach, afterEach } from './assets/init-test';

import boxModel from '../boxModel';



const testID = 'Test_' + Date.now();
const styleID = 'Style_' + Date.now();



describe('"boxModel"', () => {
  let testNode;

  before(() => {
    helpers.html(`
      <style id='${styleID}'>
        #${testID} {
          margin: 1px 2px 3px 4px;
          padding: 1px 2px 3px 4px;
          border: solid black;
          border-width: 1px 2px 3px 4px;
        }
      </style>
    `);
  });

  after(() => helpers.remove(styleID));

  beforeEach(() => {
    helpers.html(`<div id="${testID}"></div>`);
    testNode = helpers.id(testID);
  });

  afterEach(() => helpers.remove(testID));

  it('Should return an object with `margin`, `padding` and `border`', () => {
    const bm = boxModel(testNode);
    expect(Object.keys(bm)).to.equalTo(['margin', 'padding', 'border']);
  });

  it('Each section should contain `top`, `left`, `right`, `bottom`', () => {
    const bm = boxModel(testNode);

    Object.keys(bm).forEach((section) => {
      expect(Object.keys(bm[section])).to.equalTo(['top', 'left', 'bottom', 'right']);
    });
  });

  it('Should correctly contain the margin information of the element', () => {
    let bm = boxModel(testNode);

    expect(bm.margin).to.deep.equal({ top: 1, right: 2, bottom: 3, left: 4 });

    testNode.style.marginLeft = '40px';
    bm = boxModel(testNode);

    expect(bm.margin).to.deep.equal({ top: 1, right: 2, bottom: 3, left: 40 });
  });

  it('Should correctly contain the padding information of the element', () => {
    let bm = boxModel(testNode);

    expect(bm.padding).to.deep.equal({ top: 1, right: 2, bottom: 3, left: 4 });

    testNode.style.paddingLeft = '40px';
    bm = boxModel(testNode);

    expect(bm.padding).to.deep.equal({ top: 1, right: 2, bottom: 3, left: 40 });
  });

  it('Should correctly contain the border width information of the element', () => {
    let bm = boxModel(testNode);

    expect(bm.border).to.deep.equal({ top: 1, right: 2, bottom: 3, left: 4 });

    testNode.style.borderLeftWidth = '40px';
    bm = boxModel(testNode);

    expect(bm.border).to.deep.equal({ top: 1, right: 2, bottom: 3, left: 40 });
  });
});
