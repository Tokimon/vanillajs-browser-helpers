/* eslint-env node, mocha, browser */
/* global expect, $ */

'use strict';

import find, { findOne } from '../find';

const testID = 'FindTest';

describe('"Find" package', () => {
  let numberSupport;

  before(() => {
    $.html(`
    <div id="${testID}">
      <div id="QuickRefs">
        <form></form>
        <script></script>
        <embed src="" type="" />
        <img>
        <img>
      </div>

      <aside id="Aside">
        <embed src="" type="" />
        <script></script>
        <img>
        <img>
        <a href=""></a>
        <textarea class="text"></textarea>
        <input class="text" />
        <button class="button">Push me</button>
        <input type="time" class="date">
        <input type="number" class="number">
        <input type="checkbox" class="checkbox">
        <input name="radio" type="radio" class="radio">
        <!-- comment -->
        Text
      </aside>

      <div id="WildCards">
        <style>body { color: black; }</style>
        <a href=""></a>
        <map name="map"><area shape="" coords="" href="" alt="" /></map>
        <!-- comment -->
        Text
      </div>

      <form id="Form">
        <select id="Select" class="select">
          <option value="1"></option>
          <option value="2"></option>
          <option value="3"></option>
        </select>

        <button class="button">Push me</button>
        <input type="reset" class="button">
        <input type="submit" class="button">
        <input type="button" class="button">
        <input type="image" class="button">

        <input type="checkbox" class="checkbox">
        <input name="radio" type="radio" class="radio">

        <textarea class="text"></textarea>
        <input class="text" />
        <input type="email" class="text">
        <input type="password" class="text">
        <input type="search" class="text">
        <input type="text" class="text">
        <input type="url" class="text">
        <input type="tel" class="text">

        <input type="date" class="date">
        <input type="datetime" class="date">
        <input type="datetime-local" class="date">
        <input type="month" class="date">
        <input type="week" class="date">
        <input type="time" class="date">

        <input type="number" class="number" id="Number">
        <input type="range" class="number">

        <input type="file" class="file">

        <input type="hidden" class="hidden">
        <input type="color" class="color">
      </form>
    </div>
    `);

    numberSupport = (() => {
      $.html('<input type="number" id="TestNumber">');
      const val = 'not a number';
      const input = $.id('TestNumber');
      input.setAttribute('value', val);
      $.remove('TestNumber');

      return input.type === 'number' && input.value !== val;
    })();
  });

  after(() => $.remove(testID));

  describe('"find"', () => {
    it('Should always return an array', () => {
      expect(find()).to.be.a('array');
      expect(find(`#${testID}`)).to.be.a('array');
      expect(find(`:badquery`)).to.be.a('array');
    });

    describe('Wildcards (:name syntaxt)', () => {
      describe('- Globally ("document" context)', () => {
        it('[:stylesheet] Should find all stylesheets', () => {
          const stylesheets = find(':stylesheet');
          expect(stylesheets).to.have.length(2);
          expect(stylesheets[0]).to.be.a('cssstylesheet');
        });

        it('[:input] Should find all input elements (not buttons or hidden)', () => {
          const elements = find(':input');
          expect(elements).to.have.length(27);
          expect(elements.every((elm) => {
            return !elm.className || elm.className !== 'button';
          })).to.be.true;
        });

        it('[:input-text] Should find all text inputs', () => {
          const elements = find(':input-text');
          expect(elements).to.have.length(numberSupport ? 10 : 13);
          expect(elements.every((elm) => /(text(area)|password)?/.test(elm.type))).to.be.true;
        });

        it('[:input-date] Should find all date inputs', () => {
          const elements = find(':input-date');
          expect(elements).to.have.length(7);
          expect(elements.every((elm) => elm.className === 'date')).to.be.true;
        });

        it('[:input-number] Should find all number inputs', () => {
          const elements = find(':input-number');
          expect(elements).to.have.length(numberSupport ? 3 : 0);
          expect(elements.every((elm) => elm.className === 'number')).to.be.true;
        });

        it('[:radio] Should find all radio buttons', () => {
          const elements = find(':radio');
          expect(elements).to.have.length(2);
          expect(elements.every((elm) => elm.className === 'radio')).to.be.true;
        });

        it('[:checkbox] Should find all radio buttons', () => {
          const elements = find(':checkbox');
          expect(elements).to.have.length(2);
          expect(elements.every((elm) => elm.className === 'checkbox')).to.be.true;
        });

        it('[:button] Should find all radio buttons', () => {
          const elements = find(':button');
          expect(elements).to.have.length(6);
          expect(elements.every((elm) => elm.className === 'button')).to.be.true;
        });

        it('[:comment] Should find all comment nodes', () => {
          const elements = find(':comment');
          expect(elements).to.have.length.of.at.least(2);
          expect(elements.every((elm) => elm.nodeType === 8)).to.be.true;
        });

        it('[:text] Should find all text nodes', () => {
          const elements = find(':text');
          expect(elements).to.have.length.of.at.least(2);
          expect(elements.every((elm) => elm.nodeType === 3)).to.be.true;
        });
      });

      describe('- From a given DOM element context', () => {
        let WildCards, Form;

        before(() => {
          WildCards = $.id('WildCards');
          Form = $.id('Form');
        });

        it('[:stylesheet] Should find all stylesheets', () => {
          const stylesheets = find(':stylesheet', WildCards);
          expect(stylesheets).to.have.length(1);
          expect(stylesheets[0]).to.be.a('cssstylesheet');
        });

        it('[:input] Should find all input elements (not buttons or hidden)', () => {
          const elements = find(':input', Form);
          expect(elements).to.have.length(21);
          expect(elements.every((elm) => {
            return !elm.className || elm.className !== 'button';
          })).to.be.true;
        });

        it('[:input-text] Should find all text inputs', () => {
          const elements = find(':input-text', Form);
          expect(elements).to.have.length(numberSupport ? 8 : 10);
          expect(elements.every((elm) => /(text(area)|password)?/.test(elm.type))).to.be.true;
        });

        it('[:input-date] Should find all date inputs', () => {
          const elements = find(':input-date', Form);
          expect(elements).to.have.length(6);
          expect(elements.every((elm) => elm.className === 'date')).to.be.true;
        });

        it('[:input-number] Should find all number inputs', () => {
          const elements = find(':input-number', Form);
          expect(elements).to.have.length(numberSupport ? 2 : 0);
          expect(elements.every((elm) => elm.className === 'number')).to.be.true;
        });

        it('[:radio] Should find all radio buttons', () => {
          const elements = find(':radio', Form);
          expect(elements).to.have.length(1);
          expect(elements.every((elm) => elm.className === 'radio')).to.be.true;
        });

        it('[:checkbox] Should find all radio buttons', () => {
          const elements = find(':checkbox', Form);
          expect(elements).to.have.length(1);
          expect(elements.every((elm) => elm.className === 'checkbox')).to.be.true;
        });

        it('[:button] Should find all radio buttons', () => {
          const elements = find(':button', Form);
          expect(elements).to.have.length(5);
          expect(elements.every((elm) => elm.className === 'button')).to.be.true;
        });

        it('[:comment] Should find all comment nodes', () => {
          const elements = find(':comment', WildCards);
          expect(elements).to.have.length(1);
          expect(elements.every((elm) => elm.nodeType === 8)).to.be.true;
        });

        it('[:text] Should find all text nodes', () => {
          const elements = find(':text', WildCards);
          expect(elements).to.have.length(6);
          expect(elements.every((elm) => elm.nodeType === 3)).to.be.true;
        });
      });
    });

    describe('IDs', () => {
      describe('- From document (default context)', () => {
        it('Should find a DOM element with the diven ID', () => {
          const node = find(`#${testID}`);
          expect(node).to.have.length(1);
          expect(node[0]).to.have.id(testID);

          expect(find(`#NotIncluded`)).to.have.length(0);
        });
      });

      describe('- From a given DOM element context', () => {
        it('Should find a DOM element with the given ID ignoring the context', () => {
          const node = find(`#Select`, $.id(testID));
          expect(node).to.have.length(1);
          expect(node[0]).to.have.id('Select');

          expect(find(`#${testID}`, $.id(testID))).to.have.length(1);
        });
      });
    });

    describe('Tags', () => {
      describe('- From document (default context)', () => {
        it('Should find all DOM element with a given tag name', () => {
          const a = find('a');
          expect(a).to.have.length(2);
          expect(a.every((elm) => elm.tagName === 'A')).to.be.true;

          const inputs = find('input');
          expect(inputs).to.have.length(29);
          expect(inputs.every((elm) => elm.tagName === 'INPUT')).to.be.true;

          const options = find('option');
          expect(options).to.have.length(3);
          expect(options.every((elm) => elm.tagName === 'OPTION' && elm.parentNode.id === 'Select')).to.be.true;
        });
      });

      describe('- From a given DOM element context', () => {
        it('Should find all DOM element with a given tag name', () => {
          const a = find('a', $.id('WildCards'));
          expect(a).to.have.length(1);
          expect(a[0].tagName).to.equal('A');

          const inputs = find('input', $.id('Form'));
          expect(inputs).to.have.length(24);
          expect(inputs.every((elm) => elm.tagName === 'INPUT')).to.be.true;

          const options = find('option', $.id('Form'));
          expect(options).to.have.length(3);
          expect(options.every((elm) => elm.tagName === 'OPTION' && elm.parentNode.id === 'Select')).to.be.true;
        });
      });
    });

    describe('Class names', () => {
      describe('- From document (default context)', () => {
        it('Should find all DOM element with a given class name', () => {
          const buttons = find('.button');
          expect(buttons).to.have.length(6);
          expect(buttons.every((elm) => elm.className === 'button')).to.be.true;
        });
      });

      describe('- From a given DOM element context', () => {
        it('Should find all DOM element with a given class name', () => {
          const buttons = find('.button', $.id('Form'));
          expect(buttons).to.have.length(5);
          expect(buttons.every((elm) => elm.className === 'button')).to.be.true;
        });
      });
    });

    describe('Names', () => {
      describe('- From document (default context)', () => {
        it('Should find all DOM element with a given name attribute', () => {
          const radios = find('[name=radio]');
          expect(radios).to.have.length(2);
          expect(radios.every((elm) => elm.name === 'radio')).to.be.true;

          const map = find('[name="map"]');
          expect(map).to.have.length(1);
          expect(map[0].name).to.equal('map');
          expect(map[0].parentNode).to.have.id('WildCards');
        });
      });

      describe('- From a given DOM element context', () => {
        it('Should find all DOM element with a given name attribute', () => {
          const radios = find('[name=radio]', $.id('Form'));
          expect(radios).to.have.length(1);
          expect(radios[0].name).to.equal('radio');

          const map = find('[name="map"]', $.id('WildCards'));
          expect(map).to.have.length(1);
          expect(map[0].name).to.equal('map');
          expect(map[0].parentNode).to.have.id('WildCards');
        });
      });
    });

    describe('Mixed', () => {
      describe('- From document (default context)', () => {
        describe('-- Selectors as String', () => {
          it('Should find all DOM elements from the given CSS selectors', () => {
            const nodes = find('.button, .text, #Select');
            expect(nodes).to.have.length(17);
          });

          it('Should find all DOM elements from CSS and wildcard selectors', () => {
            const nodes = find('#Select, :stylesheet');
            expect(nodes).to.have.length(3);
            expect(nodes[0]).to.have.id('Select').and.to.be.a('htmlselectelement');
            expect(nodes[2]).to.be.a('cssstylesheet');
          });

          it('Should filter out bad CSS selectors', () => {
            const nodes = find('#Select, 99, null, , :bad-query');
            expect(nodes).to.have.length(1);
          });
        });

        describe('-- Selectors as Array', () => {
          it('Should find all DOM elements from the given CSS selectors', () => {
            let nodes = find(['.button', '.text', '#Select']);
            expect(nodes).to.have.length(17);

            nodes = find(['.radio']);
            expect(nodes).to.have.length(2);
          });

          it('Should find all DOM elements from CSS and wildcard selectors', () => {
            const nodes = find(['#Select', ':stylesheet']);
            expect(nodes).to.have.length(3);
            expect(nodes[0]).to.have.id('Select').and.to.be.a('htmlselectelement');
            expect(nodes[2]).to.be.a('cssstylesheet');
          });

          it('Should filter out bad CSS selectors', () => {
            const nodes = find('#Select', [], {}, null, undefined, ':bad-query');
            expect(nodes).to.have.length(1);
          });
        });
      });

      describe('- From a given DOM element context', () => {
        describe('-- Selectors as String', () => {
          it('Should find all DOM elements from the given CSS selectors', () => {
            const nodes = find('.button, .text, #Select', $.id('Form'));
            expect(nodes).to.have.length(14);
          });

          it('Should find all DOM elements from CSS and wildcard selectors', () => {
            const nodes = find('#Select, :button', $.id('Form'));
            expect(nodes).to.have.length(6);
            expect(nodes[0]).to.have.id('Select').and.to.be.a('htmlselectelement');
            expect(nodes[2]).to.have.class('button');
          });
        });

        describe('-- Selectors as Array', () => {
          it('Should find all DOM elements from the given CSS selectors', () => {
            const nodes = find(['.button', '.text', '#Select'], $.id('Form'));
            expect(nodes).to.have.length(14);
          });

          it('Should find all DOM elements from CSS and wildcard selectors', () => {
            const nodes = find(['#Select', ':button'], $.id('Form'));
            expect(nodes).to.have.length(6);
            expect(nodes[0]).to.have.id('Select').and.to.be.a('htmlselectelement');
            expect(nodes[2]).to.have.class('button');
          });
        });
      });
    });
  });


  describe('"findOne"', () => {
    it('Should always return null or the element', () => {
      expect(findOne()).to.be.null;
      expect(findOne({})).to.be.null;
      expect(findOne(`:stylesheet`, $.id('Form'))).to.be.null;
      expect(findOne(`:badquery`)).to.be.null;
      expect(findOne(`#${testID}`)).to.be.a('htmldivelement');
    });

    describe('Wildcards (:name syntaxt)', () => {
      describe('- Globally ("document" context)', () => {
        it('[:stylesheet] Should find all stylesheets', () => {
          const node = findOne(':stylesheet');
          expect(node).to.be.a('cssstylesheet');
        });

        it('[:input] Should find all input elements (not buttons or hidden)', () => {
          const node = findOne(':input');
          expect(node.tagName).to.equal('TEXTAREA');
        });

        it('[:input-text] Should find all text inputs', () => {
          const node = findOne(':input-text');
          expect(node).to.have.class('text');
        });

        it('[:input-date] Should find all date inputs', () => {
          const node = findOne(':input-date');
          expect(node).to.have.class('date');
        });

        it('[:input-number] Should find all number inputs', () => {
          const node = findOne(':input-number');
          if(numberSupport) { expect(node).to.have.class('number'); } else { expect(node).to.be.null; }
        });

        it('[:radio] Should find all radio buttons', () => {
          const node = findOne(':radio');
          expect(node).to.have.class('radio');
        });

        it('[:checkbox] Should find all radio buttons', () => {
          const node = findOne(':checkbox');
          expect(node).to.have.class('checkbox');
        });

        it('[:button] Should find all radio buttons', () => {
          const node = findOne(':button');
          expect(node).to.have.class('button');
        });

        it('[:comment] Should find all comment nodes', () => {
          const node = findOne(':comment');
          expect(node.nodeType).to.equal(8);
        });

        it('[:text] Should find all text nodes', () => {
          const node = findOne(':text');
          expect(node.nodeType).to.equal(3);
        });
      });

      describe('- From a given DOM element context', () => {
        let WildCards, Form;

        before(() => {
          WildCards = $.id('WildCards');
          Form = $.id('Form');
        });

        it('[:stylesheet] Should find all stylesheets', () => {
          const node = findOne(':stylesheet', WildCards);
          expect(node).to.be.a('cssstylesheet');
        });

        it('[:input] Should find all input elements (not buttons or hidden)', () => {
          const node = findOne(':input', Form);
          expect(node.tagName).to.equal('SELECT');
        });

        it('[:input-text] Should find all text inputs', () => {
          const node = findOne(':input-text', Form);
          expect(node).to.have.class('text');
        });

        it('[:input-date] Should find all date inputs', () => {
          const node = findOne(':input-date', Form);
          expect(node).to.have.class('date');
        });

        it('[:input-number] Should find all number inputs', () => {
          const node = findOne(':input-number', Form);
          if(numberSupport) { expect(node).to.have.class('number'); } else { expect(node).to.be.null; }
        });

        it('[:radio] Should find all radio buttons', () => {
          const node = findOne(':radio', Form);
          expect(node).to.have.class('radio');
        });

        it('[:checkbox] Should find all radio buttons', () => {
          const node = findOne(':checkbox', Form);
          expect(node).to.have.class('checkbox');
        });

        it('[:button] Should find all radio buttons', () => {
          const node = findOne(':button', Form);
          expect(node).to.have.class('button');
        });

        it('[:comment] Should find all comment nodes', () => {
          const node = findOne(':comment', WildCards);
          expect(node.nodeType).to.equal(8);
        });

        it('[:text] Should find all text nodes', () => {
          const node = findOne(':text', WildCards);
          expect(node.nodeType).to.equal(3);
        });
      });
    });

    describe('IDs', () => {
      describe('- From document (default context)', () => {
        it('Should find a DOM element with the diven ID', () => {
          expect(findOne(`#${testID}`)).to.have.id(testID);
          expect(findOne(`#NotIncluded`)).to.be.null;
        });
      });

      describe('- From a given DOM element context', () => {
        it('Should find a DOM element with the diven ID ignoring the context', () => {
          expect(findOne(`#Select`, $.id(testID))).to.have.id('Select');
          expect(findOne(`#${testID}`, $.id(testID))).to.have.id(testID);
        });
      });
    });

    describe('Tags', () => {
      describe('- From document (default context)', () => {
        it('Should find all DOM element with a given tag name', () => {
          const a = findOne('a');
          expect(a.tagName).to.equal('A');

          const input = findOne('input');
          expect(input.tagName).to.equal('INPUT');

          const option = findOne('option');
          expect(option.tagName).to.equal('OPTION');
        });
      });

      describe('- From a given DOM element context', () => {
        it('Should find all DOM element with a given tag name', () => {
          const a = findOne('a', $.id('WildCards'));
          expect(a.tagName).to.equal('A');

          const input = findOne('input', $.id('Form'));
          expect(input.tagName).to.equal('INPUT');

          const option = findOne('option', $.id('Form'));
          expect(option.tagName).to.equal('OPTION');
        });
      });
    });

    describe('Class names', () => {
      describe('- From document (default context)', () => {
        it('Should find all DOM element with a given class name', () => {
          const button = findOne('.button');
          expect(button).to.have.class('button');
        });
      });

      describe('- From a given DOM element context', () => {
        it('Should find all DOM element with a given class name', () => {
          const button = findOne('.button', $.id('Form'));
          expect(button).to.have.class('button');
        });
      });
    });

    describe('Names', () => {
      describe('- From document (default context)', () => {
        it('Should find all DOM element with a given name attribute', () => {
          const radio = findOne('[name=radio]');
          expect(radio.name).to.equal('radio');

          const map = findOne('[name="map"]');
          expect(map.name).to.equal('map');
          expect(map.parentNode).to.have.id('WildCards');
        });
      });

      describe('- From a given DOM element context', () => {
        it('Should find all DOM element with a given name attribute', () => {
          const radio = findOne('[name=radio]', $.id('Form'));
          expect(radio.name).to.equal('radio');

          const map = findOne('[name="map"]', $.id('WildCards'));
          expect(map.name).to.equal('map');
          expect(map.parentNode).to.have.id('WildCards');
        });
      });
    });

    describe('Mixed', () => {
      describe('- From document (default context)', () => {
        describe('-- Selectors as String', () => {
          it('Should find all DOM elements from the given CSS selectors', () => {
            const node = findOne('.button, .text, #Select');
            expect(node).to.not.be.null;
            expect(node.nodeType).to.equal(1);
          });

          it('Should find all DOM elements from CSS and wildcard selectors', () => {
            const node = findOne(':stylesheet, #Select');
            expect(node).to.not.be.null;
            expect(node).to.be.a('cssstylesheet');
          });

          it('Should filter out bad CSS selectors', () => {
            const node = findOne('#Select, 99, null, , :bad-query');
            expect(node).to.not.be.null.and.be.an('array');
            expect(node.nodeType).to.equal(1);
          });
        });

        describe('-- Selectors as Array', () => {
          it('Should find all DOM elements from the given CSS selectors', () => {
            const node = findOne(['.button', '.text', '#Select']);
            expect(node).to.not.be.null;
            expect(node.nodeType).to.equal(1);
          });

          it('Should find all DOM elements from CSS and wildcard selectors', () => {
            const node = findOne([':stylesheet', '#Select']);
            expect(node).to.not.be.null;
            expect(node).to.be.a('cssstylesheet');
          });

          it('Should filter out bad CSS selectors', () => {
            const node = findOne('#Select', [], {}, null, undefined, ':bad-query');
            expect(node).to.not.be.null.and.be.an('array');
            expect(node.nodeType).to.equal(1);
          });
        });
      });

      describe('- From a given DOM element context', () => {
        describe('-- Selectors as String', () => {
          it('Should find all DOM elements from the given CSS selectors', () => {
            const node = findOne('.button, .text, #Select', $.id('Form'));
            expect(node).to.not.be.null;
            expect(node.nodeType).to.equal(1);
          });

          it('Should find all DOM elements from CSS and wildcard selectors', () => {
            const node = findOne('#Select, :button', $.id('Form'));
            expect(node).to.not.be.null;
            expect(node.nodeType).to.equal(1);
          });
        });

        describe('-- Selectors as Array', () => {
          it('Should find all DOM elements from the given CSS selectors', () => {
            let node = findOne(['.button', '.text', '#Select'], $.id('Form'));
            expect(node).to.not.be.null;
            expect(node.nodeType).to.equal(1);

            node = findOne(['.radio']);
            expect(node).to.have.class('radio');

            node = findOne(['.radio', null, 999, ':badquery']);
            expect(node).to.have.class('radio');
          });

          it('Should find all DOM elements from CSS and wildcard selectors', () => {
            const node = findOne(['#Select', ':button'], $.id('Form'));
            expect(node).to.not.be.null;
            expect(node.nodeType).to.equal(1);
          });
        });
      });
    });
  });
});
