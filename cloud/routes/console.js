var express = require('express');

var mongoose = require('mongoose');

var router = express.Router();

// socket.io

/*var server = require('http').Server(express());
var io = require('socket.io')(server);

io.sockets.on('connection', function(socket) {
    console.log('CONNECTION');
    socket.emit('hi', {text: "something"});
    socket.on('get-something', function(data) {
        console.log(data);
    })

    socket.on('disconnect', function(){
        console.log('lol, disconnect');
    })
});
*/




// MongoDB
mongoose.connect('mongodb://localhost:27017/comments-cloud', {useNewUrlParser: true, useUnifiedTopology: true });




// routes
router.get('/', function(req, res, next) {
    res.render('console');
});

module.exports = router;
