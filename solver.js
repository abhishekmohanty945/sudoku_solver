// const e = null

// const brd2 = [
//     [1, e, e, e, e, e, e, e, e],
//     [e, 2, e, e, e, e, e, e, e],
//     [e, e, 3, e, e, e, e, e, e],
//     [e, e, e, 4, e, e, e, e, e],
//     [e, e, e, e, 5, e, e, e, e],
//     [e, e, e, e, e, 6, e, e, e],
//     [e, e, e, e, e, e, 7, e, e],
//     [e, e, e, e, e, e, e, 8, e],
//     [e, e, e, e, e, e, e, e, 9]
// ]
function main() {
    var brd1 = []
function takeInput() {
    var row = 0
    for(var i = 1; i < 10; i++) {
        brd1.push([])
        for(var j = 1; j < 10; j++) {
            var tempid = 'r' + i + j
            const val = document.getElementById(tempid).value
            if(val == "") {
                brd1[row].push(null)
            } else {
                brd1[row].push(Number(val))
            }
        }
        row += 1 
    }
}

takeInput()
// console.log(brd1)

function solve(board) {
    if(solved(board)) {
        return board
    } else {
        var possibilitiesForGiven = newBoards(board)
        var valid = keepValid(possibilitiesForGiven)
        return findSolution(valid)
    }
}

function findSolution(boards) {
    if(boards.length < 1) {
        return false
    } else {
        var current = boards.shift()
        const trypath = solve(current)
        if(trypath != false) {
            return trypath
        } else {
            return findSolution(boards)
        }
    }
}

function solved(board){
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++){
            if (board[i][j] == null){
                return false
            }
        }
    }
    return true
}

function newBoards(board) {
    var temp = []
    const firstEmptyBox = findEmpty(board)
    if(firstEmptyBox != undefined) {
        const y = firstEmptyBox[0]
        const x = firstEmptyBox[1]
        for(var i = 1; i < 10; i++) {
            var tempboard = [...board]
            var row = [...tempboard[y]]
            row[x] = i
            tempboard[y] = row
            temp.push(tempboard)
        }
    }
    return temp
}

function findEmpty(board) {
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            if(board[i][j] === null) {
                return [i,j]
            }
        }
    } 
}

function keepValid(boards) {
    return boards.filter(b => validboard(b))
}

function validboard(board) {
    return row_valid(board) && col_valid(board) && subgrid_valid(board)
}

function row_valid(board) {
    for(var i = 0; i < 9; i++) {
        var duplicate = []
        for(var j = 0; j < 9; j++) {
            if(duplicate.includes(board[i][j])){
                return false
            } else if(board[i][j] != null) {
                duplicate.push(board[i][j])
            }
        }
    }
    return true;
}

function col_valid(board) {
    for(var i = 0; i < 9; i++) {
        var duplicate = []
        for(var j = 0; j < 9; j++) {
            if(duplicate.includes(board[j][i])){
                return false
            } else if(board[j][i] != null){
                duplicate.push(board[j][i])
            }
        }
    }
    return true;
}

function subgrid_valid(board) {
    var coordinates = [
        [0,0], [0,1], [0,2],
        [1,0], [1,1], [1,2],
        [2,0], [2,1], [2,2]
    ]
    for(var y = 0; y < 9; y += 3) {
        for(var x = 0; x < 9; x += 3) {
            var duplicate = []
            for(var i = 0; i < 9; i++) {
                var newcoordinates = [...coordinates[i]]
                newcoordinates[0] += y
                newcoordinates[1] += x
                if(duplicate.includes(board[newcoordinates[0]][newcoordinates[1]])) {
                    return false
                } else if (board[newcoordinates[0]][newcoordinates[1]] != null) {
                    duplicate.push(board[newcoordinates[0]][newcoordinates[1]])
                }
            }
        }
    }
    return true
}

var brdans = solve(brd1)
console.log(brdans)

if(!validboard(brdans)) {
    for (i = 1; i <= 9; i++){
        document.getElementById("row " + String(i)).innerHTML = "NO SOLUTION EXISTS TO THE GIVEN BOARD"
    } 
}else{
    for (var i = 0; i < 9; i++){
        for (var j = 0; j < 9; j++) {
            var ans = brdans[i][j]
            var temp = '#a' + Number(i+1) + Number(j+1) 
            $(temp).val(ans)
        }
    } 
}
}