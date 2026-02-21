import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

describe("formatMoney", () => {
  it("should format 1999 to $19.99", () => {
    const result = formatMoney(1999);
    expect(result).toBe("$19.99");
  });

  it("should format 100 to $1.00", () => {
    const result = formatMoney(100);
    expect(result).toBe("$1.00");
  });

  it("should format 0 to $0.00", () => {
    const result = formatMoney(0);
    expect(result).toBe("$0.00");
  });
});
