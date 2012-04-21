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
                    var top, right, bottom, left;

                    right = (x + 1 < st.length) ? st[x + 1][y] == 0 : true;
                    left = (x - 1 >= 0) ? st[x - 1][y] == 0 : true;
                    bottom = (y + 1 < st[0].length) ? st[x][y + 1] == 0 : true;
                    top = (y - 1 >= 0) ? st[x][y - 1] == 0 : true;

                    GamePiece.drawPiece(canvas, x, y, item == -1, top, right, bottom, left);
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

GamePiece.drawPiece = function (canvas, x, y, empty, top, right, bottom, left) {
    var pieceSize = window.Constants.pieceSize;
    if (empty) return;
    canvas.save();
    /*
    canvas.beginPath();
    canvas.arc(x * pieceSize + pieceSize / 2, y * pieceSize + pieceSize / 2, pieceSize / 2, 0, Math.PI * 2, true);
    canvas.closePath();
    canvas.fill();
    //    canvas.stroke();
    */

    canvas.fillRect(x * pieceSize, y * pieceSize, pieceSize, pieceSize);

    //canvas.fillStyle = _H.Lighten(canvas.fillStyle, 0);
    //var j = .15;
    //canvas.fillRect(x * pieceSize + pieceSize * j, y * pieceSize + pieceSize * j, pieceSize - pieceSize * j*2, pieceSize-pieceSize * j*2);
    var ld = 0; //Offset
    if (top) {
        canvas.strokeStyle = "#BBBBBB";
        canvas.lineWidth = 4;
    } else {
        canvas.strokeStyle = "#BBBBBB";
        canvas.lineWidth = 1;
    }
    canvas.beginPath(); 
    canvas.moveTo(x * pieceSize - ld, y * pieceSize - ld);
    canvas.lineTo(x * pieceSize + pieceSize + ld, y * pieceSize - ld);
    canvas.closePath();
    canvas.stroke();

    if (right) {
        canvas.strokeStyle = "#555555";
        canvas.lineWidth = 4;
    } else {
        canvas.strokeStyle = "#555555";
        canvas.lineWidth =1;
    }

    canvas.beginPath();
    canvas.moveTo(x * pieceSize + pieceSize + ld, y * pieceSize - ld);
    canvas.lineTo(x * pieceSize + pieceSize + ld, y * pieceSize + pieceSize + ld);
    canvas.closePath();
    canvas.stroke();

    if (bottom) {
        canvas.strokeStyle = "#353535";
        canvas.lineWidth = 4;
    } else {
        canvas.strokeStyle = "#353535";
        canvas.lineWidth = 1;
    }

    canvas.beginPath();
    canvas.moveTo(x * pieceSize + pieceSize + ld, y * pieceSize + pieceSize + ld);
    canvas.lineTo(x * pieceSize - ld, y * pieceSize + pieceSize + ld);
    canvas.closePath();
    canvas.strokeStyle = "#353535";
    canvas.stroke();

    if (left) {
        canvas.strokeStyle = "#B5B5B5";
        canvas.lineWidth = 4;
    } else {
        canvas.strokeStyle = "#B5B5B5";
        canvas.lineWidth = 1;
    }
    canvas.beginPath();
    canvas.moveTo(x * pieceSize - ld, y * pieceSize + pieceSize + ld);
    canvas.lineTo(x * pieceSize - ld, y * pieceSize - ld);
    canvas.closePath();
    canvas.stroke();


    //canvas.strokeRect(x * pieceSize, y * pieceSize, pieceSize, pieceSize);

    canvas.restore();
};

function GamePieceData(index, color, states) {
    this.index = index;
    this.states = states;
    this.color = color;
}