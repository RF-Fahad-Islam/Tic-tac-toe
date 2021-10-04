let gameDivs = document.querySelectorAll("div.square")
let whoWin = document.getElementById("whoWin")
let winner = "";
let isXUsed = false //for managing x and o one after another sequence
let gameEnd = false
let winConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]
// TODO: Create Object of object for holding player-x , player-o's given 
// "X" and "O" div id for position
let xPositionList = []
let oPositionList = []
let boxUsed = []

//TODO: Computer choices
function computerChoice() {
    let done = false
    num = Math.floor((Math.random() * 9) + 1)
    console.log(num);
    while (document.getElementById(`sq${num}`).innerHTML !== "-" && boxUsed.length != 9) {
        num = Math.floor((Math.random() * 9) + 1)
    }
    winConditions.forEach(e=> {
        if (xPositionList.includes(`sq${e[0]}`) && xPositionList.includes(`sq${e[1]}`) && (xPositionList.includes(`sq${e[2]}`) === false)) {
            document.getElementById(`sq${e[2]}`).innerHTML = "O"
            oPositionList.push(`sq${e[2]}`)
            done = true
            return
        } else if (xPositionList.includes(`sq${e[0]}`) && xPositionList.includes(`sq${e[2]}`) && (xPositionList.includes(`sq${e[1]}`) === false)){
            document.getElementById(`sq${e[1]}`).innerHTML = "O"
            oPositionList.push(`sq${e[1]}`)
            done = true
            return
        } else if (xPositionList.includes(`sq${e[1]}`) && xPositionList.includes(`sq${e[2]}`) && (xPositionList.includes(`sq${e[0]}`) === false)){
            document.getElementById(`sq${e[0]}`).innerHTML = "O"
            oPositionList.push(`sq${e[0]}`)
            done = true
            return
        }
    })
    if (document.getElementById(`sq${num}`).innerHTML === "-" && !done) {
        document.getElementById(`sq${num}`).innerHTML = "O"
        oPositionList.push(`sq${num}`)
        boxUsed = xPositionList.concat(oPositionList)
    }
}


// TODO: Add click event on all 9 divs
gameDivs.forEach((div) => {
    div.addEventListener("click", e => {
        if (!gameEnd) {

            // Check any x and o given or not at the clicked position
            if (e.target.innerHTML === "-") {
                if (!isXUsed) { //if X is not used then player-x's chance
                    e.target.innerHTML = `<i class="fa fa-times" style="font-size: 100px;"></i>`
                    xPositionList.push(e.target.id)
                    boxUsed = xPositionList.concat(oPositionList)
                    if (!gameEnd) {
                        computerChoice()
                    }
                    // isXUsed = true
                } else {
                    //If X is used then player-o's chance
                    e.target.innerHTML = `O`
                    // computerChoice()
                    oPositionList.push(e.target.id)
                    isXUsed = false
                }

            }
        }
        winConditions.forEach(e => {
            if (xPositionList.includes(`sq${e[0]}`) && xPositionList.includes(`sq${e[1]}`) && xPositionList.includes(`sq${e[2]}`)) {
                console.log("Player-X wins")
                winner = "user"
                whoWin.innerHTML = "You wins!"
                gameEnd = true
            } else if (oPositionList.includes(`sq${e[0]}`) && oPositionList.includes(`sq${e[1]}`) && oPositionList.includes(`sq${e[2]}`)) {
                console.log("Player-O wins")
                winner = "computer"
                whoWin.innerHTML = "Computer wins!"
                // alert("Computer wins!")
                gameEnd = true
            }
        })

        // if (
        //     (xPositionList.includes("sq1") && xPositionList.includes("sq2") && xPositionList.includes("sq3")) ||
        //     (xPositionList.includes("sq4") && xPositionList.includes("sq5") && xPositionList.includes("sq6")) ||
        //     (xPositionList.includes("sq7") && xPositionList.includes("sq8") && xPositionList.includes("sq9")) ||
        //     (xPositionList.includes("sq1") && xPositionList.includes("sq4") && xPositionList.includes("sq7")) ||
        //     (xPositionList.includes("sq2") && xPositionList.includes("sq5") && xPositionList.includes("sq8")) ||
        //     (xPositionList.includes("sq3") && xPositionList.includes("sq6") && xPositionList.includes("sq9")) ||
        //     (xPositionList.includes("sq1") && xPositionList.includes("sq5") && xPositionList.includes("sq9")) ||
        //     (xPositionList.includes("sq3") && xPositionList.includes("sq5") && xPositionList.includes("sq7"))
        // ) {
        //     console.log("Player-X wins")
        //     winner = "user"
        //     whoWin.innerHTML = "You wins!"
        //     gameEnd = true
        // } else if (
        //     (oPositionList.includes("sq1") && oPositionList.includes("sq2") && oPositionList.includes("sq3")) ||
        //     (oPositionList.includes("sq4") && oPositionList.includes("sq5") && oPositionList.includes("sq6")) ||
        //     (oPositionList.includes("sq7") && oPositionList.includes("sq8") && oPositionList.includes("sq9")) ||
        //     (oPositionList.includes("sq1") && oPositionList.includes("sq4") && oPositionList.includes("sq7")) ||
        //     (oPositionList.includes("sq2") && oPositionList.includes("sq5") && oPositionList.includes("sq8")) ||
        //     (oPositionList.includes("sq3") && oPositionList.includes("sq6") && oPositionList.includes("sq9")) ||
        //     (oPositionList.includes("sq1") && oPositionList.includes("sq5") && oPositionList.includes("sq9")) ||
        //     (oPositionList.includes("sq3") && oPositionList.includes("sq5") && oPositionList.includes("sq7"))
        // ) {
        //     console.log("Player-O wins")
        //     winner = "computer"
        //     whoWin.innerHTML = "Computer wins!"
        //     // alert("Computer wins!")
        //     gameEnd = true
        // }

        // if (gameEnd) {
        //         gameStop()
        //     }
        if (boxUsed.length === 9 && winner === "") {
            whoWin.innerHTML = "It's a draw!"

        }

    }, {
        once: true //for only one click on per div
    })
})

function gameStop() {
    gameDivs.forEach(element => {
        element.getElementsByClassName.backgroundColor = "white"
        element.removeEventListener()
    })

}
