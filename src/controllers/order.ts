import { Request, Response } from "express";
import { createPayPalOrder, verifyPayPalWebhookSignature } from "../plugin/paypal";
import Order from "../models/Order";
import Package from "../models/Package";

export async function createPendingOrder(req: Request, res: Response) {
    const { packageId, email } = req.body;

    try {
        const tourPackage = await Package.findById(packageId);
        if (!tourPackage) {
            return res.status(404).json({ error: "Package not found" });
        }

        const pendingOrder = new Order({
            email,
            packageId,
            amount: tourPackage.priceInCents,
            currency: "USD",
            status: "PENDING"
        });

        await pendingOrder.save();

        res.json({ orderId: pendingOrder._id });
    } catch (error) {
        console.error("Error creating pending order:", error);
        res.status(500).json({ error: "Failed to create pending order" });
    }
}

export async function initiatePayPalOrder(req: Request, res: Response) {
    const { orderId } = req.body;

    try {
        const order = await Order.findById(orderId);
        if (!order || order.status !== "PENDING") {
            return res.status(404).json({ error: "Valid pending order not found" });
        }

        const paypalOrder = await createPayPalOrder(order.amount / 100, order.currency);

        order.paypalOrderId = paypalOrder.id;
        order.status = "PAYPAL_CREATED";
        await order.save();

        res.json({ paypalOrderId: paypalOrder.id });
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        res.status(500).json({ error: "Failed to create PayPal order" });
    }
}

export async function handlePayPalWebhook(req: Request, res: Response) {
    const event = req.body;
  
    try {
      const isVerified = await verifyPayPalWebhookSignature(req);
      if (!isVerified) {
        return res.status(400).send('Invalid signature');
      }
  
      if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
        const orderId = event.resource.supplementary_data.relatedpackageIds.orderpackageId;
        
        try {
          const order = await Order.findOne({ paypalOrderId: orderId });
          if (order) {
            order.status = 'COMPLETED';
            await order.save();
            console.log(`Order ${order.packageId} has been completed.`);
          } else {
            console.log(`Order with PayPal ID ${orderId} not found.`);
          }
        } catch (error) {
          console.error('Error updating order:', error);
        }
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).send('Error processing webhook');
    }
}