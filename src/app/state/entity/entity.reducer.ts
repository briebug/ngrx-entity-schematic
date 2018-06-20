import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Entity } from './entity.model';
import { EntityActions, EntityActionTypes } from './entity.actions';

export interface State extends EntityState<Entity> {
  // additional entities state properties
  selectedId: number;
  loading: boolean;
  error: string;
  paging: {
    filter: string;
    sorting: string;
    limit: number;
    page: number;
  };
}

export const adapter: EntityAdapter<Entity> = createEntityAdapter<Entity>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedId: null,
  loading: false,
  error: '',
  paging: {
    filter: '',
    sorting: '',
    limit: 999,
    page: 1
  }
});

export function reducer(state = initialState, action: EntityActions): State {
  switch (action.type) {
    case EntityActionTypes.InsertEntity:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case EntityActionTypes.InsertEntitySuccess:
      return {
        ...adapter.addOne(action.payload.result, state),
        loading: false
      };

    case EntityActionTypes.InsertEntityFail:
      return {
        ...state,
        loading: false,
        error: 'Entity insert failed: ' + action.payload.error
      };

    case EntityActionTypes.SearchAllEntityEntities:
      return {
        ...adapter.removeAll(state),
        loading: true,
        error: ''
      };

    case EntityActionTypes.LoadEntityById:
      return {
        ...adapter.removeAll(state),
        selectedId: action.payload.id,
        loading: true,
        error: ''
      };

    case EntityActionTypes.SearchAllEntityEntitiesSuccess:
      return {
        ...adapter.addAll(action.payload.result, state),
        loading: false,
        error: ''
      };

    case EntityActionTypes.SearchAllEntityEntitiesFail:
      return {
        ...state,
        loading: false,
        error: 'Entity search failed: ' + action.payload.error
      };

    case EntityActionTypes.LoadEntityByIdSuccess:
      return {
        ...adapter.addOne(action.payload.result, state),
        loading: false,
        error: ''
      };

    case EntityActionTypes.LoadEntityByIdFail:
      return {
        ...state,
        loading: false,
        error: 'Entity load failed: ' + action.payload.error
      };

    case EntityActionTypes.UpdateEntity:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case EntityActionTypes.UpdateEntitySuccess:
      return {
        ...adapter.updateOne(action.payload.update, state),
        loading: false,
        error: ''
      };

    case EntityActionTypes.UpdateEntityFail:
      return {
        ...state,
        loading: false,
        error: 'Entity update failed: ' + action.payload.error
      };

    case EntityActionTypes.DeleteEntityById:
      return {
        ...state,
        selectedId: action.payload.id,
        loading: true,
        error: ''
      };

    case EntityActionTypes.DeleteEntityByIdSuccess:
      return {
        ...adapter.removeOne(action.payload.result.id, state),
        loading: false,
        error: ''
      };

    case EntityActionTypes.DeleteEntityByIdFail:
      return {
        ...state,
        loading: false,
        error: 'Entity delete failed: ' + action.payload.error
      };

    case EntityActionTypes.SetEntityPaging:
    case EntityActionTypes.SetEntityFilter:
    case EntityActionTypes.SetEntitySorting:
      return {
        ...state,
        paging: {
          ...state.paging,
          ...action.payload
        }
      };

    case EntityActionTypes.SelectEntityById:
      return {
        ...state,
        selectedId: action.payload.id,
        error: ''
      };

    default:
      return state;
  }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getPaging = (state: State) => state.paging;
