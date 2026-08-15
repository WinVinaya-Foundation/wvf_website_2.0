import { prisma } from '../lib/prisma.js';
import { HttpError } from '../lib/httpError.js';

export interface CreateBlogPostInput {
  title: string;
  slug?: string;
  excerpt: string;
  categoryId: string;
  authorName: string;
  authorRole: string;
  publishedAt?: string | Date;
  body: unknown;
  coverImageUrl?: string;
  isActive?: boolean;
}

export interface UpdateBlogPostInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  categoryId?: string;
  authorName?: string;
  authorRole?: string;
  publishedAt?: string | Date;
  body?: unknown;
  coverImageUrl?: string | null;
  isActive?: boolean;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const blogService = {
  /** Public: fetch active published blog posts */
  async getPublicPosts() {
    return prisma.blogPost.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { publishedAt: 'desc' },
    });
  },

  /** Public: fetch single published blog post by slug along with previous and next article navigation */
  async getPublicPostBySlug(slug: string) {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!post || !post.isActive) {
      throw new HttpError(404, 'Blog post not found');
    }

    // Get all active posts in published order to derive adjacent navigation
    const allActive = await prisma.blogPost.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { publishedAt: 'desc' },
    });

    const index = allActive.findIndex((p) => p.id === post.id);
    const previousPost = index < allActive.length - 1 ? allActive[index + 1] : undefined;
    const nextPost = index > 0 ? allActive[index - 1] : undefined;

    return { post, previousPost, nextPost };
  },

  /** Admin: fetch all blog posts (active & inactive) */
  async getAllAdminPosts() {
    return prisma.blogPost.findMany({
      include: { category: true },
      orderBy: { publishedAt: 'desc' },
    });
  },

  /** Admin: fetch single blog post by ID */
  async getAdminPostById(id: string) {
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!post) {
      throw new HttpError(404, 'Blog post not found');
    }
    return post;
  },

  /** Admin: create a new blog post */
  async createPost(data: CreateBlogPostInput) {
    let slug = data.slug?.trim() || generateSlug(data.title);
    if (!slug) {
      slug = `post-${Date.now()}`;
    }

    const existingSlug = await prisma.blogPost.findUnique({ where: { slug } });
    if (existingSlug) {
      slug = `${slug}-${Math.floor(Math.random() * 1000)}`;
    }

    return prisma.blogPost.create({
      data: {
        title: data.title.trim(),
        slug,
        excerpt: data.excerpt.trim(),
        categoryId: data.categoryId,
        authorName: data.authorName.trim(),
        authorRole: data.authorRole.trim(),
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
        body: (data.body as object) ?? [],
        coverImageUrl: data.coverImageUrl || null,
        isActive: data.isActive ?? true,
      },
      include: { category: true },
    });
  },

  /** Admin: update an existing blog post */
  async updatePost(id: string, data: UpdateBlogPostInput) {
    const existing = await this.getAdminPostById(id);

    let slug = data.slug !== undefined ? data.slug.trim() : existing.slug;
    if (data.slug !== undefined && data.slug.trim() !== existing.slug) {
      if (!slug) slug = generateSlug(data.title || existing.title);
      const slugCheck = await prisma.blogPost.findUnique({ where: { slug } });
      if (slugCheck && slugCheck.id !== id) {
        throw new HttpError(409, 'A blog post with this URL slug already exists');
      }
    }

    return prisma.blogPost.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title.trim() }),
        slug,
        ...(data.excerpt !== undefined && { excerpt: data.excerpt.trim() }),
        ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
        ...(data.authorName !== undefined && { authorName: data.authorName.trim() }),
        ...(data.authorRole !== undefined && { authorRole: data.authorRole.trim() }),
        ...(data.publishedAt !== undefined && { publishedAt: new Date(data.publishedAt) }),
        ...(data.body !== undefined && { body: (data.body as object) ?? [] }),
        ...(data.coverImageUrl !== undefined && { coverImageUrl: data.coverImageUrl || null }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
      include: { category: true },
    });
  },

  /** Admin: toggle active visibility */
  async togglePostStatus(id: string, isActive: boolean) {
    await this.getAdminPostById(id);
    return prisma.blogPost.update({
      where: { id },
      data: { isActive },
      include: { category: true },
    });
  },

  /** Admin: delete a blog post */
  async deletePost(id: string) {
    await this.getAdminPostById(id);
    return prisma.blogPost.delete({ where: { id } });
  },
};
