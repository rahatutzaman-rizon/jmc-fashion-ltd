
"use client";

import { useState, useEffect } from 'react';
import productsData from '../products.json'; // Import product data to match wishlist items
import Image from 'next/image';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist from localStorage when component mounts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || "rizon";
    setWishlist(storedWishlist);
  }, []);
  console.log("wishlist",setWishlist)

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-4">
          {wishlist.map((item) => {
            const product = productsData.products.find(prod => prod.id === item.id); // Find product to get details
            return (
              <li key={item.id} className="p-4 border rounded shadow-md flex items-center">
             
                {product && (
                  <Image
                    src={product.images[0].url} // Display product image
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4"
                    height={64}
                    width={64}
                  />
                )}
                <h3 className="text-xl font-bold">{item.name}</h3>
                
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
