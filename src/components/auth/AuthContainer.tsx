import React, { useEffect } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { useAuthStore } from '../../store/authStore';

export function AuthContainer() {
  const { adminExists, isInitialized, checkAdminExists } = useAuthStore();

  useEffect(() => {
    checkAdminExists();
  }, [checkAdminExists]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-700 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return adminExists ? <LoginForm /> : <SignupForm />;
}