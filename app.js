'use strict';
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {checkUser} = require('./middleware/authMiddleware');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require("socket.io")(server);

io.on('connect', (socket) => {
    console.log('a user is connected with id: ' + socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected with id: ' + socket.id);
    });
    socket.on('join room', (msg) => {
        console.log('message : ' + msg + ' from : ' + socket.id);
        io.emit('join room', msg);
    });
});
//relative path to work on different OSes
const path = require('path');

// database connection
const dbURI = "mongodb+srv://kamelyehya:kamelyehya@cluster0.rpil9.mongodb.net/monkedbn?retryWrites=true&w=majority"
mongoose.connect(dbURI,{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex:true
});


// middleware
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));
app.use(authRoutes);

// routes
app.get('*', checkUser);

//checking if app is running on Heroku
if (process.env.NODE_ENV === 'production')
{
  //starts React from build folder
  app.use(express.static(path.resolve(__dirname, './client/build')));

  //for reconnecting purposes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });
}
else
{
  //app running locally
  app.use(express.static(path.resolve(__dirname, './client/build')));

  //for reconnecting purposes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });
}