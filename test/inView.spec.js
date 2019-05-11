import { expect, helpers, describe, it, before, beforeEach, after } from './assets/init-test';

import inView from '../inView';



const testID = 'TestNode';



describe('"inView"', () => {
  let node;

  before(() => {
    helpers.html(`
      <div id="hidden" style="display: none;"></div>
      <div id="${testID}"></div>
    `);

    node = helpers.id(testID);
  });

  beforeEach(() => {
    node.style.cssText = 'width: 100px; height: 100px; position: absolute;';
  });

  after(() => {
    helpers.remove('hidden');
    helpers.remove(testID);
  });

  it('Should always return an object, with: inside, above, below, left, right', () => {
    expect(inView()).to.have.all.keys('inside', 'above', 'below', 'left', 'right');
  });

  it('Should set all properties to false when the given element is hidden or not an element in the DOM', () => {
    const result = { inside: false, above: false, below: false, left: false, right: false };

    const div = helpers.create('div');
    div.innerHTML = '<p></p>';

    expect(inView()).to.eql(result);
    expect(inView(null)).to.eql(result);
    expect(inView({})).to.eql(result);
    expect(inView(div)).to.eql(result);
    expect(inView(div.firstChild)).to.eql(result);
    expect(inView(helpers.id('hidden'))).to.eql(result);
    expect(inView(node)).not.to.eql(result);
  });

  it('Should set all properties to true then the element is inside the viewport area', () => {
    const result = { inside: true, above: false, below: false, left: false, right: false };
    expect(inView(node)).to.eql(result);
  });

  describe('- Off screen indications', () => {
    it('Should indicate that the element is off the viewport area to the left', () => {
      node.style.right = '100%';
      expect(inView(node)).to.have.property('left', true);
    });

    it('Should indicate that the element is off the viewport area to the right', () => {
      node.style.left = '100%';
      expect(inView(node)).to.have.property('right', true);
    });

    it('Should indicate that the element is above the viewport area', () => {
      node.style.bottom = '100%';
      expect(inView(node)).to.have.property('above', true);
    });

    it('Should indicate that the element is below the viewport area', () => {
      node.style.top = '100%';
      expect(inView(node)).to.have.property('below', true);
    });
  });

  describe('- With a given threshold', () => {
    it('Should ignore non-number threshold values', () => {
      node.style.right = 'calc(100% - 1px)';
      expect(inView(node)).to.have.property('left', false);
      expect(inView(node, '')).to.have.property('left', false);
      expect(inView(node, null)).to.have.property('left', false);
      expect(inView(node, 0)).to.have.property('left', false);
    });

    describe('- With a positive value', () => {
      it('Should indicate that the element is off the viewport area to the left', () => {
        node.style.right = 'calc(100% - 10px)';
        expect(inView(node, 10)).to.have.property('left', true);
      });

      it('Should indicate that the element is off the viewport area to the right', () => {
        node.style.left = 'calc(100% - 10px)';
        expect(inView(node, 10)).to.have.property('right', true);
      });

      it('Should indicate that the element is above the viewport area', () => {
        node.style.bottom = 'calc(100% - 10px)';
        expect(inView(node, 10)).to.have.property('above', true);
      });

      it('Should indicate that the element is below the viewport area', () => {
        node.style.top = 'calc(100% - 10px)';
        expect(inView(node, 10)).to.have.property('below', true);
      });
    });

    describe('- With a negative value', () => {
      it('Should indicate that the element is off the viewport area to the left', () => {
        node.style.right = 'calc(100% + 10px)';
        expect(inView(node, -10)).to.have.property('left', true);
      });

      it('Should indicate that the element is off the viewport area to the right', () => {
        node.style.left = 'calc(100% + 10px)';
        expect(inView(node, -10)).to.have.property('right', true);
      });

      it('Should indicate that the element is above the viewport area', () => {
        node.style.bottom = 'calc(100% + 10px)';
        expect(inView(node, -10)).to.have.property('above', true);
      });

      it('Should indicate that the element is below the viewport area', () => {
        node.style.top = 'calc(100% + 10px)';
        expect(inView(node, -10)).to.have.property('below', true);
      });
    });
  });
});
