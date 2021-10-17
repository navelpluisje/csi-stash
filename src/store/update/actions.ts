import { createAsyncThunk } from '@reduxjs/toolkit';
import { persistor } from '@store/store';
import type { RootState } from '@store/store';

export const checkUpdate = createAsyncThunk(
  '@update/CHECK_UPDATE',
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const { lastUpdated } = state.update;
    const result = await fetch('/api/update');
    const date = await result.json();
    if (lastUpdated < new Date(date.lastUpdated).getTime()) {
      persistor.purge();
      return new Date(date.lastUpdated).getTime();
    }
    return lastUpdated;
  },
);
