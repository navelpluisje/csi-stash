import { createAsyncThunk } from "@reduxjs/toolkit";
import { Controller } from "./types";



export const fetchAllControllers = createAsyncThunk<Controller[]>(
  '@controller/FETCH_ALL_CONTROLLERS',
  async () => {
    const result = await fetch('/api/controller');
    const response = await result.json();
    return response;
  }
)

export const fetchControllerById = createAsyncThunk<Controller, number>(
  '@controller/FETCH_CONTROLLER_BY_ID',
  async (id) => {
    const result = await fetch(`/api/controller/${id}`);
    const response = await result.json();
    return response[0];
  }
)
