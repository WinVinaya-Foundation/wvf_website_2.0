import { baseApi } from './baseApi';
import type { CategoryRef } from './categoriesApi';

export type EventStatus = 'UPCOMING' | 'COMPLETED';

export interface EventItem {
  id: string;
  title: string;
  category: CategoryRef;
  status: EventStatus;
  dateLabel: string;
  isDateTBA: boolean;
  location: string;
  description: string;
  ctaLabel?: string | null;
  ctaLink?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventInput {
  title: string;
  categoryId: string;
  status: EventStatus;
  dateLabel: string;
  isDateTBA: boolean;
  location: string;
  description: string;
  ctaLabel?: string;
  ctaLink?: string;
  isActive: boolean;
}

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicEvents: builder.query<EventItem[], { status?: EventStatus } | void>({
      query: (arg) => ({
        url: '/events',
        method: 'GET',
        params: arg?.status ? { status: arg.status } : undefined,
      }),
      transformResponse: (response: { events: EventItem[] }) => response.events,
      providesTags: ['Events'],
    }),

    getAdminEvents: builder.query<EventItem[], { status?: EventStatus } | void>({
      query: (arg) => ({
        url: '/admin/events',
        method: 'GET',
        params: arg?.status ? { status: arg.status } : undefined,
      }),
      transformResponse: (response: { events: EventItem[] }) => response.events,
      providesTags: ['Events'],
    }),

    createEvent: builder.mutation<EventItem, EventInput>({
      query: (data) => ({
        url: '/admin/events',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Events'],
    }),

    updateEvent: builder.mutation<EventItem, { id: string; data: Partial<EventInput> }>({
      query: ({ id, data }) => ({
        url: `/admin/events/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Events'],
    }),

    toggleEventStatus: builder.mutation<EventItem, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `/admin/events/${id}/status`,
        method: 'PATCH',
        data: { isActive },
      }),
      invalidatesTags: ['Events'],
    }),

    deleteEvent: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/admin/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Events'],
    }),
  }),
});

export const {
  useGetPublicEventsQuery,
  useGetAdminEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useToggleEventStatusMutation,
  useDeleteEventMutation,
} = eventsApi;
