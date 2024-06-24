import EmployeesTable from '@/app/ui/employees/table';
import { fetchFilteredEmployees } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Employees',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const employees = await fetchFilteredEmployees(query);

  return (
    <main>
      <EmployeesTable employees={employees} />
    </main>
  );
}
