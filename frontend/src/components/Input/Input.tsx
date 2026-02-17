import type { ComponentPropsWithoutRef } from 'react';

import styles from './Input.module.css';

export type InputProps = ComponentPropsWithoutRef<'input'>;

const Input = ({ className, ...props }: InputProps) => {
  const mergedClassName = className
    ? `${styles.input} ${className}`
    : styles.input;

  return <input className={mergedClassName} {...props} />;
};

export default Input;
