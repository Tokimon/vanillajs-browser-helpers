import { expect, describe, it, beforeEach, sinon } from './assets/init-test';

import innerXML from '../innerXML';



describe('"innerXML"', () => {
  describe('Returns the inner XML code of an XML element', () => {
    let xmlElm;

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

    it('Should return empty string, when given elm is not a valid Node', () => {
      expect(innerXML()).to.equal('');
      expect(innerXML(null)).to.equal('');
      expect(innerXML({})).to.equal('');
    });

    it('Using `innerHTML`', () => {
      expect(innerXML(xmlElm)).to.equal(innerHTML);
    });

    it('When `innerHTML` is not present', () => {
      const mock = sinon.stub(xmlElm, 'innerHTML').get(undefined);

      expect(innerXML(xmlElm)).to.equal(innerHTML);

      mock.restore();
    });
  });
});
