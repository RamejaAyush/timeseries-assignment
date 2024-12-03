import {
  setCache,
  getCache,
  deleteCache,
  clearCache,
} from "../src/cache/cache.util";

describe("Cache Utility Functions", () => {
  beforeEach(() => {
    clearCache();
  });

  it("should store and retrieve a value in the cache", () => {
    setCache("testKey", "testValue");
    const result = getCache("testKey");
    expect(result).toBe("testValue");
  });

  it("should return undefined for a missing key", () => {
    const result = getCache("missingKey");
    expect(result).toBeUndefined();
  });

  it("should delete a key from the cache", () => {
    setCache("testKey", "testValue");
    deleteCache("testKey");
    const result = getCache("testKey");
    expect(result).toBeUndefined();
  });

  it("should clear all keys from the cache", () => {
    setCache("key1", "value1");
    setCache("key2", "value2");
    clearCache();
    expect(getCache("key1")).toBeUndefined();
    expect(getCache("key2")).toBeUndefined();
  });
});
