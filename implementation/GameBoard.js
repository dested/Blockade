window.GameBoard = function (game, playerID) {
    var self = this;
    var gameState = {
        PieceFalling: 0,
        Landed: 1,
        GameOver: 2,
        Start: 3
    };
    self.playerID = playerID;
    var ticksPerMove = 9;

    self.game = game;
    var gameOverColor = "green";
    var backColor = "black";
    self.init = function () {
        self.state = gameState.PieceFalling;

        self.pieceIndex = 0;
        self.curPiece = game.getPiece(self.pieceIndex);
        self.pieceLocation = { x: 4, y: 0 };
        self.board = [];
        self.gameOverIndex = undefined;

        for (var x = 0; x < window.Constants.boardSize.w; x++) {
            self.board[x] = [];
            for (var y = 0; y < window.Constants.boardSize.h; y++) {
                self.board[x][y] = -1;
            }
        }

    };
    self.init();
    self.draw = function (canvas) {
        canvas.save();
        var pieceSize = window.Constants.pieceSize;

        //clear field
        canvas.fillStyle = backColor;
        canvas.fillRect(0, 0, canvas.width, canvas.height);

        //board

        for (var x = 0; x < self.board.length; x++) {
            for (var y = 0; y < self.board[x].length; y++) {
                var item = self.board[x][y];

                canvas.fillStyle = (self.gameOverIndex != undefined && y > self.gameOverIndex)
                    ? gameOverColor
                    : (item == -1 ?
                        backColor :
                        Constants.GamePieces[item].color);

                var st = self.board;
                var top, right, bottom, left;

                right = (x + 1 < st.length) ? st[x + 1][y] == -1 : true;
                left = (x - 1 >= 0) ? st[x - 1][y] == -1 : true;
                bottom = (y + 1 < st[0].length) ? st[x][y + 1] == -1 : true;
                top = (y - 1 >= 0) ? st[x][y - 1] == -1 : true;
                GamePiece.drawPiece(canvas, x, y, item == -1, top, right, bottom, left);

            }
        }

        if ((this.state == gameState.GameOver && self.gameOverIndex % 2 == 0) //blink when gameover
            || (this.state == gameState.PieceFalling || this.state == gameState.Landed)) {
            //current piece
            self.curPiece.draw(canvas, self.pieceLocation);
        }

        canvas.restore();
    };


    self.blockHasCollided = function () {
        return self.curPiece.whereBlock(function (x, y) {
            if (self.pieceLocation.y + y == Constants.boardSize.h || (x + self.pieceLocation.x < 0 || x + self.pieceLocation.x >= Constants.boardSize.w)) {
                return true;
            }

            if (self.board[x + self.pieceLocation.x][y + self.pieceLocation.y] != -1) {
                return true;
            }

            return false;
        });
    };
    self.fullLines = function () {
        var lines = [];
        for (var y = self.board[0].length - 1; y >= 0; y--) {
            var clear = true;
            for (var x = 0; x < self.board.length; x++) {
                var item = self.board[x][y];

                if (item == -1) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                lines.push(y);
            }
        }
        return lines;
    };
    self.tick = function () {
        if ((Manager.tickCount % ticksPerMove) == 0) {
            var linesToClear = self.fullLines();
            if (linesToClear.length > 0) {
                for (var y_ = linesToClear[0]; y_ > 0; y_--) {
                    for (var x = 0; x < self.board.length; x++) {
                        self.board[x][y_] = self.board[x][y_ - 1];
                    }
                }
            }

            switch (self.state) {
                case gameState.Start:
                    self.init();

                    break;
                case gameState.GameOver:
                    self.gameOverIndex--;
                    if (self.gameOverIndex == -2) {
                        self.state = gameState.Start;
                    }
                    break;
                case gameState.PieceFalling:
                    self.pieceLocation.y++;

                    if (self.blockHasCollided()) {
                        self.state = gameState.Landed;
                        self.pieceLocation.y--;
                    }

                    break;
                case gameState.Landed:
                    self.curPiece.forEachBlock(function (x, y) {
                        self.board[x + self.pieceLocation.x][y + self.pieceLocation.y] = self.curPiece.index;
                    });
                    self.pieceLocation = { x: 4, y: 0 };
                    self.curPiece = game.getPiece(++self.pieceIndex);
                    if (self.blockHasCollided()) {
                        self.gameOverIndex = Constants.boardSize.h;
                        self.state = gameState.GameOver;
                    } else
                        self.state = gameState.PieceFalling;
                    break;
            }
        }
    };
    self.movePieceLeft = function () { 
        
        if (self.state != gameState.PieceFalling) return;
        if (!self.curPiece.whereBlock(function (x, y) {

            if (self.pieceLocation.x + x - 1 < 0) {
                return true;
            }
            if (self.board[x + self.pieceLocation.x - 1][y + self.pieceLocation.y] != -1) {
                return true;
            }
            return false;
        })) {
            self.pieceLocation.x -= 1;
        }
    };
    self.movePieceRight = function () {
        if (self.state != gameState.PieceFalling) return;
        if (!self.curPiece.whereBlock(function (x, y) {
            if (self.pieceLocation.x + x + 1 == Constants.boardSize.w) {
                return true;
            }
            if (self.board[x + self.pieceLocation.x + 1][y + self.pieceLocation.y] != -1) {
                return true;
            }

            return false;
        })) {
            self.pieceLocation.x += 1;
        }
    };
    self.movePieceDown = function () {
        if (self.state != gameState.PieceFalling) return;
        self.pieceLocation.y++;

        if (self.blockHasCollided()) {
            self.state = gameState.Landed;
            self.pieceLocation.y--;
        }
    };
    self.rotatePiece = function () {
        if (self.state != gameState.PieceFalling) return;
        self.curPiece.rotate();
        if (self.blockHasCollided()) {
            self.curPiece.undoRotate();
        }
    };

};
