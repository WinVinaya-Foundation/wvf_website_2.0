import { baseApi } from './baseApi';

export type CategoryColor = 'PRIMARY' | 'SECONDARY' | 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';

export interface CategoryItem {
  id: string;
  label: string;
  color: CategoryColor;
  createdAt: string;
  updatedAt: string;
}

export type CategoryRef = CategoryItem;

export interface CategoryInput {
  label: string;
  color: CategoryColor;
}

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryItem[], void>({
      query: () => ({ url: '/categories', method: 'GET' }),
      transformResponse: (response: { categories: CategoryItem[] }) => response.categories,
      providesTags: ['Categories'],
    }),

    createCategory: builder.mutation<CategoryItem, CategoryInput>({
      query: (data) => ({
        url: '/admin/categories',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Categories'],
    }),

    updateCategory: builder.mutation<CategoryItem, { id: string; data: Partial<CategoryInput> }>({
      query: ({ id, data }) => ({
        url: `/admin/categories/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Categories'],
    }),

    deleteCategory: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
