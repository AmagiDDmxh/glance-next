import { Hono } from 'hono';
import { authenticateUser, generateToken } from '../services/auth';

const router = new Hono();

// Login endpoint
router.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json();
    
    const user = await authenticateUser(username, password);
    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    const token = generateToken(user);
    return c.json({ token, user: { username: user.username } });
  } catch (error) {
    return c.json({ error: 'Authentication failed' }, 500);
  }
});

// Logout endpoint
router.post('/logout', async (c) => {
  // TODO: Implement token invalidation
  return c.json({ message: 'Logged out successfully' });
});

// Verify token endpoint
router.get('/verify', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'No token provided' }, 401);
    }
    
    const token = authHeader.substring(7);
    // TODO: Implement token verification
    return c.json({ valid: true });
  } catch (error) {
    return c.json({ error: 'Token verification failed' }, 401);
  }
});

export { router as authRouter }; 