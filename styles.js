let startedGameTime = 0;
let endGameTime = 0;
let lastTimeMissedMole = 0;
let violationKlicked = 0
let debounce = false
let moleHit = false
let numberofClicks = 0

// window.onload = function () {
// };

function startGame () {
    startedGameTime = new Date();
    // showElapsedTime()
    startAnimate();
}

function stopGame () {
    endGameTime = new Date();
}

function restart () {
    location.reload();
}

function startAnimate() {
    if (!moleHit) {
        var min = 2,
            max = 5;
        var rand = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number between 2-5
        if (!debounce) {
            showMole()
        }
        setTimeout(startAnimate, rand * 1000);
    }
}

function showMole() {
    var minIndex = 0,
        maxIndex = 2;
    var randIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex);
    var elements = document.getElementsByClassName('hole');
    elements[randIndex].querySelector('.mole').classList.remove('hidden');

    hideMole(randIndex, elements[randIndex].querySelector('.mole'))
}

function hideMole(randIndex, element) {
    var minTimeout = 200,
        maxTimeout = 800;
    var randIndex = Math.floor(Math.random() * (minTimeout - maxTimeout + 1) + maxTimeout);

    function hide() {
        element.classList.add('hidden');
    }
    setTimeout(hide, 1000);
}

function hitMole(event) {
    event.stopPropagation();
    numberofClicks += 1
    showClicks(0)
    moleHit = true
    endGameTime = new Date()
    const gameTime = ((endGameTime - startedGameTime) / 1000)

    alert(`Congratulation, you hit the mole in ${Math.round(gameTime)} seconds and ${numberofClicks} clicks`)

    restart()
}

function missedMole() {
    let currentTime = new Date()
    if (startedGameTime !== 0 ) {
        if(!debounce) {
            numberofClicks += 1
            showClicks()
        }
        if ((new Date()).getTime() - lastTimeMissedMole < 1000) {
            violationKlicked += 1
            lastTimeMissedMole = (new Date()).getTime()
            if (violationKlicked + 1 > 3) {
                debounceMole()
            }
        } else {
            lastTimeMissedMole = (new Date()).getTime()
        }
    }
    
}

function debounceMole() {
    debounce = true

    const elementsHole = document.querySelectorAll('.hole');
    elementsHole.forEach(element => {
        element.style.backgroundColor = 'red';
    });

    setTimeout(() => {
        debounce = false
        elementsHole.forEach(element => {
            element.style.backgroundColor = '#000';
        });
    }, 5000)
}

function congrats() {
    const elementsHole = document.querySelectorAll('.hole');
    elementsHole.forEach(element => {
        element.classList.toggle('bg-orange');
    });

    document.querySelector(".congrats").classList.toggle("hidden")
}

function showClicks (number) {
    document.getElementById("clicks").innerHTML = `Clicks:  ${number ? number : numberofClicks}`;
}

function showElapsedTime () {
    setInterval(() => {
        let currentTime = new Date()
        let elapsedTime = (currentTime - startedGameTime) / 1000;
        document.getElementById("elapse-time").innerHTML = `Elapsed time: ${Math.floor(elapsedTime)} seconds` ;
    }, 1000);
}
