var mongoose = require('mongoose'); // 引入的是mongoose
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema; // 利用mongoose下的Schema(架构、模型)
var ObjectId = Schema.ObjectId;

var LiveSchema = new Schema({
  id: ObjectId,
  live: String,
  remark: String
});

LiveSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Live', LiveSchema);
