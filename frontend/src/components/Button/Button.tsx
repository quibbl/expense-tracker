import { PrimaryButtonIcon } from '@/assets';
import styles from './Button.module.css';

const Button = () => {
  return (
    <button
      type="button"
      name='primary-button'
      className={styles.primary}
    >
      <PrimaryButtonIcon />
    </button>
  );
};

export default Button;
