import app from "./app";
import logger from "./utils/logger";
import { clearCache } from "./cache/cache.util";
import { validateEnv } from "./utils/validateEnv";
import { serverConfig } from "./config/server.config";

const { port } = serverConfig();

/**
 * Validates the environment variables to ensure required configurations are present.
 * Throws an error if any required environment variable is missing.
 */
validateEnv();

/**
 * Starts the Express application.
 *
 * The server listens on the specified port, and a success log message is displayed
 * when the server is running.
 */
app.listen(port, () => {
  logger.info(`Backend is running on http://localhost:${port}`);
});

/**
 * Handles unhandled promise rejections.
 *
 * Logs the reason and promise that caused the unhandled rejection, flushes the cache,
 * and exits the process.
 *
 * @param {unknown} reason - The reason for the rejection.
 * @param {Promise<any>} promise - The promise that was rejected.
 */
process.on("unhandledRejection", (reason: unknown, promise: Promise<any>) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  logger.info("Flushing cache before exiting...");
  clearCache();
  logger.info("Cache successfully flushed.");
  process.exit(1);
});

/**
 * Handles uncaught exceptions.
 *
 * Logs the error message and stack trace, flushes the cache, and exits the process with a failure code.
 *
 * @param {Error} error - The uncaught error.
 */
process.on("uncaughtException", (error: Error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  logger.error(error.stack || "No stack trace available");
  logger.info("Flushing cache before exiting...");
  clearCache();
  logger.info("Cache successfully flushed.");
  process.exit(1);
});

/**
 * Handles `SIGTERM` signals for graceful shutdown.
 *
 * Logs a message, flushes the cache, and exits the process.
 */
process.on("SIGTERM", () => {
  logger.info(
    "SIGTERM signal received. Flushing cache and shutting down gracefully..."
  );
  clearCache();
  logger.info("Cache successfully flushed.");
  process.exit(0);
});

/**
 * Handles `SIGINT` signals (e.g., Ctrl+C) for graceful shutdown.
 *
 * Logs a message, flushes the cache, and exits the process.
 */
process.on("SIGINT", () => {
  logger.info(
    "SIGINT signal received (Ctrl+C). Flushing cache and shutting down gracefully..."
  );
  clearCache(); // Flush the cache
  logger.info("Cache successfully flushed.");
  process.exit(0);
});
