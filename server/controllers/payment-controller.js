const { cartsService, ordersService } = require("../sevices");
const { fechCartsById } = cartsService;
const { calculateOrderAmount } = ordersService;
const stripe = require("stripe")(process.env.STRIPE_KEY);

console.log("payment.controller.js: ", stripe)

const createPaymentIntent = async (req, res, next) => {
        const userId = req.user.id //Extract user id from passport user object
        //Create a PaymentIntent with the order amount and currency
        const amount = await calculateOrderAmount(userId)
        const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd"
        })
        req.send({
                clientSecret: paymentIntent.client_secret
        })
}


module.exports = {
        createPaymentIntent
}