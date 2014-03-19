laidout
=======

# What

Call a callback when an element has been laid out with css

# Usage

    var laidout = require('laidout');

    laidout(someElement, function(){
        // called when the element is actually in the document
    });