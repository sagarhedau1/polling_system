const mongoose = require('mongoose')

// Define the question schema 
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Option',
    }]
})

// Create model based on question schema
const Question = mongoose.model("Question", questionSchema);

// Export Question model so it can be used in other part of application
module.exports = Question;
