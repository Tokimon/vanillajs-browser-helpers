import indexLoop from 'vanillajs-helpers/indexLoop';
import words from 'vanillajs-helpers/eachWord';
import randomId from 'vanillajs-helpers/randomId';
import isFunction from 'vanillajs-helpers/isFunction';
import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';

import isDOMNode from './isDOMNode';
import isWindow from './isWindow';

import _on from './on';
import _off from './off';
import { delegateHandler } from './delegate';
import data from './data';



const events = new Map();



/**
 * Find the elements event binding id
 * @function eventListId
 * @param {HTMLElement} elm - DOM element to get the ID from
 * @return {String} The elements event binding ID
 */
export function eventListId(elm) {
  if(!elm || !isFunction(elm.addEventListener) || !isFunction(elm.removeEventListener)) {
    return null;
  }

  // On non DOM elements (like window or document) we set a property instead of
  // using the data-eventlistid attribute
  let id = data(elm, 'eventlistid');
  const noData = id === false;

  if(noData) { id = elm._eventlistid; }
  if(id) { return id; }

  id = randomId(10);

  if(noData) {
    elm._eventlistid = id;
  } else {
    data(elm, 'eventlistid', id);
  }

  return id;
}



/**
 * Find all bound events on a DOM element
 * (found from custom cache that only works if the handlers have been bound via
 * the 'on' method)
 * @function getEvents
 * @param {HTMLElement} elm - DOM element events are bound to
 * @return {Object} Object containing all events bound to the element
 */
export function getEvents(elm) {
  const elmid = eventListId(elm);
  if(!elmid) { return null; }
  if(!events.has(elmid)) { events.set(elmid, new Map()); }
  return events.get(elmid);
}



// Internal method to trigger all bound handlers to an event
function triggerHandlers(e, handlers = [], target = e.target) {
  indexLoop(handlers, (handler) => {
    if(handler.call(target, e) === false) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  });
}

// Internal function to determine the function to use when event is fired
function callback(e) {
  const elmEvents = getEvents(e.currentTarget);
  const evts = elmEvents ? elmEvents.get(e.type) : null;

  if(!evts) { return; }

  const { handlers, delegates } = evts;

  triggerHandlers(e, handlers, e.currentTarget);
  if(delegates.size > 0) {
    triggerHandlers(e, Array.from(delegates.values()).map((obj) => obj.cb));
  }
}

// Internal helper function to iterate each part of a namespaced event name
function eachEventNamespace(evtName, cb) {
  evtName.split('.').reduce((evt, part) => {
    evt = evt ? `${evt}.${part}` : part;
    cb(evt);
    return evt;
  }, '');
}



/**
 * Bind event handler for one or more event names (space separated).
 * (NOTE: in order to enable unbinding of delegates and all handlers for an event,
 * all events ar cached and an event caching id is set on the element via the
 * data-eventlistid or the _eventlistid property)
 * @function on
 * @param {HTMLElement} [elm=document] - DOM element to bind the event to
 * @param {String|String[]} eventNames - Event names to bind the handler to
 * @param {String} [delegation] - CSS Selector that matches the element(s) to delegate the event to
 * @param {Function} handler - Handler to bind to the event
 * @return {HTMLElement} The `elm` DOM element
 */
export default function on(elm, eventNames, delegation, handler, options) {
  if(isString(elm)) {
    [elm, eventNames, delegation, handler] = [document, elm, eventNames, delegation];
  }

  if(!isDOMNode(elm) && !isWindow(elm)) { elm = document; }
  if(isArray(eventNames)) { eventNames = eventNames.join(); }

  const evts = getEvents(elm);

  if(!evts || !isString(eventNames)) { return elm; }

  if(isFunction(delegation)) { [handler, delegation] = [delegation, undefined]; }
  if(!isFunction(handler)) { return elm; }

  // Delegation handlers has to be stores separately to enable better unbinding control
  const isDelegate = isString(delegation);
  const onEvt = (evtName) => {
    eachEventNamespace(evtName, (evtNS) => {
      // NOTE: We use arrays for handler collections over Set(), as functions
      // are treated individually anyway, thus loosing the benefits of using Set()
      const evt = evts.get(evtNS) || { handlers: [], delegates: new Map() };

      if(!isDelegate) {
        evt.handlers.push(handler);
      } else {
        const delegate = evt.delegates.get(delegation) || {
          cb: delegateHandler(delegation, (e) => triggerHandlers(e, delegate.handlers)),
          handlers: []
        };

        delegate.handlers.push(handler);
        evt.delegates.set(delegation, delegate);
      }

      // Only bind the event if it is the first handler for this event
      if(!evts.has(evtNS)) { _on(elm, evtNS, callback, options); }

      evts.set(evtNS, evt);
    });
  };

  words(eventNames, onEvt, /[, ]+/);

  return elm;
}



/**
 * Unbinds events for the given element. If no handler function is defined it
 * removes all handlers for the given events. If no event names has been defined
 * it removes all events bound to the element.
 * (in order to remove all handlers on the element, all handlers must have been
 * bound via the 'on' method)
 * @function off
 * @param {HTMLElement} [elm=document] - DOM element to unbind the event from
 * @param {String|String[]} [eventNames] - Event names to unbind the handler from
 * @param {String} [delegation] - Delegation selector to unbind
 * @param {Function} [handler] - Handler to remove from the event
 * @return {HTMLElement} the 'elm'
 */
export function off(elm, eventNames, delegation, handler) {
  if(isString(elm)) {
    [elm, eventNames, delegation, handler] = [document, elm, eventNames, delegation];
  }

  if(!isDOMNode(elm) && !isWindow(elm)) { elm = document; }

  const evts = getEvents(elm);
  if(!evts) { return elm; }

  if(isArray(eventNames)) { eventNames = eventNames.join(); }

  // If no events have been given, remove all event listeners
  if(!isString(eventNames)) {
    evts.forEach((evtObj, evtName) => _off(elm, evtName, callback));
    evts.clear();
    return elm;
  }

  if(isFunction(delegation)) { [handler, delegation] = [delegation, undefined]; }

  const removeAll = !isFunction(handler);
  const removeDelegate = isString(delegation);

  const onEvt = (evtName) => {
    eachEventNamespace(evtName, (evtNS) => {
      const evt = evts.get(evtNS);
      if(!evt) { return; }

      if(!removeDelegate) {
        evt.handlers = removeAll ? [] : evt.handlers.filter((h) => h !== handler);
        if(removeAll) { evt.delegates.clear(); }
      } else {
        const delegate = evt.delegates.get(delegation);
        if(!delegate) { return; }

        delegate.handlers = removeAll ? [] : delegate.handlers.filter((h) => h !== handler);
        if(delegate.handlers.length === 0) { evt.delegates.delete(delegation); }
      }

      // If there are no more handlers, remove all
      if(evt.handlers.length === 0 && evt.delegates.size === 0) {
        evts.delete(evtNS);
        _off(elm, evtNS, callback);
      }
    });
  };

  words(eventNames, onEvt, /[, ]+/);

  return elm;
}
