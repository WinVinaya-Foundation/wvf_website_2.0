import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { HttpError } from '../lib/httpError.js';
import { careersUpload } from './careers.storage.js';
import { careersService } from './careers.service.js';

export const adminCareersRouter = Router();

adminCareersRouter.use(authenticate);

// GET /api/admin/careers - Fetch all job openings
adminCareersRouter.get('/', async (_req, res, next) => {
  try {
    const jobs = await careersService.getAllAdminJobOpenings();
    res.json({ jobs });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/careers - Create job opening with optional PDF file upload
adminCareersRouter.post('/', careersUpload.single('file'), async (req, res, next) => {
  try {
    const { title, department, employmentType, location, experience, description, requirements, isActive } = req.body || {};

    if (!title || typeof title !== 'string' || !title.trim()) {
      throw new HttpError(400, 'Job title is required');
    }
    if (!location || typeof location !== 'string' || !location.trim()) {
      throw new HttpError(400, 'Location is required');
    }
    if (!experience || typeof experience !== 'string' || !experience.trim()) {
      throw new HttpError(400, 'Experience is required');
    }
    if (!description || typeof description !== 'string' || !description.trim()) {
      throw new HttpError(400, 'Description is required');
    }

    const file = req.file;
    const fileUrl = file ? `/uploads/careers/${file.filename}` : null;
    const fileName = file ? file.originalname : null;
    const fileSize = file ? file.size : null;

    const job = await careersService.createJob({
      title,
      department,
      employmentType,
      location,
      experience,
      description,
      requirements,
      fileUrl,
      fileName,
      fileSize,
      isActive: isActive !== undefined ? String(isActive) === 'true' || isActive === true : true,
    });

    res.status(201).json({ job });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/careers/:id - Update job opening with optional PDF file upload
adminCareersRouter.put('/:id', careersUpload.single('file'), async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { title, department, employmentType, location, experience, description, requirements, isActive } = req.body || {};

    const file = req.file;
    const fileUrl = file ? `/uploads/careers/${file.filename}` : undefined;
    const fileName = file ? file.originalname : undefined;
    const fileSize = file ? file.size : undefined;

    const job = await careersService.updateJob(id, {
      ...(title !== undefined && { title }),
      ...(department !== undefined && { department }),
      ...(employmentType !== undefined && { employmentType }),
      ...(location !== undefined && { location }),
      ...(experience !== undefined && { experience }),
      ...(description !== undefined && { description }),
      ...(requirements !== undefined && { requirements }),
      ...(fileUrl !== undefined && { fileUrl, fileName, fileSize }),
      ...(isActive !== undefined && { isActive: String(isActive) === 'true' || isActive === true }),
    });

    res.json({ job });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/careers/:id/status - Toggle active status
adminCareersRouter.patch('/:id/status', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      throw new HttpError(400, 'isActive parameter must be a boolean');
    }
    const job = await careersService.toggleJobStatus(id, isActive);
    res.json({ job });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/careers/:id - Delete job opening
adminCareersRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await careersService.deleteJob(id);
    res.json({ success: true, message: 'Job opening deleted successfully' });
  } catch (err) {
    next(err);
  }
});
