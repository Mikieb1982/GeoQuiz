import { AppSettings, UserProgress } from '../types';

/**
 * Default app settings
 */
export const defaultSettings: AppSettings = {
  language: 'en', // Default language is English
  mapZoomLevel: 14, // Default zoom level for the map
  notificationsEnabled: true // Notifications enabled by default
};

/**
 * Initial user progress (empty)
 */
export const initialUserProgress: UserProgress = {
  completedQuizzes: [],
  earnedBadges: []
};
