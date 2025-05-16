import ObjectId from 'bson-objectid';

/**
 * Generates a new MongoDB ObjectId string.
 */
export const generateId = (): string => {
  return new ObjectId().toString();
};
