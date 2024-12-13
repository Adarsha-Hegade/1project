import express from 'express';
import { config } from 'dotenv';
import { createAdmin, loginUser } from '../src/lib/auth';

config();

const app = express();
app.use(express.json());

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/admin/create', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await createAdmin(username, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create admin account' });
  }
});

app.get('/api/admin/exists', async (req, res) => {
  try {
    const result = await sql`
      SELECT EXISTS(
        SELECT 1 FROM users WHERE role = 'admin'
      ) as exists
    `;
    res.json({ exists: result.rows[0].exists });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check admin existence' });
  }
});

export default app;