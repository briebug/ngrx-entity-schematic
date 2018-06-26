import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import {
  Insert<%= classify(name) %>,
  Insert<%= classify(name) %>Success,
  Insert<%= classify(name) %>Fail,
  SearchAll<%= classify(name) %>Entities,
  SearchAll<%= classify(name) %>EntitiesSuccess,
  SearchAll<%= classify(name) %>EntitiesFail,
  Load<%= classify(name) %>ById,
  Load<%= classify(name) %>ByIdSuccess,
  Load<%= classify(name) %>ByIdFail,
  Update<%= classify(name) %>,
  Update<%= classify(name) %>Success,
  Update<%= classify(name) %>Fail,
  Delete<%= classify(name) %>ById,
  Delete<%= classify(name) %>ByIdSuccess,
  Delete<%= classify(name) %>ByIdFail
} from './<%= name %>.actions';
import { generate<%= classify(name) %>, generate<%= classify(name) %>Array } from './<%= name %>.model';
// TODO: Change this path when you move your service file:
import { <%= classify(name) %>Service } from './<%= name %>.service';
import { <%= classify(name) %>Effects } from '@state/<%= name %>/<%= name %>.effects';

describe('<%= classify(name) %>Effects', () => {
  let actions: Observable<any>;
  let effects: <%= classify(name) %>Effects;
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        <%= classify(name) %>Effects,
        provideMockActions(() => actions),
        {
          provide: <%= classify(name) %>Service,
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

    effects = TestBed.get(<%= classify(name) %>Effects);
    service = TestBed.get(<%= classify(name) %>Service);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('insert', () => {
    it('should return Insert<%= classify(name) %>Success action with entity on success', () => {
      const entity = generate<%= classify(name) %>();
      const insertAction = new Insert<%= classify(name) %>({ <%= name %>: entity });
      const successAction = new Insert<%= classify(name) %>Success({ result: entity });

      actions = hot('a-', { a: insertAction });
      service.create.and.returnValue(cold('-e|', { e: entity }));
      const expected = cold('-s', { s: successAction });

      expect(effects.insert).toBeObservable(expected);
    });

    it('should return Insert<%= classify(name) %>Fail with error object on failure', () => {
      const entity = generate<%= classify(name) %>();
      const insertAction = new Insert<%= classify(name) %>({ <%= name %>: entity });
      const failAction = new Insert<%= classify(name) %>Fail({ error: 'fail' });

      actions = hot('i-', { i: insertAction });
      service.create.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.insert).toBeObservable(expected);
    });
  });

  describe('search', () => {
    it('should return SearchAll<%= classify(name) %>EntitiesSuccess action with entities on success', () => {
      const entities = generate<%= classify(name) %>Array();
      const searchAction = new SearchAll<%= classify(name) %>Entities();
      const successAction = new SearchAll<%= classify(name) %>EntitiesSuccess({ result: entities });

      actions = hot('a-', { a: searchAction });
      service.search.and.returnValue(cold('-e|', { e: entities }));
      const expected = cold('-s', { s: successAction });

      expect(effects.search).toBeObservable(expected);
    });

    it('should return SearchAll<%= classify(name) %>EntitiesFail with error object on failure', () => {
      const searchAction = new SearchAll<%= classify(name) %>Entities();
      const failAction = new SearchAll<%= classify(name) %>EntitiesFail({ error: 'fail' });

      actions = hot('a-', { a: searchAction });
      service.search.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.search).toBeObservable(expected);
    });
  });

  describe('loadById', () => {
    it('should return Load<%= classify(name) %>ByIdSuccess action with entity on success', () => {
      const entity = generate<%= classify(name) %>();
      const loadAction = new Load<%= classify(name) %>ById({ id: entity.id });
      const successAction = new Load<%= classify(name) %>ByIdSuccess({ result: entity});

      actions = hot('a-', { a: loadAction });
      service.getById.and.returnValue(cold('-e|', { e: entity }));
      const expected = cold('-s', { s: successAction });

      expect(effects.loadById).toBeObservable(expected);
    });

    it('should return Load<%= classify(name) %>ByIdFail with error object on failure', () => {
      const entity = generate<%= classify(name) %>();
      const loadAction = new Load<%= classify(name) %>ById({ id: entity.id });
      const failAction = new Load<%= classify(name) %>ByIdFail({ error: 'fail' });

      actions = hot('a-', { a: loadAction });
      service.getById.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.loadById).toBeObservable(expected);
    });
  });

  describe('update', () => {
    it('should return Update<%= classify(name) %>Success action with entity on success', () => {
      const entity = generate<%= classify(name) %>();
      const updateAction = new Update<%= classify(name) %>({ <%= name %>: entity });
      const successAction = new Update<%= classify(name) %>Success({ update: {
        id: entity.id,
        changes: entity
      }});

      actions = hot('a-', { a: updateAction });
      service.update.and.returnValue(cold('-e|', { e: entity }));
      const expected = cold('-s', { s: successAction });

      expect(effects.update).toBeObservable(expected);
    });

    it('should return Update<%= classify(name) %>Fail with error object on failure', () => {
      const entity = generate<%= classify(name) %>();
      const updateAction = new Update<%= classify(name) %>({ <%= name %>: entity });
      const failAction = new Update<%= classify(name) %>Fail({ error: 'fail' });

      actions = hot('a-', { a: updateAction });
      service.update.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.update).toBeObservable(expected);
    });
  });

  describe('delete', () => {
    it('should return Delete<%= classify(name) %>ByIdSuccess action with entity ID on success', () => {
      const entity = generate<%= classify(name) %>();
      const deleteAction = new Delete<%= classify(name) %>ById({ id: entity.id });
      const successAction = new Delete<%= classify(name) %>ByIdSuccess({ id: entity.id });

      actions = hot('a-', { a: deleteAction });
      service.deleteById.and.returnValue(cold('-e|', { e: entity.id }));
      const expected = cold('-s', { s: successAction });

      expect(effects.delete).toBeObservable(expected);
    });

    it('should return Delete<%= classify(name) %>ByIdFail with error object on failure', () => {
      const entity = generate<%= classify(name) %>();
      const deleteAction = new Delete<%= classify(name) %>ById({ id: entity.id });
      const failAction = new Delete<%= classify(name) %>ByIdFail({ error: 'fail' });

      actions = hot('a-', { a: deleteAction });
      service.deleteById.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.delete).toBeObservable(expected);
    });
  });

});
