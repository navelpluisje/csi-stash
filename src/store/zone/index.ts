import { createReducer } from '@reduxjs/toolkit';
import { fetchZonesByConfiguration } from './actions';
import { ZoneCollection } from './types';

type ZoneState = {
  zones: ZoneCollection,
  loading: {
    [is: number]: boolean
  },
}

const initialState: ZoneState = { zones: {}, loading: {} };

export const zoneReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      fetchZonesByConfiguration.fulfilled,
      (state, { payload }) => ({
        ...state,
        zones: payload.zones.reduce<ZoneCollection>((acc, zone) => ({
          ...acc,
          [payload.configuration]: {
            ...acc[payload.configuration],
            [zone.id]: zone,
          },
        }), {}),
      }),
    );
});
