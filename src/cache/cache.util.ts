import cache from "./cache.store";

/**
 * Stores a value in the cache with an optional time-to-live (TTL).
 *
 * @param {string} key - The unique key to identify the cached value.
 * @param {any} value - The value to store in the cache.
 * @param {number} [ttl=600] - The time-to-live in seconds (default is 600 seconds).
 * @returns {boolean} - Returns `true` if the key was successfully stored, otherwise `false`.
 */
export const setCache = (
  key: string,
  value: any,
  ttl: number = 600
): boolean => {
  return cache.set(key, value, ttl);
};

/**
 * Retrieves a value from the cache.
 *
 * @param {string} key - The unique key identifying the cached value.
 * @returns {any | undefined} - The cached value if it exists, or `undefined` if the key is not found or has expired.
 */
export const getCache = (key: string): any | undefined => {
  return cache.get(key);
};

/**
 * Deletes a specific key from the cache.
 *
 * @param {string} key - The unique key identifying the cached value to delete.
 * @returns {number} - The number of keys that were removed (0 if the key was not found).
 */
export const deleteCache = (key: string): number => {
  return cache.del(key);
};

/**
 * Clears all values from the cache.
 *
 * This operation flushes all stored data and resets the cache to an empty state.
 */
export const clearCache = (): void => {
  cache.flushAll();
};
