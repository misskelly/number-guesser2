var minRange = document.querySelector('.min-range');
var maxRange = document.querySelector('.max-range');
var updateBtn = document.querySelector('.update');
var currentMin = document.querySelector('.range-start');
var currentMax = document.querySelector('.range-end');
var resetBtn = document.querySelector('.reset-btn');
var clearBtn = document.querySelector('.clear-btn');
var inputFields = document.querySelectorAll('input');
var infoInput = document.querySelector('.info-input');
var playerInput = document.querySelectorAll('.player-input');
var randomNumber = getSolution(1, 100);

updateBtn.addEventListener('click', setRange);
resetBtn.addEventListener('click', resetForm);
infoInput.addEventListener('keyup', disableButtons);


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


function resetForm(e) {
    e.preventDefault();
    inputFields.forEach(function(input){
        input.value = '';
    });
}
