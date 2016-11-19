/* eslint no-cond-assign: "off" */

import objectType from './objectType';

import iterate from './iterate';
import isString from './isString';
import isArray from './isArray';
import isCollection from './isCollection';
import isDOMNode from './isDOMNode';
import isDOMDocument from './isDOMDocument';

const wildcards = {
  ':stylesheet': { ref: 'styleSheets', q: 'link[rel="stylesheet"], style', f: (style) => style.sheet },
  ':input': { q: 'input:not([type=button]):not([type=submit]):not([type=reset]):not([type=image]):not([type=hidden]), select, textarea' },
  ':input-text': { q: 'input:not([type]), input[type=text], input[type=email], input[type=password], input[type=search], input[type=url], input[type=tel], textarea' },
  ':input-date': { q: 'input[type=date], input[type=datetime], input[type=datetime-local], input[type=month], input[type=time], input[type=week]' },
  ':input-number': { q: 'input[type=number], input[type=range]' },
  ':radio': { q: 'input[type=radio]' },
  ':checkbox': { q: 'input[type=checkbox]' },
  ':button': { q: 'input[type=button], input[type=submit], input[type=reset], input[type=image], button' },
  ':comment': { f: specialNodes('COMMENT') },
  ':text': { f: specialNodes('TEXT') }
};

function specialNodes(type) {
  return (elm, first) => {
    const nodes = [];
    const filter = NodeFilter[`SHOW_${type}`];
    // Unfortunately 'createNodeIterator' doesn't return ES6 a iterator object ([Symbol.terator]),
    // so the while loop is necessary
    const itr = document.createNodeIterator(elm, filter, () => NodeFilter.FILTER_ACCEPT, false);

    let node;
    while(node = itr.nextNode()) {
      nodes.push(node);
      if(first) { break; }
    }

    return nodes;
  };
}

function q(elm, query, first) {
  return first ? elm.querySelector(query) : elm.querySelectorAll(query);
}

function wildcard(elm, query, first) {
  // Wildcard selector
  const wc = wildcards[query];
  // Return undefined if the wild card is not defined
  if(!wc) { return; }

  // If there is a quick reference on the element, return that
  if(wc.ref && typeof elm[wc.ref] !== 'undefined') {
    return elm[wc.ref];

  // If the wildcard object has a query selector
  } else if(wc.q) {
    // If the wild card corresponds to a certain selector, find using querySelector(all)
    const nodes = q(elm, wc.q, first);

    // If we didn't find any nodes from the query, just return null
    if(!nodes) { return null; }

    // If there is a function as well on the wild card object we use that for mapping the elements
    return !wc.f ? nodes : (first ? wc.f(nodes) : Array.from(nodes).map(wc.f));

  }

  // If there is just a function, we use that to find the elements or return undefined
  return wc.f ? wc.f(elm, !!first) : undefined;
}

function getElm(elm, selector) {
  // If the selector is an id selector, return the result by using 'getElementById' no matter the element
  // (it doesn't make sense to put a context for IDs as there shuold always just be one)
  if(selector[0] === '#' && /^#[a-z0-9_-]+$/gi.test(selector)) {
    return document.getElementById(selector.substr(1));
  }

  // If the selector is a class name selector, return the result using 'getElementsByClassName'
  if(selector[0] === '.' && /^(.[a-z0-9_-]+)+$/gi.test(selector)) {
    return elm.getElementsByClassName(selector.substr(1).replace(/\./g, ' '));
  }

  // If the selector is a tagName selector, return the result using 'getElementsByTagName'
  if(/^[a-z]+$/gi.test(selector)) {
    return elm.getElementsByTagName(selector);
  }

  // If the selector is a plain name selector without defined element and elm is document
  if(isDOMDocument(elm) && selector.substr(0,6) === '[name=') {
    // We do the regex here to save some time/resources
    // (first check is just to se if we need to do the regex parsing)
    const m = selector.match(/^\[name=["']?([^"'\]]+)+["']?\]$/)
    // If the selector is indeed a pure name selector find elements using 'getElementsByName'
    if(m) { return elm.getElementsByName(m[1]); }
  }

  // If no method could be found just return undefined
  return;
}

function _find(elm, queries, first) {
  // Try the wildcard selectors
  let nodes = wildcard(elm, queries, first);

  // If we find elements using one of the native selctors, return the result as an array
  // (Id selector will not return a collection hence the length check)
  if(typeof nodes !== 'undefined') { return nodes; }

  // Try first to execute the queries using the getElement[xxx] method
  nodes = getElm(elm, queries);

  // If all else fails we use the query selector
  try { return typeof nodes !== 'undefined' ? nodes : q(elm, queries, first); }
  // If it is bad query just retun null istead of raising an error
  catch(ex) { return null; }
}

function check(queries, elm) {
  let string = isString(queries);
  let array = false;

  if(isArray(queries)) {
    array = queries.length > 1;
    if(!array) {
      queries = queries[0];
      string = isString(queries);
    }
  }

  // If queries are invalid return null
  if(!string && !array) { return null; }

  // Use document if an invalid element has been passed in
  if(!isDOMDocument(elm) && !isDOMNode(elm)) { elm = document; }

  // Test if we are dealing with multiple queries
  const multi = array || (string && /[\s,]/.test(queries));

  // Return the corrected values
  return { string, array, multi, queries, elm };
}




/**
 * Takes a selector and determines the correct method to find matching HTML elements in the DOM.
 * @param  {String} queries - CSS query selector to find elements from
 * @param  {HTMLElement} [elm=document] - The HTML Element from where to start the search
 * @return {Array<HTMLElement>|HTMLElement|NULL} - The found element(s) or null/empty array
 */
export default function find(queries, elm) {
  const vars = check(queries, elm);
  if(!vars) { return []; }

  const { array, multi } = vars;
  [queries, elm] = [vars.queries, vars.elm];

  // If it is not a multi query
  if(!multi) {
    const nodes = _find(elm, queries);
    // Return the found nodes as an Array
    return nodes ? (!isCollection(nodes) || isDOMNode(nodes) ? [nodes] : Array.from(nodes)) : [];
  }

  // We have a multiple queries, so first we just try the query selector
  try { return Array.from(q(elm, array ? queries.join(',') : queries)); }
  // If the querySelector fails, it could mean we have wildcards or bad selectors
  // in the list, so make sure the queries is an Array som may run through each item
  catch(ex) { queries = array ? queries : queries.split(/\s*,\s*/); }

  // We need to create an unique array of the found nodes
  // (the Set objet will automatically filter out duplicates)
  return Array.from(queries.reduce((set, query) => {
    const nodes = _find(elm, query);

    if(nodes) {
      iterate((!isCollection(nodes) || isDOMNode(nodes) ? [nodes] : nodes), (node) => { set.add(node); });
    }

    return set;
  }, new Set()));
}




/**
 * Shortcut function to find(selector, elm, true). Returns the first found element.
 * @param  {String} selector - CSS query selector
 * @param  {HTMLElement} [elm=document] - The HTML Element from where to start the search
 * @return {HTMLElement|NULL} - The found element or null
 */
export function findOne(queries, elm) {
  const vars = check(queries, elm);
  if(!vars) { return null; }

  const { array, multi } = vars;
  [queries, elm] = [vars.queries, vars.elm];

  // If it is not a multi query
  if(!multi) {
    const node = _find(elm, queries, true);
    // Return the found nodes as an Array
    return node ? (!isCollection(node) || isDOMNode(node) ? node : node[0] || null) : null;
  }

  // We have a multiple queries, so first we just try the query selector
  try { return q(elm, array ? queries.join(',') : queries, true); }
  // If the querySelector fails, it could mean we have wildcards or bad selectors
  // in the list, so make sure the queries is an Array som may run through each item
  catch(ex) { queries = array ? queries : queries.split(/\s*,\s/); }

  let node = null, i = 0, max = queries.length;

  // Just return the first found non-null node (or null if none at all was found)
  while(!node && i < max) {
    const query = queries[i++];
    node = _find(elm, query, true);
    if(isCollection(node) && !isDOMNode(node)) { node = node[0] || null; }
  }

  return node;
}
