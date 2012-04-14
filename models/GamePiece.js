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
                    canvas.fillRect(x * pieceSize, y * pieceSize, pieceSize, pieceSize);
                    canvas.strokeRect(x * pieceSize, y * pieceSize, pieceSize, pieceSize);
                }
            }
        }

        canvas.restore();
    };
    this.rotate = function () {
        this.rotateState = ((this.rotateState + 1) % 4);
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


function GamePieceData(index, color, states) {
    this.index = index;
    this.states = states;
    this.color = color;
}