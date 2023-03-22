function SwipeCarousel() {
    Carousel.apply(this, arguments);
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._initProperties = function () {

    Carousel.prototype._initProperties.apply(this);

    this.swipeStartHandlerWithThis = this._swipeStartHandler.bind(this);
    this.swipeEndHandlerWithThis = this._swipeEndHandler.bind(this);
}

SwipeCarousel.prototype._swipeStartHandler = function (e) {
    this.startPosX = (e instanceof MouseEvent) ? e.pageX : e.changedTouches[0].pageX;
};

SwipeCarousel.prototype._swipeEndHandler = function (e) {
    this.endPosX = (e instanceof MouseEvent) ? e.pageX : e.changedTouches[0].pageX;

    if (this.endPosX - this.startPosX > 200) this.prev();
    if (this.endPosX - this.startPosX < -200) this.next();
},

SwipeCarousel.prototype._initEventlistners = function () {

    Carousel.prototype._initEventlistners.apply(this);

    document.getElementsByClassName([...this.containersMap.values()][0])[0].addEventListener('touchstart', this.swipeStartHandlerWithThis);
    document.getElementsByClassName([...this.containersMap.values()][0])[0].addEventListener('touchend', this.swipeEndHandlerWithThis);

    document.getElementsByClassName([...this.containersMap.values()][0])[0].addEventListener('mousedown', this.swipeStartHandlerWithThis);
    document.getElementsByClassName([...this.containersMap.values()][0])[0].addEventListener('mouseup', this.swipeEndHandlerWithThis);
}
