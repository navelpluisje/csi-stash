import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@store/types';
import { isControllerByIdLoading } from './selectors';
import { Controller } from './types';

export const fetchAllControllers = createAsyncThunk<Controller[]>(
  '@controller/FETCH_ALL_CONTROLLERS',
  async () => {
    const result = await fetch('/api/controller');
    const response = await result.json();
    return response;
  },
);

export const fetchControllerById = createAsyncThunk<Controller | null, number>(
  '@controller/FETCH_CONTROLLER_BY_ID',
  async (id, { getState }) => {
    if (isControllerByIdLoading(getState() as RootState)) {
      return null;
    }
    const result = await fetch(`/api/controller/${id}`);
    const response = await result.json();
    return response[0];
  },
);
