// lib/data/reviewerFlashcards.js
import reviewersData from './reviewers.json';

export const getFolderReviewers = (folderId) => {
  const folder = reviewersData.folders.find(f => f.id === folderId);
  return folder?.reviewers || [];
};
