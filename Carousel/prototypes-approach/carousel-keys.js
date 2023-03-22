function KeysCarousel() {
    SwipeCarousel.apply(this, arguments);
}

KeysCarousel.prototype = Object.create(SwipeCarousel.prototype);
KeysCarousel.prototype.constructor = KeysCarousel;

KeysCarousel.prototype._initProperties = function () {
    SwipeCarousel.prototype._initProperties.apply(this);
    this.pressKeyhandlerWithThis = this._pressKeyhandler.bind(this);
}

KeysCarousel.prototype._pressKeyhandler = function(e) {
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

KeysCarousel.prototype._initEventlistners = function () {
    SwipeCarousel.prototype._initEventlistners.apply(this);
    document.addEventListener('keydown', this.pressKeyhandlerWithThis);
}
