import java.util.Scanner;
import java.util.InputMismatchException;
public class toc_toc_toe {
    public static int[] board = new int[]{0, 0, 0, 0, 0, 0, 0, 0, 0};
    public static boolean player_turn = true;
    public static int winner = 0;
    public static boolean end = false;
    public static char player_symbol = 'X';
    public static char computer_symbol = 'O';
    public static int[][] win_combos = new int[][]{{0, 1, 2}, {3, 4, 5}, {6, 7, 8}, {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, {0, 4, 8}, {2, 4, 6}};
    public  static void main(String[] args) {
        start();
    }
    public static void start(){
        print_board();
        while(!end){
            if(player_turn){
                int player_move_ = player_move();
                if (board[player_move_] == 0){
                    board[player_move_] = 1;
                    player_turn = false;
                }
                else{
                    System.out.println("That spot is taken, try again");
                }
            }
            else{
                int computer_move_ = computer_move();
                if (board[computer_move_] == 0){
                    board[computer_move_] = 2;
                    player_turn = true;
                }
            }
            print_board();
            if(check_win()){
                end = true;
                if (winner == 1){
                    System.out.println("You win!");
                }
                else if (winner == 2){
                    System.out.println("You lose!");
                }
                else{
                    System.out.println("It's a tie!");
                }
            }
        }
    }
    public static int player_move(){
        try {
            Scanner scanner = new Scanner(System.in);
            System.out.println("Enter a number between 1 and 9");
            int player_move = scanner.nextInt();
            return player_move - 1;
        } catch (InputMismatchException e) {
            System.out.println("That is not a valid input");
            player_move();
        }
        return player_move();
    }
    public static int computer_move(){
        for (int i = 0; i < win_combos.length; i++) {
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
            int[] a = new int[]{0, 2, 6, 8};
            int random = (int) (Math.random() * a.length);
            return a[random];
        }
        int computer_move = (int)(Math.random()*9);
        return computer_move;
    }
    public static boolean check_win() {
        for (int i = 0; i < win_combos.length; i++) {
            if (board[win_combos[i][0]] == board[win_combos[i][1]] && board[win_combos[i][1]] == board[win_combos[i][2]] && board[win_combos[i][0]] != 0) {
                winner = board[win_combos[i][0]];
                return true;
            }
        }
        if (board[0] != 0 && board[1] != 0 && board[2] != 0 && board[3] != 0 && board[4] != 0 && board[5] != 0 && board[6] != 0 && board[7] != 0 && board[8] != 0) {
            winner = 0;
            return true;
        }
        return false;
    }
    public static void print_board(){
        char[] board_ = new char[]{'1', '2', '3', '4', '5', '6', '7', '8', '9'};
        for(int i = 0; i < board.length; i++){
            if(board[i] == 1){
                board_[i] = player_symbol;
            }
            else if(board[i] == 2){
                board_[i] = computer_symbol;
            }
        }
        System.out.println(board_[0] + "|" + board_[1] + "|" + board_[2]);
        System.out.println("-----");
        System.out.println(board_[3] + "|" + board_[4] + "|" + board_[5]);
        System.out.println("-----");
        System.out.println(board_[6] + "|" + board_[7] + "|" + board_[8]);
        System.out.println("");
    }
}