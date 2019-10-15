var mongodb = require('./mongodb_functions');
ObjectId = require("mongodb").ObjectID

function main(server) {
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        console.log('connection');
        socket.on('req', function (data) {

            if (data.type === 'add') {
                addComment(data.data).then(answer => {
                    socket.emit('isAdded', answer);
                }).catch(err => {
                    console.error(err);
                });
            }

            if (data.type === 'delete') {
                deleteComment(data.data).then(answer => {
                    socket.emit('isDeleted', answer);
                });
            }

            if (data.type === 'get') {
                getComments(data.data).then(answer => {
                    console.log(answer);
                    socket.emit('isGot', answer);
                });
            }

            if (data.type === 'update') {
                updateComment(data.data).then(answer => {
                    socket.emit('isUpdated', answer);
                })
            }
        })

        socket.on('disconnect', function (data) {
            console.log('disconnection');
        })
    });
}

function addComment(data) {
    // validate data
    let isValid = true;

    // do something with data
    data.date = new Date();
    data.rating = 0;

    // add into database
    return new Promise((resolve, reject) => {
        if (isValid) {
            var answer = {
                isAdded: false,
                _id: null
            };

            mongodb.connect(async function (err, client) {
                var db = client.db('comments-cloud'); // API key
                var collection = db.collection("some_api_key");

                await collection.insertOne(data, function (err, result) {
                    if (err) 
                        reject(err);

                    answer.isAdded = true;
                    answer._id = result.ops[0]._id;
                    console.log(result.ops[0]._id);
                    client.close();
                    resolve(answer);
                });
            });
        } else {
            reject('Invalid data');
        }
    });
}

function deleteComment(data) {
    data = data;
    // validate data
    let isValid = false;
    let regExpId = new RegExp("^[0-9a-fA-F]{24}$");
    if (regExpId.test(data._id))
        isValid = true;

    // Try to delete by _id

    return new Promise((resolve, reject) => {
        var answer = {
            isDeleted: false,
            err: '',
        }
        if (isValid) {
            console.log(data._id);
            mongodb.connect(async function (err, client) {
                var db = client.db('comments-cloud'); // API key
                var collection = db.collection("some_api_key");
                await collection.deleteOne({"_id": ObjectId(data._id)}, function(err, res) {
                    if (err) 
                        throw (err);
                    console.log("Document deleted");
                    answer.isDeleted = true;
                    client.close();
                    resolve(answer);
                });
            });


        } else {
            answer.err = 'Inavlid data';
            resolve(answer);
        }
    })
}

function getComments(data) {
    // validate data
    let isValid = true;
    data.limit = Number(data.limit);

    // parse comment fields and set default values
    let fields = {};
    if (data.fields)
        for (let i = 0; i < data.fields.length && i < 10; i++) // max 10 fields
            fields[data.fields[i]] = true;

    
    // get Data
    return new Promise((resolve, reject) => {
        if (isValid) {
            var answer = {
                isGot: true,
            };

            mongodb.connect(async function (err, client) {
                if (err)
                    reject(err);

                var db = client.db('comments-cloud'); // API key
                var collection = db.collection("some_api_key");

                // limit number of comments and sort them by some field
                // return comments
                var comments = collection.find().limit(data.limit).sort(data.sort_by).project(fields);
                var answer = [];
                await comments.forEach(doc => {
                    answer.push(doc);
                });
                resolve(answer);
            });
        } else {
            reject('Invalid data');
        }
    });

}

function updateComment(data) {
    // validate data
    let isValid = false;
    let regExpId = new RegExp("^[0-9a-fA-F]{24}$");
    if (regExpId.test(data._id))
        isValid = true;

    // do something with data
    let newValues = {};
    for (let i in data)
        if (i != '_id')
            newValues[i] = data[i];
    console.log(data, newValues);
    
    // get Data
    return new Promise((resolve, reject) => {
        var answer = {
            isUpdated: false,
            err: ''
        };
        if (isValid) {
            mongodb.connect(async function (err, client) {
                if (err)
                    reject(err);

                var db = client.db('comments-cloud'); // API key
                var collection = db.collection("some_api_key");

                // limit number of comments and sort them by some field
                // return comments

                await collection.updateOne({"_id": ObjectId(data._id)}, { $set: newValues}, function(err, res){
                    if (err) throw err;
                    answer.isUpdated = true;
                    console.log('Update comment');
                    client.close();
                    resolve(answer);
                });
            });
        } else {
            answer.err = 'Invalid data';
            resolve(answer);
        }
    });
}
module.exports = main;