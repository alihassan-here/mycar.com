import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryService = createApi({
  reducerPath: "category",
  tagTypes: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3060/api/v1",
    prepareHeaders: (headers, state) => {
      const allReducers = state.getState();
      const token = allReducers?.authReducer?.adminToken;
      headers.set("Authorization", token ? "Bearer " + token : "");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      create: builder.mutation({
        query: (name) => {
          return {
            url: "create-category",
            method: "POST",
            body: name,
          };
        },
        invalidatesTags: ["categories"],
      }),
      get: builder.query({
        query: (page) => {
          return {
            url: `categories/${page}`,
            method: "GET",
          };
        },
        providesTags: ["categories"],
      }),
      fetchCategory: builder.query({
        query: (id) => {
          return {
            url: `fetch-category/${id}`,
            method: "GET",
          };
        },
        providesTags: ["categories"],
      }),
      updateCategory: builder.mutation({
        query: (data) => {
          return {
            url: `/update-category/${data.id}`,
            method: "PUT",
            body: { name: data.name },
          };
        },
        invalidatesTags: ["categories"],
      }),
      deleteCategory: builder.mutation({
        query: (id) => {
          return {
            url: `/delete-category/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["categories"],
      }),
      allCategories: builder.query({
        query: () => {
          return {
            url: "/allcategories",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useCreateMutation,
  useGetQuery,
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAllCategoriesQuery,
} = categoryService;

export default categoryService;
