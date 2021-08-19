import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Controller {
  id: number;
  brand: string;
  model: string;
  author: string;
  created: string;
  modified: string;
  file: string;
  filename: string;
}
type ControllerResponse = Array<Controller>
interface MutationController {
  id: number;
  body: Partial<Controller>;
}

// Define a service using a base URL and expected endpoints
export const adminControllerApi = createApi({
  reducerPath: 'adminControllerApi',
  tagTypes: ['Controller'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/admin/controller/' }),
  endpoints: (builder) => ({
    getAllControllers: builder.query<ControllerResponse, void>({
      query: () => '',
    }),
    getControllerById: builder.query<ControllerResponse, number>({
      query: (id) => `${id}`,
    }),
    updateController: builder.mutation<Controller, MutationController>({
      query(data) {
        const { id, body } = data;
        return {
          url: `${id}`,
          method: 'PUT',
          body: JSON.stringify(body),
        };
      },
      invalidatesTags: ['Controller'],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllControllersQuery,
  useGetControllerByIdQuery,
  useLazyGetControllerByIdQuery,
  useUpdateControllerMutation,
  usePrefetch,
} = adminControllerApi;
