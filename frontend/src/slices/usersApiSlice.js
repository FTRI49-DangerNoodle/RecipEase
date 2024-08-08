import { apiSlice } from './apiSlice';
import { setUser } from '../slices/authSlice';

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
      // eslint-disable-next-line no-shadow-restricted-names
      async onQueryStarted(undefined, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(setUser(data));
        } catch (err) {
          console.log(err);
          // `onError` side-effect
        }
      },
    }),
    getUserDetails: builder.query({
      query: () => `${USERS_URL}/userInfo`,
      // eslint-disable-next-line no-shadow-restricted-names
      async onQueryStarted(undefined, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(setUser(data));
        } catch (err) {
          console.log(err);
          // `onError` side-effect
        }
      },
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
      providesTags: (_result, _err, id) => [{ type: 'Recipe', id }],
    }),
    allRecipeNamesAndIds: builder.query({
      query: () => ({ url: `${RECIPES_URL}/names-ids` }),
      providesTags: (result = []) => [
        ...result.map(({ _id }) => ({ type: 'Recipes', id: _id })),
        { type: 'Recipes', id: 'LIST' },
      ],
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
  useAllRecipeNamesAndIdsQuery,
  useGetUserDetailsQuery,
} = userApiSlice;
