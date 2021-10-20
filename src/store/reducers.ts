import { combineReducers } from '@reduxjs/toolkit';
// import CountReducer from '@store/update';
import { updateReducer } from '@store/update';
import { controllerReducer } from '@store/controllers';
import { configurationReducer } from '@store/configuration';
import { zoneReducer } from '@store/zone';
import { downloadReducer } from '@store/download';
import { adminControllerApi } from '@store/controller.admin.service';
import { adminConfigurationApi } from '@store/configuration.admin.service';

export const rootReducer = combineReducers({
  // CountReducer,
  update: updateReducer,
  controllers: controllerReducer,
  configurations: configurationReducer,
  zones: zoneReducer,
  download: downloadReducer,
  [adminControllerApi.reducerPath]: adminControllerApi.reducer,
  [adminConfigurationApi.reducerPath]: adminConfigurationApi.reducer,
});
