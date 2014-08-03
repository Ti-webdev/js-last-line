describe("has valid last line text", function() {
  var table = {
    a: "жизни.",
    b: "открывший истину, которого я бы назвал зодчим счастливой жизни.",
    c: window.mochaPhantomJS ? "наслаждение." : "немалое наслаждение.",
    d: "b",
    e: "a",
    f: "",
    "break-word": window.mochaPhantomJS ? "ение людей" : "ние людей"
  };

  Object.keys(table).forEach(function(id) {
    var expected = table[id];
    it('#'+id+': '+expected, function () {
      var el = document.getElementById(id);
      getLastLine(el).should.equal(expected);
    });
  });
});

it("original text not changed", function () {
  var el = document.getElementById('a');
  var expected = el.innerText;
  getLastLine(el.firstChild);
  el.innerText.should.equal(expected);
});
