import { baseApi } from './baseApi';
import type { CategoryItem } from './categoriesApi';

export interface BlogContentBlock {
  type: 'paragraph' | 'heading' | 'quote' | 'bulletList' | 'orderedList';
  text?: string;
  attribution?: string;
  items?: string[];
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categoryId: string;
  category: CategoryItem;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  body: BlogContentBlock[];
  coverImageUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostDetailResponse {
  post: BlogPostItem;
  previousPost?: BlogPostItem;
  nextPost?: BlogPostItem;
}

export interface BlogPostInput {
  title: string;
  slug?: string;
  excerpt: string;
  categoryId: string;
  authorName: string;
  authorRole: string;
  publishedAt?: string;
  body: BlogContentBlock[];
  coverImageUrl?: string | null;
  isActive?: boolean;
}

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicBlogPosts: builder.query<BlogPostItem[], void>({
      query: () => ({ url: '/blog', method: 'GET' }),
      transformResponse: (response: { posts: BlogPostItem[] }) => response.posts,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Blogs' as const, id })), { type: 'Blogs', id: 'LIST' }]
          : [{ type: 'Blogs', id: 'LIST' }],
    }),

    getPublicBlogPostBySlug: builder.query<BlogPostDetailResponse, string>({
      query: (slug) => ({ url: `/blog/${slug}`, method: 'GET' }),
      providesTags: (_result, _err, slug) => [{ type: 'Blogs', id: slug }],
    }),

    getAdminBlogPosts: builder.query<BlogPostItem[], void>({
      query: () => ({ url: '/admin/blog', method: 'GET' }),
      transformResponse: (response: { posts: BlogPostItem[] }) => response.posts,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Blogs' as const, id })), { type: 'Blogs', id: 'ADMIN_LIST' }]
          : [{ type: 'Blogs', id: 'ADMIN_LIST' }],
    }),

    createBlogPost: builder.mutation<BlogPostItem, BlogPostInput>({
      query: (data) => ({ url: '/admin/blog', method: 'POST', data }),
      transformResponse: (response: { post: BlogPostItem }) => response.post,
      invalidatesTags: [{ type: 'Blogs', id: 'LIST' }, { type: 'Blogs', id: 'ADMIN_LIST' }],
    }),

    updateBlogPost: builder.mutation<BlogPostItem, { id: string; data: Partial<BlogPostInput> }>({
      query: ({ id, data }) => ({ url: `/admin/blog/${id}`, method: 'PUT', data }),
      transformResponse: (response: { post: BlogPostItem }) => response.post,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Blogs', id },
        { type: 'Blogs', id: 'LIST' },
        { type: 'Blogs', id: 'ADMIN_LIST' },
      ],
    }),

    toggleBlogPostStatus: builder.mutation<BlogPostItem, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({ url: `/admin/blog/${id}/status`, method: 'PATCH', data: { isActive } }),
      transformResponse: (response: { post: BlogPostItem }) => response.post,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Blogs', id },
        { type: 'Blogs', id: 'LIST' },
        { type: 'Blogs', id: 'ADMIN_LIST' },
      ],
    }),

    deleteBlogPost: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/admin/blog/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Blogs', id: 'LIST' }, { type: 'Blogs', id: 'ADMIN_LIST' }],
    }),
  }),
});

export const {
  useGetPublicBlogPostsQuery,
  useGetPublicBlogPostBySlugQuery,
  useGetAdminBlogPostsQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useToggleBlogPostStatusMutation,
  useDeleteBlogPostMutation,
} = blogApi;
