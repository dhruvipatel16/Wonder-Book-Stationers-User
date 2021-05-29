var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var custbymail = require('./routes/custbyemail_rout');
var orderRouter = require('./routes/order_route');
var loginRouter = require('./routes/login_routes');
var signRouter = require('./routes/signupRoutes');
//pass valu
var signupRouter = require('./routes/signup_routes');
var passRouter = require('./routes/password_routes')
var productRouter = require('./routes/product_routes');
var bookRouter = require('./routes/book_routes');
var adminRouter = require('./routes/admin_routes');
var userRouter = require('./routes/user_route');
var userDeleteRouter = require('./routes/userDelete_routes');
var customerRouter = require('./routes/customer_router');
var employeeRouter = require('./routes/employee_route');
var categoryRouter = require('./routes/category_routes');

var categoryBookRouter = require('./routes/category_book_routes');
var categoryStatRouter = require('./routes/category_stationery_routes');
var dashboardRouter = require('./routes/dashboard_routes');
var categoryDeleteAllRouter = require('./routes/category_delete');
var cartRouter = require('./routes/cart_routes');
var order_detailRouter = require('./routes/order_detail_routes');
var order_deliveryRouter = require('./routes/order_delivery_routes');
var supplierRouter = require('./routes/supplier_routes');
var purchaseRouter = require('./routes/purchase_routes');
var orderDetails = require('./routes/getOrderDetails');
var orderDelivery = require('./routes/getOrderDelivery');
var orderDeliveryByEmp = require('./routes/orderDeliveryByEmpId');
var orderDeliveryNotByEmp = require('./routes/orderDeliveryNotByEmpId');
var passRouter = require('./routes/password_routes');
var searchRouter = require('./routes/searchproduct_routes');
var mailRouter = require('./routes/mail_routes');
var prodbycatRouter = require('./routes/prodbycat_routes');
var orderStatusRouter = require('./routes/order_status_routes');
var orderByCustomerRouter = require('./routes/order_customer_routes')

var DashboardTrackingStatusRouter=require('./routes/DashboardTrackingStatus_routes');
var DashBoardCustomerRouter=require('./routes/dashboard_customer_routes')
var TopSellingProductsRouter=require('./routes/topseelingproduct_routes');
var TotalCustomerRouter=require('./routes/total_customer_routes');
var TodaysOrderRouter=require('./routes/todays_order');
var TypeUpdateRouter=require('./routes/usertype_routes');

var orderIdRouter = require('./routes/getOrderIdRoutes');
var custAddRouter = require('./routes/getCustAdd');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/userDelete', userDeleteRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/mail', mailRouter);
app.use('/orderStatus', orderStatusRouter);

app.use('/dashboard',dashboardRouter);
app.use('/DashboardTrackingStatus',DashboardTrackingStatusRouter);
app.use('/dashboardCustomerData', DashBoardCustomerRouter);

app.use('/TopSellingProducts/',TopSellingProductsRouter);
app.use('/TotalCustomer/',TotalCustomerRouter);
app.use('/TodaysOrders/',TodaysOrderRouter);

app.use('/passwords', passRouter);
app.use('/sign', signRouter);
app.use('/product', productRouter);
app.use('/book', bookRouter);
app.use('/category', categoryRouter);
app.use('/bookcategory', categoryBookRouter);
app.use('/statCategory', categoryStatRouter);
app.use('/categoryDelete', categoryDeleteAllRouter);
app.use('/searchProduct', searchRouter);
app.use('/custbymail', custbymail);

app.use('/typeUpdate', TypeUpdateRouter);

app.use('/cart', cartRouter);
app.use('/admins', adminRouter);
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/order', orderRouter);
app.use('/orderByCustomer', orderByCustomerRouter);
app.use('/order_detail', order_detailRouter);
app.use('/order_delivery', order_deliveryRouter);
app.use('/orderDetails', orderDetails);
app.use('/orderDelivery', orderDelivery);
app.use('/orderDeliveryEmp', orderDeliveryByEmp);
app.use('/orderDeliveryNotEmp', orderDeliveryNotByEmp);
app.use('/custAdd', custAddRouter);
app.use('/orderId', orderIdRouter);
app.use('/prodbycat', prodbycatRouter);
app.use('/supplier', supplierRouter);
app.use('/purchase', purchaseRouter);
app.use('/password', passRouter);
app.use('/mail', mailRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
