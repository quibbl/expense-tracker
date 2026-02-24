import styles from './Button.module.css';

export type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      type="submit"
      name='primary'
      className={styles.primary}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;

