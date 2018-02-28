import isFunction from 'vanillajs-helpers/isFunction';
import isString from 'vanillajs-helpers/isString';
import isObject from 'vanillajs-helpers/isObject';

import isDOMNode from './isDOMNode';
import isWindow from './isWindow';

import _on, { propsSupported } from './on';
import _off from './off';



/**
 * Build an event binder that will bind event handlers that are triggered only once
 * @function onceBuilder
 * @param {Function} on - The method to use bind event handlers
 * @param {Function} off - The method to use to remove event handlers
 * @return {Function} The single fire event binder function
 */
export function onceBuilder(on, off) {
  if(!isFunction(on)) { on = _on; }
  if(!isFunction(off)) { off = _off; }

  return (elm, eventNames, handler, options) => {
    if(isString(elm)) {
      [elm, eventNames, handler, options] = [document, elm, eventNames, handler];
    }

    if(!isFunction(handler)) { return null; }

    if(!isDOMNode(elm) && !isWindow(elm)) { elm = document; }
    if(!isObject(options)) { options = { capture: !!options }; }

    let _one = handler;
    options.once = true;

    if(!propsSupported) {
      _one = function(e) {
        off(elm, e.type, _one);
        return handler.call(this, e);
      };
    }

    on(elm, eventNames, _one, options);

    return _one;
  };
}



/**
 * Bind a single fire event handler for one or more event names on a DOM element.
 * @function once
 * @param {HTMLElement} elm - DOM element to unbind the event from
 * @param {String|String[]} eventNames - Event names to bind the handler to
 * @param {Function} handler - Handler to bind to the event
 * @return {Function} The single fire event handler (so it may be removed again)
 */
const once = onceBuilder();
export default once;
