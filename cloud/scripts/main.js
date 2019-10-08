var mongodb = require('./mongodb_functions');

function main(server){
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        console.log('connection');
        
        socket.on('req', function(data) {

            if (data.type === 'add'){
                addComment(data);
            }

            if (data.type === 'delete'){
                deleteComment(data);
            }
        })

        socket.on('disconnect', function(data) {
            console.log('disconnection');
        })
    });
}

function addComment (data){
    data = data.data;
    // validate data
    let valid = true;

    // do something with data
    data.date = new Date();
    data.rating = 0;

    // add into database
    if (valid) {
        mongodb.connect(function(err, client){
            var db = client.db('AUMD9ksWu1E0e44d6ZDUAvR1h3kLq9'); // API key
            var collection = db.collection("url_or_something_else");

            collection.insertOne(data, (err, result) => {
                if (err) { 
                    console.log(err);
                } else {
                    console.log(result.ops[0]);
                }
            });
        });
    }
}



module.exports = main;