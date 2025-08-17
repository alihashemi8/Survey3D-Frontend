import React from 'react';
import AuthForm from './AuthForm';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  console.log("AuthModal loaded!"); // 👈 اینو اضافه کن


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md relative">
        <button
          className="absolute top-2 right-3 text-gray-500 dark:text-gray-300"
          onClick={onClose}
        >

        </button>
        <AuthForm onClose={onClose} onLogin={onLogin} />
      </div>
    </div>
  );
}
