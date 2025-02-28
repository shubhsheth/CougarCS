const express = require('express');
const stripeLoader = require('stripe');
const await = require('await');


const router = express.Router();
const stripe = new stripeLoader(process.env.STRIPE_KEY);

const charge = (token, amt) => {
    return stripe.charges.create({
        amount: amt*100,
        currency: 'usd',
        source: token,
        description: "Statement Description"
    });
};

router.post('/charge', async (req, res, next) => {
    try {
        let data = await charge(req.body.token.id, req.body.amount);
        console.log(data);
        res.send("Charged");
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;