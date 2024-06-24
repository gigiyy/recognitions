const { db } = require('@vercel/postgres');
const { employees } = require('../app/lib/placeholder-data.js');

async function seedEmployees(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS employees (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    image_url TEXT NOT NULL
    );`;

    console.log('Created "Employees" table');

    const insertedEmployees = await Promise.all(
      employees.map(
        (employee) => client.sql`
      INSERT INTO employees (id, name, email, image_url)
      VALUES (${employee.id}, ${employee.name}, ${employee.email}, ${employee.image_url});
      `,
      ),
    );

    console.log(`Seeded ${insertedEmployees.length} employees`);

    return {
      createTable,
      employees: insertedEmployees,
    };
  } catch (err) {
    console.error('Error seeding employees:', err);
    throw err;
  }
}

async function main() {
  const client = await db.connect();

  await seedEmployees(client);

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database', err);
});
