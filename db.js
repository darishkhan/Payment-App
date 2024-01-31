const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");

async function connection(){
try {
        await mongoose.connect("mongodb+srv://darishkhan:darish155@cluster0.t4zer74.mongodb.net/payment");
        console.log("db connected successfully") ;    
    } catch (error) {
        console.log("unable to connect db");    
    }
};
connection();

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password:{
        type: String,
        required: true,
        minLength: 8,
        trim: true
    },
    firstname:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }, 
    lastname:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});


const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
};
