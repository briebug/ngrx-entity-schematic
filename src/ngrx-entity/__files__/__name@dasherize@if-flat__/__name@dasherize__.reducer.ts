import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { <%= classify(name) %> } from './<%= dasherize(name) %>.model';
import { <%= classify(name) %>Actions, <%= classify(name) %>ActionTypes } from './<%= dasherize(name) %>.actions';

export interface <%= classify(name) %>SearchQuery {
  filter: string;
  sorting: string;
  limit: number;
  page: number;
}

export interface <%= classify(name) %>State extends EntityState<<%= classify(name) %>> {
  // additional entities state properties
  selectedId: number;
  loading: boolean;
  error: string;
  query: <%= classify(name) %>SearchQuery;
}

export const adapter: EntityAdapter<<%= classify(name) %>> = createEntityAdapter<<%= classify(name) %>>();

export const initialState: <%= classify(name) %>State = adapter.getInitialState({
  // additional <%= name %> state properties
  selectedId: null,
  loading: false,
  error: '',
  query: {
    filter: '',
    sorting: '',
    limit: 999,
    page: 1
  }
});

export function <%= name %>Reducer(state = initialState, action: <%= classify(name) %>Actions): <%= classify(name) %>State {
  switch (action.type) {
    case <%= classify(name) %>ActionTypes.Insert<%= classify(name) %>:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.Insert<%= classify(name) %>Success:
      return {
        ...adapter.addOne(action.payload.result, state),
        loading: false,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.Insert<%= classify(name) %>Fail:
      return {
        ...state,
        loading: false,
        error: '<%= classify(name) %> insert failed: ' + action.payload.error
      };

    case <%= classify(name) %>ActionTypes.SearchAll<%= classify(name) %>Entities:
      return {
        ...adapter.removeAll(state),
        loading: true,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.SearchAll<%= classify(name) %>EntitiesSuccess:
      return {
        ...adapter.addAll(action.payload.result, state),
        loading: false,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.SearchAll<%= classify(name) %>EntitiesFail:
      return {
        ...state,
        loading: false,
        error: '<%= classify(name) %> search failed: ' + action.payload.error
      };

    case <%= classify(name) %>ActionTypes.Load<%= classify(name) %>ById:
      return {
        ...adapter.removeAll(state),
        selectedId: action.payload.id,
        loading: true,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.Load<%= classify(name) %>ByIdSuccess:
      return {
        ...adapter.addOne(action.payload.result, state),
        loading: false,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.Load<%= classify(name) %>ByIdFail:
      return {
        ...state,
        loading: false,
        error: '<%= classify(name) %> load failed: ' + action.payload.error
      };

    case <%= classify(name) %>ActionTypes.Update<%= classify(name) %>:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.Update<%= classify(name) %>Success:
      return {
        ...adapter.updateOne(action.payload.update, state),
        loading: false,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.Update<%= classify(name) %>Fail:
      return {
        ...state,
        loading: false,
        error: '<%= classify(name) %> update failed: ' + action.payload.error
      };

    case <%= classify(name) %>ActionTypes.Delete<%= classify(name) %>ById:
      return {
        ...state,
        selectedId: action.payload.id,
        loading: true,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.Delete<%= classify(name) %>ByIdSuccess:
      return {
        ...adapter.removeOne(action.payload.id, state),
        loading: false,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.Delete<%= classify(name) %>ByIdFail:
      return {
        ...state,
        loading: false,
        error: '<%= classify(name) %> delete failed: ' + action.payload.error
      };

    case <%= classify(name) %>ActionTypes.SetSearchQuery:
      return {
        ...state,
        query: {
          ...state.query,
          ...action.payload
        }
      };

    case <%= classify(name) %>ActionTypes.Select<%= classify(name) %>ById:
      return {
        ...state,
        selectedId: action.payload.id,
        error: ''
      };

    default:
      return state;
  }
}

export const getSelectedId = (state: <%= classify(name) %>State) => state.selectedId;
export const getLoading = (state: <%= classify(name) %>State) => state.loading;
export const getError = (state: <%= classify(name) %>State) => state.error;
export const getQuery = (state: <%= classify(name) %>State) => state.query;
