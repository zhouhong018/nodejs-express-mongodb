const mongoose = require('mongoose');
const Live = require('../models/live.model')
var path = require('path')

// 新建用户
exports.create = function (req, res, next) {
  const live = new Live(req.body);
  Live.find({$and: [{'live':live.live}, {'id':live.id}]}, function (err, data){
    if(data && data.length > 0){
      res.send({
        code: 'fail',
        message: '爱好重复'
      });
    }else{
      live.save()
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
  const live = new Live(req.body);
  const id = req.params.id;
  Live.findByIdAndUpdate(id, { $set: req.body }, { new: false })
    .then((live) => {
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
  Live.paginate(queryCondition, {page: Number(page), limit: Number(limit), sort: { date: -1 }}, function (err, result) {
    res.json({
      code: 'success',
      data: result
    });
  });
}

//删除单个
exports.remove = function (req, res, next) {
  var id = req.params.id;
  Live.findByIdAndRemove(id, function (err, doc) {
    res.json({
      code: 'success',
      data: true
    });
  })

};
