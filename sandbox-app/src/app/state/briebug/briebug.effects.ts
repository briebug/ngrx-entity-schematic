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
  SetSearchQuery,
  SelectBriebugById
} from './briebug.actions';
import { Briebug } from './briebug.model';
// TODO: Change this path when you move your service file:
import { BriebugService } from './briebug.service';

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

  // ========================================= SEARCH
  @Effect()
  search: Observable<Action> = this.actions$
    .ofType<SearchAllBriebugEntities>(BriebugActionTypes.SearchAllBriebugEntities)
    .pipe(
      // Use the state's filtering and pagination values in this search call
      // here if desired:
      exhaustMap(() =>
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

  // ========================================= QUERY
  @Effect({
    dispatch: false
  })
  paging: Observable<Action> = this.actions$
    .ofType<SetSearchQuery>(BriebugActionTypes.SetSearchQuery)
    .pipe(
      tap((action) => {
        // do stuff with: action.payload.limit & action.payload.page
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
