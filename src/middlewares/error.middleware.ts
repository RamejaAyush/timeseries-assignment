import logger from "../utils/logger";
import { Request, Response, NextFunction } from "express";

/**
 * Custom error class for handling application-specific errors.
 *
 * Extends the built-in `Error` class to include additional metadata such as
 * `statusCode` and `isOperational`. This allows for more structured error
 * handling and differentiation between operational and programming errors.
 */
export class AppError extends Error {
  /** HTTP status code associated with the error (e.g., 400, 500). */
  statusCode: number;

  /** Indicates whether the error is operational (handled gracefully). */
  isOperational: boolean;

  /**
   * Creates a new `AppError` instance.
   *
   * @param {string} message - A descriptive error message.
   * @param {number} statusCode - The HTTP status code for the error.
   * @param {boolean} [isOperational=true] - Whether the error is operational (default: `true`).
   */
  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Captures the stack trace and associates it with the current constructor
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware.
 *
 * This middleware catches and processes errors that occur in the application.
 * It logs the error details and sends an appropriate HTTP response to the client.
 *
 * @param {AppError} err - The error object to be handled.
 * @param {Request} _ - The incoming HTTP request (unused).
 * @param {Response} res - The HTTP response object to send the error details.
 * @param {NextFunction} __ - The next middleware function (unused).
 */
export const globalErrorHandler = (
  err: AppError,
  _: Request,
  res: Response,
  __: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  // Log the error details for debugging purposes
  logger.error(`Status Code: ${statusCode} - Message: ${message}`);

  // Send a JSON response with the error details
  res.status(statusCode).json({
    status: false,
    message,
  });
};
