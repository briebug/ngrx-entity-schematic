import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Briebug } from './briebug.model';
import { BriebugSearchQuery } from './briebug.reducer';

export enum BriebugActionTypes {
  InsertBriebug = '[Briebug] Insert',
  InsertBriebugSuccess = '[Briebug] Insert Success',
  InsertBriebugFail = '[Briebug] Insert Fail',

  SearchAllBriebugEntities = '[Briebug] Search',
  SearchAllBriebugEntitiesSuccess = '[Briebug] Search Success',
  SearchAllBriebugEntitiesFail = '[Briebug] Search Fail',

  LoadBriebugById = '[Briebug] Load By ID',
  LoadBriebugByIdSuccess = '[Briebug] Load Success',
  LoadBriebugByIdFail = '[Briebug] Load Fail',

  UpdateBriebug = '[Briebug] Update',
  UpdateBriebugSuccess = '[Briebug] Update Success',
  UpdateBriebugFail = '[Briebug] Update Fail',

  DeleteBriebugById = '[Briebug] Delete By ID',
  DeleteBriebugByIdSuccess = '[Briebug] Delete Success',
  DeleteBriebugByIdFail = '[Briebug] Delete Fail',

  SetSearchQuery = '[Briebug] Set Search Query',
  SelectBriebugById = '[Briebug] Select By ID'
}

// ========================================= INSERT

export class InsertBriebug implements Action {
  readonly type = BriebugActionTypes.InsertBriebug;
  constructor(public payload: { briebug: Briebug }) {}
}

export class InsertBriebugSuccess implements Action {
  readonly type = BriebugActionTypes.InsertBriebugSuccess;
  constructor(public payload: { result: Briebug }) {}
}

export class InsertBriebugFail implements Action {
  readonly type = BriebugActionTypes.InsertBriebugFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= SEARCH

export class SearchAllBriebugEntities implements Action {
  readonly type = BriebugActionTypes.SearchAllBriebugEntities;
}

export class SearchAllBriebugEntitiesSuccess implements Action {
  readonly type = BriebugActionTypes.SearchAllBriebugEntitiesSuccess;
  constructor(public payload: { result: Array<Briebug> }) {}
}

export class SearchAllBriebugEntitiesFail implements Action {
  readonly type = BriebugActionTypes.SearchAllBriebugEntitiesFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= LOAD BY ID

export class LoadBriebugById implements Action {
  readonly type = BriebugActionTypes.LoadBriebugById;
  constructor(public payload: { id: number }) {}
}

export class LoadBriebugByIdSuccess implements Action {
  readonly type = BriebugActionTypes.LoadBriebugByIdSuccess;
  constructor(public payload: { result: Briebug }) {}
}

export class LoadBriebugByIdFail implements Action {
  readonly type = BriebugActionTypes.LoadBriebugByIdFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= UPDATE

export class UpdateBriebug implements Action {
  readonly type = BriebugActionTypes.UpdateBriebug;
  constructor(public payload: { briebug: Briebug }) {}
}

export class UpdateBriebugSuccess implements Action {
  readonly type = BriebugActionTypes.UpdateBriebugSuccess;
  constructor(public payload: { update: Update<Briebug> }) {}
}

export class UpdateBriebugFail implements Action {
  readonly type = BriebugActionTypes.UpdateBriebugFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= DELETE

export class DeleteBriebugById implements Action {
  readonly type = BriebugActionTypes.DeleteBriebugById;
  constructor(public payload: { id: number }) {}
}

export class DeleteBriebugByIdSuccess implements Action {
  readonly type = BriebugActionTypes.DeleteBriebugByIdSuccess;
  constructor(public payload: { id: number }) {}
}

export class DeleteBriebugByIdFail implements Action {
  readonly type = BriebugActionTypes.DeleteBriebugByIdFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= QUERY

export class SetSearchQuery implements Action {
  readonly type = BriebugActionTypes.SetSearchQuery;
  constructor(public payload: Partial<BriebugSearchQuery>) {}
}

// ========================================= SELECTED ID

export class SelectBriebugById implements Action {
  readonly type = BriebugActionTypes.SelectBriebugById;
  constructor(public payload: { id: number }) {}
}

export type BriebugActions =
  | InsertBriebug
  | InsertBriebugSuccess
  | InsertBriebugFail
  | SearchAllBriebugEntities
  | SearchAllBriebugEntitiesSuccess
  | SearchAllBriebugEntitiesFail
  | LoadBriebugById
  | LoadBriebugByIdSuccess
  | LoadBriebugByIdFail
  | UpdateBriebug
  | UpdateBriebugSuccess
  | UpdateBriebugFail
  | DeleteBriebugById
  | DeleteBriebugByIdSuccess
  | DeleteBriebugByIdFail
  | SetSearchQuery
  | SelectBriebugById;
