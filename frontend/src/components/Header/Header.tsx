import Logo from '@/components/Logo/Logo';

import styles from './Header.module.css';

const Header = () => {
  return <div className={styles.header}>
    <Logo />
  </div>;
};

export default Header;
