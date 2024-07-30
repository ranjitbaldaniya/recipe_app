import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3001';

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllRecipe: builder.query<{ recipes: any[] }, void>({
        query: () => '/recipe',
      }),
    getAllCategory: builder.query<{ category: any[] }, void>({
      query: () => '/category',
    }),
    getUserRecipeList: builder.mutation<any, any>({
    query: (id) => ({
        url:`/recipe?userId=${id}`,
        method:'GET'
      })
    }),
    getRecipeByCategory: builder.mutation<any, any>({
      query: (id) => ({
          url:`/recipe?category=${id}`,
          method:'GET'
        })
      }),
    deleteRecipe: builder.mutation<void, string>({
      query: (id) => ({
        url: `/recipe/${id}`,
        method: 'DELETE',
      }),
    }),
    getEditUserRecipe: builder.mutation<any, any>({
      query: (id) => ({
        url: `recipe/${id}`,
        method: 'GET',
      }),
    }),
    updateEditUserRecipe: builder.mutation<
      any,
      { id: string; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/recipe/${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),
    addUserRecipe: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `/recipe`,
        method: 'POST',
        body: formData,
      }),
    }),
    detailsRecipe: builder.query({
      query: (id) => ({
        url: `/recipe/details/${id}`,
        method: 'GET',
      }),
    }),
  }),
});
export const {
  useGetAllRecipeQuery,
  useDeleteRecipeMutation,
  useGetEditUserRecipeMutation,
  useUpdateEditUserRecipeMutation,
  useAddUserRecipeMutation,
  useDetailsRecipeQuery,
  useGetUserRecipeListMutation,
  useGetRecipeByCategoryMutation,
  useGetAllCategoryQuery
} = recipeApi;
