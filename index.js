(function() {
  "use strict";

  function assertTextNode(node) {
    if (!node instanceof window.Text) {
      throw new Error('Invalid argument. TextNode expected.');
    }
  }

  function insertAfter(parentNode, newNode, referenceNode) {
      parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function getLastLine(textNode, helperTagName) {
    assertTextNode(textNode);

    var parentNode = textNode.parentNode;
    var helperNode = document.createElement(helperTagName||'span');
    insertAfter(parentNode, helperNode, textNode);

    var lastLineOffsetTop = null;
    var pos = textNode.length - textNode.data.match(/\s*$/)[0].length;
    var isLastLine = true;
    while(0 < pos && isLastLine) {
      pos--;
      var cutedTextNode = textNode.splitText(pos);
      console.log(cutedTextNode.data);
      insertAfter(parentNode, cutedTextNode, helperNode);

      if (null === lastLineOffsetTop) {
        lastLineOffsetTop = helperNode.offsetTop;
      }
      else {
        isLastLine = helperNode.offsetTop === lastLineOffsetTop;
      }

      textNode.appendData(cutedTextNode.data);
      parentNode.removeChild(cutedTextNode);
    }

    parentNode.removeChild(helperNode);

    return textNode.substringData(pos, textNode.length - pos).replace(/^\s+|\s+$/g, '');
  }

  if ('undefined' !== typeof exports) {
    module.exports = getLastLine;
  } else if (this) {
    this.getLastLine = getLastLine;
  }
}).call(this);
