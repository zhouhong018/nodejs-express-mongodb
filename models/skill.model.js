var mongoose = require('mongoose'); // 引入的是mongoose
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema; // 利用mongoose下的Schema(架构、模型)
var ObjectId = Schema.ObjectId;

var SkillSchema = new Schema({
  id: ObjectId,
  skill: String,
  remark: String
});

SkillSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Skill', SkillSchema);
