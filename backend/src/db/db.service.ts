import Database from 'better-sqlite3';


const dbFilePath = process.env.DB_FILE_PATH || 'default-database.db';
let db: Database.Database; ;

try {
  db = new Database(dbFilePath);
  console.log('Connected to the SQLite database.');
} catch (error) {
  console.error('Failed to connect to the database', error);
  db = new Database(':memory:');  // Provide a fallback in-memory database
}


// Initialize the database schema
const createExpensesTable = `
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL
  );
`;

db.exec(createExpensesTable);

export default db;