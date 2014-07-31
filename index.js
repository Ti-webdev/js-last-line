(function() {
  "use strict";

  function assertTextNode(node) {
    if (!node instanceof window.Text) {
      throw new Error('Invalid argument. TextNode expected.');
    }
  }

  function getLastLine(textNode) {
    assertTextNode(textNode);

    var parent = textNode.parentNode;
    var height = parent.offsetHeight;
    var result = '';
    var pos = textNode.data.length;
    while(0 < pos && height === parent.offsetHeight) {
      pos--;
      result = textNode.substringData(pos, 1) + result;
      textNode.deleteData(pos, 1);
    }
    textNode.appendData(result);
    return result.replace(/^\s+|\s+$/g, '');
  }

  if ('undefined' !== typeof exports) {
    module.exports = getLastLine;
  } else if (this) {
    this.getLastLine = getLastLine;
  }
}).call(this);
