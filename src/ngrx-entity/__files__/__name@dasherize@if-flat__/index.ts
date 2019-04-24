import { createSelector, createFeatureSelector } from '@ngrx/store';

import {
  <%= name %>Reducer,
  getSelectedId,
  getLoading,
  getError,
  getQuery
} from './<%= dasherize(name) %>.reducer';
import { <%= classify(name) %>State } from './<%= dasherize(name) %>.reducer';

export const get<%= classify(name) %>State = createFeatureSelector<<%= classify(name) %>State>('<%= name %>');

export const {
  selectIds: <%= name %>Ids,
  selectEntities: <%= name %>Entities,
  selectAll: <%= name %>,
  selectTotal: <%= name %>Count
} = <%= name %>Adapter.getSelectors(get<%= classify(name) %>State);

export const current<%= classify(name) %>Id = createSelector(
  get<%= classify(name) %>State,
  getSelectedId
);

export const current<%= classify(name) %> = createSelector(
  current<%= classify(name) %>Id,
  <%= name %>Entities,
  (selected<%= classify(name) %>Id, <%= name %>Entities) =>
    selected<%= classify(name) %>Id && <%= name %>Entities[selected<%= classify(name) %>Id]
);

export const <%= name %>Loading = createSelector( // TODO: Need to pluraliae  name
  get<%= classify(name) %>State,
  getLoading
);

export const <%= name %>Error = createSelector(
  get<%= classify(name) %>State,
  getError
);

export const <%= name %>Query = createSelector(
  get<%= classify(name) %>State,
  getQuery
);
