const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    formName: { type: String, required: true },
    questions: [
      {
        questionLabel: { type: String, required: true },
        fieldType: { type: String, required: true },
        options: [String], 
      }
    ],
    isVisible: { type: Boolean, default: true }, 
  });
  
module.exports = mongoose.model('Form', formSchema);
