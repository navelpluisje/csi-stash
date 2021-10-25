import { createAsyncThunk } from '@reduxjs/toolkit';
import { Zone } from './types';

interface ConfigurationPayload {
  zones: Zone[];
  configuration: string;
}

export const fetchZonesByConfiguration = createAsyncThunk<ConfigurationPayload, string>(
  '@zone/FETCH_ZONES_BY_CONFIGURATION',
  async (id) => {
    const result = await fetch(`/api/zone/configuration/${id}`);
    const response = await result.json();

    return {
      zones: response,
      configuration: id,
    };
  },
);

interface ControllerPayload {
  zones: Zone[];
  controller: string;
}

export const fetchZonesByController = createAsyncThunk<ControllerPayload, string>(
  '@zone/FETCH_ZONES_BY_CONTROLLER',
  async (id) => {
    const result = await fetch(`/api/zone/controller/${id}`);
    const response = await result.json();

    return {
      zones: response,
      controller: id,
    };
  },
);

export const fetchZoneById = createAsyncThunk<Zone, string>(
  '@zone/FETCH_ZONE_BY_ID',
  async (id) => {
    const result = await fetch(`/api/zone/${id}`);
    const response = await result.json();
    return response[0];
  },
);
