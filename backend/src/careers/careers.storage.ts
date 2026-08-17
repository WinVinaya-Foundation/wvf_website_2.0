import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { HttpError } from '../lib/httpError.js';

export const CAREERS_UPLOADS_DIR = path.join(process.cwd(), 'uploads', 'careers');

import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(CAREERS_UPLOADS_DIR)) {
      fs.mkdirSync(CAREERS_UPLOADS_DIR, { recursive: true });
    }
    cb(null, CAREERS_UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBaseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${Date.now()}_${crypto.randomUUID()}_${safeBaseName}${ext}`;
    cb(null, filename);
  },
});

export const careersUpload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25 MB limit
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.pdf' || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new HttpError(400, 'Invalid file format. Job description documents must be PDF files.'));
    }
  },
});
