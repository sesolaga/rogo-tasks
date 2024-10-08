import { Suspense } from 'react';
import Link from 'next/link';
import Search from '@/app/ui/search';
import Table from '@/app/ui/tasks/table';
import Pagination from '@/app/ui/pagination';
import repo from "@/app/lib/repo";
import { TasksTableSkeleton } from "@/app/ui/skeletons";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await repo.fetchTasksTotalPages(query);

  return (
    <div>
      <div className="p-2 flex justify-between items-center w-full">
        <p className="text-2xl font-bold">Tasks</p>

        <Link
          href="/tasks/create"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          New Task
        </Link>
      </div>

      <Search placeholder="Search for tasks..." />

      <Suspense key={query + currentPage} fallback={<TasksTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
