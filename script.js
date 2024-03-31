console.log("Welcome to Tic Tac Toe");
let gamesound = new Audio("sound.mp3");
let turn = "X";
let gameover = false;

// Function to change the turn
const changeTurn = () => {
    return turn == "X" ? "O" : "X";
};

// Function to check for win
const checkWin = () => {
    let boxtext = document.getElementsByClassName("boxtext");
    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    let filled = true; // Variable to track if all boxes are filled
    win.forEach((e) => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".info").innerText =
                boxtext[e[0]].innerText + " Won";
            gameover = true;
        }
    });

    // Check for tie only if the game is not already over
    if (!gameover) {
        Array.from(boxtext).forEach((box) => {
            if (box.innerText === "") {
                filled = false;
            }
        });
        if (filled) {
            document.querySelector(".info").innerText = "It's a Tie!";
            gameover = true;
        }
    }
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === "" && !gameover) { // Only allow moves if box is empty and game is not over
            gamesound.play();
            boxtext.innerText = turn;
            turn = changeTurn();
            checkWin();
            if (!gameover) {
                document.getElementsByClassName("info")[0].innerText =
                    "Turn for " + turn;
            }
        }
    });
});

// Reset Button Logic
document.getElementById("btn").addEventListener("click", () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
        element.innerText = "";
    });
    turn = "X";
    gameover = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    enableClicks(); // Enable click events on boxes
});

// Function to disable click events on boxes
const disableClicks = () => {
    Array.from(boxes).forEach((element) => {
        element.style.pointerEvents = "none";
    });
};

// Function to enable click events on boxes
const enableClicks = () => {
    Array.from(boxes).forEach((element) => {
        element.style.pointerEvents = "auto";
    });
};

