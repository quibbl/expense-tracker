import db from '../db/db.service';


export const insertExpense = (name: string, amount: number, currency: string, category: string, date: string) => {
  const statement = db.prepare(`
    INSERT INTO expenses (name, amount, currency, category, date) 
    VALUES (?, ?, ?, ?, ?)
  `);
  return statement.run(name, amount, currency, category, date);
}

export const selectAllExpenses = () => {
  const statement = db.prepare('SELECT * FROM expenses');
  return statement.all();
}
