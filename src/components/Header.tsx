'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, loading, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

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
            
            {loading ? (
              <div className="text-gray-500">Se încarcă...</div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  {profile?.user_type === 'pet_owner' ? 'Profil' : 'Dashboard'}
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {profile?.full_name || user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-red-600 hover:text-red-700 text-sm transition-colors"
                  >
                    Delogare
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Autentificare
                </Link>
                <Link 
                  href="/register" 
                  className="text-white !bg-primary hover:bg-blue-600 px-4 py-2 rounded-md transition-colors"
                  style={{ backgroundColor: '#3498db' }}
                >
                  Înregistrare
                </Link>
              </div>
            )}
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
              
              {loading ? (
                <li className="text-gray-500 px-4">Se încarcă...</li>
              ) : user ? (
                <>
                  <li>
                    <Link 
                      href="/dashboard" 
                      className="block text-gray-700 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {profile?.user_type === 'pet_owner' ? 'Profil' : 'Dashboard'}
                    </Link>
                  </li>
                  <li className="px-4 py-2 text-sm text-gray-600">
                    {profile?.full_name || user.email}
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left text-red-600 hover:text-red-700"
                    >
                      Delogare
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      href="/login" 
                      className="block text-gray-700 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Autentificare
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/register" 
                      className="block text-white !bg-primary hover:bg-blue-600 px-4 py-2 rounded-md w-full text-center"
                      style={{ backgroundColor: '#3498db' }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Înregistrare
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
} 