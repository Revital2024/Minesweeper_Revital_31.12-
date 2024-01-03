'use strict'


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

var elSmiley= document.querySelector('.smiley')
var livesCount=3
var elLive=document.querySelector('.lives')



var numCells = 0

function changeLevel(level = 4) {
    gLevel.SIZE = level
    console.log(' gLevel.SIZE:', gLevel.SIZE)
    if (gLevel.SIZE === 8) gLevel.MINES = 14
    else if (gLevel.SIZE === 12) gLevel.MINES = 32
    else gLevel.MINES = 2
    console.log(gLevel.SIZE)
    restartGame()

}

function restartGame() {
    // gGame.isOn = false
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    livesCount=3
    elSmiley.innerText='😃'
    onInit()
}

function onInit() {

    var board = buildBoard()
    console.table(board)
    renderBoard(board, '.board')
    gGame.isOn = true
    resetStopwatch()


}



function buildBoard() {


    board = createMat(gLevel.SIZE, gLevel.SIZE)
    console.log(' board', board)
    console.log(board)

    getRandomMine(board)

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


function renderBoard(board) {
    var strHTML = '<table>'
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = board[i][j]
            var className = `cell cell-${i}-${j}`
            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})"return oncontextmenu="onCellMarked(this, ${i}, ${j})"></td>`

        }
        strHTML += '</tr>'
    }
    strHTML += '</table>'
    var elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
    console.log('render:', elContainer)
}

function losingLive(){

    livesCount--
 if(livesCount===2) elLive.innerText='❤️❤️'
 if(livesCount===1) elLive.innerText='❤️'
 if(livesCount===0) elLive.innerText=''
 
    
}

function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    var cell = board[i][j]

    if (gGame.isOn) {
    
        if (!cell.isShown) {
           
            cell.isShown = true
            if (cell.isMine) {
                elCell.innerText = MINE
                gGame.shownCount++
                losingLive()
            } else {
                expandShown(board, elCell, i, j)
                gGame.shownCount++
                gGame.secsPassed = startStopwatch()
            }
            checkGameOver(i, j)
            checkVictory()
        }
    }
}





function expandShown(board, elCell, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue

            var currentCell = board[i][j]

            if (!currentCell.isMine && !currentCell.isShown) {
                // elCell.innerText = currentCell.minesAroundCount
                var neighborCell = document.querySelector(`.cell-${i}-${j}`)
                neighborCell.innerText = currentCell.minesAroundCount
              


               
            }
        }
    }
}






// function expandShown(board, elCell, i, j) {
//     console.log('התא שנחשף עכשיו הוא?', i, j)
//     var cell = board[i][j]
//     if (!board[i][j].isMine && !board[i][j].isShown) {
//         console.log('הוא נכנס לתנאי הראשון')
//         board[i][j].isShown = true
//         if (board[i][j].minesAroundCount === 0) {
//             console.log('הוא נכנס לתנאי השני')
//             for (var iIdx = i - 1; iIdx <= i + 1; iIdx++) {
//                 if (iIdx < 0 || iIdx >= board.length) continue
//                 console.log('הוא נכנס לתנאי השלישי')
//                 for (var jIdx = j - 1; jIdx <= j + 1; jIdx++) {
//                     debugger
//                     if (jIdx < 0 || jIdx >= board[iIdx].length) continue
//                     expandShown(board, document.querySelector(`.cell-${iIdx}-${jIdx}`), iIdx, jIdx)
//                     console.log('זה עובד לי :)')
//                 }
//             }

//         } else {
//             elCell.innerText = board[i][j].minesAroundCount
//         }
//     } else {
//         elCell.innerText = board[i][j].minesAroundCount
//     }
// }



function onCellMarked(elCell, i, j) {
    if (!gGame.isOn) return
    console.log('דגל')

    // console.log('onCellMarked', i, j)
    var cell = board[i][j]



    if (!cell.isShown && gGame.isOn) {
        cell.isMarked = !cell.isMarked
        if (cell.isMarked) {

            cell.isMarked = true
            gGame.markedCount++

        } else {


            cell.isMarked = false
            gGame.markedCount--

        }
        if (cell.isMarked) elCell.innerText = FLAG
        else elCell.innerText = ''
    }

}

function checkGameOver(i, j) {
    var cell = board[i][j]
    if (livesCount===0) {
        setTimeout(() => {
            alert('game over!')
        }, "100")

        gGame.isOn = false
        console.log(gBoard.isOn)
        // stopStopwatch()
        stopStopwatch(gGame.secsPassed)
        elSmiley.innerText='🤯'
    }



}

function checkVictory() {
    var nonMineCells = gLevel.SIZE * gLevel.SIZE - gLevel.MINES
    if (nonMineCells === gGame.shownCount) {
        setTimeout(() => {
            alert('You win!')
        }, "100")

        stopStopwatch()
        elSmiley.innerText='😎'
    }
}



