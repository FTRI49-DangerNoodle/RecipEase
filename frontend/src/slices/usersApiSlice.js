import { apiSlice } from './apiSlice';

const USERS_URL = '/api/users';
const RECIPES_URL = '/api/recipes';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    addFavorite: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/favorite`,
        method: 'PATCH',
        body: data,
      }),
    }),
    searchRecipeByName: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/search`,
        method: 'POST',
        body: data,
      }),
    }),
    autoCompleteRecipeById: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/autocompleteId`,
        method: 'POST',
        body: data,
      }),
    }),
    autoCompleteRecipeByName: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/autocompleteName`,
        method: 'POST',
        body: data,
      }),
    }),
    searchRecipeById: builder.query({
      query: (id) => ({ url: `${RECIPES_URL}/${id}` }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAddFavoriteMutation,
  useSearchRecipeByNameMutation,
  useAutoCompleteRecipeByIdMutation,
  useAutoCompleteRecipeByNameMutation,
  useSearchRecipeByIdQuery,
} = userApiSlice;
