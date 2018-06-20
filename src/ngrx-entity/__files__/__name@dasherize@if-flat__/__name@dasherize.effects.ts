import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import {
  exhaustMap,
  map,
  catchError,
  tap,
  switchMap
} from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import {
  <%= classify(name) %>ActionTypes,
  <%= classify(name) %>Insert,
  <%= classify(name) %>InsertSuccess,
  <%= classify(name) %>InsertFail,
  <%= classify(name) %>Search,
  <%= classify(name) %>SearchSuccess,
  <%= classify(name) %>SearchFail,
  <%= classify(name) %>LoadById,
  <%= classify(name) %>LoadByIdSuccess,
  <%= classify(name) %>LoadByIdFail,
  <%= classify(name) %>Update,
  <%= classify(name) %>UpdateSuccess,
  <%= classify(name) %>UpdateFail,
  <%= classify(name) %>DeleteById,
  <%= classify(name) %>DeleteSuccess,
  <%= classify(name) %>DeleteFail,
  <%= classify(name) %>SetPaging,
  <%= classify(name) %>SetFilter,
  <%= classify(name) %>SetSorting,
  <%= classify(name) %>SelectById
} from './entity.actions';
import { <%= classify(name) %> } from './entity.model';
import { <%= classify(name) %>Service } from '@core/services/entity.service';

@Injectable()
export class <%= classify(name) %>Effects {
  // ========================================= INSERT

  @Effect()
  insert: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>Insert>(<%= classify(name) %>ActionTypes.<%= classify(name) %>Insert)
    .pipe(
      exhaustMap((action) =>
        this.service.create(action.payload.entity).pipe(
          map((entity: <%= classify(name) %>) => new <%= classify(name) %>InsertSuccess({ result: entity })),
          catchError(({ message }) =>
            of(new <%= classify(name) %>InsertFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon insert success
  @Effect({
    dispatch: false
  })
  insertSuccess: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>InsertSuccess>(<%= classify(name) %>ActionTypes.<%= classify(name) %>InsertSuccess)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.result
      })
    );

  // remove this if you don't need to do anything upon insert fail
  @Effect({
    dispatch: false
  })
  insertFail: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>InsertFail>(<%= classify(name) %>ActionTypes.<%= classify(name) %>InsertFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= SEARCH

  @Effect()
  search: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>Search>(<%= classify(name) %>ActionTypes.<%= classify(name) %>Search)
    .pipe(
      // Use the state's filtering and pagination values in this search call
      // here if desired:
      exhaustMap((action) =>
        this.service.search().pipe(
          map((entities: <%= classify(name) %>[]) =>
            new <%= classify(name) %>SearchSuccess({ result: entities })
          ),
          catchError(({ message }) =>
            of(new <%= classify(name) %>SearchFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon search success
  @Effect({
    dispatch: false
  })
  searchSuccess: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>SearchSuccess>(<%= classify(name) %>ActionTypes.<%= classify(name) %>SearchSuccess)
    .pipe(
      tap((entities) => {
        // do stuff with action.payload.result
      })
    );

  // remove this if you don't need to do anything upon search fail
  @Effect({
    dispatch: false
  })
  searchFail: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>SearchFail>(<%= classify(name) %>ActionTypes.<%= classify(name) %>SearchFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= LOAD BY ID

  @Effect()
  loadById: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>LoadById>(<%= classify(name) %>ActionTypes.<%= classify(name) %>LoadById)
    .pipe(
      switchMap((action) =>
        this.service.getById(action.payload.id).pipe(
          map((entity: <%= classify(name) %>) => new <%= classify(name) %>LoadByIdSuccess({ result: entity })
          ),
          catchError(({ message }) =>
            of(new <%= classify(name) %>LoadByIdFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon load by id success
  @Effect({
    dispatch: false
  })
  loadByIdSuccess: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>LoadByIdSuccess>(<%= classify(name) %>ActionTypes.<%= classify(name) %>LoadByIdSuccess)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.result
      })
    );

  // remove this if you don't need to do anything upon load by id fail
  @Effect({
    dispatch: false
  })
  loadByIdFail: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>LoadByIdFail>(<%= classify(name) %>ActionTypes.<%= classify(name) %>LoadByIdFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= UPDATE

  @Effect()
  update: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>Update>(<%= classify(name) %>ActionTypes.<%= classify(name) %>Update)
    .pipe(
      exhaustMap((action) =>
        this.service.update(action.payload.entity).pipe(
          map((entity: <%= classify(name) %>) =>
            new <%= classify(name) %>UpdateSuccess({
              update: {
                id: entity.id,
                changes: entity
              } as Update<<%= classify(name) %>>
            })
          ),
          catchError(({ message }) =>
            of(new <%= classify(name) %>UpdateFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon update success
  @Effect({
    dispatch: false
  })
  updateSuccess: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>UpdateSuccess>(<%= classify(name) %>ActionTypes.<%= classify(name) %>UpdateSuccess)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.result
      })
    );

  // remove this if you don't need to do anything upon update fail
  @Effect({
    dispatch: false
  })
  updateFail: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>UpdateFail>(<%= classify(name) %>ActionTypes.<%= classify(name) %>UpdateFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= DELETE

  @Effect()
  delete: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>DeleteById>(<%= classify(name) %>ActionTypes.<%= classify(name) %>DeleteById)
    .pipe(
      exhaustMap((action) =>
        this.service.deleteById(action.payload.id).pipe(
          map((entity: <%= classify(name) %>) => new <%= classify(name) %>DeleteSuccess({ result: entity })),
          catchError(({ message }) =>
            of(new <%= classify(name) %>DeleteFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon delete success
  @Effect({
    dispatch: false
  })
  deleteSuccess: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>UpdateSuccess>(<%= classify(name) %>ActionTypes.<%= classify(name) %>UpdateSuccess)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.result
      })
    );

  // remove this if you don't need to do anything upon delete fail
  @Effect({
    dispatch: false
  })
  deleteFail: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>DeleteFail>(<%= classify(name) %>ActionTypes.<%= classify(name) %>DeleteFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= PAGING

  @Effect({
    dispatch: false
  })
  paging: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>SetPaging>(<%= classify(name) %>ActionTypes.<%= classify(name) %>SetPaging)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.limit & action.payload.page
      })
    );

  @Effect({
    dispatch: false
  })
  filter: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>SetFilter>(<%= classify(name) %>ActionTypes.<%= classify(name) %>SetFilter)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.filter
      })
    );

  @Effect({
    dispatch: false
  })
  sorting: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>SetSorting>(<%= classify(name) %>ActionTypes.<%= classify(name) %>SetSorting)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.sorting
      })
    );

  // ========================================= SELECTED ID

  @Effect({
    dispatch: false
  })
  selectedId: Observable<Action> = this.actions$
    .ofType<<%= classify(name) %>SelectById>(<%= classify(name) %>ActionTypes.<%= classify(name) %>SelectById)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.id
      })
    );

  constructor(private actions$: Actions, private service: <%= classify(name) %>Service) {}
}
