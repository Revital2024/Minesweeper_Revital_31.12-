'use strict'

var MINE = '💣'
var FLAG = '🚩'
var firstClickDone = false


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


function replaceMine(rowIdx, colIdx) {
    var randomI = getRandomIntInclusive(0, gLevel.SIZE - 1)
    var randomJ = getRandomIntInclusive(0, gLevel.SIZE - 1)

    var originalMineCell = board[rowIdx][colIdx]
    var newMineCell = board[randomI][randomJ]

    if (originalMineCell.isMine) {
        originalMineCell.isMine = false
        newMineCell.isMine = true

        board[rowIdx][colIdx] = newMineCell
        board[randomI][randomJ] = originalMineCell
    }
}





