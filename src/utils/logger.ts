import winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

/**
 * Custom log format for the logger.
 *
 * Defines how log messages are formatted, including the timestamp, log level,
 * and the actual message. Example output:
 * `2024-12-01 12:34:56 [info]: This is a log message`
 */
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

/**
 * Winston logger instance for logging messages throughout the application.
 *
 * This logger is configured to:
 * - Log messages of level `info` and higher to the console.
 * - Log error-level messages to a dedicated `logs/error.log` file.
 * - Log all messages to a `logs/combined.log` file.
 *
 * Formatting:
 * - Includes a timestamp in the `YYYY-MM-DD HH:mm:ss` format.
 * - Colorizes log levels for better readability in the console.
 *
 * Transports:
 * - `Console`: Outputs logs to the console.
 * - `File`: Writes logs to `logs/error.log` (for errors) and `logs/combined.log` (for all levels).
 */
const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
