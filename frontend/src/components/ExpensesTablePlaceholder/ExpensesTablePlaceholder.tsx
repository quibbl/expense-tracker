import styles from './ExpensesTablePlaceholder.module.css';

const ExpensesTablePlaceholder = () => {
  return (
    <table className={styles.table}>
      <caption className={styles.caption}>Expenses (placeholder)</caption>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2026-02-19</td>
          <td>Food</td>
          <td>Lunch</td>
          <td>$0.00</td>
        </tr>
        <tr>
          <td>2026-02-19</td>
          <td>Transport</td>
          <td>Subway</td>
          <td>$0.00</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ExpensesTablePlaceholder;
