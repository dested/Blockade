window.GameBoard = function () {
    
    

    this.draw = function (canvas) {
        canvas.save();
        
        canvas.fillStyle = "black";
        canvas.fillRect(0, 0, canvas.width, canvas.height);

        canvas.restore();
    };
    this.tick = function () {


    };
}