/* global  describe, it, before, beforeEach, after, afterEach */

import { expect, use } from 'chai';
import chaiDom from 'chai-dom';
import sinonChai from 'sinon-chai';


// --- Chai setup ---
use(chaiDom);
use(sinonChai);
export { expect };

// --- Mocha exports ---
const { describe, it, before, beforeEach, after, afterEach } = window;
export { describe, it, before, beforeEach, after, afterEach };

// --- Sinon exports ---
export { spy, stub, fake, match as sinonMatch } from 'sinon';



// --- Test Utils ---
function _createEvent(eventName, data) {
  if ('CustomEvent' in window) {
    return new window.CustomEvent(eventName, { detail: data, bubbles: true });
  } else {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(eventName, true, true, data);
    return evt;
  }
}

export const helpers = {
  id(id) { return document.getElementById(id); },

  query(query, elm) { return (elm || document).querySelectorAll(query); },

  remove(id, elm) { try { (elm || document.body).removeChild(id); } catch (ex) { /* Fail silently */ } },

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
