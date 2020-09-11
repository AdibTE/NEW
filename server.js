const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const expressFileUpload = require('express-fileupload');

// Database Connection
connectDB();

// Middlewares
app.use(express.json({ extended: false }));
app.use(
    expressFileUpload({
        createParentPath: true
    })
);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/projects', require('./routes/projects'));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 85;
var server = app.listen(PORT, function() {
    console.log(`[ Listening on port ${PORT} ]`);
});

module.exports = server;
