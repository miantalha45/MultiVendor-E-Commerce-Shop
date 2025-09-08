const stripeLib = require("stripe");
const catchAsyncError = require("../middleware/catchAsyncError");

const processPayment = catchAsyncError(async (req, res, next) => {
    // console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

    const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);

    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: { company: "MaimaSoft" },
    });

    return res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
    });
});

const getStripeApiKey = catchAsyncError(async (req, res, next) => {
    return res.status(200).json({
        success: true,
        stripeApiKey: process.env.STRIPE_API_KEY,
    });
});

module.exports = {
    processPayment,
    getStripeApiKey,
};
