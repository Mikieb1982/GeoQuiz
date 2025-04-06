'use client';

import React, { useState, useEffect } from 'react';
import { POI } from '../types';

interface GeolocationServiceProps {
  children: React.ReactNode;
  onLocationUpdate: (position: GeolocationPosition) => void;
  onError: (error: GeolocationPositionError) => void;
}

// Component to handle geolocation services
export const GeolocationService: React.FC<GeolocationServiceProps> = ({ 
  children, 
  onLocationUpdate, 
  onError 
}) => {
  const [watchId, setWatchId] = useState<number | null>(null);

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      onError({
        code: 2,
        message: 'Geolocation is not supported by this browser.',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      });
      return;
    }

    // Start watching position
    const id = navigator.geolocation.watchPosition(
      onLocationUpdate,
      onError,
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
      }
    );
    
    setWatchId(id);
    
    // Clean up on unmount
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [onLocationUpdate, onError]);

  return <>{children}</>;
};

// Utility functions for geolocation calculations
export const GeolocationUtils = {
  // Calculate distance between two coordinates in meters
  calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  },

  // Check if user is within geofence radius of a POI
  isWithinGeofence: (userLat: number, userLng: number, poi: POI): boolean => {
    const distance = GeolocationUtils.calculateDistance(
      userLat,
      userLng,
      poi.coordinates.latitude,
      poi.coordinates.longitude
    );
    
    return distance <= poi.geofenceRadius;
  },

  // Get all POIs that user is currently within range of
  getPoisInRange: (userLat: number, userLng: number, pois: POI[]): POI[] => {
    return pois.filter(poi => 
      GeolocationUtils.isWithinGeofence(userLat, userLng, poi)
    );
  },

  // Get distance to a POI in meters
  getDistanceToPoi: (userLat: number, userLng: number, poi: POI): number => {
    return GeolocationUtils.calculateDistance(
      userLat,
      userLng,
      poi.coordinates.latitude,
      poi.coordinates.longitude
    );
  },

  // Format distance for display
  formatDistance: (distance: number): string => {
    if (distance < 1000) {
      return `${Math.round(distance)} m`;
    } else {
      return `${(distance / 1000).toFixed(1)} km`;
    }
  }
};

// Hook for using geolocation
export const useGeolocation = () => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        code: 2,
        message: 'Geolocation is not supported by this browser.',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      });
      setLoading(false);
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setPosition(position);
      setLoading(false);
      setError(null);
    };

    const errorHandler = (error: GeolocationPositionError) => {
      setError(error);
      setLoading(false);
    };

    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { position, error, loading };
};
