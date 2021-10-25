/* eslint-disable camelcase */
import { PluginTypes } from '@constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Zone {
  id: string;
  name: string;
  description: string;
  author: string;
  plugin_type: PluginTypes;
  type: 'base' | 'effects' | 'instrument';
  created: string;
  modified: string;
}
type ZoneResponse = Array<Zone>

interface MutationZone {
  id?: string;
  body: Partial<Zone>;
}

// Define a service using a base URL and expected endpoints
export const adminZoneApi = createApi({
  reducerPath: 'adminZoneApi',
  tagTypes: ['Zone'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/admin/zone' }),
  endpoints: (builder) => ({
    getZoneById: builder.query<ZoneResponse, number>({
      query: (id) => `${id}`,
    }),
    getZonesByControllerId: builder.query<ZoneResponse, string>({
      query: (id) => `controller/${id}`,
    }),
    getZonesByConfigurationId: builder.query<ZoneResponse, string>({
      query: (id) => `configuration/${id}`,
    }),
    addZone: builder.mutation<Zone, MutationZone>({
      query(data) {
        const { body } = data;
        return {
          url: '',
          method: 'POST',
          body: JSON.stringify(body),
        };
      },
      transformResponse: (response: Zone) => response,
      invalidatesTags: ['Zone'],
    }),
    updateZone: builder.mutation<Zone, MutationZone>({
      query(data) {
        const { id, ...body } = data.body;
        return {
          url: `${id}`,
          method: 'PUT',
          body: JSON.stringify(body),
        };
      },
      invalidatesTags: ['Zone'],
    }),
    addZoneToParent: builder.mutation({
      query(data) {
        const { body } = data;
        return {
          url: 'parent',
          method: 'POST',
          body: JSON.stringify(body),
        };
      },
    }),
    getLastAddedZoneId: builder.mutation<number, void>({
      query() {
        return {
          url: 'last',
          method: 'GET',
        };
      },
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetZonesByControllerIdQuery,
  useGetZonesByConfigurationIdQuery,
  useGetZoneByIdQuery,
  useLazyGetZoneByIdQuery,
  useUpdateZoneMutation,
  useAddZoneMutation,
  useGetLastAddedZoneIdMutation,
  useAddZoneToParentMutation,
  usePrefetch,
} = adminZoneApi;
