import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import styles from './InputLabel.module.css';

export type InputLabelProps = ComponentPropsWithoutRef<'label'> & {
  children: ReactNode;
};

const InputLabel = ({ children, htmlFor, ...props }: InputLabelProps) => {
  return (
    <label htmlFor={htmlFor} className={styles.label} {...props}>
      {children}
    </label>
  );
};

export default InputLabel;
