import { Router, RequestHandler } from 'express';
import { createPendingOrder, initiatePayPalOrder, handlePayPalWebhook } from '../controllers/order';

const router = Router();

router.post('/paypal/pending', createPendingOrder as RequestHandler);
router.post('/paypal/initiate', initiatePayPalOrder as RequestHandler);
router.post('/paypal/webhook', handlePayPalWebhook as RequestHandler);

export default router;