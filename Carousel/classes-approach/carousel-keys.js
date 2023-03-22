import SwipeCarousel from "./carousel-swipe.js";

class KeysCarousel extends SwipeCarousel {
    constructor(...args) {
        super(...args)
    }

    _initProperties () {
        super._initProperties();
        this.pressKeyhandlerWithThis = this._pressKeyhandler.bind(this);
    }

    _pressKeyhandler (e) {
        e.preventDefault();
        
        if (e.code === this.CODE_ARROW_LEFT) {
            this.prev();
        };
        if (e.code === this.CODE_ARROW_RIGHT) {
            this.next();
        };
        if (e.code === this.CODE_SPACE) {
            if (this.isPlay !== true) this.play({target: document.getElementsByClassName(this.playBtnClass)[0]});
            else this.pause({target: document.getElementsByClassName(this.pauseBtnClass)[0]});
        }; 
    }

    _initEventlistners () {
        super._initEventlistners();
        document.addEventListener('keydown', this.pressKeyhandlerWithThis);
    }

}

export default KeysCarousel;
