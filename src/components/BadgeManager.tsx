'use client';

import { useState } from 'react';
import { Badge } from '../types';
import { badges } from '../data/badges';


// Hook for managing badges
export const useBadgeManager = () => {
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  
  // Award a badge when a quiz is completed with a perfect score
  const awardBadge = (poiId: string): Badge | null => {
    const badge = badges.find(b => b.poiId === poiId);
    
    if (badge && !earnedBadges.includes(badge.id)) {
      setEarnedBadges(prev => [...prev, badge.id]);
      setNewBadge(badge);
      setShowBadgeModal(true);
      return badge;
    }
    
    return null;
  };
  
  // Check if a badge has been earned
  const hasBadge = (badgeId: string): boolean => {
    return earnedBadges.includes(badgeId);
  };
  
  // Get all earned badges
  const getEarnedBadges = (): Badge[] => {
    return badges.filter(badge => earnedBadges.includes(badge.id));
  };
  
  // Close the badge modal
  const closeBadgeModal = () => {
    setShowBadgeModal(false);
    setNewBadge(null);
  };
  
  // Show the badge collection
  const [showBadgeCollection, setShowBadgeCollection] = useState(false);
  
  const openBadgeCollection = () => {
    setShowBadgeCollection(true);
  };
  
  const closeBadgeCollection = () => {
    setShowBadgeCollection(false);
  };
  
  return {
    earnedBadges,
    awardBadge,
    hasBadge,
    getEarnedBadges,
    newBadge,
    showBadgeModal,
    closeBadgeModal,
    showBadgeCollection,
    openBadgeCollection,
    closeBadgeCollection
  };
};
