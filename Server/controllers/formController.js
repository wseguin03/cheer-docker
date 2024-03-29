const Form = require('../models/forms.js');

exports.createForm = async (req, res) => {
  try {
    const newForm = await Form.create(req.body);
    res.status(201).json(newForm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.toggleFormVisibility = async (req, res) => {
    try {
      const form = await Form.findById(req.params.id);
      if (!form) {
        return res.status(404).json({ message: "Form not found" });
      }
      form.isVisible = !form.isVisible;
      await form.save();
      res.json({ message: "Form visibility updated", form });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  exports.updateForm = async (req, res) => {
    try {
      const { id } = req.params;
      const form = await Form.findByIdAndUpdate(id, req.body, { new: true });
      if (!form) {
        return res.status(404).json({ message: "Form not found" });
      }
      res.json({ message: "Form updated successfully", form });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  exports.deleteForm = async (req, res) => {
    try {
      await Form.findByIdAndDelete(req.params.id);
      res.send({ message: 'Form deleted successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Server error' });
    }
  };
  