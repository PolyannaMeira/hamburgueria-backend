import Stripe from 'stripe';
import * as YUP from 'yup';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
	const total = items.reduce((acc, current) => {
		return current.price *current.quantity + acc;
	}, 0);	
	return total; 
};

class CreatePaymentIntentController {
	async store(request, response) {
		const schema = YUP.object().shape({
			products: YUP.array()
				.required()
				.of(
					YUP.object().shape({
						id: YUP.number().required(),
						quantity: YUP.number().required(),
						price: YUP.number().required(),
					
					}),
				),
		});

		try {
			schema.validateSync(request.body, { abortEarly: false });
		} catch (err) {
			return response.status(400).json({ error: err.errors });
		}
		const { products } = request.body;
		const amount = calculateOrderAmount(products);

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: 'brl',

			automatic_payment_methods: {
				enabled: true,
			},
		});

		response.json({
			clientSecret: paymentIntent.client_secret,
			dpmCheckerLink: `https://dashboard.stripe.com/setting/payment_methods/review?transaction_id=${paymentIntent.id}`,
		});
	}
}

export default new CreatePaymentIntentController();
