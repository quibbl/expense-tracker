import { Request, Response, Router } from 'express';
import { getCurrentUserProfile } from './user.service';

const router = Router();

router.get('/me', async (req: Request, res: Response) => {
  try {
    const userId = req.authUser?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await getCurrentUserProfile(userId);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error && error.message === 'User not found') {
      res.status(404).json({ message: error.message });
      return;
    }

    console.error('Failed to fetch current user:', error);
    res.status(500).json({ message: 'Failed to fetch current user' });
  }
});

export default router;
