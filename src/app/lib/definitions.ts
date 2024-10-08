export interface User {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  userId: string;
  name: string;
  notes: string;
  status: 'Todo' | 'In progress' | 'Done';
}

export interface TaskCreateFormParams {
  userId: string;
  name: string;
  notes: string;
  status: 'Todo' | 'In progress' | 'Done';
}

export interface TaskUpdateFormParams {
  id: string;
  userId: string;
  name: string;
  notes: string;
  status: 'Todo' | 'In progress' | 'Done';
}

export interface AirtableResult {
  success: boolean;
  error: object | null;
  data: any;
}

export type UserField = {
  id: string;
  name: string;
};

export interface Breadcrumb {
  name: string;
  href: string;
}

export interface Repository {
  fetchUsers();

  fetchFilteredTasks(query?: string, currentPage?: number);

  fetchTasksTotalPages(query?: string);

  createTask(params: TaskCreateFormParams);

  updateTask(params: TaskUpdateFormParams);

  fetchTaskById(id: string);
}
