// Fixes
document.ontouchmove = function(e) {e.preventDefault()}; // iOS Safari fix: prevents scrolling in all divs

// Definitions
var ctrl = new Controller();
var list = new ProgramList(ctrl.availableSlots);
var view = new View(ctrl.availableSlots);

// jQuery customization
$.fn.getID = function(){
    return $(this).attr('id')
};

$.fn.checkIfAction = function(){
    for(var i = 0; i < ctrl.actionSet.length; i++){
        if($(this).attr('id') == ctrl.actionSet[i]){
            return true
        }
    }
    return false
};

// Constructor
$( function () {
    view.createMemorySlotArea();
    view.createProgramArea();
    view.createDeleteArea();
});