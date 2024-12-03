import axios from "axios";
import { getTimeSeriesFromCacheOrFetch } from "../src/services/timeseries.service";
import { setCache, clearCache } from "../src/cache/cache.util";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Timeseries Service", () => {
  beforeEach(() => {
    clearCache();
  });

  it("should return cached data if available", async () => {
    const cachedData = [
      {
        time: "2024-05-14T10:00:00Z",
        open: 150,
        high: 151,
        low: 149,
        close: 150,
      },
    ];
    setCache("AAPL-1min", cachedData);

    const result = await getTimeSeriesFromCacheOrFetch(
      "AAPL",
      "1min",
      "2024-05-14T10:00:00Z",
      "2024-05-14T10:05:00Z"
    );
    expect(result).toEqual(cachedData);
  });

  it("should fetch data from the external API if not in the cache", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          symbol: "AAPL",
          period: "1min",
          data: [
            {
              time: "2024-05-14T10:00:00Z",
              open: 150,
              high: 151,
              low: 149,
              close: 150,
            },
          ],
        },
      ],
    });

    const result = await getTimeSeriesFromCacheOrFetch(
      "AAPL",
      "1min",
      "2024-05-14T10:00:00Z",
      "2024-05-14T10:05:00Z"
    );
    expect(result).toEqual([
      {
        time: "2024-05-14T10:00:00Z",
        open: 150,
        high: 151,
        low: 149,
        close: 150,
      },
    ]);
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
