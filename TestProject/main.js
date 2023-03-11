let answer, inputFileContent, quizMap, curQuestion;

const inputFileElement = document.getElementById('inputFile');

const CLEAR_FORM = 5000, WAIT_FILE = 5000, WAIT_ANSWER = 3000;

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min); 

const parseFileQuestionsAndAnswers = function (str) {
    let result = new Map();
    let raws = str.replaceAll('\r','').split('\n');

    for (let raw of raws) {
        
        let answersArr = new Array();
        let question;

        question = raw.slice(0, raw.indexOf(':'));
        raw = raw.slice(raw.indexOf(':') + 2);

        if (raw.includes(', ')) raw.split(', ').forEach(element => answersArr.push(element));
        else answersArr.push(raw);

        result.set(question,answersArr);
    }

    return result;
}

function inputFileHandler(e) {
    let fileReader = new FileReader();
    fileReader.onload = function() {inputFileContent = fileReader.result;}
    fileReader.readAsText(inputFileElement.files[0]);
}

inputFileElement.addEventListener('change',inputFileHandler);

function changeViewToMenu() {
    let parentElement = inputFileElement.parentElement;
    let element = document.createElement('div');
    
    element.setAttribute('id','questionContainer');
    parentElement.appendChild(element);
    parentElement.replaceChild(element, inputFileElement);
    
    element = document.createElement('div');

    parentElement.appendChild(element)
    parentElement.insertBefore(element, document.getElementById('mainScript')).setAttribute('id', 'answersContainer');

    element = document.createElement('div');
    
    parentElement.appendChild(element);
    parentElement.insertBefore(element, document.getElementById('mainScript')).setAttribute('id','messageContainer');

    element = document.createElement('div');
    parentElement.appendChild(element);
    parentElement.insertBefore(element, document.getElementById('mainScript')).setAttribute('id','controlContainer')
    element.appendChild(document.createElement('button')).setAttribute('id','nextQuestionBtn');
    document.getElementById('nextQuestionBtn').innerHTML = 'Next question'; 
}

function displayQuestionWithAnswers(question, answers) {
    const questionContainerElement = document.getElementById('questionContainer');
    const answersContainerElement = document.getElementById('answersContainer');

    questionContainerElement.appendChild(document.createElement('h1')).appendChild(document.createTextNode(question));
    
    for (const answer of answers) {

        answersContainerElement.appendChild(document.createElement('button')).setAttribute('class', 'answerBtn');
        document.getElementById('answersContainer').lastChild.innerHTML = answer.replace('<correct>','');

    }

}

function resetQuestionForm() {
    document.getElementById('questionContainer').removeChild(document.getElementById('questionContainer').childNodes[0]);

    const answersContainerElement = document.getElementById('answersContainer');

    while (answersContainerElement.firstChild !== null) answersContainerElement.removeChild(answersContainerElement.firstChild);

    document.getElementById('messageContainer').removeChild(document.getElementById('messageContainer').childNodes[0]);
    answer = undefined;
}

function checkValueInArr(value,arr) {
    for (const curVal of arr) if (curVal === value) return true;
    return false;
}

function buttonsListner(e) {
    answer = e.target.childNodes[0].nodeValue;
}

/* function waitForAnswer(milisecond) {

    let timerID = setInterval(function () {
    if (answer === undefined) console.log('waiting for answer');
    else {
        clearInterval(timerID);
        
    };
    }, milisecond)

} */

function createMessageOnPage(text, color) {

    let msgContainer = document.getElementById('messageContainer');

    msgContainer.appendChild(document.createElement('h1')).appendChild(document.createTextNode(text));
    msgContainer.lastChild.style.color = color;
}

function afterAnswer() {
    if (checkAnswer(curQuestion)) createMessageOnPage('correct answer', 'green');
    else createMessageOnPage('incorrect answer', 'red');   
}

function checkAnswer (question) {
    if (quizMap.get(question).indexOf(answer.concat('<correct>')) !== -1) return true;
    return false;
}

async function questionAndAnswersController()  {
    let questions = [ ...quizMap.keys()], availabeQuestions = [ ...quizMap.keys()], i = questions.length;

    while (i) {
        curQuestion = questions[getRandom(0, availabeQuestions.length - 1)];

        if (checkValueInArr(curQuestion, availabeQuestions)) {
            availabeQuestions[availabeQuestions.indexOf(curQuestion)] = undefined;

            displayQuestionWithAnswers(curQuestion, quizMap.get(curQuestion));

            document.getElementById('answersContainer').addEventListener('click', buttonsListner);

            while(answer === undefined) {await sleep(WAIT_ANSWER);};

            document.getElementById('answersContainer').removeEventListener('click',buttonsListner);
        
            afterAnswer();

            await sleep(CLEAR_FORM);
            //in furure will be button 'next question'
            resetQuestionForm();

            --i;
        }
        
    }

    // createMessageOnPage('quiz have been finished');
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

let timerID = setInterval(function () {
    if (inputFileContent === undefined) console.log('waiting for file');
    else {
        console.log('file was loaded');
        clearInterval(timerID);
        
        quizMap = parseFileQuestionsAndAnswers(inputFileContent);
        changeViewToMenu();

        questionAndAnswersController(quizMap);
    }
}, WAIT_FILE);
