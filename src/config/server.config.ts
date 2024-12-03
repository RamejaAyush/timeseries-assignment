/**
 * Retrieves the server configuration.
 *
 * @returns {{ port: number }} - An object containing the server's configuration settings:
 *   - `port`: The port number on which the server should listen.
 *     Defaults to 8080 if `process.env.PORT` is not defined or is invalid.
 */
export const serverConfig = (): { port: number } => ({
  port: Number(process.env.PORT) || 8080,
});
