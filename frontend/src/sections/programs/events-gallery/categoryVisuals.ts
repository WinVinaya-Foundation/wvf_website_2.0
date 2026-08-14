import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { eventCategories, type EventCategoryKey, type EventCategoryMeta } from '../../../pages/programs/eventsGalleryContent';

/** Icon per event/gallery category — shared between UpcomingEventsSection and GallerySection so
 * the same category always reads the same visually across the page. */
export const CATEGORY_ICONS: Record<EventCategoryKey, typeof SchoolRoundedIcon> = {
  academy: SchoolRoundedIcon,
  samarth: StorefrontRoundedIcon,
  community: GroupsRoundedIcon,
  corporate: WorkspacePremiumRoundedIcon,
};

export const CATEGORY_META: Record<EventCategoryKey, EventCategoryMeta> = Object.fromEntries(
  eventCategories.map((meta) => [meta.key, meta]),
) as Record<EventCategoryKey, EventCategoryMeta>;
