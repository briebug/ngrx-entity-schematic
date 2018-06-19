import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromEntity from './entity.reducer';
import { State as EntityState } from './entity.reducer';

export const getEntityState = createFeatureSelector<EntityState>('entity');

export const {
  selectIds: getEntityIds,
  selectEntities: getEntityEntities,
  selectAll: getAllEntity,
  selectTotal: getTotalEntity
} = fromEntity.adapter.getSelectors(getEntityState);

export const getSelectedEntityId = createSelector(
  getEntityState,
  fromEntity.getSelectedId
);

export const getSelectedEntity = createSelector(
  getSelectedEntityId,
  getEntityEntities,
  (selectedEntityId, entities) => selectedEntityId && entities[selectedEntityId]
);

export const getLoading = createSelector(
  getEntityState,
  fromEntity.getLoading
);

export const getError = createSelector(
  getEntityState,
  fromEntity.getError
);

export const getPaging = createSelector(
  getEntityState,
  fromEntity.getPaging
);
