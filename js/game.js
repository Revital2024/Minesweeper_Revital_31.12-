'use strict'

// Step1 – the seed app:
// • Create a 4x4 gBoard Matrix containing Objects. 👍
// • Set 2 of them to be mines 👍
// • Present the mines using renderBoard() function 👍

// • Create setMinesNegsCount() and store the numbers 👍
// • Update the renderBoard() function to also display the
// neighbor count and the mines 👍


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gBoard = {
    minesAroundCount: 4,
    isShown: false,
    isMine: false,
    isMarked: true

}

var gLevel = {
    SIZE: 4,
    MINES: 2
}


var board

var MINE = '💣'
var FLAG = '🚩'

var numCells=0


// console.log(gCell)
// • Beginner (4 * 4 with 2 MINES)
// • Medium (8 * 8 with 14 MINES)
// • Expert (12 * 12 with 32 MINES)

function changeLevel(level=4){
    gLevel.SIZE=level
    console.log(' gLevel.SIZE:', gLevel.SIZE)
    if(gLevel.SIZE===8) gLevel.MINES=14
    else if(gLevel.SIZE===12)gLevel.MINES=32
    else gLevel.MINES=2
    console.log( gLevel.SIZE)
    restartGame()

}

function restartGame() {
    gGame.isOn = false
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    onInit()
}

function onInit() {
    
    var board = buildBoard()
    console.table(board)
    renderBoard(board, '.board')
    gGame.isOn = true


}

function getRandomMine() {
    var minesPlaced = 0

    while (minesPlaced < gLevel.MINES) {
        var randomI = getRandomIntInclusive(0, gLevel.SIZE - 1)
        var randomJ = getRandomIntInclusive(0, gLevel.SIZE - 1)

        if (!board[randomI][randomJ].isMine) {
            board[randomI][randomJ] = {
                minesAroundCount: setMinesNegsCount(board, randomI, randomJ),
                isShown: false,
                isMine: true,
                isMarked: true
            }
            minesPlaced++
        }
    }
}

function buildBoard() {
    
    
    board = createMat(gLevel.SIZE, gLevel.SIZE)
    console.log(' board', board)
    console.log(board)

    getRandomMine()

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].isMine) {
                board[i][j] = {
                    isShown: false,
                    isMine: false,
                    isMarked: true,
                    minesAroundCount: setMinesNegsCount(board, i, j)
                }
            }

        }
    }
    console.log('buildBoard:', board)

    return board
}


function setMinesNegsCount(board, rowIdx, colIdx) {
    var mineCount = 0
    if (board[rowIdx][colIdx].isMine) {

        return 0
    }

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue
            if (board[i][j].isMine) mineCount++
        }
    }

    return mineCount
}



function renderBoard(board) {
    var strHTML = '<table>'
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = board[i][j]
            var className = `cell cell-${i}-${j}`
            // strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})"></td>`
            // strHTML += `<td class="${className}" oncontextmenu="onCellMarked(event)"></td>`//להפוך את זה ללחיצה ימנית
            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="onCellMarked(this, ${i}, ${j})"></td>`

        }
        strHTML += '</tr>'
    }
    strHTML += '</table>'
    var elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
    console.log('render:', elContainer)
}

function onCellClicked(elCell, i, j) {

    var cell = board[i][j]


    console.log('var Cell:', cell)

    if (!cell.isShown) cell.isShown = true
    if (cell.isMine) {
        elCell.innerText = MINE
        gGame.shownCount ++



    } else {
        cell.innerText = board[i][j].minesAroundCount
        expandShown(board, elCell,
            i, j)
            gGame.shownCount ++
    }
    checkGameOver(i, j)
    checkVictory()
}


// console.log('Board:', board)
// console.log('i:', i)
// console.log('j:', j)


function expandShown(board, elCell, i, j) {
    if (!board[i][j].isMine && !board[i][j].isShown) {
        board[i][j].isShown = true
        elCell.innerText = board[i][j].minesAroundCount
        if (board[i][j].minesAroundCount === 0) {
            for (var iIdx = i - 1; iIdx <= i + 1; iIdx++) {
                if (iIdx < 0 || iIdx >= board.length) continue
                for (var jIdx = j - 1; jIdx <= j + 1; jIdx++) {
                    if (jIdx < 0 || jIdx >= board[iIdx].length) continue
                    expandShown(board, document.querySelector(`.cell-${iIdx}-${jIdx}`), iIdx, jIdx)
                }
            }
        }
    } else {
        elCell.innerHTML = board[i][j].minesAroundCount
    }

}

function checkGameOver(i, j) {
    var cell = board[i][j]
    if (cell.isShown && cell.isMine) {
        alert('game over!')
        gBoard.isOn = false
    }



}

function checkVictory(){
    var nonMineCells = gLevel.SIZE * gLevel.SIZE - gLevel.MINES
    if(  nonMineCells ===  gGame.shownCount) alert('You win!')
}

function onCellMarked(elCell) {
    
    // console.log('onCellMarked', i, j)
    var cell = board[i][j]

    

    if (!cell.isShown) {
        if (!cell.isMarked) {
            elCell.innerText = '🚩'
            cell.isMarked = true
            gGame.markedCount++
        } else {
          
            elCell.innerText = ''
            cell.isMarked = false
            gGame.markedCount--
        }
    }
        }
   
   




