const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  status: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  publicationDate: { type: Date, required: true },
  updateDate: { type: Date, required: true },
});

module.exports = mongoose.model('Post', postSchema);
