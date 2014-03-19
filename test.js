var laidout = require('./'),
    crel = require('crel');

var element1 = crel('div', {class:'thing'}),
    element2 = crel('div', {class:'thing'});
    add3 = crel('button', 'add element 3');
    element3 = crel('div', {class:'thing'});

console.log(

    'height: ' + element1.clientHeight + '\n' +
    'width: ' + element1.clientWidth,
    'height: ' + element2.clientHeight + '\n' +
    'width: ' + element2.clientWidth,
    'height: ' + element3.clientHeight + '\n' +
    'width: ' + element3.clientWidth
    );


element1.textContent =
    'height: ' + element1.clientHeight + '\n' +
    'width: ' + element1.clientWidth;

laidout(element2, function(){
    element2.textContent =
    'height: ' + element2.clientHeight + '\n' +
    'width: ' + element2.clientWidth;
});

laidout(element3, function(){
    element3.textContent =
    'height: ' + element3.clientHeight + '\n' +
    'width: ' + element3.clientWidth;
});

window.onload = function(){
    crel(document.body,
        element1,
        element2,
        add3
    );

    add3.addEventListener('click', function(){
        crel(document.body,
            element3
        );
    });

    var alreadyInDom = document.querySelector('.alreadyInDom');

    laidout(alreadyInDom, function(){
        alreadyInDom.textContent =
        'height: ' + alreadyInDom.clientHeight + '\n' +
        'width: ' + alreadyInDom.clientWidth;
    });
};