const MongoClient = require("mongodb").MongoClient;
const fs = require('fs');
// Initialize MongoClient
const mongoKey = fs.readFileSync('env/mongodb_key.txt', 'utf-8').toString();

const mongoClient = new MongoClient(mongoKey, { useNewUrlParser: true, useUnifiedTopology: true });


mongoClient.connect(function(err, client){
    if (err) throw err;

    client.close();
});

module.exports = mongoClient;


