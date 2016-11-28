// Zones for placing Slots, Programs and CButtons
class Area {
    constructor(reference){
        this.name = reference;
        this.id = '#' + reference;

        $('body').append('<div id="' + this.name + '"></div>');

        return this
    }

    get ref() {
        return this.id;
    }

}
