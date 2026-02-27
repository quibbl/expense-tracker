# Backend Guide (SQLite + Prisma + Postman)

## 1. What is used here
- `SQLite` - the database (file: `backend/database.sqlite`)
- `Prisma` - ORM (works with DB through code)
- `Express` - HTTP API

Request flow:
`Client -> Controller -> Service -> Repository -> Prisma -> SQLite`

## 2. First run
From project root:

```bash
cd /Users/annashtyka/js/expense-tracker/backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

After that, the server is usually available at:
`http://localhost:3000`

## 3. Check the database
Check tables:

```bash
sqlite3 /Users/annashtyka/js/expense-tracker/backend/database.sqlite ".tables"
```

Open SQLite console:

```bash
sqlite3 /Users/annashtyka/js/expense-tracker/backend/database.sqlite
```

Inside:

```sql
.tables
SELECT id, email, name FROM users;
SELECT id, name, amount, currency, category, date, userId FROM expenses;
.exit
```

GUI for DB:

```bash
npx prisma studio
```

## 4. Postman: sign up and sign in
### Sign Up
- Method: `POST`
- URL: `http://localhost:3000/api/auth/sign-up`
- Header: `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "email": "masha@example.com",
  "name": "Masha",
  "password": "123456"
}
```

Expected:
- `201` - user created
- `409` - email already exists
- `400` - missing required fields

### Sign In
- Method: `POST`
- URL: `http://localhost:3000/api/auth/sign-in`
- Header: `Content-Type: application/json`
- Body:

```json
{
  "email": "masha@example.com",
  "password": "123456"
}
```

Expected:
- `200` - sign in success
- `401` - invalid credentials

## 5. Postman: expenses
### Create expense
- Method: `POST`
- URL: `http://localhost:3000/api/expenses`
- Header: `Content-Type: application/json`
- Body:

```json
{
  "name": "Coffee",
  "amount": 5.5,
  "currency": "USD",
  "category": "Food",
  "date": "2026-02-27T10:00:00.000Z"
}
```

Expected:
- `201` - expense created
- `400` - validation error

### Get expenses list
- Method: `GET`
- URL: `http://localhost:3000/api/expenses`

Expected:
- `200` + array of expenses

## 6. Useful commands
In `backend` directory:

```bash
npm run dev
npm run build
npm run prisma:generate
npm run seed
```

## 7. Migrations (Prisma)
Current migration set:
- `20260224160000_init_expenses`
- `20260226130000_add_users_and_expense_userid`

Check migration status:

```bash
cd /Users/annashtyka/js/expense-tracker/backend
npm run migrate:status
```

### Option A: baseline existing DB (keep data)
Use this if tables already exist and you want Prisma to mark migrations as applied.

```bash
cd /Users/annashtyka/js/expense-tracker/backend
cp prisma/database.sqlite prisma/database.sqlite.bak
npx prisma migrate resolve --applied 20260224160000_init_expenses
npx prisma migrate resolve --applied 20260226130000_add_users_and_expense_userid
npx prisma migrate status
```

### Option B: clean reset (drop/recreate DB)
Use this only if current local data is not needed.

```bash
cd /Users/annashtyka/js/expense-tracker/backend
npm run migrate:reset -- --force
npm run migrate:status
```

## 8. If you get 500
1. Check that DB and tables are created:
```bash
npx prisma db push
sqlite3 /Users/annashtyka/js/expense-tracker/backend/database.sqlite ".tables"
```
2. Restart server:
```bash
npm run dev
```
3. Check exact error in server console (`Failed to sign up:` etc.).
