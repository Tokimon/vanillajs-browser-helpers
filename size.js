import isWindow from './isWindow';
import isDOMChildNode from './isDOMChildNode';
import viewport from './viewport';
import boxModel from './boxModel';



// Size Types
const MARGIN_BOX = 'size.margin';
const OUTER = 'size.outer';
const INNER = 'size.inner';
const CONTENT_BOX = 'size.contentbox';
const CONTENT = 'size.content';



/**
 * The different type of sizes to compute on an element
 * @type {Object}
 * @property {String} MARGIN_BOX - Size including margins and borders
 * @property {String} OUTER - Size including borders
 * @property {String} INNER - Size excluding borders and margins
 * @property {String} CONTENT - Size of the content (scrollable area minus padding)
 * @property {String} CONTENT_BOX - Size excluding borders, margins and padding
 */
export const sizeType = { MARGIN_BOX, OUTER, INNER, CONTENT, CONTENT_BOX };



export function elmSize(elm, type) {
  const {
    offsetWidth,
    offsetHeight,
    clientWidth,
    clientHeight
  } = elm;

  if (type === OUTER) {
    return { width: offsetWidth, height: offsetHeight };
  }

  if (type === INNER) {
    return { width: clientWidth, height: clientHeight };
  }

  if (type === CONTENT) {
    const { scrollWidth, scrollHeight } = elm;
    const { padding } = boxModel(elm);

    return {
      width: scrollWidth - padding.left,
      height: scrollHeight - padding.top
    };
  }

  if (type === MARGIN_BOX) {
    const { margin } = boxModel(elm);

    return {
      width: offsetWidth + margin.left + margin.right,
      height: offsetHeight + margin.top + margin.bottom
    };
  }

  if (type === CONTENT_BOX) {
    const { padding } = boxModel(elm);

    return {
      width: clientWidth - padding.left - padding.right,
      height: clientHeight - padding.top - padding.bottom
    };
  }
}



export function windowSize(type) {
  if (type === MARGIN_BOX || type === CONTENT_BOX || type === INNER || type === CONTENT) {
    return elmSize(viewport(), type);
  }

  return { width: window.outerWidth, height: window.outerHeight };
}



/**
 * @typedef {Object} SizeData
 * @property {Number} width - The width of the element
 * @property {Number} height - The height of the element
 */

/**
 * Find the size of a DOM element or window.
 *
 * @function size
 * @param {HTMLElement|window} elm - The DOM element (or window) to find the size of
 * @param {String} type - What type of size has to be computed. See `sizeType` for further details
 * @return {SizeData} Object describing width and height of the element
 */
export default function size(elm, type = OUTER) {
  return isWindow(elm)
    ? windowSize(type)
    : isDOMChildNode(elm) ? elmSize(elm, type) : null;
}



/**
 * Find the size of a DOM element or window including margins and borders
 *
 * @function marginBoxSize
 * @param  {HTMLElement|window} elm - The DOM element (or window) to find the size of
 * @return {SizeData} Object describing width and height of the element
 */
export const marginBoxSize = (elm) => size(elm, MARGIN_BOX);



/**
 * Find the size of a DOM element or window including borders
 *
 * @function outerSize
 * @param  {HTMLElement|window} elm - The DOM element (or window) to find the size of
 * @return {SizeData} Object describing width and height of the element
 */
export const outerSize = (elm) => size(elm, OUTER);



/**
 * Find the size of a DOM element or window excluding borders and margins
 * @function innerSize
 * @param  {HTMLElement|window} elm - The DOM element (or window) to find the size of
 * @return {SizeData} Object describing width and height of the element
 */
export const innerSize = (elm) => size(elm, INNER);



/**
 * Find the size of the content (scrollable area minus padding) of a DOM element or window
 *
 * @function contentSize
 * @param  {HTMLElement|window} elm - The DOM element (or window) to find the size of
 * @return {SizeData} Object describing width and height of the element
 */
export const contentSize = (elm) => size(elm, CONTENT);



/**
 * Find the size of a DOM element or window excluding borders, margins and padding
 *
 * @function contentBoxSize
 * @param  {HTMLElement|window} elm - The DOM element (or window) to find the size of
 * @return {SizeData} Object describing width and height of the element
 */
export const contentBoxSize = (elm) => size(elm, CONTENT_BOX);
