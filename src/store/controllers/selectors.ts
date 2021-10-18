import type { RootState, Selector } from '@store/types';
import { createSelector } from 'reselect';
import { Controller, ControllerCollection } from './types';

export const getControllers = (state: RootState): ControllerCollection => (
  state.controllers.controllers
);
export const getAllControllers = (state: RootState): Controller[] => (
  Object.values(state.controllers.controllers)
);
export const isAllControllersLoading = (state: RootState): boolean => state.controllers.loadingAll;
export const isControllerByIdLoading = (state: RootState): boolean => state.controllers.loadingById;

export const getControllerById = (id: number): Selector<Controller> => createSelector(
  getControllers,
  (controllers) => controllers[id],
);
