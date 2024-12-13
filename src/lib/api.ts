import type { LoginFormData, SignupFormData } from '../types/auth';

const API_URL = '/api';

export async function loginApi(data: LoginFormData) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  return response.json();
}

export async function createAdminApi(data: SignupFormData) {
  const response = await fetch(`${API_URL}/admin/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create admin account');
  }

  return response.json();
}

export async function checkAdminExistsApi() {
  const response = await fetch(`${API_URL}/admin/exists`);
  
  if (!response.ok) {
    throw new Error('Failed to check admin existence');
  }

  return response.json();
}