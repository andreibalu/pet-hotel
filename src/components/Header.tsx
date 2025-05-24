'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">PetHotel</span>
            <span className="text-sm ml-2 text-gray-600">Timișoara</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Acasă
            </Link>
            <Link href="/hoteluri" className="text-gray-700 hover:text-primary transition-colors">
              Hoteluri
            </Link>
            <Link href="/despre" className="text-gray-700 hover:text-primary transition-colors">
              Despre noi
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/login" className="text-white bg-primary hover:bg-blue-600 px-4 py-2 rounded-md transition-colors">
              Autentificare
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <ul className="flex flex-col space-y-3">
              <li>
                <Link href="/" className="block text-gray-700 hover:text-primary">
                  Acasă
                </Link>
              </li>
              <li>
                <Link href="/hoteluri" className="block text-gray-700 hover:text-primary">
                  Hoteluri
                </Link>
              </li>
              <li>
                <Link href="/despre" className="block text-gray-700 hover:text-primary">
                  Despre noi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block text-gray-700 hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="block text-white bg-primary hover:bg-blue-600 px-4 py-2 rounded-md w-full text-center">
                  Autentificare
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
} 