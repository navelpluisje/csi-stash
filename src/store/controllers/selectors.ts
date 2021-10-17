import { RootState } from "@store/types";
import { createSelector } from "reselect";

export const getControllers = (state: RootState) => state.controllers.controllers;
export const isControllersLoading = (state: RootState) => state.controllers.loading;

export const getControllerById = (id: number) => createSelector(
  getControllers,
  (controllers) => controllers[id]
);
