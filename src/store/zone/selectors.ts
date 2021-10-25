import { RootState } from '@store/types';
import { createSelector } from 'reselect';
import { Zone } from './types';

export const getZonesByConfiguration = (configurationId: number) => (
  (state: RootState): Zone[] => Object.values(state.zones?.configuration[configurationId] || {})
);

export const getFilteredZonesByConfiguration = createSelector(
  (state: RootState) => state.zones.configuration,
  (state) => state.download.configuration,
  (state) => state.download.zones,
  (zones, configId, downloadIds) => Object.values(zones[configId || 0] || {})
    .filter((zone) => !downloadIds.includes(zone.id)),
);

export const getFilteredZonesByController = createSelector(
  (state: RootState) => state.zones.controller,
  (state: RootState) => state.download.controller,
  (state: RootState) => state.download.zones,
  (zones, controllerId, downloadIds) => Object.values(zones[controllerId || 0] || {})
    .filter((zone) => !downloadIds.includes(zone.id)),
);
