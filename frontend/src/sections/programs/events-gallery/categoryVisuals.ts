import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import type { CategoryColor, CategoryRef } from '../../../store/api/categoriesApi';

export type MuiPaletteColor = 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'error';

/** Categories are admin-managed (see AdminEventsPage/AdminGalleryPage), so there's no fixed set
 * of icons to key off — every category renders with the same generic icon and whichever theme
 * color the admin picked when creating it. */
export const CATEGORY_ICON = CategoryRoundedIcon;

export const CATEGORY_COLOR_MAP: Record<CategoryColor, MuiPaletteColor> = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
};

export function getCategoryColor(color?: CategoryColor): MuiPaletteColor {
  if (!color || !(color in CATEGORY_COLOR_MAP)) {
    return 'primary';
  }
  return CATEGORY_COLOR_MAP[color];
}

export function getCategoryMeta(category?: CategoryRef | null) {
  if (!category) {
    return {
      label: 'General',
      color: 'primary' as MuiPaletteColor,
      Icon: CATEGORY_ICON,
    };
  }
  return {
    label: category.label,
    color: getCategoryColor(category.color),
    Icon: CATEGORY_ICON,
  };
}

/** Legacy helper for backward compatibility */
export function categoryKeyFromBackend(category: CategoryRef | string): string {
  if (typeof category === 'string') return category;
  return category?.id || category?.label || 'general';
}
