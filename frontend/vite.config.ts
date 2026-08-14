import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom Vite plugin to auto-generate sitemap.xml and robots.txt
function generateSeoFiles() {
  const generate = () => {
    const domain = 'https://winvinayafoundation.org';
    
    // Static paths defined in frontend routes
    const paths = [
      '/',
      '/contact',
      '/about/our-story',
      '/about/team',
      '/about/awards',
      '/about/reports',
      '/programs',
      '/programs/academy',
      '/programs/samarth',
      '/programs/events-gallery',
      '/impact/success-stories',
      '/impact/testimonials',
      '/impact/performance-reports',
      '/impact/certifications',
      '/involve/volunteer',
      '/involve/internships',
      '/involve/corporate-engagement',
      '/involve/sign-language',
      '/resources/blog',
      '/resources/newsletter',
      '/resources/ebook',
      '/resources/careers',
      '/donate'
    ];

    // Dynamically extract blog post slugs from blogContent.ts
    try {
      const blogContentPath = path.resolve(__dirname, 'src/pages/resources/blogContent.ts');
      if (fs.existsSync(blogContentPath)) {
        const content = fs.readFileSync(blogContentPath, 'utf8');
        const slugRegex = /slug:\s*['"`]([^'"`]+)['"`]/g;
        let match;
        while ((match = slugRegex.exec(content)) !== null) {
          paths.push(`/resources/blog/${match[1]}`);
        }
      }
    } catch (err) {
      console.error('[SEO Plugin] Failed to parse blogContent.ts for sitemap:', err);
    }

    // Generate sitemap.xml content
    const now = new Date().toISOString().split('T')[0];
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    paths.forEach(p => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${domain}${p}</loc>\n`;
      sitemap += `    <lastmod>${now}</lastmod>\n`;
      sitemap += '    <changefreq>monthly</changefreq>\n';
      sitemap += `    <priority>${p === '/' ? '1.0' : '0.8'}</priority>\n`;
      sitemap += '  </url>\n';
    });
    sitemap += '</urlset>\n';

    // Output directories
    const outDir = path.resolve(__dirname, 'dist');
    const publicDir = path.resolve(__dirname, 'public');

    // Ensure dist/ exists
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // Write sitemap.xml to both public/ (source repository) and dist/ (build output)
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
    if (fs.existsSync(publicDir)) {
      fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    }

    // Generate robots.txt content
    const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${domain}/sitemap.xml
`;
    
    // Write robots.txt to both public/ (source repository) and dist/ (build output)
    fs.writeFileSync(path.join(outDir, 'robots.txt'), robots);
    if (fs.existsSync(publicDir)) {
      fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
    }

    console.log(`[SEO Plugin] Auto-generated sitemap.xml and robots.txt with ${paths.length} URLs successfully.`);
  };

  // Run immediately on config evaluation (during dev server startup/reloads)
  generate();

  return {
    name: 'generate-seo-files',
    closeBundle() {
      generate();
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), generateSeoFiles()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
