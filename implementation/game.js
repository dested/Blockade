function Game() {
    var self = this; 
    this.getPiece = function (pieceIndex) {
        //poll for piece index if need new pieces? new pieces get pushed when ready?
        return new GamePiece(Constants.GamePieces[Math.floor(Constants.GamePieces.length * Math.random())]);

    };
    this.draw = function (canvas) {
        self.gameBoard.draw(canvas);
    };
    this.tick = function () {
        self.gameBoard.tick();
    }; 
    

    self.gameBoard = new GameBoard(this);
}