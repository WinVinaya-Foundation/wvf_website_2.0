import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import SignLanguageRoundedIcon from '@mui/icons-material/SignLanguageRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';
import type { BlogCategoryKey } from '../../../pages/resources/blogContent';

/** Icon per blog category — shared across cards, the featured post, and the article page so the
 * same category always reads the same visually. */
export const BLOG_CATEGORY_ICONS: Record<BlogCategoryKey, typeof BusinessCenterRoundedIcon> = {
  workplace: BusinessCenterRoundedIcon,
  signLanguage: SignLanguageRoundedIcon,
  community: GroupsRoundedIcon,
  accessibility: AccessibilityNewRoundedIcon,
};
