import axios from "axios";
import logger from "../utils/logger";
import { getCache, setCache } from "../cache/cache.util";
import { TimeSeriesData, TimeSeriesEntry } from "../models/IResponse";

/**
 * Fetches time-series data from the cache or an external API.
 *
 * This function attempts to retrieve data from the in-memory cache first.
 * If the data is not found (cache miss), it fetches all available time-series
 * data from an external API, caches the data, and returns the requested range.
 *
 * @param {string} symbol - The stock or asset symbol (e.g., "AAPL").
 * @param {string} period - The time period for the data (e.g., "1min").
 * @param {string} start - The start timestamp for the data (ISO string).
 * @param {string} end - The end timestamp for the data (ISO string).
 *
 * @returns {Promise<TimeSeriesEntry[]>} - A promise that resolves to an array of time-series entries matching the request.
 *
 * @throws {Error} - Throws an error if the external API fails or if the requested data is not available.
 */
export const getTimeSeriesFromCacheOrFetch = async (
  symbol: string,
  period: string,
  start: string,
  end: string
): Promise<TimeSeriesEntry[]> => {
  const cacheKey = `${symbol}-${period}`;
  const cachedData = getCache(cacheKey) as TimeSeriesEntry[] | undefined;

  if (cachedData) {
    logger.info(`Cache hit for key: ${cacheKey}`);
    const filteredData = cachedData.filter((entry: TimeSeriesEntry) => {
      const entryTime = new Date(entry.time).getTime();
      return (
        entryTime >= new Date(start).getTime() &&
        entryTime <= new Date(end).getTime()
      );
    });
    logger.info(
      `Successfully retrieved filtered data from cache for ${cacheKey}`
    );
    return filteredData;
  }

  logger.warn(`Cache miss for key: ${cacheKey}. Fetching from external API...`);
  try {
    const response = await axios.get<TimeSeriesData[]>(
      "http://localhost:4000/timeseries"
    );
    const allData = response.data;

    allData.forEach((series: TimeSeriesData) => {
      const seriesKey = `${series.symbol}-${series.period}`;
      setCache(seriesKey, series.data);
      logger.info(`Data cached for key: ${seriesKey}`);
    });

    const seriesData = allData.find(
      (series: TimeSeriesData) =>
        series.symbol === symbol && series.period === period
    );

    if (!seriesData || !seriesData.data) {
      logger.error(
        `Requested data not found in the external API for key: ${cacheKey}`
      );
      throw new Error("Requested data not found in the external API");
    }

    const filteredData = seriesData.data.filter((entry: TimeSeriesEntry) => {
      const entryTime = new Date(entry.time).getTime();
      return (
        entryTime >= new Date(start).getTime() &&
        entryTime <= new Date(end).getTime()
      );
    });

    logger.info(
      `Successfully fetched and filtered data from the external API for ${cacheKey}`
    );
    return filteredData;
  } catch (error) {
    logger.error(`Error fetching data from external API: ${error}`);
    throw new Error("Failed to fetch data from external API");
  }
};
