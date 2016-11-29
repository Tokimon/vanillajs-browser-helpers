'use strict';

exports.default = isWindow;
function isWindow(obj) {
  return !!obj && typeof obj.self !== 'undefined' && obj.self === obj;
}