import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sql } from '@vercel/postgres';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: number, username: string, role: string): string {
  return jwt.sign(
    { userId, username, role },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );
}

export async function createAdmin(username: string, password: string) {
  const hashedPassword = await hashPassword(password);
  
  try {
    const result = await sql`
      INSERT INTO users (username, password, role)
      VALUES (${username}, ${hashedPassword}, 'admin')
      RETURNING id, username, role
    `;
    
    const user = result.rows[0];
    return {
      user,
      token: generateToken(user.id, user.username, user.role)
    };
  } catch (error) {
    console.error('Failed to create admin:', error);
    throw new Error('Failed to create admin account');
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const result = await sql`
      SELECT id, username, password, role
      FROM users
      WHERE username = ${username}
    `;

    const user = result.rows[0];
    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      },
      token: generateToken(user.id, user.username, user.role)
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Invalid credentials');
  }
}