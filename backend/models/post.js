const mongoose = require('mongoose');

const ponstSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true } //A propriedade ref nos permite definir a qual modulo o id que estamos armazenando vai pertencer
});

module.exports = mongoose.model('Post', ponstSchema);
