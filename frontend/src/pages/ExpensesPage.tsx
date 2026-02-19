import { Link } from 'react-router-dom';

import ExpensesTablePlaceholder from '@/components/ExpensesTablePlaceholder';
import { ROUTE_PATHS } from '@/routes/routePaths';

import styles from './Pages.module.css';

const ExpensesPage = () => {
  return (
    <main className={styles.page}>
      <h1>Expense Tracker</h1>
      <p>This is the root route and will show expenses.</p>

      <ExpensesTablePlaceholder />

      <nav className={styles.navigation} aria-label="Root navigation">
        <Link to={ROUTE_PATHS.signIn} className={styles.link}>
          Sign In
        </Link>
      </nav>
    </main>
  );
};

export default ExpensesPage;
