'use client';

import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import { Breadcrumb } from '@/app/lib/definitions';
import { usePathname } from "next/navigation";

export default function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {breadcrumbs.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-gray-400"
              />
              <a
                href={page.href}
                aria-current={page.href === pathname ? 'page' : undefined}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
