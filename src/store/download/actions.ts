import { createAction } from '@reduxjs/toolkit';

export const addController = createAction<number>('@download/ADD_CONTROLLER');
export const addConfiguration = createAction<number>('@download/ADD_CONFIGURATION');
export const addZone = createAction<number>('@download/ADD_ZONE');
export const removeZone = createAction<number>('@download/REMOVE_ZONE');
