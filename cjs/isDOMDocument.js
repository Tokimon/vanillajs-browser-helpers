"use strict";

exports.default = isDOMDocument;
function isDOMDocument(elm) {
  return !!elm && elm.nodeType === 9;
}