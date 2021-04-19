import find from '../find';



describe('"Find"', () => {
  describe('With only selector defined', () => {
    it('Uses `getElementsByTagName` when selector is a tag name ', () => {
      const tagNameSpy = jest.spyOn(document, 'getElementsByTagName');

      find('div');
      expect(tagNameSpy).toHaveBeenCalledWith('div');

      tagNameSpy.mockRestore();
    });

    it('Uses `getElementById` when selecor is an ID', () => {
      const idSpy = jest.spyOn(document, 'getElementById');

      find('#MyId');
      expect(idSpy).toHaveBeenCalledWith('MyId');

      idSpy.mockRestore();
    });

    describe('Uses `getElementsByClassName` when selector is:', () => {
      let classSpy: jest.SpyInstance;

      beforeAll(() => {
        classSpy = jest.spyOn(document, 'getElementsByClassName');
      });

      beforeEach(() => classSpy.mockClear());

      afterAll(() => classSpy.mockRestore());

      it('Single class selector', () => {
        find('.item');
        expect(classSpy).toHaveBeenCalledWith('item');
      });

      it('Multi class selector', () => {
        find('.item.first');
        expect(classSpy).toHaveBeenCalledWith('item first');
      });
    });

    describe('Uses `querySelectorAll` when selector:', () => {
      let querySpy: jest.SpyInstance;

      const testQuery = (query: string) => {
        find(query);
        expect(querySpy).toHaveBeenCalledWith(query);
      };

      beforeEach(() => querySpy.mockClear());

      beforeAll(() => {
        querySpy = jest.spyOn(document, 'querySelectorAll');
      });

      afterAll(() => querySpy.mockRestore());

      it('Contains ` ` (space)', () => testQuery('div p'));
      it('Contains `>` (child selector)', () => testQuery('div > p'));
      it('Contains `+` (next sibling selector)', () => testQuery('div + p'));
      it('Contains `~` (all next sibling selector)', () => testQuery('div ~ p'));
      it('Contains `:` (pseudo selector)', () => testQuery('div:first-child'));
      it('Contains `[` (attribute selector)', () => testQuery('div[name="test"]'));
      it('Contains `,` (multiple selectors)', () => testQuery('div, p'));

      it.each([
        '#MyId.item',
        'div.item',
        '.item#MyId'
      ])('Mixed selector: %s', (selector) => {
        testQuery(selector);
      });
    });
  });

  describe('With element and selector defined', () => {
    const { body } = document;

    it('Uses `getElementsByTagName` when selector is a tag name ', () => {
      const tagNameSpy = jest.spyOn(body, 'getElementsByTagName');

      find(body, 'div');
      expect(tagNameSpy).toHaveBeenCalledWith('div');

      tagNameSpy.mockRestore();
    });

    it('Uses `getElementById` when selector is an ID (does not use element)', () => {
      const idSpy = jest.spyOn(document, 'getElementById');

      find(body, '#MyId');
      expect(idSpy).toHaveBeenCalledWith('MyId');

      idSpy.mockRestore();
    });

    describe('Uses `getElementsByClassName` when selector is:', () => {
      let classSpy: jest.SpyInstance;

      beforeAll(() => {
        classSpy = jest.spyOn(body, 'getElementsByClassName');
      });

      beforeEach(() => classSpy.mockClear());

      afterAll(() => classSpy.mockRestore());

      it('Single class selector', () => {
        find(body, '.item');
        expect(classSpy).toHaveBeenCalledWith('item');
      });

      it('Multi class selector', () => {
        find(body, '.item.first');
        expect(classSpy).toHaveBeenCalledWith('item first');
      });
    });

    describe('Uses `querySelectorAll` when selector:', () => {
      let querySpy: jest.SpyInstance;

      const testQuery = (query: string) => {
        find(body, query);
        expect(querySpy).toHaveBeenCalledWith(query);
      };

      beforeAll(() => {
        querySpy = jest.spyOn(body, 'querySelectorAll');
      });

      beforeEach(() => querySpy.mockClear());

      afterAll(() => querySpy.mockRestore());

      it('Contains ` ` (space)', () => testQuery('div p'));
      it('Contains `>` (child selector)', () => testQuery('div > p'));
      it('Contains `+` (next sibling selector)', () => testQuery('div + p'));
      it('Contains `~` (all next sibling selector)', () => testQuery('div ~ p'));
      it('Contains `:` (pseudo selector)', () => testQuery('div:first-child'));
      it('Contains `[` (attribute selector)', () => testQuery('div[name="test"]'));
      it('Contains `,` (multiple selectors)', () => testQuery('div, p'));

      it.each([
        '#MyId.item',
        'div.item',
        '.item#MyId'
      ])('Mixed selector: %s', (selector) => {
        testQuery(selector);
      });
    });
  });
});
