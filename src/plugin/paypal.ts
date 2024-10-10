import dotenv from 'dotenv';
import https from 'https';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

dotenv.config();


// function to set up the paypal environment
function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  
    // check if the required environment variables are set
    if (!clientId || !clientSecret) {
      throw new Error('PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET must be defined in environment variables');
    }
  
// create and return a sandbox environment
    return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
  }
  
// function to create a paypal http client
function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
  }

// function to create a paypal order
export async function createPayPalOrder(value: number, currency: string) {
    // create a new order request
    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    // set preference for return representation
    request.prefer("return=representation");
    // set the request body with order details
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: value.toFixed(2)
        }
      }]
    });
  
    try {
      // execute the request and get the response
      const response = await client().execute(request);
      // return the result of the order creation
      return response.result;
    } catch (error) {
      // log and rethrow any errors
      console.error('PayPal API Error:', error);
      throw error;
    }
  }
const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || 'api-m.sandbox.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const { core: { SandboxEnvironment, PayPalHttpClient } } = checkoutNodeJssdk;


//helper function to make a request to the paypal api
function makeRequest(options: https.RequestOptions, data?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk.toString());
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(body));
          } else {
            reject(new Error(`Request failed with status code ${res.statusCode}`));
          }
        });
      });
  
      req.on('error', reject);
      if (data) req.write(data);
      req.end();
    });
  }
// function to get an access token from paypal
async function getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    const options: https.RequestOptions = {
      hostname: PAYPAL_API_BASE,
      path: '/v1/oauth2/token',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
  
    const response = await makeRequest(options, 'grant_type=client_credentials');
    return response.access_token;
  }
// function to create a paypal order
export async function createOrder(amount: number, currency: string): Promise<any> {
    // get an access token
    const accessToken = await getAccessToken();
    // prepare the order data
    const data = JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: currency,
          value: amount.toFixed(2)
        }
      }]
    });
    // set up the request options
    const options: https.RequestOptions = {
      hostname: PAYPAL_API_BASE,
      path: '/v2/checkout/orders',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };
   // make the request to create the order
    return makeRequest(options, data);
  }
// function to capture a payment
export async function capturePayment(orderId: string): Promise<any> {
    const accessToken = await getAccessToken();
     // set up the request options
    const options: https.RequestOptions = {
      hostname: PAYPAL_API_BASE,
      path: `/v2/checkout/orders/${orderId}/capture`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };
  
    return makeRequest(options);
  }
// webhook verification - function to verify a paypal webhook signature
export async function verifyPayPalWebhookSignature(req: any): Promise<boolean> {
    const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_WEBHOOK_ID } = process.env;
     // check if all required environment variables are set
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET || !PAYPAL_WEBHOOK_ID) {
      throw new Error('Missing PayPal environment variables');
    }
   // create a paypal http client 
    const client = new PayPalHttpClient(new SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET));
    // prepare the verification request
    const verifyWebhookSignature = require('@paypal/checkout-server-sdk').notifications.VerifyWebhookSignatureRequest;
    const request = new verifyWebhookSignature();
    
    request.requestBody({
      auth_algo: req.headers['paypal-auth-algo'],
      cert_url: req.headers['paypal-cert-url'],
      transmission_id: req.headers['paypal-transmission-id'],
      transmission_sig: req.headers['paypal-transmission-sig'],
      transmission_time: req.headers['paypal-transmission-time'],
      webhook_id: PAYPAL_WEBHOOK_ID,
      webhook_event: req.body
    });
  
    try {
    // execute the verification request
      const response = await client.execute(request);
    // return true if the verification was successful
      return response.result.verification_status === 'SUCCESS';
    } catch (error) {
      console.error('Error verifying PayPal webhook:', error);
      return false;
    }
  }