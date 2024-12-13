export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  image?: string;
  name?: string;
  code: string;
  size: string;
  manufacturer: string;
  stock: number;
  badStock: number;
  bookings: number;
  availableStock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: Date;
}