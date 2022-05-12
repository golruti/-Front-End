let word;
let currntBoard;
const time = 60 * 1000;
let users = [];
let leftWord = 12;
let numCard = 0;
let Level = 0;
let sumAll = 0;
let timer;
let points_ = document.getElementById("points");
const games = []
let game = document.getElementById("game");
game.addEventListener('load', Game);


const answers = [
    [
        "boardGame3", "boardGame2"
    ], [
        "boardGame4", "boardGame5"
    ]

];


function findelement(event) {
    event.currentTarget.alt;
    let foundElement = event.currentTarget.alt;
    for (const item of word) {
        if (item.innerText === foundElement) {
            if (!item.className.includes("found")) {
                item.classList.add("found")
                // document.getElementById("findVoice").play()
                leftWord--;
                checkStatus();
            }
        }
    }
    document.getElementById("findVoice").play()
    animations(event);
}

function animations(event) {

    let div = document.getElementById("aylana")
    let x = event.screenX;
    let y = event.screenY;
    div.style.top = event.clientY - 150 + "px";
    div.style.left = event.clientX - 150 + "px";
    div.style.display = "block"
    div.style.position = "fixed"

    setTimeout(() => {

        div.style.display = "none"
    }, 2000);

}

function Game() {
    console.log("******   ---- -  start game;  - -------- *****");
    numCard = 0;
    Level = 0;
    startStep();

}

function startStep() {

    currntBoard = answers[Level][numCard];
    word = document.getElementById(currntBoard).getElementsByClassName("word");
    updateNotFound();
    leftWord = 12;
    
    localStorage.setItem("level", currntBoard);

    document.getElementById(localStorage.getItem("level")).style.display = "block";


    timer = setTimeout(() => {
        if (gameFinish()) {
            finishStep();
        }
        else {
            doStepAgain();
        }

    }, 90000);

}

function doStepAgain() {
    let lost = document.getElementById('lost');
    lost.style.display = 'block';
    document.getElementById("lostVoice").play()
    setTimeout(() => {
        lost.style.display = 'none';
        let currentTimer = document.getElementById(currntBoard).getElementsByClassName('timer')[0];
        currentTimer.classList.remove("timer");
        setTimeout(() => {
            void currentTimer.offsetWidth;
            currentTimer.classList.add("timer");
        }, 100);
        startStep();
    }, 2000);
}


function finishStep() {
    localStorage.removeItem("level");
    currntBoard = answers[Level][numCard];
    document.getElementById(currntBoard).style.display = "none";
    numCard++;

    if (numCard == answers[Level].length) {
        Level++;
        if (Level == answers.length) {
            document.getElementById("winVoice").play()
            document.getElementById("winbuttton").style.display = "block";
            document.getElementById("winner").style.display = "block";
            
           
            return;
        }
        else {
            numCard = 0;
            
            document.getElementById("massage").style.display = "block";
            setTimeout(() => {
                document.getElementById("winVoice").play()
                console.log(document.getElementById("massage"));
                document.getElementById("massage").style.display = "none";
                document.getElementById(answers[Level][numCard]).style.display = "block";
                startStep();
            }, 3000);
        }
    }
    else {
        document.getElementById("nextVoice").play()
        document.getElementById(answers[Level][numCard]).style.display = "block"; 
        startStep();
    }

}

function gameFinish() {
    return leftWord <= 0
}

function checkStatus() {
    if (gameFinish()) {
        clearTimeout(timer);
        finishStep();
    }
}



function updateNotFound() {
    for (const item of word) {
        item.className = "word"
    }
}

const dark1 = document.getElementById('image1');
const dark2 = document.getElementById('image2');
const circleSize = 190;
dark1.addEventListener('mousemove', event => dark1.querySelector('#dark1').style.backgroundImage =
    `radial-gradient(circle at ${event.offsetX}px ${event.offsetY}px, transparent, black ${circleSize}px`);
dark2.addEventListener('mousemove', event => dark2.querySelector('#dark2').style.backgroundImage =
    `radial-gradient(circle at ${event.offsetX}px ${event.offsetY}px, transparent, black ${circleSize}px`);
