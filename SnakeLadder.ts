interface Jump{
    start: number;
    end: number;
}

class Snake implements Jump{
    public start: number;
    public end : number;
    constructor(start: number, end: number){
        this.start = start;
        this.end = end;
    }
}

class Ladder implements Jump{
    public start: number;
    public end: number;
    constructor(start: number, end: number){
        this.start = start;
        this.end = end;
    }
}

class Player{
    public name: string;
    public position: number;
    constructor(name: string, position: number = 0){
        this.name = name;
        this.position = position
    }
}

class Dice{
    public faces: number;
    constructor(faces: number = 6){
        this.faces = faces;
    }
    roll(): number{
        return Math.floor(Math.random() * this.faces) + 1;
    }
}

class Board{
    public size: number;
    public jumps: Jump[];
    constructor(size: number, jumps: Jump[]){
        this.size = size;
        this.jumps = jumps;
    }
    getNextPosition(position: number): number{
        for(const jump of this.jumps){
            if(jump.start === position){
                return jump.end;
            }
        }
        return position;
    }
}

class Game{
    private currentPlayerIndex: number = 0;
    private board: Board;
    private dice : Dice;
    private players: Player[];
    constructor(board: Board, dice: Dice, players:Player[]){
        this.board = board;
        this.dice = dice;
        this.players = players
    }
    playTurn(): boolean{
        const player = this.players[this.currentPlayerIndex];
        const diceValue = this.dice.roll();
        let nextPosition = player.position + diceValue;
        if(nextPosition > this.board.size){
            this.moveToNextPlayer();
            return false;
        }
        nextPosition = this.board.getNextPosition(nextPosition);
        player.position = nextPosition;
        console.log(`${player.name} rolled ${diceValue} and reached ${nextPosition}`);
        if(player.position === this.board.size){
            console.log(`${player.name} won the game!`);
            return true;
        }
        this.moveToNextPlayer();
        return false;
    }
    moveToNextPlayer(){
        this.currentPlayerIndex = (this.currentPlayerIndex + 1)%this.players.length;
    }
}

// Create jumps (Snakes + Ladders)
const jumps: Jump[] = [
  new Snake(99, 10),
  new Snake(70, 20),
  new Ladder(5, 40),
  new Ladder(25, 90),
];

// Create board
const board = new Board(100, jumps);

// Create dice
const dice = new Dice();

// Create players
const players = [
  new Player("Alice"),
  new Player("Bob"),
];

// Start game
const game = new Game(board, dice, players);

// Play until someone wins
let isGameOver = false;
while (!isGameOver) {
  isGameOver = game.playTurn();
}
