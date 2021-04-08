import uniqueArray from 'vanillajs-helpers/uniqueArray';



const elmExp = /^[a-z]+/;
const nameExp = /[a-z][\w\d-]*/i;
const nameExpStr = nameExp.source;
const idExp = new RegExp(`#${nameExpStr}`, 'i');
const classExp = new RegExp(`\\.${nameExpStr}`, 'ig');
const attrExp = new RegExp(`\\[(${nameExpStr})(?:=([^\\]]+))?]`, 'g');



type AttributeMapping = Record<string, string[]>;
type Attributes = Record<string, string>;

interface SelectorParsing {
  tagName: string
  attributes: Attributes
}



const addAttribute = (att: string, val: string | undefined, attributes: AttributeMapping) => {
  let currAtt = attributes[att];

  if (!Array.isArray(currAtt)) {
    currAtt = [currAtt] as string[];
  }

  currAtt.push(val as string);
  attributes[att] = currAtt.filter((a) => !!a);
};


const parseAttribute = (selector: string, attributes: AttributeMapping) => {
  const replaceFn = (_: string, att: string, val: string | undefined) => {
    val = (val || '').replace(/^["']|["']$/g, '');
    addAttribute(att, val, attributes);

    // Delete the entry from the selector
    return '';
  };

  return selector.includes('[')
    ? selector.replace(attrExp, replaceFn)
    : selector;
};



/**
 * Parses a selector string into a structured object
 *
 * @param selector - The CSS selector to parse
 * @return The attribute parsing mapping
 */
export default function parseSelector(selector: string): SelectorParsing {
  const mapping = {} as AttributeMapping;

  // Tag name
  const tagNameMatch = selector.match(elmExp);
  const tagName = tagNameMatch ? tagNameMatch[0] : 'div';

  // Attribute expressions
  selector = parseAttribute(selector, mapping);

  // ID
  const idMatch = selector.includes('#') && selector.match(idExp);

  if (idMatch) {
    addAttribute('id', idMatch[0].substr(1), mapping);
  }

  // Class names
  const cnMatch = selector.includes('.') && selector.match(classExp);

  if (cnMatch) {
    cnMatch.forEach((cn) => addAttribute('class', cn.substr(1), mapping));
  }

  // Transform array attributes into space separated strings
  const attributes = Object.entries(mapping)
    .reduce(
      (atts, [name, val]) => {
        const att = uniqueArray(val).join(' ');
        if (att) { atts[name] = att; }
        return atts;
      },
      {} as Attributes
    );

  return { tagName, attributes };
}
