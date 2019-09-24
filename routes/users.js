var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/user.controller'); // 引入控制器

router.delete('/remove/:id', dataCtrl.remove);
router.put('/update/:id', dataCtrl.update);
router.post('/insert', dataCtrl.create);
router.post('/list', dataCtrl.list);
router.get('/detail', dataCtrl.getOne);

module.exports = router;