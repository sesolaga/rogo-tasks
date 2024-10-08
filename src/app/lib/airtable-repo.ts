import {
  Repository,
  Task,
  TaskCreateFormParams,
  TaskUpdateFormParams,
  User,
} from '@/app/lib/definitions';
import Airtable from 'airtable';
import { AirtableBase } from 'airtable/lib/airtable_base';
import repo from '@/app/lib/repo';

const ITEMS_PER_PAGE = 6;

class AirtableRepo implements Repository {
  private apiKey: string;
  private baseName: string;
  private base: AirtableBase;

  constructor(apiKey: string, baseName: string) {
    this.apiKey = apiKey;
    this.baseName = baseName;
    this.base = new Airtable({ apiKey: apiKey }).base(baseName);
  }

  async fetchUsers() {
    let records;
    try {
      records = await this.base('Users')
        .select({
          view: 'Grid view',
          pageSize: ITEMS_PER_PAGE,
        })
        .all();
    } catch (error) {
      console.log('Airtable Error:', error);

      throw new Error('Failed to fetch the users.');
    }

    return records.map((record) => ({
      id: record.getId(),
      name: record.get('Name') || '',
    }));
  }

  async fetchFilteredTasks(
    query?: string,
    currentPage?: number,
  ) {
    let records;

    try {
      records = await this.base('Tasks')
        .select({
          view: 'Grid view',
          filterByFormula: query
            ? `OR(SEARCH("${query.toLowerCase()}", LOWER({Name})), SEARCH("${query.toLowerCase()}", LOWER({Notes})), SEARCH("${query.toLowerCase()}", LOWER({Status})))`
            : '',
          pageSize: ITEMS_PER_PAGE,
        })
        .all();
    } catch (error) {
      console.log('Airtable Error:', error);

      throw new Error('Failed to fetch the tasks.');
    }

    const out = records.map((record) => ({
      id: record.getId(),
      name: record.get('Name'),
      notes: record.get('Notes'),
      status: record.get('Status'),
    }));

    if (!currentPage) {
      return out;
    }

    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return currentPage ? out.slice(start, start + ITEMS_PER_PAGE) : out;
  }

  async fetchTasksTotalPages(query?: string) {
    let res;

    try {
      res = await this.fetchFilteredTasks(query);
    } catch (error) {
      console.log('Airtable Error:', error);

      throw new Error('Failed to fetch the tasks total pages.');
    }

    return Math.ceil(Number(res.length) / ITEMS_PER_PAGE);
  }

  createTask(params: TaskCreateFormParams) {
    this.base('Tasks').create(
      [
        {
          fields: {
            Name: params.name,
            Notes: params.notes,
            Status: params.status,
            User: [params.userId],
          },
        },
      ],
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
      },
    );
  }

  updateTask(params: TaskUpdateFormParams) {
    this.base('Tasks').update(
      [
        {
          id: params.id,
          fields: {
            Name: params.name,
            Notes: params.notes,
            Status: params.status,
            User: [params.userId],
          },
        },
      ],
      function (err) {
        if (err) {
          console.error(err);
          return;
        }
      },
    );
  }

  async fetchTaskById(id: string) {
    // TODO: implement fetchById with async await
    const out = await this.fetchFilteredTasks();

    const filtered = out.filter((task) => task.id === id);

    return filtered.length > 0 ? filtered[0] : null;
  }
}

export default AirtableRepo;
