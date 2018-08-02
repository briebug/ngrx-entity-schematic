import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { <%= classify(name) %> } from './<%= name %>.model';
import { <%= classify(name) %>SearchQuery } from './<%= name %>.reducer';

export enum <%= classify(name) %>ActionTypes {
  Insert<%= classify(name) %> = '[<%= classify(name) %>] Insert',
  Insert<%= classify(name) %>Success = '[<%= classify(name) %>] Insert Success',
  Insert<%= classify(name) %>Fail = '[<%= classify(name) %>] Insert Fail',

  SearchAll<%= classify(name) %>Entities = '[<%= classify(name) %>] Search',
  SearchAll<%= classify(name) %>EntitiesSuccess = '[<%= classify(name) %>] Search Success',
  SearchAll<%= classify(name) %>EntitiesFail = '[<%= classify(name) %>] Search Fail',

  Load<%= classify(name) %>ById = '[<%= classify(name) %>] Load By ID',
  Load<%= classify(name) %>ByIdSuccess = '[<%= classify(name) %>] Load Success',
  Load<%= classify(name) %>ByIdFail = '[<%= classify(name) %>] Load Fail',

  Update<%= classify(name) %> = '[<%= classify(name) %>] Update',
  Update<%= classify(name) %>Success = '[<%= classify(name) %>] Update Success',
  Update<%= classify(name) %>Fail = '[<%= classify(name) %>] Update Fail',

  Delete<%= classify(name) %>ById = '[<%= classify(name) %>] Delete By ID',
  Delete<%= classify(name) %>ByIdSuccess = '[<%= classify(name) %>] Delete Success',
  Delete<%= classify(name) %>ByIdFail = '[<%= classify(name) %>] Delete Fail',

  SetSearchQuery = '[<%= classify(name) %>] Set Search Query',
  Select<%= classify(name) %>ById = '[<%= classify(name) %>] Select By ID'
}

// ========================================= INSERT

export class Insert<%= classify(name) %> implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Insert<%= classify(name) %>;
  constructor(public payload: { <%= name %>: <%= classify(name) %> }) {}
}

export class Insert<%= classify(name) %>Success implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Insert<%= classify(name) %>Success;
  constructor(public payload: { result: <%= classify(name) %> }) {}
}

export class Insert<%= classify(name) %>Fail implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Insert<%= classify(name) %>Fail;
  constructor(public payload: { error: string }) {}
}

// ========================================= SEARCH

export class SearchAll<%= classify(name) %>Entities implements Action {
  readonly type = <%= classify(name) %>ActionTypes.SearchAll<%= classify(name) %>Entities;
}

export class SearchAll<%= classify(name) %>EntitiesSuccess implements Action {
  readonly type = <%= classify(name) %>ActionTypes.SearchAll<%= classify(name) %>EntitiesSuccess;
  constructor(public payload: { result: Array<<%= classify(name) %>> }) {}
}

export class SearchAll<%= classify(name) %>EntitiesFail implements Action {
  readonly type = <%= classify(name) %>ActionTypes.SearchAll<%= classify(name) %>EntitiesFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= LOAD BY ID

export class Load<%= classify(name) %>ById implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Load<%= classify(name) %>ById;
  constructor(public payload: { id: number }) {}
}

export class Load<%= classify(name) %>ByIdSuccess implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Load<%= classify(name) %>ByIdSuccess;
  constructor(public payload: { result: <%= classify(name) %> }) {}
}

export class Load<%= classify(name) %>ByIdFail implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Load<%= classify(name) %>ByIdFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= UPDATE

export class Update<%= classify(name) %> implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Update<%= classify(name) %>;
  constructor(public payload: { <%= name %>: <%= classify(name) %> }) {}
}

export class Update<%= classify(name) %>Success implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Update<%= classify(name) %>Success;
  constructor(public payload: { update: Update<<%= classify(name) %>> }) {}
}

export class Update<%= classify(name) %>Fail implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Update<%= classify(name) %>Fail;
  constructor(public payload: { error: string }) {}
}

// ========================================= DELETE

export class Delete<%= classify(name) %>ById implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Delete<%= classify(name) %>ById;
  constructor(public payload: { id: number }) {}
}

export class Delete<%= classify(name) %>ByIdSuccess implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Delete<%= classify(name) %>ByIdSuccess;
  constructor(public payload: { id: number }) {}
}

export class Delete<%= classify(name) %>ByIdFail implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Delete<%= classify(name) %>ByIdFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= QUERY

export class SetSearchQuery implements Action {
  readonly type = <%= classify(name) %>ActionTypes.SetSearchQuery;
  constructor(public payload: Partial<<%= classify(name) %>SearchQuery>) {}
}

// ========================================= SELECTED ID

export class Select<%= classify(name) %>ById implements Action {
  readonly type = <%= classify(name) %>ActionTypes.Select<%= classify(name) %>ById;
  constructor(public payload: { id: number }) {}
}

export type <%= classify(name) %>Actions =
  | Insert<%= classify(name) %>
  | Insert<%= classify(name) %>Success
  | Insert<%= classify(name) %>Fail
  | SearchAll<%= classify(name) %>Entities
  | SearchAll<%= classify(name) %>EntitiesSuccess
  | SearchAll<%= classify(name) %>EntitiesFail
  | Load<%= classify(name) %>ById
  | Load<%= classify(name) %>ByIdSuccess
  | Load<%= classify(name) %>ByIdFail
  | Update<%= classify(name) %>
  | Update<%= classify(name) %>Success
  | Update<%= classify(name) %>Fail
  | Delete<%= classify(name) %>ById
  | Delete<%= classify(name) %>ByIdSuccess
  | Delete<%= classify(name) %>ByIdFail
  | SetSearchQuery
  | Select<%= classify(name) %>ById;
