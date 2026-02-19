import { Link } from 'react-router-dom';

import styles from './AuthPagePlaceholder.module.css';

type PageLink = {
  to: string;
  label: string;
};

type AuthPagePlaceholderProps = {
  title: string;
  description: string;
  links: PageLink[];
};

const AuthPagePlaceholder = ({ title, description, links }: AuthPagePlaceholderProps) => {
  return (
    <main className={styles.page}>
      <h1>{title}</h1>
      <p>{description}</p>

      <nav className={styles.navigation} aria-label={`${title} navigation`}>
        {links.map((link) => (
          <Link key={link.to} to={link.to} className={styles.link}>
            {link.label}
          </Link>
        ))}
      </nav>
    </main>
  );
};

export default AuthPagePlaceholder;
