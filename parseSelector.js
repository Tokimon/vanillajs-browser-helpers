import isArray from 'vanillajs-helpers/isArray';
import uniqueArray from 'vanillajs-helpers/uniqueArray';



const elmExp = /^[a-z]+/;
const nameExp = /[a-z][\w\d-]*/i;
const idExp = new RegExp(`#${nameExp.source}`, 'i');
const classExp = new RegExp(`\\.${nameExp.source}`, 'ig');
const attrExp = new RegExp(`\\[(${nameExp.source})(?:=([^\\]]+))?]`, 'g');



/**
 * @typedef SelectorParsing
 * @property {String} tagName - The tag name
 * @property {Object} attributes - The parsed attributes in key/value pairs
 */

/**
 * Parses a selector string into a structured object
 * @function parseSelector
 * @param {String} selector - The CSS selector to parse
 * @return {SelectorParsing} The parsing mapping
 */
export default function parseSelector(selector) {
  if(!selector) { selector = ''; }
  selector = `${selector}`;

  let attributes = {};

  // Tag name
  let tagName = selector.match(elmExp);
  tagName = tagName ? tagName[0] : 'div';

  // Attribute experessions
  if(selector.indexOf('[') + 1) {
    selector = selector.replace(attrExp, (all, att, val) => {
      val = (val || '').replace(/^["']|["']$/g, '');

      const isID = att === 'id';
      const isClass = att === 'class';

      if(isID) {
        if(!attributes.id) {
          val = val.match(nameExp);
          if(val) { attributes.id = val[0]; }
        }
      } else if(isClass) {
        val = val.split(/[ .#]+/).filter((cn) => nameExp.test(cn));
        attributes.class = (attributes.class || []).concat(val);
      } else {
        if(!attributes[att]) { attributes[att] = []; }
        attributes[att].push(val.replace(/\\*"/g, '&quot;'));
      }

      return '';
    });
  }

  // ID
  const id = selector.indexOf('#') + 1 && selector.match(idExp);
  if(id) { attributes.id = id[0].substr(1); }

  // Class names
  const cns = selector.indexOf('.') + 1 && selector.match(classExp);

  if(cns) {
    attributes.class = cns
      .map((cn) => cn.substr(1))
      .concat(attributes.class || []);
  }

  if(attributes.class) {
    attributes.class = uniqueArray(attributes.class).join(' ');
  }

  // Transform array attributes into space separated strings
  Object.keys(attributes)
    .forEach((att) => {
      if(isArray(attributes[att])) {
        attributes[att] = attributes[att].join(' ');
      }
    });

  return { tagName, attributes };
}
