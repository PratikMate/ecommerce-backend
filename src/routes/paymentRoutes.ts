import { Router, Request, Response } from 'express';
import { client, orders } from '../services/paypal';

const router = Router();

router.post('/create-order', async (req: Request, res: Response) => {
    const request = new orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '100.00'
            }
        }]
    });

    try {
        const order = await client.execute(request);
        res.json({ id: order.result.id });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/capture-order', async (req: Request, res: Response) => {
    const { orderId } = req.body;
    const request = new orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
        const capture = await client.execute(request);
        res.json(capture.result);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
