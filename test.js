var formatString = require('./index.js'),
    assert = require('assert');

describe('format-string', function() {
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
        var obj = {
            prop: 'value'
        };
        assert.equal(formatString(':prop', obj), 'value');
    });
});
