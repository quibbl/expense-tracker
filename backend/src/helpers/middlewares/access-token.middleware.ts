import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '../../config';

interface AccessTokenPayload {
  sub: number;
  email: string;
  name: string;
  type: 'access';
}

const logUnauthorizedAttempt = (req: Request, reason: string): void => {
  console.warn('[auth] unauthorized access attempt', {
    reason,
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
  });
};

export const requireAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    logUnauthorizedAttempt(req, 'missing_authorization_header');
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    logUnauthorizedAttempt(req, 'invalid_authorization_header_format');
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_ACCESS_SECRET) as AccessTokenPayload;

    if (payload.type !== 'access' || typeof payload.sub !== 'number') {
      logUnauthorizedAttempt(req, 'invalid_access_token_payload');
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    req.authUser = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };

    next();
  } catch (error) {
    const reason =
      error instanceof jwt.TokenExpiredError
        ? 'expired_access_token'
        : 'invalid_access_token';

    logUnauthorizedAttempt(req, reason);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
