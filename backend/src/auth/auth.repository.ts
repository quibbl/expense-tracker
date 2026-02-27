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
