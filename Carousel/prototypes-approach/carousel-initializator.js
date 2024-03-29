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

    this.slidesTextArray = [
        'The most popular programming language in the world.',
        'Some text2',
        'Some text3',
        'Some text4',
        'Some text5'
    ]

    this.hoverStyles = '.controls__item.controls__next:hover {color: lightgray;background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 187, 187, 0.8));text-shadow: 0 0 20px black;} '
        + '.fas.fa-pause:hover,.fas.fa-play:hover {opacity: 1;text-shadow: 0 0 20px black ;} '
        + '.indicators__item:hover {background-color: lightgoldenrodyellow;} '
        + '.slide-button:hover {background-color: #ffffff;color: #000000;border: 0.1em solid #000000;transition: all 0.2s ease;} '
        + '.controls__item.controls__prev:hover {color: lightgray;background: linear-gradient(to right, rgba(0, 187, 187, 0.8), rgba(0, 0, 0, 0));text-shadow: 0 0 20px black ;} '
}

CarouselInitializator.prototype.constructor = CarouselInitializator;

CarouselInitializator.prototype.initCarousel = function () {
    this._initContainers();
    this._initSlides(this.slidesCount);
    this._initIndicators(this.slidesCount);
    this._initContorls();

    if (window.matchMedia("(any-pointer:coarse)").matches) {
        let style = document.createElement('style');
        style.innerHTML = '.slide-text-container{left:20%;bottom:calc(10% + (16px + 5.6px + (1% * 2)));width:70vw;padding:3vw;}';
        document.head.appendChild(style);
    }
    else {
        let style = document.createElement('style');
        style.innerHTML = this.hoverStyles;
        document.head.appendChild(style);
    }
    console.log(document.styleSheets[2])
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
        
        if (window.matchMedia("(any-pointer:coarse)").matches) {
            slideElement.setAttribute('style', `background-image:url(../assets/img/${this.imageNames + i}-mob.jpg);background-size: 100% 100%;background-repeat: no-repeat;background-position: center center;`);
        }
        else {
            slideElement.setAttribute('style', `background-image:url(../assets/img/${this.imageNames + i}.png);background-size: 100% 100%;background-repeat: no-repeat;background-position: center center;` );
        }
        
        slideElement.innerHTML = `<div class="slide-text-container" id="slideText${i}"></div><a href="${this.linksArray[i - 1]}" class="slide-button" target="_blank">LEARN NOW</a>`;
        
        this._initAnimations(this.slidesTextArray[i - 1], i);
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

CarouselInitializator.prototype._initAnimations = function (text, i) {

        let style = document.createElement('style');
        style.setAttribute('id',`slideText${i}Style`);

        let str = '@keyframes typing' + i + ' {' + '0% {content: "";}';
        let pr = 100 / text.length;
        let prIncrease = pr;

        for (let i = 0; i < text.length; ++i) {
            let res = '';

            for (let j = 0; j <= i; ++j) res += text[j];

            str += `${pr}% {content: "${res}";}`;
            pr += prIncrease;
        }

        str += `100% {content: "${text}";}} `;
        style.innerHTML = str;
        document.head.appendChild(style);
}
