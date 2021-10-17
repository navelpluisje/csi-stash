import { RootState } from '@store/types';
import { Zone, ZoneCollection } from './types';

export const getZones = (state: RootState): ZoneCollection => state.zones.zones;

export const getZonesByConfiguration = (configurationId: number) => (
  (state: RootState): Zone[] => Object.values(state.zones.zones[configurationId])
);
