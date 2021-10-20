import { getConfigurations } from '@store/configuration/selectors';
import { getControllers } from '@store/controllers/selectors';
import { RootState } from '@store/types';
import { getZones } from '@store/zone/selectors';
import { createSelector } from 'reselect';

export const getDownloadControllerId = (state: RootState): number | null => (
  state.download.controller
);

export const getDownloadConfigurationId = (state: RootState): number | null => (
  state.download.configuration
);

export const getDownloadZoneIds = (state: RootState): number[] => (
  state.download.zones
);

export const getDownloadController = createSelector(
  getDownloadControllerId,
  getControllers,
  (id, controllers) => (id ? controllers[id] : null),
);

export const getDownloadConfiguration = createSelector(
  getDownloadConfigurationId,
  getConfigurations,
  (id, configurations) => (id ? configurations[id] : null),
);

export const getDownloadZones = createSelector(
  getDownloadZoneIds,
  getDownloadConfigurationId,
  getZones,
  (ids, configId, zones) => (configId ? ids.map((id) => zones[configId][id]) : []),
);
