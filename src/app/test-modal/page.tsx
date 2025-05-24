'use client';

import { useState } from 'react';
import EmailConfirmationModal from '@/components/EmailConfirmationModal';

export default function TestModalPage() {
  const [showModal, setShowModal] = useState(false);
  const testEmail = 'user@example.com';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Test Email Confirmation Modal</h1>
        <p className="text-gray-600 mb-6">
          Click the button below to see the email confirmation modal that appears after registration.
        </p>
        
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Show Email Confirmation Modal
        </button>
        
        <div className="mt-6 text-sm text-gray-500">
          <p>Modal features:</p>
          <ul className="list-disc list-inside text-left mt-2">
            <li>Success confirmation message</li>
            <li>Email address display</li>
            <li>Button to open mail app</li>
            <li>Close with X, outside click, or Escape key</li>
          </ul>
        </div>
      </div>
      
      <EmailConfirmationModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        userEmail={testEmail}
      />
    </div>
  );
} 