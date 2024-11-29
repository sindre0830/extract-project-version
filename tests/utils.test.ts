import * as core from "@actions/core";
import { getInputs, performLogic } from "../src/utils";
import { ActionInputs } from "../src/types";

jest.mock("@actions/core");

describe("Utils", () => {
  describe("getInputs", () => {
    it("should correctly parse boolean inputs", () => {
      (core.getBooleanInput as jest.Mock)
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(false);
      const inputs: ActionInputs = getInputs();
      expect(inputs.bool1).toBe(true);
      expect(inputs.bool2).toBe(false);
    });
  });

  describe("performLogic", () => {
    it("should return true if both inputs are the same", () => {
      const inputs: ActionInputs = { bool1: true, bool2: true };
      expect(performLogic(inputs)).toBe(true);
    });

    it("should return false if inputs are different", () => {
      const inputs: ActionInputs = { bool1: true, bool2: false };
      expect(performLogic(inputs)).toBe(false);
    });
  });
});
