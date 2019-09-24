const mongoose = require('mongoose');
const Skill = require('../models/skill.model')
var path = require('path')

// 新建用户
exports.create = function (req, res, next) {
  const skill = new Skill(req.body);
  console.log(skill)
  Skill.find({$and: [{'skill':skill.skill}, {'id':skill.id}]}, function (err, data){
    if(data && data.length > 0){
      res.send({
        code: 'fail',
        message: '技能重复'
      });
    }else{
      skill.save()
      .then(data => {
        res.send({
          code: 'success',
          message: '新增成功'
        });
      }).catch((e) => {
        res.send(e);
      })
    }
  });
};

// 更新
exports.update = function (req, res, next) {
  const skill = new Skill(req.body);
  const id = req.params.id;
  Skill.findByIdAndUpdate(id, { $set: req.body }, { new: false })
    .then((skill) => {
      res.send({
        code: 'success',
        message: '修改成功'
      });
    })
};


// 列表
exports.list = function (req, res, next) {
  var page = (req.body.page) ? req.body.page : 1;
  var limit = (req.body.size) ? req.body.size : 5;
  var queryCondition = {};
  queryCondition.id = req.body.id;
  Skill.paginate(queryCondition, {page: Number(page), limit: Number(limit), sort: { date: -1 }}, function (err, result) {
    res.json({
      code: 'success',
      data: result
    });
  });
}

//删除单个
exports.remove = function (req, res, next) {
  var id = req.params.id;
  Skill.findByIdAndRemove(id, function (err, doc) {
    res.json({
      code: 'success',
      data: true
    });
  })

};
