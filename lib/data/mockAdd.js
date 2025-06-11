// lib/data/mockAdd.js
import { mockAcronyms } from '../data/mockFlashcards';

export const addMockAcronym = (newCard) => {
  mockAcronyms.push(newCard);
};

