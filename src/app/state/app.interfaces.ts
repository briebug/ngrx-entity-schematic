import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './state-utils';
import { BriebugState } from './briebug/briebug.reducer';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  briebug: BriebugState;
}

export type State = AppState;
