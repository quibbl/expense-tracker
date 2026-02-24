import type { ReactNode } from 'react';
import styles from './AuthLayout.module.css';
import Icon from '@/components/Icon';

type AuthLayoutProps = {
  children: ReactNode;
  brandingContent?: ReactNode;
  className?: string;
  brandingClassName?: string;
  contentClassName?: string;
};

const AuthLayout = ({
  children,
  brandingContent,
  className,
  brandingClassName,
  contentClassName,
}: AuthLayoutProps) => {
  const layoutClassName = className
    ? `${styles.layout} ${className}`
    : styles.layout;
  const mergedBrandingClassName = brandingClassName
    ? `${styles.logoSection} ${brandingClassName}`
    : styles.logoSection;
  const mergedContentClassName = contentClassName
    ? `${styles.formSection} ${contentClassName}`
    : styles.formSection;
  const defaultBranding = (
    <>
      <div>
        <Icon iconName="loginLogo" />
      </div>
      <div>
        <Icon iconName="loginPicture" />
      </div>
    </>
  );

  return (
    <div className={layoutClassName}>
      <div className={mergedBrandingClassName}>
        {brandingContent ?? defaultBranding}
      </div>
      <div className={mergedContentClassName}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
