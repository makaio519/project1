/*
MECHANICS TO IMPLEMENT
when crush candy generate next tier tile 
TURN SYSTEM
*/

var candies = ["bcoin", "scoin", "gcoin", "cbag", "chest1", "chest2", "chest3"];
// var chests = ["chest1", "chest2", chest3]
var board = []
var rows = 9;
var columns = 9;
var score = 0;
var turns = 10;

var currTile; //piece clicking on
var otherTile; //piece swapping with

window.onload = function() {
    startGame(); 

    // 1/10 of a second 
    window.setInterval(function(){
        crushCandy();
        slideCandy(); //everytime crush candy, slide candies down
        generateCandy(); //generate candy after slides
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
            let candyType = randomCandy(); // intermediate variable constant candy 
            // assign random candy to candyname 
            // 
            tile.src = "./images/" + candyType + ".png";
            tile.candyId = candies.indexOf(candyType);
            // tile id 

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
    //refers to tile that was clicked on for dragging
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
    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);
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
        let otherImg = otherTile.src; 
        
        currTile.src = otherImg; //   "./images/scoin.png"
        otherTile.src = currImg; // 
        const currTileId = currtile.candyId

        currTile.candyId = otherTile.candyId 
        otherTile.candyId = currTileId
    } 
    turns -=1;
    }
}
// endGame function FIX PLS
function endGame() {
    if (turns === 0) {
        isGameOver = true;
        alert("Game Over!");
        return;
    } else {
        isGameOver = false;
    }        
}
// crush tiles functions
function crushCandy() {
    crushSix();
    // crushFiveL();
    // crushFiveLv1();
    // crushFiveLv2();
    // crushFiveLv3();
    crushFiveT();
    // crushFiveTv1();
    // crushFiveTv2();
    // crushFivev3();
    crushFive();
    crushFour();
    crushThree();
    document.getElementById("score").innerText = score; // score
    document.getElementById("turns").innerText = turns; // turns
}
//crushSix function
function crushSix() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-6; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            let candy5 = board[r][c+4];
            let candy6 = board[r][c+5];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && candy5.src == candy6.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                candy6.src = "./images/blank.png";
                // let otherCoords = otherTile.id.split("-");
                let currCoords = currTile.id.split("-");
                upgradeTile(currCoords[0], currCoords[1], currTile.candyId);
                // upgradeTile(currTile, c2, otherTile.candyId);
                score += 60;    
            }
        }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-6; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            let candy5 = board[r+4][c];
            let candy6 = board[r+5][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && candy5.src == candy6.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                candy6.src = "./images/blank.png";
                let currCoords = currTile.id.split("-");
                upgradeTile(currCoords[0], currCoords[1], currTile.candyId);
                score += 60;
            }
        }
    }
}
// crushThree valid move check function
function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    return false;
}
// // crushFiveT function
// function crushFiveT() {
//     //check variation 1
//     for (let r = 0; r < rows-3; r++) {
//         for (let c = 0; c < columns-3; c++) {
//             let candy1 = board[r][c];
//             let candy2 = board[r][c+1];
//             let candy3 = board[r][c+2];
//             let candy4 = board[r+1][c+1];
//             let candy5 = board[r+2][c+1];
//             if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank")) {
//                 candy1.src = "./images/blank.png";
//                 candy2.src = "./images/blank.png";
//                 candy3.src = "./images/blank.png";
//                 candy4.src = "./images/blank.png";
//                 candy5.src = "./images/blank.png";
//                 score += 50;
//                 turns += 2;
//             }
//         }
//     }    
//     //check variation 2
//     for (let c = 0; c < columns; c++) {
//         for (let r = 0; r < rows-4; r++) {
//             let candy1 = board[r][c];
//             let candy2 = board[r][c+1];
//             let candy3 = board[r][c+2];
//             //let candy4 = board[r-1][c+2];
//             let candy5 = board[r+1][c+2];
//             //if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank")) {
//                 candy1.src = "./images/blank.png";
//                 candy2.src = "./images/blank.png";
//                 candy3.src = "./images/blank.png";
//                 candy4.src = "./images/blank.png";
//                 candy5.src = "./images/blank.png";
//                 score += 50;
//                 turns += 2;
//             }
//         }
//     }
// // crushFiveT valid move check function
// function checkValid() {
//     //check variation1
//     for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < columns-3; c++) {
//             let candy1 = board[r][c];
//             let candy2 = board[r][c+1];
//             let candy3 = board[r][c+2];
//             let candy4 = board[r+1][c+1];
//             let candy5 = board[r+2][c+1];
//             if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank")) {
//                 return true;
//             }
//         }
//     }
//     //check variation2
//     for (let c = 0; c < columns; c++) {
//         for (let r = 0; r < rows-3; r++) {
//             let candy1 = board[r][c];
//             let candy2 = board[r][c+1];
//             let candy3 = board[r][c+2];
//             let candy4 = board[r-1][c+2];
//             let candy5 = board[r+1][c+2];
//             if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank")) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }
// crushFive function
function crushFive() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-4; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            let candy5 = board[r][c+4]
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                score += 50;
                turns += 2;
            }
        }
    }    
    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-4; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            let candy5 = board[r+4][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                candy5.src = "./images/blank.png";
                score += 50;
                turns += 2;
            }
        }
    }
}
// crushFive valid move check function
function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-4; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            let candy5 = board[r][c+4];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-4; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            let candy5 = board[r+4][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && candy4.src == candy5.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    return false;
}
// crushFour function
function crushFour() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 40;
                turns += 1;
            }
        }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-3; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";
                score += 40;
                turns += 1;
            }
        }
    }
}
// crushFour valid move check function
function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-3; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    return false;
}
//crushThree function
function crushThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                // let otherCoords = otherTile.id.split("-");
                let currCoords = currTile.id.split("-");
                upgradeTile(currCoords[0], currCoords[1], currTile.candyId);
                // upgradeTile(currTile, c2, otherTile.candyId);
                score += 30;    
            }
        }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                let currCoords = currTile.id.split("-");
                upgradeTile(currCoords[0], currCoords[1], currTile.candyId);
                score += 30;
            }
        }
    }
}
// crushThree valid move check function
function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    return false;
}

// Upgrade tile function here
function upgradeTile(row, column, idx) {
    if (idx < 6) {
        board[row][column].src = "./images/" + candies[idx+1] + ".png";
    }
}

// slide tiles function
function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r --) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for (let r = ind; r >=0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}
// generate tiles function
function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}