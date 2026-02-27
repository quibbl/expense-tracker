import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { createAuthUser, createRefreshToken, findAuthUserByEmail } from './auth.repository';
import { AuthTokensDto, AuthUserDataDto } from './dto/auth.dto';
import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
} from '../config';

const parseTtlToMs = (ttl: string): number => {
  const parsed = ttl.trim().match(/^(\d+)([smhd])$/i);

  if (!parsed) {
    throw new Error(`Unsupported TTL format: ${ttl}`);
  }

  const amount = Number(parsed[1]);
  const unit = parsed[2].toLowerCase();
  const multipliers: Record<string, number> = {
    s: 1_000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
  };

  return amount * multipliers[unit];
};

const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');

  return `${salt}:${derivedKey}`;
};

const verifyPassword = (password: string, storedHash: string): boolean => {
  const [salt, originalHash] = storedHash.split(':');

  if (!salt || !originalHash) {
    return false;
  }

  const calculatedHash = crypto.scryptSync(password, salt, 64).toString('hex');
  const originalBuffer = Buffer.from(originalHash, 'hex');
  const calculatedBuffer = Buffer.from(calculatedHash, 'hex');

  if (originalBuffer.length !== calculatedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(originalBuffer, calculatedBuffer);
};

const hashRefreshToken = (refreshToken: string): string => {
  return crypto.createHash('sha256').update(refreshToken).digest('hex');
};

const createTokens = async (user: { id: number; email: string; name: string }): Promise<AuthTokensDto> => {
  const accessToken = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
      type: 'access',
    },
    JWT_ACCESS_SECRET,
    { expiresIn: JWT_ACCESS_EXPIRES_IN },
  );

  const refreshToken = jwt.sign(
    {
      sub: user.id,
      type: 'refresh',
      tokenId: crypto.randomUUID(),
    },
    JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN },
  );

  const refreshExpireAt = new Date(Date.now() + parseTtlToMs(JWT_REFRESH_EXPIRES_IN));

  await createRefreshToken({
    hashedToken: hashRefreshToken(refreshToken),
    userId: user.id,
    expireAt: refreshExpireAt,
  });

  return {
    accessToken,
    accessTokenExpiresIn: JWT_ACCESS_EXPIRES_IN,
    refreshToken,
    refreshTokenExpiresIn: JWT_REFRESH_EXPIRES_IN,
  };
};

export const signUp = async (data: AuthUserDataDto) => {
  const existingUser = await findAuthUserByEmail(data.email);

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const createdUser = await createAuthUser({
    ...data,
    email: data.email.trim().toLowerCase(),
    name: data.name.trim(),
    password: hashPassword(data.password),
  });
  const tokens = await createTokens(createdUser);

  console.info('[auth] successful sign-up', { userId: createdUser.id, email: createdUser.email });

  return {
    id: createdUser.id,
    email: createdUser.email,
    name: createdUser.name,
    tokens,
  };
};

export const signIn = async (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await findAuthUserByEmail(normalizedEmail);

  if (!user || !verifyPassword(password, user.password)) {
    console.warn('[auth] failed login attempt', { email: normalizedEmail });
    throw new Error('Invalid credentials');
  }
  const tokens = await createTokens(user);

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    tokens,
  };
};
