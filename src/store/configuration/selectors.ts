import { RootState, Selector } from '@store/types';
import { createSelector } from 'reselect';
import { Configuration, ConfigurationCollection } from './types';

export const getConfigurations = (state: RootState): ConfigurationCollection => (
  state.configurations.configurations
);

export const getConfigurationByController = (id: number): Selector<Configuration[]> => (
  createSelector(
    getConfigurations,
    (configurations) => (
      Object.values(configurations).filter((config) => id === config.controller_id)
    ),
  )
);

export const getConfigurationById = (id: number): Selector<Configuration> => (
  createSelector(
    getConfigurations,
    (configurations) => configurations[id],
  )
);
