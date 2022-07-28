var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = []
var rows = 9;
var columns = 9;
var score = 0;

window.onload = function() {
    startGame();
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)]; //0 - 5.99
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //<img id="0-0" src="./images/Red.png">
            let tile = document.createElement("img")
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            // Event listeners
            tile.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process 
            tile.addEventListener("dragover", dragOver); //clicking on a candy, moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
            tile.addEventListener("dragleave", dragLeave); //leave candy over another candy
            tile.addEventListener("dragend", dragEnd); //after drag process completed, swap candies
            tile.addEventListener("dragdrop", dragDrop); //dropping candy over another candy

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}