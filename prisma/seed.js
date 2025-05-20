const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Insert seed data here
  await prisma.expense.create({
    data: {
      name: "Sample Expense",
      amount: 100.0,
      currency: "USD",
      category: "Utilities",
      date: new Date(),
      createdAt: new Date(), 
      updatedAt: new Date()
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
