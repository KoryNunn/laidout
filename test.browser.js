(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function checkElement(element, checkVisibility){
    if(!element){
        return false;
    }
    var parentNode = element;
    while(parentNode){
        if(checkVisibility && parentNode.style && parentNode.style.display === 'none'){
            return false;
        }
        if(parentNode === element.ownerDocument){
            return true;
        }
        parentNode = parentNode.parentNode;
    }
    return false;
}

module.exports = function laidout(element, checkVisibility, callback){
    if(arguments.length < 3){
        callback = checkVisibility;
        checkVisibility = false;
    }

    if(checkElement(element, checkVisibility)){
        return callback();
    }

    var recheckElement = function(){
            if(checkElement(element, checkVisibility)){
                document.removeEventListener('DOMNodeInserted', recheckElement);
                callback();
                return;
            }

            if(checkVisibility){
                requestAnimationFrame(recheckElement);
            }
        };

    recheckElement();
    document.addEventListener('DOMNodeInserted', recheckElement);
};
},{}],2:[function(require,module,exports){
//Copyright (C) 2012 Kory Nunn

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*

    This code is not formatted for readability, but rather run-speed and to assist compilers.

    However, the code's intention should be transparent.

    *** IE SUPPORT ***

    If you require this library to work in IE7, add the following after declaring crel.

    var testDiv = document.createElement('div'),
        testLabel = document.createElement('label');

    testDiv.setAttribute('class', 'a');
    testDiv['className'] !== 'a' ? crel.attrMap['class'] = 'className':undefined;
    testDiv.setAttribute('name','a');
    testDiv['name'] !== 'a' ? crel.attrMap['name'] = function(element, value){
        element.id = value;
    }:undefined;


    testLabel.setAttribute('for', 'a');
    testLabel['htmlFor'] !== 'a' ? crel.attrMap['for'] = 'htmlFor':undefined;



*/

(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.crel = factory();
    }
}(this, function () {
    // based on http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
    var isNode = typeof Node === 'object'
        ? function (object) { return object instanceof Node; }
        : function (object) {
            return object
                && typeof object === 'object'
                && typeof object.nodeType === 'number'
                && typeof object.nodeName === 'string';
        };
    var isArray = function(a){ return a instanceof Array; };
    var appendChild = function(element, child) {
      if(!isNode(child)){
          child = document.createTextNode(child);
      }
      element.appendChild(child);
    };


    function crel(){
        var document = window.document,
            args = arguments, //Note: assigned to a variable to assist compilers. Saves about 40 bytes in closure compiler. Has negligable effect on performance.
            element = args[0],
            child,
            settings = args[1],
            childIndex = 2,
            argumentsLength = args.length,
            attributeMap = crel.attrMap;

        element = isNode(element) ? element : document.createElement(element);
        // shortcut
        if(argumentsLength === 1){
            return element;
        }

        if(typeof settings !== 'object' || isNode(settings) || isArray(settings)) {
            --childIndex;
            settings = null;
        }

        // shortcut if there is only one child that is a string
        if((argumentsLength - childIndex) === 1 && typeof args[childIndex] === 'string' && element.textContent !== undefined){
            element.textContent = args[childIndex];
        }else{
            for(; childIndex < argumentsLength; ++childIndex){
                child = args[childIndex];

                if(child == null){
                    continue;
                }

                if (isArray(child)) {
                  for (var i=0; i < child.length; ++i) {
                    appendChild(element, child[i]);
                  }
                } else {
                  appendChild(element, child);
                }
            }
        }

        for(var key in settings){
            if(!attributeMap[key]){
                element.setAttribute(key, settings[key]);
            }else{
                var attr = crel.attrMap[key];
                if(typeof attr === 'function'){
                    attr(element, settings[key]);
                }else{
                    element.setAttribute(attr, settings[key]);
                }
            }
        }

        return element;
    }

    // Used for mapping one kind of attribute to the supported version of that in bad browsers.
    // String referenced so that compilers maintain the property name.
    crel['attrMap'] = {};

    // String referenced so that compilers maintain the property name.
    crel["isNode"] = isNode;

    return crel;
}));

},{}],3:[function(require,module,exports){
var laidout = require('./'),
    crel = require('crel');

var element1 = crel('div', {class:'thing'}),
    element2 = crel('div', {class:'thing'});
    element3 = crel('div', {class:'thing', style:'display:none;'});
    add4 = crel('button', 'add element 4');
    element4 = crel('div', {class:'thing'});

console.log(
    'height: ' + element1.clientHeight + '\n' +
    'width: ' + element1.clientWidth,
    'height: ' + element2.clientHeight + '\n' +
    'width: ' + element2.clientWidth,
    'height: ' + element3.clientHeight + '\n' +
    'width: ' + element3.clientWidth,
    'height: ' + element4.clientHeight + '\n' +
    'width: ' + element4.clientWidth
    );


element1.textContent =
    'height: ' + element1.clientHeight + '\n' +
    'width: ' + element1.clientWidth;

laidout(element2, function(){
    element2.textContent =
    'height: ' + element2.clientHeight + '\n' +
    'width: ' + element2.clientWidth;
});

laidout(element3, true, function(){
    element3.textContent =
    'height: ' + element3.clientHeight + '\n' +
    'width: ' + element3.clientWidth;
});

laidout(element4, function(){
    element4.textContent =
    'height: ' + element4.clientHeight + '\n' +
    'width: ' + element4.clientWidth;
});

window.onload = function(){
    crel(document.body,
        element1,
        element2,
        element3,
        add4
    );

    setTimeout(function(){
        element3.style.display = null;
    }, 1000);

    add4.addEventListener('click', function(){
        crel(document.body,
            element4
        );
    });

    var alreadyInDom = document.querySelector('.alreadyInDom');

    laidout(alreadyInDom, function(){
        alreadyInDom.textContent =
        'height: ' + alreadyInDom.clientHeight + '\n' +
        'width: ' + alreadyInDom.clientWidth;
    });
};
},{"./":1,"crel":2}]},{},[3]);
