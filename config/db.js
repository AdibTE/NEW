const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
    // "mongoURI": "mongodb://localhost:27017/ContactsApp",

const connectDB = async () => {
    try {
       await mongoose
        .connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('[ DB CONNECTED ]');
    } catch {
        console.log('[ DB FAILD TO CONNECT ]');
        process.exit(1);
    }
};

module.exports = connectDB;