// Importing Mongoose library
const mongoose = require('mongoose')

// Defining new schema for the Option
const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  link_to_vote: {
    type: String,
  }
})

// Create a new model based onschema
const Option = mongoose.model("Option", optionSchema);

// Export model for use in other module
module.exports = Option;
