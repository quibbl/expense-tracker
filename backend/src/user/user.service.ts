import { findUserById } from './user.repository';

export const getCurrentUserProfile = async (userId: number) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
