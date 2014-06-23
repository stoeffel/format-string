var formatString = require('./index.js'),
  assert = require('assert');

describe('format-string', function() {
  var obj, day;
  beforeEach(function() {
    day = new Date(2014, 11, 30);
    obj = {
      prop: 'value',
      upper: 'VALUE',
      lower: 'value',
      another: 42,
      ohNoADate: day
    };
  });

  it('should return the initial string', function() {
    assert.equal(formatString('Hello, world!'), 'Hello, world!');
  });

  it('should return an empty string if none given', function() {
    assert.equal(formatString(), '');
  });

  it('should return a string if none given', function() {
    assert.equal(formatString(10), '10');
    assert.equal(formatString(0), '0');
  });

  it('should replace a prefixed property with its value', function() {
    assert.equal(formatString(':prop', obj), 'value');
    assert.equal(formatString(':another', obj), '42');
    assert.equal(formatString(':prop = :another', obj), 'value = 42');
    assert.equal(formatString(':prop:another', obj), 'value42');
    assert.equal(formatString(':property', obj), 'valueerty');
  });

  it('should replace every appearence', function() {
    assert.equal(formatString(':prop:prop:prop', obj), 'valuevaluevalue');
    assert.equal(formatString(':another', obj), '42');
    assert.equal(formatString(':prop = :another', obj), 'value = 42');
    assert.equal(formatString(':prop:another', obj), 'value42');
    assert.equal(formatString(':property', obj), 'valueerty');
  });

  it('should replace dates with a formated date', function() {
    assert.equal(formatString(':ohNoADate', obj), '30.12.2014');
  });

  it('should formate dates using a given format', function() {
    assert.equal(formatString(':ohNoADate', obj, {
      dateFormat: 'DD-MM-YY'
    }), '30-12-14');
  });

  it('shouldn\'t replace a prefixed property if the object doesn\'t own it', function() {
    assert.equal(formatString(':nope', obj), ':nope');
    assert.equal(formatString(':value'), ':value');
  });

  it('should be possible to change the prefix', function() {
    assert.equal(formatString('$prop', obj, {
      prefix: '$'
    }), 'value');
  });


  it('should return the value in lowercase', function() {
    assert.equal(formatString(':upper{lower}', obj), 'value');
    assert.equal(formatString(':upper{lower}lowered', obj), 'valuelowered');
    assert.equal(formatString(':upper{lower}lowered', obj), 'valuelowered');
    assert.equal(formatString(':upperX{lower}', obj), 'VALUEX{lower}');
    assert.equal(formatString(':upper {lower}', obj), 'VALUE {lower}');
    assert.equal(formatString(':upper{lower} :upper:upper{lower}', obj), 'value VALUEvalue');
  });

  it('should return the value in uppercase', function() {
    assert.equal(formatString(':lower{upper}', obj), 'VALUE');
    assert.equal(formatString(':lower{upper}lowered', obj), 'VALUElowered');
    assert.equal(formatString(':lower{upper}lowered', obj), 'VALUElowered');
    assert.equal(formatString(':lowerX{upper}', obj), 'valueX{upper}');
    assert.equal(formatString(':lower {upper}', obj), 'value {upper}');
  });
});
