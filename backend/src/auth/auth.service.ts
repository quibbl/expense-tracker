import { createAuthUser, findAuthUserByEmail } from './auth.repository';
import { AuthUserDataDto } from './dto/auth.dto';

export const signUp = async (data: AuthUserDataDto) => {
  const existingUser = await findAuthUserByEmail(data.email);

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const createdUser = await createAuthUser(data);

  return {
    id: createdUser.id,
    email: createdUser.email,
    name: createdUser.name,
  };
};

export const signIn = async (email: string, password: string) => {
  const user = await findAuthUserByEmail(email);

  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};
