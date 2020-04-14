const mongose = require('mongoose');

const schema = mongose.Schema({
  _id: mongose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongose.model('User', schema);
