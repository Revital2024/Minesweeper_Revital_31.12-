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
// var gBoard = {
//     minesAroundCount: 4,
//     isShown: false,
//     isMine: false,
//     isMarked: true

// }

var gLevel = {
    SIZE: 4,
    MINES: 2
}


var board

var MINE = '💣'


// console.log(gCell)

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
    console.log(board)

    getRandomMine()
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].isMine) {
                board[i][j] = {
                    minesAroundCount: setMinesNegsCount(board, i, j),
                    isShown: false,
                    isMine: false,
                    isMarked: true
                }
            }
            console.log(`[${i}][${j}]:`, board[i][j])
        }
    }

    return board
}


function setMinesNegsCount(board, rowIdx, colIdx) {
    var mineCount = 0

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
            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</table>'
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function onCellClicked(elCell, i, j) {
    console.log('Clicked function:',elCell, i, j)
    var cell = board[i][j]
    
    console.log('var Cell:', cell)

    if (!cell.isShown) cell.isShown = true
    if (board.isMine) {
        cell.innerText = MINE
        checkGameOver()
    } else {
        cell.innerText = board.minesAroundCount
        expandShown(board, elCell,
            i, j)
    }
}

function expandShown(board, elCell, i, j) {
    if (!board[i][j].isMine) {
        for (var iIdx = i - 1; iIdx <= i + 1; iIdx++) {
            if (iIdx < 0 || iIdx >= board.length) continue
            for (var jIdx = j - 1; jIdx <= j + 1; jIdx++) {
                if (jIdx < 0 || jIdx >= board[iIdx].length) continue
                if (!board[iIdx][jIdx].isMine) elCell.innerText = board[iIdx][jIdx].minesAroundCount
            }
        }
    }
}

function checkGameOver() {

    // if(board.isMine) {
        alert('game over!')
    }



// if (num !== gNextNumber) return

// if (num === 1) {
//     startTimer()
// } else if (num === gSize ** 2) {
//     clearInterval(gTimer)
// }
// if (gNextNumber !== gSize ** 2) gNextNumber++

// var elCell = document.querySelector('.panel )
// elCell.innerText = `${`

// elNumBtn.classList.add('clicked')