import Form from '@/app/ui/tasks/create-form';
import Breadcrumbs from '@/app/ui/tasks/breadcrumbs';
import { Metadata } from 'next';
import repo from "@/app/lib/repo";

export const metadata: Metadata = {
  title: 'Create Task',
};

const breadcrumbs = [
  { name: 'Tasks', href: '/tasks' },
  { name: 'Create Task', href: '/tasks/create' },
];

export default async function Page() {
  const users = await repo.fetchUsers();

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>

      <Form users={users} />
    </main>
  );
}
