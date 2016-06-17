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