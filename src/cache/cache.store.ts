import NodeCache from "node-cache";

/**
 * A singleton instance of NodeCache to manage in-memory caching.
 *
 * The cache is configured with the following options:
 * - `stdTTL` (Standard Time-To-Live): 600 seconds (10 minutes).
 * - `checkperiod`: 120 seconds (Interval to check for expired keys).
 *
 * This cache instance can be used throughout the application to store and
 * retrieve frequently accessed data, reducing the need for repetitive
 * expensive operations such as database or API calls.
 *
 * Documentation for NodeCache: {@link https://github.com/node-cache/node-cache}
 */
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

export default cache;
