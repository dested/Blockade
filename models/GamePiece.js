function GamePiece(gamePieceData) {
    this.index = gamePieceData.index;
    this.states = gamePieceData.states;
    this.color = gamePieceData.color;
    this.rotateState = 0;
    this.draw = function (canvas, position) {
        var pieceSize = window.Constants.pieceSize;
        canvas.save();
        canvas.translate(position.x * pieceSize, position.y * pieceSize);
        canvas.fillStyle = this.color;
        var st = this.states[this.rotateState];
        for (var x = 0; x < st.length; x++) {
            for (var y = 0; y < st[x].length; y++) {
                var item = st[x][y];
                if (item) {
                    GamePiece.drawPiece(canvas, x, y);
                }
            }
        }

        canvas.restore();
    };
    this.rotate = function () {
        this.rotateState = ((this.rotateState + 1) % 4);
    };

    this.undoRotate = function () {
        this.rotateState = ((4 + this.rotateState - 1) % 4);
    };


    this.forEachBlock = function (callback) {
        var st = this.states[this.rotateState];

        for (var x = 0; x < st.length; x++) {
            for (var y = 0; y < st[x].length; y++) {
                var item = st[x][y];
                if (item)
                    callback(x, y);
            }
        }

    };
    this.whereBlock = function (callback) {
        var st = this.states[this.rotateState];

        for (var x = 0; x < st.length; x++) {
            for (var y = 0; y < st[x].length; y++) {
                var item = st[x][y];
                if (item)
                    if (callback(x, y))
                        return true;
            }
        }
        return false;
    };
}

GamePiece.drawPiece = function (canvas, x, y,empty) {
    var pieceSize = window.Constants.pieceSize;
    canvas.save();
    /*
    canvas.beginPath();
    canvas.arc(x * pieceSize + pieceSize / 2, y * pieceSize + pieceSize / 2, pieceSize / 2, 0, Math.PI * 2, true);
    canvas.closePath();
    canvas.fill();
    //    canvas.stroke();
    */

    canvas.fillRect(x * pieceSize, y * pieceSize, pieceSize, pieceSize);
    if (empty) return;
    canvas.lineWidth = 2;
    canvas.beginPath();
    canvas.moveTo(x * pieceSize + 1, y * pieceSize + 1);
    canvas.lineTo(x * pieceSize + pieceSize - 1, y * pieceSize + 1);
    canvas.closePath();
    canvas.strokeStyle = "#999999";
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(x * pieceSize + pieceSize - 1, y * pieceSize + 1);
    canvas.lineTo(x * pieceSize + pieceSize - 1, y * pieceSize + pieceSize - 1);
    canvas.closePath();
    canvas.strokeStyle = "#494949";
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(x * pieceSize + pieceSize - 1, y * pieceSize + pieceSize - 1);
    canvas.lineTo(x * pieceSize + 1, y * pieceSize + pieceSize - 1);
    canvas.closePath();
    canvas.strokeStyle = "#353535";
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(x * pieceSize + 1, y * pieceSize + pieceSize - 1);
    canvas.lineTo(x * pieceSize + 1, y * pieceSize + 1);
    canvas.closePath();
    canvas.strokeStyle = "#B5B5B5";
    canvas.stroke();




    //canvas.strokeRect(x * pieceSize, y * pieceSize, pieceSize, pieceSize);

    canvas.restore();
};

function GamePieceData(index, color, states) {
    this.index = index;
    this.states = states;
    this.color = color;
}