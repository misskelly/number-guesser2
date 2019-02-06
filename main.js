var rangeForm = document.querySelector('.range-form');
var minRange = document.querySelector('.min-range');
var maxRange = document.querySelector('.max-range');
var rangeErr = document.querySelector('.range-err');
var rangeErrMessage = document.querySelector('.range-err-message');
var updateBtn = document.querySelector('.update');
var currentMin = document.querySelector('.range-start');
var currentMax = document.querySelector('.range-end');
var resetBtn = document.querySelector('.reset-btn');
var submitBtn = document.querySelector('.submit-btn');
var clearBtn = document.querySelector('.clear-btn');
var inputFields = document.querySelectorAll('input');
var infoInput = document.querySelector('.info-input');
var playerInput = document.querySelectorAll('.player-input');
var name1 = document.querySelector('.name1');
var name2 = document.querySelector('.name2');
var guesses = document.querySelectorAll('.guess');
var guess1 = document.querySelector('.guess1');
var guess2 = document.querySelector('.guess2');
var gameErr = document.querySelector('.game-err');
var gameErrMessage = document.querySelector('.game-error-message');
var scoreName1 = document.querySelector('.score-name1');
var scoreName2 = document.querySelector('.score-name2');
var rightSide = document.querySelector('.right-column');
var gameForm = document.querySelector('.game-form');
var guessResult1 = document.querySelector('.guess-result1');
var guessResult2 = document.querySelector('.guess-result2');
var winnerCard = document.querySelector('.score-card');
var guessMessage1 = document.querySelector('.guess-message1');
var guessMessage2 = document.querySelector('.guess-message2');
var numberOfGuesses = 1;
// var winnerName = document.querySelector('.winner');
var randomNumber = getSolution(1, 100);

updateBtn.addEventListener('click', setRange);
resetBtn.addEventListener('click', resetForm);
// clearBtn.addEventListener('click', );
infoInput.addEventListener('keyup', disableButtons);
submitBtn.addEventListener('click', executeGame);
rightSide.addEventListener('click', findDelete);

function setRange(e) {
    e.preventDefault();
    const min = parseInt(minRange.value) || 1;
    const max = parseInt(maxRange.value) || 100;
    validateRange(min, max);
}

function validateRange(min, max) {
    if (min >= max) {
        rangeErrMessage.innerText = 'Min range value must be lower than max range value';
        errorMessage(rangeErr, [minRange, maxRange]);
        rangeFormInvalid();
    } else if (!rangeForm.checkValidity()) {
        rangeErrMessage.innerText = 'Enter a min and max range using numbers between 1 and 100.';
        errorMessage(rangeErr, [minRange, maxRange]);
        rangeFormInvalid();
    } else { 
        currentMin.innerText = min;
        currentMax.innerText = max;
        getSolution(min, max);
        reverseErrorMessage(rangeErr, [minRange, maxRange]);
    }
}

function errorMessage(err, inputs) {
    err.classList.add('visible');
    inputs.forEach(function(input){
        input.classList.add('input-err');
    });   
}

function reverseErrorMessage(err, inputs) {
    err.classList.remove('visible');
    inputs.forEach(function(input){
        input.classList.remove('input-err');
    });
}

function clearForm(inputs) {
    inputs.forEach(function(input){
        input.value = '';
    });
}

function rangeFormInvalid() {
    event.preventDefault();
    clearForm([minRange, maxRange]);
}

function getSolution(min, max) {
    randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(`Pssst the solution is ${randomNumber}`);
    return randomNumber;
}

function disableButtons() {
    if (playerInput[0].value.length === 0
    && playerInput[1].value.length === 0
    && playerInput[2].value.length === 0
    && playerInput[3].value.length === 0) {
        clearBtn.disabled = true;
        resetBtn.disabled = true;
    } else {
        clearBtn.disabled = false;
        resetBtn.disabled = false;
        !playerInput.required;
    }
}

function validateGuess() {
    guesses.forEach(function(guess) {
        let min = parseInt(currentMin.innerText);
        let max = parseInt(currentMax.innerText);
        let guessVal = parseInt(guess.value);
        guess.min = min;
        guess.max = max;
        if (guessVal < min || guessVal > max) {
            gameErrMessage.innerText =`Guess must be between ${min} and ${max}`;
            errorMessage(gameErr, guesses);
        }
    });
}

function validateGameForm(){
    if (!gameForm.checkValidity()) {
        gameErrMessage.innerText = 'All fields must be filled out.';
        errorMessage(gameErr, playerInput);
        throw false;
    }
    reverseErrorMessage(gameErr, playerInput);
    validateGuess();
}

function displayGuesses() {
    scoreName1.innerText = name1.value;
    scoreName2.innerText = name2.value;
    guessResult1.innerText = guess1.value;
    guessResult2.innerText = guess2.value;
}

function compareGuess() {
    if (guess1.value > randomNumber) {
        guessMessage1.innerText = 'Your Guess is Too High';
    } else if (guess1.value < parseInt(randomNumber)) {
        guessMessage1.innerText = 'Your Guess is Too Low';
    } else if (parseInt(guess1.value) === randomNumber){
        guessMessage1.innerText = 'BOOM!!!';
    }
}

function compareGuess2() {
    if (guess2.value > parseInt(randomNumber)) {
        guessMessage2.innerText = 'Your Guess is Too High';
    } else if (guess2.value < parseInt(randomNumber)) {
        guessMessage2.innerText = 'Your Guess is Too Low';
    } else if (parseInt(guess2.value) === randomNumber) {
        guessMessage2.innerText = 'BOOM!!!';
    }
}

function appendCard(winnerName) {
    let card =
  `<article class="score-card">
    <p class="card-title">${scoreName1.innerText}<span> vs</span>
    ${scoreName2.innerText}</p>
    <hr>
    <h2 class="winner-card"></h2>
    <p class="winner">${winnerName}<span class="winner1">is the WINNER</span></p>
    <hr>
    <section class="score-card-bottom">
    <section class="score-card-item"><span class="guesses">${numberOfGuesses * 2}</span>GUESSES</section>
  <section class="score-card-item"><strong>0</strong> MINUTES</section>
  <button class="score-card-item delete-btn" type="reset">X</button>
</section>
</article>`;
    rightSide.innerHTML += card;
}

function appendWinner() {
    if(randomNumber === parseInt(guess1.value)) {
        appendCard(name1.value);
        increaseDecrease();
    }else if (randomNumber === parseInt(guess2.value)) {
        appendCard(name2.value);
        increaseDecrease();
    }
    numberOfGuesses++;
}

function resetForm(e) {
    e.preventDefault();
    clearForm(inputFields);
    getSolution(1, 100);
    rightSide.innerHTML = '';
}

function executeGame(e) {
    e.preventDefault();
    validateGameForm();
    displayGuesses();
    compareGuess();
    compareGuess2();
    appendWinner(e);
    clearForm(guesses);
    reverseErrorMessage(rangeErr, [minRange, maxRange]);
}

function findDelete(e) {
    var winnerCard = e.target.parentElement.parentElement;
    if (e.target.classList.contains('delete-btn')) {
        winnerCard.remove();
    }
}

function increaseDecrease() {
    const newMin = parseInt(minRange.value) - 10;
    const newMax = parseInt(maxRange.value) + 10;
    minRange.value = newMin;
    maxRange.value =  newMax;
    currentMin.innerText = newMin;
    currentMax.innerText = newMax;
    getSolution(newMin, newMax);
    clearForm(guesses);
}

