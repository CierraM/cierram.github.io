let gameboard = [   //To keep track of the score.
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
]
let mode = "easy"

document.getElementById("grid").childNodes.forEach(element => {
    element.addEventListener("click", addX)
})

function addX(event) {
    // console.log('Id:', event.target.id)
    // document.getElementById(event.target.id).textContent = 'X' //this is the same as:
    if (!event.target.textContent){
        event.target.textContent = 'X'
        let position = parseInt(event.target.id.substring(3,4)) //this is a number 1-9 indicating position on the board
        gameboard[position - 1] = 1
        let gameOver = checkForWin(1) //should we continue the game?

        if (!gameOver){
            if (mode == "easy"){
                document.getElementById("whoseTurn").textContent = ""
                computerTurnEasy()
        }
            else{
            computerTurnHard()
        }}
        else{
            document.getElementById("clearBoard").style.display = "block"
        }
    }
    
    //event.target is the element
}

function checkForWin(mark) {
    //check for each win situation
    if ((gameboard[0] == mark && gameboard[1] == mark && gameboard[2] == mark)
    ||
    (gameboard[3] == mark && gameboard[4] == mark && gameboard[5] == mark)
    ||
    (gameboard[6] == mark && gameboard[7] == mark && gameboard[8] == mark)
    ||
    (gameboard[0] == mark && gameboard[3] == mark && gameboard[6] == mark)
    ||
    (gameboard[1] == mark && gameboard[4] == mark && gameboard[7] == mark)
    ||
    (gameboard[2] == mark && gameboard[5] == mark && gameboard[8] == mark)
    ||
    (gameboard[0] == mark && gameboard[4] == mark && gameboard[8] == mark)
    ||
    (gameboard[2] == mark && gameboard[4] == mark && gameboard[6] == mark)){
        if(mark == 1){
            document.getElementById("whoseTurn").textContent = "You Win!"
            document.getElementById("grid").childNodes.forEach(element => {
                element.removeEventListener("click", addX)
            document.getElementById("whoseTurn").style.color = "green";
            })
            return true
        }
        else if(mark == 2){
            document.getElementById("whoseTurn").textContent = "Computer Wins."
            document.getElementById("grid").childNodes.forEach(element => {
                element.removeEventListener("click", addX)
                document.getElementById("whoseTurn").style.color = "red";
            })
            return true
        }
    }
    //check for a tie
    else if(!gameboard.includes(0)){
        document.getElementById("whoseTurn").textContent = "It's a Tie."
        document.getElementById("grid").childNodes.forEach(element => {
            element.removeEventListener("click", addX)
            document.getElementById("whoseTurn").style.color = "brown";
        })
        return true
    }

    //continue if there is no win and no tie
    else{
        return false
    }
}

function computerTurnEasy() {
    document.getElementById("whoseTurn").textContent = "Computer's Turn"
    setTimeout(() => {
        let cpuChoice //cpu generate # 0-8, check if spot is taken, if not, take it
        
        while (true){
        cpuChoice = Math.floor(Math.random() * 9)
        if (gameboard[cpuChoice] == 0){
            gameboard[cpuChoice] = 2;
            document.getElementById(`box${cpuChoice + 1}`).textContent = "O"
            break
        }
        }
        let gameOver = checkForWin(2)
        if (!gameOver){
            document.getElementById("whoseTurn").textContent = "Your Turn"
        }
        else{
            document.getElementById("clearBoard").style.display = "block"
        }
    }, Math.random() * 1500) 
}

function computerTurnHard() {
    //we need to check and see if the user is about to win
    //then check and see if computer is about to win
    //else just make mark next to one of own marks
    //or place in the middle square
    //or place anywhere else
    
}

function startOver(){
    gameboard = [   
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
    ]

    document.getElementById('grid').childNodes.forEach(element => {
        element.textContent = ''
    })
    
    document.getElementById('whoseTurn').textContent = "Your Turn"
    document.getElementById('clearBoard').style.display = "none"

    document.getElementById("grid").childNodes.forEach(element => {
        element.addEventListener("click", addX)
    })

    document.getElementById("whoseTurn").style.color = "grey";
}