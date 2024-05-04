const mongoose = require('mongoose');

// create a todos show schema

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }, 
    UserID :  {
        type : String ,
        required : true
    }
});


module.exports = mongoose.model('Todo', todoSchema);