import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { HttpError } from '../lib/httpError.js';

export const BLOG_UPLOADS_DIR = path.join(process.cwd(), 'uploads', 'blog');

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(BLOG_UPLOADS_DIR)) {
      fs.mkdirSync(BLOG_UPLOADS_DIR, { recursive: true });
    }
    cb(null, BLOG_UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBaseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${Date.now()}_${crypto.randomUUID()}_${safeBaseName}${ext}`;
    cb(null, filename);
  },
});

export const blogUpload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit per image
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_MIME_TYPES.has(file.mimetype) || ALLOWED_EXTENSIONS.has(ext)) {
      cb(null, true);
    } else {
      cb(new HttpError(400, 'Invalid image format. Supported formats are JPG, PNG, and WEBP.'));
    }
  },
});
