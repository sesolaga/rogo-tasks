import { Repository } from '@/app/lib/definitions';
import AirtableRepo from '@/app/lib/airtable-repo';

let repo: Repository;

switch (process.env.REPO) {
  case 'airtable':
    repo = new AirtableRepo(<string>process.env.AIRTABLE_API_KEY, 'app2WYC6GBtKXV2uB');
    break;

  default:
    throw new Error('No data repository chosen.');
}

export default repo;
