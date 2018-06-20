import { <%= classify(name) %>State, <%= classify(name) %>Adapter, create<%= classify(name) %>Adapter } from '@ngrx/entity';
import { <%= classify(name) %> } from './entity.model';
import { <%= classify(name) %>Actions, <%= classify(name) %>ActionTypes } from './entity.actions';

export interface State extends <%= classify(name) %>State<<%= classify(name) %>> {
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

export const adapter: <%= classify(name) %>Adapter<<%= classify(name) %>> = create<%= classify(name) %>Adapter<<%= classify(name) %>>();

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

export function reducer(state = initialState, action: <%= classify(name) %>Actions): State {
  switch (action.type) {
    case <%= classify(name) %>ActionTypes.<%= classify(name) %>Insert:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>InsertSuccess:
      return {
        ...adapter.addOne(action.payload.result, state),
        loading: false
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>InsertFail:
      return {
        ...state,
        loading: false,
        error: '<%= classify(name) %> insert failed: ' + action.payload.error
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>Search:
      return {
        ...adapter.removeAll(state),
        loading: true,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>LoadById:
      return {
        ...adapter.removeAll(state),
        selectedId: action.payload.id,
        loading: true,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>SearchSuccess:
      return {
        ...adapter.addAll(action.payload.result, state),
        loading: false,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>SearchFail:
      return {
        ...state,
        loading: false,
        error: '<%= classify(name) %> search failed: ' + action.payload.error
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>LoadByIdSuccess:
      return {
        ...adapter.addOne(action.payload.result, state),
        loading: false,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>LoadByIdFail:
      return {
        ...state,
        loading: false,
        error: '<%= classify(name) %> load failed: ' + action.payload.error
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>Update:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>UpdateSuccess:
      return {
        ...adapter.updateOne(action.payload.update, state),
        loading: false,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>UpdateFail:
      return {
        ...state,
        loading: false,
        error: '<%= classify(name) %> update failed: ' + action.payload.error
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>DeleteById:
      return {
        ...state,
        selectedId: action.payload.id,
        loading: true,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>DeleteSuccess:
      return {
        ...adapter.removeOne(action.payload.result.id, state),
        loading: false,
        error: ''
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>DeleteFail:
      return {
        ...state,
        loading: false,
        error: '<%= classify(name) %> delete failed: ' + action.payload.error
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>SetPaging:
    case <%= classify(name) %>ActionTypes.<%= classify(name) %>SetFilter:
    case <%= classify(name) %>ActionTypes.<%= classify(name) %>SetSorting:
      return {
        ...state,
        paging: {
          ...state.paging,
          ...action.payload
        }
      };

    case <%= classify(name) %>ActionTypes.<%= classify(name) %>SelectById:
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
