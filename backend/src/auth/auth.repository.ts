import { AuthUserDataDto } from './dto/auth.dto';
import { prisma } from '../db/prisma.service';

export const createAuthUser = (data: AuthUserDataDto) => {
  return prisma.user.create({
    data,
  });
};

export const findAuthUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createRefreshToken = (data: {
  hashedToken: string;
  userId: number;
  expireAt: Date;
}) => {
  return prisma.refreshToken.create({
    data,
  });
};

export const findValidRefreshTokenByHash = (hashedToken: string) => {
  return prisma.refreshToken.findFirst({
    where: {
      hashedToken,
      revoked: false,
      expireAt: {
        gt: new Date(),
      },
    },
    include: {
      user: true,
    },
  });
};

export const revokeRefreshTokenById = (id: number) => {
  return prisma.refreshToken.update({
    where: { id },
    data: {
      revoked: true,
    },
  });
};
