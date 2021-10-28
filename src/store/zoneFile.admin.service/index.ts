import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ZoneFile {
  id: number;
  filename: string;
  file: string;
  zoneId: number;
  created: string;
  modified: string;
}
type ZoneFileResponse = Array<ZoneFile>

interface MutationZoneFile {
  id?: string;
  body: Partial<ZoneFile>;
}

// Define a service using a base URL and expected endpoints
export const adminZoneFileApi = createApi({
  reducerPath: 'adminZoneFileApi',
  tagTypes: ['ZoneFile'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/admin/zonefile' }),
  endpoints: (builder) => ({
    getFilesByZoneId: builder.query<ZoneFileResponse, string>({
      query: (id) => `files/${id}`,
    }),
    addZoneFile: builder.mutation<ZoneFile, MutationZoneFile>({
      query(data) {
        const { body } = data;
        return {
          url: '',
          method: 'POST',
          body: JSON.stringify(body),
        };
      },
      transformResponse: (response: ZoneFile) => response,
      invalidatesTags: ['ZoneFile'],
    }),
    updateZoneFile: builder.mutation<ZoneFile, MutationZoneFile>({
      query(data) {
        const { id, ...body } = data.body;
        return {
          url: `${id}`,
          method: 'PUT',
          body: JSON.stringify(body),
        };
      },
      invalidatesTags: ['ZoneFile'],
    }),
    deleteZoneFile: builder.mutation<ZoneFile, number>({
      query(id) {
        return {
          url: `${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['ZoneFile'],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetFilesByZoneIdQuery,
  useAddZoneFileMutation,
  useUpdateZoneFileMutation,
  useDeleteZoneFileMutation,
  useLazyGetFilesByZoneIdQuery,
  usePrefetch,
} = adminZoneFileApi;
