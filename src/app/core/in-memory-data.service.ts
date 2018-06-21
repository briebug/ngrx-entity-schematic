import { Briebug } from '@state/entity/entity.model';

export class InMemoryDataService {
  createDb() {
    const entities = [
      { id: 1, name: 'Some Name', description: 'Some Description' } as Briebug,
      { id: 2, name: 'Better Name', description: 'Better Description' } as Briebug,
      { id: 3, name: 'Oh yeah? Well I have the best name!', description: 'And the best description, too!' } as Briebug,
      { id: 4, name: 'Well, agree to disagree, then.', description: 'And for the record, I disagree!' } as Briebug
    ];

    return { entities };
  }
}
