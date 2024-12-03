import logger from "../utils/logger";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to log incoming HTTP requests.
 *
 * This middleware logs the HTTP method and URL of each incoming request.
 * It provides a consistent way to track and debug incoming traffic to the application.
 *
 * @param {Request} req - The HTTP request object containing details of the incoming request.
 * @param {Response} _ - The HTTP response object (not used in this middleware).
 * @param {NextFunction} next - The next middleware function to pass control to.
 */
export const requestLogger = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
};
