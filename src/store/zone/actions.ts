import { createAsyncThunk } from '@reduxjs/toolkit';
import { Zone } from './types';

interface Payload {
  zones: Zone[];
  configuration: number;
}

export const fetchZonesByConfiguration = createAsyncThunk<Payload, number>(
  '@zone/FETCH_ZONES_BY_CONTROLLER',
  async (id) => {
    const result = await fetch(`/api/zone/configuration/${id}`);
    const response = await result.json();

    return {
      zones: response,
      configuration: id,
    };
  },
);

export const fetchZoneById = createAsyncThunk<Zone, number>(
  '@zone/FETCH_ZONE_BY_ID',
  async (id) => {
    const result = await fetch(`/api/zone/${id}`);
    const response = await result.json();
    return response[0];
  },
);
