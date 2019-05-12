import { expect, describe, it, before, beforeEach, after, sinon } from './assets/init-test';

import find from '../find';



describe('"Find" >', () => {
  describe('With only selector defined >', () => {
    it('Uses `getElementsByTagName` when selector is a tag name ', () => {
      const tagnameSpy = sinon.spy(document, 'getElementsByTagName');

      find('div');
      expect(tagnameSpy).to.be.calledOnceWith('div');

      tagnameSpy.restore();
    });

    it('Uses `getElementById` when selecor is an ID', () => {
      const idSpy = sinon.spy(document, 'getElementById');

      find('#MyId');
      expect(idSpy).to.be.calledOnceWith('MyId');

      idSpy.restore();
    });

    describe('Uses `getElementsByClassName` when selector is: >', () => {
      let classSpy;

      before(() => {
        classSpy = sinon.spy(document, 'getElementsByClassName');
      });

      beforeEach(() => classSpy.resetHistory());
      after(() => classSpy.restore());

      it('Single class selector', () => {
        find('.item');
        expect(classSpy).to.be.calledOnceWith('item');
      });

      it('Multi class selector', () => {
        find('.item.first');
        expect(classSpy).to.be.calledOnceWith('item first');
      });
    });

    describe('Uses `querySelectorAll` when selector: >', () => {
      let querySpy;

      const testQuery = (query) => {
        find(query);
        expect(querySpy).to.be.calledOnceWith(query);
        querySpy.resetHistory();
      };

      before(() => {
        querySpy = sinon.spy(document, 'querySelectorAll');
      });

      after(() => querySpy.restore());

      it('Contains ` ` (space)', () => testQuery('div p'));
      it('Contains `>` (child selector)', () => testQuery('div > p'));
      it('Contains `+` (next sibling selector)', () => testQuery('div + p'));
      it('Contains `~` (all next sibling selector)', () => testQuery('div ~ p'));
      it('Contains `:` (pseudo selector)', () => testQuery('div:first-child'));
      it('Contains `[` (attribute selector)', () => testQuery('div[name="test"]'));
      it('Contains `,` (multiple selectors)', () => testQuery('div, p'));
      it('Mixed selector', () => {
        testQuery('#MyId.item');
        testQuery('div.item');
        testQuery('.item#MyId');
      });
    });
  });

  describe('With element and selector defined >', () => {
    const { body } = document;

    it('Uses `getElementsByTagName` when selector is a tag name ', () => {
      const tagnameSpy = sinon.spy(body, 'getElementsByTagName');

      find(body, 'div');
      expect(tagnameSpy).to.be.calledOnceWith('div');

      tagnameSpy.restore();
    });

    it('Uses `getElementById` when selecor is an ID (does not use element)', () => {
      const idSpy = sinon.spy(document, 'getElementById');

      find(body, '#MyId');
      expect(idSpy).to.be.calledOnceWith('MyId');

      idSpy.restore();
    });

    describe('Uses `getElementsByClassName` when selector is: >', () => {
      let classSpy;

      before(() => {
        classSpy = sinon.spy(body, 'getElementsByClassName');
      });

      beforeEach(() => classSpy.resetHistory());
      after(() => classSpy.restore());

      it('Single class selector', () => {
        find(body, '.item');
        expect(classSpy).to.be.calledOnceWith('item');
      });

      it('Multi class selector', () => {
        find(body, '.item.first');
        expect(classSpy).to.be.calledOnceWith('item first');
      });
    });

    describe('Uses `querySelectorAll` when selector: >', () => {
      let querySpy;

      const testQuery = (query) => {
        find(body, query);
        expect(querySpy).to.be.calledOnceWith(query);
        querySpy.resetHistory();
      };

      before(() => {
        querySpy = sinon.spy(body, 'querySelectorAll');
      });

      after(() => querySpy.restore());

      it('Contains ` ` (space)', () => testQuery('div p'));
      it('Contains `>` (child selector)', () => testQuery('div > p'));
      it('Contains `+` (next sibling selector)', () => testQuery('div + p'));
      it('Contains `~` (all next sibling selector)', () => testQuery('div ~ p'));
      it('Contains `:` (pseudo selector)', () => testQuery('div:first-child'));
      it('Contains `[` (attribute selector)', () => testQuery('div[name="test"]'));
      it('Contains `,` (multiple selectors)', () => testQuery('div, p'));
      it('Mixed selector', () => {
        testQuery('#MyId.item');
        testQuery('div.item');
        testQuery('.item#MyId');
      });
    });
  });
});
