using System;

class Program {
    public static void Main (string[] args) {
        int[] board = new int[9] {0, 0, 0, 0, 0, 0, 0, 0, 0};
        bool player_turn = true;
        int winner = -1;
        bool end = false;
        char player_symbol = 'X';
        char computer_symbol = 'O';
        int player_id = 1;
        int computer_id = 2;
        int[,] win_combos = new int[,] { {0,1,2},{3,4,5},{6,7,8},{0,3,6},{1,4,7},{2,5,8},{0,4,8},{2,4,6}};
        void print_board() {
            char[] print_board_array = new char[9] {'1','2','3','4','5','6','7','8','9'};
            for (int i = 0; i < print_board_array.Length; i++) {
                if (board[i] == player_id) {print_board_array[i] = player_symbol;
                } else if (board[i] == computer_id) {print_board_array[i] = computer_symbol;}
            }
            Console.WriteLine();
            Console.WriteLine(print_board_array[0] + "|" + print_board_array[1] + "|" + print_board_array[2]);
            Console.WriteLine(print_board_array[3] + "|" + print_board_array[4] + "|" + print_board_array[5]);
            Console.WriteLine(print_board_array[6] + "|" + print_board_array[7] + "|" + print_board_array[8]);
        }
        int computer_move() {
            for (int i = 0; i < win_combos.Length / 3; i++) {
                int b0 = board[win_combos[i,0]];
                int b1 = board[win_combos[i,1]];
                int b2 = board[win_combos[i,2]];
                if (b0 == b1 && b0 != 0 && b2 == 0) {
                    return win_combos[i,2];
                } else if (b0 == b2 && b0 != 0 && b1 == 0) {
                    return win_combos[i,1];
                } else if (b1 == b2 && b1 != 0 && b0 == 0) {
                    return win_combos[i,0];
                }
            }
            if (board[5] == board[7] && board[5] == player_symbol && board[8] == 0) { return 8; }
            else if (board[1] == board[3] && board[1] == player_symbol && board[0] == 0) { return 0; }
            else if (board[1] == board[5] && board[1] == player_symbol && board[2] == 0) { return 2; }
            else if (board[3] == board[7] && board[3] == player_symbol && board[6] == 0) { return 6; }
            if(board[4] == 0) {return 4;}
            var rand = new Random();
            return rand.Next(0, 9);
        }
        int player_move() {
            return int.Parse(Console.ReadLine())-1;
        }
        bool check_win() {
            for (int i = 0; i < win_combos.Length / 3; i++) {
                if(board[win_combos[i,0]] == board[win_combos[i,1]] && board[win_combos[i,0]] == board[win_combos[i,2]] && board[win_combos[i,0]] != 0) {
                    winner = board[win_combos[i,0]];
                    return true;
                }
            }
            if(board[0] != 0 && board[1] != 0 && board[2] != 0 && board[3] != 0 && board[4] != 0 && board[5] != 0 && board[6] != 0 && board[7] != 0 && board[8] != 0) {
                return true;
            }
            return false;
        }
        void start() {
            while (!end) {
                print_board();
                if(!end && player_turn){
                    int player_move_ = player_move();
                    if(board[player_move_] == 0){
                        board[player_move_] = player_id;
                        player_turn = false;
                    }
                } else {
                    int computer_move_ = computer_move();
                    if(board[computer_move_] == 0){
                        board[computer_move_] = computer_id;
                        player_turn = true;
                    }
                }
                if(check_win()){
                    end = true;
                    print_board();
                    if (winner == player_id) {
                        Console.WriteLine("Player wins!");
                    } else if (winner == computer_id) {
                        Console.WriteLine("Computer wins!");
                    } else {
                        Console.WriteLine("Draw!");
                    }
                }
            }
        }
        start();
    }
}