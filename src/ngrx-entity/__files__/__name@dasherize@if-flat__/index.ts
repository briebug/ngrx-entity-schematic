import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as from<%= classify(name) %> from './entity.reducer';
import { State as <%= classify(name) %>State } from './entity.reducer';

export const get<%= classify(name) %>State = createFeatureSelector<<%= classify(name) %>State>('entity');

export const {
  selectIds: get<%= classify(name) %>Ids,
  selectEntities: get<%= classify(name) %>Entities,
  selectAll: getAll<%= classify(name) %>,
  selectTotal: getTotal<%= classify(name) %>
} = from<%= classify(name) %>.adapter.getSelectors(get<%= classify(name) %>State);

export const getSelected<%= classify(name) %>Id = createSelector(
  get<%= classify(name) %>State,
  from<%= classify(name) %>.getSelectedId
);

export const getSelected<%= classify(name) %> = createSelector(
  getSelected<%= classify(name) %>Id,
  get<%= classify(name) %>Entities,
  (selected<%= classify(name) %>Id, entities) => selected<%= classify(name) %>Id && entities[selected<%= classify(name) %>Id]
);

export const getLoading = createSelector(
  get<%= classify(name) %>State,
  from<%= classify(name) %>.getLoading
);

export const getError = createSelector(
  get<%= classify(name) %>State,
  from<%= classify(name) %>.getError
);

export const getPaging = createSelector(
  get<%= classify(name) %>State,
  from<%= classify(name) %>.getPaging
);
