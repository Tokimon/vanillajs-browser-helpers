import isString from 'vanillajs-helpers/isString';
import isArray from 'vanillajs-helpers/isArray';
import isFunction from 'vanillajs-helpers/isFunction';
import isObject from 'vanillajs-helpers/isObject';

import isEventTarget from './isEventTarget';
import eventOptionsSupported from './eventOptionsSupported';
import on from './on';
import off from './off';



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
function once(elm, eventNames, handler, options) {
  if (isArray(elm) || isString(elm)) {
    [elm, eventNames, handler, options] = [document, elm, eventNames, handler];
  }

  if (!isEventTarget(elm)) { elm = document; }
  if (isString(eventNames)) { eventNames = [eventNames]; }

  if (!isFunction(handler) || !isArray(eventNames)) {
    return null;
  }

  let eventHandler = handler;

  if (!isObject(options)) { options = { capture: !!options }; }

  const noOptions = !eventOptionsSupported();
  let { when, ...eventOptions } = options;
  const hasWhen = isFunction(when);
  eventOptions.once = !hasWhen;

  if (hasWhen || noOptions) {
    const offHandler = (e) => {
      if (hasWhen && when() !== true) { return true; }
      off(elm, e.type, offHandler);
      return handler(e);
    };

    eventHandler = offHandler;
  }

  if (noOptions) {
    eventOptions = eventOptions.capture === true;
  }

  on(elm, eventNames, eventHandler, eventOptions);

  return eventHandler;
}

export default once;
