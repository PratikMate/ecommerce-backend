import { core, orders } from '@paypal/checkout-server-sdk';

const clientId = process.env.PAYPAL_CLIENT_ID as string;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET as string;

const environment = new core.SandboxEnvironment(clientId, clientSecret);
const client = new core.PayPalHttpClient(environment);

export { client, orders };
