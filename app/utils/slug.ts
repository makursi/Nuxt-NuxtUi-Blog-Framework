import slugify from 'slugify';

/**
 * Generate URL-friendly slug from title
 * @param title Post title
 * @returns Generated slug
 */
export const generateSlug = (title: string): string => {
  return slugify(title, {
    lower: true,        // Convert to lowercase
    strict: true,       // Remove special characters
    locale: 'en',       // Language setting
    trim: true          // Remove leading/trailing spaces
  });
};

/**
 * Validate slug format
 * @param slug Slug to validate
 * @returns Whether the slug is valid
 */
export const isValidSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
};
