class Controller {
    constructor(){
        this.moveCounter = 0;
        this.currentMove = -1;
        this.as = ['forward', 'back', 'left', 'right', 'uturn'];
        this.aSlots = 6;
        this.active = false;
        this.playing = false;
        this.isPlayingInterval = function(){};
    }

    // list of possible commands
    get actionSet(){
        return this.as;
    }

    // list of occupied slots
    get availableSlots(){
        return this.aSlots
    }

    // status check whether moves are being executed or not
    get isPlaying(){
        return this.playing
    }

    // setting status moves being executed
    setPlaying(bool){
        if(bool != undefined){
            this.playing = bool;
        }
    }

    // status check whether any slots are occupied
    get programActive(){
        return this.active
    }

    // setting status (at least one slot occupied or not)
    setActive(bool) {
        if (bool != undefined) {
            this.active = bool;
        }
    }

    // animation and locking of buttons for making the transition clear between edit mode and execution mode
    animatePlayStop(bool){
        var progC = $('.program');
        var progA = $('#program-area');
        var memA = $('#memory-slot-area');
        var btn = $('#execute-btn');

        if (bool) {
            $('body').animate({
                backgroundColor: "#000000"
            }, 400 );

            progC.draggable( "option", "disabled", true );
            progA.animate({
                top: $(window).height()
            }, 400);
            memA.animate({
                top: $(window).height()/2 - memA.height()/2
            }, 400);
            this.setPlaying(true);
            btn.addClass('red');
            btn.addClass('stop');
        } else {
            $('body').animate({
                backgroundColor: "#ffffff"
            }, 400 );

            progC.draggable( "option", "disabled", false );
            progA.animate({
                top: $(window).height() - progA.height()
            }, 400);
            memA.animate({
                top: 0
            }, 400);
            ctrl.setPlaying(false);
            btn.removeClass('red');
            btn.removeClass('stop');
        }
    }

    // sending json commands to server
    postHttpRequest(url, dataSet) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.send( JSON.stringify( dataSet ) );
    }

    // receiving json commands from server
    getHttpRequest(url) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                //console.log(xhr.responseText);
                ctrl.currentMove = parseInt(xhr.responseText);
            }
        };
        xhr.open('POST', url, true);
        xhr.send( null );
    }

    // interval function for checking on executed status of move commands
    getMoveNumber() {
        var c = ctrl;
        c.getHttpRequest('return_move');
        list.showActiveMove(c.currentMove);
        console.log(c.currentMove);
        if ((!c.isPlaying || c.currentMove < 0) && c.moveCounter > 20) {
            c.moveCounter = 0;
            c.animatePlayStop(false);
            list.showActiveMove(-1);
            clearInterval(c.isPlayingInterval);
        }
        c.moveCounter += 1; // moveCounter is needed to prevent receiving wrong code due to lagginess in connection
    }

    // start interval for checking the execution status
    setMoveInterval(){
        this.isPlayingInterval = setInterval(ctrl.getMoveNumber, 60);
    }

}
