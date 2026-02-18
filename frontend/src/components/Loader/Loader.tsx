import type { ComponentPropsWithoutRef } from 'react';
import { LoaderIcon } from '@/assets';

import styles from './Loader.module.css';
import Icon from '../Icon';

type LoaderProps = Omit<
  ComponentPropsWithoutRef<typeof LoaderIcon>,
  'width' | 'height' | 'title'
> & {
  title?: string;
};
const Loader = ({ title = '', className }: LoaderProps) => {
  const mergedClassName = className
    ? `${styles.loader} ${className}`
    : styles.loader;

  return (
    <Icon iconName="loader" className={mergedClassName} ariaLabel={title} />
  );
};

export default Loader;
