import Form from '@/app/ui/recognitions/create-form';
import Breadcrumbs from "@/app/ui/breadcrumbs";
import {sql} from "@vercel/postgres";

export default async function Page({params}: { params: { id: string, } }) {
  const id = params.id;
  const data = await sql`SELECT name FROM employees where id=${id}`;
  const receiverName = data.rows[0].name;
  return (
    <main>
      <Breadcrumbs breadcrumbs={[
        {label: 'Employees', href: '/employees'},
        {label: 'Create Recognition', href: `/employees/${id}/recognitions/create`, active: true},
      ]}/>
      <Form receiverId={id} receiverName={receiverName}/>
    </main>
  );
}