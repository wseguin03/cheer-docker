const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const EventSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    allDay: Boolean,
  });

  
const Event = mongoose.model('Event', EventSchema);
model.exports = Event;