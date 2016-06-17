function checkElement(element, checkDisplay){
    if(!element){
        return false;
    }
    var parentNode = element;
    while(parentNode){
        if(checkDisplay && parentNode.style && parentNode.style.display === 'none'){
            return false;
        }
        if(parentNode === element.ownerDocument){
            return true;
        }
        parentNode = parentNode.parentNode;
    }
    return false;
}

module.exports = function laidout(element, checkDisplay, callback){
    if(arguments.length < 3){
        callback = checkDisplay;
        checkDisplay = false;
    }

    if(checkElement(element, checkDisplay)){
        return callback();
    }

    var recheckElement = function(){
            if(checkElement(element, checkDisplay)){
                document.removeEventListener('DOMNodeInserted', recheckElement);
                callback();
                return;
            }

            if(checkDisplay){
                requestAnimationFrame(recheckElement);
            }
        };

    recheckElement();
    document.addEventListener('DOMNodeInserted', recheckElement);
};