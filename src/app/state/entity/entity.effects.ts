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
import { Entity } from './entity.model';
import { EntityService } from '@core/services/entity.service';

@Injectable()
export class EntityEffects {
  // ========================================= INSERT

  @Effect()
  insert: Observable<Action> = this.actions$
    .ofType<InsertEntity>(EntityActionTypes.InsertEntity)
    .pipe(
      exhaustMap((action) =>
        this.service.create(action.payload.entity).pipe(
          map((entity: Entity) => new InsertEntitySuccess({ result: entity })),
          catchError(({ message }) =>
            of(new InsertEntityFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon insert success
  @Effect({
    dispatch: false
  })
  insertSuccess: Observable<Action> = this.actions$
    .ofType<InsertEntitySuccess>(EntityActionTypes.InsertEntitySuccess)
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
    .ofType<InsertEntityFail>(EntityActionTypes.InsertEntityFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= SEARCH

  @Effect()
  search: Observable<Action> = this.actions$
    .ofType<SearchAllEntityEntities>(EntityActionTypes.SearchAllEntityEntities)
    .pipe(
      // Use the state's filtering and pagination values in this search call
      // here if desired:
      exhaustMap(() =>
        this.service.search().pipe(
          map((entities: Entity[]) =>
            new SearchAllEntityEntitiesSuccess({ result: entities })
          ),
          catchError(({ message }) =>
            of(new SearchAllEntityEntitiesFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon search success
  @Effect({
    dispatch: false
  })
  searchSuccess: Observable<Action> = this.actions$
    .ofType<SearchAllEntityEntitiesSuccess>(EntityActionTypes.SearchAllEntityEntitiesSuccess)
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
    .ofType<SearchAllEntityEntitiesFail>(EntityActionTypes.SearchAllEntityEntitiesFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= LOAD BY ID

  @Effect()
  loadById: Observable<Action> = this.actions$
    .ofType<LoadEntityById>(EntityActionTypes.LoadEntityById)
    .pipe(
      switchMap((action) =>
        this.service.getById(action.payload.id).pipe(
          map((entity: Entity) => new LoadEntityByIdSuccess({ result: entity })
          ),
          catchError(({ message }) =>
            of(new LoadEntityByIdFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon load by id success
  @Effect({
    dispatch: false
  })
  loadByIdSuccess: Observable<Action> = this.actions$
    .ofType<LoadEntityByIdSuccess>(EntityActionTypes.LoadEntityByIdSuccess)
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
    .ofType<LoadEntityByIdFail>(EntityActionTypes.LoadEntityByIdFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= UPDATE

  @Effect()
  update: Observable<Action> = this.actions$
    .ofType<UpdateEntity>(EntityActionTypes.UpdateEntity)
    .pipe(
      exhaustMap((action) =>
        this.service.update(action.payload.entity).pipe(
          map((entity: Entity) =>
            new UpdateEntitySuccess({
              update: {
                id: entity.id,
                changes: entity
              } as Update<Entity>
            })
          ),
          catchError(({ message }) =>
            of(new UpdateEntityFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon update success
  @Effect({
    dispatch: false
  })
  updateSuccess: Observable<Action> = this.actions$
    .ofType<UpdateEntitySuccess>(EntityActionTypes.UpdateEntitySuccess)
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
    .ofType<UpdateEntityFail>(EntityActionTypes.UpdateEntityFail)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.error
      })
    );

  // ========================================= DELETE

  @Effect()
  delete: Observable<Action> = this.actions$
    .ofType<DeleteEntityById>(EntityActionTypes.DeleteEntityById)
    .pipe(
      exhaustMap((action) =>
        this.service.deleteById(action.payload.id).pipe(
          map((entity: Entity) => new DeleteEntityByIdSuccess({ result: entity })),
          catchError(({ message }) =>
            of(new DeleteEntityByIdFail({ error: message }))
          )
        )
      )
    );

  // remove this if you don't need to do anything upon delete success
  @Effect({
    dispatch: false
  })
  deleteSuccess: Observable<Action> = this.actions$
    .ofType<UpdateEntitySuccess>(EntityActionTypes.UpdateEntitySuccess)
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
    .ofType<DeleteEntityByIdFail>(EntityActionTypes.DeleteEntityByIdFail)
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
    .ofType<SetEntityPaging>(EntityActionTypes.SetEntityPaging)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.limit & action.payload.page
      })
    );

  @Effect({
    dispatch: false
  })
  filter: Observable<Action> = this.actions$
    .ofType<SetEntityFilter>(EntityActionTypes.SetEntityFilter)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.filter
      })
    );

  @Effect({
    dispatch: false
  })
  sorting: Observable<Action> = this.actions$
    .ofType<SetEntitySorting>(EntityActionTypes.SetEntitySorting)
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
    .ofType<SelectEntityById>(EntityActionTypes.SelectEntityById)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.id
      })
    );

  constructor(private actions$: Actions, private service: EntityService) {}
}
