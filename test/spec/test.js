it("has valid last line text", function () {
  var table = {
    a: "счастливой жизни.",
    b: "которого я бы назвал зодчим счастливой жизни.",
    c: "наслаждение."
  };
  Object.keys(table).forEach(function(id) {
    var expected = table[id];
    var el = document.getElementById(id);
    getLastLine(el.firstChild).should.equal(expected);
  });
});

it("original text not changed", function () {
  var el = document.getElementById('a');
  var expected = el.innerText;
  getLastLine(el.firstChild);
  el.innerText.should.equal(expected);
});