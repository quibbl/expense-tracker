import type { ComponentPropsWithoutRef } from 'react';

import { iconComponents, type IconName } from '@/assets/icons';

import styles from './Icon.module.css';

type NativeSvgProps = Omit<
  ComponentPropsWithoutRef<'svg'>,
  'children' | 'color'
>;

export type IconProps = NativeSvgProps & {
  iconName: IconName;
  size?: number | string;
  color?: string;
  ariaLabel?: string;
  title?: string;
};

const Icon = ({
  iconName,
  ariaLabel,
  title,
  className,
  style,
  ...props
}: IconProps) => {
  const { ['aria-label']: nativeAriaLabel, ...svgProps } = props;
  const SvgIcon = iconComponents[iconName];
  const mergedClassName = className
    ? `${styles.icon} ${className}`
    : styles.icon;
  const computedAriaLabel = ariaLabel ?? nativeAriaLabel ?? title;
  const isDecorative = !computedAriaLabel;

  return (
    <SvgIcon
      className={mergedClassName}
      title={title}
      style={style}
      role={isDecorative ? undefined : 'img'}
      aria-label={computedAriaLabel}
      aria-hidden={isDecorative}
      focusable="false"
      {...svgProps}
    />
  );
};

export default Icon;
