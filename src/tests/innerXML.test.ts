import innerXML from '../innerXML';



describe('"innerXML"', () => {
  describe('Returns the inner XML code of an XML element', () => {
    let xmlElm: Element;

    const innerHTML = `
      <firstname>John</firstname>
      <lastname>Doe</lastname>
    `;

    beforeEach(() => {
      const xml = `<Person>${innerHTML}</Person>`;

      xmlElm = (new DOMParser())
        .parseFromString(xml, 'application/xml')
        .getElementsByTagName('Person')[0];
    });

    it('Using `innerHTML`', () => {
      expect(innerXML(xmlElm)).toBe(innerHTML);
    });

    it('When `innerHTML` is not present', () => {
      const mock = jest.spyOn(xmlElm, 'innerHTML', 'get').mockImplementation(undefined);

      expect(innerXML(xmlElm)).toBe(innerHTML);

      mock.mockRestore();
    });
  });
});
