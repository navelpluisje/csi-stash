import { RootState } from "@store/types";
import { createSelector } from "reselect";

export const getConfigurations = (state: RootState) => state.configurations.configurations;

export const getConfigurationByController = (id: number) => createSelector(
  getConfigurations,
  (configurations) => Object.values(configurations).filter((config) => id === config.controller_id)
);

export const getConfigurationById = (id: number) => createSelector(
  getConfigurations,
  (configurations) => configurations[id]
);
