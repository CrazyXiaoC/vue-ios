/* 得到样式表中的属性值 */
export function getStyleSheetAttrVal (target, attribute) {
  return document.defaultView.getComputedStyle(target, null)[attribute]
}