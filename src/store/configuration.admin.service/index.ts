import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Configuration {
  id: string;
  // eslint-disable-next-line camelcase
  controller_id: number;
  name: string;
  description: string;
  author: string;
  created: string;
  modified: string;
}
type ControllerResponse = Array<Configuration>
interface MutationConfiguration {
  id?: string;
  body: Partial<Configuration>;
}

// Define a service using a base URL and expected endpoints
export const adminConfigurationApi = createApi({
  reducerPath: 'adminConfigurationApi',
  tagTypes: ['Configuration'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/admin/configuration' }),
  endpoints: (builder) => ({
    getConfigurationById: builder.query<ControllerResponse, number>({
      query: (id) => `${id}`,
    }),
    getConfigurationsByControllerId: builder.query<ControllerResponse, string>({
      query: (id) => `_/${id}`,
    }),
    updateConfiguration: builder.mutation<Configuration, MutationConfiguration>({
      query(data) {
        const { id, body } = data;
        return {
          url: `${id}`,
          method: 'PUT',
          body: JSON.stringify(body),
        };
      },
      invalidatesTags: ['Configuration'],
    }),
    addConfiguration: builder.mutation<Configuration, MutationConfiguration>({
      query(data) {
        const { body } = data;
        return {
          url: '',
          method: 'POST',
          body: JSON.stringify(body),
        };
      },
      invalidatesTags: ['Configuration'],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetConfigurationsByControllerIdQuery,
  useGetConfigurationByIdQuery,
  useLazyGetConfigurationByIdQuery,
  useUpdateConfigurationMutation,
  useAddConfigurationMutation,
  usePrefetch,
} = adminConfigurationApi;
