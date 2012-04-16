function Game() {
    var self = this;
    self.getPiece = function (pieceIndex) {
        //poll for piece index if need new pieces? new pieces get pushed when ready?
        return new GamePiece(Constants.GamePieces[Math.floor(Constants.GamePieces.length * Math.random())]);

    };
    self.draw = function (canvas) {
        self.playerGameBoard.draw(canvas);
    };
    self.tick = function () {
        self.playerGameBoard.tick();
    };


    self.movePieceLeft = function () {
        self.playerGameBoard.movePieceLeft();
    };
    self.movePieceRight = function () {
        self.playerGameBoard.movePieceRight();
    };
    self.movePieceDown = function () {
        self.playerGameBoard.movePieceDown();
    };
    self.rotatePiece = function () {
        self.playerGameBoard.rotatePiece();
    };
    self.enemyGameBoards = [];
    self.playerGameBoard = new GameBoard(self);
}