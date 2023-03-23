import CarouselInitializator from './carousel-initializator.js';

console.log('Sample JavaScript #5 HW #17');

class Carousel extends CarouselInitializator{

    constructor(rotateInterval = 7000, isPlay = true, ...pArr) {
        super(...pArr);
        this.ROTATE_INTERVAL = rotateInterval;
        this.isPlay = isPlay;
    }

    _initProperties () {
        super._initProperties();

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
        this.mouseEnterHandlerWithThis = this._mouseEnterHandler.bind(this);
        this.mouseLeaveHandlerWithThis = this._mouseLeaveHandler.bind(this);
    }

    _showCurrentSlide () {
        this.slidesListLive[this.currentIndex].setAttribute('class', this.activeSlideClass);
        this.indicatorsListLive[this.currentIndex].setAttribute('class', this.activeIndicatorsClass);
    }

    _hideActiveSlideAndIndicator () {
        this.slidesListLive.forEach( (slide) => {
            if (slide.getAttribute('class') === this.activeSlideClass) slide.setAttribute('class', this.slideClass);
        });
    
        this.indicatorsListLive.forEach( (indicator) => {
            if (indicator.getAttribute('class') === this.activeIndicatorsClass) indicator.setAttribute('class', this.indicatorsClass);
        });
    }

    _startCarousel () {
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
    
        }, this.ROTATE_INTERVAL);
    }

    _calculateCurrentIndex (number) {
        return (number !== undefined) ? this.currentIndex = --number 
            : ((this.slidesListLive.length - 1 === this.currentIndex) ? 0 : ++this.currentIndex);
    }

    _conditionalCalcIndex (param, target) {
        if (param === 'prev') {
            this.currentIndex = (this.currentIndex <= 1) ? (this.currentIndex - 2) + this.indicatorsListLive.length : this.currentIndex - 2;
        }
        
        if (target !== undefined && param === undefined) {
            this.currentIndex = this._calculateCurrentIndex(Number.parseInt(target.dataset.slideTo));
        }
    
        this._showCurrentSlide();
        this.currentIndex = this._calculateCurrentIndex();
    }

    _changeSlideOnPauseOrNot (p, target) {

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

    _indicatorsHandler (e) {
        const target = e.target;
    
        if (target.className === this.indicatorsClass) this._changeSlideOnPauseOrNot(undefined, target);
    }

    _mouseEnterHandler() {
        this.pause({target: document.getElementsByClassName(this.pauseBtnClass)[0]});
    }

    _mouseLeaveHandler() {
        this.play({target: document.getElementsByClassName(this.playBtnClass)[0]});
    }

    _initEventlistners () {
        document.getElementsByClassName([...this.containersMap.values()][1])[0].addEventListener('click', this.indicatorsHandlerWithThis);
        document.getElementsByClassName(this.pauseBtnClass)[0].addEventListener('click', this.pauseHandlerWithThis);
        document.getElementsByClassName(this.controlsContainersClasses[1])[0].addEventListener('click', this.nextSlideButtonHandlerWithThis);
        document.getElementsByClassName(this.controlsContainersClasses[0])[0].addEventListener('click', this.prevSlideButtonHandlerWithThis);

        document.getElementsByClassName([...this.containersMap.values()][0])[0].addEventListener('mouseenter', this.mouseEnterHandlerWithThis);
        document.getElementsByClassName([...this.containersMap.values()][0])[0].addEventListener('mouseleave', this.mouseLeaveHandlerWithThis);
    }

    init () {
        this._initProperties();
        this.initCarousel();
        this._initEventlistners();
        if (this.isPlay === true) {
            this._startCarousel();
        } 
        else {
            this._showCurrentSlide();
            this.pause();
        }

    }

    next () {
        this._changeSlideOnPauseOrNot('next');
    }

    prev () { 
        this._changeSlideOnPauseOrNot('prev');
    }

    play (e) {
    
        const element = document.getElementsByClassName(this.playBtnClass)[0];
        element.setAttribute('class', this.pauseBtnClass);
    
        element.removeEventListener('click', this.playHandlerWithThis);
        element.addEventListener('click', this.pauseHandlerWithThis);
    
        this._startCarousel();
    }

    pause (e) {

        clearInterval(this.timerID);
        this.isPlay = false;
        
        const element = document.getElementsByClassName(this.pauseBtnClass)[0];
        element.setAttribute('class', this.playBtnClass);
        
        element.removeEventListener('click', this.pauseHandlerWithThis);
        element.addEventListener('click', this.playHandlerWithThis);
    }
    

}

export default Carousel;
