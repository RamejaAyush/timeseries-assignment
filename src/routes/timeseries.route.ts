import express, { Router } from "express";
import { timeseriesController } from "../controllers/timeseries.controller";

/**
 * Router for handling time-series related endpoints.
 *
 * This router defines the routes for time-series data operations. It connects
 * incoming requests to the appropriate controller functions.
 *
 * Routes:
 * - `GET /`: Fetches time-series data based on query parameters.
 */
const timeseriesRouter: Router = express.Router({ mergeParams: true });

/**
 * GET `/`
 *
 * Route to fetch time-series data. This route expects query parameters:
 * - `symbol`: The stock or asset symbol (e.g., "AAPL").
 * - `period`: The time period (e.g., "1min").
 * - `start`: The start timestamp for the data (ISO string).
 * - `end`: The end timestamp for the data (ISO string).
 *
 * Controller: {@link timeseriesController}
 */
timeseriesRouter.get("/", timeseriesController);

export default timeseriesRouter;
