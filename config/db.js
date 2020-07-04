const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
    // "mongodb+srv://TEDB:Ai27RqEkY3Xv75rk@clusterfree-dft3g.azure.mongodb.net/ContactApp"

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