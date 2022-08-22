const mongoose = require("mongoose");

// Collection for users

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 5,
    },
    email:{
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    desc:{
        type: String,
        max: 100,
    }
},
{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema);
