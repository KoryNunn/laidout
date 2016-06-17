laidout
=======

# What

Call a callback when an element has been laid out with css

# Usage

```javascript
var laidout = require('laidout');

laidout(someElement, function(){
    // called when the element is actually in the document
});
```

## checkDisplay

Flag to also check that the element and it's parents are not `display: none;`

```javascript
laidout(someElement, true, callback);
```