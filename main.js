var minRange = document.querySelector('.min-range');
var maxRange = document.querySelector('.max-range');
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
var guess1 = document.querySelector('.guess1');
var guess2 = document.querySelector('.guess2');
var scoreName1 = document.querySelector('.score-name1');
var scoreName2 = document.querySelector('.score-name2');
var rightSide = document.querySelector('.right-column'); 
var guessResult1 = document.querySelector('.guess-result1');
var guessResult2 = document.querySelector('.guess-result2');
var winnerCard = document.querySelector('.score-card');
var randomNumber = getSolution(1, 100);

updateBtn.addEventListener('click', setRange);
resetBtn.addEventListener('click', resetForm);
infoInput.addEventListener('keyup', disableButtons);
submitBtn.addEventListener('click', executeGame);



function setRange() {
    const min = parseInt(minRange.value, 10) || 1;
    const max = parseInt(maxRange.value, 10) || 100;
    currentMin.innerText = min;
    currentMax.innerText = max;
    console.log(min, max);
    getSolution(min, max);
}


function getSolution(min, max) {
    var solution = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(solution);
    return solution;
}

// function enableButtons() {
//     debugger
//     for (var i = 0; i < playerInput.length; i++) {
//         if (playerInput[i].value.length > 0){
//             resetBtn.disabled = false;
//             clearBtn.disabled = false;      
//         } else {
//             resetBtn.disabled = true;
//             clearBtn.disabled = true;
//     }
//   }
// }


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

function displayGuesses() {
  scoreName1.innerText = name1.value;
  scoreName2.innerText = name2.value;
  guessResult1.innerText = guess1.value;
  guessResult2.innerText = guess2.value;
};

function appendCard(winnerName) {
  let card =
  `<article class="score-card">
    <p class="card-title">${scoreName1.innerText}<span> vs</span>
    ${scoreName2.innerText}</p>
    <hr>
    <h2 class="winner-card"></h2>
    <p class="winner">${winnerName} is the WINNER</p>
    <hr>
    <section class="score-card-bottom">
    <section class="score-card-item"><strong>0</strong> GUESSES</section>
  <section class="score-card-item"><strong>0</strong> MINUTES</section>
  <button class="score-card-item delete-btn" type="reset">X</button>
</section>
</article>`
  rightSide.innerHTML += card
};

function appendWinner() {
  if(randomNumber === parseInt(guess1.value)) {
    appendCard(name1.value);
  }else if (randomNumber === parseInt(guess2.value)) {
    appendCard(name2.value);
  }
}

function resetForm(e) {
    e.preventDefault();
    inputFields.forEach(function(input){
        input.value = '';
        getSolution();
    });
}

function executeGame(e) {
  e.preventDefault();
  displayGuesses();
  appendWinner();
}
