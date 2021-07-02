const elmExp = /^[a-z]+/;
const nameExp = /[a-z][\w\d-]*/i;
const nameExpStr = nameExp.source;
const idExp = new RegExp(`#${nameExpStr}`, 'i');
const classExp = new RegExp(`\\.${nameExpStr}`, 'ig');
const attrExp = new RegExp(`\\[(${nameExpStr})(?:=([^\\]]+))?]`, 'g');



type AttributeMapping = Record<string, Set<string>>;
type Attributes = Record<string, string>;

interface SelectorParsing {
  tagName: string
  attributes: Attributes
}



const addAttribute = (att: string, val: string | undefined, attributes: AttributeMapping): void => {
  if (val == null) { return; }

  const isId = att === 'id';

  // ID Attributes are only added once
  if (isId && attributes[att]) {
    return;
  }

  if (!attributes[att]) {
    attributes[att] = new Set();
  }

  // Clean class and ID values
  if (att === 'class' || isId) {
    val = val.replace(/[#.]/g, '');
  }

  attributes[att].add(val);
};


const parseAttribute = (selector: string, attributes: AttributeMapping) => {
  // This function detects the attribute from the selector,
  // and then removes it to avoid having to parse it again
  const replaceFn = (_: string, att: string, val: string | undefined) => {
    val = (val || '').replace(/^["']|["']$/g, '');
    addAttribute(att, val, attributes);
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
  const tagName = (tagNameMatch || ['div'])[0];

  // Attribute expressions
  selector = parseAttribute(selector, mapping);

  // ID
  const idMatch = selector.includes('#') && selector.match(idExp);

  if (idMatch) {
    delete mapping.id;
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
        atts[name] = Array.from(val).join(' ');
        return atts;
      },
      {} as Attributes
    );

  return { tagName, attributes };
}
