document.querySelector("html").innerHTML = "<head><meta name='viewport' content='width=device-width, initial-scale=1.0'><link rel='stylesheet' href='stylesheet.css'><meta charset='utf-8'><title>tic toc toe</title><head><body><div id='main'><div id='board'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div><div></div></body>";
const board_element = document.querySelectorAll("#board > div");
const press_space_key = document.querySelector("body > div:nth-child(2)")
document.addEventListener('keydown', keydown);
board_element.forEach(function(element, index){
    element.addEventListener("click", function(e){player_click(index);});
});
let board = [0,0,0,0,0,0,0,0,0];
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
function start(){
    for(let i = 0; i < board_element.length; i++){
        board_element[i].innerHTML = "";
    }
    board = [0,0,0,0,0,0,0,0,0];
    player_turn = true;
    winner = false;
    end = false;
}
function player_click(n){
    if(board[n] == 0 && player_turn == true && winner == false){
        player_turn = false;
        board[n] = player_symbol;
        board_element[n].innerHTML = "<p>"+player_symbol+"</p>";
        check_win();
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
            check_win();
        }else{
            computer_turn();
        }
    }
}
function computer_move_(){
    for (let i = 0; i < win_combos.length; i++) {
        var b0 = board[win_combos[i][0]];
        var b1 = board[win_combos[i][1]];
        var b2 = board[win_combos[i][2]];
        if(b0 == b1 && b0 != 0 && b2 == 0){
            return win_combos[i][2];
        } else if (b0 == b2 && b0 != 0 && b1 == 0) {
            return win_combos[i][1];
        } else if (b1 == b2 && b1 != 0 && b0 == 0) {
            return win_combos[i][0];
        }
    }
    if (board[5] == board[7] && board[5] == player_symbol && board[8] == 0) { return 8; }
    else if (board[1] == board[3] && board[1] == player_symbol && board[0] == 0) { return 0; }
    else if (board[1] == board[5] && board[1] == player_symbol && board[2] == 0) { return 2; }
    else if (board[3] == board[7] && board[3] == player_symbol && board[6] == 0) { return 6; }
    if(board[4] == 0){return 4;}
    if (board[0]==0 || board[2]==0 || board[6]==0 || board[8]==0) {
        var a = [0,2,6,8]
        return Math.floor(a[Math.floor(Math.random() * a.length)]);
    } else {
        return Math.floor(Math.random() * 9)
    }
}
function check_win(){
    for(let i = 0; i < win_combos.length; i++){
        var b0 = board[win_combos[i][0]];
        var b1 = board[win_combos[i][1]];
        var b2 = board[win_combos[i][2]];
        if(b0 == b1 && b0 == b2 && b0 != 0){
            end = true;
            if(b0 == player_symbol){
                winner = "player";
            }else{
                winner = "computer";
            }
        }
    }
    if(board.indexOf(0) == -1 && end == false){
        end = true;
        winner = "tie";
    }
    if(end == true){
        if(winner == "player"){
            press_space_key.innerHTML ="<h1>you win<br>Press space key to play again</h1>";
        }else if(winner == "computer"){
            press_space_key.innerHTML ="<h1>you lose<br>Press space key to play again</h1>";
        } else {
            press_space_key.innerHTML ="<h1>tie<br>Press space key to play again</h1>";
        }
        press_space_key.classList.add("press_space_key");
    }
}
function keydown(e){
    if(e.key == " " && end == true){
        press_space_key.classList.remove("press_space_key");
        start();
    }
}