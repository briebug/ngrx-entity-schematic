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
import { Briebug } from './entity.model';
import { BriebugService } from '@core/services/entity.service';

@Injectable()
export class BriebugEffects {
  // ========================================= INSERT

  @Effect()
  insert: Observable<Action> = this.actions$
    .ofType<InsertBriebug>(BriebugActionTypes.InsertBriebug)
    .pipe(
      exhaustMap((action) =>
        this.service.create(action.payload.briebug).pipe(
          map((briebug: Briebug) => new InsertBriebugSuccess({ result: briebug })),
          catchError(({ message }) =>
            of(new InsertBriebugFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon insert success
  @Effect({
    dispatch: false
  })
  insertSuccess: Observable<Action> = this.actions$
    .ofType<InsertBriebugSuccess>(BriebugActionTypes.InsertBriebugSuccess)
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
    .ofType<InsertBriebugFail>(BriebugActionTypes.InsertBriebugFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= SEARCH

  @Effect()
  search: Observable<Action> = this.actions$
    .ofType<SearchAllBriebugEntities>(BriebugActionTypes.SearchAllBriebugEntities)
    .pipe(
      // Use the state's filtering and pagination values in this search call
      // here if desired:
      exhaustMap((action) =>
        this.service.search().pipe(
          map((entities: Array<Briebug>) =>
            new SearchAllBriebugEntitiesSuccess({ result: entities })
          ),
          catchError(({ message }) =>
            of(new SearchAllBriebugEntitiesFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon search success
  @Effect({
    dispatch: false
  })
  searchSuccess: Observable<Action> = this.actions$
    .ofType<SearchAllBriebugEntitiesSuccess>(BriebugActionTypes.SearchAllBriebugEntitiesSuccess)
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
    .ofType<SearchAllBriebugEntitiesFail>(BriebugActionTypes.SearchAllBriebugEntitiesFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= LOAD BY ID

  @Effect()
  loadById: Observable<Action> = this.actions$
    .ofType<LoadBriebugById>(BriebugActionTypes.LoadBriebugById)
    .pipe(
      switchMap((action) =>
        this.service.getById(action.payload.id).pipe(
          map((briebug: Briebug) => new LoadBriebugByIdSuccess({ result: briebug })
          ),
          catchError(({ message }) =>
            of(new LoadBriebugByIdFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon load by id success
  @Effect({
    dispatch: false
  })
  loadByIdSuccess: Observable<Action> = this.actions$
    .ofType<LoadBriebugByIdSuccess>(BriebugActionTypes.LoadBriebugByIdSuccess)
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
    .ofType<LoadBriebugByIdFail>(BriebugActionTypes.LoadBriebugByIdFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= UPDATE

  @Effect()
  update: Observable<Action> = this.actions$
    .ofType<UpdateBriebug>(BriebugActionTypes.UpdateBriebug)
    .pipe(
      exhaustMap((action) =>
        this.service.update(action.payload.briebug).pipe(
          map((briebug: Briebug) =>
            new UpdateBriebugSuccess({
              update: {
                id: briebug.id,
                changes: briebug
              } as Update<Briebug>
            })
          ),
          catchError(({ message }) =>
            of(new UpdateBriebugFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon update success
  @Effect({
    dispatch: false
  })
  updateSuccess: Observable<Action> = this.actions$
    .ofType<UpdateBriebugSuccess>(BriebugActionTypes.UpdateBriebugSuccess)
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
    .ofType<UpdateBriebugFail>(BriebugActionTypes.UpdateBriebugFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= DELETE

  @Effect()
  delete: Observable<Action> = this.actions$
    .ofType<DeleteBriebugById>(BriebugActionTypes.DeleteBriebugById)
    .pipe(
      exhaustMap((action) =>
        this.service.deleteById(action.payload.id).pipe(
          map((id: number) => new DeleteBriebugByIdSuccess({ id })),
          catchError(({ message }) =>
            of(new DeleteBriebugByIdFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon delete success
  @Effect({
    dispatch: false
  })
  deleteSuccess: Observable<Action> = this.actions$
    .ofType<UpdateBriebugSuccess>(BriebugActionTypes.UpdateBriebugSuccess)
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
    .ofType<DeleteBriebugByIdFail>(BriebugActionTypes.DeleteBriebugByIdFail)
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
    .ofType<SetBriebugPaging>(BriebugActionTypes.SetBriebugPaging)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.limit & action.payload.page
      })
    );

  @Effect({
    dispatch: false
  })
  filter: Observable<Action> = this.actions$
    .ofType<SetBriebugFilter>(BriebugActionTypes.SetBriebugFilter)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.filter
      })
    );

  @Effect({
    dispatch: false
  })
  sorting: Observable<Action> = this.actions$
    .ofType<SetBriebugSorting>(BriebugActionTypes.SetBriebugSorting)
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
    .ofType<SelectBriebugById>(BriebugActionTypes.SelectBriebugById)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.id
      })
    );

  constructor(private actions$: Actions, private service: BriebugService) {}
}
