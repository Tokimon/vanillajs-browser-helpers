import isFunction from 'vanillajs-helpers/isFunction';
import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';
import isObject from 'vanillajs-helpers/isObject';

import eventOptionsSupported from './eventOptionsSupported';
import _on from './on';
import _off from './off';



/**
 * Build an event binder that will bind event handlers that are triggered only once
 * @function onceBuilder
 * @param {Function} on - The method to use bind event handlers
 * @param {Function} off - The method to use to remove event handlers
 * @return {Function} The single fire event binder function
 */
export function onceBuilder({ on = _on, off = _off } = {}) {
  const optionsSupported = eventOptionsSupported();

  return (elm, eventNames, handler, options) => {
    if(!elm) { elm = document; }

    if(isString(elm) || isArray(elm)) {
      [elm, eventNames, handler, options] = [document, elm, eventNames, handler];
    }

    if(!isFunction(handler) || !eventNames) { return null; }

    const capture = !!options;
    if(!isObject(options)) { options = { capture }; }

    const condition = options.when;
    const hasCondition = isFunction(condition);
    options.once = !hasCondition;

    if(!optionsSupported) { options = capture; }

    const offHandler = (e) => {
      if(hasCondition && condition() !== true) { return true; }
      off(elm, e.type, offHandler);
      return handler(e);
    };

    const eventHandler = hasCondition || !optionsSupported
      ? offHandler
      : handler;

    on(elm, eventNames, eventHandler, options);

    return eventHandler;
  };
}



/**
 * Bind a single fire event handler for one or more event names on a DOM element.
 * @function once
 * @param {HTMLElement} elm - DOM element to unbind the event from
 * @param {String|String[]} eventNames - Event names to bind the handler to
 * @param {Function} handler - Handler to bind to the event
 * @param {object} options - Event binding options
 * @param {Function} options.when - Function to determine if the handler (and removal) should be triggered
 * @return {Function} The single fire event handler (so it may be removed again before trigger)
 */
const once = onceBuilder();
export default once;
