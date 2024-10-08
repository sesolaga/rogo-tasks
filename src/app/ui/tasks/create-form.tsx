'use client';

import { UserField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  TagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createTask, State } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form({ users }: { users: UserField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(createTask, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* User Name */}
        <div className="mb-4">
          <label htmlFor="user" className="mb-2 block text-sm font-medium">
            Choose user
          </label>

          <div className="relative">
            <select
              id="user"
              name="userId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="user-error"
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="user-error" aria-live="polite" aria-atomic="true">
            {state.errors?.userId &&
              state.errors.userId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Task Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Set the task name
          </label>

          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
            </div>

            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Task Notes */}
        <div className="mb-4">
          <label htmlFor="notes" className="mb-2 block text-sm font-medium">
            Set the task notes
          </label>

          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="notes"
                name="notes"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="notes-error"
              />
            </div>

            <div id="notes-error" aria-live="polite" aria-atomic="true">
              {state.errors?.notes &&
                state.errors.notes.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Task Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the task status
          </legend>

          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="todo"
                  name="status"
                  type="radio"
                  value="Todo"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="todo"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Todo <TagIcon className="h-4 w-4"/>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="in_progress"
                  name="status"
                  type="radio"
                  value="In progress"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="in_progress"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  In progress <ClockIcon className="h-4 w-4"/>
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="done"
                  name="status"
                  type="radio"
                  value="Done"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="done"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Done <CheckIcon className="h-4 w-4"/>
                </label>
              </div>
            </div>
          </div>

          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        <div id="form-error-message" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/tasks"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  );
}
