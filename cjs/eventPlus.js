Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventListId = eventListId;
exports.getEvents = getEvents;
exports.default = on;
exports.off = off;

var _iterate = require('vanillajs-helpers/iterate');

var _iterate2 = _interopRequireDefault(_iterate);

var _eachWord = require('vanillajs-helpers/eachWord');

var _eachWord2 = _interopRequireDefault(_eachWord);

var _randomId = require('vanillajs-helpers/randomId');

var _randomId2 = _interopRequireDefault(_randomId);

var _isFunction = require('vanillajs-helpers/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isString = require('vanillajs-helpers/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('vanillajs-helpers/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _on2 = require('./on');

var _on3 = _interopRequireDefault(_on2);

var _off2 = require('./off');

var _off3 = _interopRequireDefault(_off2);

var _delegate = require('./delegate');

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The registry of bound events
// (necessary for advanced event handling)
const events = new Map();

/**
 * Find the elements event binding id
 * @param  {HTMLElement} elm - DOM element to get the ID from
 * @return {String} - The elements event binding ID
 */
function eventListId(elm) {
  if (!elm || !(0, _isFunction2.default)(elm.addEventListener) || !(0, _isFunction2.default)(elm.removeEventListener)) {
    return null;
  }

  // On non DOM elements (like window or document) we set a property instead of
  // using the data-eventlistid attribute
  let id = (0, _data2.default)(elm, 'eventlistid');
  const noData = id === false;

  if (noData) {
    id = elm._eventlistid;
  }
  if (id) {
    return id;
  }

  id = (0, _randomId2.default)(10);

  if (noData) {
    elm._eventlistid = id;
  } else {
    (0, _data2.default)(elm, 'eventlistid', id);
  }

  return id;
}

/**
 * Find all bound events on a DOM element
 * (found from custom cache that only works if the handlers have been bound via
 * the 'on' method)
 * @param  {HTMLElement} elm - DOM element events are bound to
 * @return {Object} - Object containing all events bound to the element
 */
function getEvents(elm) {
  const elmid = eventListId(elm);
  if (!elmid) {
    return null;
  }
  if (!events.has(elmid)) {
    events.set(elmid, new Map());
  }
  return events.get(elmid);
}

// Internal method to trigger all bound handlers to an event
function triggerHandlers(e, handlers = [], target = e.target) {
  (0, _iterate2.default)(handlers, handler => {
    if (handler.call(target, e) === false) {
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

  if (!evts) {
    return;
  }

  const { handlers, delegates } = evts;

  // Normal handlers use the 'currentTarget' as the element
  triggerHandlers(e, handlers, e.currentTarget);
  // Delegates look at the target of the event to determine whether the element
  // should trigger the event handler or not
  if (delegates.size > 0) {
    triggerHandlers(e, Array.from(delegates.values()).map(obj => obj.cb));
  }
}

// Internal helper function to iterate each part of a namespaced event name
function eachEventNamespace(evtName, cb) {
  evtName.split('.').reduce((evt, part) => {
    evt = evt ? `${ evt }.${ part }` : part;
    cb(evt);
    return evt;
  }, '');
}

/**
 * Bind event handler for one or more event names (space separated).
 * (NOTE: in order to enable unbinding of delegates and all handlers for an event,
 * all events ar cached and an event caching id is set on the element via the
 * data-eventlistid or the _eventlistid property)
 * @param  {HTMLElement} elm - DOM element to bind the event to
 * @param  {String|Array<String>} eventNames - Event names to bind the handler to
 * @param  {String} [delegation] - CSS Selector that matches the element(s) to delegate the event to
 * @param  {Function} handler - Handler to bind to the event
 * @return {HTMLElement} - The `elm` DOM element
 */
function on(elm, eventNames, delegation, handler) {
  const evts = getEvents(elm);
  const strEvts = (0, _isString2.default)(eventNames);

  if (!evts || !(strEvts || (0, _isArray2.default)(eventNames))) {
    return elm;
  }

  // If only handler has been given as argument in the place of the delegation
  // selector, correct the variables
  if ((0, _isFunction2.default)(delegation)) {
    [handler, delegation] = [delegation, undefined];
  }
  if (!(0, _isFunction2.default)(handler)) {
    return elm;
  }

  // Delegation handlers has to be stores separately to enable better unbinding control
  // so we check if we are dealing with a delegate
  const isDelegate = (0, _isString2.default)(delegation);
  const itrCb = evtName => {
    // Go through event and namespaces
    eachEventNamespace(evtName, evtNS => {
      // Get the current handlers and push the handler to it
      // NOTE: We use arrays for handler collections over Set(), as functions
      // are treated individually anyway, thus loosing the benefits of using Set()
      const evt = evts.get(evtNS) || { handlers: [], delegates: new Map() };

      if (!isDelegate) {
        // No delegate handlers we just add to the 'handlers' collection
        evt.handlers.push(handler);
      } else {
        // Delegates will have to be stored, with the selector and a callback function
        // that triggers all the handlers if the delegation element is the correct one
        const delegate = evt.delegates.get(delegation) || {
          // CB is a delegation handler that triggers all the stored handlers
          // if the delegation selector is met
          cb: (0, _delegate.delegateHandler)(delegation, e => triggerHandlers(e, delegate.handlers)),
          handlers: []
        };

        // Add handler to the delegate
        delegate.handlers.push(handler);
        evt.delegates.set(delegation, delegate);
      }

      // Bind the event if it is the first handler for this event
      if (!evts.has(evtNS)) {
        (0, _on3.default)(elm, evtNS, callback);
      }

      // Make sure the events are stored
      evts.set(evtNS, evt);
    });
  };

  if (strEvts) {
    (0, _eachWord2.default)(eventNames, itrCb);
  } else {
    (0, _iterate2.default)(eventNames, itrCb);
  }

  return elm;
}

/**
 * Unbinds events for the given element. If no handler function is defined it
 * removes all handlers for the given events. If no event names has been defined
 * it removes all events bound to the element.
 * (in order to remove all handlers on the element, all handlers must have been
 * bound via the 'on' method)
 * @param  {HTMLElement} elm - DOM element to unbind the event from
 * @param  {String|Array<String>} [eventNames] - Event names to unbind the handler from
 * @param  {String} [delegation] - Delegation selector to unbind
 * @param  {Function} [handler] - Handler to remove from the event
 * @return {HTMLElement} - the 'elm'
 */
function off(elm, eventNames, delegation, handler) {
  const evts = getEvents(elm);
  if (!evts) {
    return elm;
  }

  const strEvts = (0, _isString2.default)(eventNames);

  // If no events have been given, remove all event listeners
  if (!strEvts && !(0, _isArray2.default)(eventNames)) {
    evts.forEach((evtObj, evtName) => (0, _off3.default)(elm, evtName, callback));
    evts.clear();
    return elm;
  }

  // If only handler has been given as argument in the place of the delegation
  // selector, correct the variables
  if ((0, _isFunction2.default)(delegation)) {
    [handler, delegation] = [delegation, undefined];
  }

  const removeAll = !(0, _isFunction2.default)(handler);
  const removeDelegate = (0, _isString2.default)(delegation);

  const itrCb = evtName => {
    // Go through event and namespaces
    eachEventNamespace(evtName, evtNS => {
      const evt = evts.get(evtNS);
      if (!evt) {
        return;
      }

      if (!removeDelegate) {
        evt.handlers = removeAll ? [] : evt.handlers.filter(h => h !== handler);
        // If we are removing all event handlers, we remove delegations as well
        if (removeAll) {
          evt.delegates.clear();
        }
      } else {
        const delegate = evt.delegates.get(delegation);
        if (!delegate) {
          return;
        }

        // Remove all handers or a single specific handler from the delegation
        delegate.handlers = removeAll ? [] : delegate.handlers.filter(h => h !== handler);
        // If there are no handlers left, remove the delegation cache.
        if (delegate.handlers.length === 0) {
          evt.delegates.delete(delegation);
        }
      }

      // If there are no more handlers, remove all
      if (evt.handlers.length === 0 && evt.delegates.size === 0) {
        evts.delete(evtNS);
        (0, _off3.default)(elm, evtNS, callback);
      }
    });
  };

  if (strEvts) {
    (0, _eachWord2.default)(eventNames, itrCb);
  } else {
    (0, _iterate2.default)(eventNames, itrCb);
  }

  return elm;
}