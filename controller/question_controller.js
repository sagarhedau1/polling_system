const mongoose = require('mongoose');
const Question = require('../models/question');
const Option = require('../models/option');

// Function to create a question
module.exports.create = async function(req, res) {
  try {
    // Create a new question with a title
    const question = await Question.create({
      title: req.body.title
    });

    // Return a success response with the created question
    return res.status(200).json({ 
      message: "Congratulations, the question is created", 
      data: question 
    });
  } catch (err) {
    console.error(err);

    // Return an error response for server errors
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

// Function to delete a question
module.exports.delete = async function(req, res) {
  try {
    // Find the question by ID and populate its options
    const question = await Question.findById(req.params.id).populate('options');
    
    if (!question) {
      // Return an error response if the question is not found
      return res.status(404).json({ error: 'Sorry, question not found' });
    }
    
    // Check if any option in the question has votes
    for (const option of question.options) {
      if (option.votes >= 1) {
        return res.status(403).json({ error: 'Sorry, cannot delete this question because it has votes' });
      }
    }
    
    // Delete all options of the question
    await Option.deleteMany({ _id: { $in: question.options } });
    
    // Delete the question itself
    await Question.findByIdAndDelete(req.params.id);
    
    // Return a success response
    return res.status(200).json({ message: 'The question and its options are deleted successfully', data: question });
  } catch (err) {
    console.error(err);

    // Return an error response for server errors
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.getQuestion = async function(req, res) {
  try {
    const question = await Question.findById(req.params.id).populate('options');
    
    if (question) {
      return res.status(200).json({ question });
    } else {
      return res.status(404).json({ message: "Sorry, question not found" });
    }
  } catch (err) {
    console.error(err);
    
    // Return an error response for server errors
    return res.status(500).json({ message: "Internal server error" });
  }
};
