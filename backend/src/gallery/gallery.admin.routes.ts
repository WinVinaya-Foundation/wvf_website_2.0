import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { HttpError } from '../lib/httpError.js';
import { env } from '../env.js';
import { categoriesService } from '../categories/categories.service.js';
import { galleryUpload } from './gallery.storage.js';
import { galleryService, type NewPhotoInput } from './gallery.service.js';

export const adminGalleryRouter = Router();

adminGalleryRouter.use(authenticate);

interface PhotoMeta {
  caption?: string;
  altText?: string;
}

function parsePhotosMeta(raw: unknown): PhotoMeta[] {
  if (!raw || typeof raw !== 'string') return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function filesToPhotoInputs(files: Express.Multer.File[], meta: PhotoMeta[]): NewPhotoInput[] {
  return files.map((file, index) => ({
    imageUrl: `/uploads/gallery/${file.filename}`,
    caption: meta[index]?.caption,
    altText: meta[index]?.altText,
  }));
}

// GET /api/admin/gallery - Get all albums (active and inactive) + max file size setting
adminGalleryRouter.get('/', async (_req, res, next) => {
  try {
    const albums = await galleryService.getAllAdminAlbums();
    res.json({ albums, maxFileSizeMb: env.MAX_GALLERY_IMAGE_SIZE_MB });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/gallery - Create a new album with optional initial photos
adminGalleryRouter.post('/', galleryUpload.array('photos', 20), async (req, res, next) => {
  try {
    const { title, categoryId, dateLabel, isActive, photosMeta } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      throw new HttpError(400, 'Title is required');
    }
    if (!categoryId || typeof categoryId !== 'string') {
      throw new HttpError(400, 'Category is required');
    }
    await categoriesService.getCategoryById(categoryId);
    if (!dateLabel || typeof dateLabel !== 'string' || !dateLabel.trim()) {
      throw new HttpError(400, 'Date label is required');
    }

    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    const meta = parsePhotosMeta(photosMeta);
    const photos = filesToPhotoInputs(files, meta);

    const album = await galleryService.createAlbum(
      {
        title: title.trim(),
        categoryId,
        dateLabel: dateLabel.trim(),
        isActive: isActive !== undefined ? String(isActive) === 'true' || isActive === true : true,
      },
      photos,
    );

    res.status(201).json({ album });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/gallery/:id - Update album metadata
adminGalleryRouter.put('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { title, categoryId, dateLabel, isActive } = req.body;

    if (categoryId !== undefined) {
      await categoriesService.getCategoryById(categoryId);
    }

    const album = await galleryService.updateAlbum(id, {
      ...(title !== undefined && { title: String(title).trim() }),
      ...(categoryId !== undefined && { categoryId: String(categoryId) }),
      ...(dateLabel !== undefined && { dateLabel: String(dateLabel).trim() }),
      ...(isActive !== undefined && { isActive: String(isActive) === 'true' || isActive === true }),
    });

    res.json({ album });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/gallery/:id/status - Toggle active/inactive visibility
adminGalleryRouter.patch('/:id/status', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      throw new HttpError(400, 'isActive parameter must be a boolean');
    }
    const album = await galleryService.toggleAlbumStatus(id, isActive);
    res.json({ album });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/gallery/:id - Delete an album and its photos
adminGalleryRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await galleryService.deleteAlbum(id);
    res.json({ success: true, message: 'Album deleted successfully' });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/gallery/:id/photos - Add photos to an existing album
adminGalleryRouter.post('/:id/photos', galleryUpload.array('photos', 20), async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const files = (req.files as Express.Multer.File[] | undefined) ?? [];
    if (files.length === 0) {
      throw new HttpError(400, 'At least one photo file is required');
    }
    const meta = parsePhotosMeta(req.body.photosMeta);
    const photos = filesToPhotoInputs(files, meta);
    const album = await galleryService.addPhotos(id, photos);
    res.status(201).json({ album });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/gallery/:id/photos/:photoId - Remove a single photo from an album
adminGalleryRouter.delete('/:id/photos/:photoId', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const photoId = String(req.params.photoId);
    const album = await galleryService.deletePhoto(id, photoId);
    res.json({ album });
  } catch (err) {
    next(err);
  }
});
