import { Action } from '@ngrx/store'; // TODO
import { Update as UpdateEntity } from '@ngrx/entity'; // TODO
import { Entity } from './entity.model'; // TODO

export enum EntityActionTypes {
  EntityInsert = '[Entity] Insert',
  EntityInsertSuccess = '[Entity] Insert Success',
  EntityInsertFail = '[Entity] Insert Fail',

  EntitySearch = '[Entity] Search',
  EntitySearchSuccess = '[Entity] Search Success',
  EntitySearchFail = '[Entity] Search Fail',
  EntityLoadById = '[Entity] Load',
  EntityLoadByIdSuccess = '[Entity] Load Success',
  EntityLoadByIdFail = '[Entity] Load Fail',

  EntityUpdate = '[Entity] Update',
  EntityUpdateSuccess = '[Entity] Update Success',
  EntityUpdateFail = '[Entity] Update Fail',

  EntityDelete = '[Entity] Delete',
  EntityDeleteSuccess = '[Entity] Delete Success',
  EntityDeleteFail = '[Entity] Delete Fail',

  EntitySetPaging = '[Entity] SetPaging',
  EntitySelect = '[Entity] Select'
}

// Create

export class EntityInsert implements Action {
  readonly type = EntityActionTypes.EntityInsert;
  constructor(public payload: { data: Entity }) {}
}

export class EntityInsertSuccess implements Action {
  readonly type = EntityActionTypes.EntityInsertSuccess;
  constructor(public payload: { result: Entity }) {}
}

export class EntityInsertFail implements Action {
  readonly type = EntityActionTypes.EntityInsertFail;
}

// Retrieve

export class EntitySearch implements Action {
  readonly type = EntityActionTypes.EntitySearch;
}

export class EntitySearchSuccess implements Action {
  readonly type = EntityActionTypes.EntitySearchSuccess;
  constructor(public payload: { result: Entity[] }) {}
}

export class EntitySearchFail implements Action {
  readonly type = EntityActionTypes.EntitySearchFail;
}

export class EntityLoadById implements Action {
  readonly type = EntityActionTypes.EntityLoadById;
  constructor(public payload: {}) {}
}

export class EntityLoadByIdSuccess implements Action {
  readonly type = EntityActionTypes.EntityLoadByIdSuccess;
  constructor(public payload: { result: Entity }) {}
}

export class EntityLoadByIdFail implements Action {
  readonly type = EntityActionTypes.EntityLoadByIdFail;
}

// Update

export class EntityUpdate implements Action {
  readonly type = EntityActionTypes.EntityUpdate;
  constructor(public payload: { entity: UpdateEntity<Entity> }) {}
}

export class EntityUpdateSuccess implements Action {
  readonly type = EntityActionTypes.EntityUpdateSuccess;
  constructor(public payload: { result: Entity }) {}
}

export class EntityUpdateFail implements Action {
  readonly type = EntityActionTypes.EntityUpdateFail;
}

// Delete

export class EntityDelete implements Action {
  readonly type = EntityActionTypes.EntityDelete;
  constructor(public payload: {}) {}
}

export class EntityDeleteSuccess implements Action {
  readonly type = EntityActionTypes.EntityDeleteSuccess;
  constructor(public payload: { result: Entity }) {}
}

export class EntityDeleteFail implements Action {
  readonly type = EntityActionTypes.EntityDeleteFail;
}

// Utility

export class EntitySetPaging implements Action {
  // TODO: Paging interface
  readonly type = EntityActionTypes.EntitySetPaging;
  constructor(public payload: { limit: Number; page: Number }) {}
}

export class EntitySelect implements Action {
  readonly type = EntityActionTypes.EntitySelect;
  constructor(public payload: { id: Number }) {}
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
  | EntityDelete
  | EntityDeleteSuccess
  | EntityDeleteFail
  | EntitySetPaging
  | EntitySelect;
