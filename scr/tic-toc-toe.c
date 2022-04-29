//tic toc toe
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
int board[9] = {0, 0, 0, 0, 0, 0, 0, 0, 0};
int player_turn = 1;
int winner = 0;
int end = 0;
char* player_symbol = "x";
char* computer_symbol = "o";
int win_combos[9][3] = {{0,1,2},{3,4,5},{6,7,8},{0,3,6},{1,4,7},{2,5,8},{0,4,8},{2,4,6}};
void print_board() {
    char print_board_list[9]={'0','1','2','3','4','5','6','7','8'};
    for (int i=0; i<9; i++) {
        if (board[i] == 0) {
            "pass";
        } else if (board[i] == 1) {
            print_board_list[i] = 'x';
        } else if (board[i] == 2) {
            print_board_list[i] = 'o';
        }
    }
    printf("\n");
    printf("%c%c%c\n", print_board_list[0], print_board_list[1], print_board_list[2]);
    printf("%c%c%c\n", print_board_list[3], print_board_list[4], print_board_list[5]);
    printf("%c%c%c\n", print_board_list[6], print_board_list[7], print_board_list[8]);
    printf("\n");
}
int computer_move() {
    int len = sizeof(board) / sizeof(int);
    printf("%d", len);
    for (int i = 0; i < 7; i++){
        int b0 = board[win_combos[i][0]];
        int b1 = board[win_combos[i][1]];
        int b2 = board[win_combos[i][2]];
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
    if(board[4] == 0) {return 4;}
    if (board[0]==0 || board[2]==0 || board[6]==0 || board[8]==0) {
        int a[4] = {0,2,6,8};
        return a[rand()%4];
    }
    return rand()%9;
}
int check_win() {
    int i;
    for (i = 0; i < 8; i++) {
        if (board[win_combos[i][0]] == board[win_combos[i][1]] && board[win_combos[i][1]] == board[win_combos[i][2]] && board[win_combos[i][0]] != 0) {
            winner = board[win_combos[i][0]];
            end = 1;
            return 1;
        }
    }
    if (board[0] != 0 && board[1] != 0 && board[2] != 0 && board[3] != 0 && board[4] != 0 && board[5] != 0 && board[6] != 0 && board[7] != 0 && board[8] != 0) {
        end = 1;
        return 1;
    }
    return 0;
}
void start() {
    srand((unsigned int)time(NULL));
    while (end == 0) {
        print_board();
        if (end == 0 && player_turn == 1){
            int player_move_;
            printf("Please input number: ");
            scanf("%d", &player_move_);
            if (board[player_move_] == 0) {
                board[player_move_] = 1;
                player_turn = 0;
            }
            else {
                printf("This place is already taken. Please input another number.");
            }
        } else if (end == 0 && player_turn == 0){
            int computer_move_ = computer_move();
            if (board[computer_move_] == 0) {
                board[computer_move_] = 2;
                player_turn = 1;
            }
        }
        if(check_win()) {
            print_board();
            if (winner == 1) {
                printf("You win!");
            } else if (winner == 2) {
                printf("Computer win!");
            } else {
                printf("Draw!");
            }
            end = 1;
        }
    }
}
void main() {
    start();
}