import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './state-utils';
import { State as entityState } from './entity/entity.reducer';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  entity: entityState;
}

export type State = AppState;
