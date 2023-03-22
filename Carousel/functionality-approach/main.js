console.log('Sample JavaScript #5 HW #17');

function createCarousel(slidesCount = 5, rotateInterval = 7000) {

    let timerID;
    let currentIndex = 0;
    let slidesListLive;
    let indicatorsListLive;
    let isPlay;
    let startPosX;
    let endPosX;

    const CODE_SPACE = 'Space';
    const CODE_ARROW_LEFT = 'ArrowLeft';
    const CODE_ARROW_RIGHT = 'ArrowRight';

    const ROTATE_INTERVAL = rotateInterval;
    const carouselElement = document.getElementById('carousel');

    const imageNames = 'image';

    const nextBtnClass = 'fas fa-chevron-right';
    const prevBtnClass = 'fas fa-chevron-left';

    const slideClass = 'slides__item';
    const activeSlideClass = slideClass +' active';

    const indicatorsClass = 'indicators__item';
    const activeIndicatorsClass = indicatorsClass + ' active';

    const pauseBtnClass = 'fas fa-pause fa-5x';
    const playBtnClass = 'fas fa-play fa-5x';

    const controlsContainersClasses = [
        'controls__item controls__prev',
        'controls__item controls__next',
        'controls__item controls__pause'
    ];

    const containersMap = new Map([
        [{tag:'ul'}, 'slides'],
        [{tag:'div'}, 'indicators'],
        [{tag:'div'}, 'controls'],
    ]);

    const controlsMap = new Map([
        [controlsContainersClasses[0], prevBtnClass],
        [controlsContainersClasses[1], nextBtnClass],
        [controlsContainersClasses[2], pauseBtnClass],
    ]);

    const linksArray = [
        'https://www.w3schools.com/js/default.asp',
        'https://www.w3schools.com/python/default.asp',
        'https://www.w3schools.com/cs/index.php',
        'https://www.w3schools.com/php/default.asp',
        'https://www.w3schools.com/java/default.asp'
    ];

    const calculateCurrentIndex = (number) => (number !== undefined) ? currentIndex = --number 
        : ((slidesListLive.length - 1 === currentIndex) ? 0 : ++currentIndex);

    function initContainers() {
        containersMap.forEach(function (value, key) {
            carouselElement.appendChild(document.createElement(key.tag)).setAttribute('class', value);
        });
    }

    function initSlides(slidesCount) {
        const slidesContainer = document.getElementsByClassName([...containersMap.values()][0])[0];
        
        for (let i = 1; i <= slidesCount; ++i) {
            let slideElement = slidesContainer.appendChild(document.createElement('li'));

            slideElement.setAttribute('class', slideClass);
            slideElement.setAttribute('style', `background-image: url(../assets/img/${imageNames + i}.png)`);
            
            slideElement.innerHTML = `<a href="${linksArray[i - 1]}" class="slide-button" target="_blank"></a>`;
        }

        slidesListLive = slidesContainer.childNodes;
    }

    function initIndicators(slidesCount) {
        const indicatorsContainer = document.getElementsByClassName([...containersMap.values()][1])[0];

        for (let i = 1; i <= slidesCount; ++i ) {

            let indicatorElement = indicatorsContainer.appendChild(document.createElement('span'));

            indicatorElement.setAttribute('class', indicatorsClass);
            indicatorElement.setAttribute('data-slide-to', i);
        }

        indicatorsListLive = indicatorsContainer.childNodes;
    }

    function initContorls() {
        const controlsContainer = document.getElementsByClassName([...containersMap.values()][2])[0];
        
        controlsMap.forEach(function (value, key) {
            let container = document.createElement('div');
            container.setAttribute('class', key);

            container.appendChild(document.createElement('i')).setAttribute('class', value);
            controlsContainer.appendChild(container);
        })

    }

    function initCarousel() {
        initContainers();
        initSlides(slidesCount);
        initIndicators(slidesCount);
        initContorls();
    }

    function hideActiveSlideAndIndicator() {
        slidesListLive.forEach( (slide) => {
            if (slide.getAttribute('class') === activeSlideClass) slide.setAttribute('class', slideClass);
        });

        indicatorsListLive.forEach( (indicator) => {
            if (indicator.getAttribute('class') === activeIndicatorsClass) indicator.setAttribute('class', indicatorsClass);
        });
    }

    function showCurrentSlide() {
        slidesListLive[currentIndex].setAttribute('class', activeSlideClass);
        indicatorsListLive[currentIndex].setAttribute('class', activeIndicatorsClass);
    }

    function disableNextPreviousButtons() {
        document.getElementsByClassName(nextBtnClass)[0].removeEventListener('click', nextSlideButtonHandler);
        document.getElementsByClassName(prevBtnClass)[0].removeEventListener('click', prevSlideButtonHandler);
        document.getElementsByClassName([...containersMap.values()][1])[0].removeEventListener('click', indicatorsHandler);
    }

    function enableNextPreviousButtons() {
        document.getElementsByClassName(nextBtnClass)[0].addEventListener('click', nextSlideButtonHandler);
        document.getElementsByClassName(prevBtnClass)[0].addEventListener('click', prevSlideButtonHandler);
        document.getElementsByClassName([...containersMap.values()][1])[0].addEventListener('click', indicatorsHandler);    
    }

    function startCarousel() {
        let hasActiveSlide = false;

        slidesListLive.forEach((slide) => { if(slide.getAttribute('class') === activeSlideClass) hasActiveSlide = true; });

        if (!hasActiveSlide) {
            showCurrentSlide(currentIndex);
            currentIndex++;
        }
        isPlay = true;
        timerID = setInterval(function () {
            // setTimeout(disableNextPreviousButtons, ROTATE_INTERVAL - 250);
            
            hideActiveSlideAndIndicator();
            
            showCurrentSlide(currentIndex);
            
            currentIndex = calculateCurrentIndex();

            // isPlay = true;
            
            // setTimeout(enableNextPreviousButtons, 1000);
        }, ROTATE_INTERVAL);
    }
    
    function pauseHandler(e) {
        
        clearInterval(timerID);
        isPlay = false;

        const element = e.target;
        element.setAttribute('class', playBtnClass);

        element.removeEventListener('click', pauseHandler);
        element.addEventListener('click', playHandler);
    }

    function playHandler(e) {
        
        const element = e.target;
        element.setAttribute('class', pauseBtnClass);

        element.removeEventListener('click', playHandler);
        element.addEventListener('click', pauseHandler);

        startCarousel();
    }

    function nextSlideButtonHandler() {
        changeSlideOnPauseOrNot('next');
    }

    function prevSlideButtonHandler() {
        changeSlideOnPauseOrNot('prev');
    }

    function indicatorsHandler (e) {
        const target = e.target;

        if (target.className === indicatorsClass) changeSlideOnPauseOrNot(undefined, target);
    }

    function conditionalCalcIndex(param, target) {
        if (param === 'prev') {
            currentIndex = (currentIndex <= 1) ? (currentIndex - 2) + indicatorsListLive.length : currentIndex - 2;
        }
        
        if (target !== undefined && param === undefined) {
            currentIndex = calculateCurrentIndex(Number.parseInt(target.dataset.slideTo));
        }
    
        showCurrentSlide();
        currentIndex = calculateCurrentIndex();
    }

    function changeSlideOnPauseOrNot(p, target) {

        if (isPlay) {
            let playOrPause = {target: document.getElementsByClassName(pauseBtnClass)[0]};

            pauseHandler(playOrPause);
            hideActiveSlideAndIndicator();

            conditionalCalcIndex(p, target);
            
            playHandler(playOrPause);
        }
        else {
            hideActiveSlideAndIndicator();
            conditionalCalcIndex(p, target);
        }

    }

    function pressKeyhandler(e) {
        e.preventDefault();

        if (e.code === CODE_ARROW_LEFT) {
            prevSlideButtonHandler();
        };
        if (e.code === CODE_ARROW_RIGHT) {
            nextSlideButtonHandler();
        };
        if (e.code === CODE_SPACE) {
            if (isPlay !== true) playHandler({target: document.getElementsByClassName(playBtnClass)[0]});
            else pauseHandler({target: document.getElementsByClassName(pauseBtnClass)[0]});
        }; 
    }

    function swipeStartHandler(e) {
        startPosX = (e instanceof MouseEvent) ? e.pageX : e.changedTouches[0].pageX;
    }

    function swipeEndHandler(e) {
        endPosX = (e instanceof MouseEvent) ? e.pageX : e.changedTouches[0].pageX;

        if (endPosX - startPosX > 200) prevSlideButtonHandler();
        if (endPosX - startPosX < -200) nextSlideButtonHandler();
    }

    function initEventlistners() {

        document.getElementsByClassName([...containersMap.values()][1])[0].addEventListener('click', indicatorsHandler);
        document.getElementsByClassName(pauseBtnClass)[0].addEventListener('click', pauseHandler);
        document.getElementsByClassName(controlsContainersClasses[1])[0].addEventListener('click', nextSlideButtonHandler);
        document.getElementsByClassName(controlsContainersClasses[0])[0].addEventListener('click', prevSlideButtonHandler);

        document.addEventListener('keydown', pressKeyhandler);

        document.getElementsByClassName([...containersMap.values()][0])[0].addEventListener('touchstart', swipeStartHandler);
        document.getElementsByClassName([...containersMap.values()][0])[0].addEventListener('touchend', swipeEndHandler);

        document.getElementsByClassName([...containersMap.values()][0])[0].addEventListener('mousedown', swipeStartHandler);
        document.getElementsByClassName([...containersMap.values()][0])[0].addEventListener('mouseup', swipeEndHandler);
    }

    initCarousel();
    initEventlistners();
    
    startCarousel();

}


createCarousel();