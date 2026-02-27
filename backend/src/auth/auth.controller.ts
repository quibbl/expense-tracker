import { Request, Response, Router } from 'express';
import { signIn, signUp } from './auth.service';

const router = Router();

router.post('/sign-up', async (req: Request, res: Response) => {
  try {
    if (!req.body?.email || !req.body?.name || !req.body?.password) {
      res.status(400).json({ message: 'email, name and password are required' });
      return;
    }

    const user = await signUp(req.body);

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
      res.status(409).json({ message: error.message });
      return;
    }

    console.error('Failed to sign up:', error);
    res.status(500).json({ message: 'Failed to sign up' });
  }
});

router.post('/sign-in', async (req: Request, res: Response) => {
  try {
    if (!req.body?.email || !req.body?.password) {
      res.status(400).json({ message: 'email and password are required' });
      return;
    }

    const user = await signIn(req.body.email, req.body.password);

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid credentials') {
      res.status(401).json({ message: error.message });
      return;
    }

    console.error('Failed to sign in:', error);
    res.status(500).json({ message: 'Failed to sign in' });
  }
});

export default router;
