"use client";

import { useState, useEffect } from 'react';
import productsData from '../products.json'; // Import product data to match wishlist items
import Image from 'next/image';
import image from "../../assets/img3.jpeg";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);



  // Fetch wishlist from localStorage when component mounts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);
  
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); // Update localStorage
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-lg text-gray-600">Your wishlist is currently empty. Add some items to see them here!</p>
      ) : (
        <ul className="space-y-6">
          {wishlist.map((item) => {
            const product = productsData.products.find((prod) => prod.id === item.id); // Find product to get details
            return (
              <li 
                key={item.id} 
                className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-center space-x-6"
              >
                {product && (
                  <Image
                    src={image} // Display product image
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                    height={96}
                    width={96}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">Brand: <span className="font-medium">{item.brand}</span></p>
                  <p className="text-sm text-gray-600">Size: <span className="font-medium">{item.size}</span></p>
                  <p className="text-lg font-semibold text-indigo-500 mt-2">Price: ${item.price}</p>
                </div>
                <button   onClick={() => removeFromWishlist(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
