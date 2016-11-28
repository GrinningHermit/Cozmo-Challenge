class View {
    constructor(dropAmount){
        this.id = $(window);
        this.droppableAmount = dropAmount;
        this.curZIndex = 0;
        this.slottableMargin = 20;
        this.slottables = 0;
        this.actions = [];
        this.slots = [];
        this.areas = [];
        this.menuButtons = [];
        this.itemArray = [];
        this.sCount = 0;
    }

    // Not used yet, handy for resize screen function
    get getItemArray(){
        return this.itemArray.concat(list.getProgrammedSlots);
    }

    getAreasItem(item){
        return this.areas[item];
    }

    get slottableCount(){
        return this.sCount++
    }

    // Builds area for displaying available move command Slots
    createMemorySlotArea(){
        // Create the area for the Slots to place Slottables in
        var areaObj = new Area('memory-slot-area');
        this.itemArray[this.itemArray.length] = areaObj;
        var area = $(areaObj.ref);
        this.areas[this.areas.length] = area;

        // Create Slots
        for (var i = 0; i < this.droppableAmount; i++){
            this.slots[i] = new Slot(areaObj.ref, i, this);
            var slot = this.slots[i][0];
            var slotNr = this.slots[i][1];
            this.itemArray[this.itemArray.length] = this.slots[i][2];
            this.setPosition(slot, i, list.lengthPS + 1);
            $(slotNr).css({
                top: $(slot).position().top - $(slotNr).height()/2 -20,
                left: $(slot).position().left + $(slot).width()/2 - $(slotNr).width()/2
            });
        }

        // Create StartProgram button
        var startBtnObj = new StartStopBtn('execute-btn', this.areas[0].getID());
        this.itemArray[this.itemArray.length] = startBtnObj;
        var startBtn = $(startBtnObj.ref);
        this.menuButtons[this.menuButtons.length] = startBtn;
        this.setPosition(startBtn, list.lengthPS, list.lengthPS + 1);
    }

    createProgramArea(){
        // Create the area for the Action buttons
        var areaObj = new Area('program-area');
        this.itemArray[this.itemArray.length] = areaObj;
        var area = $(areaObj.ref);
        area.css({top: this.areas[0].height()});
        this.areas[this.areas.length] = area;

        // Create action buttons
        for (var i = 0; i < ctrl.actionSet.length; i++){
            this.actions[i] = new Action(areaObj.ref, ctrl.actionSet[i]);
            this.itemArray[this.itemArray.length] = this.actions[i];
            this.setPosition(this.actions[i].ref, i, ctrl.actionSet.length + 1);
        }
        var clearBtnObj = new ClearBtn('clear-btn', this.areas[1].getID());
        this.itemArray[this.itemArray.length] = clearBtnObj;
        var clearBtn = $(clearBtnObj.ref);
        this.menuButtons[this.menuButtons.length] = clearBtn;
        this.setPosition(clearBtn, ctrl.actionSet.length, ctrl.actionSet.length + 1);

    }

    createDeleteArea(){
        // Create the area for removing undesired Slottables
        var areaObj = new WasteBin('delete-area');
        var area = $(areaObj.ref);

        // Take coordinates of program-area and place (hidden) wastebin on top of it
        area.hide();
        var destination = this.areas[1].offset();
        area.css({top: destination.top, left: destination.left});
        this.areas[this.areas.length] = area;
    }

    // Places and sorts Slot and Action elements on the screen
    setPosition(instanceID, num, total) {
        var slotMargin = this.slottableMargin;
        var divHeight = $(instanceID).parent().height();
        var divWidth = $(instanceID).parent().width();
        var instanceTop = Math.floor(divHeight/2 - $(instanceID).height()/2);
        var totalItemWidth = (total * ($(instanceID).width() + slotMargin)) - slotMargin;
        var firstXPos = Math.floor(divWidth/2 - totalItemWidth/2);
        var instanceLeft = firstXPos + num * ($(instanceID).width() + slotMargin);
        $(instanceID).css({top: instanceTop, left: instanceLeft});
    }

    redraw(){
        // TODO: redraw DOM element positions on screen size change
    }

}