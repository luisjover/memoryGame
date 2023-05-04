window.addEventListener("load", checkStartedGame);



function checkStartedGame() {

    const gameStarted = localStorage.getItem("gameStarted");
    if (gameStarted === null || gameStarted === "false") setMain();
    else {
        const currentGameState = JSON.parse(localStorage.getItem("currentGameState"));
        const storyMode = localStorage.getItem("storyMode");
        const currentMode = localStorage.getItem("currentMode");
        const currentTime = localStorage.getItem("currentTime");
        const maxTime = localStorage.getItem("maxTime");
        const currentMoves = localStorage.getItem("currentMoves");
        const maxMoves = localStorage.getItem("maxMoves");
        recoverGame(currentGameState, storyMode, currentMode, currentTime, maxTime, currentMoves, maxMoves);
    }
}

function recoverGame(currentGameState, storyMode, currentMode, currentTime, maxTime, currentMoves, maxMoves) {


    const body = document.querySelector("body");
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    const mainTitle = document.createElement("img");

    //RECOVERING TITLE IMAGE
    header.appendChild(mainTitle);
    body.classList.add("bg-in");
    mainTitle.style.opacity = "0";
    let titleSrc = "";
    //WHAAAAAATSSS HAPPENNIING HEEREEEE!!!!!!!!!!
    if (currentMode === "easy") titleSrc = "src/img/monkey/thesecretoftitle.png";

    else if (currentMode === "mid") titleSrc = "src/img/monkey/thecurseoftitle.png";

    else if (currentMode === "hard") titleSrc = "src/img/monkey/talesoftitle.png";

    changeTitle(titleSrc);

    //RECOVERING TABLE

    const table = document.createElement("section");
    table.classList.add("table");
    main.appendChild(table);
    currentGameState.forEach(function (element) {
        const card = document.createElement("div");
        const cardFront = document.createElement("div");
        const cardFrontImg = document.createElement("img");
        const cardBack = document.createElement("div");
        card.classList.add("card");
        if (element.cardStatus === "flipped") card.classList.add("flipped", "correct");
        cardFront.classList.add("card-front");
        cardBack.classList.add("card-back");
        cardFrontImg.src = element.src;
        card.addEventListener("click", flipCard)
        cardFront.appendChild(cardFrontImg);
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        table.appendChild(card);
    })









    //RECOVERING EVENT LISTENERS
    /*const cards = document.querySelectorAll(".card");

    cards.forEach(function (element) {
        element.addEventListener("click", flipCard);
    });*/
    //RECOVERING MOVES DISPLAY
    const currentMovesDisplay = document.querySelector("#current-moves");
    const divBar = document.querySelector("#div-bar");
    const maxMovesDisplay = document.querySelector("#max-moves");

    currentMovesDisplay.innerText = currentMoves;
    divBar.innerText = "/";
    maxMovesDisplay.innerText = maxMoves;

    //RECOVERING TIME DISPLAY
    const timeOnDisplay = document.querySelector("#current-time");
    if (currentTime >= 10) timeOnDisplay.innerText = `00:${currentTime}`;
    else timeOnDisplay.innerText = `00:0${currentTime}`;

    //CALLING FUNCTION TIMER TO START NEW TIMER WITH ACTUAL REMAINING TIME
    startTimer(currentTime);



}


function setMain() {
    localStorage.setItem("gameStarted", "false");
    localStorage.setItem("currentGameState", "");
    const body = document.querySelector("body");
    const main = document.querySelector("main");
    const mainSection = document.createElement("section");
    const header = document.querySelector("header");
    const mainTitle = document.createElement("img");
    const welcomeTitle = document.createElement("h2");
    const levelSelect = document.createElement("p");
    const modes = ["easy", "mid", "hard", "story", "relax"]
    const mainTitleSrc = "src/img/monkey/mititle.png";
    header.appendChild(mainTitle);
    changeTitle(mainTitleSrc);
    localStorage.setItem("storyMode", "false");


    setTimeout(() => {
        body.classList.add("bg-in");
        mainTitle.style.opacity = "1";

        setTimeout(() => {

            mainSection.classList.add("first-menu");
            welcomeTitle.innerText = "Welcome to Monkey Island..";
            levelSelect.innerText = "Choose a game mode:";
            mainSection.appendChild(welcomeTitle);
            mainSection.appendChild(levelSelect);
            main.appendChild(mainSection);


            for (let i = 0; i < 5; i++) {
                let btn = document.createElement("button")
                btn.classList.add("lvl-btn");
                btn.innerText = modes[i];
                mainSection.appendChild(btn);
                btn.addEventListener("click", setMode);
            }

        }, 2000);

    }, 2000);


}


function setMode(event) {

    cleanMain();
    localStorage.setItem("gameStarted", "true");

    const mode = event.target.innerText;
    setTable(mode);
}




function setTable(mode) {
    const possibleCards = [
        ["src/img/monkey/guybrushpj.png", "src/img/monkey/lechuckpj.png", "src/img/monkey/marleypj.png", "src/img/monkey/thmonkeypj.png"],
        ["src/img/monkey/guybrushsimplepj.png", "src/img/monkey/hermanpj.png", "src/img/monkey/stanpj.png", "src/img/monkey/megalomaniacskullpj.png"],
        ["src/img/monkey/lemonpj.png", "src/img/monkey/phantomlechuckpj.png", "src/img/monkey/cheffpj.png", "src/img/monkey/meathookpj.png"]
    ];

    const levels = [
        {
            cards: possibleCards[0],
            maxMovements: 8
        },
        {
            cards: possibleCards[0].concat(possibleCards[1]),
            maxMovements: 18
        },
        {
            cards: possibleCards[0].concat(possibleCards[1], possibleCards[2]),
            maxMovements: 34
        }
    ];

    const main = document.querySelector("main");
    const table = document.createElement("section");
    let titleSrc = "";

    table.classList.add("table");
    main.appendChild(table);
    let cardsContent;



    if (mode === "easy" || mode === "story") {
        cardsContent = levels[0].cards.concat(levels[0].cards);
        titleSrc = "src/img/monkey/thesecretoftitle.png";

    } else if (mode === "mid") {
        cardsContent = levels[1].cards.concat(levels[1].cards);
        titleSrc = "src/img/monkey/thecurseoftitle.png";

    } else if (mode === "hard") {
        cardsContent = levels[2].cards.concat(levels[2].cards);
        titleSrc = "src/img/monkey/talesoftitle.png";
    }

    changeTitle(titleSrc);

    cardsContent = shuffleCards(cardsContent);

    cardsContent.forEach(function (element) {
        const card = document.createElement("div");
        const cardFront = document.createElement("div");
        const cardFrontImg = document.createElement("img");
        const cardBack = document.createElement("div");
        card.classList.add("card");
        cardFront.classList.add("card-front");
        cardBack.classList.add("card-back");
        cardFrontImg.src = element;
        card.addEventListener("click", flipCard)
        cardFront.appendChild(cardFrontImg);
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        table.appendChild(card);
    });

    if (mode === "story") {
        storyMode("level0");
        mode = "easy";
    }

    localStorage.setItem("currentMode", mode);
    startMovesCounter(mode);
    startTimer(mode);

    saveGameState()
}


function flipCard() {

    const flippedAtFirst = document.querySelectorAll(".flipped:not(.correct)");
    if (flippedAtFirst.length >= 2) return;
    if (flippedAtFirst[0] === this) return;

    this.classList.add("flipped");
    document
        .querySelector("#flip-sound")
        .cloneNode()
        .play();

    const flippedCards = document.querySelectorAll(".flipped:not(.correct)");
    if (flippedCards.length === 2) {
        compareCards(flippedCards);
    };

}

function compareCards(cardsToCompare) {


    const card1 = cardsToCompare[0];
    const card2 = cardsToCompare[1];


    if (card1.firstChild.firstChild.src === card2.firstChild.firstChild.src) {
        updateMovesCounter();
        card1.classList.add("correct");
        card2.classList.add("correct");
        saveGameState();

    } else {
        updateMovesCounter();
        card1.classList.add("mistake");
        card2.classList.add("mistake");

        setTimeout(function () {
            card1.classList.remove("flipped");
            card1.classList.remove("mistake");
            card2.classList.remove("flipped");
            card2.classList.remove("mistake");

        }, 800);

    }


    const pendingCards = document.querySelectorAll(".card:not(.correct)");
    const currentMoves = parseInt(localStorage.getItem("currentMoves"));
    const maxMoves = parseInt(localStorage.getItem("maxMoves"));
    const currentMode = parseInt(localStorage.getItem("currentMode"));
    if (currentMoves === maxMoves && pendingCards.length !== 0) {
        clearInterval(simpleTimeInterval);

        setTimeout(() => {
            gameOver("moves")
        }, 2000);
    }



    if (pendingCards.length === 0) clearInterval(simpleTimeInterval);
    if (pendingCards.length === 0 && checkStoryMode()) storyMode(currentMode);
    else if (pendingCards.length === 0 && !checkStoryMode()) finishGame("normal");
}



function startMovesCounter(mode) {
    const possibleCards = [
        ["src/img/monkey/guybrushpj.png", "src/img/monkey/lechuckpj.png", "src/img/monkey/marleypj.png", "src/img/monkey/thmonkeypj.png"],
        ["src/img/monkey/guybrushsimplepj.png", "src/img/monkey/hermanpj.png", "src/img/monkey/stanpj.png", "src/img/monkey/megalomaniacskullpj.png"],
        ["src/img/monkey/lemonpj.png", "src/img/monkey/phantomlechuckpj.png", "src/img/monkey/cheffpj.png", "src/img/monkey/meathookpj.png"]
    ];

    const levels = [
        {
            cards: possibleCards[0],
            maxMovements: 8
        },
        {
            cards: possibleCards[0].concat(possibleCards[1]),
            maxMovements: 18
        },
        {
            cards: possibleCards[0].concat(possibleCards[1], possibleCards[2]),
            maxMovements: 34
        }
    ];

    const currentMovesDisplay = document.querySelector("#current-moves");
    const divBar = document.querySelector("#div-bar");
    const maxMovesDisplay = document.querySelector("#max-moves");

    const currentMoves = 0;
    let maxMoves = 0;

    if (mode === "easy") maxMoves = levels[0].maxMovements;
    else if (mode === "mid") maxMoves = levels[1].maxMovements;
    else if (mode === "hard") maxMoves = levels[2].maxMovements;

    currentMovesDisplay.innerText = currentMoves;
    divBar.innerText = "/";
    maxMovesDisplay.innerText = maxMoves;

    localStorage.setItem("currentMoves", currentMoves.toString());
    localStorage.setItem("maxMoves", maxMoves.toString());
}


function updateMovesCounter() {

    const currentMovesDisplay = document.querySelector("#current-moves");
    let currentMoves = parseInt(localStorage.getItem("currentMoves"));

    currentMoves += 1;

    currentMovesDisplay.innerText = currentMoves;
    localStorage.setItem("currentMoves", currentMoves.toString());
}

let simpleTimeInterval;
function startTimer(mode) {

    let time;
    if (mode === "easy") time = 14;
    else if (mode === "mid") time = 50;
    else if (mode === "hard") time = 100;
    else time = mode;

    localStorage.setItem("maxTime", time.toString());

    const timeOnDisplay = document.querySelector("#current-time");
    if (time >= 10) timeOnDisplay.innerText = `00:${time}`;
    else timeOnDisplay.innerText = `00:0${time}`;

    simpleTimeInterval = setInterval(() => {
        time--;
        localStorage.setItem("currentTime", time.toString());
        if (time >= 10) timeOnDisplay.innerText = `00:${time}`;
        else timeOnDisplay.innerText = `00:0${time}`;

        if (time === 0) {
            clearInterval(simpleTimeInterval);
            gameOver("time");
        }
    }, 1000);
}





function storyMode(lvlPassed) {
    if (lvlPassed === "level0") localStorage.setItem("storyMode", "true");
    else if (lvlPassed === "easy") {
        setScore(lvlPassed);
        cleanMain();
        setTable("mid");
    }
    else if (lvlPassed === "mid") {
        setScore(lvlPassed);
        cleanMain();
        setTable("hard");
    }
    else if (lvlPassed === "hard") {
        setScore(lvlPassed);
        cleanMain();
        finishGame("story");
    }
}




/* --------------------- FINISH GAME ------------------------- */

function finishGame(mode) {
    if (mode === "normal") {
        resetGameState();
        cleanMain();
        const main = document.querySelector("main");
        const finishSection = document.createElement("section");
        const title = document.createElement("h2");
        const message = document.createElement("p");
        const restart = document.createElement("button");
        restart.addEventListener("click", restartGame);
        finishSection.classList.add("finish");
        title.innerText = "Well Done!!";
        message.innerText = "LeChuck has been defeated and.. wait! What´s that...?";
        restart.innerText = "Restart";
        finishSection.appendChild(title);
        finishSection.appendChild(message);
        finishSection.appendChild(restart);
        main.appendChild(finishSection);
    } else {
        resetGameState();
        setRanking();
    }

}

function gameOver(cause) {
    resetGameState();
    cleanMain();
    const main = document.querySelector("main");
    const gameOverSection = document.createElement("section");
    const title = document.createElement("h2");
    const message = document.createElement("p");
    const imgWrapper = document.createElement("div");
    const img = document.createElement("img");
    const restart = document.createElement("button");
    restart.addEventListener("click", restartGame);
    gameOverSection.classList.add("game-over", "section");
    img.setAttribute("src", "src/img/monkey/guyhanging.gif");
    restart.innerText = "Restart";
    gameOverSection.appendChild(title);
    gameOverSection.appendChild(message);
    gameOverSection.appendChild(restart);
    imgWrapper.appendChild(img);
    gameOverSection.appendChild(imgWrapper);
    main.appendChild(gameOverSection);

    if (cause === "time") {
        title.innerText = "Time´s up!";
        message.innerText = "LeChuck has taken Eleaine and you are.. well, dead...";
    } else if (cause === "moves") {
        title.innerText = "Steps over!";
        message.innerText = "LeChuck has taken Eleaine and you are.. well, dead...";
    }
}


function setRanking() {
    cleanMain();
    const easyScore = parseInt(localStorage.getItem("easyScore"));
    const midScore = parseInt(localStorage.getItem("midScore"));
    const hardScore = parseInt(localStorage.getItem("hardScore"));

    const totalScore = easyScore + midScore + hardScore;
}

/* --------------------- MINOR FUNCTIONS ------------------------- */

function cleanMain() {
    const main = document.querySelector("main");
    main.removeChild(main.firstElementChild);
}

function cleanDisplays() {
    const timeOnDisplay = document.querySelector("#current-time");
    const currentMovesOnDisplay = document.querySelector("#current-moves");
    const maxMovesOnDisplay = document.querySelector("#max-moves")
    const divBar = document.querySelector("#div-bar");

    timeOnDisplay.innerText = "";
    currentMovesOnDisplay.innerText = "";
    divBar.innerText = "";
    maxMovesOnDisplay.innerText = "";
}


function changeTitle(newTitle) {
    let mainTitle = document.querySelector("header img");
    mainTitle.style.opacity = "0";

    setTimeout(() => {
        mainTitle.src = newTitle;
        mainTitle.style.opacity = "1";
    }, 1500);
}

function shuffleCards(arr) {
    return arr.sort(() => Math.random() - 0.5);
}


function checkStoryMode() {
    const storyMode = parseInt(localStorage.getItem("storyMode"));
    return storyMode;
}

function saveGameState() {
    const gameState = [];
    const cards = document.querySelectorAll(".table .card");
    const cardsImg = document.querySelectorAll(".table .card img");
    for (let i = 0; i < cards.length; i++) {
        let cardStatus = "normal";
        if (cards[i].classList.contains("correct")) cardStatus = "flipped";
        const cardState = {
            cardStatus: cardStatus,
            src: cardsImg[i].src
        }

        gameState.push(cardState)
    }
    localStorage.setItem("currentGameState", JSON.stringify(gameState));
}


function resetGameState() {
    localStorage.setItem("gameStarted", "false");
    localStorage.setItem("currentGameState", "");
}


function setScore(level) {
    const maxMoves = parseInt(localStorage.getItem("maxMoves"));
    const currentMoves = parseInt(localStorage.getItem("currentMoves"));
    const currentTime = parseInt(localStorage.getItem("currentTime"));

    const movePoints = maxMoves - currentMoves;
    const timePoints = currentTime;

    const totalPoints = movePoints + timePoints;

    localStorage.setItem(`${level}Score`, totalPoints.toString());
}

function restartGame() {
    cleanMain();
    cleanDisplays();
    setMain();
}


/* -------------------------------- PERSONALIZED CURSOR --------------------------------*/

const mouseCursor = document.querySelector(".cursor");
const vCursor = document.querySelectorAll(".vertical");
const hCursor = document.querySelectorAll(".horizontal");


window.addEventListener("mousemove", moveCursor);

window.addEventListener("mousedown", () => {
    vCursor.forEach(element => element.classList.add("cursor--click"));
    hCursor.forEach(element => element.classList.add("cursor--click"));
});
window.addEventListener("mouseup", () => {
    vCursor.forEach(element => element.classList.remove("cursor--click"));
    hCursor.forEach(element => element.classList.remove("cursor--click"));
});

function moveCursor(e) {
    mouseCursor.style.top = e.pageY + "px";
    mouseCursor.style.left = e.pageX + "px";
}