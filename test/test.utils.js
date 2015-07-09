var assert = chai.assert;
suite('utils', function() {
  suite('#getSite(url)', function() {
    test('parse http', function() {
      assert.equal('korrespondent.net', getSite('http://korrespondent.net/'));
    });
    test('parse https', function() {
      assert.equal('2ch.hk', getSite('https://2ch.hk/ukr/'));
    });
    test('doesnt end with slash', function() {
      assert.equal('ya.ru', getSite('http://ya.ru'));
    });
    test('more than one level', function() {
      assert.equal('mysite', getSite('http://mysite/level1/level2/index.html'));
    });
  });
  suite('#toTimeString(d)', function() {
    test('10:01', function() {
      assert.equal('10:01', toTimeString((10*60+1)*1000));
    });
    test('5:59', function() {
      assert.equal('5:59', toTimeString((5*60+59)*1000));
    });
  });
});
