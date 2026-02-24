import type { ComponentPropsWithoutRef, ReactNode } from 'react';

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
  errorMessage?: string;
  labelProps?: Omit<InputLabelProps, 'children' | 'htmlFor'>;
  renderInput?: (params: {
    id: string;
    name: string;
    className: string;
  }) => ReactNode;
};

type LoginFormStatusMessage = {
  type: 'error' | 'success';
  text: string;
};

export type LoginFormProps = Omit<ComponentPropsWithoutRef<'form'>, 'title'> & {
  title: string;
  subtitle: string;
  fields: LoginFormField[];
  submitLabel: string;
  statusMessage?: LoginFormStatusMessage;
  iconName?: IconName;
  iconAriaLabel?: string;
  submitButtonProps?: Omit<
    ComponentPropsWithoutRef<'button'>,
    'children' | 'type'
  >;
};

const LoginForm = ({
  title,
  subtitle,
  fields,
  submitLabel,
  statusMessage,
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
          <span className={styles.subtitle}>{subtitle}</span>
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
            errorMessage,
            labelProps,
            renderInput,
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
              {renderInput ? (
                renderInput({
                  id: fieldId,
                  name,
                  className: mergedInputClassName,
                })
              ) : (
                <Input
                  id={fieldId}
                  name={name}
                  className={mergedInputClassName}
                  {...inputProps}
                />
              )}
              {errorMessage ? (
                <p className={styles.fieldError}>{errorMessage}</p>
              ) : null}
            </div>
          );
        })}
      </div>

      {statusMessage ? (
        <p
          className={
            statusMessage.type === 'error'
              ? `${styles.statusMessage} ${styles.statusError}`
              : `${styles.statusMessage} ${styles.statusSuccess}`
          }
        >
          {statusMessage.text}
        </p>
      ) : null}

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
