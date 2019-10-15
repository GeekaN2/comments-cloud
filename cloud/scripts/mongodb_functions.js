const MongoClient = require("mongodb").MongoClient;
const fs = require('fs');

// Initialize MongoClient (Connect to DB)
const mongoKey = fs.readFileSync('env/mongodb_key.txt', 'utf-8').toString();

const mongoClient = new MongoClient(mongoKey, { useNewUrlParser: true, useUnifiedTopology: true });



module.exports = mongoClient;


