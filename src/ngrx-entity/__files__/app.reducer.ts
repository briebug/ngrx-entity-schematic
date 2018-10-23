import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { storeFreeze } from 'ngrx-store-freeze';

import { AppState } from './app.interfaces';
import { environment } from '../../environments/environment';
import { <%= name %>Reducer } from './<%= dasherize(name) %>/<%= dasherize(name) %>.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  <%= name %>: <%= name %>Reducer,
  router: routerReducer
};

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production
  ? [storeFreeze]
  : [];
