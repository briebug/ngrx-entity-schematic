import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import {
  exhaustMap,
  map,
  catchError,
  tap,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';

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
import { Entity } from './entity.model';
import { EntityService } from '@core/services/entity.service';

@Injectable()
export class EntityEffects {
  // ========================================= INSERT

  @Effect()
  insert: Observable<Action> = this.actions$
    .ofType<EntityInsert>(EntityActionTypes.EntityInsert)
    .pipe(
      exhaustMap((action) => this.service.create(action.payload.entity)),
      map((entity: Entity) => new EntityInsertSuccess({ result: entity })),
      catchError((err) => of(new EntityInsertFail(err)))
    );

  // remove this if you don't need to do anything upon insert success
  @Effect({
    dispatch: false
  })
  insertSuccess: Observable<Action> = this.actions$
    .ofType<EntityInsertSuccess>(EntityActionTypes.EntityInsertSuccess)
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
    .ofType<EntityInsertFail>(EntityActionTypes.EntityInsertFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= SEARCH

  @Effect()
  search: Observable<Action> = this.actions$
    .ofType<EntitySearch>(EntityActionTypes.EntitySearch)
    .pipe(
      exhaustMap((action) => this.service.search()),
      map(
        (entities: Entity[]) => new EntitySearchSuccess({ result: entities })
      ),
      catchError((err) => of(new EntitySearchFail(err)))
    );

  // remove this if you don't need to do anything upon search success
  @Effect({
    dispatch: false
  })
  searchSuccess: Observable<Action> = this.actions$
    .ofType<EntitySearchSuccess>(EntityActionTypes.EntitySearchSuccess)
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
    .ofType<EntitySearchFail>(EntityActionTypes.EntitySearchFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= LOAD BY ID

  @Effect()
  loadById: Observable<Action> = this.actions$
    .ofType<EntityLoadById>(EntityActionTypes.EntityLoadById)
    .pipe(
      switchMap((action) => this.service.getById(action.payload.id)),
      map((entity: Entity) => new EntityLoadByIdSuccess({ result: entity })),
      catchError((err) => of(new EntityLoadByIdFail(err)))
    );

  // remove this if you don't need to do anything upon load by id success
  @Effect({
    dispatch: false
  })
  loadByIdSuccess: Observable<Action> = this.actions$
    .ofType<EntityLoadByIdSuccess>(EntityActionTypes.EntityLoadByIdSuccess)
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
    .ofType<EntityLoadByIdFail>(EntityActionTypes.EntityLoadByIdFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= UPDATE

  @Effect()
  update: Observable<Action> = this.actions$
    .ofType<EntityUpdate>(EntityActionTypes.EntityUpdate)
    .pipe(
      exhaustMap((action) => this.service.update(action.payload.entity)),
      map(
        (entity: Entity) =>
          new EntityUpdateSuccess({
            update: {
              id: entity.id,
              changes: entity
            } as Update<Entity>
          })
      ),
      catchError((err) => of(new EntityUpdateFail(err)))
    );

  // remove this if you don't need to do anything upon update success
  @Effect({
    dispatch: false
  })
  updateSuccess: Observable<Action> = this.actions$
    .ofType<EntityUpdateSuccess>(EntityActionTypes.EntityUpdateSuccess)
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
    .ofType<EntityUpdateFail>(EntityActionTypes.EntityUpdateFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= DELETE

  @Effect()
  delete: Observable<Action> = this.actions$
    .ofType<EntityDeleteById>(EntityActionTypes.EntityDeleteById)
    .pipe(
      exhaustMap((action) => this.service.deleteById(action.payload.id)),
      map((entity: Entity) => new EntityDeleteSuccess({ result: entity })),
      catchError((err) => of(new EntityDeleteFail(err)))
    );

  // remove this if you don't need to do anything upon delete success
  @Effect({
    dispatch: false
  })
  deleteSuccess: Observable<Action> = this.actions$
    .ofType<EntityUpdateSuccess>(EntityActionTypes.EntityUpdateSuccess)
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
    .ofType<EntityDeleteFail>(EntityActionTypes.EntityDeleteFail)
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
    .ofType<EntitySetPaging>(EntityActionTypes.EntitySetPaging)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.limit & action.payload.page
      })
    );

  @Effect({
    dispatch: false
  })
  filter: Observable<Action> = this.actions$
    .ofType<EntitySetFilter>(EntityActionTypes.EntitySetFilter)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.filter
      })
    );

  @Effect({
    dispatch: false
  })
  sorting: Observable<Action> = this.actions$
    .ofType<EntitySetSorting>(EntityActionTypes.EntitySetSorting)
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
    .ofType<EntitySelectById>(EntityActionTypes.EntitySelectById)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.id
      })
    );

  constructor(private actions$: Actions, private service: EntityService) {}
}
