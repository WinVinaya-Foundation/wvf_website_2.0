import { baseApi } from './baseApi';

export interface StoryItem {
  id: string;
  name: string;
  role: string;
  description: string;
  videoUrl: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StoryInput {
  name: string;
  role: string;
  description: string;
  videoUrl: string;
  sortOrder?: number;
  isActive?: boolean;
}

export const storiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicStories: builder.query<StoryItem[], void>({
      query: () => ({ url: '/stories', method: 'GET' }),
      transformResponse: (response: { stories: StoryItem[] }) => response.stories,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Stories' as const, id })), { type: 'Stories', id: 'LIST' }]
          : [{ type: 'Stories', id: 'LIST' }],
    }),

    getAdminStories: builder.query<StoryItem[], void>({
      query: () => ({ url: '/admin/stories', method: 'GET' }),
      transformResponse: (response: { stories: StoryItem[] }) => response.stories,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Stories' as const, id })), { type: 'Stories', id: 'ADMIN_LIST' }]
          : [{ type: 'Stories', id: 'ADMIN_LIST' }],
    }),

    createStory: builder.mutation<StoryItem, StoryInput>({
      query: (data) => ({ url: '/admin/stories', method: 'POST', data }),
      transformResponse: (response: { story: StoryItem }) => response.story,
      invalidatesTags: [{ type: 'Stories', id: 'LIST' }, { type: 'Stories', id: 'ADMIN_LIST' }],
    }),

    updateStory: builder.mutation<StoryItem, { id: string; data: Partial<StoryInput> }>({
      query: ({ id, data }) => ({ url: `/admin/stories/${id}`, method: 'PUT', data }),
      transformResponse: (response: { story: StoryItem }) => response.story,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Stories', id },
        { type: 'Stories', id: 'LIST' },
        { type: 'Stories', id: 'ADMIN_LIST' },
      ],
    }),

    toggleStoryStatus: builder.mutation<StoryItem, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({ url: `/admin/stories/${id}/status`, method: 'PATCH', data: { isActive } }),
      transformResponse: (response: { story: StoryItem }) => response.story,
      invalidatesTags: (_res, _err, { id }) => [
        { type: 'Stories', id },
        { type: 'Stories', id: 'LIST' },
        { type: 'Stories', id: 'ADMIN_LIST' },
      ],
    }),

    deleteStory: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({ url: `/admin/stories/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Stories', id: 'LIST' }, { type: 'Stories', id: 'ADMIN_LIST' }],
    }),
  }),
});

export const {
  useGetPublicStoriesQuery,
  useGetAdminStoriesQuery,
  useCreateStoryMutation,
  useUpdateStoryMutation,
  useToggleStoryStatusMutation,
  useDeleteStoryMutation,
} = storiesApi;
