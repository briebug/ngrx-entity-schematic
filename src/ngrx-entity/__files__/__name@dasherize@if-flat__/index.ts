import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as from<%= classify(name) %>State from './<%= name %>.reducer';
import { <%= classify(name) %>State } from './<%= name %>.reducer';

export const get<%= classify(name) %>State = createFeatureSelector<<%= classify(name) %>State>('<%= name %>');

export const {
  selectIds: getAll<%= classify(name) %>Ids,
  selectEntities: getAll<%= classify(name) %>EntitiesAsMap,
  selectAll: getAll<%= classify(name) %>EntitiesAsArray,
  selectTotal: getTotal<%= classify(name) %>Entities
} = from<%= classify(name) %>State.adapter.getSelectors(get<%= classify(name) %>State);

export const getSelected<%= classify(name) %>Id = createSelector(
  get<%= classify(name) %>State,
  from<%= classify(name) %>State.getSelectedId
);

export const getSelected<%= classify(name) %> = createSelector(
  getSelected<%= classify(name) %>Id,
  getAll<%= classify(name) %>EntitiesAsMap,
  (selected<%= classify(name) %>Id, <%= name %>Entities) =>
    selected<%= classify(name) %>Id && <%= name %>Entities[selected<%= classify(name) %>Id]
);

export const getLoading = createSelector(
  get<%= classify(name) %>State,
  from<%= classify(name) %>State.getLoading
);

export const getError = createSelector(
  get<%= classify(name) %>State,
  from<%= classify(name) %>State.getError
);

export const getQuery = createSelector(
  get<%= classify(name) %>State,
  from<%= classify(name) %>State.getQuery
);
