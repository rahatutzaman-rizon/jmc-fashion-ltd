// File: pages/api/sslcommerz.js

import fetch from 'node-fetch';
import Cors from 'cors';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const { amount, currency } = req.body;

    const sslcommerzURL = 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

    const payload = {
      store_id: 'jmc670f4b429c3d8',
      store_passwd: 'jmc670f4b429c3d8@ssl',
      total_amount: amount,
      currency: currency || 'BDT',
      tran_id: `TEST_${Date.now()}`,
      success_url: 'http://localhost:3000/success',
      fail_url: 'http://localhost:3000/fail',
      cancel_url: 'http://localhost:3000/cancel',
      emi_option: 0,
      cus_name: 'Test Customer',
      cus_email: 'test@example.com',
      cus_add1: 'Dhaka',
      cus_phone: '01711111111',
      shipping_method: 'NO',
      product_name: 'Test Product',
      product_category: 'Test Category',
      product_profile: 'general',
    };

    try {
      const response = await fetch(sslcommerzURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(payload).toString(),
      });

      const data = await response.json();

      if (data.status === 'SUCCESS') {
        res.status(200).json({ redirectUrl: data.GatewayPageURL });
      } else {
        res.status(400).json({ error: 'Payment initiation failed', details: data });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}