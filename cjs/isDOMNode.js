"use strict";

exports.default = isDOMNode;
function isDOMNode(obj) {
  return !!(obj && obj.nodeType);
}