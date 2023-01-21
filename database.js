const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://George:gz861994@localhost:27017/?authMechanism=DEFAULT";

let db;

module.exports = {
    connection: (callback) => {
        MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
            if (err) throw err;
            console.log("Database created!");
            db = client.db("myMongo");
            db.createCollection("users");
            db.createCollection("events");
            db.createCollection("counters");
        
            let counters = db.collection("counters");
            counters.insertOne({ "id": "user_id", "sequence_value": 0 });
        
            db.listCollections().toArray((err, items) => {
                if (err) throw err;
                console.log(items);
                if (items.length == 0) console.log("No collections");
            });

            return callback(err);
        });
    },

    getDb: () => { return db; }

};
