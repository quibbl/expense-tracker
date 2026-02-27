const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: 'demo-password',
    },
  });

  await prisma.expense.create({
    data: {
      name: 'Sample Expense',
      amount: 100,
      currency: 'USD',
      category: 'Utilities',
      date: new Date(),
      userId: demoUser.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
