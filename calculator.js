let screenData = "0";
let runningTotal = 0;
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    renderScreenData();
}

function handleNumber(number) {
    if (screenData === '0') {
        screenData = number;
    } else {
        screenData += number;
    }
}

function handleMath(value) {
    if (screenData === '0') {
        //do nothing
        return;
    }

    const intScreenData = parseInt(screenData);
    if (runningTotal === 0) {
        runningTotal = intScreenData;
    } else {
        backgroundMath(intScreenData);
    }

    previousOperator = value;
    screenData = '0';
    console.log(runningTotal);
}

function backgroundMath(intScreenData) {
    if (previousOperator === '+') {
        runningTotal += intScreenData;
    } else if (previousOperator === '-') {
        runningTotal -= intScreenData;
    } else if (previousOperator === 'x') {
        runningTotal *= intScreenData;
    } else if (previousOperator === '+') {
        runningTotal += intScreenData;
    }
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C': 
            screenData ='0';
            break;

        case '=':
            if (previousOperator === null) {
                return;
            }
            backgroundMath(parseInt(screenData));
            previousOperator = null;
            screenData = "" + runningTotal; //this keeps the value as a string
            runningTotal = '0';
            break;

        case 'del':
            if (screenData.length === 1) {
                screenData = '0';
            } else {
                screenData = screenData.substring(0, screenData.length - 1);
            }
            break;

        case '/':
            handleMath(symbol);
            break;

        case 'x':
            handleMath(symbol);
            break;

        case '-':
            handleMath(symbol);
            break;
            
        case '+':
            handleMath(symbol);
            break;
    }
}

function init() {
    document
    .querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    })
}

function renderScreenData () {
    screen.innerText = screenData;
}

init();