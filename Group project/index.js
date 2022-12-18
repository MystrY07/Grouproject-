//code by andrei


//everything will wrap between this event handler because we included the js file into the <head> 
window.addEventListener('DOMContentLoaded', () => {

    //dom node to save references
    const tiles = Array.from(document.querySelectorAll('.tile'));

    //reference to player display, reset button and announcer 
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    //what board looks like to js
    let board = ['', '', '',
                 '', '', '', 
                 '', '', ''];
    let currentPlayer = 'X';
    
    //isGameActive will remain true until either player X/O wins or ends in a tie
    let isGameActive = true; 


    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes of the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */


    //winning combinations from the indexes of the board
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

//To check if there is a win/lose/tie depending, all depending on the value of the roundWon variable
    function handleResultValidation() {
        let roundWon = false;

        //using loops through the winConditions array to check the board for each winning conditions
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    //announcer funtion that will anounce the end game result.
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    //isValidAction function to decide wether the user wants to perform a valid action or not 
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    //to see which players turn it is based on the index number
    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    //function to switch player turns alternatively after each turn played. 
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

/* Handler to the users actions. 
   funciton to recieve tile and index as parameter, will be called when the user clicks on a tile.
*/
    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    /*unction to set the board to consist of 9 squares again, set the game active, remove the announcer
    and change the player back to X*/ 
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        //loop tiles and set innerText back to an empty string.
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    //event listener to the tiles that loops through the array of tiles. 
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    //event hadnler to see if 
    resetButton.addEventListener('click', resetBoard);
});