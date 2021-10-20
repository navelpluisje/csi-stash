import { RootState } from '@store/types';
import { createSelector } from 'reselect';
import { Zone, ZoneCollection } from './types';

export const getZones = (state: RootState): ZoneCollection => state.zones.zones;

export const getZonesByConfiguration = (configurationId: number) => (
  (state: RootState): Zone[] => Object.values(state.zones?.zones[configurationId] || {})
);

export const getFilteredZonesByConfiguration = createSelector(
  getZones,
  (state) => state.download.configuration,
  (state) => state.download.zones,
  (zones, configId, downloadIds) => Object.values(zones[configId || 0] || {})
    .filter((zone) => !downloadIds.includes(zone.id)),
);
