const {MongoClient} = require("mongodb")
// const connectionString = "mongodb://localhost:27017";
const connectionString = "mongodb+srv://admin:Thientai1997@@cluster0.hofjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer : (callback) => {
        client.connect((err, db) => {
            if (err || !db) throw err
            dbConnection = db.db("groceryStore")
            console.log("Successfully connected to MongoDB")
            
            return callback();
        })
    },
    
    
    getDb: () => {
        return dbConnection;
    }
}
