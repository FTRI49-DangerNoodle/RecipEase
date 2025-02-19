import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Recipe', 'Recipes'],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
