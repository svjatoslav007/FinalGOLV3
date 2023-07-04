let side = 10
let matrixSize = 50
localIsRaining = false
localIsSnowing = false

const socket = io()

function main() {

    socket.on("send matrix", drawMatrix)
    socket.on("isRaining", (inputIsRaining) => {
        localIsRaining = inputIsRaining
        if (localIsRaining == true) {
            document.getElementById("isRaining").innerHTML = "it is raining"
        } else {
            document.getElementById("isRaining").innerHTML = "it is not raining"
        }
    })
    socket.on("isSnowing", (inputIsSnowing) => {
        localIsSnowing = inputIsSnowing
        if (localIsSnowing == true) {
            document.getElementById("isSnowing").innerHTML = "it is Snowing"
        } else {
            document.getElementById("isSnowing").innerHTML = "it is not Snowing"
        }
    })
    socket.on("checkCreatures", (inputCreatureCounter) => {
        localCreatureCounter = inputCreatureCounter
        document.getElementById("creatureCounter").innerHTML = localCreatureCounter
    })

    document.getElementById("newGame"          ).addEventListener("click", function () { socket.emit("newGame") })
    document.getElementById("killAllGrasses"   ).addEventListener("click", function () { socket.emit("killAllGrasses") })
    document.getElementById("killAllGrazers"   ).addEventListener("click", function () { socket.emit("killAllGrazers") })
    document.getElementById("killAllPredator").addEventListener("click", function () { socket.emit("killAllPredator") })
    document.getElementById("killAllToadstools").addEventListener("click", function () { socket.emit("killAllToadstools") })
}

function setup() {
    createCanvas(matrixSize * side + 1, matrixSize * side + 1)
    background("darkgrey")
}

function drawMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            fill("lightgrey")
            if (matrix[y][x] == 0) {
                fill("white")
            } else if (matrix[y][x] == 1) {
                if (localIsRaining == true) {
                    fill("#0B6121")
                }else if(localIsSnowing == true){
                    fill("#2E9AFE")
                }
                 else{
                    fill("#74DF00")
                }

            } else if (matrix[y][x] == 2) {
                if (localIsRaining == true) {
                    fill("#AEB404")
                } else if(localIsSnowing == true){
                    fill("#e6ed5a")
                }
                 else {
                    fill("#FFFF00")
                }
            } else if (matrix[y][x] == 3) {
                if (localIsRaining == true) {
                    fill("#B40404")
                }else if(localIsSnowing == true){
                    fill("#FF0000")
                } 
                else {
                    fill("#FF0000")
                }
            } else if (matrix[y][x] == 4) {
                if (localIsRaining == true) {
                    fill("#29220A")
                }else if(localIsSnowing == true){
                    fill("#a6914e")
                }
                 else {
                    fill("#B18904")
                }
            }
            rect(x * side, y * side, side, side)

            fill("black")
        }
    }
}

window.onload = main
