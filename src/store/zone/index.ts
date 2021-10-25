import { createReducer } from '@reduxjs/toolkit';
import { fetchZonesByConfiguration, fetchZonesByController } from './actions';
import { ZoneCollection } from './types';

type ZoneState = {
  configuration: ZoneCollection,
  controller: ZoneCollection,
  loading: {
    [id: number]: boolean
  },
}

const initialState: ZoneState = { configuration: {}, controller: {}, loading: {} };

export const zoneReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      fetchZonesByConfiguration.fulfilled,
      (state, { payload }) => ({
        ...state,
        configuration: payload.zones.reduce<ZoneCollection>((acc, zone) => ({
          ...acc,
          [payload.configuration]: {
            ...(acc[parseInt(payload.configuration, 10)] || {}),
            [zone.id]: zone,
          },
        }), {}),
      }),
    )
    .addCase(
      fetchZonesByController.fulfilled,
      (state, { payload }) => ({
        ...state,
        controller: payload.zones.reduce<ZoneCollection>((acc, zone) => ({
          ...acc,
          [payload.controller]: {
            ...(acc[parseInt(payload.controller, 10)] || {}),
            [zone.id]: zone,
          },
        }), {}),
      }),
    );
});
