var express = require('express');
var router = express.Router();
var order = require('../model/order_model');

router.get('/:order_id', function (req, res, next) {

    order.getCustAdd(req.params.order_id, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });

});

module.exports = router;