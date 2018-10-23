import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './state-utils';
import { <%= classify(name) %>State } from './<%= dasherize(name) %>/<%= dasherize(name) %>.reducer';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  <%= name %>: <%= classify(name) %>State;
}

export type State = AppState;
