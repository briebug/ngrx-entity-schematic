import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { storeFreeze } from 'ngrx-store-freeze';

import { AppState } from './app.interfaces';
import { environment } from '../../environments/environment';
import { reducer as entityReducer } from './entity/entity.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  entity: entityReducer,
  router: routerReducer
};

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production
  ? [storeFreeze]
  : [];
