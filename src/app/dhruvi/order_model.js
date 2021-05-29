var db = require('../dbconnection');
var order = {
    getAllOrder: function (callback) {
        return db.query('select c.*,o.* from customer c,order_tbl o where o.fk_customer_id=c.customer_id', callback);
    },
    getCustAdd: function (order_id, callback) {
        return db.query('select c.*,o.* from customer c,order_tbl o where o.fk_customer_id=c.customer_id and o.order_id=?', [order_id], callback);
    },//thankpage
    getOrderById: function (order_id, callback) {
        return db.query('select * from `order_tbl` where order_id=?', [order_id], callback);
    },//thankpage
    getOrdersByCustomerId: function (cust_id, callback) {
        return db.query('SELECT * FROM `order_tbl` WHERE fk_customer_id=?', [cust_id], callback);
    }
    ,
    getOrderById1: function (order_id, callback) {
        return db.query('select c.*,o.* from customer c,order_tbl o where c.customer_id=o.fk_customer_id and o.order_id=? ', [order_id], callback);
    },//order_detail_routes
    getOrderByCustid: function (c_id, callback) {
        return db.query('SELECT o.*,od.*,p.* FROM order_tbl o,order_detail od,product p WHERE o.fk_customer_id=? and od.fk_order_id=o.order_id and p.product_id=od.fk_product_id', [c_id], callback)
    },
    updateOrderData: function (item, callback) {
        return db.query('update order_tbl set order_amount=?,order_date=?,order_status=? where order_id=?', [item.order_amount, item.order_date, item.order_status, item.order_id], callback);
    },
    addOrderData: function (item, callback) {

        return db.query('INSERT INTO `order_tbl` ( `shipping_address`,`order_notes`,`order_amount`,`payment_type`, `order_date`, `order_status`,`fk_customer_id`) VALUES (?,?,?,?,?,?,?)', [item.shipping_address, item.order_notes, item.order_amount, item.payment_type, item.order_date, item.order_status, item.fk_customer_id], callback);
    }
    ,
    orderCount: function (callback) {
        return db.query('SELECT COUNT(*) AS total FROM order_tbl WHERE order_status= "Pending"', callback);
    }
};
//order_route
module.exports = order;
