const mongoose = require('mongoose');

const ponstSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Post', ponstSchema);
