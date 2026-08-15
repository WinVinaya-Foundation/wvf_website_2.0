import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { env } from '../env.js';
import { HttpError } from '../lib/httpError.js';

export const UPLOADS_BASE_DIR = path.join(process.cwd(), 'uploads');
export const GALLERY_UPLOADS_DIR = path.join(UPLOADS_BASE_DIR, 'gallery');

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(GALLERY_UPLOADS_DIR)) {
      fs.mkdirSync(GALLERY_UPLOADS_DIR, { recursive: true });
    }
    cb(null, GALLERY_UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBaseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${Date.now()}_${Math.round(Math.random() * 1e9)}_${safeBaseName}${ext}`;
    cb(null, filename);
  },
});

export const galleryUpload = multer({
  storage,
  limits: {
    fileSize: env.MAX_GALLERY_IMAGE_SIZE_MB * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_MIME_TYPES.has(file.mimetype) || ALLOWED_EXTENSIONS.has(ext)) {
      cb(null, true);
    } else {
      cb(new HttpError(400, 'Invalid file format. Supported formats are: JPG, PNG, and WEBP.'));
    }
  },
});
