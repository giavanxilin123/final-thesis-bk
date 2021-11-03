const dotenv = require ('dotenv')
dotenv.config()
const {MongoClient} = require("mongodb")
// const connectionString = "mongodb://localhost:27017";
const connectionString = process.env.MONGO_URL
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
