const mongoose = require('mongoose');
const User = require('../models/user.model')
var path = require('path')

// 新建用户
exports.create = function (req, res, next) {
  const user = new User(req.body);
  user.time = new Date().getTime();
  User.find({'name':user.name}, function (err, data){
    if(data && data.length > 0){
      res.send({
        code: 'fail',
        message: '姓名重复'
      });
    }else{
      user.save()
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
  const user = new User(req.body);
  const id = req.params.id;
  req.body.time = new Date().getTime();
  User.findByIdAndUpdate(id, { $set: req.body }, { new: false })
    .then((user) => {
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
  req.body.name && (queryCondition.name = req.body.name);
  req.body.age && (queryCondition.age = req.body.age);
  req.body.sex && (queryCondition.sex = Number(req.body.sex));
  req.body.currency && (queryCondition.currency = Number(req.body.currency));
  req.body.country && (queryCondition.country = Number(req.body.country));
  req.body.submitDateStart && (queryCondition.$and = [{'time': {'$gt': Number(req.body.submitDateStart)}}, {'time': {'$lt': Number(req.body.submitDateEnd)}}]);

  User.paginate(queryCondition, {page: Number(page), limit: Number(limit), sort: { date: -1 }}, function (err, result) {
    res.json({
      code: 'success',
      data: result
    });
  });
}

//删除单个
exports.remove = function (req, res, next) {
  var id = req.params.id;
  User.findByIdAndRemove(id, function (err, doc) {
    res.json({
      code: 'success',
      data: true
    });
  })

};

//获取单个
exports.getOne = function (req, res, next) {
  var id = req.query.id;
  User.findOne({'_id': id}, function (err, data){
    res.json({
      code: 'success',
      data: data
    });
  });
};