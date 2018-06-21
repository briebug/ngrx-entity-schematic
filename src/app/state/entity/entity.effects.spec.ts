import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable, empty } from 'rxjs';

import {
  EntityActionTypes,
  EntityInsert,
  EntityInsertSuccess,
  EntityInsertFail,
  EntitySearch,
  EntitySearchSuccess,
  EntitySearchFail,
  EntityLoadById,
  EntityLoadByIdSuccess,
  EntityLoadByIdFail,
  EntityUpdate,
  EntityUpdateSuccess,
  EntityUpdateFail,
  EntityDeleteById,
  EntityDeleteSuccess,
  EntityDeleteFail,
  EntitySetPaging,
  EntitySetFilter,
  EntitySetSorting,
  EntitySelectById
} from './entity.actions';
import { generateEntity } from './entity.model';
import { EntityService } from '@core/services/entity.service';
import { EntityEffects } from '@state/entity/entity.effects';

// export class TestActions extends Actions {
//   constructor() {
//     super(empty());
//   }
//   set stream(source: Observable<any>) {
//     this.source = source;
//   }
// }

// export function getActions() {
//   return new TestActions();
// }

describe('EntityEffects', () => {
  let actions: Observable<any>;
  let effects: EntityEffects;
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EntityEffects,
        provideMockActions(() => actions),
        {
          provide: EntityService,
          useValue: jasmine.createSpyObj('service', [
            'create',
            'search',
            'getById',
            'update',
            'deleteById'
          ])
        }
      ]
    });

    effects = TestBed.get(EntityEffects);
    service = TestBed.get(EntityService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('insert', () => {

      it('should return InsertSuccess action with entity on success', () => {
        const entity = generateEntity();
        const insertAction = new EntityInsert({ entity: entity });
        const successAction = new EntityInsertSuccess({ result: entity });

        actions = hot('i-', { i: insertAction });
        service.create.and.returnValue(cold('-e|', { e: entity }));
        const expected = cold('-s', { s: successAction });

        expect(effects.insert).toBeObservable(expected);
      });
  });

});
