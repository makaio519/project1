
var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = []
var rows = 9;
var columns = 9;
var score = 0;

var currTile; //piece clicking on
var otherTile; //piece swapping with

window.onload = function() {
    startGame(); 

    // 1/10 of a second 
    window.setInterval(function(){
        crushCandy();
    }, 100);
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
            tile.addEventListener("dragstart", dragStart); //click on a piece, initialize drag process 
            tile.addEventListener("dragover", dragOver); //clicking on a piece, moving mouse to drag the piece
            tile.addEventListener("dragenter", dragEnter); //dragging piece onto another piece
            tile.addEventListener("dragleave", dragLeave); //leave piece over another piece
            tile.addEventListener("drop", dragDrop); //dropping piece over another piece
            tile.addEventListener("dragend", dragEnd); //after drag process completed, swap pieces

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function dragStart() {
    //refes to tile that was clicked on for dragging
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //refers to target tile that was dropped on
    otherTile = this;
}

function dragEnd() {
    // don't swap candy with blank tile
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }
    //current row and column coordinates 
    let currCoords = currTile.id.split("-"); // id= "0-0" -> ["0", "0"] 
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);
    //other row and column coordinates
    let otherCorods = otherTile.id.split("-");
    let r2 = parseInt(otherCorods[0]);
    let c2 = parseInt(otherCorods[1]);
    // check for adjacency
    let moveLeft = c2 == c-1 && r == r2; 
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c ==c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
    // ONLY swap if adjacent
    if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
    // when swap with candies, can crush at least 3 in a row or 3 in a column
    let validMove = checkValid();
    if (!validMove) {
        let currImg = currTile.src;
        let otherImg = otherTile;
        currTile.src = otherImg;
        otherTile.src = currImg;
    }
    }
}
// crush tiles
function crushCandy() {
    //crushFive();
    //crushFour();
    crushThree();
}

function crushThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank" )) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank" )) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
        }
    }
}

}