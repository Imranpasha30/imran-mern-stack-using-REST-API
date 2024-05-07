const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/crud";

const connectDb = async() =>{
    try{
        await mongoose.connect(URI);
        console.log('MongoDB connected');
        const collections = await mongoose.connection.db.collections();
        console.log('Schemas (collections):', collections.map(coll => coll.collectionName));
        
    }catch(error){
        console.error("database connection failed");
        process.exit(0);
    }
};

module.exports = connectDb;