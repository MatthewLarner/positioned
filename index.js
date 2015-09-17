var laidout = require('laidout'),
    positionChecks = [],
    running;

function checkPosition(positionCheck, index){
    var rect = positionCheck.element.getBoundingClientRect();

    if(rect.top || rect.bottom || rect.left || rect.right) {
        positionChecks.splice(index, 1);
        positionCheck.callback();
    }
}

function run(){
    running = true;

    positionChecks.forEach(checkPosition);

    if(!positionChecks.length) {
        running = false;

        return;
    }

    requestAnimationFrame(run);
}

module.exports = function hasPosition(element, callback){
    laidout(element, function(){
        positionChecks.push({
            element: element,
            callback: callback
        });

        if(!running){
            run();
        }
    });
};
