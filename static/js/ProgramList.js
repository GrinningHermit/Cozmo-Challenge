// Handles everything to do with Slot occupation.
class ProgramList {
    constructor(slots) {
        this.programSlots = Array.apply(null, new Array(slots)).map(function () {}); // creating an array filled with undefined entries
    }

    get lengthPS(){
        return this.programSlots.length
    }

    // Returns elements of occupied Slots only
    get getProgrammedSlots(){
        var ps = [];
        var p = this.programSlots;
        for (var i = 0; i < p.length; i++) {
            if(p[i] != undefined){
                ps[ps.length] = p[i];
            }
        }
        return ps
    }

    // Clear old occupied Slot
    updateVisuals(){
        var p = this.programSlots;
        for (var i = 0; i < p.length; i++) {
            if (p[i] == undefined) {
                $('#sn-' + i).css({'color': '#dddddd'});
                $('#ms-' + i).css({'background-color': '#dddddd'});
            }
        }
        if(this.getList != ''){
            ctrl.setActive(true);
            $('#execute-btn').addClass('darkgreen');
            $('#clear-btn').addClass('red');
        } else {
            ctrl.setActive(false);
            $('#execute-btn').removeClass('darkgreen');
            $('#clear-btn').removeClass('red');
        }
    }

    // Place new element in Slot
    insertPL(id, num){
        this.programSlots[num] = id; // position id in array
        this.clearEmptySlots(id, num); // clear previous position
        this.updateVisuals(); // show changes in visuals
    }

    // Remove element from Slot
    deletePL(id){
        var p = this.programSlots;
        for (var i = 0; i < p.length; i++) {
            if(p[i] != undefined) {
                if (p[i].getID() == id.getID()) {
                    p[i].remove(); // remove object
                    p[i] = undefined; // clear array position
                }
            }
        }
        this.updateVisuals(); // show changes in visuals
    }

    // Remove previous element occupying this Slot if there is one
    overwrite(id, num){
        var p = this.programSlots;
        if(p[num] != undefined && p[num] != id){
            p[num].remove(); // remove object
            p[num] = undefined; // clear array position
        }
    }

    // Return currently assigned move commands
    get getList(){
        // return list of commands (to be sent to server)
        var p = this.programSlots;
        var list = '';
        for (var i = 0; i < p.length; i++) {
            if (p[i] != undefined) {
                for (var j = 0; j < ctrl.actionSet.length; j++) {
                    if (p[i].attr('program') == ctrl.actionSet[j]) {
                        list += ctrl.actionSet[j] + ' ';
                    }
                }
            }
        }
        return list
    }

    // Clear old occupied Slots
    clearEmptySlots(id, num){
        var p = this.programSlots;
        for (var i = 0; i < p.length; i++) {
            if(p[i] != undefined) {
                if (p[i].getID() == id.getID() && num != i) {
                    p[i] = undefined;
                }
            }
        }
    }

    // Show current move being executed (for ctrl.getMoveNumber interval)
    showActiveMove(num) {
        var moveDiff = 0;
        var p = this.programSlots;
        for (var i = 0; i < p.length; i++) {
            if (p[i] != undefined) {
                var slot = p[i];
                var nr = $('#sn-' + i);
                if (i == num + moveDiff) {
                    slot.addClass('darkgreen');
                    nr.css({color: '#00c025'});
                    moveDiff = 0;
                } else if (slot.hasClass('darkgreen')) {
                    slot.removeClass('darkgreen');
                    nr.css({color: '#aaaaaa'});
                }
            } else moveDiff += 1;
        }
    }
}