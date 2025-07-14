let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgame = document.querySelectorAll(".newGame")
let msgWin = document.querySelector(".winningMsg");
let win = document.querySelector("#msg");
let drawMsg = document.querySelector(".drawMsg");
let draw = document.querySelector("#draw");

let turnO = true;

let winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableboxes()
    msgWin.classList.add("hide");
    drawMsg.classList.add("hide");

};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerHTML = "O";
            turnO = false;

        }
        else {
            box.innerHTML = "X";
            turnO = true;
        }
        box.disabled = true;

        const someone = checkWinner()
        if (!someone) {
            checkDraw();
        }
    });
});

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    win.innerText = `Congratulation, The Winner is ${winner}`;
    msgWin.classList.remove("hide");
    disableboxes();
}

const showDraw = () => {
    draw.innerText = `It's a Draw!`;
    drawMsg.classList.remove("hide");
    disableboxes();
}

const boardIsFull = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false;
        }
    }
    return true;
}

const checkDraw = () => {
    if (boardIsFull()) {
        showDraw();
    }
}

const checkWinner = () => {
    for (let pattern of winPattern) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;
        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 === val2 && val2 === val3) {
                showWinner(val1);
                return true;

            }
        }
    }
    return false;
}
reset.addEventListener("click", resetGame)
newgame.forEach(btn => btn.addEventListener("click", resetGame));