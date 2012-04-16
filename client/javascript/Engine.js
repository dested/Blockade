DEBUGs = true;


window.requestAnimFrame = (function (ff) {
    if (window.requestAnimationFrame)
        return window.requestAnimationFrame(ff);
    if (window.webkitRequestAnimationFrame)
        return window.webkitRequestAnimationFrame(ff);
    if (window.mozRequestAnimationFrame)
        return window.mozRequestAnimationFrame(ff);
    if (window.oRequestAnimationFrame)
        return window.oRequestAnimationFrame(ff);
    if (window.msRequestAnimationFrame)
        return window.msRequestAnimationFrame(ff);
    return window.setTimeout(ff, 1000 / 60);
});


function Engine(gameLayer, uiLayer) {
    var self = this;
    window.Engine = this;


    window.Engine.socket = io.connect('http://localhost:1337');

    window.Engine.socket.on('Area.Main.LoginResult', function (data) {
        if (data.access) {
            alert('allowed');
            window.Engine.socket.emit('Area.Lobby.ListRooms', {});
        } else {
            alert('disallowed');
        }
    });
    window.Engine.socket.on('Area.Lobby.ListRoomsResult', function (rooms) {
        for (var i = 0; i < rooms.length; i++) {

            UIManager.genericArea.roomList.addControl(new Button(0, 0, 0, 0, rooms[i].name + " (" + rooms[i].players.length + "/" + rooms[i].maxUsers + ")", "10pt Arial", "rgb(50,190,90)", (function (room) {
                return function () {
                    window.Engine.socket.emit('Area.Lobby.JoinRoom', room); 
                };
            })(rooms[i])));
        }
        console.log(rooms);
    });
    window.Engine.socket.on('Area.Lobby.JoinRoomResult', function (room) {
        alert(_H.stringify(room));

    });
    window.Engine.socket.on('Area.Room.RecieveChat', function (data) {
        console.log(data);
    });
    window.Engine.socket.on('Area.Room.GameStarted', function (data) {
        console.log(data);
    });
    window.Engine.socket.on('Area.Room.PiecePlaced', function (data) {
        console.log(data);
    });


    var gameSize = { w: window.Constants.boardSize.w * window.Constants.pieceSize, h: window.Constants.boardSize.h * window.Constants.pieceSize };
    this.gameCanvasItem = $("#" + gameLayer);
    this.gameCanvas = document.getElementById(gameLayer).getContext("2d");

    this.uiCanvasItem = $("#" + uiLayer);
    this.uiCanvas = document.getElementById(uiLayer).getContext("2d");


    this.canvasWidth = 0;
    this.canvasHeight = 0;

    var element = document.getElementById(uiLayer); //top layerS

    element.addEventListener('DOMMouseScroll', handleScroll, false);
    element.addEventListener('mousewheel', handleScroll, false);

    element.addEventListener('touchmove', canvasMouseMove);
    element.addEventListener('touchstart', canvasOnClick);
    element.addEventListener('touchend', canvasMouseUp);

    element.addEventListener('mousedown', canvasOnClick);
    element.addEventListener('mouseup', canvasMouseUp);
    element.addEventListener('mousemove', canvasMouseMove);

    element.addEventListener('contextmenu', function (evt) {
        evt.preventDefault();
    }, false);


    function canvasOnClick(e) {
        e.preventDefault();
        if (UIManager.onClick(e)) return false;

        if (Manager.onClick(e)) return false;

        return false;
    }

    var lastMouseMove;
    function canvasMouseMove(e) {
        e.preventDefault();
        document.body.style.cursor = "default";
        lastMouseMove = e;
        if (UIManager.onMouseMove(e)) return false;
        if (Manager.onMouseMove(e)) return false;

        return false;
    }

    function canvasMouseUp(e) {
        e.preventDefault();
        UIManager.onMouseUp(lastMouseMove);
        return false;
    }


    function handleScroll(evt) {
        evt.preventDefault();

        if (UIManager.onMouseScroll(evt)) return false;

        return evt.preventDefault() && false;
    };

    $(document).keypress(function (e) {
        //for textbox mostly
        UIManager.onKeyDown(e);

    });


    KeyboardJS.bind.key("up", function () {
        Manager.game.rotatePiece();

    }, function () {
    });

    KeyboardJS.bind.key("down", function () {
        Manager.game.movePieceDown();
    }, function () {
    });

    KeyboardJS.bind.key("left", function () {
        Manager.game.movePieceLeft();
    }, function () {
    });

    KeyboardJS.bind.key("right", function () {
        Manager.game.movePieceRight();

    }, function () {

    });

    KeyboardJS.bind.key("space", function () {
    }, function () {
    });


    self.resizeCanvas = function () {
        self.canvasWidth = $(window).width();
        self.canvasHeight = $(window).height();

        self.gameCanvasItem.attr("width", gameSize.w);
        self.gameCanvasItem.attr("height", gameSize.h);
        self.uiCanvasItem.attr("width", self.canvasWidth);
        self.uiCanvasItem.attr("height", self.canvasHeight);

        self.gameCanvas.width = gameSize.w;
        self.gameCanvas.height = gameSize.h;
        self.uiCanvas.width = self.canvasWidth;
        self.uiCanvas.height = self.canvasHeight;

        self.uiCanvas.goodWidth = self.canvasWidth;
        self.gameCanvas.goodWidth = gameSize.w;

        var screenOffset = { x: _H.floor(self.canvasWidth / 2 - gameSize.w / 2), y: _H.floor(self.canvasHeight / 2 - gameSize.h / 2) };

        self.gameCanvasItem.css("left", screenOffset.x + "px");
        self.gameCanvasItem.css("top", screenOffset.y + "px");
    };

    function clear(ctx) {
        ctx.canvas.width = ctx.goodWidth;
    }

    self.gameDraw = function () {
        //   requestAnimFrame(self.draw);
        //window.setTimeout(self.draw, 1000 / 30);

        clear(self.gameCanvas);
        Manager.draw(self.gameCanvas);
    };
    self.uiDraw = function () {
        //   requestAnimFrame(self.draw);
        //window.setTimeout(self.draw, 1000 / 30);

        clear(self.uiCanvas);

        UIManager.draw(self.uiCanvas);
    };

    $(window).resize(this.resizeCanvas);

    window.Manager = new Manager(self.gameCanvas, this.resizeCanvas);
    window.UIManager = new UIManager(self.uiCanvas);

    this.resizeCanvas();

    //requestAnimFrame(self.draw);
    window.setInterval(function () {
        self.gameDraw();
    }, 1000 / 60);
    window.setInterval(function () {
        Manager.tick();
    }, 1000 / 60);

    window.setInterval(self.uiDraw, 1000 / 20);

};



 