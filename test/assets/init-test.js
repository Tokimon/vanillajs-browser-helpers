/* global chai */

var expect = chai.expect;

var $ = (function(win, doc) {
  function _id(id) { return doc.getElementById(id); }
  function _query(query, elm) { return (elm || doc).querySelectorAll(query); }
  function _remove(id, elm) { try { (elm || doc.body).removeChild(_id(id)); } catch(ex) { /* Fail silently */ } }
  function _create(tagName) { return document.createElement(tagName); }
  function _html(html, elm) { (elm || doc.body).insertAdjacentHTML('beforeend', html); }

  function _createEvent(eventName, data) {
    if(typeof win.CustomEvent === 'function') {
      return new win.CustomEvent(eventName, { detail: data, bubbles: true });
    } else {
      var evt = doc.createEvent('CustomEvent');
      evt.initCustomEvent(eventName, true, true, data);
      return evt;
    }
  }

  function _trigger(eventName, elm) {
    (elm || doc).dispatchEvent(_createEvent(eventName));
  }

  function _on(elm, evt, handler) {
    elm.addEventListener(evt, handler, false);
  }

  function _off(elm, evt, handler) {
    elm.removeEventListener(evt, handler, false);
  }

  return {
    id: _id,
    query: _query,
    remove: _remove,
    create: _create,
    html: _html,
    trigger: _trigger,
    on: _on,
    off: _off
  };
})(window, document);
