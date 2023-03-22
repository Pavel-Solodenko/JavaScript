import Carousel from './carousel.js';

class SwipeCarousel extends Carousel {

    constructor(...args) {
        super(...args);
    }

    _initProperties () {
        super._initProperties();
        this.swipeStartHandlerWithThis = this._swipeStartHandler.bind(this);
        this.swipeEndHandlerWithThis = this._swipeEndHandler.bind(this);
    }

    _swipeStartHandler (e) {
        this.startPosX = (e instanceof MouseEvent) ? e.pageX : e.changedTouches[0].pageX;
    }
    
    _swipeEndHandler (e) {
        this.endPosX = (e instanceof MouseEvent) ? e.pageX : e.changedTouches[0].pageX;
    
        if (this.endPosX - this.startPosX > 200) this.prev();
        if (this.endPosX - this.startPosX < -200) this.next();
    }

    _initEventlistners () {
        super._initEventlistners();
    
        document.getElementsByClassName([...this.containersMap.values()][0])[0].addEventListener('touchstart', this.swipeStartHandlerWithThis);
        document.getElementsByClassName([...this.containersMap.values()][0])[0].addEventListener('touchend', this.swipeEndHandlerWithThis);
    
        document.getElementsByClassName([...this.containersMap.values()][0])[0].addEventListener('mousedown', this.swipeStartHandlerWithThis);
        document.getElementsByClassName([...this.containersMap.values()][0])[0].addEventListener('mouseup', this.swipeEndHandlerWithThis);
    }


}

export default SwipeCarousel;
