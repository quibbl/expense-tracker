import type { ComponentPropsWithoutRef } from 'react';
import { LogoIcon } from '@/assets';
import styles from './Logo.module.css';
import Icon from '../Icon';

type LogoProps = Omit<
  ComponentPropsWithoutRef<typeof LogoIcon>,
  'width' | 'height' | 'title'
> & {
  title?: string;
};

const Logo = ({ title = '', className }: LogoProps) => {
  const mergedClassName = className
    ? `${styles.logo} ${className}`
    : styles.logo;

  return (
    <Icon
      iconName="logo"
      ariaLabel={title}
      className={mergedClassName}
      role="img"
    />
  );
};

export default Logo;
