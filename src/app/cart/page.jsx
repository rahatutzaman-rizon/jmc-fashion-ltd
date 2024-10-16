"use client"
import List from '@/components/List/List';
import { useState } from 'react';

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100, // Payment amount (BDT)
          currency: 'BDT', // Currency (BDT is default)
        }),
      });

      console.log('Response:', response); // Log the response

      // Check if the response status is OK (200)
      if (!response.ok) {
        const errorMessage = await response.text(); // Capture error message as text
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
      }

      const data = await response.json();

      if (data.redirectUrl) {
        // Redirect the user to the SSLCommerz payment gateway
        window.location.href = data.redirectUrl;
      } else {
        setError('Payment initiation failed');
      }
    } catch (err) {
      console.error(err);
      setError(err.message); // Use the captured error message
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">SSLCommerz Payment Integration</h1>
      <button
        className={`px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition ${loading ? 'cursor-not-allowed' : ''}`}
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>


      <List></List>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default PaymentPage;
