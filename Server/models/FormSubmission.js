const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  submittedBy: {
    type: String,
    required: true
  },
  answers: [
    {
      questionLabel: { type: String, required: true },
      answer: { type: String, required: true }
    }
  ],
  submittedOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FormSubmission', formSubmissionSchema);
