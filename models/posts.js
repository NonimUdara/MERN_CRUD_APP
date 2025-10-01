const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    topic:{
        type:String,
        required:true,
        default:'topic not provided'
    },
    description:{
        type:String,
        required:true,
        default:'description not provided'
    },
    postCategory:{
        type:String,
        required:true,
        default:'category not provided'
    }

});

module.exports = mongoose.model('Posts',postSchema);