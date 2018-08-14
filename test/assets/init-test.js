/* global chai, describe, it, before, beforeEach, after, afterEach */


// --- Mocha ---
export const describe = window.describe;
export const it = window.it;
export const before = window.before;
export const beforeEach = window.beforeEach;
export const after = window.after;
export const afterEach = window.afterEach;



// --- Chai expect ---
export const expect = window.chai.expect;



// --- Test Utils ---
function _createEvent(eventName, data) {
  if('CustomEvent' in window) {
    return new window.CustomEvent(eventName, { detail: data, bubbles: true });
  } else {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(eventName, true, true, data);
    return evt;
  }
}

export const testUtils = {
  id(id) { return document.getElementById(id); },
  query(query, elm) { return (elm || document).querySelectorAll(query); },
  remove(id, elm) { try { (elm || document.body).removeChild(_id(id)); } catch(ex) { /* Fail silently */ } },
  create(tagName) { return document.createElement(tagName); },
  html(html, elm) { (elm || document.body).insertAdjacentHTML('beforeend', html); },
  trigger(eventName, elm) {
    (elm || document).dispatchEvent(_createEvent(eventName));
  },
  on(elm, evt, handler) {
    elm.addEventListener(evt, handler, false);
  },
  off(elm, evt, handler) {
    elm.removeEventListener(evt, handler, false);
  }
};
