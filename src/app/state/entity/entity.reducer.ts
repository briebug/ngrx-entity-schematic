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
    case EntityActionTypes.EntityInsert:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case EntityActionTypes.EntityInsertSuccess:
      return {
        ...adapter.addOne(action.payload.result, state),
        loading: false
      };
    case EntityActionTypes.EntityInsertFail:
      return {
        ...state,
        loading: false,
        error: 'Entity insert failed: ' + action.payload.error
      };

    case EntityActionTypes.EntitySearch:
    case EntityActionTypes.EntityLoadById:
      return {
        ...adapter.removeAll(state),
        loading: true,
        error: ''
      };
    case EntityActionTypes.EntitySearchSuccess:
      return {
        ...adapter.addAll(action.payload.result, state),
        loading: false,
        error: ''
      };
    case EntityActionTypes.EntitySearchFail:
      return {
        ...state,
        loading: false,
        error: 'Entity search failed: ' + action.payload.error
      };

    case EntityActionTypes.EntityLoadByIdSuccess:
      return {
        ...adapter.addOne(action.payload.result, state),
        loading: false,
        error: ''
      };
    case EntityActionTypes.EntityLoadByIdFail:
      return {
        ...state,
        loading: false,
        error: 'Entity load failed: ' + action.payload.error
      };

    case EntityActionTypes.EntityUpdate:
      return {
        ...adapter.updateOne(action.payload.entity, state),
        loading: true,
        error: ''
      };
    case EntityActionTypes.EntityUpdateSuccess:
      return {
        ...adapter.updateOne(action.payload.result, state),
        loading: false,
        error: ''
      };
    case EntityActionTypes.EntityUpdateFail:
      return {
        ...state,
        loading: false,
        error: 'Entity update failed: ' + action.payload.error
      };

    case EntityActionTypes.EntityDeleteById:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case EntityActionTypes.EntityDeleteSuccess:
      return {
        ...adapter.removeOne(action.payload.result.id, state),
        loading: false,
        error: ''
      };
    case EntityActionTypes.EntityDeleteFail:
      return {
        ...state,
        loading: false,
        error: 'Entity delete failed: ' + action.payload.error
      };

    case EntityActionTypes.EntitySetPaging:
    case EntityActionTypes.EntitySetFilter:
    case EntityActionTypes.EntitySetSorting:
      return {
        ...state,
        paging: {
          ...state.paging,
          ...action.payload
        }
      };

    case EntityActionTypes.EntitySelectById:
      return {
        ...state,
        selectedId: action.payload.id
      };

    default:
      return state;
  }
}

export const getSelectedId = (state: State) => state.selectedId;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
export const getPaging = (state: State) => state.paging;
