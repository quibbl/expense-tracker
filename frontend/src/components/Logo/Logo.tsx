import type { ComponentPropsWithoutRef } from 'react';
import { LogoIcon } from '@/assets';
import styles from './Logo.module.css';

type LogoProps = Omit<ComponentPropsWithoutRef<typeof LogoIcon>, 'width' | 'height' | 'title'> & {
  title?: string;
};

const Logo = ({ title = 'Expense Tracker', className, ...props }: LogoProps) => {
  const mergedClassName = className ? `${styles.root} ${className}` : styles.root;

  return (
    <LogoIcon
      className={mergedClassName}
      title={title}
      role="img"
      aria-label={title}
      focusable="false"
      {...props}
    />
  );
};

export default Logo;
