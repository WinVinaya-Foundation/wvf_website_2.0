import { Router } from 'express';
import { galleryService } from './gallery.service.js';

export const galleryRouter = Router();

// GET /api/gallery - Public route returning active albums with their photos
galleryRouter.get('/', async (_req, res, next) => {
  try {
    const albums = await galleryService.getPublicAlbums();
    res.json({ albums });
  } catch (err) {
    next(err);
  }
});
