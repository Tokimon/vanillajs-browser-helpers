import parseSelector from '../parseSelector';



describe('"parseSelector"', () => {
  it('Defaults "tagName" to a DIV when empty string is given', () => {
    expect(parseSelector('').tagName).toBe('div');
  });

  it.each([
    'div',
    'span',
    'custom',
    'input',
    'br',
    'img'
  ])('Parses HTML element: "%s"', (tag) => {
    expect(parseSelector(tag).tagName).toBe(tag);
  });

  describe('Parsing ID', () => {
    it('Single given ID', () => {
      expect(parseSelector('#id').attributes.id).toBe('id');
    });

    it('Takes only the first of multiple given IDs', () => {
      expect(parseSelector('#id#id2').attributes.id).toBe('id');
    });
  });

  describe('Parsing class name', () => {
    it('Single class name', () => {
      expect(parseSelector('.my-class').attributes.class).toBe('my-class');
    });

    it('Multiple class names', () => {
      const { attributes } = parseSelector('.dash-class.underscore_class');
      expect(attributes.class).toBe('dash-class underscore_class');
    });
  });

  describe('Parsing a selector', () => {
    it('Parses correctly without quotes', () => {
      expect(parseSelector('[attr=value]').attributes.attr).toBe('value');
    });

    it('Parses correctly with single quotes', () => {
      expect(parseSelector("[attr='value']").attributes.attr).toBe('value');
    });

    it('Parses correctly with or double quotes', () => {
      expect(parseSelector('[attr="value"]').attributes.attr).toBe('value');
    });

    it('Parses correctly with no value attributes (native)', () => {
      expect(parseSelector('[disabled]').attributes.disabled).toBe('');
    });

    it('Parses correctly with no value attributes (custom)', () => {
      expect(parseSelector('[custom]').attributes.custom).toBe('');
    });

    it('Combines multiple expressions of same name', () => {
      const { attributes } = parseSelector('[data-attr="value 1"][data-attr="value 2"]');
      expect(attributes['data-attr']).toBe('value 1 value 2');
    });

    describe('Correctly parses quotes in quotes', () => {
      it('Single quotes inside single quotes', () => {
        const { attributes } = parseSelector('[data-attr=\'should accept \'this\'\']');
        expect(attributes['data-attr']).toBe("should accept 'this'");
      });

      it('Single quotes inside double quotes', () => {
        const { attributes } = parseSelector('[data-attr="should accept \'this\'"]');
        expect(attributes['data-attr']).toBe("should accept 'this'");
      });

      it('Double quotes inside double quotes', () => {
        const { attributes } = parseSelector('[data-attr="should accept "this""]');
        expect(attributes['data-attr']).toBe('should accept "this"');
      });

      it('Double quotes inside single quotes', () => {
        const { attributes } = parseSelector('[data-attr=\'should accept "this"\']');
        expect(attributes['data-attr']).toBe('should accept "this"');
      });
    });

    describe('Eliminates indicators inside class/id attributes', () => {
      describe.each(['class', 'id'])('`%s` attribute', (attr) => {
        it.each(['.', '#'])('`%s` indicator', (x) => {
          const { attributes } = parseSelector(`[${attr}="${x}value"]`);
          expect(attributes[attr]).toBe('value');
        });
      });

      describe.each(['class', 'id'])('For an attribute that contains `%s`, the indicator is not removed', (attr) => {
        const a = attr + 'ish';

        it.each(['.', '#'])('`%s` indicator', (x) => {
          const { attributes } = parseSelector(`[${a}="${x}value"]`);
          expect(attributes[a]).toBe(`${x}value`);
        });
      });
    });

    describe('Parses custom attributes', () => {
      it.each([
        ['CamelCase', 'myAttribute'],
        ['With number', 'my2ndAttribute'],
        ['With dash', 'my-attribute'],
        ['with underscore', 'my_attribute']
      ])('%s', (_, x) => {
        const { attributes } = parseSelector(`[${x}="value = ok"]`);
        expect(attributes[x]).toBe('value = ok');
      });
    });
  });

  it('Accepts "class" as mixed expressions', () => {
    const { attributes } = parseSelector('[class="attr-class"].normal-class');
    expect(attributes.class).toBe('attr-class normal-class');
  });

  it('Accepts "id" as mixed expressions (standard `#` expression takes precedence)', () => {
    const { attributes } = parseSelector('[id="attrId"]#normalId');
    expect(attributes.id).toBe('normalId');
  });

  it('Parses full selector', () => {
    const result = parseSelector('span#id.class[data-attr="value"]');
    expect(result).toEqual({
      tagName: 'span',
      attributes: {
        id: 'id',
        class: 'class',
        'data-attr': 'value'
      }
    });
  });

  it('Does not parse url attribute as class name', () => {
    const result = parseSelector('span[src="url.com"].class');
    expect(result).toEqual({
      tagName: 'span',
      attributes: {
        class: 'class',
        src: 'url.com'
      }
    });
  });

  it('Does not parse url attribute hashes as ID', () => {
    const result = parseSelector('span[src="url.com#not-id"]');
    expect(result).toEqual({
      tagName: 'span',
      attributes: {
        src: 'url.com#not-id'
      }
    });
  });
});
