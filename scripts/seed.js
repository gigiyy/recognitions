const { db } = require('@vercel/postgres');
const { employees, recognitions } = require('../app/lib/placeholder-data.js');

async function seedEmployees(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS employees (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    manager_id UUID NOT NULL,
    image_url TEXT NOT NULL
    );`;

    console.log('Created "Employees" table');

    const insertedEmployees = await Promise.all(
      employees.map(
        (employee) => client.sql`
      INSERT INTO employees (id, name, email, manager_id, image_url)
      VALUES (${employee.id}, ${employee.name}, ${employee.email}, ${employee.manager_id}, ${employee.image_url});
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

async function seedRecognitions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS recognitions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    receiver_id UUID NOT NULL,
    sender_id UUID NOT NULL,
    value_id TEXT NOT NULL,
    comment TEXT NOT NULL,
    date TEXT NOT NULL
    );`;

    console.log('Created "Recognitions" table');

    const insertedRecognitions = await Promise.all(
      recognitions.map(
        (recon) => client.sql`
      INSERT INTO recognitions (id, receiver_id, sender_id, value_id, comment, date)
      VALUES (${recon.id}, ${recon.receiverId}, ${recon.senderId}, ${recon.valueId}, ${recon.comment}, ${recon.date});
      `,
      ),
    );

    console.log(`Seeded ${insertedRecognitions.length} recognitions`);

    return {
      createTable,
      recognitions: insertedRecognitions,
    };
  } catch (err) {
    console.error('Error seeding recognitions:', err);
    throw err;
  }
}

async function main() {
  const client = await db.connect();

  await seedEmployees(client);
  await seedRecognitions(client);

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database', err);
});
