import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import {
  InsertBriebug,
  InsertBriebugSuccess,
  InsertBriebugFail,
  SearchAllBriebugEntities,
  SearchAllBriebugEntitiesSuccess,
  SearchAllBriebugEntitiesFail,
  LoadBriebugById,
  LoadBriebugByIdSuccess,
  LoadBriebugByIdFail,
  UpdateBriebug,
  UpdateBriebugSuccess,
  UpdateBriebugFail,
  DeleteBriebugById,
  DeleteBriebugByIdSuccess,
  DeleteBriebugByIdFail
} from './briebug.actions';
import { generateBriebug, generateBriebugArray } from './briebug.model';
// TODO: Change this path when you move your service file:
import { BriebugService } from './briebug.service';
import { BriebugEffects } from './briebug.effects';

describe('BriebugEffects', () => {
  let actions: Observable<any>;
  let effects: BriebugEffects;
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BriebugEffects,
        provideMockActions(() => actions),
        {
          provide: BriebugService,
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

    effects = TestBed.get(BriebugEffects);
    service = TestBed.get(BriebugService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('insert', () => {
    it('should return InsertBriebugSuccess action with entity on success', () => {
      const entity = generateBriebug();
      const insertAction = new InsertBriebug({ briebug: entity });
      const successAction = new InsertBriebugSuccess({ result: entity });

      actions = hot('a-', { a: insertAction });
      service.create.and.returnValue(cold('-e|', { e: entity }));
      const expected = cold('-s', { s: successAction });

      expect(effects.insert).toBeObservable(expected);
    });

    it('should return InsertBriebugFail with error object on failure', () => {
      const entity = generateBriebug();
      const insertAction = new InsertBriebug({ briebug: entity });
      const failAction = new InsertBriebugFail({ error: 'fail' });

      actions = hot('i-', { i: insertAction });
      service.create.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.insert).toBeObservable(expected);
    });
  });

  describe('search', () => {
    it('should return SearchAllBriebugEntitiesSuccess action with entities on success', () => {
      const entities = generateBriebugArray();
      const searchAction = new SearchAllBriebugEntities();
      const successAction = new SearchAllBriebugEntitiesSuccess({ result: entities });

      actions = hot('a-', { a: searchAction });
      service.search.and.returnValue(cold('-e|', { e: entities }));
      const expected = cold('-s', { s: successAction });

      expect(effects.search).toBeObservable(expected);
    });

    it('should return SearchAllBriebugEntitiesFail with error object on failure', () => {
      const searchAction = new SearchAllBriebugEntities();
      const failAction = new SearchAllBriebugEntitiesFail({ error: 'fail' });

      actions = hot('a-', { a: searchAction });
      service.search.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.search).toBeObservable(expected);
    });
  });

  describe('loadById', () => {
    it('should return LoadBriebugByIdSuccess action with entity on success', () => {
      const entity = generateBriebug();
      const loadAction = new LoadBriebugById({ id: entity.id });
      const successAction = new LoadBriebugByIdSuccess({ result: entity});

      actions = hot('a-', { a: loadAction });
      service.getById.and.returnValue(cold('-e|', { e: entity }));
      const expected = cold('-s', { s: successAction });

      expect(effects.loadById).toBeObservable(expected);
    });

    it('should return LoadBriebugByIdFail with error object on failure', () => {
      const entity = generateBriebug();
      const loadAction = new LoadBriebugById({ id: entity.id });
      const failAction = new LoadBriebugByIdFail({ error: 'fail' });

      actions = hot('a-', { a: loadAction });
      service.getById.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.loadById).toBeObservable(expected);
    });
  });

  describe('update', () => {
    it('should return UpdateBriebugSuccess action with entity on success', () => {
      const entity = generateBriebug();
      const updateAction = new UpdateBriebug({ briebug: entity });
      const successAction = new UpdateBriebugSuccess({ update: {
        id: entity.id,
        changes: entity
      }});

      actions = hot('a-', { a: updateAction });
      service.update.and.returnValue(cold('-e|', { e: entity }));
      const expected = cold('-s', { s: successAction });

      expect(effects.update).toBeObservable(expected);
    });

    it('should return UpdateBriebugFail with error object on failure', () => {
      const entity = generateBriebug();
      const updateAction = new UpdateBriebug({ briebug: entity });
      const failAction = new UpdateBriebugFail({ error: 'fail' });

      actions = hot('a-', { a: updateAction });
      service.update.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.update).toBeObservable(expected);
    });
  });

  describe('delete', () => {
    it('should return DeleteBriebugByIdSuccess action with entity ID on success', () => {
      const entity = generateBriebug();
      const deleteAction = new DeleteBriebugById({ id: entity.id });
      const successAction = new DeleteBriebugByIdSuccess({ id: entity.id });

      actions = hot('a-', { a: deleteAction });
      service.deleteById.and.returnValue(cold('-e|', { e: entity.id }));
      const expected = cold('-s', { s: successAction });

      expect(effects.delete).toBeObservable(expected);
    });

    it('should return DeleteBriebugByIdFail with error object on failure', () => {
      const entity = generateBriebug();
      const deleteAction = new DeleteBriebugById({ id: entity.id });
      const failAction = new DeleteBriebugByIdFail({ error: 'fail' });

      actions = hot('a-', { a: deleteAction });
      service.deleteById.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.delete).toBeObservable(expected);
    });
  });

});
