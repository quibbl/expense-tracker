import LogoIcon from './logo.svg?react';
import LoaderIcon from './loader.svg?react';
import PrimaryButtonIcon from './primary-button.svg?react';

export const iconComponents = {
  logo: LogoIcon,
  loader: LoaderIcon,
  button: PrimaryButtonIcon,
} as const;

export type IconName = keyof typeof iconComponents;
export { LogoIcon, LoaderIcon, PrimaryButtonIcon };
