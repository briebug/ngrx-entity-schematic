import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { <%= classify(name) %> } from './entity.model';

export enum <%= classify(name) %>ActionTypes {
  <%= classify(name) %>Insert = '[<%= classify(name) %>] Insert',
  <%= classify(name) %>InsertSuccess = '[<%= classify(name) %>] Insert Success',
  <%= classify(name) %>InsertFail = '[<%= classify(name) %>] Insert Fail',

  <%= classify(name) %>Search = '[<%= classify(name) %>] Search',
  <%= classify(name) %>SearchSuccess = '[<%= classify(name) %>] Search Success',
  <%= classify(name) %>SearchFail = '[<%= classify(name) %>] Search Fail',

  <%= classify(name) %>LoadById = '[<%= classify(name) %>] Load By ID',
  <%= classify(name) %>LoadByIdSuccess = '[<%= classify(name) %>] Load Success',
  <%= classify(name) %>LoadByIdFail = '[<%= classify(name) %>] Load Fail',

  <%= classify(name) %>Update = '[<%= classify(name) %>] Update',
  <%= classify(name) %>UpdateSuccess = '[<%= classify(name) %>] Update Success',
  <%= classify(name) %>UpdateFail = '[<%= classify(name) %>] Update Fail',

  <%= classify(name) %>DeleteById = '[<%= classify(name) %>] Delete By ID',
  <%= classify(name) %>DeleteSuccess = '[<%= classify(name) %>] Delete Success',
  <%= classify(name) %>DeleteFail = '[<%= classify(name) %>] Delete Fail',

  <%= classify(name) %>SetPaging = '[<%= classify(name) %>] Set Paging',
  <%= classify(name) %>SetFilter = '[<%= classify(name) %>] Set Filter',
  <%= classify(name) %>SetSorting = '[<%= classify(name) %>] Set Sorting',

  <%= classify(name) %>SelectById = '[<%= classify(name) %>] Select By ID'
}

// ========================================= INSERT

export class <%= classify(name) %>Insert implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>Insert;
  constructor(public payload: { entity: <%= classify(name) %> }) {}
}

export class <%= classify(name) %>InsertSuccess implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>InsertSuccess;
  constructor(public payload: { result: <%= classify(name) %> }) {}
}

export class <%= classify(name) %>InsertFail implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>InsertFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= SEARCH

export class <%= classify(name) %>Search implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>Search;
}

export class <%= classify(name) %>SearchSuccess implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>SearchSuccess;
  constructor(public payload: { result: <%= classify(name) %>[] }) {}
}

export class <%= classify(name) %>SearchFail implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>SearchFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= LOAD BY ID

export class <%= classify(name) %>LoadById implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>LoadById;
  constructor(public payload: { id: number }) {}
}

export class <%= classify(name) %>LoadByIdSuccess implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>LoadByIdSuccess;
  constructor(public payload: { result: <%= classify(name) %> }) {}
}

export class <%= classify(name) %>LoadByIdFail implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>LoadByIdFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= UPDATE

export class <%= classify(name) %>Update implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>Update;
  constructor(public payload: { entity: <%= classify(name) %> }) {}
}

export class <%= classify(name) %>UpdateSuccess implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>UpdateSuccess;
  constructor(public payload: { update: Update<<%= classify(name) %>> }) {}
}

export class <%= classify(name) %>UpdateFail implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>UpdateFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= DELETE

export class <%= classify(name) %>DeleteById implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>DeleteById;
  constructor(public payload: { id: number }) {}
}

export class <%= classify(name) %>DeleteSuccess implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>DeleteSuccess;
  constructor(public payload: { result: <%= classify(name) %> }) {}
}

export class <%= classify(name) %>DeleteFail implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>DeleteFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= PAGING

export class <%= classify(name) %>SetPaging implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>SetPaging;
  constructor(public payload: { limit: number; page: number }) {}
}

export class <%= classify(name) %>SetFilter implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>SetFilter;
  constructor(public payload: { filter: string; }) {}
}

export class <%= classify(name) %>SetSorting implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>SetSorting;
  constructor(public payload: { sorting: string }) {}
}

// ========================================= SELECTED ID

export class <%= classify(name) %>SelectById implements Action {
  readonly type = <%= classify(name) %>ActionTypes.<%= classify(name) %>SelectById;
  constructor(public payload: { id: number }) {}
}

export type <%= classify(name) %>Actions =
  | <%= classify(name) %>Insert
  | <%= classify(name) %>InsertSuccess
  | <%= classify(name) %>InsertFail
  | <%= classify(name) %>Search
  | <%= classify(name) %>SearchSuccess
  | <%= classify(name) %>SearchFail
  | <%= classify(name) %>LoadById
  | <%= classify(name) %>LoadByIdSuccess
  | <%= classify(name) %>LoadByIdFail
  | <%= classify(name) %>Update
  | <%= classify(name) %>UpdateSuccess
  | <%= classify(name) %>UpdateFail
  | <%= classify(name) %>DeleteById
  | <%= classify(name) %>DeleteSuccess
  | <%= classify(name) %>DeleteFail
  | <%= classify(name) %>SetPaging
  | <%= classify(name) %>SetFilter
  | <%= classify(name) %>SetSorting
  | <%= classify(name) %>SelectById;
