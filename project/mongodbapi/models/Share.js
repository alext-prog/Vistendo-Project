const mongoose = require("mongoose");

// Collection for shares from users

const ShareSchema = new mongoose.Schema(
{
    userId:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        max: 500,
    },
    img:{
        type: String,
    },
    comments:{
        type: Array,
        default: [],
    },
},
{timestamps:true}
);

module.exports = mongoose.model("Share", ShareSchema);