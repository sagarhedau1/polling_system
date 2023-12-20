const mongoose = require('mongoose');
const Option = require('../models/option');
const Question = require('../models/question');

// Controller function to create an option
module.exports.create = async function (req, res) {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        error: 'Question not found'
      });
    }

    const option = await Option.create({
      text: req.body.text
    });

    // Set up the link for voting
    option.link_to_vote = `http://localhost:8000/options/${option._id}/add_vote`;
    option.save();

    // Push option to question's options
    question.options.push(option._id);
    question.save();

    // Return created option
    return res.json(option);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

// Controller function to delete an option
module.exports.delete = async function (req, res) {
  try {
    const option = await Option.findById(req.params.id);

    if (!option) {
      return res.status(404).json({
        error: 'Option not found'
      });
    }

    if (option.votes > 0) {
      return res.status(403).json({
        error: 'Cannot delete option with votes'
      });
    }

    const question = await Question.findOne({ options: req.params.id });

    if (question) {
      await Option.findByIdAndDelete(req.params.id);
      await Question.updateOne({ _id: question._id }, { $pull: { options: req.params.id } });
      return res.json({ message: 'Option deleted successfully', data: option });
    }

    return res.status(404).json({
      error: 'Question not found for this option'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

// Controller function to add a vote to an option
module.exports.addVote = async function (req, res) {
  try {
    const option = await Option.findById(req.params.id);

    if (!option) {
      return res.status(404).json({
        error: 'Option not found'
      });
    }

    // Increment votes count for option and save it
    option.votes += 1;
    option.save();

    return res.json({ message: 'Vote added to option', data: option });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};
