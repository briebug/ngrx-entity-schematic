import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Briebug } from './briebug.model';
import { BriebugActions, BriebugActionTypes } from './briebug.actions';

export interface BriebugSearchQuery {
  filter: string;
  sorting: string;
  limit: number;
  page: number;
}

export interface BriebugState extends EntityState<Briebug> {
  // additional entities state properties
  selectedId: number;
  loading: boolean;
  error: string;
  query: BriebugSearchQuery;
}

export const adapter: EntityAdapter<Briebug> = createEntityAdapter<Briebug>();

export const initialState: BriebugState = adapter.getInitialState({
  // additional briebug state properties
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

export function briebugReducer(state = initialState, action: BriebugActions): BriebugState {
  switch (action.type) {
    case BriebugActionTypes.InsertBriebug:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case BriebugActionTypes.InsertBriebugSuccess:
      return {
        ...adapter.addOne(action.payload.result, state),
        loading: false,
        error: ''
      };

    case BriebugActionTypes.InsertBriebugFail:
      return {
        ...state,
        loading: false,
        error: 'Briebug insert failed: ' + action.payload.error
      };

    case BriebugActionTypes.SearchAllBriebugEntities:
      return {
        ...adapter.removeAll(state),
        loading: true,
        error: ''
      };

    case BriebugActionTypes.SearchAllBriebugEntitiesSuccess:
      return {
        ...adapter.addAll(action.payload.result, state),
        loading: false,
        error: ''
      };

    case BriebugActionTypes.SearchAllBriebugEntitiesFail:
      return {
        ...state,
        loading: false,
        error: 'Briebug search failed: ' + action.payload.error
      };

    case BriebugActionTypes.LoadBriebugById:
      return {
        ...adapter.removeAll(state),
        selectedId: action.payload.id,
        loading: true,
        error: ''
      };

    case BriebugActionTypes.LoadBriebugByIdSuccess:
      return {
        ...adapter.addOne(action.payload.result, state),
        loading: false,
        error: ''
      };

    case BriebugActionTypes.LoadBriebugByIdFail:
      return {
        ...state,
        loading: false,
        error: 'Briebug load failed: ' + action.payload.error
      };

    case BriebugActionTypes.UpdateBriebug:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case BriebugActionTypes.UpdateBriebugSuccess:
      return {
        ...adapter.updateOne(action.payload.update, state),
        loading: false,
        error: ''
      };

    case BriebugActionTypes.UpdateBriebugFail:
      return {
        ...state,
        loading: false,
        error: 'Briebug update failed: ' + action.payload.error
      };

    case BriebugActionTypes.DeleteBriebugById:
      return {
        ...state,
        selectedId: action.payload.id,
        loading: true,
        error: ''
      };

    case BriebugActionTypes.DeleteBriebugByIdSuccess:
      return {
        ...adapter.removeOne(action.payload.id, state),
        loading: false,
        error: ''
      };

    case BriebugActionTypes.DeleteBriebugByIdFail:
      return {
        ...state,
        loading: false,
        error: 'Briebug delete failed: ' + action.payload.error
      };

    case BriebugActionTypes.SetSearchQuery:
      return {
        ...state,
        query: {
          ...state.query,
          ...action.payload
        }
      };

    case BriebugActionTypes.SelectBriebugById:
      return {
        ...state,
        selectedId: action.payload.id,
        error: ''
      };

    default:
      return state;
  }
}

export const getSelectedId = (state: BriebugState) => state.selectedId;
export const getLoading = (state: BriebugState) => state.loading;
export const getError = (state: BriebugState) => state.error;
export const getQuery = (state: BriebugState) => state.query;
