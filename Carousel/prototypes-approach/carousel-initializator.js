function CarouselInitializator(slidesCount = 5, containerID = 'carousel', imageNames = 'image', linksArray,
    slidesClassName = 'slides__item', indicatorsClassName = 'indicators__item',
) {
    this.slidesCount = slidesCount;
    this.imageNames = imageNames;
    this.containerID = containerID;
    this.slideClass = slidesClassName;
    this.indicatorsClass = indicatorsClassName;

    this.nextBtnClass = 'fas fa-chevron-right';
    this.prevBtnClass = 'fas fa-chevron-left';
    this.pauseBtnClass = 'fas fa-pause fa-5x';
    this.playBtnClass = 'fas fa-play fa-5x';

    this.linksArray = linksArray || [
            'https://www.w3schools.com/js/default.asp',
            'https://www.w3schools.com/python/default.asp',
            'https://www.w3schools.com/cs/index.php',
            'https://www.w3schools.com/php/default.asp',
            'https://www.w3schools.com/java/default.asp'
        ];
    
    this.containersMap = new Map([
        [{tag:'ul'}, 'slides'],
        [{tag:'div'}, 'indicators'],
        [{tag:'div'}, 'controls'],
    ]);
    
    this.controlsContainersClasses = [
        'controls__item controls__prev',
        'controls__item controls__next',
        'controls__item controls__pause'
    ];

    this.controlsMap = new Map([
        [this.controlsContainersClasses[0], this.prevBtnClass],
        [this.controlsContainersClasses[1], this.nextBtnClass],
        [this.controlsContainersClasses[2], this.pauseBtnClass],
    ]);
}

CarouselInitializator.prototype.constructor = CarouselInitializator;

CarouselInitializator.prototype.initCarousel = function () {
    this._initContainers();
    this._initSlides(this.slidesCount);
    this._initIndicators(this.slidesCount);
    this._initContorls();
}

CarouselInitializator.prototype._initContainers =  function () {
    this.containersMap.forEach((value, key) => {
        document.getElementById(this.containerID).appendChild(document.createElement(key.tag)).setAttribute('class', value);
    });
}

CarouselInitializator.prototype._initSlides = function (slidesCount) {
    const slidesContainer = document.getElementsByClassName([...this.containersMap.values()][0])[0];
    
    for (let i = 1; i <= slidesCount; ++i) {
        let slideElement = slidesContainer.appendChild(document.createElement('li'));

        slideElement.setAttribute('class', this.slideClass);
        
        if (screen.availWidth < 500) {
            slideElement.setAttribute('style', `background-image:url(../assets/img/${this.imageNames + i}-mob.jpg);background-size: 100% 100%;background-repeat: no-repeat;background-position: center center;`);
        }
        else {
            slideElement.setAttribute('style', `background-image:url(../assets/img/${this.imageNames + i}.png);background-size: 100% 100%;background-repeat: no-repeat;background-position: center center;` );
        }

        slideElement.innerHTML = `<a href="${this.linksArray[i - 1]}" class="slide-button" target="_blank"></a>`;
    }

    this.slidesListLive = slidesContainer.childNodes;
}

CarouselInitializator.prototype._initIndicators = function (slidesCount) {
    const indicatorsContainer = document.getElementsByClassName([...this.containersMap.values()][1])[0];

    for (let i = 1; i <= slidesCount; ++i ) {

        let indicatorElement = indicatorsContainer.appendChild(document.createElement('span'));

        indicatorElement.setAttribute('class', this.indicatorsClass);
        indicatorElement.setAttribute('data-slide-to', i);
    }

    this.indicatorsListLive = indicatorsContainer.childNodes;
}

CarouselInitializator.prototype._initContorls = function () {
    const controlsContainer = document.getElementsByClassName([...this.containersMap.values()][2])[0];
    
    this.controlsMap.forEach(function (value, key) {
        let container = document.createElement('div');
        container.setAttribute('class', key);

        container.appendChild(document.createElement('i')).setAttribute('class', value);
        controlsContainer.appendChild(container);
    })

}
