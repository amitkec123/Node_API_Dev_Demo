const mongose = require('mongoose');

const schema = mongose.Schema({
  _id: mongose.Schema.Types.ObjectId,
  name: String,
  price: Number
});

module.exports = mongose.model('Product', schema);
