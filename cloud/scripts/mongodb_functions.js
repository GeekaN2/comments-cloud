const MongoClient = require("mongodb").MongoClient;
 
// Initialize MongoClient
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect(function(err, client){
 
    if(err) {
        return console.log(err);
    }
    
    var db = client.db('AUMD9ksWu1E0e44d6ZDUAvR1h3kLq9'); // API key
    
    var collection = db.collection("url_or_something_else"); // entity name in application

    const comment = { 
        username: 'Geekon',
        text: 'Super text',
        parent_id: null,
        date: new Date(),
        rating: 0
     };
    /*collection.insert(comment, (err, result) => {
        if (err) { 
            console.log(err);
        } else {
            console.log(result.ops[0]);
        }
    });*/
    console.log(collection);

    client.close();
});

module.exports = mongoClient;


