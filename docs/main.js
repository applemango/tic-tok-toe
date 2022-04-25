html_data = "<body><div id='main'><div id='board'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div><div></div></body>";
document.querySelector("html").innerHTML += html_data;
let board = [0,0,0,0,0,0,0,0,0];
//const board_element_main = document.querySelector("#board");
const board_element = document.querySelectorAll("#board > div");
const press_space_key = document.querySelector("body > div:nth-child(2)")
document.addEventListener('keydown', keydown);
let player_turn = true;
let winner = false;
let end = false;
const player_symbol = "x";
const computer_symbol = "o";
const win_combos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//board_element_main.addEventListener("click", function(e){if(end == true){board_element_main_click()};});
board_element[0].addEventListener("click", function(e){player_click(0);});
board_element[1].addEventListener("click", function(e){player_click(1);});
board_element[2].addEventListener("click", function(e){player_click(2);});
board_element[3].addEventListener("click", function(e){player_click(3);});
board_element[4].addEventListener("click", function(e){player_click(4);});
board_element[5].addEventListener("click", function(e){player_click(5);});
board_element[6].addEventListener("click", function(e){player_click(6);});
board_element[7].addEventListener("click", function(e){player_click(7);});
board_element[8].addEventListener("click", function(e){player_click(8);});
function start(){
    for(let i = 0; i < board_element.length; i++){
        board_element[i].innerHTML = "";
    }
    board = [0,0,0,0,0,0,0,0,0];
    player_turn = true;
    winner = false;
    end = false;
    computer_turn();
}
function player_click(n){
    if(board[n] == 0 && player_turn == true && winner == false){
        player_turn = false;
        board[n] = player_symbol;
        board_element[n].innerHTML = "<p>"+player_symbol+"</p>";
        console.log(board);
        check_win("player");
        computer_turn();
    }
}

function computer_turn(){
    if(player_turn == false && winner == false){
        let computer_move = computer_move_();
        if(board[computer_move] == 0){
            player_turn = true;
            board[computer_move] = computer_symbol;
            board_element[computer_move].innerHTML = "<p>"+computer_symbol+"</p>";
            console.log(board);
            check_win("computer");
        }else{
            computer_turn();
        }
    }
}

function computer_move_(){
    //var win_combos_ = ((0,1),(1,2),(3,4),(4,5),(6,7),(7,8),(0,3),(1,4),(2,5),(3,6),(4,7),(5,8),(0,4),(1,5),(2,6),(3,7),(4,8),(6,4),(8,0))
    var win_combos_ = [[0,1],[1,2],[3,4],[4,5],[6,7],[7,8],[0,3],[1,4],[2,5],[3,6],[4,7],[5,8],[0,4],[1,5],[2,6],[3,7],[4,8],[6,4],[8,0]];
    //var win_combos__ = (2,0,5,3,8,6,6,7,8,0,1,2,8,3,4,4,0,2,4)
    var win_combos__ = [2,0,5,3,8,6,6,7,8,0,1,2,8,3,4,4,0,2,4];
    
    var win_combos___ = [0,2,6,8]

    for(let i = 0; i < win_combos_.length; i++){
        if(board[win_combos_[i][0]] == computer_symbol && board[win_combos_[i][1]] == computer_symbol){
            if(board[win_combos__[i]] == 0){
                return win_combos__[i];
            }
        }
    }

    for(let i = 0; i < win_combos_.length; i++){
        if(board[win_combos_[i][0]] == player_symbol && board[win_combos_[i][1]] == player_symbol){
            if(board[win_combos__[i]] == 0){
                return win_combos__[i];
            }
        }
    }

    if(board[4] == 0){
        return 4;
    }

    var frag = false;
    for(let i = 0; i < win_combos___.length; i++){
        if(board[win_combos___[i]] == 0){
            frag = true;
        }
    }
    if(frag == true){
        return win_combos___[Math.floor(Math.random() * win_combos___.length)];
    }

    return Math.floor(Math.random() * 9)
}

function check_win(){
    for(let i = 0; i < win_combos.length; i++){
        if(board[win_combos[i][0]] == player_symbol && board[win_combos[i][1]] == player_symbol && board[win_combos[i][2]] == player_symbol){
            console.log("player wins");
            winner = "player";
            end = true;
        }
        if(board[win_combos[i][0]] == computer_symbol && board[win_combos[i][1]] == computer_symbol && board[win_combos[i][2]] == computer_symbol){
            console.log("computer wins");
            winner = "computer";
            end = true;
        }
    }
    if(end == false){
        end = true;
        for(let i = 0; i < board.length; i++){
            if(board[i] == 0){
                end = false;
            }
        }
        if(end == true){
            console.log("tie");
            winner = "tie";
        }
    }
    if(end == true){
        if(winner == "player"){
            var inners ="<h1>you win<br>Press space key to play again</h1>";
        }else if(winner == "computer"){
            var inners ="<h1>you lose<br>Press space key to play again</h1>";
        } else {
            var inners ="<h1>tie<br>Press space key to play again</h1>";
        }
        press_space_key.innerHTML = inners;
        press_space_key.classList.add("press_space_key");
    }
}
function keydown(e){
    var key_name = e.keyCode
    if(key_name == 32){
        if(end == true){
            press_space_key.classList.remove("press_space_key");
            start();
        }
    }
}
function board_element_main_click(){
    if(end == true || press_space_key.classList == "press_space_key"){
        press_space_key.classList.remove("press_space_key");
        start();
    }
}

