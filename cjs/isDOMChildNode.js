"use strict";

exports.default = isDOMChildNode;
function isDOMChildNode(elm) {
  return !!(elm && elm.parentNode && elm.parentNode.nodeType === 1);
}