import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import {
  exhaustMap,
  map,
  catchError,
  tap,
  switchMap
} from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import {
  <%= classify(name) %>ActionTypes,
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
  Delete<%= classify(name) %>ByIdFail,
  SetSearchQuery,
  Select<%= classify(name) %>ById
} from './<%= dasherize(name) %>.actions';
import { <%= classify(name) %> } from './<%= dasherize(name) %>.model';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';

@Injectable()
export class <%= classify(name) %>Effects {

  // ========================================= INSERT
  @Effect()
  insert: Observable<Action> = this.actions$
    .pipe(
      ofType<Insert<%= classify(name) %>>(<%= classify(name) %>ActionTypes.Insert<%= classify(name) %>),
      exhaustMap((action) =>
        this.service.create(action.payload.<%= name %>).pipe(
          map((<%= name %>: <%= classify(name) %>) => new Insert<%= classify(name) %>Success({ result: <%= name %> })),
          catchError(({ message }) =>
            of(new Insert<%= classify(name) %>Fail({ error: message }))
          )
        )
      )
    );

  // ========================================= SEARCH
  @Effect()
  search: Observable<Action> = this.actions$
  .pipe(
      ofType<SearchAll<%= classify(name) %>Entities>(<%= classify(name) %>ActionTypes.SearchAll<%= classify(name) %>Entities),
      // Use the state's filtering and pagination values in this search call
      // here if desired:
      exhaustMap(() =>
        this.service.search().pipe(
          map((entities: Array<<%= classify(name) %>>) =>
            new SearchAll<%= classify(name) %>EntitiesSuccess({ result: entities })
          ),
          catchError(({ message }) =>
            of(new SearchAll<%= classify(name) %>EntitiesFail({ error: message }))
          )
        )
      )
    );

  // ========================================= LOAD BY ID
  @Effect()
  loadById: Observable<Action> = this.actions$
  .pipe(
      ofType<Load<%= classify(name) %>ById>(<%= classify(name) %>ActionTypes.Load<%= classify(name) %>ById),
      switchMap((action) =>
        this.service.getById(action.payload.id).pipe(
          map((<%= name %>: <%= classify(name) %>) => new Load<%= classify(name) %>ByIdSuccess({ result: <%= name %> })
          ),
          catchError(({ message }) =>
            of(new Load<%= classify(name) %>ByIdFail({ error: message }))
          )
        )
      )
    );

  // ========================================= UPDATE
  @Effect()
  update: Observable<Action> = this.actions$
  .pipe(
      ofType<Update<%= classify(name) %>>(<%= classify(name) %>ActionTypes.Update<%= classify(name) %>),
      exhaustMap((action) =>
        this.service.update(action.payload.<%= name %>).pipe(
          map((<%= name %>: <%= classify(name) %>) =>
            new Update<%= classify(name) %>Success({
              update: {
                id: <%= name %>.id,
                changes: <%= name %>
              } as Update<<%= classify(name) %>>
            })
          ),
          catchError(({ message }) =>
            of(new Update<%= classify(name) %>Fail({ error: message }))
          )
        )
      )
    );

  // ========================================= DELETE
  @Effect()
  delete: Observable<Action> = this.actions$
  .pipe(
      ofType<Delete<%= classify(name) %>ById>(<%= classify(name) %>ActionTypes.Delete<%= classify(name) %>ById),
      exhaustMap((action) =>
        this.service.deleteById(action.payload.id).pipe(
          map((id: number) => new Delete<%= classify(name) %>ByIdSuccess({ id })),
          catchError(({ message }) =>
            of(new Delete<%= classify(name) %>ByIdFail({ error: message }))
          )
        )
      )
    );

  // ========================================= QUERY
  @Effect({
    dispatch: false
  })
  paging: Observable<Action> = this.actions$
  .pipe(
      ofType<SetSearchQuery>(<%= classify(name) %>ActionTypes.SetSearchQuery),
      tap((action) => {
        // do stuff with: action.payload.limit & action.payload.page
      })
    );

  // ========================================= SELECTED ID
  @Effect({
    dispatch: false
  })
  selectedId: Observable<Action> = this.actions$
  .pipe(
      ofType<Select<%= classify(name) %>ById>(<%= classify(name) %>ActionTypes.Select<%= classify(name) %>ById),
      tap((action) => {
        // do stuff with: action.payload.id
      })
    );

  constructor(private actions$: Actions, private service: <%= classify(name) %>Service) {}
}
