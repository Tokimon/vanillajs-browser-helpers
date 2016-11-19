# Still under development
The package is still untested and fails on certain script. Working on improving it.

# Vanilla JS helpers
This is a collection of simple, no dependency, vanilla JS snippets with the aim
of making it easier to work with vanilla JS.

They is written in ES6 and the aim is to keep each snippet as simple as possible,
thus giving less focus to cross browser compatibility. Most snippets should work
in at least IE 9 (after conversion to ES5), but some use functionality, that might
need to be polyfilled.

Polyfills haven't been included as they exist in abundance on NPM, and since the
need for polyfills are ever diminishing it is more future proof and clutter free
when to leave them out.

## Documentation

Documentation is written in the [Wiki](https://github.com/Tokimon/vanillajs-helpers/wiki)
of the [GitHub repository](https://github.com/Tokimon/vanillajs-helpers), but here below is an overview of the helpers available.

### Helpers

- [after](https://github.com/Tokimon/vanillajs-helpers/wiki/after):
Inserts HTML Element or plain HTML after a given HTML Element
- [append](https://github.com/Tokimon/vanillajs-helpers/wiki/append):
Append HTML Element or plain HTML to the end of a given HTML Element
- [attr](https://github.com/Tokimon/vanillajs-helpers/wiki/attr):
Get/set the value of an attribute on a given HTML Element
- [before](https://github.com/Tokimon/vanillajs-helpers/wiki/before):
Inserts HTML Element or plain HTML before a given HTML Element
- [camelCase](https://github.com/Tokimon/vanillajs-helpers/wiki/camelCase):
Transform a phrase into a camelCased word
- [children](https://github.com/Tokimon/vanillajs-helpers/wiki/children):
Find the children of a given HTML Element
- [className](https://github.com/Tokimon/vanillajs-helpers/wiki/className):
Methods to manipulate class names on a HTML element.
- [css](https://github.com/Tokimon/vanillajs-helpers/wiki/css):
Get/set the styling of a HTML element
- [currencyFormat](https://github.com/Tokimon/vanillajs-helpers/wiki/currencyFormat):
Creates a function that formats a number to a given currency format
- [data](https://github.com/Tokimon/vanillajs-helpers/wiki/data):
Get/set the value of a 'data-' attribute on a given HTML Element
- [elmIndex](https://github.com/Tokimon/vanillajs-helpers/wiki/elmIndex):
Find the index of a HTML element amongst its siblings
- [event](https://github.com/Tokimon/vanillajs-helpers/wiki/event):
Collection of event handling methods (no caching).
- [eventPlus](https://github.com/Tokimon/vanillajs-helpers/wiki/eventPlus):
Collection of event handling methods (with caching).
- [find](https://github.com/Tokimon/vanillajs-helpers/wiki/find):
Find an element in the DOM
- [formatNumber](https://github.com/Tokimon/vanillajs-helpers/wiki/formatNumber):
Formats a number with defined thousand and decimal separator, and a decimal limit
- [hidden](https://github.com/Tokimon/vanillajs-helpers/wiki/hidden):
Test if a given HTML element is hidden
- [htmlToDom](https://github.com/Tokimon/vanillajs-helpers/wiki/htmlToDom):
Convert HTML into DOM node(s)
- [inView](https://github.com/Tokimon/vanillajs-helpers/wiki/inView):
Determines whether the element is in the area of the viewport or not
- [isArray](https://github.com/Tokimon/vanillajs-helpers/wiki/isArray):
Indicates whether the object is an Array or not
- [isBoolean](https://github.com/Tokimon/vanillajs-helpers/wiki/isBoolean):
Indicates whether the object is a Boolean or not
- [isFunction](https://github.com/Tokimon/vanillajs-helpers/wiki/isFunction):
Indicates whether the object is a Function or not
- [isString](https://github.com/Tokimon/vanillajs-helpers/wiki/isString):
Indicates whether the object is a String or not
- [iterable](https://github.com/Tokimon/vanillajs-helpers/wiki/iterable):
Transform an Array into an iterable object
- [iterate](https://github.com/Tokimon/vanillajs-helpers/wiki/iterate):
Iterate over an iteratable object
- [limitDecimals](https://github.com/Tokimon/vanillajs-helpers/wiki/limitDecimals)
Limit decimals of a floating number to specified length
- [matches](https://github.com/Tokimon/vanillajs-helpers/wiki/matches)
Determines whether or not a HTML Element matches a given CSS selector
- [objectType](https://github.com/Tokimon/vanillajs-helpers/wiki/objectType):
Returns the type of an object
- [pascalCase](https://github.com/Tokimon/vanillajs-helpers/wiki/pascalCase):
Transform a phrase into a PascalCased word
- [position](https://github.com/Tokimon/vanillajs-helpers/wiki/position):
Finds the current position of a HTML Element or window
- [prefixed](https://github.com/Tokimon/vanillajs-helpers/wiki/prefixed):
Adds vendor prefixes to a string
- [prepend](https://github.com/Tokimon/vanillajs-helpers/wiki/prepend):
Append HTML Element or plain HTML to the beginning of a given HTML Element
- [randomId](https://github.com/Tokimon/vanillajs-helpers/wiki/randomId):
Generate a random id of the desired length
- [removeElm](https://github.com/Tokimon/vanillajs-helpers/wiki/removeElm):
Remove a given HTML Element from the DOM
- [replaceElm](https://github.com/Tokimon/vanillajs-helpers/wiki/replaceElm):
Replace a given HTML Element with another HTML Element or plain HTML string
- [scroll](https://github.com/Tokimon/vanillajs-helpers/wiki/scroll):
Finds the current position of a HTML Element or window.
- [siblings](https://github.com/Tokimon/vanillajs-helpers/wiki/siblings):
Methods to find a HTML siblings
- [size](https://github.com/Tokimon/vanillajs-helpers/wiki/size):
Finds the size of a HTML Element or the window
- [viewport](https://github.com/Tokimon/vanillajs-helpers/wiki/viewport):
The HTML element determined as the viewport element
- [visible](https://github.com/Tokimon/vanillajs-helpers/wiki/visible):
Test if a given HTML element is visible (as in viewable) for the user.

## Something missing?

If you find any bugs or missing functionality you would like to see included, feel
free to add an issue in the [issue list](https://github.com/Tokimon/vanillajs-helpers/issues) or perhaps do a
[PR](https://github.com/Tokimon/vanillajs-helpers/pulls) of a great snippet you created.
