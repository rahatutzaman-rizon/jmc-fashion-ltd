"use client"

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Heart, User, Search, Menu } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">JMC Fashion</span>
            
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <input
              type="text"
              placeholder="I'm shopping for ..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-300">
              <Search size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/wishlist" className="text-gray-600 hover:text-blue-600">
              <Heart size={24} />
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-blue-600">
              <ShoppingCart size={24} />
            </Link>
            <Link href="/account" className="text-gray-600 hover:text-blue-600">
              <User size={24} />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <input
              type="text"
              placeholder="I'm shopping for ..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <nav className="flex flex-col space-y-2">
              <Link href="/marketplace" className="text-gray-600 hover:text-blue-600">MARKETPLACE</Link>
              <Link href="/best-deals" className="text-gray-600 hover:text-blue-600">Best Deals</Link>
              <Link href="/mens" className="text-gray-600 hover:text-blue-600">Mens</Link>
              <Link href="/womens" className="text-gray-600 hover:text-blue-600">Womens</Link>
              <Link href="/kids" className="text-gray-600 hover:text-blue-600">Kids</Link>
              <Link href="/gift-cards" className="text-gray-600 hover:text-blue-600">Gift Cards</Link>
              <Link href="/dheu" className="text-gray-600 hover:text-blue-600">DHEU</Link>
            </nav>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-between mt-4">
          <Link href="/marketplace" className="text-gray-600 hover:text-blue-600">MARKETPLACE</Link>
          <Link href="/best-deals" className="text-gray-600 hover:text-blue-600">Best Deals</Link>
          <Link href="/mens" className="text-gray-600 hover:text-blue-600">Mens</Link>
          <Link href="/womens" className="text-gray-600 hover:text-blue-600">Womens</Link>
          <Link href="/kids" className="text-gray-600 hover:text-blue-600">Kids</Link>
          <Link href="/gift-cards" className="text-gray-600 hover:text-blue-600">Gift Cards</Link>
          <Link href="/dheu" className="text-gray-600 hover:text-blue-600">DHEU</Link>
        </nav>
      </div>
    </header>
  )
}