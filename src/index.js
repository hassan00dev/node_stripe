const express = require('express');
const Stripe = require('stripe');

const app = express();
const stripe = Stripe('sk_test_51Mtp8xAI3hjweorWfxRy7iwQ7d5zaql2q3mEM21R80gE7jhBrkMTLxR1Fbg9fo8rYrbEjgBrk7vwkjHHSqDhgPV900gBHsJmmz');

app.use(express.json());

app.get('/active', async (req, res) => {
    try {
        res.status(200).send({
            active: true,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
