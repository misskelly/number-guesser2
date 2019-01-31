var minRange = document.querySelector('.min-range');
var maxRange = document.querySelector('.max-range');
var updateBtn = document.querySelector('.update');
var currentMin = document.querySelector('.range-start');
var currentMax = document.querySelector('.range-end');
var resetBtn = document.querySelector('.reset-btn');
var inputFields = document.querySelectorAll('input');

updateBtn.addEventListener('click', setRange);

resetBtn.addEventListener('click', resetForm);



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
}

function resetForm(e) {
  e.preventDefault();
  inputFields.forEach(function(input){
    input.value = ""
  });
}


// checkValidity()