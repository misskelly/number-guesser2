var minRange = document.querySelector('.min-range');
var maxRange = document.querySelector('.max-range');
var updateBtn = document.querySelector('.update');
var currentMin = document.querySelector('.range-start');
var currentMax = document.querySelector('.range-end');

updateBtn.addEventListener('click', updateRange);

function updateRange() {
    currentMin.innerText = minRange.value;
    currentMax.innerText = maxRange.value;
}


// checkValidity()