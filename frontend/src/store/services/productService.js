import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productService = createApi({
  reducerPath: "product",
  tagTypes: "products",
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
      createProduct: builder.mutation({
        query: (data) => {
          return {
            url: "/create-car",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),
      getProducts: builder.query({
        query: (page) => {
          return {
            url: `/cars/${page}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      deleteProduct: builder.mutation({
        query: (id) => {
          return {
            url: `/delete-car/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["products"],
      }),
      getProduct: builder.query({
        query: (id) => {
          return {
            url: `/fetch-car/${id}`,
            method: "GET",
          };
        },
        providesTags: ["products"],
      }),
      updateProduct: builder.mutation({
        query: (data) => {
          console.log(data);
          return {
            url: "/update-car",
            method: "PUT",
            body: data,
          };
        },
        invalidatesTags: ["products"],
      }),
    };
  },
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} = productService;

export default productService;
