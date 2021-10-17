import { createAsyncThunk } from "@reduxjs/toolkit";
import { Configuration } from "./types";



export const fetchConfigurationsByController = createAsyncThunk<Configuration[], number>(
  '@configuration/FETCH_CONFIGURATIONS_BY_CONTROLLER',
  async (id) => {
    const result = await fetch(`/api/configuration/controller/${id}`);
    const response = await result.json();
    return response;
  }
)

export const fetchConfigurationById = createAsyncThunk<Configuration, number>(
  '@configuration/FETCH_CONFIGURATION_BY_ID',
  async (id) => {
    const result = await fetch(`/api/configuration/${id}`);
    const response = await result.json();
    return response[0];
  }
)
