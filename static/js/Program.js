// Parent class of Actions and Slottables. Represents the ability to program a predetermined set of 'Slots' with move commands.
class Program {
    constructor(reference, type) {
        this.name = reference;
        this.id = '#' + reference;
        this.typeOfProgram = type;
    }

    get ref() {
        return this.id;
    }

    get programType() {
        return this.typeOfProgram;
    }

    defineDraggableSuper() {
        $(this.id).draggable({
            snap: '.memory-slot',
            snapMode: 'inner',
            snapTolerance: 20,
            revertDuration: 250,
            scroll: false
        });
    }
}

// Unique move command to place in a Slot
class Action extends Program {
    constructor(area, actionType){
        var actionID = actionType;
        super(actionID, actionType);
        this.parentDiv = area;

        $(this.parentDiv).append('<div id="' + this.name + '" class="program ' + actionType + '"></div>');

        this.defineDraggable();

        return this
    }

    defineDraggable(){

        this.defineDraggableSuper();

        $(this.id).draggable({
            revert: true,
            start: function (event, ui) {
                ui.helper.addClass('blue');
                view.curZIndex = ui.helper.css('zIndex');
                ui.helper.css('zIndex', 9999);
            },
            stop: function (event, ui) {
                ui.helper.removeClass('blue');
                ui.helper.css('visibility', 'visible');
                ui.helper.css('zIndex', view.curZIndex);
            }
        });
    }

}

// Copy of an Action: when an Action is placed in a Slot, the Action hides and returns to its original position. The Slottable is the placeholder clone to display the move command for the Slot
class Slottable extends Program {
    constructor(area, type, num, droppable){
        var slotID = 'slotted-' + num;
        super(slotID, type);
        this.parentDiv = area;

        $(this.parentDiv).append('<div id="' + this.name + '" class="program ' + this.typeOfProgram + '" program="' + this.typeOfProgram + '"></div>');
        
        $(this.id).css({top: droppable.position().top, left: droppable.position().left});

        this.defineDraggable();

        return this;
    }

    defineDraggable(){

        this.defineDraggableSuper();

        $(this.id).draggable({
            revert: 'invalid',
            start: function (event, ui) {
                ui.helper.addClass('blue');
                view.curZIndex = ui.helper.css('zIndex');
                ui.helper.css('zIndex', 9999);
                $('#delete-area').show();
            },
            stop: function (event, ui) {
                ui.helper.removeClass('blue');
                ui.helper.css('visibility', 'visible');
                ui.helper.css('zIndex', view.curZIndex);
                $('#delete-area').hide();
            }
        });
    }

}