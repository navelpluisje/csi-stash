import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Configuration {
  id: number;
  name: string;
  description: string;
  author: string;
}
type ConfigurationResponse = Array<Configuration>

// Define a service using a base URL and expected endpoints
export const configurationApi = createApi({
  reducerPath: 'configurationApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/configuration/' }),
  endpoints: (builder) => ({
    getAllConfigurations: builder.query<ConfigurationResponse, string>({
      query: (controllerId) => `${controllerId}`,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllConfigurationsQuery,
  usePrefetch,
} = configurationApi;
