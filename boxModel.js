export default function boxModel(elm) {
  const style = window.getComputedStyle(elm);

  return {
    margin: {
      top: parseInt(style.marginTop, 10),
      left: parseInt(style.marginLeft, 10),
      bottom: parseInt(style.marginBottom, 10),
      right: parseInt(style.marginRight, 10)
    },

    padding: {
      top: parseInt(style.paddingTop, 10),
      left: parseInt(style.paddingLeft, 10),
      bottom: parseInt(style.paddingBottom, 10),
      right: parseInt(style.paddingRight, 10)
    },

    border: {
      top: parseInt(style.borderTopWidth, 10),
      left: parseInt(style.borderLeftWidth, 10),
      bottom: parseInt(style.borderBottomWidth, 10),
      right: parseInt(style.borderRightWidth, 10)
    }
  };
}
