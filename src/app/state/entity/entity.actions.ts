import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Entity } from './entity.model';

export enum EntityActionTypes {
  InsertEntity = '[Entity] Insert',
  InsertEntitySuccess = '[Entity] Insert Success',
  InsertEntityFail = '[Entity] Insert Fail',

  SearchAllEntityEntities = '[Entity] Search',
  SearchAllEntityEntitiesSuccess = '[Entity] Search Success',
  SearchAllEntityEntitiesFail = '[Entity] Search Fail',

  LoadEntityById = '[Entity] Load By ID',
  LoadEntityByIdSuccess = '[Entity] Load Success',
  LoadEntityByIdFail = '[Entity] Load Fail',

  UpdateEntity = '[Entity] Update',
  UpdateEntitySuccess = '[Entity] Update Success',
  UpdateEntityFail = '[Entity] Update Fail',

  DeleteEntityById = '[Entity] Delete By ID',
  DeleteEntityByIdSuccess = '[Entity] Delete Success',
  DeleteEntityByIdFail = '[Entity] Delete Fail',

  SetEntityPaging = '[Entity] Set Paging',
  SetEntityFilter = '[Entity] Set Filter',
  SetEntitySorting = '[Entity] Set Sorting',

  SelectEntityById = '[Entity] Select By ID'
}

// ========================================= INSERT

export class InsertEntity implements Action {
  readonly type = EntityActionTypes.InsertEntity;
  constructor(public payload: { entity: Entity }) {}
}

export class InsertEntitySuccess implements Action {
  readonly type = EntityActionTypes.InsertEntitySuccess;
  constructor(public payload: { result: Entity }) {}
}

export class InsertEntityFail implements Action {
  readonly type = EntityActionTypes.InsertEntityFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= SEARCH

export class SearchAllEntityEntities implements Action {
  readonly type = EntityActionTypes.SearchAllEntityEntities;
}

export class SearchAllEntityEntitiesSuccess implements Action {
  readonly type = EntityActionTypes.SearchAllEntityEntitiesSuccess;
  constructor(public payload: { result: Entity[] }) {}
}

export class SearchAllEntityEntitiesFail implements Action {
  readonly type = EntityActionTypes.SearchAllEntityEntitiesFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= LOAD BY ID

export class LoadEntityById implements Action {
  readonly type = EntityActionTypes.LoadEntityById;
  constructor(public payload: { id: number }) {}
}

export class LoadEntityByIdSuccess implements Action {
  readonly type = EntityActionTypes.LoadEntityByIdSuccess;
  constructor(public payload: { result: Entity }) {}
}

export class LoadEntityByIdFail implements Action {
  readonly type = EntityActionTypes.LoadEntityByIdFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= UPDATE

export class UpdateEntity implements Action {
  readonly type = EntityActionTypes.UpdateEntity;
  constructor(public payload: { entity: Entity }) {}
}

export class UpdateEntitySuccess implements Action {
  readonly type = EntityActionTypes.UpdateEntitySuccess;
  constructor(public payload: { update: Update<Entity> }) {}
}

export class UpdateEntityFail implements Action {
  readonly type = EntityActionTypes.UpdateEntityFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= DELETE

export class DeleteEntityById implements Action {
  readonly type = EntityActionTypes.DeleteEntityById;
  constructor(public payload: { id: number }) {}
}

export class DeleteEntityByIdSuccess implements Action {
  readonly type = EntityActionTypes.DeleteEntityByIdSuccess;
  constructor(public payload: { result: Entity }) {}
}

export class DeleteEntityByIdFail implements Action {
  readonly type = EntityActionTypes.DeleteEntityByIdFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= PAGING

export class SetEntityPaging implements Action {
  readonly type = EntityActionTypes.SetEntityPaging;
  constructor(public payload: { limit: number; page: number }) {}
}

export class SetEntityFilter implements Action {
  readonly type = EntityActionTypes.SetEntityFilter;
  constructor(public payload: { filter: string; }) {}
}

export class SetEntitySorting implements Action {
  readonly type = EntityActionTypes.SetEntitySorting;
  constructor(public payload: { sorting: string }) {}
}

// ========================================= SELECTED ID

export class SelectEntityById implements Action {
  readonly type = EntityActionTypes.SelectEntityById;
  constructor(public payload: { id: number }) {}
}

export type EntityActions =
  | InsertEntity
  | InsertEntitySuccess
  | InsertEntityFail
  | SearchAllEntityEntities
  | SearchAllEntityEntitiesSuccess
  | SearchAllEntityEntitiesFail
  | LoadEntityById
  | LoadEntityByIdSuccess
  | LoadEntityByIdFail
  | UpdateEntity
  | UpdateEntitySuccess
  | UpdateEntityFail
  | DeleteEntityById
  | DeleteEntityByIdSuccess
  | DeleteEntityByIdFail
  | SetEntityPaging
  | SetEntityFilter
  | SetEntitySorting
  | SelectEntityById;
