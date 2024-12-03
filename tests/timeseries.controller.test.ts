import app from "../src/app";
import supertest from "supertest";

describe("Timeseries Controller", () => {
  it("should return 400 if required query parameters are missing", async () => {
    const response = await supertest(app).get("/api");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Symbol, period, start, and end parameters are required"
    );
  });

  it("should return data for valid requests", async () => {
    const response = await supertest(app).get(
      "/api?symbol=AAPL&period=1min&start=2024-05-14T10:00:00Z&end=2024-05-14T10:05:00Z"
    );
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });
});
