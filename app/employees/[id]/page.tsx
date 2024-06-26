import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchRecognitions, getEmployeeName } from '@/app/lib/data';
import Table from '@/app/ui/recognitions/table';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const name = await getEmployeeName(id);
  const recognitions = await fetchRecognitions(id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Employees', href: '/employees' },
          {
            label: `${name}'s Recognitions`,
            href: `/employees/${id}`,
            active: true,
          },
        ]}
      />
      <Table recognitions={recognitions} />
    </main>
  );
}
