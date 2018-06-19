import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Entity } from './entity.model';

export enum EntityActionTypes {
  EntityInsert = '[Entity] Insert',
  EntityInsertSuccess = '[Entity] Insert Success',
  EntityInsertFail = '[Entity] Insert Fail',

  EntitySearch = '[Entity] Search',
  EntitySearchSuccess = '[Entity] Search Success',
  EntitySearchFail = '[Entity] Search Fail',

  EntityLoadById = '[Entity] Load By ID',
  EntityLoadByIdSuccess = '[Entity] Load Success',
  EntityLoadByIdFail = '[Entity] Load Fail',

  EntityUpdate = '[Entity] Update',
  EntityUpdateSuccess = '[Entity] Update Success',
  EntityUpdateFail = '[Entity] Update Fail',

  EntityDeleteById = '[Entity] Delete By ID',
  EntityDeleteSuccess = '[Entity] Delete Success',
  EntityDeleteFail = '[Entity] Delete Fail',

  EntitySetPaging = '[Entity] Set Paging',
  EntitySetFilter = '[Entity] Set Filter',
  EntitySetSorting = '[Entity] Set Sorting',

  EntitySelectById = '[Entity] Select By ID'
}

// ========================================= INSERT

export class EntityInsert implements Action {
  readonly type = EntityActionTypes.EntityInsert;
  constructor(public payload: { entity: Entity }) {}
}

export class EntityInsertSuccess implements Action {
  readonly type = EntityActionTypes.EntityInsertSuccess;
  constructor(public payload: { result: Entity }) {}
}

export class EntityInsertFail implements Action {
  readonly type = EntityActionTypes.EntityInsertFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= SEARCH

export class EntitySearch implements Action {
  readonly type = EntityActionTypes.EntitySearch;
}

export class EntitySearchSuccess implements Action {
  readonly type = EntityActionTypes.EntitySearchSuccess;
  constructor(public payload: { result: Entity[] }) {}
}

export class EntitySearchFail implements Action {
  readonly type = EntityActionTypes.EntitySearchFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= LOAD BY ID

export class EntityLoadById implements Action {
  readonly type = EntityActionTypes.EntityLoadById;
  constructor(public payload: { id: number }) {}
}

export class EntityLoadByIdSuccess implements Action {
  readonly type = EntityActionTypes.EntityLoadByIdSuccess;
  constructor(public payload: { result: Entity }) {}
}

export class EntityLoadByIdFail implements Action {
  readonly type = EntityActionTypes.EntityLoadByIdFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= UPDATE

export class EntityUpdate implements Action {
  readonly type = EntityActionTypes.EntityUpdate;
  constructor(public payload: { entity: Entity }) {}
}

export class EntityUpdateSuccess implements Action {
  readonly type = EntityActionTypes.EntityUpdateSuccess;
  constructor(public payload: { update: Update<Entity> }) {}
}

export class EntityUpdateFail implements Action {
  readonly type = EntityActionTypes.EntityUpdateFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= DELETE

export class EntityDeleteById implements Action {
  readonly type = EntityActionTypes.EntityDeleteById;
  constructor(public payload: { id: number }) {}
}

export class EntityDeleteSuccess implements Action {
  readonly type = EntityActionTypes.EntityDeleteSuccess;
  constructor(public payload: { result: Entity }) {}
}

export class EntityDeleteFail implements Action {
  readonly type = EntityActionTypes.EntityDeleteFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= PAGING

export class EntitySetPaging implements Action {
  readonly type = EntityActionTypes.EntitySetPaging;
  constructor(public payload: { limit: number; page: number }) {}
}

export class EntitySetFilter implements Action {
  readonly type = EntityActionTypes.EntitySetFilter;
  constructor(public payload: { filter: string; }) {}
}

export class EntitySetSorting implements Action {
  readonly type = EntityActionTypes.EntitySetSorting;
  constructor(public payload: { sorting: string }) {}
}

// ========================================= SELECTED ID

export class EntitySelectById implements Action {
  readonly type = EntityActionTypes.EntitySelectById;
  constructor(public payload: { id: number }) {}
}

export type EntityActions =
  | EntityInsert
  | EntityInsertSuccess
  | EntityInsertFail
  | EntitySearch
  | EntitySearchSuccess
  | EntitySearchFail
  | EntityLoadById
  | EntityLoadByIdSuccess
  | EntityLoadByIdFail
  | EntityUpdate
  | EntityUpdateSuccess
  | EntityUpdateFail
  | EntityDeleteById
  | EntityDeleteSuccess
  | EntityDeleteFail
  | EntitySetPaging
  | EntitySetFilter
  | EntitySetSorting
  | EntitySelectById;
