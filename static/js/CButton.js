// Parent class of StartStopBtn and ClearBtn
class CButton {
    constructor(reference, area){
        this.name = reference;
        this.id = '#' + reference;
        this.area = '#' + area;

        $(this.area).append('<div id="' + this.name + '"></div>');
        return this
    }

    get ref() {
        return this.id;
    }
}

// Button for toggling between edit and execution mode (only active when at least one Slot is occupied with a Slottable)
class StartStopBtn extends CButton {
    constructor(reference, area) {
        super(reference, area);

        $(this.id).addClass('ex-btn');
        $(this.id).addClass('lightgreen');
        $(this.id).addClass('play');

        this.defineClick();
    }

    defineClick(){
        $(this.id).click(function () {
            if(ctrl.programActive) {
                if (!ctrl.isPlaying) { // if in edit mode, go to execute mode
                    var programList = list.getList;
                    console.log(programList);
                    ctrl.animatePlayStop(true);
                    ctrl.postHttpRequest('program_list', programList);
                    ctrl.setMoveInterval();
                } else { // if in execute mode, cancel further moves and go to edit mode
                    ctrl.animatePlayStop(false);
                    ctrl.postHttpRequest('stop_robot', {});

                }
                return false
            }
        });
    }

}

class ClearBtn extends CButton {
    constructor(reference, area) {
        super(reference, area);

        $(this.id).addClass('ex-btn');
        $(this.id).addClass('lightred');
        $(this.id).addClass('trash');

        this.defineClick();
    }

    defineClick(){
        $(this.id).click(function () {
            if(!ctrl.isPlaying) {
                location.reload();
            }
        });
    }

}
