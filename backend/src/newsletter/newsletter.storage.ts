import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { HttpError } from '../lib/httpError.js';

export const NEWSLETTER_UPLOADS_DIR = path.join(process.cwd(), 'uploads', 'newsletters');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(NEWSLETTER_UPLOADS_DIR)) {
      fs.mkdirSync(NEWSLETTER_UPLOADS_DIR, { recursive: true });
    }
    cb(null, NEWSLETTER_UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBaseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${Date.now()}_${safeBaseName}${ext}`;
    cb(null, filename);
  },
});

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.jpg', '.jpeg', '.png', '.webp']);
const ALLOWED_MIMES = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

export const newsletterUpload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25 MB limit
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.has(ext) || ALLOWED_MIMES.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new HttpError(400, 'Invalid file format. Supported formats are PDF for documents, and JPG, PNG, WEBP for cover images.'));
    }
  },
});
