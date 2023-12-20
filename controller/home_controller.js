const mongoose = require('mongoose')
const Question = require('../models/question')

module.exports.home = async function(req, res) {
    try {
      // Find all questions 
      let questions = await Question.find({}).populate('options')

      // Send the questions 
      return res.status(200).json(questions)
    } catch (err) {
      // Log errors which occur and return error response
      console.log(err)
      return res.status(500).json({
        error: 'Internal server error'
      })
    }
}
