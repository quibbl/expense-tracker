import type { ComponentPropsWithoutRef } from 'react';

import Icon from '@/components/Icon';
import Input, { type InputProps } from '@/components/Input';
import InputLabel, { type InputLabelProps } from '@/components/InputLabel';
import type { IconName } from '@/assets/icons';

import styles from './LoginForm.module.css';

export type LoginFormField = Omit<InputProps, 'id' | 'name' | 'className'> & {
  name: string;
  label?: string;
  id?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelProps?: Omit<InputLabelProps, 'children' | 'htmlFor'>;
};

export type LoginFormProps = Omit<ComponentPropsWithoutRef<'form'>, 'title'> & {
  title: string;
  fields: LoginFormField[];
  submitLabel: string;
  iconName?: IconName;
  iconAriaLabel?: string;
  submitButtonProps?: Omit<
    ComponentPropsWithoutRef<'button'>,
    'children' | 'type'
  >;
};

const LoginForm = ({
  title,
  fields,
  submitLabel,
  iconName,
  iconAriaLabel,
  className,
  submitButtonProps,
  ...formProps
}: LoginFormProps) => {
  const formClassName = className
    ? `${styles.formContainer} ${className}`
    : styles.formContainer;

  return (
    <form className={formClassName} {...formProps}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <span className={styles.subtitle}>Hello there, sign in to continue</span>
        </div>
        <div className={styles.iconSection}>
          {iconName ? (
            <Icon
              iconName={iconName}
              ariaLabel={iconAriaLabel ?? `${title} icon`}
              className={styles.icon}
            />
          ) : null}
        </div>
      </div>

      <div className={styles.fields}>
        {fields.map((field) => {
          const {
            id,
            name,
            label,
            containerClassName,
            inputClassName,
            labelProps,
            ...inputProps
          } = field;
          const fieldId = id ?? name;
          const fieldClassName = containerClassName
            ? `${styles.field} ${containerClassName}`
            : styles.field;
          const mergedInputClassName = inputClassName
            ? `${styles.input} ${inputClassName}`
            : styles.input;

          return (
            <div key={fieldId} className={fieldClassName}>
              <InputLabel htmlFor={fieldId} {...labelProps}>
                {label}
              </InputLabel>
              <Input
                id={fieldId}
                name={name}
                className={mergedInputClassName}
                {...inputProps}
              />
            </div>
          );
        })}
      </div>

      <button
        className={styles.submitButton}
        type="submit"
        {...submitButtonProps}
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default LoginForm;
