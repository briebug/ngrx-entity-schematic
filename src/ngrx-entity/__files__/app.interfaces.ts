import { RouterReducerState } from '@ngrx/router-store';
import { CustomRouterState } from './customer-router-state.serializer';
import { <%= classify(name) %>State } from './<%= dasherize(name) %>/<%= dasherize(name) %>.reducer';

export interface AppState {
  router: RouterReducerState<CustomRouterState>;
  <%= name %>: <%= classify(name) %>State;
}

export type State = AppState;
