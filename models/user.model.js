var mongoose = require('mongoose'); // 引入的是mongoose
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema; // 利用mongoose下的Schema(架构、模型)

var UserSchema = new Schema({
  name: String,
  age: Number,
  sex: Number,
  currency: Number,
  country: Number,
  time: Number
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
