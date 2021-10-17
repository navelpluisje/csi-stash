import { RootState } from "@store/types";
import { createSelector } from "reselect";

export const getControllers = (state: RootState) => state.controllers.controllers;
export const isAllControllersLoading = (state: RootState) => state.controllers.loadingAll;
export const isControllerByIdLoading = (state: RootState) => state.controllers.loadingById;

export const getControllerById = (id: number) => createSelector(
  getControllers,
  (controllers) => controllers[id]
);
