import { combineReducers } from '@reduxjs/toolkit';
// import CountReducer from '@store/update';
import { updateReducer } from '@store/update';
import { controllerReducer } from '@store/controllers';
import { configurationReducer } from '@store/configuration';
import { adminControllerApi } from '@store/controller.admin.service';
import { adminConfigurationApi } from '@store/configuration.admin.service';

export const rootReducer = combineReducers({
  // CountReducer,
  update: updateReducer,
  controllers: controllerReducer,
  configurations: configurationReducer,
  [adminControllerApi.reducerPath]: adminControllerApi.reducer,
  [adminConfigurationApi.reducerPath]: adminConfigurationApi.reducer,
});
