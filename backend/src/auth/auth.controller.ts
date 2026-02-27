import { Request, Response, Router } from 'express';
import { signIn, signUp } from './auth.service';
import { validateSignInInput, validateSignUpInput } from '../helpers/middlewares/validator';
import { AuthSignInDto, AuthSignUpDto } from './dto/auth.dto';

const router = Router();

router.post('/sign-up', async (req: Request, res: Response) => {
  try {
    const validationResult = validateSignUpInput(req.body);

    if (!validationResult.valid) {
      res.status(400).json({
        message: 'Validation failed',
        errors: validationResult.errors,
      });
      return;
    }

    const user = await signUp(req.body as AuthSignUpDto);

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
    const validationResult = validateSignInInput(req.body);

    if (!validationResult.valid) {
      res.status(400).json({
        message: 'Validation failed',
        errors: validationResult.errors,
      });
      return;
    }

    const payload = req.body as AuthSignInDto;
    const user = await signIn(payload.email, payload.password);

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
