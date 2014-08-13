(function() {
  "use strict";

  function getLastLine(node, helperTagName) {
    var block = $(node),
    clone = block.clone()
      .css('visibility', 'hidden')
      .insertAfter(node)
      ,
    wordsArr = clone.text().split(' '),
    lastWordsArr = [],
    blockHeight = clone.height(),
    result = '';

    while (wordsArr.length) {
        lastWordsArr.unshift(wordsArr.pop());
        clone.text(wordsArr.join(' '));

        if (clone.height() < blockHeight) {
            result = lastWordsArr.join(' ').replace(/^\s+|\s+$/g, '');
            break;
        }
    }
    clone.remove();
    return result;
  }

  if ('undefined' !== typeof exports) {
    module.exports = getLastLine;
  } else if (this) {
    this.getLastLine = getLastLine;
  }
}).call(this);
