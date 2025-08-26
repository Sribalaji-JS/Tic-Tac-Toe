const singleplayer = document.getElementById('singleplayer');
const multiplayer = document.getElementById('multiplayer');
const choose = document.querySelector('.choose');
const firstpg = document.getElementById('login');
const optionX = document.getElementById('optionX');
const optionO = document.getElementById('optionO');
const board = document.querySelector('.container-board');
const gameplayers = document.querySelector('.gameplayers');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const reset = document.querySelector('.reset');
const gamecell = document.querySelectorAll('.cell');


let player = null;
let computer = null;
let currentplayer = null;
let gamemode ='';

//check who is winner
const checkwin = ()=>{
    let winscondition =
    [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];
    for(let i=0;i<winscondition.length;i++){
        const [pos1, pos2, pos3] = winscondition[i];

        if(gamecell[pos1].textContent !== '' &&
            gamecell[pos1].textContent === gamecell[pos2].textContent &&
            gamecell[pos2].textContent === gamecell[pos3].textContent
        ){
            return true;
        }
    }
    return false;
}

//check the game is tie
const checktie =()=>{
    let emptycell=0;
    for(let i=0 ; i<gamecell.length;i++){
        if(gamecell[i].textContent === ''){
            emptycell++;
        }
    }
    return emptycell === 0 && !checkwin();
}

//Remove Even listner for every cell
const disabledcell = ()=>{
    gamecell.forEach(cell =>{
        cell.removeEventListener('click',handleclick);
    });
}

//Decide to who start the game
const whostgame = ()=>{
    const stgame = Math.floor(Math.random()*2);
    // console.log(chooseplayer);
    if(stgame == 1){
        currentplayer = player;
    }
    else{
        currentplayer = computer;
    }
    alert( currentplayer +  "  start the game");
    return currentplayer;
}

//Switiching the players
const changeplayer = ()=>{
    currentplayer = (currentplayer === player) ? computer : player;
    playgame(currentplayer,gamemode);
}

//player vs computer clicked....
singleplayer.addEventListener('click' ,()=>{
    gamemode = 'singleplayer' ;
    firstpg.style.display = "none" ;
    choose.style.display = "flex" ;
});

//Multiplyer clicked
multiplayer.addEventListener('click' ,()=>{
    gamemode = 'multiplayer'
    firstpg.style.display = "none" ;
    choose.style.display = "flex" ;
});

//showing option to choose player
optionX.addEventListener('click' , ()=>{
    player = "X";
    computer = "O";
    choose.style.display = "none";
    board.style.display = "grid";
    currentplayer = whostgame();
    playgame(currentplayer);
});


optionO.addEventListener('click' , ()=>{
    player = "O";
    computer = "X";
    choose.style.display = "none";
    board.style.display = "grid";
    currentplayer = whostgame();
    playgame(currentplayer);
});


//Play Game
const playgame = (currentplayer )=>{
    gameplayers.style.display = "flex";
    reset.style.display ="block";
    if(gamemode === 'singleplayer'){
        player1.innerHTML = `Player : ${player}`;
        player2.innerHTML = `computer : ${computer}`;
        if(currentplayer === player){
            gamecell.forEach(cell =>{
                cell.addEventListener('click' , (e)=>{
                    if(e.target.textContent === ''){
                        e.target.textContent = player;
                        if(checkwin()){
                            console.log(`${currentplayer} is a Winner..!`);
                        }
                        else if(checktie()){
                            console.log(`It's a Tie...!`);
                        }
                        else{
                            changeplayer();
                        }
                    }
                });
            });
        }
        
        else{
            setTimeout(()=>{computerplays(currentplayer);},1000);
        }
    }
    else{ //Multiplayer
        player1.innerHTML = `Player 1 : ${player}`;
        player2.innerHTML = `Player 2 : ${computer}`;
        gamecell.forEach(cell =>{
            cell.addEventListener('click' , handleclick);
        });
    }
}

//handle for multiplayer...
const handleclick = (e)=>{
    if(e.target.textContent === ''){
        e.target.textContent = currentplayer;
        if(checkwin()){
            console.log(`${currentplayer} is a Winner..!`);
            disabledcell();
        }
        else if(checktie()){
            console.log(`It's a Tie...!`);
            disabledcell();
        }
        else{
            changeplayer();
        }
    }
}

//computer can select the empty cell and choose random one in that and mark
const computermove = ()=>{
    const availablecell=[];
    for(let i=0 ; i<gamecell.length;i++){
        if(gamecell[i].textContent === ''){
            availablecell.push(i);
        }
    }
    if(availablecell.length>0){
        let randomcell = availablecell[Math.floor(Math.random()*availablecell.length)];
        if(gamecell[randomcell].textContent === ''){
            gamecell[randomcell].textContent = computer;
            if(checkwin()){
                console.log(`${currentplayer} is a Winner..!`);
            }
            else if(checktie()){
                console.log(`It's a Tie...!`);
            }
            else{
                changeplayer();
            }
        }
    }
}

//calls computermove
const computerplays = (currentplayer)=>{
    computermove();
    
}

//empty the cell when the reset button is clicked
reset.addEventListener('click' , ()=>{
    for(let i=0 ; i<gamecell.length;i++){
        gamecell[i].textContent = '';
    }
});




