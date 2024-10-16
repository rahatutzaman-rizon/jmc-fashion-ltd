import fetch from 'node-fetch'; // Fetch for making API requests
import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

// Helper method to handle middleware in Next.js
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
  await runMiddleware(req, res, cors); // Enable CORS for the route

  if (req.method === 'POST') {
    const { amount, currency } = req.body;

    // SSLCommerz API endpoint for session initiation
    const sslcommerzURL = 'https://sandbox.sslcommerz.com/gwprocess/v3/api.php';

    // SSLCommerz payment payload
    const payload = {
      store_id: 'jmc670f4b429c3d8', // Your store ID
      store_passwd: 'jmc670f4b429c3d8@ssl', // Your store password
      total_amount: amount,
      currency: currency || 'BDT',
      tran_id: `TEST_${Date.now()}`, // Unique transaction ID
      success_url: 'http://localhost:3000/success', // Success redirect URL
      fail_url: 'http://localhost:3000/fail', // Failure redirect URL
      cancel_url: 'http://localhost:3000/cancel', // Cancellation redirect URL
      emi_option: 0, // EMI option
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
      // Make the request to SSLCommerz
      const response = await fetch(sslcommerzURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status === 'SUCCESS') {
        // Send back the URL to redirect to SSLCommerz payment page
        res.status(200).json({ redirectUrl: data.GatewayPageURL });
      } else {
        res.status(400).json({ error: 'Payment initiation failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}





import {NextResponse} from "next/server";
export async function POST() {

    try {
       const tran_id=(Math.floor(100000 + Math.random() * 900000)).toString();
       const init_url='https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

        const formData = new FormData();
        formData.append("store_id", "jmc670f4b429c3d8");
        formData.append("store_passwd", "jmc670f4b429c3d8@ssl");
        formData.append("total_amount", "1000");
        formData.append("currency", "BDT");
        formData.append("tran_id", `${tran_id}`);
        formData.append("success_url",`http://localhost:3000/api/success?id=${tran_id}`);
        formData.append("fail_url",`http://localhost:3000/api/fail?id=${tran_id}`);
        formData.append("cancel_url",`http://localhost:3000/api/cancel?id=${tran_id}`);
        formData.append("ipn_url",`http://localhost:3000/api/ipn?id=${tran_id}`);
        formData.append("cus_name",'Rabbil Hasan');
        formData.append("cus_email",'engr.rabbil@yahoo.com');
        formData.append('cus_add1','Shekhertek 8 Dhaka 1207');
        formData.append('cus_add2','Shekhertek 8 Dhaka 1207');
        formData.append('cus_city','Dhaka');
        formData.append('cus_state','Dhaka');
        formData.append('cus_postcode','1207');
        formData.append('cus_country','Bangladesh');
        formData.append('cus_phone','01701063280');
        formData.append('cus_fax','01701063280');
        formData.append('shipping_method','YES');
        formData.append('ship_name','Rabbil Hasan');
        formData.append('ship_add1','Shekhertek 8 Dhaka 1207');
        formData.append('ship_add2','Shekhertek 8 Dhaka 1207');
        formData.append('ship_city','Dhaka');
        formData.append('ship_state','Dhaka');
        formData.append('ship_country','Bangladesh');
        formData.append('ship_postcode','1207');
        formData.append('product_name','product_name');
        formData.append('product_category','category');
        formData.append('product_profile','profile');
        formData.append('product_amount','3');


        const requestOptions = {method: 'POST', body: formData}
        let SSLRes=await fetch(init_url, requestOptions)

        let SSLResJSON=await SSLRes.json();

        return NextResponse.json({data:SSLResJSON})
    }
    catch (e) {
        return NextResponse.json({data:e})
    }



}