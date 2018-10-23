import { Briebug } from '@state/briebug/briebug.model';

export class InMemoryDataService {
  createDb() {
    const briebug: Array<Briebug> = [
      {
        id: 1,
        name: 'Some Name',
        description: 'Some Description'
      },
      {
        id: 2,
        name: 'Better Name',
        description: 'Better Description'
      },
      {
        id: 3,
        name: 'Oh yeah? Well I have the best name!',
        description: 'And the best description, too!'
      },
      {
        id: 4,
        name: 'Well, agree to disagree, then.',
        description: 'And for the record, I disagree!'
      }
    ];

    return { briebug };
  }
}
