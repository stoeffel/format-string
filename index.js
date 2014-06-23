var PREFIX = ':';

module.exports = function(theString, theObject) {
    theString = (typeof theString === 'undefined')?'': theString;
    theString = String(theString);

    theObject = theObject || {};

    theString = theString.replace(PREFIX + 'prop', theObject.prop);
    return theString;
};
