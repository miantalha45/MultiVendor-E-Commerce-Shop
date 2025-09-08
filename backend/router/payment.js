const express = require('express');
const { processPayment, getStripeApiKey } = require('../controller/payment');
const router = express.Router();

router.post('/process', processPayment)
router.get('/stripeapikey', getStripeApiKey)

module.exports = router;