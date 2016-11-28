// Parent class of Slot and WasteBin: elements where elements created with draggable classes Action and Slottable can be placed
class Droppable {

    constructor(reference){
        this.name = reference;
        this.id = '#' + reference;
    }

    get ref(){
        return this.id;
    }

}

// An empty element to place an Action or Slottable in. The order of move commands is determined by placing those Programs in Slots.
class Slot extends Droppable {
    constructor(area, num, view){
        var slotID = 'ms-' + num;
        super(slotID);
        this.numID = 'sn-' + num;
        this.parentDiv = area;
        this.view = view;

        $(this.parentDiv).append('<div id="' + this.name + '" class="memory-slot"></div>');

        $(this.parentDiv).append('<div id="' + this.numID + '" class="slot-number">' + (num + 1) + '</div>');

        this.defineDroppable();

        return [$(this.id), $('#' + this.numID), this];

    }

    defineDroppable(){
        $(this.id).droppable({
            tolerance: 'fit',
            drop: function (event,ui) {
                var sNum = $(this).attr('id').substr(3);
                var instanceID;
                var instanceRef;

                ui.helper.removeClass('darkgreen');
                if($(ui.helper).checkIfAction()) { // if class is Action
                    var programType = ui.helper.attr('id');
                    for (var i = 0; i < ctrl.actionSet.length; i++) {
                        if (programType == ctrl.actionSet[i]) {
                            ui.helper.css('visibility', 'hidden');
                            // create Slottable
                            instanceRef = new Slottable(view.getAreasItem(0), programType, view.slottableCount, $(this));
                            instanceID = $(instanceRef.ref);
                            instanceID.addClass('darkgrey');
                        }
                    }
                } else { // if class is Slottable
                    instanceID = ui.helper;
                }
                // mark current Slot as occupied visually
                $('#sn-' + sNum).css({'color': '#aaaaaa'});
                $(this).css({'background-color': '#aaaaaa'});

                list.overwrite(ui.helper, sNum); // remove previous element occupying this Slot if there is one
                list.insertPL(instanceID, sNum); // set new element in Slot
                list.updateVisuals(); // Clear old occupied Slot
                console.log(list.getList);
            },
            over: function (event, ui) {
                ui.helper.addClass('darkgreen');
                ui.helper.removeClass('blue');
            },
            out: function (event, ui) {
                ui.helper.addClass('blue');
                ui.helper.removeClass('darkgreen');
            }
        });
    }
}

// Area for removing individual Slottables from Slots
class WasteBin extends Droppable {
    constructor(reference){
        super(reference);

        $('body').append('<div id="' + this.name + '" class="trash"></div>');

        this.defineDroppable();

        return this
    }

    defineDroppable() {
        $(this.id).droppable({
            tolerance: 'intersect',
            drop: function (event, ui) {
                if(ui.helper.attr('id').substr(0,8) == 'slotted-') {
                    list.deletePL(ui.helper);
                    console.log(list.getList);
                }
            },
            over: function (event, ui) {
                if(ui.helper.attr('id').substr(0,8) == 'slotted-') {
                    ui.helper.addClass('red');
                }
            },
            out: function (event, ui) {
                if(ui.helper.attr('id').substr(0,8) == 'slotted-') {
                    ui.helper.removeClass('red');
                }
            }
        });
    }
}