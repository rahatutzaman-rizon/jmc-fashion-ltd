// components/ProductList.js

"use client"
import React, { useEffect, useState } from 'react';

const products = [
  { id: 1, name: 'Product 1', description: 'Description for Product 1' },
  { id: 2, name: 'Product 2', description: 'Description for Product 2' },
  { id: 3, name: 'Product 3', description: 'Description for Product 3' },
];

const ProductList = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const addToWishlist = (product) => {
    const newWishlist = [...wishlist, product];
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Products</h1>
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="flex justify-between p-4 border-b">
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p>{product.description}</p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => addToWishlist(product)}
            >
              Add to Wishlist
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-8">Wishlist</h2>
      <ul className="mt-4">
        {wishlist.map((item) => (
          <li key={item.id} className="flex justify-between p-4 border-b">
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
