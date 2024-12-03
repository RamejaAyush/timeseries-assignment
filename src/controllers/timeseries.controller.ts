import logger from "../utils/logger";
import { Request, Response } from "express";
import { getTimeSeriesFromCacheOrFetch } from "../services/timeseries.service";
import {
  ITimeseriesSuccessResponse,
  ITimeseriesErrorResponse,
} from "../models/IResponse";

/**
 * Controller to handle requests for time-series data.
 *
 * This controller processes incoming requests, validates query parameters,
 * retrieves data from the cache or external API (if necessary), and sends
 * the appropriate response.
 *
 * @param {Request} req - The HTTP request object containing query parameters:
 *   - `symbol`: The stock or asset symbol (e.g., "AAPL").
 *   - `period`: The time period (e.g., "1min").
 *   - `start`: The start timestamp for the data (ISO string).
 *   - `end`: The end timestamp for the data (ISO string).
 *
 * @param {Response<ITimeseriesSuccessResponse | ITimeseriesErrorResponse>} res - The HTTP response object.
 *   Responds with either:
 *   - `ITimeseriesSuccessResponse`: On successful data retrieval.
 *   - `ITimeseriesErrorResponse`: On errors or validation failures.
 *
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export const timeseriesController = async (
  req: Request,
  res: Response<ITimeseriesSuccessResponse | ITimeseriesErrorResponse>
): Promise<void> => {
  const { symbol, period, start, end } = req.query;

  if (!symbol || !period || !start || !end) {
    logger.warn("Missing required query parameters in timeseriesController");
    res.status(400).json({
      status: false,
      message: "Symbol, period, start, and end parameters are required",
    });
    return;
  }

  try {
    logger.info(
      `Received request for symbol: ${symbol}, period: ${period}, start: ${start}, end: ${end}`
    );

    const data = await getTimeSeriesFromCacheOrFetch(
      symbol as string,
      period as string,
      start as string,
      end as string
    );

    logger.info("Successfully retrieved data in timeseriesController");
    res.status(200).json({
      status: true,
      data,
    });
  } catch (error: any) {
    logger.error(`Error in timeseriesController: ${error.message}`);
    res.status(500).json({
      status: false,
      message: error.message || "An error occurred",
    });
  }
};
