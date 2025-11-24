import { describe, it, expect } from "vitest";

function rate(responses: number, total: number) {
  return total ? responses / total : 0;
}

describe("rates", () => {
  it("computes response rate", () => {
    expect(rate(5, 10)).toBeCloseTo(0.5);
    expect(rate(0, 0)).toBe(0);
  });
});
