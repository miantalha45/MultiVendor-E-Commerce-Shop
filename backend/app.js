const express = require('express');
const ErrorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

// config
// console.log("process.env.NODE_ENV", process.env.NODE_ENV)
if (process.env.NODE_ENV !== "PRODUCTION") {
    require('dotenv').config({
        path: 'backend/config/.env'
    })
}

//import Routes
const user = require('./router/user');
const shop = require('./router/shop');
const product = require('./router/product');
const event = require('./router/event');
const couponCode = require('./router/couponCode');
const payment = require('./router/payment');
const order = require('./router/order');
const conversation = require('./router/conversation');
const message = require('./router/message');

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", couponCode);
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);

// It's for error handling
app.use(ErrorHandler);

module.exports = app;