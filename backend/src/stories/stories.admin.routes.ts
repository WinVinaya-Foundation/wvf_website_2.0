import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { HttpError } from '../lib/httpError.js';
import { storiesService } from './stories.service.js';

export const adminStoriesRouter = Router();

adminStoriesRouter.use(authenticate);

// GET /api/admin/stories - Get all stories for admin
adminStoriesRouter.get('/', async (_req, res, next) => {
  try {
    const stories = await storiesService.getAllAdminStories();
    res.json({ stories });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/stories - Create new success story
adminStoriesRouter.post('/', async (req, res, next) => {
  try {
    const { name, role, description, videoUrl, sortOrder, isActive } = req.body;
    if (!name || !role || !description || !videoUrl) {
      throw new HttpError(400, 'Name, role, description, and video URL are required');
    }

    const story = await storiesService.createStory({
      name: String(name).trim(),
      role: String(role).trim(),
      description: String(description).trim(),
      videoUrl: String(videoUrl).trim(),
      sortOrder: typeof sortOrder === 'number' ? sortOrder : 0,
      isActive: typeof isActive === 'boolean' ? isActive : true,
    });

    res.status(201).json({ story });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/stories/:id - Update success story
adminStoriesRouter.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const { name, role, description, videoUrl, sortOrder, isActive } = req.body;

    const story = await storiesService.updateStory(id, {
      ...(name && { name: String(name).trim() }),
      ...(role && { role: String(role).trim() }),
      ...(description && { description: String(description).trim() }),
      ...(videoUrl && { videoUrl: String(videoUrl).trim() }),
      ...(typeof sortOrder === 'number' && { sortOrder }),
      ...(typeof isActive === 'boolean' && { isActive }),
    });

    res.json({ story });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/stories/:id/status - Toggle story active visibility
adminStoriesRouter.patch('/:id/status', async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      throw new HttpError(400, 'isActive (boolean) is required');
    }

    const story = await storiesService.toggleStoryStatus(id, isActive);
    res.json({ story });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/stories/:id - Delete story
adminStoriesRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id as string;
    await storiesService.deleteStory(id);
    res.json({ success: true, message: 'Story deleted successfully' });
  } catch (err) {
    next(err);
  }
});
