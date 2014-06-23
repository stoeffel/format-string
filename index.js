var moment = require('moment');

module.exports = function(theString, theObject, config) {
  config = config || {};
  var prefix = config.prefix || ':',
      dateFormat = config.dateFormat || 'DD.MM.YYYY';

  theString = (typeof theString === 'undefined') ? '' : theString;
  theString = String(theString);

  theObject = theObject || {};

  Object.keys(theObject).forEach(function(key) {
    var value = theObject[key];
    if (theObject[key] instanceof Date) {
      value = moment(theObject[key]).format(dateFormat);
    }
    theString = theString.replace(new RegExp(escapeRegExp(prefix + key), 'g'), value);
  });
  return theString;
};

function escapeRegExp(string){
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}
