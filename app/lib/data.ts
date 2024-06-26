import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  FilteredEmployeesTable,
  FormattedRecognitionsTable,
} from '@/app/lib/definitions';

export async function fetchFilteredEmployees(query: string) {
  noStore();

  try {
    const employees = await sql<FilteredEmployeesTable>`
        SELECT employees.id, employees.name, employees.email, employees.image_url 
        FROM employees 
        WHERE employees.name ILIKE ${`%${query}%`} OR 
            employees.email ILIKE ${`%${query}%`} 
        ORDER BY employees.name ASC
        LIMIT 6;
        `;

    return employees.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Employees data');
  }
}

export async function fetchRecognitions(receiverId: string) {
  noStore();
  try {
    const recognitions = await sql<FormattedRecognitionsTable>`
    SELECT recon.id, recon.sender_id, emp.name as sender_name, emp.image_url as sender_image_url,
    recon.value_id, recon.comment, recon.date
    FROM recognitions recon
    JOIN employees emp ON recon.sender_id = emp.id
    WHERE recon.receiver_id = ${receiverId}
    `;

    return recognitions.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Recognitions data');
  }
}

export async function getEmployeeName(id: string) {
  noStore();
  try {
    const data = await sql`SELECT name FROM employees where id=${id}`;
    return data.rows[0].name;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Employee name');
  }
}
