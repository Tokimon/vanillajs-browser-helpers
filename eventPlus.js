import _on from './on';
import _off from './off';
import { delegateHandler } from './delegate';
import iterate from './iterate';
import words from './eachWord';
import randomId from './randomId';
import data from './data';
import isFunction from './isFunction';
import isString from './isString';
import isArray from './isArray';

// The registry of bound events
// (necessary for advanced event handling)
const events = new Map();




/**
 * Helper funciton to find the elements event binding id
 * @param  {HTMLElement} elm - HTML Element to get the ID from
 * @return {String} - The elements event binding ID
 */
export function eventListId(elm) {
  if(!elm || !isFunction(elm.addEventListener)) { return null; }

  // On non HTML Elements (like window or document) we set a property instead of
  // using the data-eventlistid attribute
  let id = data(elm, 'eventlistid');
  const noData = id === false;

  if(noData) { id = elm._eventlistid; }
  if(id) { return id; }

  id = randomId(10);

  if(noData) { elm._eventlistid = id }
  else { data(elm, 'eventlistid', id) }

  return id;
}




/**
 * Helper function to find all bound events on a HTML element
 * (found from custom cache that only works if the handlers have been bound via
 * the 'on' method)
 * @param  {HTMLElement} elm - HTML Element events are bound to
 * @return {Object} - Object containing all events bound to the element
 */
export function getEvents(elm) {
  const elmid = eventListId(elm);
  if(!elmid) { return null; }
  if(!events.has(elmid)) { events.set(elmid, new Map()); }
  return events.get(elmid);
}




// Internal method to trigger all bound handlers to an event
function triggerHandlers(e, handlers = [], target = e.target) {
  iterate(handlers, (handler) => {
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
  // Normal handlers use the 'currentTarget' as the element
  triggerHandlers(e, handlers, e.currentTarget);
  // Delegates look at the target of the event to determine whether the element
  // should trigger the event handler or not
  if(delegates.size > 0) { triggerHandlers(e, [...delegates.values()].map((obj) => obj.cb)); }
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
 * @param  {HTMLElement} elm - HTML Element to bind the event to
 * @param  {String} eventNames - Space separated string of event names to bind the handler to
 * @param  {String} [delegation] - Optional delegation selector
 * @param  {Function} handler - Handler to bind
 * @return {HTMLElement} - the 'elm'
 */
export default function on(elm, eventNames, delegation, handler) {
  const evts = getEvents(elm);
  const strEvts = isString(eventNames);

  if(!evts || !(strEvts || isArray(eventNames))) { return elm; }

  // If only handler has been given as argument in the place of the delegation
  // selector, correct the variables
  if(isFunction(delegation)) { [handler, delegation] = [delegation, undefined]; }
  if(!isFunction(handler)) { return elm; }

  // Delegation handlers has to be stores separately to enable better unbinding control
  // so we check if we are dealing with a delegate
  const isDelegate = isString(delegation);
  const itrCb = (evtName) => {
    // Go through event and namespaces
    eachEventNamespace(evtName, (evtNS) => {
      // Get the current handlers and push the handler to it
      // NOTE: We use arrays for handler collections over Set(), as functions
      // are treated individually anyway, thus loosing the benefits of using Set()
      const evt = evts.get(evtNS) || { handlers: [], delegates: new Map() };

      if(!isDelegate) {
        // No delegate handlers we just add to the 'handlers' collection
        evt.handlers.push(handler);
      } else {
        // Delegates will have to be stored, with the selector and a callback function
        // that triggers all the handlers if the delegation element is the correct one
        const delegate = evt.delegates.get(delegation) || {
          // CB is a delegation handler that triggers all the stored handlers
          // if the delegation selector is met
          cb: delegateHandler(delegation, (e) => { triggerHandlers(e, delegate.handlers); }),
          handlers: []
        };

        // Add handler to the delegate
        delegate.handlers.push(handler);
        evt.delegates.set(delegation, delegate);
      }

      // Bind the event if it is the first handler for this event
      if(!evts.has(evtNS)) { _on(elm, evtNS, callback); }

      // Make sure the events are stored
      evts.set(evtNS, evt);
    });
  };

  if(strEvts) { words(eventNames, itrCb); }
  else { iterate(eventNames, itrCb); }

  return elm;
}




/**
 * Unbinds events (space separated string) for the given element. If no handler
 * function is defined it removes all handlers for the given events. If no event
 * names has been defined it removes all events bound to the element.
 * (in order to remove all handlers on the element, all handlers must have been
 * bound via the 'on' method)
 * @param  {HTMLElement} elm - HTML Element to unbind the event from
 * @param  {String} [eventNames] - Space separated string of event names to unbind the handler from
 * @param  {String} [delegation] - Delegation selector to unbind
 * @param  {Function} [handler] - Handler to remove
 * @return {HTMLElement} - the 'elm'
 */
export function off(elm, eventNames, delegation, handler) {
  const evts = getEvents(elm);
  if(!evts) { return elm; }

  const strEvts = isString(eventNames);

  // If no events have been given, remove all event listeners
  if(!strEvts && !isArray(eventNames)) {
    evts.forEach((evtObj, evtName) => _off(elm, evtName, callback));
    evts.clear();
    return elm;
  }

  // If only handler has been given as argument in the place of the delegation
  // selector, correct the variables
  if(isFunction(delegation)) { [handler, delegation] = [delegation, undefined]; }

  const removeAll = !isFunction(handler);
  const removeDelegate = isString(delegation);
  const itrCb = (evtName) => {
    // go through event and namespaces
    eachEventNamespace(evtName, (evtNS) => {
      const evt = evts.get(evtNS);
      if(!evt) { return; }

      if(!removeDelegate) {
        evt.handlers = removeAll ? [] : evt.handlers.filter((h) => h !== handler);
        // If we are removing all event handlers, we remove delegations as well
        if(removeAll) { evt.delegates.clear(); }
      } else {
        const delegate = evt.delegates.get(delegation);
        if(!delegate) { return; }

        // Remove all handers or a single specific handler from the delegation
        delegate.handlers = removeAll? [] : delegate.handlers.filter((h) => h !== handler);
        // If there are no handlers left, remove the delegation cache.
        if(delegate.handlers.length === 0) { evt.delegates.delete(delegation); }
      }

      // If there are no more handlers, remove all
      if(evt.handlers.length === 0 && evt.delegates.size === 0) {
        evts.delete(evtNS);
        _off(elm, evtNS, callback);
      }
    });
  };

  if(strEvts) { words(eventNames, itrCb); }
  else { iterate(eventNames, itrCb); }

  return elm;
}
