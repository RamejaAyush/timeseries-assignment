import logger from "./utils/logger";
import express, { Request, Response } from "express";
import timeseriesRouter from "./routes/timeseries.route";
import { requestLogger } from "./middlewares/request.middleware";
import { globalErrorHandler } from "./middlewares/error.middleware";
import { IHealthResponse, INotFoundResponse } from "./models/IResponse";

const app = express();

/**
 * Express application instance.
 *
 * This application:
 * - Configures middleware for logging, JSON parsing, and error handling.
 * - Defines routes for health checks and time-series operations.
 * - Handles 404 errors for undefined routes.
 */
app.use(requestLogger);
app.use(express.json());
app.use(globalErrorHandler);

/**
 * GET `/`
 *
 * Health check route to verify the server is running.
 * Responds with:
 * - Server status.
 * - A message indicating the server is operational.
 * - Uptime in seconds.
 *
 * @param {Request} _ - The HTTP request object (not used in this route).
 * @param {Response<IHealthResponse>} res - The HTTP response object with health check data.
 */
app.get("/", (_: Request, res: Response<IHealthResponse>): void => {
  logger.info("--- Inside '/' route | GET ---");
  res.json({
    status: true,
    message: "Backend cache server is up and running!",
    uptime: Math.floor(process.uptime()),
  });
});

/**
 * Mounts the time-series router at `/api`.
 *
 * This router handles all operations related to time-series data.
 */
app.use("/api", timeseriesRouter);

/**
 * Catch-all route for undefined endpoints.
 *
 * Responds with a 404 error and a JSON object indicating the route is not found.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Response<INotFoundResponse>} res - The HTTP response object with error details.
 */
app.all("*", (req: Request, res: Response<INotFoundResponse>): void => {
  logger.error(`--- Inside 404 route | ${req.method} ---`);
  res.status(404).json({
    status: false,
    message: "Route not found!",
  });
});

export default app;
