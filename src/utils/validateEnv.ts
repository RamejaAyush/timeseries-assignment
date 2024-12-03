import dotenv from "dotenv";

dotenv.config();

/**
 * Validates the required environment variables for the application.
 *
 * This function ensures that all necessary environment variables are defined.
 * If any required variable is missing, it throws an error, preventing the
 * application from starting with incomplete configuration.
 *
 * Validation:
 * - `PORT`: Ensures the `PORT` environment variable is defined.
 *
 * @throws {Error} - Throws an error if a required environment variable is missing.
 */
export const validateEnv = (): void => {
  if (!process.env.PORT) {
    throw new Error("Missing required environment variable: PORT");
  }
};
