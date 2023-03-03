
let inputFileContent;
const inputFileElement = document.getElementById('inputFile');

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

function changeToMenu() {
    
}

let timerID = setInterval(function () {
    if (inputFileContent === undefined) console.log('waiting for file...');
    else {
        console.log('file was loaded');
        clearInterval(timerID);
        
        let quizMap = parseFileQuestionsAndAnswers(inputFileContent);
        console.log(quizMap);
    }
},5000);
