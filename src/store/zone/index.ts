import { createReducer } from '@reduxjs/toolkit';
import { fetchZonesByConfiguration } from './actions';
import { ZoneCollection } from './types';

type ZoneState = {
  zones: ZoneCollection,
  loading: {
    [id: number]: boolean
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
          [zone.configuration_id]: {
            ...(acc[zone.configuration_id] || {}),
            [zone.id]: zone,
          },
        }), {}),
      }),
    );
});
