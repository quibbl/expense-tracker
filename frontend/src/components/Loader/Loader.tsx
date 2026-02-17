import type { ComponentPropsWithoutRef } from 'react';
import { LoaderIcon } from '@/assets';

import styles from './Loader.module.css';

type LoaderProps = Omit<
  ComponentPropsWithoutRef<typeof LoaderIcon>,
  'width' | 'height' | 'title'
> & {
  title?: string;
};
const Loader = ({ title = '', className, ...props }: LoaderProps) => {
  const mergedClassName = className
    ? `${styles.loader} ${className}`
    : styles.loader;

  return (
    <LoaderIcon
      className={mergedClassName}
      title={title}
      role="img"
      aria-label={title}
      focusable="false"
      {...props}
    />
  );
};

export default Loader;
