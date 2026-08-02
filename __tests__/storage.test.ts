import { beforeEach, describe, expect, it } from "vitest";
import {
  readStoredFlag,
  readStoredList,
  readStoredNumber,
  readStoredOptionalNumber,
  writeStoredOptionalNumber,
} from "@/lib/storage";

describe("readStoredNumber", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the fallback when the key is missing", () => {
    expect(readStoredNumber("missing-key", 42)).toBe(42);
  });

  it("returns the parsed value when it is valid", () => {
    localStorage.setItem("valid-key", "10");
    expect(readStoredNumber("valid-key", 0)).toBe(10);
  });

  it("returns the fallback when the value is non-numeric", () => {
    localStorage.setItem("non-numeric-key", "not-a-number");
    expect(readStoredNumber("non-numeric-key", 5)).toBe(5);
  });

  it("returns the fallback when the value is negative", () => {
    localStorage.setItem("negative-key", "-1");
    expect(readStoredNumber("negative-key", 7)).toBe(7);
  });

  it("returns zero when the stored value is zero", () => {
    localStorage.setItem("zero-key", "0");
    expect(readStoredNumber("zero-key", 99)).toBe(0);
  });

  it("falls back when the stored value is blank", () => {
    localStorage.setItem("empty-key", "");
    expect(readStoredNumber("empty-key", 3)).toBe(3);

    localStorage.setItem("blank-key", "   ");
    expect(readStoredNumber("blank-key", 3)).toBe(3);
  });
});

describe("readStoredFlag", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the fallback when the key is missing", () => {
    expect(readStoredFlag("missing-flag", true)).toBe(true);
  });

  it("reads both stored booleans back", () => {
    localStorage.setItem("on-flag", "true");
    expect(readStoredFlag("on-flag", false)).toBe(true);

    localStorage.setItem("off-flag", "false");
    expect(readStoredFlag("off-flag", true)).toBe(false);
  });

  it("returns the fallback when the value is not a boolean", () => {
    localStorage.setItem("odd-flag", "sim");
    expect(readStoredFlag("odd-flag", true)).toBe(true);
  });
});

describe("readStoredOptionalNumber", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns null when the key is missing", () => {
    expect(readStoredOptionalNumber("missing-optional")).toBeNull();
  });

  it("returns the parsed value when it is valid", () => {
    localStorage.setItem("valid-optional", "125.5");
    expect(readStoredOptionalNumber("valid-optional")).toBe(125.5);
  });

  it("returns zero when the stored value is zero", () => {
    localStorage.setItem("zero-optional", "0");
    expect(readStoredOptionalNumber("zero-optional")).toBe(0);
  });

  it("returns null when the value is blank", () => {
    localStorage.setItem("blank-optional", "   ");
    expect(readStoredOptionalNumber("blank-optional")).toBeNull();
  });

  it("returns null when the value is non-numeric", () => {
    localStorage.setItem("text-optional", "muito");
    expect(readStoredOptionalNumber("text-optional")).toBeNull();
  });

  it("returns null when the value is negative", () => {
    localStorage.setItem("negative-optional", "-3");
    expect(readStoredOptionalNumber("negative-optional")).toBeNull();
  });
});

describe("writeStoredOptionalNumber", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("stores the value so it can be read back", () => {
    writeStoredOptionalNumber("optional-key", 42);

    expect(readStoredOptionalNumber("optional-key")).toBe(42);
  });

  it("drops the key when the value is cleared", () => {
    localStorage.setItem("optional-key", "42");

    writeStoredOptionalNumber("optional-key", null);

    expect(localStorage.getItem("optional-key")).toBeNull();
  });
});

describe("readStoredList", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const isString = (candidate: unknown): candidate is string => typeof candidate === "string";

  it("returns an empty array when the key is missing", () => {
    expect(readStoredList("missing-list", isString)).toEqual([]);
  });

  it("returns the parsed array when it is valid", () => {
    localStorage.setItem("valid-list", JSON.stringify(["a", "b"]));
    expect(readStoredList("valid-list", isString)).toEqual(["a", "b"]);
  });

  it("returns an empty array when the JSON is invalid", () => {
    localStorage.setItem("invalid-json", "{not-json");
    expect(readStoredList("invalid-json", isString)).toEqual([]);
  });

  it("returns an empty array when the JSON is not an array", () => {
    localStorage.setItem("not-an-array", JSON.stringify({ a: 1 }));
    expect(readStoredList("not-an-array", isString)).toEqual([]);
  });

  it("filters out array items that fail the predicate", () => {
    localStorage.setItem("mixed-list", JSON.stringify(["a", 1, "b", null]));
    expect(readStoredList("mixed-list", isString)).toEqual(["a", "b"]);
  });
});
