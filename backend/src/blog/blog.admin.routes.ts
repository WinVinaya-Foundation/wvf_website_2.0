import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { HttpError } from '../lib/httpError.js';
import { categoriesService } from '../categories/categories.service.js';
import { blogService } from './blog.service.js';

import { blogUpload } from './blog.storage.js';

export const adminBlogRouter = Router();

adminBlogRouter.use(authenticate);

const blogImageFields = blogUpload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'bannerImage', maxCount: 1 },
]);

// GET /api/admin/blog - Get all blog posts
adminBlogRouter.get('/', async (_req, res, next) => {
  try {
    const posts = await blogService.getAllAdminPosts();
    res.json({ posts });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/blog/:id - Get single blog post
adminBlogRouter.get('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const post = await blogService.getAdminPostById(id);
    res.json({ post });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/blog - Create a new blog post
adminBlogRouter.post('/', blogImageFields, async (req, res, next) => {
  try {
    const { title, slug, excerpt, categoryId, authorName, authorRole, publishedAt, body, coverImageUrl, bannerImageUrl, isActive } = req.body || {};

    if (!title || typeof title !== 'string' || !title.trim()) {
      throw new HttpError(400, 'Title is required');
    }
    if (!excerpt || typeof excerpt !== 'string' || !excerpt.trim()) {
      throw new HttpError(400, 'Excerpt is required');
    }
    if (!categoryId || typeof categoryId !== 'string') {
      throw new HttpError(400, 'Category is required');
    }
    await categoriesService.getCategoryById(categoryId);

    if (!authorName || typeof authorName !== 'string' || !authorName.trim()) {
      throw new HttpError(400, 'Author name is required');
    }
    if (!authorRole || typeof authorRole !== 'string' || !authorRole.trim()) {
      throw new HttpError(400, 'Author role is required');
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const coverFile = files?.['coverImage']?.[0];
    const bannerFile = files?.['bannerImage']?.[0];

    const finalCoverUrl = coverFile ? `/uploads/blog/${coverFile.filename}` : coverImageUrl || null;
    const finalBannerUrl = bannerFile ? `/uploads/blog/${bannerFile.filename}` : bannerImageUrl || null;

    let parsedBody = body;
    if (typeof body === 'string') {
      try {
        parsedBody = JSON.parse(body);
      } catch {
        parsedBody = [];
      }
    }

    const post = await blogService.createPost({
      title,
      slug,
      excerpt,
      categoryId,
      authorName,
      authorRole,
      publishedAt,
      body: parsedBody,
      coverImageUrl: finalCoverUrl,
      bannerImageUrl: finalBannerUrl,
      isActive: isActive !== undefined ? String(isActive) === 'true' || isActive === true : true,
    });

    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/blog/:id - Update blog post
adminBlogRouter.put('/:id', blogImageFields, async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { title, slug, excerpt, categoryId, authorName, authorRole, publishedAt, body, coverImageUrl, bannerImageUrl, isActive } = req.body || {};

    if (categoryId !== undefined) {
      await categoriesService.getCategoryById(categoryId);
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const coverFile = files?.['coverImage']?.[0];
    const bannerFile = files?.['bannerImage']?.[0];

    const finalCoverUrl = coverFile ? `/uploads/blog/${coverFile.filename}` : coverImageUrl !== undefined ? coverImageUrl : undefined;
    const finalBannerUrl = bannerFile ? `/uploads/blog/${bannerFile.filename}` : bannerImageUrl !== undefined ? bannerImageUrl : undefined;

    let parsedBody = body;
    if (typeof body === 'string') {
      try {
        parsedBody = JSON.parse(body);
      } catch {
        parsedBody = undefined;
      }
    }

    const post = await blogService.updatePost(id, {
      ...(title !== undefined && { title }),
      ...(slug !== undefined && { slug }),
      ...(excerpt !== undefined && { excerpt }),
      ...(categoryId !== undefined && { categoryId }),
      ...(authorName !== undefined && { authorName }),
      ...(authorRole !== undefined && { authorRole }),
      ...(publishedAt !== undefined && { publishedAt }),
      ...(parsedBody !== undefined && { body: parsedBody }),
      ...(finalCoverUrl !== undefined && { coverImageUrl: finalCoverUrl }),
      ...(finalBannerUrl !== undefined && { bannerImageUrl: finalBannerUrl }),
      ...(isActive !== undefined && { isActive: String(isActive) === 'true' || isActive === true }),
    });

    res.json({ post });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/blog/:id/status - Toggle active status
adminBlogRouter.patch('/:id/status', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      throw new HttpError(400, 'isActive parameter must be a boolean');
    }
    const post = await blogService.togglePostStatus(id, isActive);
    res.json({ post });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/blog/:id - Delete blog post
adminBlogRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id);
    await blogService.deletePost(id);
    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (err) {
    next(err);
  }
});
