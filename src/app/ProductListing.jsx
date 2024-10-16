"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, StarIcon } from 'lucide-react';
import image from "../assets/img2.jpeg";
import Image from 'next/image';

// Simulated product data
import productsData from './products.json';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    subCategory: '',
    size: '',
    color: '',
    priceRange: '',
    brand: '',
  });
  const [sizeStock, setSizeStock] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Simulate API fetch
    setProducts(productsData.products);
    setFilteredProducts(productsData.products);
    
    // Load wishlist from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  const handleSizeClick = (size) => {
    setSelectedSize(size.name);
    setSizeStock(size.stock);
  };

  const addToWishlist = (product) => {
    if (!selectedSize) {
      alert('Please select a size before adding to wishlist.');
      return;
    }
  
    const wishlistItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price.current,
      image: product.image,
      size: selectedSize
    };
  
    const isProductInWishlist = wishlist.some(item => 
      item.id === product.id && item.size === selectedSize
    );
  
    if (!isProductInWishlist) {
      const newWishlist = [...wishlist, wishlistItem];
      setWishlist(newWishlist);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      alert(`Product added to wishlist with size ${selectedSize}!`);
    } else {
      alert('This product with the selected size is already in your wishlist!');
    }
  };

  useEffect(() => {
    let result = products;

    // Filter by Category
    if (filters.category) {
      result = result.filter(product => product.category.main === filters.category);
    }

    // Filter by SubCategory
    if (filters.subCategory) {
      result = result.filter(product => product.category.sub === filters.subCategory);
    }

    // Filter by Size
    if (filters.size) {
      result = result.filter(product =>
        product.sizes.some(size => size.name === filters.size && size.stock > 0)
      );

      // Calculate total stock for the selected size across all filtered products
      const totalSizeStock = result.reduce((total, product) => {
        const sizeObj = product.sizes.find(size => size.name === filters.size);
        return total + (sizeObj ? sizeObj.stock : 0);
      }, 0);
      setSizeStock(totalSizeStock);
    } else {
      setSizeStock(0); // Reset size stock if no size filter is selected
    }

    // Filter by Color
    if (filters.color) {
      result = result.filter(product =>
        product.colors.some(color => color.name.toLowerCase() === filters.color.toLowerCase())
      );
    }

    // Filter by Price Range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(product =>
        product.price.current >= min && product.price.current <= (max || Infinity)
      );
    }

    // Filter by Brand
    if (filters.brand) {
      result = result.filter(product => product.brand === filters.brand);
    }

    setFilteredProducts(result);
  }, [products, filters]);

  // Handle Filter Changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Fashion E-commerce</h1>
      
      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <select 
          className="p-2 border rounded"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {productsData.filters.categories.map(category => (
            <option key={category.name} value={category.name}>{category.name}</option>
          ))}
        </select>

        {/* Subcategory Filter */}
        {filters.category && (
          <select 
            className="p-2 border rounded"
            value={filters.subCategory}
            onChange={(e) => handleFilterChange('subCategory', e.target.value)}
          >
            <option value="">All Subcategories</option>
            {productsData.filters.categories
              .find(cat => cat.name === filters.category)?.subcategories
              .map(subCat => (
                <option key={subCat} value={subCat}>{subCat}</option>
              ))
            }
          </select>
        )}

        {/* Size Filter */}
        <select 
          className="p-2 border rounded"
          value={filters.size}
          onChange={(e) => handleFilterChange('size', e.target.value)}
        >
          <option value="">All Sizes</option>
          {productsData.filters.sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        {/* Color Filter */}
        <select 
          className="p-2 border rounded"
          value={filters.color}
          onChange={(e) => handleFilterChange('color', e.target.value)}
        >
          <option value="">All Colors</option>
          {productsData.filters.colors.map(color => (
            <option key={color.name} value={color.name}>{color.name}</option>
          ))}
        </select>

        {/* Price Range Filter */}
        <select 
          className="p-2 border rounded"
          value={filters.priceRange}
          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
        >
          <option value="">All Prices</option>
          {productsData.filters.priceRanges.map((range, index) => (
            <option key={index} value={`${range.min}-${range.max || ''}`}>
              ${range.min} - {range.max ? `$${range.max}` : 'Above'}
            </option>
          ))}
        </select>

        {/* Brand Filter */}
        <select 
          className="p-2 border rounded"
          value={filters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
        >
          <option value="">All Brands</option>
          {productsData.filters.brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Stock Information for Selected Size */}
      {filters.size && (
        <div className="mb-8">
          <p className="text-lg font-semibold">
            Total stock for size {filters.size}: {sizeStock}
          </p>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            <Image
              src={image}
              alt={product.name}
              className="w-full h-64 object-cover"
              height={100}
              width={100}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.brand}</p>
              <p className="text-lg font-bold">${product.price.current.toFixed(2)}</p>
              {product.price.original > product.price.current && (
                <p className="text-sm text-gray-500 line-through">
                  ${product.price.original.toFixed(2)}
                </p>
              )}
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.ratings.average) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">({product.ratings.count})</span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Available sizes:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.sizes.map(size => (
                    <button
                      key={size.name}
                      onClick={() => handleSizeClick(size)}
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        size.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wishlist Button */}
              <div className="mt-4">
                <button
                  onClick={() => addToWishlist(product)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  {wishlist.some(item => item.id === product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              {/* Show selected size stock */}
              {selectedSize && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Selected size: {selectedSize}</p>
                  <p className="text-lg font-bold">Stock: {sizeStock}</p>
                </div>
              )}

              <div className="mt-4">
                <p className="text-sm text-gray-600">Colors:</p>
                <div className="flex gap-2 mt-1">
                  {product.colors.map(color => (
                    <div 
                      key={color.name}
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Materials:</p>
                <p className="text-sm">{product.materials.join(', ')}</p>
              </div>
              <div className="mt-4">
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;