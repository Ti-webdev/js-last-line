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
    helperNode.style.display = 'inline-block';

    insertAfter(parentNode, helperNode, textNode);

    var lastLineOffsetTop = helperNode.offsetTop;

    var pos = textNode.length;
    var isLastLine = true;
    while(0 < pos && isLastLine) {
      pos--;
      var cutedTextNode = textNode.splitText(pos);
      insertAfter(parentNode, cutedTextNode, helperNode);

      console.log(lastLineOffsetTop, helperNode.offsetTop, cutedTextNode.data);
      isLastLine = helperNode.offsetTop === lastLineOffsetTop;

      textNode.appendData(cutedTextNode.data);
      parentNode.removeChild(cutedTextNode);
    }

    parentNode.removeChild(helperNode);

    console.log('result:', pos, textNode.length);

    return textNode.substringData(pos, textNode.length - pos).replace(/^\s+|\s+$/g, '');
  }

  if ('undefined' !== typeof exports) {
    module.exports = getLastLine;
  } else if (this) {
    this.getLastLine = getLastLine;
  }
}).call(this);
