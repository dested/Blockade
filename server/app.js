var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

app.listen(1337);

function handler(req, res) {
    /*fs.readFile(__dirname + '/index.html',
    function (err, data) {
    if (err) {
    res.writeHead(500);
    return res.end('Error loading index.html');
    }

    //res.writeHead(200);
    res.writeHead(200, { 'Content-Type': "text/html" });
    res.end(data);
    });*/
    res.end();
}

io.sockets.on('connection', function (socket) {



    socket.on('Area_Main_Login', function (data) {
        var verified = false;
        data.user = data.user.toLowerCase();
        if (data.user == "dested" || data.user == "kenny") {
            verified = true;
        }
        socket.emit('Area_Main_LoginResult', { access: verified });
    });
    socket.on('Area_Lobby_ListRooms', function (data) {
        console.log(data);
    });
    socket.on('Area_Room_SendChat', function (data) {
        console.log(data);
    });
    socket.on('Area_Room_StartGame', function (data) {
        console.log(data);
    });
    socket.on('Area_Room_PlacePiece', function (data) {
        console.log(data);
    });
});