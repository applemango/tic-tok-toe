$board = [0,0,0,0,0,0,0,0,0]
$player_turn = true
$winner = false
$end_ = false
$player_symbol = "X"
$computer_symbol = "O"
$WIN_COMBOS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
def print_board()
    puts " #{$board[0]}|#{$board[1]}|#{$board[2]} "
    puts "-------"
    puts " #{$board[3]}|#{$board[4]}|#{$board[5]} "
    puts "-------"
    puts " #{$board[6]}|#{$board[7]}|#{$board[8]} "
end
def computer_move()
    for i in $WIN_COMBOS
        b0 = $board[i[0]]
        b1 = $board[i[1]]
        b2 = $board[i[2]]
        if b0 == b1 && b0 != 0 && b2 == 0
            return i[2]
        elsif b0 == b2 && b0 != 0 && b1 == 0
            return i[1]
        elsif b1 == b2 && b1 != 0 && b0 == 0
            return i[0]
        end
    end
    if $board[5] == $board[7] && $board[5] ==$player_symbol && $board[8] == 0
        return 8
    elsif $board[1] == $board[3] && $board[1] == $player_symbol && $board[0] == 0
        return 0
    elsif $board[1] == $board[5] && $board[1] == $player_symbol && $board[2] == 0
        return 2
    elsif $board[3] == $board[7] && $board[3] == $player_symbol && $board[6] == 0
        return 6
    end
    return 4 if $board[4] == 0
    if $board[0] = 0 || $board[2] == 0 || $board[6] == 0 || $board[8] == 0
        a = [0,2,6,8].sample
        return a
    end
    return rand(8)
end
def check_win()
    $WIN_COMBOS.each do |combo|
        if $board[combo[0]] == $board[combo[1]] && $board[combo[1]] == $board[combo[2]] && $board[combo[0]] != 0
            $winner = "player" if $board[combo[0]] == $player_symbol
            $winner = "computer" if $board[combo[0]] == $computer_symbol
            return true
        end
    end
    if $board[0] != 0 and $board[1] != 0 and $board[2] != 0 and $board[3] != 0 and $board[4] != 0 and $board[5] != 0 and $board[6] != 0 and $board[7] != 0 and $board[8] != 0
        $winner = "tie"
        return true
    end
    return false
end
def start()
    $board = [0,0,0,0,0,0,0,0,0]
    player_turn = true
    winner = false
    end_ = false
    while end_ == false
        if $player_turn == true
            print_board()
            puts "Player's turn"
            print "Enter a number: "
            input = gets.chomp.to_i
            if $board[input] == 0
                $board[input] = $player_symbol
                $player_turn = false
            else
                puts "That spot is taken."
            end
        else
            cmputer_move_ = computer_move()
            if $board[cmputer_move_] == 0
                $board[cmputer_move_] = $computer_symbol
                $player_turn = true
            else
                $player_turn = false
            end
        end
        if check_win() == true
            end_ = true
            print_board()
            if $winner == "player"
                puts "You win!"
            elsif $winner == "computer"
                puts "Computer wins!"
            else
                puts "Tie!"
            end
        end
    end
end
start()