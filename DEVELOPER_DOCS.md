# Developer Documentation - Bad Belzig Abenteuer Geo Quiz

This document provides technical details about the Bad Belzig Abenteuer Geo Quiz application for developers who want to understand, modify, or extend the codebase.

## Architecture Overview

The application follows a component-based architecture using Next.js and React. The main architectural components are:

1. **UI Components**: Reusable interface elements (Header, Footer, Button, Card, etc.)
2. **Map System**: Integration with Leaflet and OpenStreetMap
3. **Geolocation System**: Location tracking and proximity detection
4. **Quiz System**: Question presentation and scoring logic
5. **Badge System**: Award and collection management
6. **Localization**: Multi-language support with i18next
7. **Data Storage**: Local storage for user progress

## Component Structure

### Core Components

- `Layout.tsx`: Main application layout that integrates all components
- `Map.tsx`: Interactive map with POI markers and geofencing
- `GeolocationService.tsx`: Location tracking and distance calculation
- `ProximityDetector.tsx`: Detects when user enters POI geofences
- `QuizComponent.tsx`: Displays quiz questions and tracks answers
- `QuizManager.tsx`: Manages quiz state and completion
- `BadgeCard.tsx`: Individual badge display
- `BadgeCollection.tsx`: Grid view of all badges
- `BadgeManager.tsx`: Handles badge awarding and storage

### UI Components

- `Header.tsx`: App header with title and badge counter
- `Footer.tsx`: App footer with language switcher
- `Button.tsx`: Reusable button with multiple variants
- `Card.tsx`: Content container with consistent styling
- `LanguageSwitcher.tsx`: Toggle between English and German

### Testing Components

- `TestingGuide.tsx`: Testing procedures documentation
- `MockLocationControl.tsx`: Simulates user location for testing
- `TestResults.tsx`: Displays test outcomes

## Data Models

The application uses TypeScript interfaces for type safety:

- `POI`: Point of Interest with coordinates and metadata
- `Quiz`: Collection of questions for a specific POI
- `QuizQuestion`: Individual question with options and correct answer
- `Badge`: Achievement awarded for completing quizzes
- `UserProgress`: Tracks completed quizzes and earned badges
- `AppSettings`: User preferences like language

## Geolocation Implementation

The geolocation system uses the browser's Geolocation API:

1. `navigator.geolocation.watchPosition()` tracks user location in real-time
2. The Haversine formula calculates distances between coordinates
3. Geofence detection compares user distance to POI radius
4. When a user enters a geofence, the corresponding quiz is triggered

## Quiz System Implementation

The quiz system follows this flow:

1. Questions are loaded from data files based on POI
2. Questions are presented one at a time with multiple-choice options
3. User selections are validated against correct answers
4. Score is calculated based on correct answers
5. Perfect scores (5/5) trigger badge awards

## Badge System Implementation

Badges are awarded and managed as follows:

1. SVG badge graphics are stored in the public directory
2. Badge metadata is stored in data files
3. When a quiz is completed with a perfect score, the corresponding badge is awarded
4. Earned badges are stored in local storage
5. The badge collection displays all badges with earned/locked states

## Localization

The app uses i18next for internationalization:

1. Translation strings are defined in `i18n.ts`
2. The `useTranslation()` hook provides access to translations
3. Language can be switched between English and German
4. All UI text and content is available in both languages

## Local Storage

User progress is persisted using browser local storage:

1. Completed quizzes are stored with scores
2. Earned badges are stored by ID
3. User settings like language preference are saved
4. Data is loaded on app initialization
5. Changes are saved immediately when state updates

## Extending the App

### Adding New POIs

1. Add the POI data to `pois.ts` with coordinates and metadata
2. Create quiz questions in `quizzes.ts`
3. Add badge definition in `badges.ts`
4. Create SVG badge graphic in `/public/badges/`

### Adding New Languages

1. Add new language resources in `i18n.ts`
2. Update the `Language` type in `types/index.ts`
3. Add language option to `LanguageSwitcher.tsx`
4. Add translations for all POI names, descriptions, and quiz content

### Customizing UI

1. Modify color values in `tailwind.config.ts` to change theme
2. Update component styles as needed
3. Ensure accessibility standards are maintained

## Performance Considerations

- Map tiles are cached for offline use
- Location updates are throttled to conserve battery
- React components use memoization where appropriate
- Large data structures are loaded only when needed

## Security Considerations

- No sensitive user data is collected or stored
- Geolocation permissions are requested explicitly
- All data is stored locally on the user's device
- No external APIs are called except for map tiles

## Testing

The application includes comprehensive testing tools:

1. `TestingGuide.tsx` provides testing procedures
2. `MockLocationControl.tsx` simulates location for testing
3. Manual testing should cover all features across devices
4. Accessibility testing should verify WCAG compliance
