import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable, empty } from 'rxjs';

import {
  BriebugActionTypes,
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
  DeleteBriebugByIdFail,
  SetBriebugPaging,
  SetBriebugFilter,
  SetBriebugSorting,
  SelectBriebugById
} from './entity.actions';
import { generateEntity, generateEntityArray } from './entity.model';
import { BriebugService } from '@core/services/entity.service';
import { BriebugEffects } from '@state/entity/entity.effects';

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
      const entity = generateEntity();
      const insertAction = new InsertBriebug({ briebug: entity });
      const successAction = new InsertBriebugSuccess({ result: entity });

      actions = hot('a-', { a: insertAction });
      service.create.and.returnValue(cold('-e|', { e: entity }));
      const expected = cold('-s', { s: successAction });

      expect(effects.insert).toBeObservable(expected);
    });

    it('should return InsertBriebugFail with error object on failure', () => {
      const entity = generateEntity();
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
      const entities = generateEntityArray();
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
      const entity = generateEntity();
      const loadAction = new LoadBriebugById({ id: entity.id });
      const successAction = new LoadBriebugByIdSuccess({ result: entity});

      actions = hot('a-', { a: loadAction });
      service.getById.and.returnValue(cold('-e|', { e: entity }));
      const expected = cold('-s', { s: successAction });

      expect(effects.loadById).toBeObservable(expected);
    });

    it('should return LoadBriebugByIdFail with error object on failure', () => {
      const entity = generateEntity();
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
      const entity = generateEntity();
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
      const entity = generateEntity();
      const updateAction = new UpdateBriebug({ briebug: entity });
      const failAction = new UpdateBriebugFail({ error: 'fail' });

      actions = hot('a-', { a: updateAction });
      service.update.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.update).toBeObservable(expected);
    });
  });

});
