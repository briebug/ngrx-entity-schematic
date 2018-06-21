import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromBriebugState from './entity.reducer';
import { BriebugState } from './entity.reducer';

export const getBriebugState = createFeatureSelector<BriebugState>('briebug');

export const {
  selectIds: getAllBriebugIds,
  selectEntities: getAllBriebugEntitiesAsMap,
  selectAll: getAllBriebugEntitiesAsArray,
  selectTotal: getTotalBriebugEntities
} = fromBriebugState.adapter.getSelectors(getBriebugState);

export const getSelectedBriebugId = createSelector(
  getBriebugState,
  fromBriebugState.getSelectedId
);

export const getSelectedBriebug = createSelector(
  getSelectedBriebugId,
  getAllBriebugEntitiesAsMap,
  (selectedBriebugId, briebugEntities) =>
    selectedBriebugId && briebugEntities[selectedBriebugId]
);

export const getLoading = createSelector(
  getBriebugState,
  fromBriebugState.getLoading
);

export const getError = createSelector(
  getBriebugState,
  fromBriebugState.getError
);

export const getPaging = createSelector(
  getBriebugState,
  fromBriebugState.getPaging
);
