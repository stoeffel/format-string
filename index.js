var moment = require('moment'),
  formatFunctions = {
    lower: toLowerCase,
    upper: toUpperCase
  },
  prefix, dateFormat;

module.exports = function(theString, theObject, config) {
  config = config || {};
  prefix = config.prefix || ':';
  dateFormat = config.dateFormat || 'DD.MM.YYYY';
  theString = (typeof theString === 'undefined') ? '' : String(theString);
  theObject = theObject || {};

  Object.keys(theObject).forEach(function(key) {
    if (isFunction(theObject[key])) {
      formatFunctions[key] = theObject[key];
    }
  });

  Object.keys(theObject).forEach(function(key) {
    var value = getValue(theObject, key),
      prefixedKey = prefix + key,
      needleFunction = createFunctionRegExp(prefixedKey),
      needle, replace, matchedFunction;

    while (hasPrefixed(theString, prefixedKey)) {
      needle = prefixedKey;
      matchedFunction = needleFunction.exec(theString);

      replace = value;
      if (matchedFunction) {
        if (formatFunctions[matchedFunction[1]]) {
          replace = formatFunctions[matchedFunction[1]](value);
          needle = prefixedKey + '{' + matchedFunction[1] + '}';
        }
      }

      theString = theString.replace(needle, replace);
    }
  });
  return theString;
};

function isFunction(value) {
  return typeof value === 'function';
}

function isDate(value) {
  return value instanceof Date;
}

function formatDate(value) {
  return moment(value).format(dateFormat);
}

function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function toLowerCase(string) {
  return string.toLowerCase();
}

function toUpperCase(string) {
  return string.toUpperCase();
}

function hasPrefixed(string, prefixedKey) {
  return string.match(escapeRegExp(prefixedKey));
}

function createFunctionRegExp(prefixedKey) {
  return new RegExp(escapeRegExp(prefixedKey) + '{(' + Object.keys(formatFunctions).join('|') + ')}');
}

function getValue(theObject, key) {
  var value = theObject[key];
  if (isDate(theObject[key])) {
    value = formatDate(theObject[key]);
  }
  return value;
}
