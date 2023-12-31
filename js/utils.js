'use strict'


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// function createMat(ROWS, COLS) {
// 	const mat = []
// 	for (var i = 0; i < ROWS; i++) {
// 		const row = []
// 		for (var j = 0; j < COLS; j++) {
// 			row.push('[]')//לבדוק עם זה עוזר
// 		}
// 		mat.push(row)
// 	}
// 	return mat
// }

function createMat(rows, cols) {
    var mat = []
    for (var i = 0; i < rows; i++) {
        mat.push([])
        for (var j = 0; j < cols; j++) {
            mat[i][j] = ''
        }
    }
    return mat
}


function copyMat(mat) {
    var newMat = []
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j]
        }
    }
    return newMat
}

function shuffleNums(nums) {
	for (var i = nums.length - 1; i > 0; i--) {
		const randIdx = Math.floor(Math.random() * (i + 1))
		const temp = nums[i]
		nums[i] = nums[randIdx]
		nums[randIdx] = temp
	}
	return nums
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}