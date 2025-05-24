'use client';

import { useEffect } from 'react';

interface EmailConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export default function EmailConfirmationModal({ isOpen, onClose, userEmail }: EmailConfirmationModalProps) {
  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const openMailApp = () => {
    // For better cross-platform support, use mailto with fallback
    try {
      // Create a mailto link that will open the default mail app
      const mailtoLink = `mailto:${userEmail}?subject=Email Confirmation Required`;
      
      // Try to open the mailto link
      const newWindow = window.open(mailtoLink, '_self');
      
      // Fallback: if the above doesn't work, try direct assignment
      if (!newWindow) {
        window.location.href = mailtoLink;
      }
         } catch (error) {
       // Ultimate fallback: copy email to clipboard and show instructions
       console.error('Failed to open mail app:', error);
       navigator.clipboard.writeText(userEmail).then(() => {
         alert(`Nu s-a putut deschide aplicația de email. Email-ul ${userEmail} a fost copiat în clipboard.`);
       }).catch(() => {
         alert(`Nu s-a putut deschide aplicația de email. Vă rugăm să deschideți manual aplicația de email și să verificați ${userEmail}`);
       });
     }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg 
              className="h-6 w-6 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Cont creat cu succes!
          </h3>
          
          {/* Email Icon and Message */}
          <div className="mb-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-3">
              <svg 
                className="h-8 w-8 text-blue-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </div>
            
            <p className="text-gray-600 mb-2">
              Pentru a vă activa contul, vă rugăm să confirmați adresa de email.
            </p>
            
            <p className="text-sm text-gray-500 mb-4">
              Am trimis un email de confirmare la: <br />
              <span className="font-medium text-gray-700">{userEmail}</span>
            </p>
            
            <p className="text-sm text-gray-500">
              Verificați și folderul de spam dacă nu găsiți emailul.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={openMailApp}
              className="w-full bg-primary text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <svg 
                className="h-4 w-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
              Deschide aplicația de email
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Închide
            </button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-4 text-xs text-gray-400">
            <p>
              Dacă nu primiți emailul în următoarele minute, 
              încercați să vă înregistrați din nou.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 