const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const playerSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    gamesPlayed:{
        type: Number,
        required: [true, 'Please enter an email'],
    },
    roundsPlayed:{
        type: Number,
        required: true
    },
    winrate:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        required: true
    }, 
    isConnected:{
        type:Boolean,
        required: true
    },
    inQueue: {
        type:Boolean,
        required: true
    },
    inGame: {
        type: Boolean,
        required: true
    }
});

playerSchema.post('save', function(doc, next){
    console.log('user has been saved and added successfully');
    next();
});

//Static method to log in the user
playerSchema.statics.createPlayer = async function(username){
    const gamesPlayed = 0;
    const roundsPlayed = 0;
    const winrate = 0;
    const rating = 1500.56;
    const isConnected = false, inQueue = false, inGame = false;
    try{
        await this.create({username, gamesPlayed, roundsPlayed, winrate, rating, isConnected, inQueue, inGame});
    }catch(err){
        console.log(err);
        res.status(400).json({ message:"Error creating player" });
    }
};
const Player = mongoose.model('player', playerSchema);

module.exports = Player;