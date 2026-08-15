import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { env } from '../env.js';
import { HttpError } from '../lib/httpError.js';

export const UPLOADS_BASE_DIR = path.join(process.cwd(), 'uploads');
export const REPORTS_UPLOADS_DIR = path.join(UPLOADS_BASE_DIR, 'reports');

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx']);

export function getCategoryFolder(categoryRaw?: string): string {
  const cat = (categoryRaw || 'general').toLowerCase();
  switch (cat) {
    case 'annual':
      return 'annual';
    case 'financial':
      return 'financial';
    case 'legal':
      return 'legal';
    case 'research':
      return 'research';
    default:
      return 'general';
  }
}

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const categoryFolder = getCategoryFolder(req.body.category);
    const targetDir = path.join(REPORTS_UPLOADS_DIR, categoryFolder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    cb(null, targetDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBaseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${Date.now()}_${safeBaseName}${ext}`;
    cb(null, filename);
  },
});

export const reportUpload = multer({
  storage,
  limits: {
    fileSize: env.MAX_REPORT_FILE_SIZE_MB * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_MIME_TYPES.has(file.mimetype) || ALLOWED_EXTENSIONS.has(ext)) {
      cb(null, true);
    } else {
      cb(
        new HttpError(
          400,
          `Invalid file format. Supported file formats are: PDF, PPT/PPTX, Word (DOC/DOCX), and Excel (XLS/XLSX).`
        )
      );
    }
  },
});
