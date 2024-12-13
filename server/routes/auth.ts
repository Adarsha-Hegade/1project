import { Router } from 'express';
import { createAdmin, loginUser } from '../services/auth';
import { asyncHandler } from '../middleware/async';
import { sql } from '@vercel/postgres';

const router = Router();

router.post('/login', asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const result = await loginUser(username, password);
  res.json(result);
}));

router.post('/admin/create', asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const result = await createAdmin(username, password);
  res.json(result);
}));

router.get('/admin/exists', asyncHandler(async (req, res) => {
  const result = await sql`
    SELECT EXISTS(
      SELECT 1 FROM users WHERE role = 'admin'
    ) as exists
  `;
  res.json({ exists: result.rows[0].exists });
}));

export { router as authRouter };