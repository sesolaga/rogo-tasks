import Form from '@/app/ui/tasks/edit-form';
import Breadcrumbs from '@/app/ui/tasks/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import repo from "@/app/lib/repo";

export const metadata: Metadata = {
  title: 'Edit Task',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [task, users] = await Promise.all([
    repo.fetchTaskById(id),
    repo.fetchUsers(),
  ]);

  const breadcrumbs = [
    { name: 'Tasks', href: '/tasks' },
    { name: 'Edit Task', href: '/tasks/{$id}/edit' },
  ];

  if (!task) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs}/>

      <Form task={task} users={users} />
    </main>
  );
}
