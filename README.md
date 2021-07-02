# Vanilla JS Browser helpers

[![Build Status](https://github.com/Tokimon/vanillajs-browser-helpers/actions/workflows/validation.yml/badge.svg)](https://github.com/Tokimon/vanillajs-browser-helpers/actions/workflows/validation.yml)
[![Coverage Status](https://coveralls.io/repos/github/Tokimon/vanillajs-browser-helpers/badge.svg?branch=master)](https://coveralls.io/github/Tokimon/vanillajs-browser-helpers?branch=master)
[![install size](https://packagephobia.now.sh/badge?p=vanillajs-browser-helpers)](https://packagephobia.now.sh/result?p=vanillajs-browser-helpers)

This is a collection of simple, no dependency, vanilla JS snippets with the aim
of making it easier to work with vanilla JS.

They is written in ES6, since most of the major browsers support this syntax,
all scripts have however been converted into the Echma Script 5 syntax (without
polyfills) and stored in the `./es5` folder if needed.

Polyfills haven't been included as they exist in abundance on NPM, and since the
need for polyfills are ever diminishing it is more future proof and clutter free
to leave them out.

**GENERAL HELPERS**

These helpers are browser specific, for more general helpers check out:
[vanillajs-helpers](https://github.com/Tokimon/vanillajs-helpers)

## Documentation

Documentation is written in the [Wiki](https://github.com/Tokimon/vanillajs-browser-helpers/wiki)
of the [GitHub repository](https://github.com/Tokimon/vanillajs-browser-helpers), but here below
is an overview of the helpers available.

### Helpers

Method | Description
------ | -----------
[addClass](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/addClass) | Add class to a DOM element
[after](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/after) | Insert HTML or ad DOM element after a DOM element
[append](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/append) | Insert HTML or ad DOM element into the end of a DOM element child list
[attr](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/attr) | Get/set an attribute of a DOM element
[before](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/before) | Insert HTML or ad DOM element before a DOM element
[children](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/children) | Get the direct child DOM elements of a DOM element
[create](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/create) | Creates DOM element from CSS selector
[css](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/css) | Get/set styling of a DOM element
[create](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/create) | Creates a DOM element from a selector (eg. _div#myDiv.some-class_)
[data](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/data) | Get/set value of a data attribute on a DOM element
[delegate](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/delegate) | Bind delegate event(s) to a DOM element  
[domReady](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/domReady) | Bind a handler to the document ready event
[elmIndex](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/elmIndex) | Get the index of a DOM node amongst its siblings
[eventPlus](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/eventPlus) | Sophisticated on/off event bindings:<br>- *Remove all events*<br>- *Event name spacing*<br>- *Delegates*
[find](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/find) | Find method that detect the most efficient find method depending on the query. Also includes certain wildcards.
[findByClass](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/findByClass) | Find DOM elements by class name
[findById](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/findById) | Find DOM element by ID
[findByName](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/findByName) | Find DOM elements by name attribute
[findByQuery](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/findByQuery) | Find DOM elements using CSS query
[findByTagName](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/findByTagName) | Find DOM elements by tag name
[hasClass](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/hasClass) | Detect if a DOM element has a given class
[hidden](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/hidden) | Detect if a DOM element is hidden or not
[inDOM](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/inDOM) | Detect if a DOM element is inserted into the DOM
[inView](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/inView) | Detect if a DOM element is in view on the screen
[invisible](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/invisible) | Detect if a DOM element is invisible or not
[isDOMChildNode](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/isDOMChildNode) | Detect if a DOM element is a child node of another DOM element
[isDOMContainer](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/isDOMContainer) | Detect if a DOM node is a can contain child nodes
[isDocument](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/isDocument) | Detect if a DOM node is the document node
[isDOMElement](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/isDOMElement) | Detect if a DOM node is a DOM element
[isDOMFragment](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/isDOMFragment) | Detect if an object is a document fragment
[isDOMNode](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/isDOMNode) | Detect if a DOM node is actually a DOM node
[isDOMRoot](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/isDOMRoot) | Detect if a DOM node is the root element (body in HTML)
[isWindow](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/isWindow) | Detect if an Object is a window object
[matches](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/matches) | Detect if a DOM node match a given CSS selector
[off](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/off) | Remove event handler from a DOM element
[on](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/on) | Add event handler to a DOM element
[once](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/once) | Add a single fire event handler to a DOM element
[position](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/position) | Get the position of a DOM element
[prefixed](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/prefixed) | Prefixes a name with vendor prefixes (webkit, moz, ms, o)
[prepend](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/prepend) | Insert HTML or ad DOM element into the beginning of a DOM element child list
[remove](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/remove) | Remove a given DOM element from the DOM
[removeClass](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/removeClass) | Remove a given class name from a DOM element
[replace](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/replace) | Replace a given DOM element with another
**scrollBy** | Scroll page or given DOM element by x number of pixels left/right
**scrollInfo** | Get information about current window or DOM element scroll positions (includes percentage scrolled)
**scrollParent** | Get the current DOM elements scrolling parent
**scrollTo** | Scroll page or given DOM element to given x and y coordinate
[siblings](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/siblings) | Get the siblings of a DOM element
[size](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/size) | Get the size of a DOM element
**supportsCSS** | Detects whether the current browser supports a given CSS prop and/or value
[toDOM](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/toDOM) | Convert a HTML string into DOM element(s)
[toggleClass](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/toggleClass) | Toggle a class from a DOM element
[trigger](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/trigger) | Trigger an event handler on a DOM element
[viewport](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/viewport) | Get the current viewport area
[visible](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/visible) | Detect if a DOM element is visible or not

## Installation

```
npm install vanillajs-browser-helpers
```

## Usage

```js
// ES 6
import append from 'vanillajs-browser-helpers/append';
append('<div class="child-element"></div>');
```

```js
// ES 5
var append = require('vanillajs-browser-helpers/es5/append').default;
append('<div class="child-element"></div>');
```

## Something missing?

If you find any bugs or missing functionality you would like to see included, feel
free to add an issue in the [issue list](https://github.com/Tokimon/vanillajs-browser-helpers/issues)
or perhaps do a [Pull Request](https://github.com/Tokimon/vanillajs-browser-helpers/pulls)
of a great snippet you created.

## Testing

Check out the [Testing docs](https://github.com/Tokimon/vanillajs-browser-helpers/wiki/testing)
