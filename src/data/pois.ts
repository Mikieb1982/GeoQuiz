import { POI } from '../types';

/**
 * Points of Interest (POIs) for Bad Belzig
 * Coordinates based on user-provided DMS, converted to Decimal Degrees.
 */

export const pois: POI[] = [
  {
    id: 'burg-eisenhardt',
    coordinates: {
      latitude: 52.133333, // Converted from 52° 8′ N, 12° 35′ O (Approximate)
      longitude: 12.583333 // Converted from 52° 8′ N, 12° 35′ O (Approximate)
    },
    geofenceRadius: 50, // in meters
    names: {
      en: 'Burg Eisenhardt',
      de: 'Burg Eisenhardt'
    },
    descriptions: {
      en: 'A medieval castle dating back to the 12th century, offering panoramic views of Bad Belzig and the surrounding area.',
      de: 'Eine mittelalterliche Burg aus dem 12. Jahrhundert, die einen Panoramablick auf Bad Belzig und die Umgebung bietet.'
    },
    quizId: 'quiz-burg-eisenhardt',
    badgeId: 'badge-burg-eisenhardt'
  },
  {
    id: 'steintherme',
    coordinates: {
      latitude: 52.145306, // Converted from 52°08'43.1"N 12°35'44.4"E
      longitude: 12.595667 // Converted from 52°08'43.1"N 12°35'44.4"E
    },
    geofenceRadius: 50,
    names: {
      en: 'SteinTherme (Thermal Bath)',
      de: 'SteinTherme'
    },
    descriptions: {
      en: 'A modern thermal bath complex offering relaxation and wellness facilities with natural thermal water.',
      de: 'Ein moderner Thermalbadkomplex, der Entspannungs- und Wellnesseinrichtungen mit natürlichem Thermalwasser bietet.'
    },
    quizId: 'quiz-steintherme',
    badgeId: 'badge-steintherme'
  },
  {
    id: 'marktplatz',
    coordinates: {
      // NOTE: Using previously searched coords as user-provided 52°9', 12°36' seemed incorrect.
      latitude: 52.1424,
      longitude: 12.5894
    },
    geofenceRadius: 40,
    names: {
      en: 'Marktplatz (Market Square)',
      de: 'Marktplatz'
    },
     descriptions: {
        en: 'The historic market square in the heart of Bad Belzig, surrounded by colorful buildings and cafes.',
        de: 'Der historische Marktplatz im Herzen von Bad Belzig, umgeben von bunten Gebäuden und Cafés.'
    },
    quizId: 'quiz-marktplatz',
    badgeId: 'badge-marktplatz'
  },
  {
    id: 'rathaus',
    coordinates: {
      // NOTE: Using previously searched coords as user-provided 52°9', 12°36' seemed incorrect.
      latitude: 52.1426,
      longitude: 12.5896
    },
    geofenceRadius: 30,
    names: {
      en: 'Rathaus (Town Hall)',
      de: 'Rathaus'
    },
    descriptions: {
        en: 'The historic town hall of Bad Belzig, an important administrative building with architectural significance.',
        de: 'Das historische Rathaus von Bad Belzig, ein wichtiges Verwaltungsgebäude mit architektonischer Bedeutung.'
    },
    quizId: 'quiz-rathaus',
    badgeId: 'badge-rathaus'
  },
  {
    id: 'st-marienkirche',
    coordinates: {
      latitude: 52.141694, // Converted from 52° 8′ 30.1″ N, 12° 35′ 14.5″ E
      longitude: 12.587361 // Converted from 52° 8′ 30.1″ N, 12° 35′ 14.5″ E
    },
    geofenceRadius: 40,
    names: {
      en: "St. Mary's Church",
      de: 'St. Marienkirche'
    },
    descriptions: {
        en: 'A beautiful church with a rich history, featuring impressive architecture and religious artifacts.',
        de: 'Eine wunderschöne Kirche mit einer reichen Geschichte, die durch beeindruckende Architektur und religiöse Artefakte besticht.'
    },
    quizId: 'quiz-st-marienkirche',
    badgeId: 'badge-st-marienkirche'
  },
  {
    id: 'bricciuskapelle',
    coordinates: {
      latitude: 52.136611, // Converted from 52° 8′ 11.8″ N, 12° 35′ 1.4″ E
      longitude: 12.583722 // Converted from 52° 8′ 11.8″ N, 12° 35′ 1.4″ E
    },
    geofenceRadius: 30,
    names: {
      en: 'Briccius Chapel',
      de: 'Bricciuskapelle'
    },
    descriptions: {
        en: 'A historic chapel located on the castle grounds, named after Saint Briccius.',
        de: 'Eine historische Kapelle auf dem Burggelände, benannt nach dem Heiligen Briccius.'
    },
    quizId: 'quiz-bricciuskapelle',
    badgeId: 'badge-bricciuskapelle'
  },
  {
    id: 'heimatmuseum',
    coordinates: {
      latitude: 52.133333, // Using converted Burg Eisenhardt coordinates
      longitude: 12.583333 // Using converted Burg Eisenhardt coordinates
    },
    geofenceRadius: 30,
    names: {
      en: 'Heimatmuseum (Museum)',
      de: 'Heimatmuseum'
    },
    descriptions: {
        en: 'A local history museum located in the castle gatehouse, showcasing the cultural heritage of Bad Belzig.',
        de: 'Ein Heimatmuseum im Torhaus der Burg, das das kulturelle Erbe von Bad Belzig präsentiert.'
    },
    quizId: 'quiz-heimatmuseum',
    badgeId: 'badge-heimatmuseum'
  },
  {
    id: 'postmeilensaule',
    coordinates: {
      latitude: 52.136944, // Converted from 52° 8′ 13″ N, 12° 35′ 12.1″ E
      longitude: 12.586694 // Converted from 52° 8′ 13″ N, 12° 35′ 12.1″ E
    },
    geofenceRadius: 20,
    names: {
      en: 'Saxon Post Milestone',
      de: 'Sächsische Postmeilensäule'
    },
     descriptions: {
        en: 'A historic milestone from the Saxon postal system, marking distances to other cities.',
        de: 'Ein historischer Meilenstein aus dem sächsischen Postsystem, der die Entfernungen zu anderen Städten markiert.'
    },
    quizId: 'quiz-postmeilensaule',
    badgeId: 'badge-postmeilensaule'
  },
  {
    id: 'flaming-bahnhof',
    coordinates: {
      latitude: 52.135833, // Converted from 52° 8′ 9″ N, 12° 35′ 42″ E
      longitude: 12.595000 // Converted from 52° 8′ 9″ N, 12° 35′ 42″ E
    },
    geofenceRadius: 50,
    names: {
      en: 'Fläming-Bahnhof Bad Belzig (Railway Station)',
      de: 'Fläming-Bahnhof Bad Belzig'
    },
    descriptions: {
        en: 'The railway station of Bad Belzig, connecting the town to Berlin and other destinations.',
        de: 'Der Bahnhof von Bad Belzig, der die Stadt mit Berlin und anderen Zielen verbindet.'
    },
    quizId: 'quiz-flaming-bahnhof',
    badgeId: 'badge-flaming-bahnhof'
  },
  {
    id: 'reissiger-haus',
    coordinates: {
      latitude: 52.136528, // Converted from 52° 8′ 11.5″ N, 12° 35′ 37.1″ E
      longitude: 12.593639 // Converted from 52° 8′ 11.5″ N, 12° 35′ 37.1″ E
    },
    geofenceRadius: 30,
    names: {
      en: 'Reißiger-Haus (Historic building)',
      de: 'Reißiger-Haus'
    },
    descriptions: {
        en: 'A historic building named after Carl Gottlieb Reißiger, a notable composer from the region.',
        de: 'Ein historisches Gebäude, benannt nach Carl Gottlieb Reißiger, einem bedeutenden Komponisten aus der Region.'
    },
    quizId: 'quiz-reissiger-haus',
    badgeId: 'badge-reissiger-haus'
  }
];
