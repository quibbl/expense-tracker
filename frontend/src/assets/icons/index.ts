import LogoIcon from './logo.svg?react';
import LoaderIcon from './loader.svg?react';
import PrimaryButtonIcon from './primary-button.svg?react';
import LoginLogoIcon from './login-logo.svg?react';
import LoginPictureIcon from './login-picture.svg?react';
import SignInIcon from './sign-in.svg?react';

export const iconComponents = {
  logo: LogoIcon,
  loader: LoaderIcon,
  button: PrimaryButtonIcon,
  loginLogo: LoginLogoIcon,
  loginPicture: LoginPictureIcon,
  signIn: SignInIcon,
} as const;

export type IconName = keyof typeof iconComponents;
export {
  LogoIcon,
  LoaderIcon,
  PrimaryButtonIcon,
  LoginLogoIcon,
  LoginPictureIcon,
  SignInIcon
};
