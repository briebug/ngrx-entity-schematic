import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable, empty } from 'rxjs';

import {
  EntityActionTypes,
  InsertEntity,
  InsertEntitySuccess,
  InsertEntityFail,
  SearchAllEntityEntities,
  SearchAllEntityEntitiesSuccess,
  SearchAllEntityEntitiesFail,
  LoadEntityById,
  LoadEntityByIdSuccess,
  LoadEntityByIdFail,
  UpdateEntity,
  UpdateEntitySuccess,
  UpdateEntityFail,
  DeleteEntityById,
  DeleteEntityByIdSuccess,
  DeleteEntityByIdFail,
  SetEntityPaging,
  SetEntityFilter,
  SetEntitySorting,
  SelectEntityById
} from './entity.actions';
import { generateEntity, generateEntityArray } from './entity.model';
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
    it('should return InsertEntitySuccess action with entity on success', () => {
      const entity = generateEntity();
      const insertAction = new InsertEntity({ entity: entity });
      const successAction = new InsertEntitySuccess({ result: entity });

      actions = hot('a-', { a: insertAction });
      service.create.and.returnValue(cold('-e|', { e: entity }));
      const expected = cold('-s', { s: successAction });

      expect(effects.insert).toBeObservable(expected);
    });

    it('should return InsertEntityFail with error object on failure', () => {
      const entity = generateEntity();
      const insertAction = new InsertEntity({ entity: entity });
      const failAction = new InsertEntityFail({ error: 'fail' });

      actions = hot('i-', { i: insertAction });
      service.create.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.insert).toBeObservable(expected);
    });
  });

  describe('search', () => {
    it('should return SearchAllEntityEntitiesSuccess action with entities on success', () => {
      const entities = generateEntityArray();
      const searchAction = new SearchAllEntityEntities();
      const successAction = new SearchAllEntityEntitiesSuccess({ result: entities });

      actions = hot('a-', { a: searchAction });
      service.search.and.returnValue(cold('-e|', { e: entities }));
      const expected = cold('-s', { s: successAction });

      expect(effects.search).toBeObservable(expected);
    });

    it('should return SearchAllEntityEntitiesFail with error object on failure', () => {
      const searchAction = new SearchAllEntityEntities();
      const failAction = new SearchAllEntityEntitiesFail({ error: 'fail' });

      actions = hot('a-', { a: searchAction });
      service.search.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.search).toBeObservable(expected);
    });
  });

});
