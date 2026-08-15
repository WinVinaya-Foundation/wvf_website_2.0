import { Router } from 'express';
import { blogService } from './blog.service.js';

export const publicBlogRouter = Router();

// GET /api/blog - Fetch all active published blog posts
publicBlogRouter.get('/', async (_req, res, next) => {
  try {
    const posts = await blogService.getPublicPosts();
    res.json({ posts });
  } catch (err) {
    next(err);
  }
});

// GET /api/blog/:slug - Fetch single blog post by slug with adjacent post navigation
publicBlogRouter.get('/:slug', async (req, res, next) => {
  try {
    const slug = String(req.params.slug);
    const result = await blogService.getPublicPostBySlug(slug);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
