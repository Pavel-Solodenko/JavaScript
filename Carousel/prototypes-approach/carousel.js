console.log('Sample JavaScript #5 HW #17');

function Carousel(rotateInterval = 7000, ...pArr) {

    this.ROTATE_INTERVAL = rotateInterval;
    
    CarouselInitializator.apply(this, ...pArr);
}

Carousel.prototype = Object.create(CarouselInitializator.prototype);
Carousel.prototype.constructor = Carousel;

Carousel.prototype._initProperties = function () {
    this.currentIndex = 0;

    this.CODE_SPACE = 'Space';
    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_ARROW_RIGHT = 'ArrowRight';

    this.activeSlideClass = this.slideClass +' active';
    this.activeIndicatorsClass = this.indicatorsClass + ' active';

    this.pauseHandlerWithThis = this.pause.bind(this);
    this.playHandlerWithThis = this.play.bind(this);
    this.nextSlideButtonHandlerWithThis = this.next.bind(this);
    this.prevSlideButtonHandlerWithThis = this.prev.bind(this);
    this.indicatorsHandlerWithThis = this._indicatorsHandler.bind(this);
    
}

Carousel.prototype._showCurrentSlide = function () {
    this.slidesListLive[this.currentIndex].setAttribute('class', this.activeSlideClass);
    this.indicatorsListLive[this.currentIndex].setAttribute('class', this.activeIndicatorsClass);
}

Carousel.prototype._hideActiveSlideAndIndicator = function () {
    this.slidesListLive.forEach( (slide) => {
        if (slide.getAttribute('class') === this.activeSlideClass) slide.setAttribute('class', this.slideClass);
    });

    this.indicatorsListLive.forEach( (indicator) => {
        if (indicator.getAttribute('class') === this.activeIndicatorsClass) indicator.setAttribute('class', this.indicatorsClass);
    });
}

Carousel.prototype._startCarousel = function() {
    let hasActiveSlide = false;
    
    this.slidesListLive.forEach((slide) => { if(slide.getAttribute('class') === this.activeSlideClass) hasActiveSlide = true; });

    if (!hasActiveSlide) {
        this._showCurrentSlide(this.currentIndex);
        this.currentIndex++;
    }
    this.isPlay = true;
    this.timerID = setInterval(() => {

        this._hideActiveSlideAndIndicator();

        this._showCurrentSlide(this.currentIndex);
                    
        this.currentIndex = this._calculateCurrentIndex();
        // isPlay = true;
    }, this.ROTATE_INTERVAL);
}

Carousel.prototype._calculateCurrentIndex = function (number) {
    return (number !== undefined) ? this.currentIndex = --number 
        : ((this.slidesListLive.length - 1 === this.currentIndex) ? 0 : ++this.currentIndex);
}

Carousel.prototype._conditionalCalcIndex = function (param, target) {
    if (param === 'prev') {
        this.currentIndex = (this.currentIndex <= 1) ? (this.currentIndex - 2) + this.indicatorsListLive.length : this.currentIndex - 2;
    }
    
    if (target !== undefined && param === undefined) {
        this.currentIndex = this._calculateCurrentIndex(Number.parseInt(target.dataset.slideTo));
    }

    this._showCurrentSlide();
    this.currentIndex = this._calculateCurrentIndex();
}

Carousel.prototype._changeSlideOnPauseOrNot = function (p, target) {

    if (this.isPlay) {
        let playOrPause = {target: document.getElementsByClassName(this.pauseBtnClass)[0]};

        this.pause(playOrPause);
        this._hideActiveSlideAndIndicator();

        this._conditionalCalcIndex(p, target);
        
        this.play(playOrPause);
    }
    else {
        this._hideActiveSlideAndIndicator();
        this._conditionalCalcIndex(p, target);
    }

}

Carousel.prototype._indicatorsHandler = function (e) {
    const target = e.target;

    if (target.className === this.indicatorsClass) this._changeSlideOnPauseOrNot(undefined, target);
}

Carousel.prototype._initEventlistners = function() {

    document.getElementsByClassName([...this.containersMap.values()][1])[0].addEventListener('click', this.indicatorsHandlerWithThis);
    document.getElementsByClassName(this.pauseBtnClass)[0].addEventListener('click', this.pauseHandlerWithThis);
    document.getElementsByClassName(this.controlsContainersClasses[1])[0].addEventListener('click', this.nextSlideButtonHandlerWithThis);
    document.getElementsByClassName(this.controlsContainersClasses[0])[0].addEventListener('click', this.prevSlideButtonHandlerWithThis);

}

Carousel.prototype.init = function () {
    this._initProperties();
    this.initCarousel();
    this._initEventlistners();
    this._startCarousel();
}

Carousel.prototype.next = function () {
    this._changeSlideOnPauseOrNot('next');
}

Carousel.prototype.prev = function () { 
    this._changeSlideOnPauseOrNot('prev');
}

Carousel.prototype.play = function (e) {
    
    const element = document.getElementsByClassName(this.playBtnClass)[0];
    element.setAttribute('class', this.pauseBtnClass);

    element.removeEventListener('click', this.playHandlerWithThis);
    element.addEventListener('click', this.pauseHandlerWithThis);

    this._startCarousel();
}
    
Carousel.prototype.pause = function (e) {

    clearInterval(this.timerID);
    this.isPlay = false;
    
    const element = document.getElementsByClassName(this.pauseBtnClass)[0];
    element.setAttribute('class', this.playBtnClass);
    
    element.removeEventListener('click', this.pauseHandlerWithThis);
    element.addEventListener('click', this.playHandlerWithThis);
}
