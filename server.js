const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/db');
const path = require('path')

// Database Connection
connectDB();

// Middlewares
app.use(express.json({extended:false}))

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));

if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT =  process.env.PORT || 85;
app.listen(PORT,()=>{
    console.log(`[ Listening on port ${PORT} ]`)
});