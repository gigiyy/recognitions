import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { FilteredEmployeesTable } from '@/app/lib/definitions';

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
