'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmailConfirmationModal from '@/components/EmailConfirmationModal';
import { createClient } from '@/lib/supabase/client';
import { UserType } from '@/types/auth';

export default function RegisterPage() {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    terms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCloseModal = () => {
    setShowEmailModal(false);
    // Optionally redirect to login page or stay on current page
    router.push('/login');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Parolele nu coincid');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Attempting signup with data:', {
        email: formData.email,
        metadata: {
          full_name: formData.name,
          user_type: userType,
          phone: formData.phone,
        }
      });

      // Sign up the user with metadata
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            user_type: userType,
            phone: formData.phone,
          }
        }
      });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        setError(signUpError.message);
        return;
      }

      if (data.user) {
        console.log('User created successfully:', data.user);
        
        // Create profile manually as fallback (in case trigger fails)
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: formData.email,
              full_name: formData.name,
              user_type: userType,
              phone: formData.phone,
            });

          if (profileError) {
            console.error('Profile creation error:', profileError);
            // Don't throw error, just log it since trigger might have worked
          } else {
            console.log('Profile created successfully');
          }
        } catch (profileErr) {
          console.error('Profile creation exception:', profileErr);
        }

        // Store the email and show confirmation modal
        setRegisteredEmail(formData.email);
        setShowEmailModal(true);
        
        // Profile will be created automatically by the database trigger
        // Note: For production, user needs to confirm email before accessing dashboard
      }
    } catch {
      setError('A apărut o eroare. Vă rugăm să încercați din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10 min-h-[calc(100vh-200px)]">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Înregistrare</h1>
          
          {!userType ? (
            <div className="space-y-6">
              <p className="text-center text-gray-700 mb-6">Vă rugăm să selectați tipul de cont:</p>
              
              <button 
                onClick={() => setUserType('pet_owner')}
                className="block w-full bg-white border-2 border-primary text-primary hover:bg-blue-50 font-medium py-3 px-4 rounded-lg mb-4 transition-colors"
              >
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Înregistrare ca proprietar de animale</span>
                </div>
              </button>
              
              <button 
                onClick={() => setUserType('hotel_owner')}
                className="block w-full bg-white border-2 border-secondary text-secondary hover:bg-green-50 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Înregistrare ca proprietar de hotel</span>
                </div>
              </button>
              
              <div className="text-center mt-6">
                <p className="text-gray-600">Aveți deja un cont?</p>
                <Link href="/login" className="text-primary hover:underline mt-1 inline-block">
                  Autentificați-vă
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => setUserType(null)} 
                  className="text-gray-600 hover:text-gray-900 mr-2"
                  disabled={loading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-semibold">
                  {userType === 'pet_owner' ? 'Înregistrare proprietar de animale' : 'Înregistrare proprietar de hotel'}
                </h2>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">
                    {userType === 'pet_owner' ? 'Nume complet' : 'Numele afacerii'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-1">Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-gray-700 mb-1">Parolă</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    minLength={8}
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">Minim 8 caractere</p>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">Confirmă parola</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="h-4 w-4 mt-1 text-primary focus:ring-primary border-gray-300 rounded"
                    required
                    disabled={loading}
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    Am citit și sunt de acord cu <a href="#" className="text-primary hover:underline">termenii și condițiile</a> și <a href="#" className="text-primary hover:underline">politica de confidențialitate</a>.
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 ${
                    userType === 'pet_owner' ? 'bg-primary hover:bg-blue-600' : 'bg-secondary hover:bg-green-600'
                  }`}
                >
                  {loading ? 'Se înregistrează...' : 'Înregistrare'}
                </button>
                
                <div className="text-center mt-4">
                  <p className="text-gray-600">Aveți deja un cont?</p>
                  <Link href="/login" className="text-primary hover:underline mt-1 inline-block">
                    Autentificați-vă
                  </Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      {/* Email Confirmation Modal */}
      <EmailConfirmationModal 
        isOpen={showEmailModal}
        onClose={handleCloseModal}
        userEmail={registeredEmail}
      />
    </>
  );
} 