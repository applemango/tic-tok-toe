import random
board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
player_turn = True
winner = False
end = False
player_symbol = 'X'
computer_symbol = 'O'
WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
def start():
    global board,player_turn,winner,end,WIN_COMBOS
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    player_turn = True
    winner = False
    end = False
    main()
def print_board():
    board_print = board[:]
    board_print_marker = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧']
    for i in range(len(board_print)):
        if(board_print[i] == 0):
            board_print[i] = board_print_marker[i]
    print("-------")
    print("|"+board_print[0]+"|"+board_print[1]+"|"+board_print[2]+"|")
    print("|"+board_print[3]+"|"+board_print[4]+"|"+board_print[5]+"|")
    print("|"+board_print[6]+"|"+board_print[7]+"|"+board_print[8]+"|")
    print("-------")
def main():
    global board,player_turn,winner,end,WIN_COMBOS
    while not end:
        print_board()
        if player_turn:
            player_move()
        else:
            computer_move()
        check_win()
def player_move():
    global board,player_turn,winner,end,WIN_COMBOS
    move = int(input('Enter a number: '))
    if board[move] == 0:
        player_turn = False
        board[move] = player_symbol
    else:
        print('Invalid move!')
        player_move()
def computer_move():
    print("aaa")
    global board,player_turn,winner,end,WIN_COMBOS
    if not player_turn:
        for i in WIN_COMBOS:
            b0 = board[i[0]]
            b1 = board[i[1]]
            b2 = board[i[2]]
            if b0 == b1 and b0 != 0 and b2 == 0:
                player_turn = True
                board[i[2]] = computer_symbol
                break
            elif b0 == b2 and b0 != 0 and b1 == 0:
                player_turn = True
                board[i[1]] = computer_symbol
                break
            elif b1 == b2 and b1 != 0 and b0 == 0:
                player_turn = True
                board[i[0]] = computer_symbol
                break
    if not player_turn:
        if board[1] == board[3] and board[1] == player_symbol and board[0] == 0:
            player_turn = True
            board[0] = computer_symbol
        elif board[1] == board[5] and board[1] == player_symbol and board[2] == 0:
            player_turn = True
            board[2] = computer_symbol
        elif board[3] == board[7] and board[3] == player_symbol and board[6] == 0:
            player_turn = True
            board[6] = computer_symbol
        elif board[5] == board[7] and board[5] == player_symbol and board[8] == 0:
            player_turn = True
            board[8] = computer_symbol
    if not player_turn and board[4] == 0:
        player_turn = True
        board[4] = computer_symbol
    if not player_turn:
        tmp = []
        for i in [0,2,6,8]:
            if board[i] == 0:
                tmp.append(i)
        if len(tmp) > 0:
            player_turn = True
            board[random.choice(tmp)] = computer_symbol
    if not player_turn:
        tmp = []
        for i in range(0,9):
            if board[i] == 0:
                tmp += i
        player_turn = True
        board[random.choice(tmp)] = computer_symbol
def check_win():
    global board,player_turn,winner,end,WIN_COMBOS
    for i in WIN_COMBOS:
        b0 = board[i[0]]
        b1 = board[i[1]]
        b2 = board[i[2]]
        if b0 == b1 and b0 == b2 and b0 != 0:
            winner = True
            end = True
            print_board()
            if b0 == player_symbol:
                print('Player wins!')
            else:
                print('Computer wins!')
            break
    if not winner and not end:
        for i in board:
            if i == 0:
                break
        else:
            end = True
            print('Draw!')
    if end:
        print_board()
        input("Press Enter to continue...")
        start()
start()