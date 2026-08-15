import { baseApi } from './baseApi';
import type { CategoryRef } from './categoriesApi';

export interface GalleryPhotoItem {
  id: string;
  albumId: string;
  imageUrl: string;
  caption?: string | null;
  altText?: string | null;
  sortOrder: number;
  createdAt: string;
}

export interface GalleryAlbumItem {
  id: string;
  title: string;
  category: CategoryRef;
  dateLabel: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  photos: GalleryPhotoItem[];
}

export interface AdminGalleryAlbumsResponse {
  albums: GalleryAlbumItem[];
  maxFileSizeMb: number;
}

export interface AlbumMetaInput {
  title: string;
  categoryId: string;
  dateLabel: string;
  isActive: boolean;
}

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicAlbums: builder.query<GalleryAlbumItem[], void>({
      query: () => ({ url: '/gallery', method: 'GET' }),
      transformResponse: (response: { albums: GalleryAlbumItem[] }) => response.albums,
      providesTags: ['Gallery'],
    }),

    getAdminAlbums: builder.query<AdminGalleryAlbumsResponse, void>({
      query: () => ({ url: '/admin/gallery', method: 'GET' }),
      providesTags: ['Gallery'],
    }),

    createAlbum: builder.mutation<GalleryAlbumItem, FormData>({
      query: (formData) => ({
        url: '/admin/gallery',
        method: 'POST',
        data: formData,
      }),
      invalidatesTags: ['Gallery'],
    }),

    updateAlbum: builder.mutation<GalleryAlbumItem, { id: string; data: Partial<AlbumMetaInput> }>({
      query: ({ id, data }) => ({
        url: `/admin/gallery/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Gallery'],
    }),

    toggleAlbumStatus: builder.mutation<GalleryAlbumItem, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `/admin/gallery/${id}/status`,
        method: 'PATCH',
        data: { isActive },
      }),
      invalidatesTags: ['Gallery'],
    }),

    deleteAlbum: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/admin/gallery/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Gallery'],
    }),

    addPhotos: builder.mutation<GalleryAlbumItem, { albumId: string; formData: FormData }>({
      query: ({ albumId, formData }) => ({
        url: `/admin/gallery/${albumId}/photos`,
        method: 'POST',
        data: formData,
      }),
      invalidatesTags: ['Gallery'],
    }),

    deletePhoto: builder.mutation<GalleryAlbumItem, { albumId: string; photoId: string }>({
      query: ({ albumId, photoId }) => ({
        url: `/admin/gallery/${albumId}/photos/${photoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Gallery'],
    }),
  }),
});

export const {
  useGetPublicAlbumsQuery,
  useGetAdminAlbumsQuery,
  useCreateAlbumMutation,
  useUpdateAlbumMutation,
  useToggleAlbumStatusMutation,
  useDeleteAlbumMutation,
  useAddPhotosMutation,
  useDeletePhotoMutation,
} = galleryApi;
