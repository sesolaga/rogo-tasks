'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import repo from "@/app/lib/repo";

const FormSchema = z.object({
  id: z.string(),
  userId: z.string({
    invalid_type_error: 'Please select a user.',
  }),
  name: z.string({
    invalid_type_error: 'Name field cannot be empty.',
  }),
  notes: z.string({
    invalid_type_error: 'Notes field cannot be empty.',
  }),
  status: z.enum(['Todo', 'In progress', 'Done'], {
    invalid_type_error: 'Please select a task status.',
  }),
});

export type State = {
  errors?: {
    userId?: string[];
    name?: string[];
    notes?: string[];
    status?: string[];
  };
  message?: string | null;
};

const CreateTask = FormSchema.omit({ id: true});
const UpdateTask = FormSchema.omit({ id: true });

export async function createTask(prevState: State, formData: FormData) {
  const validatedFields = CreateTask.safeParse({
    userId: formData.get('userId'),
    name: formData.get('name'),
    notes: formData.get('notes'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Task.',
    };
  }

  const { userId, name, notes, status } = validatedFields.data;

  try {
    await repo.createTask({
      userId,
      name,
      notes,
      status
    });
  } catch {
    return {
      message: 'Database Error: Failed to Create Task.',
    };
  }

  revalidatePath('/tasks');
  redirect('/tasks');
}

export async function updateTask(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateTask.safeParse({
    userId: formData.get('userId'),
    name: formData.get('name'),
    notes: formData.get('notes'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Task',
    };
  }

  const { userId, name, notes, status } = validatedFields.data;

  try {
    await repo.updateTask({
      id,
      userId,
      name,
      notes,
      status
    });
  } catch {
    return {
      message: 'Database Error: Failed to Update Task.',
    };
  }

  revalidatePath('/tasks');
  redirect('/tasks');
}
